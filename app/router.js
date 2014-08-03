import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BuycENV.locationType
});

Router.map(function() {
  this.route('campaign');
  this.resource('businesses', {path: '/business'}, function() {
    this.route('/new');
  });
  this.resource('business', {path: '/business/:business_id'});
  this.route('businesses/new');
});

export default Router;
