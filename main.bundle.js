/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	// This file is in the entry point in your webpack config.
	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth() + 1; //January is 0!
	var yyyy = date.getFullYear();

	if (dd < 10) {
	  dd = '0' + dd;
	}

	if (mm < 10) {
	  mm = '0' + mm;
	}

	var date = yyyy + '-' + mm + '-' + dd;

	function getHolidays() {
	  var _this = this;

	  var url = 'https://quirkycalendar.herokuapp.com/api/v1/holidays?date=' + date;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    _this.showHolidays(json_response);
	  });
	}

	function showHolidays(json_response) {
	  var holidayArray = json_response;
	  var holiday_list = document.getElementById("holidays");
	  holidayArray['data'].forEach(function (holiday) {
	    var name = holiday['attributes']['name'];
	    var holiday_data = '<h3>' + name + '</h3><br>';
	    appendData(holiday_data, "holidays");
	  });
	}

	function appendData(data, parent_id) {
	  var newDiv = document.createElement('div');
	  newDiv.className = 'holiday';
	  newDiv.innerHTML = data;
	  var parent_element = document.getElementById(parent_id);
	  parent_element.appendChild(newDiv);
	}

	$(document).on("load", getHolidays());

/***/ })
/******/ ]);