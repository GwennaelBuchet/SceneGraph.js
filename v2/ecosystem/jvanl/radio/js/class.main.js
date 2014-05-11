var CGMain = CGSGScene.extend(
	{
		initialize: function (canvas) {

			this._super(canvas);

			////// INITIALIZATION /////////

			this.initializeCanvas();

			this.createScene();

			this.startPlaying();
		},

		initializeCanvas: function () {
			//redimensionnement du canvas pour être full viewport en largeur
			this.viewDimension = cgsgGetRealViewportDimension();
			this.setCanvasDimension(this.viewDimension);
		},

		/**
		 * Just create a single node (a square node)
		 *
		 */
		createScene: function () {

            var rbtn = new CGSGRadioGroupNode(100, 100, 100, 100);
            rbtn.addRadioButton("text", "valeur");
            rbtn.addRadioButton("text2", "valeur2");
            rbtn.addRadioButton("text3", "valeur3");

            //set a default selection
            rbtn.setDefaultSelection("text2");

            // display selection information
            var yourChoice = new CGSGNodeText(200, 80, "Your selection [ text : " + rbtn.getCurrentSelection().key + ", value : " + rbtn.getCurrentSelection().value + " ]");

            rbtn.onSelect = function() {
                yourChoice.setText("Your selection [ text : " + rbtn.getCurrentSelection().key + ", value : " + rbtn.getCurrentSelection().value + " ]");
            };

            this.sceneGraph.addNode(rbtn, null);
            this.sceneGraph.addNode(yourChoice, null);

		}

	}
);
