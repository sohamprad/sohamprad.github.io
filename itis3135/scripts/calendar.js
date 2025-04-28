const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');

const prevButton = document.getElementById('prev-month');
const nextButton = document.getElementById('next-month');
const todayButton = document.getElementById('today-button');

const signupDialog = $("#signup-dialog");
const volunteerForm = $("#volunteer-form");

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let bookedDays = JSON.parse(localStorage.getItem('bookedDays')) || {};
let selectedDay = null;
let currentMonth, currentYear;

// Today's date
const realToday = new Date();
const realTodayMonth = realToday.getMonth();
const realTodayYear = realToday.getFullYear();
const realTodayDate = realToday.getDate();

// Initialize to today
currentMonth = realTodayMonth;
currentYear = realTodayYear;


function openSignup(day, month, year) {
  selectedDay = { day, month, year };
  signupDialog.dialog("open");
}

// Build calendar
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

    const dateObj = new Date(year, month, day);
    const isPastDate = (dateObj < realToday && (month !== realTodayMonth || year !== realTodayYear)) 
                    || (year < realTodayYear)
                    || (year === realTodayYear && month < realTodayMonth)
                    || (year === realTodayYear && month === realTodayMonth && day < realTodayDate);

    if (day === realTodayDate && month === realTodayMonth && year === realTodayYear) {
      dayDiv.classList.add('today');
    }

    if (bookedDays[key]) {
      dayDiv.classList.add('unavailable');
      $(dayDiv).attr('title', 'Already booked');
    } else if (isPastDate) {
      dayDiv.classList.add('unavailable');
      $(dayDiv).attr('title', 'Past date');
    } else {
      dayDiv.addEventListener('click', () => openSignup(day, month, year));
      $(dayDiv).attr('title', 'Click to volunteer!');
    }

    calendar.appendChild(dayDiv);
  }

  // Activate tooltips
  $( ".day" ).tooltip();
}

function submitSignup() {
  const name = $("#name").val().trim();
  const email = $("#email").val().trim();

  if (!name || !email || !selectedDay) {
    alert("Please fill in all fields.");
    return;
  }

  const key = `${selectedDay.month}-${selectedDay.day}-${selectedDay.year}`;
  bookedDays[key] = { name, email };
  localStorage.setItem('bookedDays', JSON.stringify(bookedDays));

  buildCalendar(currentMonth, currentYear);
  signupDialog.dialog("close");
  volunteerForm[0].reset();
}

// Setup dialog
signupDialog.dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    "Sign Up": function() {
      submitSignup();
    },
    Cancel: function() {
      $(this).dialog("close");
    }
  }
});

// Month navigation
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

// Jump to today
todayButton.addEventListener('click', () => {
  currentMonth = realTodayMonth;
  currentYear = realTodayYear;
  buildCalendar(currentMonth, currentYear);
});

// Initial build
buildCalendar(currentMonth, currentYear);