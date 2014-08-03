import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.get('store').createRecord('campaign');
  },
  afterModel: function() {
    var route = this;
    return route.store.find('business').then(function(items) {
      route.controllerFor('businesses').set('content', items);
    })
  }
});
