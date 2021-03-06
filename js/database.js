
function writeUserData(userId, name, email) {
	console.log("Writing user data");
  firebase.database().ref(userId).set({
    username: name,
    email: email,
    currentNumber: 0,
  });
}

function getCurrentNumber(userId, callback) {
	firebase.database().ref().child(userId).once('value', function(snapshot) {
		callback(snapshot.val()["currentNumber"]);
	});
}

function writeNewMemory(userId, text, date, callback) {
	firebase.database().ref().child(uid).once('value', function(snapshot) {
		var currentNumber = snapshot.val()["currentNumber"];
		firebase.database().ref(userId + '/memories').push({
	  	text: text,
	  	date: date,
	  });
	  console.log(currentNumber);
	  updateCurrentNumber(userId, currentNumber, 1);
	  callback();

	});
}

function getRandomMemory(userId, callback) {
	getCurrentNumber(userId, function(currentNumber) {
		firebase.database().ref().child(userId+'/memories').orderByKey().on('value', function(snapshot) {
			var x = Math.floor(Math.random() * (currentNumber));
			console.log(x);
			var key = Object.keys(snapshot.val())[x];
                        document.getElementById("hiddenId").style.display = "block";
			callback(snapshot.val()[key]);
		});
	});
}
function getMemory() {
	if(uid === undefined){
		firebase.auth().onAuthStateChanged(function(user) {
			getRandomMemory(user.uid, function(memory) {
				document.getElementById("hiddenId").value = memory["text"] + memory["date"];
				console.log(memory["text"]);
			});
		});
	}
	
}

function letsdeleteMemory(callback) {
	var delid = document.getElementById("hiddenId").value;
	console.log(delid);
	firebase.database().ref().child(uid+'/memories').child(delid).remove();
	getCurrentNumber(uid, function(currentNumber) {
		updateCurrentNumber(uid,currentNumber,-1);
		callback();
	});
}
function deleteMemory() {
	letsdeleteMemory(function(){
		alert("Deleted this memory");
		location.href='index.html';
	});
}
function writeData() {

	var text = document.getElementById("text").value;
	var date = document.getElementById("date").value;
	writeNewMemory(uid,text,date,function(){
		location.href='addedMemory.html';
	});
}

function updateCurrentNumber(userId, currentNumber, add) {
	firebase.database().ref(userId).update({"currentNumber": currentNumber + add });
}

