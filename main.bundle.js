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
	    _this.showHolidays(json_response, "current");
	  });
	}

	function getSearch() {
	  var _this2 = this;

	  var term = document.getElementById("term").value;
	  var url = 'https://quirkycalendar.herokuapp.com/api/v1/search?name=' + term;
	  fetch(url).then(function (response) {
	    return response.json();
	  }).then(function (json_response) {
	    _this2.showHolidays(json_response, term);
	  });
	}

	var registerUser = function registerUser(event) {
	  event.preventDefault();
	  var payload = {
	    email: $("#email").val(),
	    password: $("#psw").val(),
	    password_confirmation: $("#psw-repeat").val()
	  };
	  fetch('https://quirkycalendar.herokuapp.com/api/v1/users', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return storeSession(json_response);
	  });
	  hideClass("register");
	  clearInput("term");
	  showClass("search");
	  displayInline("favorites-btn");
	  displayInline("add-favorite-btn");
	  changeToLogOut();
	};

	var loginUser = function loginUser(event) {
	  event.preventDefault();
	  var payload = {
	    email: $("#login_email").val(),
	    password: $("#login_psw").val()
	  };

	  fetch('https://quirkycalendar.herokuapp.com/api/v1/sessions', {
	    method: 'POST',
	    headers: { 'Accept': 'application/json',
	      'Content-Type': 'application/json' },
	    body: JSON.stringify(payload)
	  }).then(function (response) {
	    return response.json();
	  }).catch(function (error) {
	    return console.error(error);
	  }).then(function (json_response) {
	    return storeSession(json_response);
	  });
	  hideClass("login");
	  showClass("search");
	  showClass("today");
	  clearInput("term");
	  displayInline("favorites-btn");
	  changeToLogOut();
	};

	function showHolidays(json_response, query) {
	  setTitle(query);
	  removeChildren("holidays");
	  var holidayArray = json_response;
	  var holiday_list = document.getElementById("holidays");
	  holidayArray['data'].forEach(function (holiday) {
	    var name = holiday['attributes']['name'];
	    var holiday_data = '<h3><button class="button" onclick="addFav(' + holiday['id'] + ')"><i class="far fa-heart"></i></button> ' + name + '</h3>';
	    appendData(holiday_data, "holidays");
	  });
	}

	function addFav(id) {
	  var holiday_id = id;
	}

	function setTitle(query) {
	  var text = "";
	  if (query === "current") {
	    text = "Today's Quirks";
	  } else {
	    text = query + ' Holidays';
	  }
	  document.getElementById("title").innerHTML = text;
	}

	function appendData(data, parent_id) {
	  var newDiv = document.createElement('div');
	  newDiv.className = 'holiday';
	  newDiv.innerHTML = data;
	  var parent_element = document.getElementById(parent_id);
	  parent_element.appendChild(newDiv);
	}

	function removeChildren(elementId) {
	  var target_element = document.getElementById(elementId);
	  while (target_element.firstChild) {
	    target_element.removeChild(target_element.firstChild);
	  }
	}

	function storeSession(json) {
	  sessionStorage.setItem('api_key', '' + json.data.attributes.api_key);
	}

	function displayRegisterForm() {
	  displayForm("register", "login", "register_form");
	}

	function displayLoginForm() {
	  displayForm("login", "register", "login_form");
	}

	function displayForm(show_class, hide_class, id) {
	  hideClass("search");
	  hideClass("today");
	  hideClass(hide_class);
	  showClass(show_class);
	  var form = document.getElementById(id);
	  form.style.display = "block";
	}

	function hideClass(class_name) {
	  $('.' + class_name).hide();
	}

	function showClass(class_name) {
	  $('.' + class_name).show();
	}

	function displayInline(id) {
	  document.getElementById(id).style.display = "inline-block";
	}

	function displayNone(id) {
	  document.getElementById(id).style.display = "none";
	}

	function clearInput(element_id) {
	  document.getElementById(element_id).innerHTML = "";
	}

	function changeToLogOut() {
	  displayNone("login-btn");
	  displayNone("reg-btn");
	  displayInline("logout-btn");
	}

	function changeToLogIn() {
	  displayNone("logout-btn");
	  displayInline("login-btn");
	  displayInline("reg-btn");
	}

	$(document).on("load", getHolidays());
	$('#register-btn').on('click', registerUser);
	$('#submit-login-btn').on('click', loginUser);

/***/ })
/******/ ]);