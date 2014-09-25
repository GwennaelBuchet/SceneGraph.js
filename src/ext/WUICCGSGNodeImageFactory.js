/**
 * this class represent an Image Factory for WUIC
 * @class WUICCGSGNodeImageFactory
 * @extends CGSGObject
 * @param {String} groupId
 * @constructor
 * @type {WUICCGSGNodeImageFactory}
 */
var WUICCGSGNodeImageFactory = CGSGObject.extend(
        {
            initialize: function (groupId) {
                'use strict';
                this.wuicData = eval("WUIC_SPRITE_" + groupId.toUpperCase());
                this.imgMap = new CGSGMap();

                for (var file in this.wuicData) {
                    var sprite = this.wuicData[file];
                    this.imgMap.addOrReplace(file, sprite.url);
                }
            },

            /**
             * Create a new image from the sprite
             * @method create
             * @param name represent the name of the new image
             * @param data contain the attribute of this image
             * @return {CGSGNodeImage}
             */
            create: function (name, data) {
                var sprite = this.wuicData[name];

                // Create image thanks to the provided sprite
                var img = this.buildNode(data, sprite.url);
                img.setSlice(parseInt(sprite.x), parseInt(sprite.y),
                    parseInt(sprite.w), parseInt(sprite.h), true);
                img.name = name;
                return img;
            },

            /**
             * Build the CGSGNodeImage with his position
             * @method buildNode
             * @param data contain the attribute of the node
             * @param url
             * @return {CGSGNodeImage}
             */
            buildNode: function (data, url) {
                return  new CGSGNodeImage(data.x, data.y, url);
            },

            /**
             * return a map of all the image associated with her sprite's url.
             * @method getImgMap
             * @return {CGSGMap}
             */
            getImgMap: function () {
                return this.imgMap;
            }
        }
    )
    ;


