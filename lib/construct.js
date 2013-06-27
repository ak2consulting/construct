// main lib

construct = function( options, callback ){
	
	// extend default config with supplied config
	if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
	
	if( callback ) construct.callback = callback;
	
	// execute any config options passed in the init()
	construct.promise.resolve();
	// set the initi method
	//construct.config.init = construct.init;
	
	require.config( construct.config );
	
	require( construct.config.deps, construct.init);
	
};

construct.loop = [];

construct.init = function(){
	// execute when construct is initialized
	//console.log("init");
		
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

// simple batch processor of all update events
construct.update = function( fn ){
	// stack middleware
	
	
};

construct.promise = new Promise();
