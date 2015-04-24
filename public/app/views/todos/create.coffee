$ ->
  class optima.views.TodoCreateView extends Backbone.View
    events:
      'click .todo-save-store' : 'store'
      'click .modal-close' : 'cancel'

    initialize: ->
      @listenTo(@model, 'sync', @stored)
      @listenTo(@model, 'error', @showErrors)
      @container = $("#todo-create-modal")

    render: (users, tracking_id) ->
      $el = $(@el)
      template = optima.templates.todo_create
      data = users: users, tracking_id: tracking_id
      $el.html(template( data ))
      @openModal()
      
    openModal: ->
      @container.html(@el)
      @container.find('.datepicker').pickadate formatSubmit: 'yyyy/mm/dd'
      @container.find('.timepicker').pickatime formatSubmit: 'HH:i', hiddenName = true
      @container.modal backdrop: 'static'

    serializeData: (dataForm) ->
      dataForm['quotation_id'] = optima.pathArray[2]
      dataForm['expires_date'] = dataForm['expires_date_submit']
      dataForm['expires_time'] = dataForm['expires_time_submit']
      if dataForm['tracking_id'] == ''
        delete dataForm['tracking_id']
      dataForm
           
    store: (e) ->
      e.preventDefault()
      dataForm = $(@el).find('form').serializeJSON()
      data = @serializeData(dataForm)
      @model.save data, wait: true

    storeNotifications: ->
      @storeActivity @id, "Agrego una tarea"
      notification = new optima.models.Notification
      notification.save user_id: model.get('user_id'), message: "Nueva tarea"

    notify: (model) ->
      pubsub.trigger('notification:store', "Nueva tarea")
      pubsub.trigger('todoTracking:stored', model)
      socket.emit('todos', model.id)
    
    stored: (model) ->
      if model.id && optima.todos
        optima.todos.add(model)
        @notify(model)
        @container.modal('hide')
        @closeModal()
      else
        @notify(model)
        @container.modal('hide')
        @closeModal()

      pubsub.trigger("todos:mail", model)

    cancel: (e) ->
      e.preventDefault()
      @container.modal('hide')
      @closeModal()