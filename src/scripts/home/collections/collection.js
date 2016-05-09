define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Collection.extend({

      url: 'http://quotesondesign.com/wp-json/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1',

      initialize: function() {
        this.load();
        this.model = require('home/models/model');
      },

      save: function() {
        var toSave = JSON.stringify(this.models);
        localStorage.setItem('thisCollection', toSave);
      },

      load: function() {
        if(this.loaded) {
          return;
        } else {
          this.loaded = true;
        }
        var toLoad = localStorage.getItem('thisCollection') || [];
        if (toLoad.length) {
          toLoad = JSON.parse(toLoad);
        }
        this.reset(toLoad);
      }

    });

});
