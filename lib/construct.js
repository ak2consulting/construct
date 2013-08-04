// main lib

construct = function( options, callback ){

	// prerequisites
	if( typeof Backbone == "undefined" ) return construct.log("error", "no-backbone");
	if( typeof jQuery == "undefined" ) return construct.log("error", "no-jquery");
	if( typeof jQuery.fn.three == "undefined" ) return construct.log("error", "no-jquery-three");

	// extend default config with supplied config
	//if( options.deps ) construct.config = $.extend( true, options.deps, construct.config);
	//if( options.deps ) Object.extend(construct.config, options.deps);

	if( callback ) construct.callback = callback;

	// execute any config options passed in the init()
	construct.promise.resolve();
	// set the init method
	//construct.config.init = construct.init;

	//require.config( construct.config );

	//require( construct.config.deps, construct.init);
	construct.init();

};

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
