var SkyNode = CGSGNode.extend(
	{
		initialize : function() {
			//call the parent winth parameters x and y set to 0
			this._super(0, 0);
			//resize the node to fit the scene
			this.resizeTo(CGSG.canvas.width, CGSG.canvas.height);

			//optimize the rendering by precomputed this node
			this.isTraversable = false;
			this.setPrecomputed(true);

			//add, as child, a yellow circle to make the sun
			var sun = new CGSGNodeCircle(60, 60, 30); //center x, center y, radius
			sun.color = "yellow";
			this.addChild(sun);
		},

		/**
		 * Custom rendering
		 * @method render
		 * @param context {CanvasRenderingContext2D} the context into render the node
		 * */
		render : function(context) {
			//Here is standard HTML5 code to create a gradient and fill a rectangle with it
			var gradient = context.createLinearGradient(0, 0, 0, this.dimension.height);
			gradient.addColorStop(0, "#48A9FF");
			gradient.addColorStop(1, "#FFFFFF");
			context.fillStyle = gradient;

			context.fillRect(0, 0, this.dimension.width, this.dimension.height);
		}
	}
);
