import {applyAOP} from 'ember-cli-log-observers-and-computed/utils';
export default {
	before: 'domTemplates',
	name: 'intercept-prototype-functions',
	initialize: function() {
		if (Ember.LOG_OBSERVERS && Function.prototype.observes) {
			Function.prototype.observes = applyAOP(Function.prototype.observes, function(stackTrace) {
				Ember.debug('Inside an observer');
				Ember.debug('called ' + stackTrace.stack[1]);
			});
		}
		if (Ember.LOG_COMPUTED_PROPERTIES && Function.prototype.property) {
			Function.prototype.property = applyAOP(Function.prototype.property, function(stackTrace) {
				Ember.debug('Inside a computed property');
				Ember.debug('called ' + stackTrace.stack[1]);
			});
		}
	}
}