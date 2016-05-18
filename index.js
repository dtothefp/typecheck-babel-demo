import _ from 'lodash';
import Backbone from 'backbone';
import 'backbone-validation';

const Base = Backbone.Model.extend({

  /**
   * Used when parsing a model to support a root-level key.
   *
   * @property {String} payloadRootName
   */
  payloadRootName: '',

  hasLoadedOnce: false,

  initialize: function(options) {
    this.listenToOnce(this, 'change', this.markAsLoadedOnce);
  },

  markAsLoadedOnce: function() {
    this.hasLoadedOnce = true;
  },

  /**
   * Provides basic parsing for model instances.
   *
   * Implements behavior of `payloadRootName`.
   *
   * @param  {Object} payload Raw JSON-parsed payload.
   * @return {Object}
   */
  parse: function(payload) {
    const root = this.payloadRootName;
    return root && _.has(payload, root) ? payload[root] : payload;
  },

  /**
   * Generates a view-ready copy of the model.
   *
   * By default, this is identical to `toJSON`, but should be overridden
   * to provide custom behavior.
   *
   * @return {Object}
   */
  toView: function() {
    return Backbone.Model.prototype.toJSON.apply(this, arguments);
  },
  /**
   * Easily get tag props by name
   * @param {String}
   * @returns {*}
   */
  getTag: function(tagName) {
    return _.get(this.attributes, 'tags.' + tagName, '');
  },

  setTag: function(tagName, value) {
    if (!this.attributes.tags) {
      this.attributes.tags = {};
    }
    this.attributes.tags[tagName] = value;
  },

  substituteString: function(str, replacements) {
    return str.replace(/%\w+%/g, function(all) {
      return replacements[all] || all;
    });
  }
});

_.extend(Base.prototype, Backbone.Validation.mixin);

export default Base;
