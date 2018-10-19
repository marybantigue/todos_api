
$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: '/api/todos'
  })
  .then(function(todos){
    todos.forEach(function(todo){
      addTodo(todo);
    });
  })
  .catch(function(err){
    console.log(err);
  });
});


$( "#todoInput" ).keypress(function(e) {
  if ( e.which == 13 ) {
    if($(this).val().trim() != ''){
      $.ajax({
        type: 'POST',
        url: '/api/todos',
        data: { name : $(this). val() },
       cache: false
      })
      .then(function(newTodo){
        addTodo(newTodo);
      })
      .catch(function(err){
        console.log(err);
      });
    }
  }
});

$('.list').on('click','span',function(e){
  var todo = $(this).parent();
  e.stopPropagation();

  $.ajax({
    type: 'DELETE',
    url: '/api/todos/' + todo.data('id')
  })
  .then(function(data){
    todo.detach();
  })
  .catch(function(err){
    console.log(err);
  });
});


function addTodo(todo){
  var todoLi = $('<li class="task">' + todo.name + '<span>X</span></li>');
  todoLi.data('completed', todo.completed );
  todoLi.data('id', todo._id );
  if(todo.completed){
    todoLi.toggleClass('completed');
  }
  $('ul.list').append(todoLi);
}
