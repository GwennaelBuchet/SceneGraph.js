/**
 * Created with JetBrains WebStorm.
 * @author Gwen
 * @project CatchTheFlowers
 * @filename state.game.run
 * @date 25/07/12
 * @time 14:05
 * @purpose
 *
 */

var StateGameRun = Object.extend(
    {
        initialize:function (context) {
            this.context = context;
            this.image = null;

            this.score = 0;
            this.nbLive = 6;
            this.speed = 1;

            this.maxBees = 20;
            this.bees = [];
            this.maxClouds = 3;
            this.clouds = [];

            this.rootNode = new SkyNode(0, 0, canvasWidth, canvasHeight);
        },

        run:function () {
            this.initGame(/*currentLevel*/);

            for (var c = 0; c < this.maxClouds; c++) {
                this.clouds[c].start();
            }

            for (var b = 0; b < this.maxBees; b++) {
                this.bees[b].setImage(this.image);
                this.bees[b].start();
            }
        },

        setImage:function (image) {
            this.image = image;
        },

        /**
         * init a new game
         * @param level a PingmineLevel
         */
        initGame:function (level) {
            //init clouds
            for (var c = 0; c < this.maxClouds; c++) {
                var cloud = new CloudNode(0, 0, 10, 10);
                this.clouds.push(cloud);
                this.rootNode.addChild(cloud);
            }


            //init bees
            for (var b = 0; b < this.maxBees; b++) {
                var bee = new Bee(-30, Math.random() * 200, this.context, this, b);
                bee.isDraggable = true;
                //name, speed, frames, sliceX, sliceY, width, height, framesPerLine
                bee.addAnimation("fly", 6, 3, 0, 0, 16, 16, 1);
                bee.play("fly", null);

                this.rootNode.addChild(bee);

                this.bees.push(bee);
            }
        },

        onKeyDown:function (event) {
            var keynum = (window.event) ? event.keyCode : event.which;

            switch (keynum) {
                case 32 : //Space
                    break;
                case 37: //left
                    break;
                case 38: //up
                    break;
                case 39: //right
                    break;
                case 40: //down
                    break;
            }

            return keynum;
        },

        onKeyUp:function (event) {
            var keynum = (window.event) ? event.keyCode : event.which;

            return keynum;
        },

        killBee:function (bee) {
            this.nbLive--;

            this.rootNode.removeNode(bee);
        },

        catchFlower:function (flower) {
            this.score += flower.points;
            this.nbLive += flower.live;

            this.updateScore();
        },

        updateScore:function () {

        }
    }
);