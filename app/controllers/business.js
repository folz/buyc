/*global $, EmberParseAdapter*/

import Ember from 'ember';

var googleMapsApiKey = "AIzaSyC7dy0vGgygGSfavGOEQqslL2ltP8pqdRk";

export default Ember.Controller.extend({
  lastSavedModel: null,
  succeeded: false,
  name: null,
  actions: {
    save: function() {
      var controller = this;
      if (this.get('address')) {
        $.ajax({
          dataType: "json",
          url: "https://maps.googleapis.com/maps/api/geocode/json?key=" + googleMapsApiKey + "&address=" + this.get('address').replace(' ', '+'),
          success: function(data) {
            if (data && data.results && data.results[0] && data.results[0].geometry) {
              var location = data.results[0].geometry.location;
              controller.get('model').set('name', controller.get('name'));
              controller.get('model').set('address', controller.get('address'));
              controller.get('model').set('location', new EmberParseAdapter.GeoPoint(location.lat, location.lng));
              controller.get('model').save().then(
                function(business) {
                  controller.set('run', true);
                  controller.set('succeeded', true);
                  controller.set('lastSavedModel', business);
                  console.log(business);
                },
                function(error) {
                  controller.set('run', true);
                  controller.set('succeeded', false);
                  console.log(error);
                }
              );
            }
          }
        });
      } else {
        controller.set('run', true);
        controller.set('succeeded', false);
      }
    }
  }
});
