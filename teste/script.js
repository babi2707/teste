// script.js
/*
import { db } from "./firebase.js";


function addItem(event) {
  event.preventDefault();

  let todo = {
    name: document.getElementById("todo-name").value,
    description: document.getElementById("todo-description").value,
    startdatetime: document.getElementById("todo-startdatetime").value,
    enddatetime: document.getElementById("todo-enddatetime").value,
  };

  db.collection("todo-items").add({
    name: document.getElementById("todo-name").value,
    description: document.getElementById("todo-description").value,
    startDate: document.getElementById("todo-startdatetime").value,
    endDate: document.getElementById("todo-enddatetime").value,
    status: "active"
  });

  // Limpar os valores dos campos de entrada
  document.getElementById("todo-name").value = "";
  document.getElementById("todo-description").value = "";
  document.getElementById("todo-startdatetime").value = "";
  document.getElementById("todo-enddatetime").value = "";
}

export { addItem };*/

import { db, collection, addDoc } from "./firebase.js";

window.onload = () => {
  const addTodoForm = document.getElementById("add-todo-form");

  addTodoForm.onsubmit = async (event) => {
    event.preventDefault();

    let todo = {
      name: document.getElementById("todo-name").value,
      description: document.getElementById("todo-description").value,
      startdatetime: document.getElementById("todo-startdatetime").value,
      enddatetime: document.getElementById("todo-enddatetime").value,
    };

    try {
      await addDoc(collection(db, "todo-items"), {
        name: todo.name,
        description: todo.description,
        startDate: todo.startdatetime,
        endDate: todo.enddatetime,
        status: "active"
      });

      // Limpar os valores dos campos de entrada
      document.getElementById("todo-name").value = "";
      document.getElementById("todo-description").value = "";
      document.getElementById("todo-startdatetime").value = "";
      document.getElementById("todo-enddatetime").value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
};
