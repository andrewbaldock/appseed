define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

      initialize: function() {
        this.collection = require('home/collections/collection');
      },

      // parse: function(response, options){
      //   response = response[0];
      //   response.id = response.ID
      //   return response;
      // },

    });
});
