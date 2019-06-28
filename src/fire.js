import * as firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAESAZL26PsKLuD_FQz0oUigvvfByX8PUg",
    authDomain: "todolist-95.firebaseapp.com",
    databaseURL: "https://todolist-95.firebaseio.com",
    projectId: "todolist-95",
    storageBucket: "todolist-95.appspot.com",
    messagingSenderId: "481397984215"
  };
  var fire = firebase.initializeApp(config);
  export default fire;