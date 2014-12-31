import Ember from 'ember';
export default Ember.Controller.extend({
	aComputedProperty: function(){
		return this.get('counter');
	}.property('counter'),
	anObserver: function(){
		var aComputedProperty = this.get('aComputedProperty');
		this.set('output', aComputedProperty);
	}.observes('counter'),
	init: function(){
		this._super();
		setInterval(Ember.run.bind(this, this.incrementProperty, 'counter'), 100);
	},
	counter: 0,
	output: null
});