SceneGraph.js
============

SceneGraph.js (formerly "cgSceneGraph") is a powerful and very easy-to-use Scene Graph framework written in JavaScript for the &lt;canvas&gt; tag in HTML5
It's full oriented object to ease the development of your applications and games.

Since the start of the project, it has been designed to be used on professional application as well as for game development.

The power of the framework is inside its concept : the framework itself does not render anything, and provides a lot of cool and useful features.
It was designed to be extended : you can use or create an infinite number of extensions of the node class (CGSGNode) to be rendered.
You are not, and won't never be, limited to what the framework provides by itself because it is designed to be extended !

Of course, a lot of powerful extensions are already provided with the framework:
- image node
- animated sprite node
- text node
- button node
- Dom integration node (webview, HTML tags, ...)
- colorpicker node
- particle system node
- square, circle, ellipse, lines
- ...

Please, feel free to share your own extensions or to publish a link to your projects using the SceneGraph.js :)

Features
========
* Object oriented development
* Easy managing of complex scenes
* Hierarchy of nodes, keeping a trace of their absolute transformation matrix
* Mouse and touch events, seamlessly for the developer (just define a onClick event on a node or the scene, the framework take care of the rest)
* Mouse enter/over/out/click/dblclick events on nodes
* Multi-selection
* Draggable attribute
* Resizable attribute
* Powerful animated sprites with event handlers
* Powerful and easy to use animation framework with event handlers
* Asynchronous image loading
* Sharing of image between several nodes to optimize the memory consumption
* spritesheet and tiles images
* Fast collision detection
* Traverser class to quicly find nodes with condition
* Display ratio to render the same content on different screen sizes
* Powerful particle system
* Color manipulation
* More than 30 events for nodes, scene and animations
* Easily extension of CGSGNode and framework
* Use of RequestAnimationFrame to correctly synchronize the rendering pass with the browser
* Lots of useful functions
* ...

How to use examples ?
=====================
Each project includes a link to the framework in the 'min' folder, in its index.html file.
So be sure to also download it, or to change the link url.


Why to offer the SceneGraph.js as an open source project ?
=========================================================
For a lot of excellent reasons :) :
* we think innovation has to be shared to be really useful
* we trust in our team and the quality of its work
* we are convinced that it's a very powerful tool and it can help lot of people and projects
* we are very exciting to see what can people do with it :)

## &nbsp;
#### By downloading the framework, its sources or its documentation, you agree to the following license :

LICENSE
=======
The SceneGraph.js is under a slightly modified MIT license, described as below :

Copyright (c) 2012-2014 Gwennaël Buchet

License/Terms of Use

Permission is hereby granted, free of charge and for the term of intellectual property rights on the Software, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use, copy, modify and propagate free of charge, anywhere in the world, all or part of the Software subject to the following mandatory conditions:

•  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

Any failure to comply with the above shall automatically terminate the license and be construed as a breach of these Terms of Use causing significant harm to Gwennaël Buchet.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of Gwennaël Buchet shall not be used in advertising or otherwise to promote the use or other dealings in this Software without prior written authorization from Gwennaël Buchet.

These Terms of Use are subject to French law.
