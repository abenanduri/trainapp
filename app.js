//initialize firebase

var config = {
    apiKey: "AIzaSyBlq0DyxCtoJpd1aZanBrmhASC5ZgJBz-s",
    authDomain: "train-activity-3466f.firebaseapp.com",
    databaseURL: "https://train-activity-3466f.firebaseio.com",
    projectId: "train-activity-3466f",
    storageBucket: "train-activity-3466f.appspot.com",
    messagingSenderId: "324539614221"
  };
  firebase.initializeApp(config);

  var database = firebase.database(); 

  var name; 
  var destination;
  var frequency;
  var nextArrival; 
  var min = 0; 
  var firstTrain; 
  var tRemainder; 
  var currentTime; 
  var diffTime; 
  var minutesTillTrain; 
  var nextTrainFormatted; 
  var firstTimeConverted; 
  var nextTrain; 


  $("#add-btn").on("click", function(event) {

  	//grab the values from the input boxes

  name = $("#name").val().trim(); 
  destination = $("#destination").val().trim(); 
  frequency = $("#frequency").val().trim(); 
  firstTrain = $("#time").val().trim(); 
  // nextArrival =
  firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  tRemainder = diffTime % frequency;
  minutesTillTrain = frequency - tRemainder;
  nextTrain = moment().add(minutesTillTrain, "minutes");
  nextTrainFormatted = moment(nextTrain).format("hh:mm"); 



  database.ref().push( {
  	name: name, 
  	destination: destination, 
  	frequency: frequency,
    nextTrainFormatted: nextTrainFormatted, 
    minutesTillTrain: minutesTillTrain, 
    firstTrain: firstTrain

  })	

  $("#name").val("");
  $("#destination").val("");
  $("#frequency").val("");
 
  console.log(name); 
  console.log(destination); 
  console.log(frequency); 

  }); 


// var data = database.ref();
// data.remove();

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

var sv = snapshot.val(); 
var tableBody = $("#train-table"); 
var tableRow = $("<tr>"); 

var tdName = $("<td>");
var tdDestination = $("<td>");
var tdFrequency = $("<td>");
var tdNext = $("<td>");
var tdMinutes = $("<td>");

tdName.text(snapshot.val().name);
tdDestination.text(snapshot.val().destination);
tdFrequency.text(snapshot.val().frequency);
tdNext.text(snapshot.val().nextTrainFormatted);
tdMinutes.text(snapshot.val().minutesTillTrain);

tableRow.append(tdName); 
tableRow.append(tdDestination); 
tableRow.append(tdFrequency); 
tableRow.append(tdNext); 
tableRow.append(tdMinutes); 

tableBody.prepend(tableRow); 



})














