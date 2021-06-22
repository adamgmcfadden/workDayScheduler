"use strict";

//display time at top of scheduler with moment.js
var currentDay = document.getElementById("currentDay");
currentDay.textContent = moment().format("dddd, MMMM Do");
