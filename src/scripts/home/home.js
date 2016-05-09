define(function (require) {

  'use strict';

  var Backbone = require('backbone');
  var SubView = require('home/subview');

  // ---------------------------------
  var IP = require('home/models/ip');
  // var Quote = require('home/models/quote');
  // var Quotes = require('home/collections/quotes');
  var Collection = require('home/collections/collection');
  var Model = require('home/models/model');

  // ---------------------------------

  var tpl = require('text!home/templates/home.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    events: {
      'click .new-subview': 'launchNewSubview'
    },

    initialize: function(options) {
      this.state = options.state;
      this.subViews = [];
      this.collection = new Collection();
      window.col = this.collection;
      // this.quotes = new Quotes();
    },

    render: function() {
      this.$el.html(template(this));
      $('body').addClass('home-body');
      this.start();
      this.getUserIP();
      // ---------------------------------
      // this.getQuote();

      // ---------------------------------

      return this;
    },

    // ---------------------------------

    start: function() {
      var newModel = new Model();
      this.listenTo(newModel, 'sync', this.addToCollection);
      newModel.fetch();
    },

    addToCollection: function(model) {
      this.collection.add(model);
      this.collection.save();
      console.log(this.collection.models);
    },

    getUserIP: function() {
      var ip = new IP();
      this.listenTo(ip, 'sync', this.onIpSync);
      ip.fetch();
    },

    onIpSync: function(model){
      var ip = model.get('query');
      console.log(ip);
    },

    // getQuote: function() {
    //   var quote = new Quote();
    //   if (!this.quotes) {
    //     this.quotes = new Quotes();
    //   }
    //   this.quotes.add(quote);
    //   this.listenTo(quote, 'sync', this.onQuoteSync);
    //   quote.fetch();
    // },

    // onQuoteSync: function(model){
    //   this.state.set({currentQuote: model});
    //   console.log(this);
    // },

    // ---------------------------------

    launchNewSubview: function() {
      var view = new SubView({
        state: this.state
      });
      this.subViews.push(view);
      this.$('.subview-container').prepend(view.render().el);
      this.listenTo(view, 'close', this.onSubviewClose);
    },

    onSubviewClose: function() {
      //
    },

    // -------------------------------------------

    removeSubViews: function() {
      _.each(this.subviews, function(subview){
        subview.remove();
      })
    },

    remove: function() {
      $('body').removeClass('home-body');
      this.removeSubviews();
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

