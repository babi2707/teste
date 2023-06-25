import { db, collection, addDoc, onSnapshot, doc, getDoc, updateDoc, deleteDoc } from "./firebase.js";

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

function generateItems(items) {

  let itemsHTML = "";
  let count = 0;

  items.forEach((item) => {
    let date = new Date(item.startDate);
    let dateEnd = new Date(item.endDate);
    console.log(item);
    itemsHTML += `
        <div class="list" id="lista">
          <div class="row">
            <div class="col-1" id="item">
              <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                  <i class="fa-solid fa-check" style="color: #4624df"></i>
                </div>
              </div>
            </div>

            <div class="col-11">
              <div class="texto ${item.status == "completed" ? "checked" : ""}">
                <span><b>Name:</b> ${item.name}</span>
                <span><b>Description:</b> ${item.description}</span>
                <span><b>StartDate:</b>  ${date.toLocaleString("en")}</span>
                <span><b>EndDate:</b> ${dateEnd.toLocaleString("en")}</span>
              </div>
            </div>
          </div>
        </div> 
    `;

    if (item.status == "completed") {
      count += 1;
      console.log(count);
    }
  });


  let qtdItems = items.length;
  let itemsLeft = qtdItems - count;
  let itemsHTMLQtd = `
    <div class="items-left">${itemsLeft} items left</div>
  `;

  document.querySelector(".items").innerHTML = itemsHTML; 
  document.querySelector(".items-left").innerHTML = itemsHTMLQtd;
  createEventListener();
}

function createEventListener() {
  let todoCheckMarks = document.querySelectorAll(".list .check-mark");

  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener("click", function() {
      markCompleted(checkMark.dataset.id);
    })
  });
}

function markCompleted(id) {
  let item = doc(collection(db, "todo-items"), id);

  getDoc(item).then(function(doc) {
    if (doc.exists) {
      let status = doc.data().status;
      if(status == "active") {
        updateDoc(item, {
          status: "completed"
        });
      } else if (status == "completed") {
        updateDoc(item, {
          status: "active"
        });
      }
    }
  })
}

function clearCompletedItems() {
  const checkedItems = document.querySelectorAll(".list .check-mark.checked");
  checkedItems.forEach((item) => {
    const listItem = item.closest(".list");
    const itemId = item.dataset.id;
    const itemRef = doc(collection(db, "todo-items"), itemId);

    // Remover item do Firestore
    deleteDoc(itemRef)
      .then(() => {
        // Remover item do DOM
        listItem.remove();
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  });
}



window.onload = () => {
  const addTodoForm = document.getElementById("add-todo-form");

  const itemsClear = document.querySelector(".items-clear");
  itemsClear.addEventListener("click", clearCompletedItems);

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
