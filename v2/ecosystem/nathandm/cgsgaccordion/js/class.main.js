var CGMain = CGSGView.extend(
    {
        initialize : function(canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas : function() {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * create a random scene with some nodes
         *
         */
        createScene : function() {

            var core = new CGSGNodeSquare(0,0,50,50);
            core.isDraggable=true;
            //create and add a root node to the scene, with arbitrary dimension
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Build the accordion.
            this.accordion = new CGSGAccordion(15, 15, 400, 800, 50);

            //Build the section.
            this._buildTitleSection();
            this._buildPreviewSection();
            this._buildSectionWithComplexCore();

            this.rootNode.addChild(this.accordion);

            //The ScrollPane manage the resize
            this.accordion.isDraggable = true;
            this.accordion.isResizable = true;

        },

        _buildTitleSection: function () {

            //Build the core of the section
            var core = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 300);
            core.color = "blue";
            core.addChild(new CGSGNodeText(20, 10, "I'm the core !"));

            //Create the new section and add it to the accordion
            this.accordion.buildAndAddSection("Simple section", null, core);

        },

        _buildPreviewSection: function () {
            //Build the preview of the section
            var preview = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 65);
            preview.color = "pink";
            preview.addChild(new CGSGNodeText(20, 10, "I'm the preview : \nthis section contain a core"));

            //Build the core of the section
            var core = new CGSGNodeSquare(0, 0, this.accordion.getWidth(), 300);
            core.color = "yellow";
            core.addChild(new CGSGNodeText(20, 10, "I'm the core !"));

            this.accordion.buildAndAddSection("Preview Section", preview, core);

        },

        _buildSectionWithComplexCore: function () {
            var tooltipNode = new CGSGNode(5, 0),
                width = 400 - 10,
                iconPadding = 80,
                textNode = new CGSGNodeSquare(0, 10, width, 115),
                textNodeLabel = new CGSGNodeText(iconPadding + 20, 10, "You can also :\n   -change section's style\n   -use event\n  -..."),
                circle = new CGSGNodeCircle(50, 55, 30);

            textNodeLabel.setWrapMode(CGSGWrapMode.WORD);

            var padding = 5;
            textNodeLabel.translateWith(padding, padding);
            textNodeLabel.setTypo('Arial', true);
            textNodeLabel.setSize(15, true);
            textNodeLabel.setMaxWidth((width - iconPadding) - (padding << 1), true);
            textNodeLabel.setLineHeight(20, true);

            textNode.color = "rgba(170,170,170,0.5)";
            textNode.addChild(textNodeLabel);

            circle.color = 'white';

            this.titleNode = new CGSGNodeButton(0, 130, "Select other section");
            var dimension = new CGSGDimension(width, 50);
            this.titleNode.setFixedSize(dimension);
            this.titleNode.resizeTo(dimension.width, dimension.height);

            this.titleNode.onClick = function () {
                this.accordion.selectSection(this.accordion.sections[1]);

            }.bind(this);

            textNode.addChild(circle);

            tooltipNode.addChild(textNode);
            tooltipNode.addChild(this.titleNode);

            tooltipNode.resizeWith(textNode.getWidth(), textNode.getHeight() + this.titleNode.getHeight() + 20);

            var core = new CGSGNode(0,0);
            core.resizeTo(this.accordion.getWidth(), 200);
            core.addChild(tooltipNode);

            var section = this.accordion.buildAndAddSection("Section with complex core", null, core);
            section._backgroundColor = "black";
            section.title.color = "#605C55";
            section._puceColor = "#605C55";
        }
    }
);