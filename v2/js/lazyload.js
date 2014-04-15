/*
 *  Angular LoadScript
 *
 *  Let angular load and execute lazy javascript from partials!
 *  
 *  This module is the result of  this issue: "1.2.0rc1 regression: script tags not loaded via ngInclude"
 *  Issue url: https://github.com/angular/angular.js/issues/3756
 * 
 *  As of Angular 1.2.0 the ngInclude scripts does not permit execution of javascript from included partials.
 *  This little module execute code inside script tags with "javascript-lazy" attribute after partial loading,
 *  thus re-enabling this feature.
 *
 *  ( please have a look at the issue comments, this angular feature was never planned nor included properly,
 *  was only a drawback of using jQuery for partial inclusion )
 * 
 *  This angular module have been created by @subudeepak(https://github.com/subudeepak) based on the code posted by @endorama (https://github.com/endorama) 
 *  (based upon the code
 *  posted by @olostan (https://github.com/olostan) )
 * 
 *  Simply add this file, load ngLoadScript module as application dependency and use type="text/javascript-lazy"
 *  as type for script you which to load lazily in partials.
 * 
 * License: 2013 - released to the Public Domain.
 */

/*global angular */
(function (ng) {
	'use strict';
	var app = ng.module('ngLoadScript', []);
	app.directive('script', function() {
		return {
			restrict: 'E',
			scope: false,
			link: function(scope, elem, attr)
			{
				var angularCorrections = //Document.write
					function(code)
					{
						var parentNode = elem[0].parentNode;
						if(!parentNode.id) parentNode.id = Date.now() +'_' + Math.floor((Math.random()*10)+1); //replace with your own random id generator
						var re = new RegExp("document.write(ln)?", "g"); //Support for Document.write only
						var newCode = code.replace(re,"document.getElementById('"+parentNode.id+"').innerHTML += ");
						console.log(newCode);
						return newCode;
					};
				if (attr.type==='text/javascript-lazy')
				{
					var s = document.createElement("script");
					s.type = "text/javascript";
					var src = elem.attr('src');
					if(src!==undefined)
					{
						s.src = src;
					}
					else
					{
						var code = elem.text();
						s.text = angularCorrections(code);
					}
					document.head.appendChild(s);
					elem.remove();
				}
			}
		};
	});
}(angular));
