import DS from 'ember-data';

export default DS.Model.extend({
  business: DS.belongsTo('business'),
  title: DS.attr('string'),
  desc: DS.attr('string'),
  start: DS.attr('date'),
  end: DS.attr('date'),
  tos: DS.attr('string'),
  offers: DS.attr('number'),
});
