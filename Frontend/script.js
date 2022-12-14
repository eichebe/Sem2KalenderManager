let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//let eventsweb = sessionStorage.getItem('events') ? JSON.parse(sesionStorage.getItem('events')) : [];
//search for local Item. Make sure it does exist
//Ref to calender block DOM
const calendar = document.getElementById("calendar");
//calender Referenz
//Create Modal
const newEventModal = document.getElementById("newEventModal");
//Delete Modal
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

function openModal(date){
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

   
  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function startDay () {
    startDay = getDay();
}

function load() {
    const dt = new Date();

    if (nav !==0) {
        //selection for Buttons Month + nav
        dt.setMonth;
        dt.setDate(1);
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    
    //first day of the Month
    const firstDayOfMonth = new Date(year, month, 1);
    //last day in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString("de-DE", {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: "numeric",
    
    });

    //get Weekday out of the Date String by splitting at index 0
    const padd = weekdays.indexOf(dateString.split(', ') [0]);
    const paddingDays = padd;
    

    document.getElementById("monthDisplay").innerText = 
        `${dt.toLocaleDateString("en-us", { month: "long"})} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        
        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);
            //highlight current day nav = 0 current month
            if (i - paddingDays === day && nav === 0){
                 daySquare.id = "currentDay";
            }

            if (eventForDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener("click", () => openModal(dayString));
        }else{
            daySquare.classList.add("padding");
        }
        //dom append child in calender
        calendar.appendChild(daySquare);
    }
    //test line
    //console.log(dateString);

}

function closeModal() {
    
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

    localStorage.setItem("events", JSON.stringify(events));
    
    closeModal();
    
}
}

function deleteEvent() {
    
    events = events.filter(e => e.date !== clicked);
    
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
}

function initButtons () {
    
    document.getElementById("nextButton").addEventListener("click", () => {
        nav++;
        load();
    });
    
    document.getElementById("backButton").addEventListener("click", () => {
        nav--;
        load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document.getElementById("cancelButton").addEventListener("click", closeModal);

    document.getElementById("deleteButton").addEventListener("click", deleteEvent);
    document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();