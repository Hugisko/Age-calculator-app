const year_age = document.querySelector('.year-age span');
const month_age = document.querySelector('.month-age span');
const day_age = document.querySelector('.day-age span');
const day_label = document.querySelector('.day-label');
const month_label = document.querySelector('.month-label');
const year_label = document.querySelector('.year-label');
const day_input_el = document.querySelector('#day-input');
const month_input_el = document.querySelector('#month-input');
const year_input_el = document.querySelector('#year-input');
const form = document.querySelector('form');

function errorShow() {
    day_label.classList.add('error');
    month_label.classList.add('error');
    year_label.classList.add('error');
    day_input_el.classList.add('error');
    month_input_el.classList.add('error');
    year_input_el.classList.add('error');
}

function errorMessage(text, input) {
    if(!input.parentNode.querySelector('.error-message')){
        const el = document.createElement('p');
        el.classList.add('error-message');
        el.innerText = text;
        input.parentNode.appendChild(el);
    } else {      
        if(input.parentNode.querySelector('.error-message').innerText !== text) {
            console.log('gergre');
            input.parentNode.querySelector('.error-message').innerText = text;
        }
    }
}

function reset() {
    day_label.classList.remove('error');
    month_label.classList.remove('error');
    year_label.classList.remove('error');
    day_input_el.classList.remove('error');
    month_input_el.classList.remove('error');
    year_input_el.classList.remove('error');
}

function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

function validation(year_input,month_input,day_input) {
    let error = false;
    const currYear = new Date().getFullYear();
    const year = parseInt(year_input);
    const month = parseInt(month_input);
    const day = parseInt(day_input);
    const daysInMonth = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(!year_input) {
        errorMessage('This field is required',year_input_el);
        error = true;
    } else if(isNaN(year)) {
        errorMessage('Must be a valid year',year_input_el);
        error = true; 
    } else if(year > currYear) {
        errorMessage('Must be in the past',year_input_el);
        error = true; 
    }
    else {
        if(year_input_el.parentNode.querySelector('.error-message')){
            year_input_el.parentNode.removeChild(year_input_el.parentNode.querySelector('.error-message'));
        }
    }

    if(!month_input) {
        errorMessage('This field is required',month_input_el);
        error = true;
    } else if(isNaN(month) || month > 12 || month < 1) {
        errorMessage('Must be a valid month',month_input_el);
        error = true; 
    } else {
        if(month_input_el.parentNode.querySelector('.error-message')){
            month_input_el.parentNode.removeChild(month_input_el.parentNode.querySelector('.error-message'));
        }   
    }

    if(!day_input) {
        errorMessage('This field is required',day_input_el);
        error = true;
    } else if(isNaN(day) || day > daysInMonth[month - 1] || day < 1) {
        errorMessage('Must be a valid day',day_input_el);
        error = true;
    } else {
        if(day_input_el.parentNode.querySelector('.error-message')){
            day_input_el.parentNode.removeChild(day_input_el.parentNode.querySelector('.error-message'));
        }
    }

    return error ? false : true;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const year_input = year_input_el.value;
    const month_input = month_input_el.value;
    const day_input = day_input_el.value;

    if(!validation(year_input,month_input,day_input)) {
        errorShow();
        return;
    }else {
        reset();
    }

    const birthday = new Date(`${year_input}-${month_input}-${day_input}`);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate();

    document.querySelector('.year-age p').innerText = (years === 1) ? 'year' : 'years';
    document.querySelector('.month-age p').innerText = (months === 1) ? 'month' : 'months';
    document.querySelector('.day-age p').innerText = (days === 1) ? 'day' : 'days';

    year_age.innerText = years;
    month_age.innerText = months;
    day_age.innerText = days;

    
})


