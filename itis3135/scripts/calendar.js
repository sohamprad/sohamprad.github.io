const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const signupForm = document.getElementById('signup-form');
const selectedDateElem = document.getElementById('selected-date');
const volunteerForm = document.getElementById('volunteer-form');

const prevButton = document.getElementById('prev-month');
const nextButton = document.getElementById('next-month');
const todayButton = document.getElementById('today-button');

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Track which days have been signed up
const bookedDays = {};

let selectedDay = null;
let currentMonth, currentYear;

// Store today's date
const realToday = new Date();
const realTodayMonth = realToday.getMonth();
const realTodayYear = realToday.getFullYear();
const realTodayDate = realToday.getDate();

// Initialize to today
currentMonth = realTodayMonth;
currentYear = realTodayYear;

// Build the calendar
function buildCalendar(month, year) {
  calendar.innerHTML = "";
  monthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();

  // Fill blank spaces
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'day empty';
    calendar.appendChild(emptyDiv);
  }

  // Fill days
  for (let day = 1; day <= numDays; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerText = day;

    const key = `${month}-${day}-${year}`;

    // Highlight today
    if (day === realTodayDate && month === realTodayMonth && year === realTodayYear) {
      dayDiv.classList.add('today');
    }

    // Check if the day is booked
    if (bookedDays[key]) {
      dayDiv.classList.add('unavailable');
    } else {
      dayDiv.addEventListener('click', () => openSignup(day, month, year));
    }

    calendar.appendChild(dayDiv);
  }
}

function openSignup(day, month, year) {
  if (bookedDays[`${month}-${day}-${year}`]) return;

  selectedDay = { day, month, year };
  selectedDateElem.textContent = `${monthNames[month]} ${day}, ${year}`;
  signupForm.classList.remove('hidden');
}

// Handle form submit
volunteerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!selectedDay) return;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    alert(`Thank you ${name} for signing up on ${monthNames[selectedDay.month]} ${selectedDay.day}, ${selectedDay.year}!`);

    // Mark the day as booked
    bookedDays[`${selectedDay.month}-${selectedDay.day}-${selectedDay.year}`] = { name, email };

    // Rebuild the calendar
    buildCalendar(currentMonth, currentYear);

    // Hide and reset the form
    signupForm.classList.add('hidden');
    volunteerForm.reset();
  }
});

// Handle month navigation
prevButton.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  buildCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  buildCalendar(currentMonth, currentYear);
});

// Jump to Today button
todayButton.addEventListener('click', () => {
  currentMonth = realTodayMonth;
  currentYear = realTodayYear;
  buildCalendar(currentMonth, currentYear);
});

// Initial build
buildCalendar(currentMonth, currentYear);