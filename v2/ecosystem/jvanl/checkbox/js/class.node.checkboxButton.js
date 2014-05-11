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
 * This make a checkbox group which is composed of checkbox button.
 *
 * @class CGSGCheckboxGroupNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGCheckboxGroupNode}
 * @author jeremy vanlerberghe
 */
var CGSGCheckboxGroupNode = CGSGNode.extend(
    {
        initialize:function (x, y, w, h) {

            //call the constructor of CGSGNode
            this._super(x, y, w, h);

            this.padding = 28; // this is the padding between checkbox button.

            this.checkboxMap = new CGSGHashmap();

            this.selectedCheckbox = [];

            /**
             * Define the class type.
             * Not mandatory but very useful, as Javascript does not have a mechanism to manage the type of class
             * @type {String}
             */
            this.classType = "CheckboxGroupNode";

            this.isDraggable = false;

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();

        },

        onSelect : function(event) {
            // to redefine
        },

        /**
         * This function add a checkbox button to the checkbox group.
         *
         * @param text {String} the text that we want to display next to the button.
         * @param value {String} the value of the button
         */
        addCheckboxButton : function(text, value) {
            // rise an exception if text already exist into map ?

            var checkboxButton = new CGSGCheckboxNode(text, value);
            checkboxButton.translateTo(0, this.checkboxMap.getLength() * this.padding);
            checkboxButton.isClickable = true;

            checkboxButton.onClick = function (event) {
                if (event.node.isSelected) {
                    //so deselect it
                    event.node.isSelected = false;
                    this.selectedCheckbox.without(event.node.text);
                } else {
                    // so mark it selected
                    event.node.isSelected = true;
                    this.selectedCheckbox.push(event.node.text);
                }
                event.node._initShape();
                // propagate event
                this.onSelect(event);
            }.bind(this);

            this.addChild(checkboxButton);

            // feed the map
            this.checkboxMap.addOrReplace(text, value);
        },

        /**
         * This function retrieve information of the selected checkboxes button.
         * @return List {Object : {key, value}}
         */
        getCurrentSelection : function() {
            var listSelection = [];
            var tmpObject;

            for (var i = 0; i<this.selectedCheckbox.length; i++) {
                tmpObject = {"key" : this.selectedCheckbox[i], "value" : this.checkboxMap.getValue(this.selectedCheckbox[i])};
                listSelection.push(tmpObject);
            }

            return listSelection;
        },

        /**
         * This function make a checkbox button default using the text.
         * @param key {String} the text of the checkbox button
         */
        setDefaultSelection : function(key) {
            var traverser = new CGSGTraverser();

            var condition = function(node) {
                return node.classType === "CGSGCheckboxNode";
            };
            var listCheckbox = traverser.traverse(this, condition, null);

            for (var i = 0; i<listCheckbox.length; i++) {
                listCheckbox[i].text === key ? listCheckbox[i].isSelected = true : listCheckbox[i].isSelected = false;
                listCheckbox[i]._initShape();
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
         * @param {context} context the context into render the node
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
 * This class define a checkbox button.
 *
 * @class CGSGCheckboxNode
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {String} text The text to display
 * @param {String} value The value associated to this button
 * @type {CGSGCheckboxNode}
 * @author jeremy vanlerberghe
 */
var CGSGCheckboxNode = CGSGNode.extend(
    {
        initialize:function (text, value) {
            //call the constructor of CGSGNode
            this._super(0, 0, 50, 50);

            this.text = text;
            this.value = value;
            this.isSelected = false;

            this.classType = "CGSGCheckboxNode";
            this.squareSize = 13;

            //check the size length of the text ?
            var textNode = new CGSGNodeText(25, 0, text, false);
            textNode.setSize(10);
            textNode.isClickable = false;
            textNode.isTraversable = false;
            textNode.translateTo(this.squareSize + 10, (this.squareSize - textNode.getHeight() ) /2) ;
            this.addChild(textNode);

            //fake canvas to pre-render static display
            this._tmpCanvas = null;
            this._initShape();
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

            this.lineColor = "#8E8F8F";
            this.backgroundSquareColor = "#D0D4D9";
            this.lineWidth = 1;


            var squarePadding = 2;
            var padding = 3;

            //draw this zone

            // the first white square
            tmpContext.fillStyle = "#ffffff"; //white color
            tmpContext.fillRect(0, 0, this.squareSize, this.squareSize);
            tmpContext.strokeStyle = this.lineColor;
            tmpContext.lineWidth = this.lineWidth;
            tmpContext.strokeRect(0, 0, this.squareSize, this.squareSize);

            //the background square with gradient
            var grd = tmpContext.createRadialGradient(this.squareSize, this.squareSize, 1,
                this.squareSize/2, this.squareSize/2, this.squareSize);

            grd.addColorStop(0,"white");
            grd.addColorStop(1,this.backgroundSquareColor);

            tmpContext.fillStyle = grd;
            tmpContext.fillRect(squarePadding, squarePadding, this.squareSize - (2*squarePadding), this.squareSize - (2*squarePadding));
            tmpContext.lineWidth = this.lineWidth;

            // draw a cross into the background square
            if (this.isSelected) {
                tmpContext.strokeStyle = "#495E96";
                tmpContext.lineCap = 'round';
                tmpContext.lineWidth = 1.2;
                // we draw the first line
                tmpContext.moveTo(padding, this.squareSize / 2);
                tmpContext.lineTo(this.squareSize /2, this.squareSize - padding);
                tmpContext.stroke();
                // then the second
                tmpContext.moveTo(this.squareSize /2, this.squareSize - padding);
                tmpContext.lineTo(this.squareSize - padding, padding);
                tmpContext.stroke();
            }
        },

        render : function(context) {
            //call this before your custom rendering
            this.beforeRender(context);

            //context.globalAlpha = this.globalAlpha;

            //render the pre-rendered canvas
            context.drawImage(this._tmpCanvas, 0, 0);

            //call this after your custom rendering
            this.afterRender(context);
        }



    });


