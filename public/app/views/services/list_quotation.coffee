$ ->
  class optima.views.QuotationServicesView extends Backbone.View
    el: $ '#quotation-services'
    events: 
      'click a.quotation-product-open-create': 'openCreate'
      'click a.quotation-service-attach': 'attach'

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @add, @)
      @quotation_id = optima.pathArray[2]

      pubsub.on("services:pull", @getMore, @)

    getMore: (id) ->
      _.delay @pull(id), 3000

    pull: (quotationId) ->
      _this = @
      $.get "/api/v1/quotations/#{ quotationId }/services"
      .done (models) ->
        _this.collection.reset(models)
 
    add: (model) ->
      view = new optima.views.QuotationServiceView model: model
      $(@el).find('table').append view.render().el

    render: ->
      table = $(@el).find('table')
      table.empty()
      @collection.each (model) ->
        view = new optima.views.QuotationServiceView model: model
        table.append view.render().el
      , @

    openCreate: (e) ->
      e.preventDefault()
      view = new optima.views.QuotationServiceCreate
      view.render()

    #attach a service to quotation 
    #also notify via sockets
    attach: (e) ->
      e.preventDefault()
      service_id = $('#quotation-service-list').find('select').val()

      $.post "/api/v1/quotations/#{ @quotation_id }/services", service_id: service_id
      .done (res) ->
        socket.emit "quotation-service", res.id

      @storeActivity @quotation_id, "agrego un servicio"
      