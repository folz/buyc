var googleMapsApiKey = "AIzaSyC7dy0vGgygGSfavGOEQqslL2ltP8pqdRk";

import Ember from 'ember';

export default Ember.Controller.extend({
  distanceUnits: ["feet", "miles"],
  lastSavedModel: null,
  succeeded: false,
  run: false,
  code: 0,
  actions: {
    save: function() {
      var controller = this;
      if (this.get('location')) {
        $.ajax({
          dataType: "json",
          url: "https://maps.googleapis.com/maps/api/geocode/json?key=" + googleMapsApiKey + "&address=" + this.get('location').replace(' ', '+'),
          success: function(data) {
            if (data && data.results && data.results[0] && data.results[0].geometry) {
              var location = data.results[0].geometry.location;
              controller.get('model').set('name', controller.get('name'));
              controller.get('model').set('location', new EmberParseAdapter.GeoPoint(location.lat, location.lng));
              controller.get('model').set('minDollarsToSpend', parseFloat(controller.get('min_spend')));
              controller.get('model').set('couponPointValue', parseFloat(controller.get('coupon_value')) * 100);
              controller.get('model').set('reach', parseInt(controller.get('reach')));
              // controller.get('model').set('image', controller.get('image'));
              controller.get('model').set('adText', controller.get('ad_text'));
              var multiplier = controller.get('distance_unit') == 'miles' ? 5280 : 1;
              controller.get('model').set('maxDistanceInFeet', parseInt(controller.get('max_distance')) * multiplier);
              controller.set('code', Math.floor(Math.random() * 10000));
              controller.get('model').set('code', controller.get('code'));
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

