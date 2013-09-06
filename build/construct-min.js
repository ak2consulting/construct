!function(){var t=function(t){var e=null,n=[],i=!1;this.add=function(s){i?s.apply(t,e):n.push(s)},this.resolve=function(){if(!i){e=arguments,i=!0;for(var s=n.shift();s;)s.apply(t,arguments),s=n.shift();n=null}}};Object.extend=function(t,e){for(var n in e)e[n]&&e[n].constructor&&e[n].constructor===Object?(t[n]=t[n]||{},arguments.callee(t[n],e[n])):t[n]=e[n];return t};var e={"en-US":{error:{"no-backbone":"Backbone is not available: http://backbonejs.org/","no-jquery":"jQuery is not available: http://jquery.com/","no-jquery-three":"jQuery Three is required: http://github.com/makesites/jquery-three","no-backbone-app":"This function requires Backbone APP: http://github.com/makesites/backbone-app"}}};construct=function(t,e){t.libs&&Object.extend(construct.config,t.libs),e&&(construct.callback=e),require.config(construct.config),require(construct.config.deps,construct.init)},construct.init=function(){construct.promise.resolve();var t=new APP;window.app=t,Backbone.history.start(),construct.callback&&construct.callback(t)},construct.register=function(t){t&&t.update&&construct.loop.push(t.update)},construct.configure=function(t){construct.promise.add(t)},construct.lang=function(t){Object.extend(e,t)},construct.loop=[],construct.update=function(){},construct.log=function(t,n){if(t&&n){var i=navigator.language?navigator.language:navigator.userLanguage,s=e[i][t][n]||e["en-US"][t][n]||t+": "+n;console.log(s)}},construct.promise=new t,construct.config={paths:{jquery:["//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"],json3:["//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"],underscore:["//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"],handlebars:["//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"],backbone:["//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"],"three-js":["//cdnjs.cloudflare.com/ajax/libs/three.js/r58/three.min"],"backbone.app":["//rawgithub.com/makesites/backbone-app/master/build/backbone.app"],"jquery.three":["//rawgithub.com/makesites/jquery-three/master/build/jquery.three"]},shim:{jquery:{deps:["json3"]},underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},"backbone.app":{deps:["backbone","underscore","jquery"]},"jquery.three":{deps:["jquery","three-js"]}},deps:["backbone.app","jquery.three","handlebars"]},construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var t=APP.Model||Backbone.Model,e=APP.Collection||Backbone.Collection;APP.Models.User=t.extend({defaults:{admin:!0}}),APP.Models.Asset=t.extend({defaults:{x:0,y:0,editable:!0}}),APP.Models.Mesh=t.extend({defaults:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]}}),APP.Collections.Users=e.extend({}),APP.Collections.Assets=e.extend({}),APP.Collections.Objects=Backbone.Model.extend({set:function(t){for(var e in t)this._setupObject(t[e]);return Backbone.Model.prototype.set.apply(this,arguments)},_setupObject:function(t){var e=this;t.state.rendered&&this.trigger("find",t),t.on("render",function(){e.trigger("find",t)}),t.on("find",function(t){e.trigger("find",t)})}}),APP.Models.Layers=Backbone.Model.extend({set:function(t){for(var e in t){var n=t[e];n.on("find",_.bind(this.bubble,this))}return Backbone.Model.prototype.set.apply(this,arguments)},bubble:function(t){this.trigger("find",t)}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={}),APP.Model||Backbone.Model,APP.Collection||Backbone.Collection;var t=APP.View||Backbone.View;APP.Layout||Backbone.Layout,APP.Layers={},APP.Meshes={},APP.Sprites={},APP.Actors={},APP.Views.Main3D=APP.View.extend({el:".main",options:{renderTarget:"shadow-root"},initialize:function(t){return this.objects=new APP.Collections.Objects,this.layers=new APP.Models.Layers,this.$3d=$(this.el).three({watch:!0},_.bind(this._start,this)),$("body").on("update",this.el,_.bind(this._update,this)),this.objects.on("find",_.bind(this._find,this)),this.layers.on("find",_.bind(this._find,this)),APP.View.prototype.initialize.call(this,t)},start:function(){},update:function(){},_start:function(t){this.$3d=t,this.start(t)},_update:function(t){for(var e in this.objects.attributes)this.objects.get(e).trigger("update");for(var n in this.layers.attributes)this.layers.get(n).trigger("update");this.update(t)},_find:function(t){var e=$(t.el).find("[data-id]").length>0?$(t.el).find("[data-id]").attr("data-id"):$(t.el).attr("data-id");if(!_.isUndefined(e)){var n=this.$3d.get(e);t.object=n,t.trigger("start")}}}),APP.Mesh=t.extend({options:{speed:!1,bind:"sync"},state:{rendered:!1},initialize:function(e){return e=e||{},e.models?void 0:(this.data=this.data||e.data||this.model||new APP.Models.Mesh,this.on("update",_.bind(this._update,this)),this.on("start",_.bind(this._start,this)),t.prototype.initialize.apply(this,arguments))},start:function(){},_start:function(){var t=this.data.get("position"),e=APP.Models.Mesh.prototype.defaults.position;t!==e&&this.object.position.set(t[0],t[1],t[2]);var n=this.data.get("rotation"),i=APP.Models.Mesh.prototype.defaults.rotation;n!==i&&this.object.rotation.set(n[0],n[1],n[2]);var s=this.data.get("scale"),o=APP.Models.Mesh.prototype.defaults.scale;s!==o&&this.object.scale.set(s[0],s[1],s[2]),this.start()},_postRender:function(){return this.state.rendered=!0,this.trigger("render"),t.prototype._postRender.call(this)},_update:function(t){if(_.isUndefined(this.object))return this.trigger("render");if(this.options.speed&&this.object){var e=this.options.speed,n=this.object.position;e.x&&(n.x+=e.x),e.y&&(n.y+=e.y),e.z&&(n.z+=e.z),this.object.position.set(n.x,n.y,n.z)}if(this.objects)for(var i in this.objects.attributes)this.objects.get(i).trigger("update");this.update(t)},update:function(){},_validate:function(){return!0}}),APP.Meshes.Static=APP.Mesh.extend({}),APP.Meshes.Dynamic=APP.Meshes.Static.extend({initialize:function(t){return this.objects=new APP.Collections.Objects,this.objects.on("find",_.bind(this._find,this)),APP.Meshes.Static.prototype.initialize.call(this,t)},_find:function(t){this.trigger("find",t)}}),APP.Meshes.Avatar=APP.Meshes.Dynamic.extend({}),APP.Meshes.NPC=APP.Meshes.Avatar.extend({}),APP.Meshes.Player=APP.Meshes.Avatar.extend({}),APP.Sprite=t.extend({}),APP.Sprites.Static=APP.Sprite.extend({}),APP.Sprites.Animated=APP.Sprite.extend({}),APP.Views.Asset=t.extend({}),APP.Layer=Backbone.Collection.extend({initialize:function(t,e){this.el=this.el||e.el||null,this.objects=[];for(var n=0;n<t.length;n++){t.get(n)||{};var i=new this.model({parentEl:this.el,renderTarget:this.el,append:!0});this._setupObject(i),this.objects.push(i)}return this.on("update",_.bind(this._update,this)),APP.Collection.prototype.initialize.call(this,null,e)},update:function(){},_update:function(t){for(var e in this.objects)this.objects[e].trigger("update");this.update(t)},_setupObject:function(t){var e=this;t.state.rendered&&this.trigger("find",t),t.on("render",function(){e.trigger("find",t)})}})}),construct.promise.add(function(){"undefined"==typeof APP&&(window.APP={});var t=APP.Router||Backbone.Router;APP.Routers.Default=APP.Routers.Default||t.extend({initialize:function(e){return _.bindAll(this,"index"),this.data=new Backbone.Model,console.log("init","APP.Routers.Default"),t.prototype.initialize.call(this,e)},routes:{"":"index"},index:function(){console.log("Construct.js is running..."),_.isUndefined(APP.Main)||(this.main=new APP.Main({data:this.data}))}})})}();