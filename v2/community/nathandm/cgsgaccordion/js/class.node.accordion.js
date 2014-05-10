/**
 * Event
 * @property ON_SELECTION_CHANGED
 * @default null
 * @type {Function}
 */
cgsgEventTypes.ON_SELECTION_CHANGED = "onSelectionChanged";

/**
 * Event
 * @property ON_SECTION_OPENED
 * @default null
 * @type {Function}
 */
cgsgEventTypes.ON_SECTION_OPENED = "onSectionOpened";

/**
 * Event
 * @property ON_SECTION_CLOSED
 * @default null
 * @type {Function}
 */
cgsgEventTypes.ON_SECTION_CLOSED = "onSectionClosed";

/**
 * Event
 * @property ON_SECTION_OPEN
 * @default null
 * @type {Function}
 */
cgsgEventTypes.ON_SECTION_OPEN = "onSectionOpen";

/**
 * Event
 * @property ON_SECTION_CLOSE
 * @default null
 * @type {Function}
 */
cgsgEventTypes.ON_SECTION_CLOSE = "onSectionClose";

/**
 * This class represents an Accordion.
 * @class CGSGAccordion
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} sectionHeight Relative Dimension
 * @type {CGSGAccordion}
 * @author $Author$
 */
var CGSGAccordion = CGSGNode.extend(
    {
        initialize: function (x, y, width, height, sectionHeight) {
            this._super(x, y);
            this.resizeTo(width, height);

            this.lineWidth = width;
            this.lineHeight = sectionHeight;

            this.padding = 5;
            this.speed = 30;

            this.sections = [];

            this.ON_SECTION_OPEN = "onSectionOpen";
            this.ON_SELECTION_CHANGED = "onSelectionChanged";
            this.ON_SECTION_CLOSED = "onSectionClosed";
        },

        /**
         * Add a new section on the accordion.
         * @param {CGSGNode} title
         * @param {CGSGNode} core
         */
        buildAndAddSection: function (title, preview, core) {
            var section = this.buildSection(title, preview, core), that = this;

            //Find the y position of the new section.
            var y = 0;
            if (this.sections.length > 0) {
                cgsgIterate(this.sections, function (i, el) {
                    y += el.getAbsoluteBottom() + that.padding;
                })
            }

            //place the section at the end of the accordion
            section.translateTo(0, y, false);
            section.index = this.sections.length;
            this.sections.push(section);

            //bind selection onClick
            section.onClick = function (e) {
                that.selectSection(e.data.node);
            };

            this.addChild(this.sections[this.sections.length - 1]);
            section.mask.refreshOnNextFrame = true;
            return section;
        },

        /**
         * Build a new section.
         * @param {String} title
         * @param {CGSGNode} preview
         * @param {CGSGNode} core
         */
        buildSection: function (title, preview, core) {
            var section = new CGSGSection(0, 0, this.lineWidth, this.lineHeight);
            //add the title to the section.
            if (cgsgExist(title)){
                section.setTitle(title);
            }

            //add the preview of the section.
            if (cgsgExist(preview)) {
                section.setPreview(preview);
            }

            //add the core to the section.
            if (cgsgExist(core)) {
                section.setCore(core);
            }

            return section;
        },

        /**
         * remove a section from the accordion.
         * @param {Number} index
         */
        removeSectionAt: function (index) {

            var section = this.sections.splice(index, 1);

            this.removeChild(section[0], true);

            //replace all element
            this.deselectAll();

            //return removed section
            return section;
        },

        /**
         * Display the core of the selected section.
         * @param {CGSGSection} section
         */
        selectSection: function (section) {
            if (!this.isAnimated) {
                var open;

                if (section.collapsible) {
                    open = section.isOpen === true ? false : true;
                    this.deselectAll();
                }

                if (open) {
                    //fade in with the preview
                    section.core.isVisible = true;
                    section.core.isTraversable = true;

                    var timeline = CGSG.animationManager.animate(section.core, "globalAlpha", this.speed, 0, 1, 0);

                    if(cgsgExist(section.preview)) {
                        CGSG.animationManager.animate(section.preview, "globalAlpha", this.speed, 1, 0, 0);

                        timeline.onAnimationEnd = function () {
                            section.preview.isVisible = false;
                            section.preview.isTraversable = false;
                        };
                    }

                    //Find the position
                    var y = 0;
                    cgsgIterate(this.sections, function (i, el) {
                        if (section.index > el.index) {
                            y += el.previewHeight + this.padding;
                        }
                    }.bind(this));

                    //animate the selection
                    this.openSection(section);
                    y += section.core.getHeight() + section.lineHeight + this.padding * 2;
                    //translate other section
                    cgsgIterate(this.sections, function (i, el) {
                        if (section.index < el.index) {
                            CGSG.animationManager.animate(el, "position.y", this.speed, el.position.y, y, 0);

                            y +=  el.previewHeight + this.padding ;
                        }
                    }.bind(this));
                }

                if (section.collapsible) {
                    section.isOpen = open;
                    if (cgsgExist(this[cgsgEventTypes.ON_SELECTION_CHANGED])) {
                        CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SELECTION_CHANGED, new CGSGEvent(section, null));
                        this.isAnimated = true;
                    }
                }
            }
        },

        /**
         * Open the section.
         * @param {CGSGSection} section the section
         * @method
         */
        openSection: function (section) {

            //Update the dimension of the section's core and the mask
            var timeline = CGSG.animationManager.animate(section, "dimension.height", this.speed, section.getHeight(), section.getHeight() + section.core.getHeight(), 0);
            CGSG.animationManager.animate(section, "mask._maskRegion.dimension.height", this.speed, section.previewHeight, section.lineHeight + section.core.getHeight(), 0);

            //switch between preview and the core
            if(cgsgExist(section.preview)) {
                timeline.onAnimationEnd = function () {
                    this.isAnimated = false;
                    section.preview.isVisible = false;
                    section.preview.isTraversable = false;
                }.bind(this);
            }

            //Dispatch event ON_SECTION_OPENED
            if (cgsgExist(this[cgsgEventTypes.ON_SECTION_OPENED])) {
                CGSG.animationManager.getTimeline(section, "dimension.height").onAnimationEnd = function () {
                    CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SECTION_OPENED, new CGSGEvent(section, null));
                    this.isAnimated = false;
                }.bind(this);
            }
            //Dispatch event ON_SECTION_OPEN
            if (cgsgExist(this[cgsgEventTypes.ON_SECTION_OPEN])) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SECTION_OPEN, new CGSGEvent(section, null));
            }
        },

        /**
         * deselect all the section.
         * @method
         */
        deselectAll: function () {

            var y = this.sections[0].position.y;
            cgsgIterate(this.sections, function (i, section) {

                //reorder the section
                CGSG.animationManager.animate(section, "position.y", this.speed, section.position.y, y, 0);
                y += section.previewHeight + this.padding;

                //hide the core of the selected this.sections[i]
                if (section.isOpen && section.collapsible) {

                    //Switch between core and the preview.
                    CGSG.animationManager.animate(section.core, "globalAlpha", this.speed, 1, 0, 0);
                    if(cgsgExist(section.preview)) {
                        //fade in with the preview
                        section.preview.isVisible = true;
                        section.preview.isTraversable = true;
                        CGSG.animationManager.animate(section.preview, "globalAlpha", this.speed, 0, 1, 0);
                    }

                    //Update the dimension of the core and the mask.
                    CGSG.animationManager.animate(section, "mask._maskRegion.dimension.height", this.speed, section.mask._maskRegion.dimension.height, section.previewHeight, 0);
                    var timeline = CGSG.animationManager.animate(section, "dimension.height", this.speed, section.getHeight(), section.previewHeight, 0);
                    timeline.onAnimationEnd = this._animationEndHandlerClose.bind(this, section);
                    section.isOpen = false;

                    //Dispatch event ON_SECTION_CLOSE
                    if (cgsgExist(this[cgsgEventTypes.ON_SECTION_CLOSE])) {
                        CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SECTION_CLOSE, new CGSGEvent(section, null));
                    }
                }
            }.bind(this));
        },

        /**
         * Handle animation end event for sections.
         *
         * @method
         * @param event {Object} the event
         * @private
         */
        _animationEndHandlerClose: function (section, event) {
            section.core.isVisible = section.isOpen;
            section.core.isTraversable = section.isOpen;
            this.isAnimated = false;
            if (cgsgExist(this[cgsgEventTypes.ON_SECTION_CLOSED])) {
                CGSG.eventManager.dispatch(this, cgsgEventTypes.ON_SECTION_CLOSED, new CGSGEvent(this, null));
            }
        }
    }
);

/**
 * This class represents a Accordion.
 * @class CGSGSection
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @author $Author$
 */
var CGSGSection = CGSGNode.extend(
    {
        initialize: function (x, y, width, height) {
            this._super(x, y);
            this.resizeTo(width, height);

            this._backgroundColor = "#605C55";
            this._puceColor = "black";
            this._textColor = "black";
            this._displayPuce = true;
            this._titleSize = 17;
            this._globalAlpha = 0.8;
            this.padding = 10;

            this.isOpen = false;
            this.collapsible = true;
            this.index = null;

            this.title = {};

            this.mask = new CGSGMaskClip(new CGSGRegion(0, 0, this.getWidth(), this.getHeight()));
            this.mask.apply(this);

            this.lineHeight = this.getHeight();
            this.lineWidth = this.getWidth();
        },

        /**
         * set the title of the section header
         * @param {String} t title
         */
        setTitle: function (t) {

            if (this.title.classType == "CGSGNodeText") {
                this.title.setText(t, true);
            } else {
                var title = new CGSGNodeText(0, 0, t);
                title.setSize(this._titleSize, true);
                title.color = this._textColor;
                title.setTypo('Arial', true);
                title.isTraversable = true;
                title.isClickable = false;

                this.title = title;
                this.addChildAt(this.title, 0);
                this.title.translateTo(this.getHeight(), (this.getHeight() - this.title.getHeight()) / 2.5, true);
            }

            this.mask._maskRegion.dimension.height = this.getHeight();

            this.previewHeight = this.getHeight();
        },

        setPreview: function (preview) {
            if (this.preview === undefined) {
                this.preview = preview;
                this.addChildAt(this.preview, 1);
            } else {
                this.preview = preview;
            }
            this.preview.translateTo(0, this.getHeight() , true);

            this.previewHeight = this.preview.getAbsoluteBottom();
            this.resizeTo(this.getWidth(), this.previewHeight);

            this.mask._maskRegion.dimension.height = this.getHeight();

            this.previewHeight = this.getHeight();

        },

        /**
         * set the core of the section
         * @param {CGSGNode} core
         */
        setCore: function (core) {
            if (this.core === undefined) {
                this.core = core;
                this.addChildAt(this.core, 2);
            } else {
                this.core = core;
            }
            this.core.translateTo(0, this.lineHeight, true);

            this.core.isVisible = false;
            this.core.isTraversable = false;
        },

        /**
         * The drawing of the section.
         * @param ctx
         */
        draw: function (ctx) {

            ctx.beginPath();
            ctx.fillStyle = this._backgroundColor;
            ctx.globalAlpha = this._globalAlpha;

            //display background
            ctx.fillRect(0, 0, this.getWidth(), this.getHeight());

            //display icon
            if (this._displayPuce) {
                ctx.fillStyle = this._puceColor;
                ctx.moveTo(this.lineHeight / 3, this.lineHeight / 3);
                if (this.isOpen) {
                    ctx.lineTo(2 * this.lineHeight / 3, this.lineHeight / 3);
                    ctx.lineTo(this.lineHeight / 2, 2 * this.lineHeight / 3);
                    ctx.lineTo(this.lineHeight / 3, this.lineHeight / 3);
                } else {
                    ctx.lineTo(2 * this.lineHeight / 3, this.lineHeight / 2);
                    ctx.lineTo(this.lineHeight / 3, 2 * this.lineHeight / 3);
                    ctx.lineTo(this.lineHeight / 3, this.lineHeight / 3);
                }
            }
            ctx.fill();

            ctx.closePath();
        },

        /**
         * The rendering of the section.
         * @param ctx
         */
        render: function (ctx) {
            this.draw(ctx);
        }
    }
);

