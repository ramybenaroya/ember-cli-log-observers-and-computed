import Ember from 'ember';
export default Ember.Controller.extend({
	aComputedProperty: function(){
		return this.get('counter');
	}.property('counter', 'some3', 'some1', 'some2'),
	anObserver: function(){
		var aComputedProperty = this.get('aComputedProperty');
		this.set('output', aComputedProperty);
	}.observes('counter', 'some1'),
	init: function(){
		this._super();
		setInterval(Ember.run.bind(this, this.incrementProperty, 'counter'), 500);
	},
	counter: 0,
	output: null
});