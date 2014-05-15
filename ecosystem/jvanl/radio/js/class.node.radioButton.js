/*
 * Copyright (c) 2012  Capgemini Technology Services (hereinafter “Capgemini”)
 *
 * License/Terms of Use
 *
 * Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any
 * person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify
 * and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:
 *
 *   •    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 *  Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these
 *  Terms of Use causing significant harm to Capgemini.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 *  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 *  OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  Except as contained in this notice, the name of Capgemini shall not be used in advertising or otherwise to promote
 *  the use or other dealings in this Software without prior written authorization from Capgemini.
 *
 *  These Terms of Use are subject to French law.
 */

/**
 * This make a radio group which is composed of radio button.
 *
 * @class CGSGRadioGroupNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGRadioGroupNode}
 * @author jeremy vanlerberghe
 */
var CGSGRadioGroupNode = CGSGNode.extend(
    {
        initialize:function (x, y, w, h) {

            //call the constructor of CGSGNode
            this._super(x, y, w, h);

            this.padding = 28; // this is the padding between radio button.

            this.radioMap = new CGSGHashmap();

            /**
             * Define the class type.
             * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
             * @type {String}
             */
            this.classType = "RadioGroupNode";

            this.currentSelection = undefined;

            this.isDraggable = false;

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();

        },

        /**
         * This function deselect all radio button except the given one.
         *
         * @param nodeToExcept the node which has been previously selected
         * @private
         */
        _deselectAllExcept : function (nodeToExcept) {

            var traverser = new CGSGTraverser();

            var condition = function(node) {
                return node.text !== nodeToExcept.text && node.classType === "CGSGRadioButtonNode";
            };
            var listRadioBtn = traverser.traverse(this, condition, null);

            for (var i = 0; i<listRadioBtn.length; i++) {
                listRadioBtn[i].isSelected = false;
                listRadioBtn[i]._initShape();
            }
        },

        /**
         * This function add a radio button to the radio group.
         *
         * @param text {String} the text that we want to display next to the button.
         * @param value {String} the value of the button
         */
        addRadioButton : function(text, value) {
            // rise an exception if text already exist into map ?

            var radioButton = new CGSGRadioButtonNode(text, value);
            radioButton.translateTo(0, this.radioMap.getLength() * this.padding);
            radioButton.isClickable = true;

            radioButton.onClick = function (event) {
                event.node.isSelected = true;
                this.currentSelection = event.node.text;
                event.node._initShape();
                this._deselectAllExcept(event.node);
                this.onSelect(event);
            }.bind(this);

            this.addChild(radioButton);

            // make first radio button default choice
            if (this.radioMap.getLength() === 0) {
                radioButton.isSelected = true;
                this.currentSelection = text;
                radioButton._initShape();
            }

            // feed the map
            this.radioMap.addOrReplace(text, value);
        },

        /**
         * This function retrieve information of the selected radio button.
         * @return {Object : {key, value}}
         */
        getCurrentSelection : function() {
            return {"key" : this.currentSelection, "value" : this.radioMap.getValue(this.currentSelection)};
        },

        /**
         * This function make a radio button default using the text.
         * @param key {String} the text of the radio button
         */
        setDefaultSelection : function(key) {
            var traverser = new CGSGTraverser();

            var condition = function(node) {
                return node.classType === "CGSGRadioButtonNode";
            };
            var listRadioBtn = traverser.traverse(this, condition, null);

            for (var i = 0; i<listRadioBtn.length; i++) {
                if (listRadioBtn[i].text === key) {
                    this.currentSelection = key;
                    listRadioBtn[i].isSelected = true;
                } else {
                    listRadioBtn[i].isSelected = false;
                }
                listRadioBtn[i]._initShape();
            }
        },

        /**
         * Pre-render the cloud into a temp canvas to optimize the perfs
         * @method initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width;
            this._tmpCanvas.height = this.dimension.height;
            var tmpContext = this._tmpCanvas.getContext('2d');

            tmpContext.globalAlpha = this.globalAlpha;

            tmpContext.stroke();
        },

        /**
         * Custom rendering. Must be defined to allow the traverser to render this node
         * @method render
         * @protected
         * @override
         * @param {context}  context into render the node
         * */
        render:function (context) {
            //call this before your custom rendering
            this.beforeRender(context);

            context.globalAlpha = this.globalAlpha;

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }
    }
);


/**
 * This class define a radio button.
 *
 * @class CGSGRadioButtonNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {String} text The text to display
 * @param {String} value The value associated to this button
 * @type {CGSGRadioButtonNode}
 * @author jeremy vanlerberghe
 */
var CGSGRadioButtonNode = CGSGNode.extend(
    {
        initialize:function (text, value) {
            //call the constructor of CGSGNode
            this._super(0, 0, 50, 20);

            this.text = text;
            this.value = value;
            this.isSelected = false;

            this._radius = 6;
            this._diameter = this._radius * 2;

            this.classType = "CGSGRadioButtonNode";

            //check the size length of the text ?
            var textNode = new CGSGNodeText(0, 0, text, false);
            textNode.setSize(10);
            textNode.isClickable = false;
            textNode.isTraversable = false;
            textNode.translateTo(this._diameter + 15, this._radius );
            this.addChild(textNode);

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();
        },

        onSelect : function(event) {
            // to redefine
        },

        /**
         * Pre-render the cloud into a temp canvas to optimize the perfs
         * @method initShape
         * @private
         */
        _initShape:function () {
            this._tmpCanvas = document.createElement('canvas');
            this._tmpCanvas.width = this.dimension.width;
            this._tmpCanvas.height = this.dimension.height;
            var tmpContext = this._tmpCanvas.getContext('2d');

            // gradient variable.
            var grd = undefined;

            // draw a white circle
            tmpContext.beginPath();
            tmpContext.arc(this._diameter, this._diameter, this._radius, 0, 2 * Math.PI, false);
            tmpContext.fillStyle = "#ffffff";
            tmpContext.fill();
            tmpContext.lineWidth = 1;
            tmpContext.strokeStyle = "#919292";
            tmpContext.stroke();

            // draw the selected circle
            if (this.isSelected) {
                // selected circle has a gradient color
                grd = tmpContext.createRadialGradient(20, 20, 0, 10, 10, 22);
                grd.addColorStop(0,"white");
                grd.addColorStop(1,"#0F83C7"); // sort of blue

                tmpContext.beginPath();
                tmpContext.arc(this._diameter, this._diameter, this._radius - 3, 0, 2 * Math.PI, false);
                tmpContext.fillStyle = grd;
                tmpContext.fill();
                // selected circle border
                tmpContext.lineWidth = 1.5;
                tmpContext.strokeStyle = "#204058";
                tmpContext.stroke();
            } else {
                // no selection, so draw a grey circle with a padding with the first one.
                grd = tmpContext.createRadialGradient(20, 20, 1, 10, 10, 30);
                grd.addColorStop(0,"white");
                grd.addColorStop(1,"#CBCFD5"); // sort of grey

                tmpContext.beginPath();
                tmpContext.arc(this._diameter, this._diameter, this._radius - 2, 0, 2 * Math.PI, false);
                tmpContext.fillStyle = grd;
                tmpContext.fill();
            }
        },

        render : function(context) {
            //call this before your custom rendering
            this.beforeRender(context);

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }



    });


