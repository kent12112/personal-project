const urlParams = new URLSearchParams(window.location.search);
const month = urlParams.get('month');
const year = urlParams.get('year');
const date = urlParams.get('date');

$(".day-header").html(`${month} ${date}, ${year}`)
scheduleProducer = document.querySelector('.time-schedule')
let result = '';
let idGenerater = 1
const renderScheduleBeforeNoon = () => {
  for(let i = 1; i < 12; i++){
    result += `<div class="row schedule-container">
    <div class="col-md-2 col-1 time">${i} AM</div>
    <div class="col-md-10 col-11 schedule">
      <div class="blank"></div>
      <div id = "post-hour-${i}" class="schedule-main" onClick="openPopup('hour-${i}')"></div>

      <div class="popup" id="popup">
      <div class="popup-content">
          <button class="popup-button" onclick="openPopup()">Cancel</button>
          <span class="new-event">New Event</span>
          <div class="inputs">
          <input id = "hour-${i}" type="text" class="popup-title" placeholder="Title">
        </div>
      </div>
  </div>
      </div>
  </div>`
  console.log(`hour-${i}`)
  }
}
const renderScheduleAfterNoon = () => {
  for(let i = 1; i <= 11; i++){
    result += `<div class="row schedule-container">
    <div class="col-md-2 col-1 time">${i} AM</div>
    <div class="col-md-10 col-11 schedule">
      <div class="blank"></div>
      <div id = "post-hour-${12 + i}" class="schedule-main" onClick="openPopup('hour-${12 + i}')"></div>

      <div class="popup" id="popup">
      <div class="popup-content">
          <button class="popup-button" onclick="openPopup()">Cancel</button>
          <span class="new-event">New Event</span>
          <div class="inputs">
          <input id = "hour-${12 + i}" type="text" class="popup-title" placeholder="Title">
        </div>
      </div>
  </div>
      </div>
  </div>`
  console.log(`hour-${12+i}`)
  }
}
console.log('hour-0')
result = `<div class="row schedule-container">
<div class="col-md-2 col-1 time">12 AM</div>
<div class="col-md-10 col-11 schedule">
  <div class="blank"></div>
  <div id = "post-hour-0" class="schedule-main" onClick="openPopup('hour-0')"></div>

  <div class="popup" id="popup">
  <div class="popup-content">
      <button class="popup-button" onclick="openPopup()">Cancel</button>
      <span class="new-event">New Event</span>
      <div class="inputs">
      <input id = "hour-0" type="text" class="popup-title" placeholder="Title">

    </div>
  </div>
</div>
  </div>
</div>`

renderScheduleBeforeNoon();
console.log('hour-12')
result += `<div class="row schedule-container">
<div class="col-md-2 col-1 time">Noon</div>
<div class="col-md-10 col-11 schedule">
  <div class="blank"></div>
  <div id = "post-hour-12" class="schedule-main" onClick="openPopup('hour-12')"></div>

  <div class="popup" id="popup">
  <div class="popup-content">
      <button class="popup-button" onclick="openPopup()">Cancel</button>
      <span class="new-event">New Event</span>
      <div class="inputs">
      <input id = "hour-12" type="text" class="popup-title" placeholder="Title">
    </div>
  </div>
</div>
  </div>
</div>`
renderScheduleAfterNoon();
scheduleProducer.innerHTML += result;

let popup = document.getElementById("popup");
function openPopup(id) {
      if (!popup.classList.contains("open-popup")){
      popup.classList.add("open-popup");
      elementId = id
      }else{
        popup.classList.remove("open-popup");
      }
}
let elementId

$(document).ready(function(){
  $(`.popup-title`).on("input", function(){
    currentText = $(this).val()
    currentLength = currentText.length
    remaining = 20 - currentLength
  })
  $(`.popup-title`).on("keypress", function(event){
    if(event.which === 13){
      console.log('1')
      submitPost(elementId,currentText);   
    }
})
})

function submitPost(elementId,currentText){
  hashmap = {
    "hour-0":"12AM",
    "hour-1":"1AM",
    "hour-2":"2AM",
    "hour-3":"3AM",
    "hour-4":"4AM",
    "hour-5":"5AM",
    "hour-6":"6AM",
    "hour-7":"7AM",
    "hour-8":"8AM",
    "hour-9":"9AM",
    "hour-10":"10AM",
    "hour-11":"11AM",
    "hour-12":"12AM",
    "hour-13":"1PM",
    "hour-14":"2PM",
    "hour-15":"3PM",
    "hour-16":"4PM",
    "hour-17":"5PM",
    "hour-18":"6PM",
    "hour-19":"7PM",
    "hour-20":"8PM",
    "hour-21":"9PM",
    "hour-22":"10PM",
    "hour-23":"11PM"

  }


  let eventContainer = $("<li class='event-container'></li>").text(hashmap[elementId] + ": " + currentText);
  eventContainer.attr('id', elementId);
  $(".event").append(eventContainer);
  $(".event").append("<br>");
  console.log(elementId);
  sortEventContainers();
}

function sortEventContainers() {
  var containers = $('.event li');
  containers.sort(function (a, b) {
    var idA = parseInt($(a).attr('id').split('-')[1]);
    var idB = parseInt($(b).attr('id').split('-')[1]);
    return idA - idB;
  });
  $('.event').html(containers);
}
$(".send-schedule").hover(
  function(){$(this).addClass("send-schedule-color");},
  function(){$(this).removeClass("send-schedule-color");},
)
$(".send-schedule").click(function(){
  createCheckbox();
})

function createCheckbox(){
  result =  `<input type="checkbox" id="myCheckbox-0" class="myCheckbox" value="0">`
  for(let i = 1; i < 12; i++){
    result += `<input type="checkbox" id="myCheckbox-${i}" class="myCheckbox" value="${i}">`
  }
  result +=  `<input type="checkbox" id="myCheckbox-12" class="myCheckbox" value="12">`
  for(let i = 1; i < 12; i++){
    result += `<input type="checkbox" id="myCheckbox-${12 + i}" class="myCheckbox" value="${12 + i}">`
  }
  $(".checkbox").html(result)
}

function getCheckedCheckboxes() {
  var checkboxes = document.querySelectorAll('.myCheckbox');
  var checkedCheckboxes = [];
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkedCheckboxes.push(checkbox.value);
    }
  });
  console.log("Checked Checkboxes: ", checkedCheckboxes);
}
$(".send-schedule").hover(function(){
  getCheckedCheckboxes();
})