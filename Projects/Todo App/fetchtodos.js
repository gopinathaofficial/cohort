
export default function fetchTodos(todosList) {
    fetch('localhost:8000/todos')
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
  