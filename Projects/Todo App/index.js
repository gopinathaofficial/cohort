
document.addEventListener('DOMContentLoaded', function () {
    const todosList = document.getElementById('todosList');
    const todoForm = document.getElementById('todoForm');

    function fetchTodos(todosList) {
      fetch('http://localhost:8000/todos')
      .then(response => response.json())
      .then(todos => {
        todosList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = `${todo.title} - ${todo.description} (Completed: ${todo.isCompleted})`;
          todosList.appendChild(li);
        });
      })
      .catch(error => console.error(error));
    }
  
    // Add a new todo
    todoForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const isCompleted = document.getElementById('isCompleted').checked;
  
      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          isCompleted,
        }),
      })
        .then(response => response.json())
        .then(newTodo => {
          console.log('New Todo:', newTodo);
          fetchTodos(todosList);
        })
        .catch(error => console.error(error));
    });
  
    // Initial fetch and display
    fetchTodos(todosList);
  });
  