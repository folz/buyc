import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  location: DS.attr('parse-geo-point'),
  minDollarsToSpend: DS.attr('number'),
  couponPointValue: DS.attr('number'),
  reach: DS.attr('number'),
  image: DS.attr('string'),
  adText: DS.attr('string'),
  maxDistanceInFeet: DS.attr('number')
});
