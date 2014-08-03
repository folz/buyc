/*global EmberParseAdapter*/

import Ember from 'ember';

export default Ember.Controller.extend({
  lastSavedModel: null,
  succeeded: false,
  name: null,
  actions: {
    reset: function() {
      this.set('name', null);
      this.set('succeeded', null);
    },
    save: function() {
      var controller = this;
      var parsedGP = parseGeoPoint(this.get('location'));
      this.get('model').set('name', this.get('name'));
      this.get('model').set('location', new EmberParseAdapter.GeoPoint(parsedGP.latitude, parsedGP.longitude));
      this.get('model').save().then(
        function(business) {
          controller.set('succeeded', true);
          controller.set('lastSavedModel', business);
        },
        function(error) {
          controller.set('succeeded', false);
          console.log(error);
        }
      );
    }
  }
});

function parseGeoPoint(gpString) {
  var lat = parseFloat(gpString.split(',')[0]);
  var long = parseFloat(gpString.split(',')[1]);
  return {
    'latitude': lat,
    'longitude': long
  };
}
