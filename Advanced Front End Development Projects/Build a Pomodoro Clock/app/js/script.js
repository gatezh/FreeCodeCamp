
const session = {
  workTime: 25,
  breakTime: 5,
  status: 0,
  period: 'workTime',
  timeLeft: 0,
};
const workTimeElement = document.getElementById('work-time-element');
const breakTimeElement = document.getElementById('break-time-element');
const timerCountdownElement = document.getElementById('timer-countdown');
const progressBar = document.getElementById('progress-bar');
const timerControl = document.getElementById('timer-control');

workTimeElement.innerHTML = session.workTime;
breakTimeElement.innerHTML = session.breakTime;
timerCountdownElement.textContent = session.workTime;

const resetTimer = function resetTimer() {
  session.timer = '';
  session.timeLeft = 0;
  session.status = 0;
  progressBar.style.width = '0%';
  timerControl.textContent = 'start';
};

const applyTimeChange = function applyTimeChange(num, timeType) {
  if (num < 0 && session[timeType] > 1) {
    session[timeType] -= 1;
  } else if (num > 0) {
    session[timeType] += 1;
  }
};

const changeWorkTime = function changeWorkTime(num, timeType = 'workTime') {
  if (!session.status || session.status === 'paused') {
    applyTimeChange(num, timeType);
    resetTimer();
    workTimeElement.innerHTML = session.workTime;
    timerCountdownElement.textContent = session.workTime;
  }
};

const changeBreakTime = function changeBreakTime(num, timeType = 'breakTime') {
  if (!session.status || session.status === 'paused') {
    applyTimeChange(num, timeType);
    resetTimer();
    breakTimeElement.innerHTML = session.breakTime;
    timerCountdownElement.textContent = session.workTime;
  }
};

const prepareSession = function prepareSession() {
  if (session.period === 'workTime') {
    session.timeLeft = session.workTime * 60;
  } else {
    session.timeLeft = session.breakTime * 60;
  }
};

const switchSession = function switchSession() {
  if (session.period === 'workTime') {
    session.period = 'breakTime';
    progressBar.classList.remove('bg-warning');
    progressBar.classList.add('bg-success');
  } else {
    session.period = 'workTime';
    progressBar.classList.remove('bg-success');
    progressBar.classList.add('bg-warning');
  }
  prepareSession();
};

const displayCountdown = function displayCountdown() {
  let minutes = parseInt((session.timeLeft / 60), 10);
  let seconds = session.timeLeft - (minutes * 60);
  console.log(`minutes.toStringLength: ${minutes.toString().length}`);
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  }
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }
  console.log(`session.timeLeft: ${session.timeLeft}`);
  console.log(`minutes: ${minutes}, seconds: ${seconds}`);
  timerCountdownElement.textContent = `${minutes}:${seconds}`;
};

const displayProgressBar = function displayProgressBar() {
  const period = session.period;
  const progress = 100 - ((session.timeLeft / (session[period] * 60)) * 100);
  progressBar.style.width = `${progress}%`;
};

const runSession = function runSession() {
  if (session.timeLeft !== 0) {
    session.timeLeft -= 1;
  } else {
    switchSession();
  }
  displayCountdown();
  displayProgressBar();
  console.log(`${session.timeLeft} seconds of ${session.period} left`);
};

timerControl.onclick = function () {
  if (!session.status) {
    prepareSession();
    session.timer = setInterval(runSession, 1000);
    session.status = 'running';
    timerControl.innerText = 'pause';
  } else if (session.status === 'paused') {
    session.timer = setInterval(runSession, 1000);
    session.status = 'continued';
    timerControl.innerText = 'pause';
  } else {
    clearInterval(session.timer);
    session.status = 'paused';
    timerControl.innerText = 'continue';
  }
};
