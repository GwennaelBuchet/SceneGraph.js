var CGMain = CGSGView.extend({

	initialize : function(canvas) {
		this._super(canvas);
		//this.initializeCanvas();
		this.createScene();
		this.startPlaying();
	},

	initializeCanvas : function() {
		this.viewDimension = cgsgGetRealViewportDimension();
		this.setCanvasDimension(this.viewDimension);
	},

	createScene : function() {

		var root = new CGSGNode(0, 0);
        CGSG.sceneGraph.addNode(root, null);
		
		var master = new CGSGNodeSlider(50, 100, 600, 20);
		root.addChild(master);
		master.setValue(-7);
        master.isResizable = true;
        master.isDraggable = true;
		
		var masterValueLabel = new CGSGNodeText(20, 20, (Math.floor(master.getValueAsRangeRatio()*10000)/100)+" %");
		root.addChild(masterValueLabel);
		
		var slave = new CGSGNodeSlider(50, 200, 600, 20);
		root.addChild(slave);
		slave.valueColor = '#880000';
		slave.setValue(-7);
        slave.isResizable = true;
        slave.isDraggable = true;

		var check = new CGSGNodeSlider(50, 300, 600, 10);
		root.addChild(check);
		check.valueColor = '#880044';
		check.setValue(7.5);
		check.setMin(5);
        check.setMax(-5);
        check.isResizable = true;
        check.isDraggable = true;

        var masterSlideSlaveListener = (function(event) {
            var slider = event.observable.getParentSlider();
            slave.setValue(slider.value);
        }).bind(this);

        var masterValueLabelMasterSlideListener = (function(event) {
            var slider = event.observable.getParentSlider();
            masterValueLabel.setText((Math.floor(slider.value*100)/100) + " or " + (Math.floor(slider.getValueAsRangeRatio()*10000)/100)+" %", true);
        }).bind(this);

        var checkSlideSlaveEndListener = (function(event) {
            var slider = event.observable.getParentSlider();
            slave.setValue(slider.value);
        }).bind(this);

        CGSG.eventManager.bindHandler(check.getHandle(), cgsgEventTypes.ON_DRAG_END, checkSlideSlaveEndListener);
        CGSG.eventManager.bindHandler(master.getHandle(), cgsgEventTypes.ON_DRAG, masterSlideSlaveListener);
        CGSG.eventManager.bindHandler(master.getHandle(), cgsgEventTypes.ON_DRAG, masterValueLabelMasterSlideListener);

        var red = new CGSGNodeSlider(50, 350, 300, 10);
        root.addChild(red);
        red.setMin(0);
        red.setMax(255);
        red.setValue(0);

        var green = new CGSGNodeSlider(50, 400, 300, 10);
        root.addChild(green);
        green.setMin(0);
        green.setMax(255);
        green.setValue(0);

        var blue = new CGSGNodeSlider(50, 450, 300, 10);
        root.addChild(blue);
        blue.setMin(0);
        blue.setMax(255);
        blue.setValue(0);

        var rgbListener = (function() {
            red.valueColor = CGSGColor.rgb2hex(Math.floor(red.value), 0, 0);
            green.valueColor = CGSGColor.rgb2hex(0, Math.floor(green.value), 0);
            blue.valueColor = CGSGColor.rgb2hex(0, 0, Math.floor(blue.value));
            check.valueColor = CGSGColor.rgb2hex(Math.floor(red.value), Math.floor(green.value), Math.floor(blue.value));
        }).bind(this);


        CGSG.eventManager.bindHandler(red.getHandle(), cgsgEventTypes.ON_DRAG, rgbListener);
        CGSG.eventManager.bindHandler(green.getHandle(), cgsgEventTypes.ON_DRAG, rgbListener);
        CGSG.eventManager.bindHandler(blue.getHandle(), cgsgEventTypes.ON_DRAG, rgbListener);

	}

});
