const data = window.SITE_DATA;

if (!data) {
  throw new Error("SITE_DATA is missing. Make sure site-data.js loads before script.js.");
}

const meetings = data.meetings;

function addressValues() {
  const { street, city, state, postalCode } = data.address;
  return {
    street,
    cityState: `${city}, ${state}`,
    cityStatePostal: `${city}, ${state} ${postalCode}`,
    full: `${street}, ${city}, ${state} ${postalCode}`
  };
}

function getValue(path) {
  if (path.startsWith("address.")) {
    return addressValues()[path.split(".")[1]];
  }
  return path.split(".").reduce((value, key) => value?.[key], data);
}

function applySiteData() {
  document.querySelectorAll("[data-site]").forEach(element => {
    const value = getValue(element.dataset.site);
    if (value !== undefined && value !== null) element.textContent = value;
  });

  const encodedAddress = encodeURIComponent(addressValues().full);
  const links = {
    phone: `tel:${data.contact.phoneDial}`,
    email: `mailto:${data.contact.email}`,
    googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    appleMaps: `https://maps.apple.com/?q=${encodedAddress}`
  };

  document.querySelectorAll("[data-site-link]").forEach(element => {
    const href = links[element.dataset.siteLink];
    if (href) element.href = href;
  });
}

applySiteData();

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
      <p><strong>Chair:</strong> ${meeting.chair}</p>
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
