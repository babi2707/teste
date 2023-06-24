import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUkPCCXFi99DW2UPnyMAJpFKtqDBLo2e4",
  authDomain: "todo-barbara.firebaseapp.com",
  projectId: "todo-barbara",
  storageBucket: "todo-barbara.appspot.com",
  messagingSenderId: "839368344937",
  appId: "1:839368344937:web:35e93af088660b0b34e9f8",
  measurementId: "G-2ZM4RFHQLY",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


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
};

export { addItem };