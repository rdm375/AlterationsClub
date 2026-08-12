const meetings = {
  Sunday: [
    { time: "9:00 AM", name: "Sunday Morning Group", type: "Open · Discussion", room: "Main Room" },
    { time: "6:00 PM", name: "Alterations Group", type: "Open · Discussion", room: "Main Room" },
    { time: "8:00 PM", name: "Last Call", type: "Closed · Discussion", room: "Main Room" }
  ],
  Monday: [
    { time: "7:00 AM", name: "Early Birds", type: "Open · Discussion", room: "Main Room" },
    { time: "12:00 PM", name: "Nooners", type: "Open · Discussion", room: "Main Room" },
    { time: "7:00 PM", name: "Alterations Group", type: "Closed · Literature", room: "Main Room" }
  ],
  Tuesday: [
    { time: "12:00 PM", name: "Nooners", type: "Open · Discussion", room: "Main Room" },
    { time: "6:30 PM", name: "New Beginnings", type: "Open · Newcomer", room: "Side Room" }
  ],
  Wednesday: [
    { time: "7:00 AM", name: "Early Birds", type: "Open · Discussion", room: "Main Room" },
    { time: "12:00 PM", name: "Nooners", type: "Open · Discussion", room: "Main Room" },
    { time: "7:00 PM", name: "Alterations Group", type: "Open · Speaker", room: "Main Room" }
  ],
  Thursday: [
    { time: "12:00 PM", name: "Nooners", type: "Open · Discussion", room: "Main Room" },
    { time: "7:30 PM", name: "Big Book Study", type: "Closed · Literature", room: "Main Room" }
  ],
  Friday: [
    { time: "7:00 AM", name: "Early Birds", type: "Open · Discussion", room: "Main Room" },
    { time: "12:00 PM", name: "Nooners", type: "Open · Discussion", room: "Main Room" },
    { time: "8:00 PM", name: "Friday Night Fellowship", type: "Open · Discussion", room: "Main Room" }
  ],
  Saturday: [
    { time: "10:00 AM", name: "Saturday Solutions", type: "Open · Step Study", room: "Main Room" },
    { time: "7:00 PM", name: "Saturday Speaker", type: "Open · Speaker", room: "Main Room" }
  ]
};

const days = Object.keys(meetings);
const tabs = document.querySelector("#day-tabs");
const schedule = document.querySelector("#schedule");
const todayList = document.querySelector("#today-meetings");
const todayTitle = document.querySelector("#today-title");

function meetingMarkup(meeting) {
  return `
    <article class="schedule-card">
      <p class="eyebrow">${meeting.time}</p>
      <h3>${meeting.name}</h3>
      <p>${meeting.room}</p>
      <div class="meta">${meeting.type.split(" · ").map(item => `<span class="tag">${item}</span>`).join("")}</div>
    </article>`;
}

function renderDay(day) {
  schedule.innerHTML = meetings[day].map(meetingMarkup).join("");
  [...tabs.querySelectorAll("button")].forEach(button => {
    const active = button.dataset.day === day;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
}

days.forEach(day => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.day = day;
  button.role = "tab";
  button.textContent = day;
  button.addEventListener("click", () => renderDay(day));
  tabs.appendChild(button);
});

const currentDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
const initialDay = meetings[currentDay] ? currentDay : "Sunday";
todayTitle.textContent = `${initialDay} meetings`;
todayList.innerHTML = meetings[initialDay].map(m => `
  <div class="meeting-row">
    <strong class="meeting-time">${m.time}</strong>
    <div><strong>${m.name}</strong><br><span>${m.type}</span></div>
  </div>`).join("");
renderDay(initialDay);
