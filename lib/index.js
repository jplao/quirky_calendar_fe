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
  var url = `https://quirkycalendar.herokuapp.com/api/v1/holidays?date=${date}`;
  fetch(url).then(response => response.json()).then(json_response => {this.showHolidays(json_response, "current")});
}

function getSearch() {
  var term = document.getElementById("term").value;
  var url = `https://quirkycalendar.herokuapp.com/api/v1/search?name=${term}`;
  fetch(url).then(response => response.json()).then(json_response => {this.showHolidays(json_response, term)});
}

const registerUser = (event) => {
  event.preventDefault();
  var payload = {
    email: $("#email").val(),
    password: $("#psw").val(),
    password_confirmation: $("#psw-repeat").val()
  }

  if (validateRegistration()) {
    fetch(`https://quirkycalendar.herokuapp.com/api/v1/users`,{
      method: 'POST',
      headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(json_response => storeSession(json_response));
    changeMessage(`Welcome! ${payload.email}`);
  };
}

function showHolidays(json_response, query) {
  setTitle(query);
  removeChildren("holidays")
  var holidayArray = json_response
  var holiday_list = document.getElementById("holidays")
  holidayArray['data'].forEach(holiday => {
    var name = holiday['attributes']['name'];
    var holiday_data = `<h3><button class="button"><i class="far fa-heart"></i></button> ${name}</h3>`;
    appendData(holiday_data, "holidays");
  })
}

function setTitle(query) {
  var text = ""
    if (query === "current") {
      text = "Today's Quirks"
    } else {
      text = `${query} Holidays`
    }
  document.getElementById("title").innerHTML = text
}

function appendData(data, parent_id) {
  let newDiv = document.createElement('div');
  newDiv.className = ('holiday');
  newDiv.innerHTML = data;
  let parent_element = document.getElementById(parent_id);
  parent_element.appendChild(newDiv);
}

function removeChildren(elementId){
  var target_element = document.getElementById(elementId);
  while (target_element.firstChild) target_element.removeChild(target_element.firstChild);
}

function storeSession(json){
  sessionStorage.setItem('api_key', `${json.data.attributes.api_key}`);
}

function displayRegisterForm(){
  displayForm("register", "login", "register_form");
}

function displayForm(show_class, hide_class, id){
  hideClass("search");
  hideClass("today");
  hideClass(hide_class);
  showClass(show_class);
  var form = document.getElementById(id);
  form.style.display = "block";
}

function hideClass(class_name){
  $(`.${class_name}`).hide();
}

function showClass(class_name){
  $(`.${class_name}`).show();
}

$( document ).on("load", getHolidays());
