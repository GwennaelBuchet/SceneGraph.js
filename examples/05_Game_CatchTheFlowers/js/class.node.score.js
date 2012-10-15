/**
 * Created with JetBrains WebStorm.
 * User: Gwen
 * @project CatchTheFlowers
 * Date: 25/07/12
 * Time: 11:52
 * To change this template use File | Settings | File Templates.
 */
var ScoreNode = CGSGNodeSquare.extend(
	{
		initialize : function(x, y, w, h) {
			this._super(x, y, w, h);

			this.color = "#cfffec";
			this.lineColor = "#4d9861";
			this.lineWidth = 1;

			this.textNode = new CGSGNodeText(5, 0, "");
			this.addChild(this.textNode);
			this.textNode.color = "#4d9861";
			this.textNode.setSize(11);
		},

		setScore : function(score) {
			this.textNode.setText("score: " + score, true);
		}

	}
);