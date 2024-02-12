const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
currentYear = date.getFullYear();
currentMonth = date.getMonth();
console.log(date, currentMonth)
const months = ["January", "February", "March", "April", "May",
"June", "July", "August", "September", "October", "November", "December"]

let grabCurrentMonth = 0
let grabCurrentYear = 0
let grabCurrentDay = 0
const renderCalendar = () => {
  let lastDateOfMonth = new Date(currentYear, currentMonth+1, 0).getDate();
  firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  getMonth = new Date(currentYear, currentMonth, 1).getMonth();
  console.loh
  console.log(firstDayOfMonth)
  let litag = "";
  for (let i = 1; i < firstDayOfMonth; i++){
    litag += `<li></li>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++){
    litag += `<li id="date-${i}" onClick ="jumpToDay(\`${months[currentMonth]}\`, \`${i}\` , \`${currentYear}\`)">${i}</li>`;
  }
  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  daysTag.innerHTML = litag;  
  grabCurrentMonth = months[currentMonth]
  grabCurrentYear = currentYear
}
renderCalendar();
function jumpToDay(currentMonth, date, year) {
  window.location.href = `day.html?month=${currentMonth}&date=${date}&year=${year}`;
}


prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", ()=>{
    currentMonth = icon.id === 'before' ? currentMonth - 1 : currentMonth + 1
    if (currentMonth < 0){
      currentYear -= 1
      currentMonth = 11
    } if (currentMonth > 11){
      currentYear += 1
      currentMonth = 0
    }
    console.log(currentMonth)


    renderCalendar();
  });
});