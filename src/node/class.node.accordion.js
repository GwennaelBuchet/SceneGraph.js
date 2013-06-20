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
 * @param {Number} sectionWidth Relative Dimension
 * @param {Number} sectionHeight Relative Dimension
 * @type {CGSGAccordion}
 * @author $Author$
 */
var CGSGAccordion = CGSGNode.extend(
    {
        initialize : function(x, y, width, height, sectionWidth, sectionHeight) {
            this._super(x, y, width, height);

            this.lineWidth = sectionWidth;
            this.lineHeight = sectionHeight;
            this.interLine = 2;
            this.padding = 5;
            this.speed = 10;

            this.sections = [];

            /**
             * Event
             * @property onSectionChanged
             * @default null
             * @type {Function}
             */
            this.onSectionChanged = null;

        },

        /**
         * Add a new section on the accordion.
         * @param {CGSGNode} title
         * @param {CGSGNode} core
         */
        buildAndAddSection : function(title, core) {
            var section = new CGSGSection(0, 0, this.lineWidth, this.lineHeight);
            //add the title to the section.
            section.setTitle(title);

            //add the core to the section
            section.setCore(core);

            //place the section at the end of the accordion
            section.translateTo(0,  this.sections.length * (this.lineHeight + this.interLine) );
            section.index = this.sections.length;
            this.sections.push(section);

            //bind selection onClick
            var that = this;
            section.onClick = function(e) {
                that.selectSection(e.data.node);
            };

            this.addChild(section);
            return section;
        },

        /**
         * remove a section from the accordion.
         * @param {Number} index
         */
        removeSectionAt : function (index) {

            var section = this.sections.splice(index, 1);

            this.removeChild(section[0], true);

            //replace all element
            this.deselectAll();

            //return removed section
            return section;
        },

        /**
         * Display the core of the selected section.
         * @param {CGSGNode} section
         */
        selectSection : function (section) {
            var open = section.isOpen == true ? false : true;
            this.deselectAll();

            if (open) {
                //animate the selection
                CGSG.animationManager.animate(section, "dimension.height", this.speed, section.getHeight(), section.getHeight() + section.core.getHeight() + this.padding, 0);
                CGSG.animationManager.animate(section, "mask._maskRegion.dimension.height", this.speed, this.lineHeight, this.lineHeight + section.core.getHeight() + this.padding , 0);

                //translate other section
                for( var i = 0; i < this.sections.length; i++) {
                    if(section.index < this.sections[i].index) {
                        CGSG.animationManager.animate(this.sections[i], "position.y", this.speed, this.sections[i].position.y, section.core.getHeight() + this.padding + this.sections[i].index * (this.lineHeight + this.interLine), 0);
                    }
                }
            }
            section.isOpen = open;
        },

        /**
         * deselect all the section.
         */
        deselectAll : function () {

            for( var i = 0; i < this.sections.length; i++) {
                //reorder the section
                CGSG.animationManager.animate(this.sections[i], "position.y", this.speed, this.sections[i].position.y, this.sections[i].index * (this.lineHeight + this.interLine) , 0);

                //hide the core of the selected this.sections[i]
                if(this.sections[i].isOpen) {
                    CGSG.animationManager.animate(this.sections[i], "mask._maskRegion.dimension.height", this.speed, this.sections[i].mask._maskRegion.dimension.height , this.lineHeight, 0);
                    CGSG.animationManager.animate(this.sections[i], "dimension.height", this.speed, this.sections[i].getHeight(), this.lineHeight, 0);
                    this.sections[i].isOpen = false;
                }
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
        initialize : function (x, y, width, height) {
            this._super(x, y);
            this.resizeTo(width, height);

            this._backgroundColor = "#605C55";
            this.lineHeight = this.getHeight();
            this.isOpen = false;
            this.index = null;
            this.mask = new CGSGMaskClip(new CGSGRegion(0, 0,this.getWidth(), this.getHeight()));
            this.mask.apply(this);


        },

        /**
         * set the title of the section header
         * @param {String} title
         */
        setTitle : function (title) {

            var title = new CGSGNodeText(0, 0, title);
            title.setSize(12);
            title.color = "white";
            title.isClickable = false;

            this.title = title;
            this.title.translateTo(this.getHeight(),( this.getHeight() - this.title.getHeight() ) / 2 )
            this.addChildAt(title, 0);
        },


        /**
         * set the core of the section
         * @param {CGSGNode} core
         */
        setCore : function (core) {
            this.core = core;
            this.addChildAt(this.core, 1);
            this.core.translateTo(( this.getWidth() - this.core.getWidth() ) / 2,  this.getHeight());
        },

        /**
         * change the background color of the section
         * @param color
         */
        setBackgroundColor : function (color) {
            this._backgroundColor = color;
        },

        render : function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = this._backgroundColor;
            ctx.globalAlpha = "0.8";

            //display background
            ctx.fillRect(0, 0, this.getWidth(), this.getHeight());

            //display icon
            ctx.fillStyle = "white";
            ctx.moveTo(this.lineHeight / 3, this.lineHeight / 3);
            if (this.isOpen) {
                ctx.lineTo(2 * this.lineHeight / 3, this.lineHeight / 3);
                ctx.lineTo(this.lineHeight / 2, 2 * this.lineHeight / 3);
                ctx.lineTo(this.lineHeight / 3, this.lineHeight / 3);
            }
            else {
                ctx.lineTo(2 * this.lineHeight / 3, this.lineHeight / 2);
                ctx.lineTo(this.lineHeight / 3, 2 * this.lineHeight / 3);
                ctx.lineTo(this.lineHeight / 3, this.lineHeight / 3);
            }
            ctx.fill();

            ctx.closePath();
        }
    }
);

