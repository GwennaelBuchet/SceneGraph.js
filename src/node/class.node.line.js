/**
 * A CGSGNodeLine represent a basic line
 *
 * @class CGSGNodeLine
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Array} points of line  as CGSGPosition
 * @type {CGSGNodeLine}
 * @author Paul Todd
 */
var CGSGNodeLine = CGSGNode.extend(
    {
        initialize: function (pts) {
            'use strict';
            this._pts = pts.copy();
            this._nbPts = this._pts.length;
            this._minX = 0;
            this._minY = 0;
            this._maxX = 0;
            this._maxY = 0;

            this.updateMinMax();

            this._super(this._minX, this._minY, this._maxX - this._minX, this._maxY - this._minY);

            this.resizeTo(this._maxX - this._minX, this._maxY - this._minY);

            this.pickNodeMethod = CGSGPickNodeMethod.REGION;

            /**
             * @property classType
             * @readonly
             * @type {String}
             */
            this.classType = "CGSGNodeLine";
        },

        /**
         * Custom rendering
         * @method render
         * @protected
         * @param {CanvasRenderingContext2D} c the context into render the node
         * */
        render: function (c) {
            c.beginPath();
            //c.globalAlpha = this.globalAlpha;

            c.moveTo(this._pts[0].x - this._minX, this._pts[0].y - this._minY);

            for (var i = 1; i < this._nbPts; i++) {
                c.lineTo(this._pts[i].x - this._minX, this._pts[i].y - this._minY);
            }

            if (this.lineWidth > 0) {
                c.lineWidth = this.lineWidth;
                c.strokeStyle = this.lineColor;
                c.stroke();
            }
        },

        /**
         * Replace current dimension by these new ones and compute new Points
         * @method resizeTo
         * @param {Number} w
         * @param {Number} h
         * */
        resizeTo: function (w, h) {
            this.dimension.resizeTo(w, h);

            this._computeResizedPoints();
        },

        /**
         * Multiply current dimension by these new ones
         * @method resizeTBy
         * @param wf {Number} width Factor
         * @param hf {Number} height Factor
         * */
        resizeBy: function (wf, hf) {
            this.dimension.resizeBy(wf, hf);

            this._computeResizedPoints();
        },

        /**
         * Increase/decrease current dimension with adding values
         * @method resizeWith
         * @param w {Number} width
         * @param h {Number} height
         * */
        resizeWith: function (w, h) {
            this.dimension.resizeWith(w, h);

            this._computeResizedPoints();
        },

        /**
         * @method _computeResizedPoints
         * @private
         */
        _computeResizedPoints: function () {
            var sx = this.getWidth() / (this._maxX - this._minX);
            var sy = this.getHeight() / (this._maxY - this._minY);
            var c = this.getCenter();

            if (this.getWidth() > 0 && this.getHeight() > 0) {
                for (var i = 0; i < this._nbPts; i++) {
                    this._pts[i].x = (sx * (this._pts[i].x - c.x)) + c.x;
                    this._pts[i].y = (sy * (this._pts[i].y - c.y)) + c.y;
                }
                this.updateMinMax();
            }
        },

        /**
         * Find the center of the Line
         * @public
         * @method getCenter
         */
        getCenter: function () {
            return new CGSGPosition((this._maxX - this._minX) / 2, (this._maxY - this._minY) / 2);
        },

        /**
         * Get the Largest x of the Line
         * @public
         * @method getMaxX
         */
        getMaxX: function () {
            var x = this._pts[0].copy().x, t;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().x;
                if (x <= t) {
                    x = t;
                }
            }

            return x;
        },

        /**
         * Get the smallest x of the Line
         * @public
         * @method getMinX
         */
        getMinX: function () {
            var x = this._pts[0].copy().x, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().x;

                if (x >= t) {
                    x = t;
                }
            }

            return x;
        },

        /**
         * Get the Largets y of the Line
         * @public
         * @method getMaxY
         */
        getMaxY: function () {
            var y = this._pts[0].copy().y, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().y;

                if (y <= t) {
                    y = t;
                }
            }

            return y;
        },

        /**
         * Get the smallest y of the Line
         * @public
         * @method getMinY
         */
        getMinY: function () {
            var y = this._pts[0].copy().y, t = 0;

            for (var i = 1; i < this._nbPts; i++) {
                t = this._pts[i].copy().y;

                if (y >= t) {
                    y = t;
                }
            }

            return y;
        },

        /**
         * Update the min and max x/y values
         * @method updateMinMax
         */
        updateMinMax: function () {
            this._maxY = this.getMaxY();
            this._minY = this.getMinY();
            this._maxX = this.getMaxX();
            this._minX = this.getMinX();
        },

        /**
         * Set the points of the Line
         * @public
         * @method setPoints
         */
        setPoints: function (points) {
            this._pts = points.copy();
            this._nbPts = this._pts.length;
            this.updateMinMax();
            this.dimension.resizeTo(this._maxX - this._minX, this._maxY - this._minY);

            this.translateTo(this._minX, this._minY);

            /*for (var i = 0 ; i < this._nbPts ; i++) {
             var p = this._pts[i];

             p.x -= this._minX;
             p.y -= this._minY;
             }*/
        },

        /**
         * Get the points of the Line
         * @public
         * @method getPoints
         */
        getPoints: function () {
            return this._pts.copy();
        },

        /**
         * Get a point of the Line at index
         * @public
         * @method getPoint
         * @param i {Number} index
         */
        getPoint: function (i) {
            if (i < this._nbPts && i >= 0) {
                return this._pts.slice(i, i + 1).copy();
            }
            return this._pts.slice(0, 1).copy();
        },

        /**
         * @method copy
         * @return {CGSGNodeLine} a copy of this node
         */
        copy: function () {
            var node = new CGSGNodeLine(this._pts);
            //call the super method
            return this._super(node);
        }

    }
);