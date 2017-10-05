$(document).ready(function() {
	console.log("ready");


  var config = {
    apiKey: "AIzaSyD625rQrFS841SQecgxYWznRdZeNjY0if4",
    authDomain: "train-scheduler-d1501.firebaseapp.com",
    databaseURL: "https://train-scheduler-d1501.firebaseio.com",
    projectId: "train-scheduler-d1501",
    storageBucket: "train-scheduler-d1501.appspot.com",
    messagingSenderId: "133115890432"
  };
  firebase.initializeApp(config);

	var database = firebase.database();

	database.ref().on('child_added', function(childSnapshot) {
		// console.log(childSnapshot.val().name);

		var dbName = childSnapshot.val().name;
		var dbDestination = childSnapshot.val().destination;
		var dbFrequency = childSnapshot.val().frequency;
		var dbFirstTrain = childSnapshot.val().firstTrain;
		var dbNextTrain = childSnapshot.val().nextTrain; //
		console.log(dbFirstTrain);


		// virutal DOM manipulation starts here
		var newRow = $('<tr>');
		var newName = $('<td>').text(dbName);
		var newDestination = $('<td>').text(dbDestination);
		var newFrequency = $('<td>').text(dbFrequency);
		var newNextArrival = $('<td>').text(dbFirstTrain); //had dbNextTrain
		var newMinutesAway = $('<td>').text("22");
		console.log(newNextArrival);

		
		var now = moment();
		// console.log("CURRENT TIME: " + moment(now).format("hh:mm"));
		var firstTimeConverted = moment(dbFirstTrain, "hh:mm").subtract(1, "day");
		console.log(firstTimeConverted);

		var diffTime = now.diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var Remainder = diffTime % frequency;
		console.log(Remainder);

    	// Minute Until Train
    	var tMinutesTillTrain = frequency - Remainder;
    	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   		 // Next Train
   		 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   		 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		
		newRow.append(newName, newDestination, newFrequency, newNextArrival, newMinutesAway);
		// virtual DOM manipulation ends here

		// gets put into DOM
		$('table').append(newRow);


	})



	function submit (event) {
		console.log("submit");
		event.preventDefault();
		var name = $('#train-name').val().trim();
		var destination = $('#destination').val().trim();
		var frequency = $('#frequency').val().trim();
		var firstTrain = $('#first-train').val().trim();

		
		// console.log("Our Start Date: " + moment(startDate, "MM-DD-YYYY"));
		console.log("NOW: " + moment())
		// console.log(moment().diff(moment(startDate, "MM-DD-YYYY"), 'months'));

		database.ref().push({
			name: name,
			destination: destination,
			frequency: frequency,
			// nextTrain: nextTrain,
			// minutesAway: minutesAway,
			firstTrain: firstTrain,
			dateAdded: firebase.database.ServerValue.TIMESTAMP

		});

	}

	$('button').on('click', submit)




})