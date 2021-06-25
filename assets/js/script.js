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

var createSchedule = function (event) {
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
    textEl.id = "textArea" + taskIdCounter;
    //textEl.setAttribute("data-task-id", taskIdCounter);
    divEl.appendChild(textEl);

    //create button blocks
    var buttonDiv = document.createElement("div");
    buttonDiv.className = " row col-md-1";
    buttonDiv.id = "button-div";
    divEl.appendChild(buttonDiv);
    var buttonEl = document.createElement("button");
    buttonEl.id = taskIdCounter;
    buttonEl.className = "saveBtn";
    //buttonEl.setAttribute("data-task-id", taskIdCounter);
    buttonDiv.appendChild(buttonEl);
    var buttonSpan = document.createElement("span");
    buttonSpan.className = "oi oi-document";
    buttonSpan.id = "button-symbol";
    buttonSpan.setAttribute("data-task-id", taskIdCounter);
    buttonEl.appendChild(buttonSpan);

    taskIdCounter++;
  }
};
createSchedule();

$(".saveBtn").on("click", function () {
  //get id
  let timeBlock = $(this).attr("id");
  let set = "textArea" + timeBlock;
  //get values from description

  let value = $(`#textArea${timeBlock}`).val();
  console.log(timeBlock);
  console.log(value);
  //save value in local storage
  localStorage.setItem(`${set}`, value);
});

// go through time blocks to get id and check storage
$(".description").each(function () {
  let set = $(this).attr("id");

  $(this).val(localStorage.getItem(`${set}`));
});
