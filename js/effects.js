/**
 * Created with JetBrains WebStorm.
 * User: GBUCHET
 * Date: 27/09/12
 * Time: 09:49
 * To change this template use File | Settings | File Templates.
 */
hideElt = function(elt) {
	$(elt).hide(500);
}

showElt = function(elt) {
	$(elt).show(500);
}

toggleElt = function(elt) {
	$(elt).slideToggle("slow");
}