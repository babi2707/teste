var firebaseConfig = {
    apiKey: "AIzaSyBUkPCCXFi99DW2UPnyMAJpFKtqDBLo2e4",
    authDomain: "todo-barbara.firebaseapp.com",
    projectId: "todo-barbara",
    storageBucket: "todo-barbara.appspot.com",
    messagingSenderId: "839368344937",
    appId: "1:839368344937:web:35e93af088660b0b34e9f8",
    measurementId: "G-2ZM4RFHQLY"
  };

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);

  var db = firebase.firestore();