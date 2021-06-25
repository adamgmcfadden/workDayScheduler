"use strict";

//display time at top of scheduler with moment.js
var currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");

//variable created to cross reference time
var currentTime = moment().format("hA");
//array of workhours (9-5) // formatted to be crossed referenced later with "currentTime"
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

//function to create elements + set attributes // also checks currentTime vs time in left most column
var createSchedule = function (event) {
  var taskIdCounter = 0;
  for (let i = 0; i < workDay.length; i++) {
    //search for divEl by ID
    var divEl = $("#time-block-div");

    //create time block dynamically
    var timeEl = $("<h2></h2>")
      .addClass("col-md-1 hour")
      .attr("id", "timeOfDay")
      .text(workDay[i]);

    //create textarea block
    var textEl = $("<textarea></textarea>")
      .addClass("col-md-10 description form-control")
      .attr("id", "textArea" + taskIdCounter)
      .attr("data-task-id", taskIdCounter)
      .trigger("focus");

    //create button block parent el
    var buttonDiv = $("<div></div>")
      .addClass("row col-md-1")
      .attr("id", "button-div");

    // append child elements to divEl
    divEl.append(timeEl, textEl, buttonDiv);

    //create buttons
    var buttonEl = $("<button></button>")
      .addClass("saveBtn")
      .attr("id", taskIdCounter);

    //append button to button parent el
    buttonDiv.append(buttonEl);

    //create <i> inside button to hold icon
    var buttonSpan = $("<i></i>")
      .addClass("oi oi-document")
      .attr("id", "button-symbol")
      .attr("data-task-id", taskIdCounter);

    //append span to button
    buttonEl.append(buttonSpan);

    //check to add class and change background color depending if task is in past, present or future
    if (currentTime === workDay[i]) {
      textEl.addClass("present");
    } else if (currentTime < workDay[i]) {
      textEl.addClass("future");
    } else {
      textEl.addClass("past");
    }

    taskIdCounter++;
  }
};
//call createSchedule function
createSchedule();

//click event for save button
$(".saveBtn").on("click", function () {
  //get id attr from saveBtn
  let saveBtnId = $(this).attr("id");
  let keyValue = "textArea" + saveBtnId;
  //get values from description
  let value = $(`#textArea${saveBtnId}`).val();

  //save value in local storage
  localStorage.setItem(`${keyValue}`, value);
});

// go through time blocks to get id and check storage
$(".description").each(function () {
  let textAreaId = $(this).attr("id");

  // get value from local storage
  $(this).val(localStorage.getItem(`${textAreaId}`));
});
