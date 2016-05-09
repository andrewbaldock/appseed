define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

      url: 'http://ip-api.com/json'

    });
});
