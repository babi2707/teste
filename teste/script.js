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

  let itemsHTML = "";

  items.forEach((item) => {
    console.log(item);
    itemsHTML += `
        <div class="list" id="lista">
          <div class="row">
            <div class="col-1" id="item">
              <div class="check">
                <div class="check-mark">
                  <i class="fa-solid fa-check" style="color: #4624df"></i>
                </div>
              </div>
            </div>

            <div class="col-11">
              <div class="texto">
                <span>Name: ${item.name}</span>
                <span>Description: ${item.description}</span>
                <span>StartDate: ${item.startDate}</span>
                <span>EndDate: ${item.endDate}</span>
              </div>
            </div>
          </div>
        </div>
    `
  });

  document.querySelector(".items").innerHTML = itemsHTML; 
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
