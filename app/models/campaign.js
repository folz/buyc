import DS from 'ember-data';

export default DS.Model.extend({
  business: DS.belongsTo('business'),
  reach: DS.attr('number'),
  image: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  maxDistanceInFeet: DS.attr('number'),
  code: DS.attr('number')
});
