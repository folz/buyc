import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BuycENV.locationType
});

Router.map(function() {
  this.route('campaign');
  this.route('business');
  this.route('businesses');
});

export default Router;
