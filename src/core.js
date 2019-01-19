import { compose } from './fp.js';
import { mod60 } from './math.js'
import { first, second } from './collection.js'
import { splitByColon, toString } from './string.js'

let countdown;

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button')

const initialTime = '25:00';
const time = document.getElementById('time');

const getHour = compose(first, splitByColon);
const getMinute = compose(second, splitByColon);

const singleDigitNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const singleDigit = (numberText) => singleDigitNumbers.includes(numberText);
const addPrefixDigit = (numberText) => singleDigit(numberText) ? `0${numberText}` : numberText;

const nextMinuteNumber = (number) => mod60(number - 1);
const nextHourNumber = (number) => number - 1;

const nextMinute = compose(addPrefixDigit, toString, nextMinuteNumber, Number);
const nextHour = compose(addPrefixDigit, toString, nextHourNumber, Number);

const passedOneMinute = (minute) => minute == '59';

const calculateNewTime = (startTime) => {
  let hour = getHour(startTime);
  let minute = getMinute(startTime);

  let newMinute = nextMinute(minute);
  let newHour = passedOneMinute(newMinute) ? nextHour(hour) : hour;

  return `${newHour}:${newMinute}`;
};

const updateTime = () => {
  let startTime = time.textContent;
  let newTimeText = calculateNewTime(startTime);
  time.textContent = newTimeText;
};

const startPomodoro = () => countdown = setInterval(updateTime, 1000);;
const stopPomodoro = () => clearInterval(countdown);
const resetPomodoro = () => time.textContent = initialTime;

startButton.addEventListener('click', startPomodoro);
stopButton.addEventListener('click', stopPomodoro)
resetButton.addEventListener('click', resetPomodoro);
