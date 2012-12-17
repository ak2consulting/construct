
	construct = function( options ){
		// containers
		this.loop = [];
		
		// extend default config with supplied config
		if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
		 
		require.config( construct.config );
		
		// execute any config options passed in the init()
		if( construct.callback ) construct.callback();
		
		// initialize APP
		var app = new APP();
		window.app = app;
		// start backbone history
		Backbone.history.start();
		
		return app;
			
	};
	
	construct.init = function(fn){
		// execute when construct is initialized
		//console.log("init");
		
		construct.callback = fn;
	};
		
	// stack middleware to be used
	construct.register = function( fn ){
		
		// add things in a the loop (if necessary)
		if(fn && fn.update){
			this.loop.push( fn.update );
		}
		
	};
	
	construct.configure = function(){
		// initial setup
		
	};
	
	// simple batch processor of all update events
	construct.update = function( fn ){
		// stack middleware
		
		
	};
	
	// Internal promise method...
    construct.promise = function(obj) {
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
                
                var callback;
                while (callback) {
                    callback.apply(obj, arguments);
					callback = callbacks.shift();
                }
                
                callbacks = null;
            }
        };
    };
    
	// Dependencies
	construct.config = {
		"paths": {
			"jquery": [
				"//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min",
				"/assets/js/lib/jquery.min"
			],
			"json2": [
				"//cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.min",
				"/assets/js/lib/json2.min"
			],
			"underscore": [
				"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min",
				"/assets/js/lib/underscore-min"
			],
			"handlebars": [
				"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min",
				"/assets/js/lib/handlebars.min"
			],
			"backbone": [
				"//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min",
				"/assets/js/lib/backbone-min"
			],
			"three.js": [
				"//cdnjs.cloudflare.com/ajax/libs/three.js/r53/three.min",
				"/assets/js/lib/three.min"
			],
			"backbone.app": [
				"https://raw.github.com/makesites/backbone-app/master/build/backbone.app", 
				"/assets/js/lib/backbone.app"
			],
			"jquery.three": [
				"https://raw.github.com/makesites/jquery-three/master/build/jquery.three", 
				"/assets/js/lib/jquery.three"
			]
		},
		"shim": {
			"jquery": {
				"deps": [
					"json2"
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
					"three.js"
				]
			}, 
			"construct.input": {
				"deps": [
					"construct"
				]
			}, 
			"construct.editor": {
				"deps": [
					"construct"
				]
			}
		}
	};
	
	//construct = new Construct();
	