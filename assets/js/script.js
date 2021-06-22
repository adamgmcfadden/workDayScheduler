"use strict";

//display time at top of scheduler with moment.js
var currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");

var currentTime = moment().format("hA");
var workDay = [
  moment("09AM", "hA")._i,
  moment("10AM", "hA")._i,
  moment("11AM", "hA")._i,
  moment("12PM", "hA")._i,
  moment("1PM", "hA")._i,
  moment("2PM", "hA")._i,
  moment("3PM", "hA")._i,
  moment("4PM", "hA")._i,
  moment("5PM", "hA")._i,
];

var taskIdCounter = 0;
for (let i = 0; i < workDay.length; i++) {
  //create time block dynamically
  var divEl = document.getElementById("time-block-div");
  var timeEl = document.createElement("h2");
  timeEl.className = "col-md-1 hour";
  timeEl.id = "timeOfDay";
  timeEl.textContent = workDay[i];
  divEl.appendChild(timeEl);

  //create textarea block
  var textEl = document.createElement("textarea");
  textEl.className = "col-md-10 description";
  textEl.id = "textArea";
  textEl.setAttribute("data-task-id", taskIdCounter);
  divEl.appendChild(textEl);

  //create button blocks
  var buttonEl = document.createElement("button");
  buttonEl.className = "col-md-1 saveBtn";
  buttonEl.id = "button";
  buttonEl.setAttribute("data-task-id", taskIdCounter);
  divEl.appendChild(buttonEl);
  var buttonSpan = document.createElement("span");
  buttonSpan.className = "oi oi-box";
  buttonEl.appendChild(buttonSpan);

  taskIdCounter++;

  //set color of textarea to be relative to current time

  if (currentTime === workDay[i]) {
    textEl.classList.add("present");
  } else if (currentTime < workDay[i]) {
    textEl.classList.add("future");
  } else {
    textEl.classList.add("past");
  }

  // save button functionality
  buttonEl.addEventListener("click", function (event) {
    event.preventDefault();
    //localStorage.setItem(taskIdCounter[i], textEl[i]);
  });
}

//   $("#time-block-div").html(
//     "<h2 class='col-md-1 hour' id='timeOfDay'>" + workDay[i] + "</h2>"
//   );
//   $("#time-block-div").html(
//     "<textarea class='col-md-10 description' id='textArea'></textarea>"
//   );
//   $("time-block-div").html(
//     "<button class='cold-md-1 saveBtn'><i></i></button>"
//   );
// }

let time1 = "10AM";
let timeFormat = "hA";
let timeChange = moment(time1, timeFormat);
console.log(timeChange);
