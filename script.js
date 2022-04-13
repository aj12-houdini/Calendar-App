let nav = 0
let clicked = null
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")): []
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//Figure out the padding days(how many days before the first day of the month)
const cal = document.querySelector("#calendar")
const monthDisplay = document.querySelector("#monthDisplay")

const backBtn = document.querySelector("#backButton")
const nextBtn = document.querySelector("#nextButton")
const newEventModal = document.querySelector("#newEventModal")
const deleteEventModal = document.querySelector("#deleteEventModal")
const currentDay = document.querySelector(".currentDay")
const setDate = document.querySelector(".setDate")
const setTime = document.querySelector(".setTime")
const eventTime_1 = document.querySelector('.eventTime-1')
const eventTime_2 = document.querySelector(".eventTime-2")
const from = document.querySelector(".from")
const to = document.querySelector(".to")
const backDrop = document.querySelector("#modalBackDrop")
const eventTitleInput = document.querySelector("#eventTitleInput")

eventTime_1.time

function openModal(date){
    clicked = date
    const newDate = new Date()
    const currentDate = `${weekdays[newDate.getDay()]}, ${month[newDate.getMonth()]} ${newDate.getDate()}`
    currentDay.innerText = currentDate
    const eventForDay = events.find(e => e.date === clicked)
    if(eventForDay){
        document.querySelector("#eventText").innerText = eventForDay.title
        setDate.innerText = currentDate
        from.innerText = eventForDay.from
        to.innerText = eventForDay.to
        deleteEventModal.style.display = 'block'
    }
    else{
        newEventModal.style.display = "block"
    }
    backDrop.style.display = 'block'

}
function closeModal(){
    eventTitleInput.classList.remove("error")
    newEventModal.style.display = "none"
    backDrop.style.display = "none"
    deleteEventModal.style.display = 'none'
    eventTitleInput.value = ""
    clicked = null;
    load()
}

function saveEvent(){
    if(eventTitleInput.value){
        eventTitleInput.classList.remove("error")
        events.push({
            date: clicked,
            title: eventTitleInput.value,
            to:eventTime_1.value,
            from: eventTime_2.value
        })
        localStorage.setItem("events", JSON.stringify(events))
        closeModal()
    }
    else{
        eventTitleInput.classList.add("error")
    }
}


function load(){
    const date = new Date()
    console.log(date)   

    if(nav!==0){
        date.setMonth(date.getMonth() + nav)
    }

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    console.log(day,month,year)
    const firstDay = new Date(year,month,1)
    const daysNum = new Date(year,month + 1, 0).getDate() //Get the last day of the last month 

    const dateStr = firstDay.toLocaleDateString("en-GB", {
        weekday: "long",
        month: "numeric",
        year: "numeric",
        day: "numeric"
    })
    const paddingDays = weekdays.indexOf(dateStr.split(",")[0])
    console.log(paddingDays)
    monthDisplay.innerText = `${date.toLocaleDateString("en-GB",{month: "long"})} ${year}`
    cal.innerHTML = ''
    for(let i = 1; i<= paddingDays + daysNum; i++){
        const dayBox = document.createElement("div")
        dayBox.classList.add("day")
        const dayString = `${month + 1}/${i - paddingDays}/${year}`
        if(i > paddingDays){
            dayBox.innerText = i - paddingDays
            const eventForDay = events.find(e => e.date === dayString)
            if(eventForDay){
                const eventDiv = document.createElement("div")
                eventDiv.classList.add("event")
                eventDiv.innerText = eventForDay.title
                dayBox.appendChild(eventDiv)
            }
            dayBox.addEventListener("click", () => openModal(dayString))
        }
        else{
            dayBox.classList.add("padding")
        }

        cal.appendChild(dayBox)
    }

}

function deleteEvent(){
    events = events.filter(e => e.date!== clicked)
    localStorage.setItem('events', JSON.stringify(events))
    closeModal()
}
function clickButtons(){
    nextBtn.addEventListener("click",function(){
        nav++;
        load()
    })
    backBtn.addEventListener("click",function(){
        nav--
        load()
    })

    document.querySelector("#saveButton").addEventListener("click", saveEvent)
    document.querySelector("#cancelButton").addEventListener("click",closeModal)
    document.querySelector("#deleteButton").addEventListener("click", deleteEvent)
    document.querySelector("#closeButton").addEventListener("click", closeModal)

}
clickButtons()
load()

console.log(events)
