/*
 * Construct.js : Constructor
 *
 * @author Makis Tracend
 * @cc_on Copyright © 2013 Makesites.org
 *
 * @license Dual-licensed under the MPL and AGPL:
 * https://github.com/makesites/construct/blob/master/LICENSE
 */


(function(){

// Utils

// - Internal promise method...
var Promise = function(obj) {
	var args = null;
	var callbacks = [];
	var resolved = false;

	this.add = function(callback) {
		if (resolved) {
			callback.apply(obj, args);
		} else {
			callbacks.push(callback);
		}
	};

	this.resolve = function() {
		if (!resolved) {
			args = arguments;
			resolved = true;

			var callback = callbacks.shift();
			while (callback) {
				callback.apply(obj, arguments);
				callback = callbacks.shift();
			}

			callbacks = null;
		}
	};
};

// - Object extend
Object.extend = function(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};

/* Language file */

var locale = {
	"en-US": {
		"error": {
			"no-backbone": "Backbone is not available: http://backbonejs.org/",
			"no-jquery": "jQuery is not available: http://jquery.com/",
			"no-jquery-three": "jQuery Three is required: http://github.com/makesites/jquery-three",
			"no-backbone-app": "This function requires Backbone APP: http://github.com/makesites/backbone-app"
		}
	}
};
// main lib

construct = function( options, callback ){

	// prerequisites
	//if( typeof Backbone == "undefined" ) return construct.log("error", "no-backbone");
	//if( typeof jQuery == "undefined" ) return construct.log("error", "no-jquery");
	//if( typeof jQuery.fn.three == "undefined" ) return construct.log("error", "no-jquery-three");

	// extend default config with supplied config
	//if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
	if( options.deps ) Object.extend(construct.config, options.deps);

	if( callback ) construct.callback = callback;

	// set the init method
	//construct.config.init = construct.init;

	require.config( construct.config );
	//console.log( construct.config );
	require( construct.config.deps, construct.init);
	//construct.init();

};

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");
	// execute any config options passed in the init()
	construct.promise.resolve();

	// initialize APP
	var app = new APP();
	window.app = app;
	// start backbone history
	Backbone.history.start();

	if( construct.callback ) construct.callback( app );
	//return app;

};


// stack middleware to be used
construct.register = function( fn ){

	//fn();
	// add things in the loop (if necessary)
	if(fn && fn.update){
		construct.loop.push( fn.update );
	}

};

// initial setup
construct.configure = function( fn ){

	// validate function?
	construct.promise.add( fn );

};

// extend language support
construct.lang = function( language ){
	// check language structure first...
	Object.extend(locale, language);
};

/* Helper methods */
/* consider prefixing with _  ? */


construct.loop = [];

// simple batch processor of all update events
construct.update = function( fn ){
	// stack middleware


};

// output status messages
// inspired by the l10n handlebars helper: https://gist.github.com/tracend/3261055
construct.log = function( type, key ){
	//prerequisites
	if(!type || !key) return;
	// find language
	// make this a config option? (to avoid repeat lookups)
	var lang = (navigator.language) ? navigator.language : navigator.userLanguage;

	// pick the right dictionary - rever to the passed type/key
	var string = locale[lang][type][key] || locale['en-US'][type][key] || type +": "+ key;

	// check if console.log exists first?

	//output
	console.log(string);

};


construct.promise = new Promise();


// Dependencies

construct.config = {
	"paths": {
		"jquery": [
			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"
		],
		"json3": [
			"//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
		],
		"three-js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"
		],
		"backbone.app": [
			"//rawgithub.com/makesites/backbone-app/master/build/backbone.app"
		],
		"jquery.three": [
			"//rawgithub.com/makesites/jquery-three/master/build/jquery.three"
		]
	},
	"shim": {
		"jquery": {
			"deps": [
				"json3"
			]
		},
		"underscore": {
			"exports": "_"
		},
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"backbone.app": {
			"deps": [
				"backbone",
				"underscore",
				"jquery"
			]
		},
		"jquery.three": {
			"deps": [
				"jquery",
				"three-js"
			]
		}
	},
	"deps": ["backbone.app", "jquery.three", "handlebars"]
};


// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Model = APP.Model || Backbone.Model;
	var Collection = APP.Collection || Backbone.Collection;

	APP.Models.User = Model.extend({
		defaults: {
			admin : true
		}
	});

	APP.Models.Asset = Model.extend({
		defaults: {
			x : 0,
			y : 0,
			editable : true
		}
	});

	APP.Collections.Users = Collection.extend({
	});

	APP.Collections.Assets = Collection.extend({
	});

	//});
});


// Add models after dependencies are laoded
construct.promise.add(function(){

//require(["backbone.app", "jquery.three"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Model = APP.Model || Backbone.Model;
	var Collection = APP.Collection || Backbone.Collection;
	var View = APP.View || Backbone.View;
	var Layout = APP.Layout || Backbone.Layout;

	// extend APP namespace
	APP.Meshes = {};
	APP.Sprites = {};
	APP.Actors = {};


	APP.Views.Main3D = APP.View.extend({
		el: ".main",
		options: {
			renderTarget: "shadow-root"
		},
		initialize: function( options ){
			//_.bindAll(this, "");
			// main container(s)
			this.objects = new Backbone.Model();

			// create the 3D environment
			this.$3d = $(this.el).three({}, _.bind(this._start, this) );

			// add event listener
			$(this.el).on("update", this._update);

			return APP.View.prototype.initialize.call( this, options );
		},

		// when the 3D environement is ready
		start: function( $3d ){

		},

		// trigger on every frame
		update: function(){

		},

		// Internal
		_start: function( $3d ){
			// automatic startup
			// - save Three.js instance
			this.$3d = $3d;
			// user-defined startup
			this.start( $3d );
		},

		_update: function( e ){
			// automatic updates

			// user-defined updates
			this.update( e );
		}

	});


	APP.Mesh = View.extend({
		/*
		preRender: function(){

		},
		render: function(){

		},
		postRender: function(){

		},
		*/
		update: function(){
			// executed on every tick

		}

	});

	/* extending Mesh */
	APP.Meshes.Static = APP.Mesh.extend({
	});

	APP.Meshes.Dynamic = APP.Meshes.Static.extend({

	});


	APP.Meshes.Avatar = APP.Meshes.Dynamic.extend({
	});


	/* extending Avatar */
	APP.Meshes.NPC = APP.Meshes.Avatar.extend({
	});


	APP.Meshes.Player = APP.Meshes.Avatar.extend({
	});


	APP.Sprite = View.extend({
	});


	/* extending Sprite */
	APP.Sprites.Static = APP.Sprite.extend({
	});

	APP.Sprites.Animated = APP.Sprite.extend({
	});


	APP.Views.Asset = View.extend({

		// user jquery-three for rendering
		// attach dat.gui view if editable & user has admin rights
	});


//});

});


// Add models after dependencies are laoded
construct.promise.add(function(){
	//require(["backbone.app"], function(){

	// reference in the APP namespace
	if( typeof APP == "undefined" ) window.APP = {};
	// fallbacks
	var Router = APP.Router || Backbone.Router;

	// default router - feel free to overwrite
	APP.Routers.Default = APP.Routers.Default || Router.extend({
		initialize: function( options ){
			_.bindAll(this, "index");
			this.data = new Backbone.Model();
			console.log("init", "APP.Routers.Default");
			return Router.prototype.initialize.call(this, options);
		},
		routes: {
			"" : "index"
		},
		index: function(){
			console.log( "Construct.js is running..." );
			//this.layout = new APP.Layouts.Default({ data : this.data });
		}
	});

	//});
});


})();