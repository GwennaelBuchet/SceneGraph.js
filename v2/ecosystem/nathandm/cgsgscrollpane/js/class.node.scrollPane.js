

var CGSGNodeScrollPaneViewPort = CGSGNode.extend({

    initialize: function (x, y, width, height) {
        this._super(x, y);

        this.classType = "CGSGNodeScrollPaneViewPort";

        this.resizeTo(width, height);
    },

    draw: function (context) {
        context.beginPath();
        context.rect(0, 0, this.getWidth(), this.getHeight());
        context.closePath();
        //Constraint the render of the children in the node's region
        context.clip();
    },

    render: function (context) {
        this.draw(context);
    },

    /**
     * Override afterRender to add "slipping" effect to scroll pane
     * @protected
     * @method afterRender
     * @param {CanvasRenderingContext2D} context the context into render the nodes
     * */
    afterRender: function (context) {
        if (this.onAfterRenderStart) {
            CGSG.eventManager.dispatch(this, cgsgEventTypes.AFTER_RENDER_START, new CGSGEvent(this, {context: context}));
        }

        //render all children
        if (!this.isALeaf()) {
            //draw children
            for (var i = 0, len = this.children.length; i < len; ++i) {
                var childNode = this.children[i];
                if (childNode.isVisible) {
                    childNode.doRender(context);
                }
            }
        }

        //restore the context state
        context.restore();
    }
});

var CGSGNodeScrollPane = CGSGNode.extend({

    initialize: function (x, y, width, height) {
        this._viewport = new CGSGNodeScrollPaneViewPort(0, 0, width, height);
        this._super(x, y);

        this.classType = "CGSGNodeScrollPane";
        this.rounding = 0;

        this.sliderWidth = 15;

        this.resizeTo(width, height);
        this._build();

        var that = this;

        function up(){
            that.ySlider.handle.translateWith(0, -20);
            that.ySlider.handle.onSlide();
            that.onSliderTranslate();
            that.updateViewPort();
        };

        function down(){
            that.ySlider.handle.translateWith(0, 20);
            that.ySlider.handle.onSlide();
            that.onSliderTranslate();
            that.updateViewPort();
        };

        function wheel(event){

            var delta = 0;
            if (!event) event = window.event;//for IE
            if (event.wheelDelta) {
                delta = event.wheelDelta/120;
                if (window.opera) delta = -delta;
            } else if (event.detail) {
                delta = -event.detail/3;
            }

            var mousePosition = new CGSGPosition(event.x, event.y),
                node = CGSG.sceneGraph.pickNode(mousePosition, null);

            if(cgsgExist(node) && cgsgExist(node._parentNode)) {
                if(node._parentNode.classType == "CGSGNodeScrollPane") {
                    if (delta > 0)up();
                    if (delta < 0)down();
                }
            }

            return false;
        };



        /* Initialization code. */
        if (window.addEventListener)
            window.addEventListener('DOMMouseScroll', wheel, false);
        window.onmousewheel = document.onmousewheel = wheel;
    },

    /**
     * <p>
     *     Create view port and its scroll bars
     * </p>
     *
     * @method build
     * @public
     *
     * */
    _build: function () {
        this.addChild(this._viewport);
        this._buildXSlider();
        this._buildYSlider();
    },

    _buildXSlider: function () {
        //Horizontal slider
        this.xSlider = new CGSGNodeScrollBar(0, this._viewport.getHeight(), this._viewport.getWidth(), this.sliderWidth);

        //bind drag event
        CGSG.eventManager.bindHandler(this.xSlider.handle, cgsgEventTypes.ON_DRAG, this.onSliderTranslate.bind(this));
        CGSG.eventManager.bindHandler(this.xSlider.handle, cgsgEventTypes.ON_DRAG_END, this.onSliderTranslateEnd.bind(this));

        this.addChild(this.xSlider);

        //Not rendered if not needed
        this.xSlider.isVisible = false;
        this.xSlider.isTraversable = false;
    },

    _buildYSlider: function () {
        //vertical Slider
        this.ySlider = new CGSGNodeScrollBar(this._viewport.getWidth(), 0, this.sliderWidth, this._viewport.getHeight());

        //bind drag event
        CGSG.eventManager.bindHandler(this.ySlider.handle, cgsgEventTypes.ON_DRAG, this.onSliderTranslate.bind(this));
        CGSG.eventManager.bindHandler(this.ySlider.handle, cgsgEventTypes.ON_DRAG_END, this.onSliderTranslateEnd.bind(this));

        this.addChild(this.ySlider);

        //Not rendered if not needed
        this.ySlider.isVisible = false;
        this.ySlider.isTraversable = false;
    },

    /**
     * <p>
     *     Scroll the content of the scrollPane when handler slide.
     * </p>
     * @param event
     */
    onSliderTranslate: function (event) {
        this.contained.translateTo(-this.xSlider.value, -this.ySlider.value, false);
    },

    onSliderTranslateEnd: function (event) {
    },

    /**
     * <p>
     *     Dimension scroll bars and view port
     * </p>
     *
     * @method updateViewPort
     * @public
     *
     * */
    updateViewPort: function () {
        if (this._viewport != null && this.contained != null) {

            this.viewPortAreaWidth = this.contained.getWidth();
            this.viewPortAreaHeight = this.contained.getHeight();

            //Must render the horizontal slider
            if(this.viewPortAreaHeight > this._viewport.getHeight()) {
                this.showSlider(this.ySlider);
            } else if (cgsgExist(this.ySlider) && this.ySlider.isVisible) {
                this.hideSlider(this.ySlider);
            }

            //Must render the vertical slider
            if (this.viewPortAreaWidth > this._viewport.getWidth()) {
                this.showSlider(this.xSlider);
            } else if (cgsgExist(this.xSlider) && this.xSlider.isVisible) {
                this.hideSlider(this.xSlider);
            }


            //Update the dimensions and position of the sliders
            //Re-initialize the slider value
            if (this.xSlider.isVisible) {
                this.xSlider.translateTo(0, this._viewport.getHeight(), false);
                this.xSlider.resizeTo(this._viewport.getWidth(), this.sliderWidth);

                this.xSlider.setMin(0);
                this.xSlider.setMax(this.viewPortAreaWidth - this._viewport.getWidth());
                this.xSlider.setValue(0);

                //update the width of the handleBar
                var ratio = this.contained.getWidth() / this._viewport.getWidth();
                this.xSlider.handle.resizeTo(this.xSlider.getWidth() / ratio, this.xSlider.getHeight());
                this.xSlider.handle.onSlide();
            }

            if (this.ySlider.isVisible) {
                this.ySlider.translateTo(this._viewport.getWidth(), 0, false);
                this.ySlider.resizeTo(this.sliderWidth, this._viewport.getHeight());

                this.ySlider.setMin(0);
                this.ySlider.setMax(this.viewPortAreaHeight - this._viewport.getHeight());
                this.ySlider.setValue(0);

                //update the height tof the handleBar
                var ratio = this.contained.getHeight() / this._viewport.getHeight();
                this.ySlider.handle.resizeTo(this.ySlider.getWidth(), this.ySlider.getHeight() / ratio);
                this.ySlider.handle.onSlide();
            }
        }
    },

    /**
     * <p>
     *     Add node to scrollable view port
     * </p>
     *
     * @method addToViewPort
     * @public
     *
     * @param {CGSGNode} node
     * */
    addToViewPort: function (node) {
        if (node != null) {
            this.contained = node;
            this._viewport.addChild(node);
            this.updateViewPort();
        }
    },

    clear: function () {
        if (this._viewport.children != null) {
            while (this._viewport.children.length > 0) {
                this._viewport.removeChild(this._viewport.children[0], false);
            }
            this.contained = null;
        }
    },

    /**
     * <p>
     *     Replace current dimension and fit view port to current dimension
     * </p>
     *
     * @method resizeTo
     * @public
     *
     * @param {Number} newWidth
     * @param {Number} newHeight
     * */
    resizeTo: function (newWidth, newHeight) {
        this.dimension.resizeTo(newWidth, newHeight);
        this._viewport.dimension.resizeTo(newWidth,newHeight);
        this.updateViewPort();
    },

    /**
     * <p>
     *     Multiply current dimension and fit view port to current dimension
     * </p>
     *
     * @method resizeBy
     * @public
     *
     * @param {Number} widthFactor
     * @param {Number} heightFactor
     * */
    resizeBy: function (widthFactor, heightFactor) {
        this.dimension.resizeBy(widthFactor, heightFactor);
        this._viewport.dimension.resizeBy(widthFactor,heightFactor);
        this.updateViewPort();
    },

    /**
     * <p>
     *     Increase/decrease current dimension and fit view port to current dimension
     * </p>
     *
     * @method resizeWith
     * @public
     *
     * @param {Number} width
     * @param {Number} height
     * */
    resizeWith: function (width, height) {
        this.dimension.resizeWith(width, height);
        this._viewport.dimension.resizeWith(width,height);
        this.updateViewPort();
    },

    /**
     * <p>
     *     Display the slider given in param.
     * </p>
     * @param slider
     */
    showSlider: function (slider) {
        if(!slider.isVisible) {
            slider.isVisible = true;
            slider.isTraversable = true;

            if(slider.getWidth() > slider.getHeight()) {
                this._viewport.resizeWith(0, -this.sliderWidth);
            } else {
                this._viewport.resizeWith(-this.sliderWidth, 0);
            }
        }
    },

    /**
     * <p>
     *     Hide the slider given in param.
     * </p>
     * @param slider
     */
    hideSlider: function (slider) {
        if(slider.isVisible) {
            slider.isVisible = false;
            slider.isTraversable = false;

            if(slider.getWidth() > slider.getHeight()) {
                this._viewport.resizeWith(0, this.sliderWidth);
            } else {
                this._viewport.resizeWith(this.sliderWidth, 0);
            }
        }
    }
});