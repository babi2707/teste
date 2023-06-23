function addItem(event) {
  event.preventDefault();

  let todo = {
    name: document.getElementById("todo-name").value,
    description: document.getElementById("todo-description").value,
    startdatetime: document.getElementById("todo-startdatetime").value,
    enddatetime: document.getElementById("todo-enddatetime").value,
  };

  console.log(todo);

  // Limpar os valores dos campos de entrada
  document.getElementById("todo-name").value = "";
  document.getElementById("todo-description").value = "";
  document.getElementById("todo-startdatetime").value = "";
  document.getElementById("todo-enddatetime").value = "";
}
