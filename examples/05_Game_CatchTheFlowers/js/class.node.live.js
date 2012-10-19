/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * @project CatchTheFlowers
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var LiveNode = CGSGNodeSquare.extend(
	{
		initialize : function(x, y, w, h) {
			this._super(x, y, w, h);

			this.color = "#dfcfff";
			this.lineColor = "#ab7cb0";
			this.lineWidth = 1;

			this.textNode = new CGSGNodeText(5, 0, "Live:");
			this.addChild(this.textNode);
			this.textNode.color = "#ab7cb0";
			this.textNode.setSize(11);
		},

		removeLife : function() {

		}

	}
);