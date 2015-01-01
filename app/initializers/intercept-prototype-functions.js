import {applyAOP, formatArgs} from 'ember-cli-log-observers-and-computed/utils';
export default {
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