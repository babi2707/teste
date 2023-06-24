import { db, collection, addDoc, onSnapshot } from "./firebase.js";

function getItems() {
  onSnapshot(collection(db, "todo-items"), (snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    generateItems(items);
  });
}

function generateItems(items ) {
  items.forEach((item) => {
    console.log(item);
  });
}

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
        status: "active",
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

  getItems(); // Call the function after it is defined
};
