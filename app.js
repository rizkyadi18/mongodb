$(document).ready(function() {
    // Memuat tugas saat halaman dimuat
    loadTodos();
  
    // Menangani klik tombol "Add Task"
    window.addTodo = function() {
      const task = $('#newTask').val();
      if (task) {
        $.post('/api/todos', { task }, function(data) {
          $('#newTask').val('');
          loadTodos();
        });
      }
    };
  
    // Menangani klik tombol "Delete"
    window.deleteTodo = function(id) {
      $.ajax({
        url: `/api/todos/${id}`,
        type: 'DELETE',
        success: function(data) {
          loadTodos();
        }
      });
    };
  
    // Memuat tugas dari server
    function loadTodos() {
      $.get('/api/todos', function(data) {
        const todoList = $('#todoList');
        todoList.empty();
        data.forEach(function(todo) {
          const listItem = $('<li>').text(todo.task);
          const deleteButton = $('<button onclick="deleteTodo(\'' + todo._id + '\')">Delete</button>');
          listItem.append(deleteButton);
          todoList.append(listItem);
        });
      });
    }
  });
  