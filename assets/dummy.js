
;define("dummy/Code Snippet Ember Component/tests/code-snippet-ember-component/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - code-snippet-ember-component');
    test('code-snippet-ember-component/utils.js should pass jshint', function() { 
      ok(true, 'code-snippet-ember-component/utils.js should pass jshint.'); 
    });
  });
;define("dummy/Ember CLI QUnit/tests/ember-cli-qunit/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-cli-qunit');
    test('ember-cli-qunit/utils.js should pass jshint', function() { 
      ok(true, 'ember-cli-qunit/utils.js should pass jshint.'); 
    });
  });
;define("dummy/app", 
  ["ember","ember/resolver","ember/load-initializers","dummy/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Resolver = __dependency2__["default"];
    var loadInitializers = __dependency3__["default"];
    var config = __dependency4__["default"];

    Ember.MODEL_FACTORY_INJECTIONS = true;
    Ember.LOG_OBSERVERS = true;
    Ember.LOG_COMPUTED_PROPERTIES = true;
    var App = Ember.Application.extend({
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix,
      Resolver: Resolver
    });

    loadInitializers(App, config.modulePrefix);

    __exports__["default"] = App;
  });
;define("dummy/components/code-snippet", 
  ["ember","dummy/snippets","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Snippets = __dependency2__["default"];

    /* global require */
    var Highlight = require('highlight.js');

    __exports__["default"] = Ember.Component.extend({
      tagName: 'pre',
      classNameBindings: ['language'],
      unindent: true,

      _unindent: function(src) {
        if (!this.get('unindent')) {
          return src;
        }
        var match, min, lines = src.split("\n");
        for (var i = 0; i < lines.length; i++) {
          match = /^\s*/.exec(lines[i]);
          if (match && (typeof min === 'undefined' || min > match[0].length)) {
            min = match[0].length;
          }
        }
        if (typeof min !== 'undefined' && min > 0) {
          src = src.replace(new RegExp("(\\n|^)\\s{" + min + "}", 'g'), "$1");
        }
        return src;
      },

      source: function(){
        return this._unindent(
          (Snippets[this.get('name')] || "")
            .replace(/^(\s*\n)*/, '')
            .replace(/\s*$/, '')
        );
      }.property('name'),

      didInsertElement: function(){
        Highlight.highlightBlock(this.get('element'));
      },

      language: function(){
        var m = /\.(\w+)$/i.exec(this.get('name'));
        if (m) {
          switch (m[1].toLowerCase()) {
          case 'js':
            return 'javascript';
          case 'hbs':
            return 'handlebars';
          }
        }
      }.property('name')
    });
  });
;define("dummy/snippets", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = { ".gitkeep":"",
      "application.js":"import Ember from 'ember';\nexport default Ember.Controller.extend({\n\taComputedProperty: function(){\n\t\treturn this.get('counter');\n\t}.property('counter'),\n\tanObserver: function(){\n\t\tvar aComputedProperty = this.get('aComputedProperty');\n\t\tthis.set('output', aComputedProperty);\n\t}.observes('counter'),\n\tinit: function(){\n\t\tthis._super();\n\t\tsetInterval(Ember.run.bind(this, this.incrementProperty, 'counter'), 500);\n\t},\n\tcounter: 0,\n\toutput: null\n});" };
  });
;define("dummy/controllers/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Controller.extend({
    	aComputedProperty: function(){
    		return this.get('counter');
    	}.property('counter'),
    	anObserver: function(){
    		var aComputedProperty = this.get('aComputedProperty');
    		this.set('output', aComputedProperty);
    	}.observes('counter'),
    	init: function(){
    		this._super();
    		setInterval(Ember.run.bind(this, this.incrementProperty, 'counter'), 500);
    	},
    	counter: 0,
    	output: null
    });
  });
;define("dummy/ember-cli-content-security-policy/tests/ember-cli-content-security-policy/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-cli-content-security-policy');
    test('ember-cli-content-security-policy/utils.js should pass jshint', function() { 
      ok(true, 'ember-cli-content-security-policy/utils.js should pass jshint.'); 
    });
  });
;define("dummy/ember-cli-log-observers-and-computed/tests/ember-cli-log-observers-and-computed/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-cli-log-observers-and-computed');
    test('ember-cli-log-observers-and-computed/utils.js should pass jshint', function() { 
      ok(true, 'ember-cli-log-observers-and-computed/utils.js should pass jshint.'); 
    });
  });
;define("dummy/ember-data/tests/ember-data/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-data');
    test('ember-data/utils.js should pass jshint', function() { 
      ok(true, 'ember-data/utils.js should pass jshint.'); 
    });
  });
;define("dummy/ember-export-application-global/tests/ember-export-application-global/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - ember-export-application-global');
    test('ember-export-application-global/utils.js should pass jshint', function() { 
      ok(true, 'ember-export-application-global/utils.js should pass jshint.'); 
    });
  });
;define("dummy/initializers/export-application-global", 
  ["ember","dummy/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    function initialize(container, application) {
      var classifiedName = Ember.String.classify(config.modulePrefix);

      if (config.exportApplicationGlobal) {
        window[classifiedName] = application;
      }
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: 'export-application-global',

      initialize: initialize
    };
  });
;define("dummy/initializers/intercept-prototype-functions", 
  ["ember-cli-log-observers-and-computed/utils","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var applyAOP = __dependency1__.applyAOP;
    var formatArgs = __dependency1__.formatArgs;
    __exports__["default"] = {
    	before: 'domTemplates',
    	name: 'intercept-prototype-functions',
    	initialize: function() {
    		if (Ember.LOG_OBSERVERS && Function.prototype.observes) {
    			Function.prototype.observes = applyAOP(Function.prototype.observes, function(stackTrace, args) {
    				Ember.debug('Inside an observer' + formatArgs(', which observes ', args) + '.');
    				Ember.debug('called ' + stackTrace.stack[1].trim() + ' Timestamp: ' + new Date().getTime());
    			});
    		}
    		if (Ember.LOG_COMPUTED_PROPERTIES && Function.prototype.property) {
    			Function.prototype.property = applyAOP(Function.prototype.property, function(stackTrace, args) {
    				Ember.debug('Inside a computed property' + formatArgs(', which depends on ', args) + '.');
    				Ember.debug('called ' + stackTrace.stack[1].trim() + ' Timestamp: ' + new Date().getTime());
    			});
    		}
    	}
    }
  });
;define("dummy/live-reload-middleware/tests/live-reload-middleware/utils.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - live-reload-middleware');
    test('live-reload-middleware/utils.js should pass jshint', function() { 
      ok(true, 'live-reload-middleware/utils.js should pass jshint.'); 
    });
  });
;define("dummy/router", 
  ["ember","dummy/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function() {
    });

    __exports__["default"] = Router;
  });
;define("dummy/templates/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


      data.buffer.push("<div class=\"github-fork-ribbon-wrapper right\">\n    <div class=\"github-fork-ribbon\">\n        <a href=\"https://github.com/ramybenaroya/ember-cli-log-observers-and-computed\">Fork me on GitHub</a>\n    </div>\n</div>\n<h1>Ember-cli-log-observers-and-computed Example</h1>\n");
      data.buffer.push(escapeExpression((helper = helpers['code-snippet'] || (depth0 && depth0['code-snippet']),options={hash:{
        'name': ("application.js")
      },hashTypes:{'name': "STRING"},hashContexts:{'name': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "code-snippet", options))));
      data.buffer.push("\nOutput: ");
      stack1 = helpers._triageMustache.call(depth0, "output", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n<p>\n	Open the console and you will see endless debug messages\n</p>\n<section>\n	Maintained by <a target=\"_blank\" href=\"https://github.com/ramybenaroya\">@ramybenaroya</a>\n</section\n");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
;define("dummy/templates/components/code-snippet", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1;


      stack1 = helpers._triageMustache.call(depth0, "source", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
;define("dummy/tests/app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('app.js should pass jshint', function() { 
      ok(true, 'app.js should pass jshint.'); 
    });
  });
;define("dummy/tests/controllers/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/application.js should pass jshint', function() { 
      ok(true, 'controllers/application.js should pass jshint.'); 
    });
  });
;define("dummy/tests/dummy/tests/helpers/resolver.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - dummy/tests/helpers');
    test('dummy/tests/helpers/resolver.js should pass jshint', function() { 
      ok(true, 'dummy/tests/helpers/resolver.js should pass jshint.'); 
    });
  });
;define("dummy/tests/dummy/tests/helpers/start-app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - dummy/tests/helpers');
    test('dummy/tests/helpers/start-app.js should pass jshint', function() { 
      ok(true, 'dummy/tests/helpers/start-app.js should pass jshint.'); 
    });
  });
;define("dummy/tests/dummy/tests/test-helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - dummy/tests');
    test('dummy/tests/test-helper.js should pass jshint', function() { 
      ok(true, 'dummy/tests/test-helper.js should pass jshint.'); 
    });
  });
;define("dummy/tests/helpers/resolver", 
  ["ember/resolver","dummy/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var config = __dependency2__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix
    };

    __exports__["default"] = resolver;
  });
;define("dummy/tests/helpers/start-app", 
  ["ember","dummy/app","dummy/router","dummy/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Application = __dependency2__["default"];
    var Router = __dependency3__["default"];
    var config = __dependency4__["default"];

    __exports__["default"] = function startApp(attrs) {
      var App;

      var attributes = Ember.merge({}, config.APP);
      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

      Router.reopen({
        location: 'none'
      });

      Ember.run(function() {
        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();
      });

      App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

      return App;
    }
  });
;define("dummy/tests/router.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('router.js should pass jshint', function() { 
      ok(true, 'router.js should pass jshint.'); 
    });
  });
;define("dummy/tests/test-helper", 
  ["dummy/tests/helpers/resolver","ember-qunit"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var resolver = __dependency1__["default"];
    var setResolver = __dependency2__.setResolver;

    setResolver(resolver);

    document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

    QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
    var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
    document.getElementById('ember-testing-container').style.visibility = containerVisibility;
  });
/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */


});

if (runningTests) {
  require('dummy/tests/test-helper');
} else {
  require('dummy/app')['default'].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true});
}

/* jshint ignore:end */
