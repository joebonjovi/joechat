// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRjxTCusISBEHGhEUB9sHsSfPA1pOh2y0",
  authDomain: "jbtsc-621e6.firebaseapp.com",
  databaseURL: "https://jbtsc-621e6.firebaseio.com",
  projectId: "jbtsc-621e6",
  storageBucket: "jbtsc-621e6.appspot.com",
  messagingSenderId: "852159361733",
  appId: "1:852159361733:web:bb140df34a42f98d0476ac",
  measurementId: "G-WJMBPDHNLC"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  if(localStorage.getItem("name") == null){
    var myName = prompt("Enter your name");
	localStorage.setItem("name", myName);
  }
window.addEventListener("keydown", checkMyKeyPress, false);
function checkMyKeyPress(key){
if (key.keyCode === 13) {
        event.preventDefault();
        document.getElementById("send").click();
    }
}	
	
  var ip;
  fetch("https://api.ipify.org/?format=json")
  .then(results => results.json())
  .then(data => ip = (data.ip));	
  function configIp(){
  ip = ip.replace(/\./g,'');
  }
  
  function sendMessage() {
  var message = document.getElementById('message').value;
  
  firebase.database().ref("messages").push().set({
  "sender": localStorage.getItem("name"),
  "message": message,
  "ip": ip
  });
  
  document.getElementById('message').value = "";
  }
  
  firebase.database().ref("messages").on("child_added", function (snapshot) {
  var html = "";
  html += "<li>";
  html += snapshot.val().sender + ": " + snapshot.val().message;
  html += "</li>";
  
  localStorage.setItem("messages", html);
  document.getElementById('messages').innerHTML += localStorage.getItem("messages");
  });
  
  function deleteMessage(){
	  //Password is 123455
    var deleteInput = prompt("Enter Admin Password");
	if(deleteInput == "9faebb26a1b413fb#"){
	firebase.database().ref("messages").remove();
	localStorage.removeItem("messages");
	}else{
	alert("Wrong Password");
	}
  }
  
  firebase.database().ref("messages").on("child_removed", function (snapshot) {
  location.reload();
  });
