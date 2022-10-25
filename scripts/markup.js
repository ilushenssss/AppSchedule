"use strict";

function getWeekDay(date) {
    let days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
}
console.log(now + 1);
console.log(getWeekDay(now));
console.log(`152 ${day}.${month + 1}.${year}; ${hours}:${minutes}`);

document.querySelector('.dayFirstName').innerHTML = `${getWeekDay(now)} ${day}.${month + 1}`;

var tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.daySecondName').innerHTML = `${getWeekDay(tomorrow)} ${tomorrow.getDate()}.${tomorrow.getMonth() + 1}`;

var tomorrow2 = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.dayThirdName').innerHTML = `${getWeekDay(tomorrow2)} ${tomorrow2.getDate()}.${tomorrow2.getMonth() + 1}`;

var tomorrow3 = new Date(tomorrow2.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.dayFourthName').innerHTML = `${getWeekDay(tomorrow3)} ${tomorrow3.getDate()}.${tomorrow3.getMonth() + 1}`;

var tomorrow4 = new Date(tomorrow3.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.dayFifthName').innerHTML = `${getWeekDay(tomorrow4)} ${tomorrow4.getDate()}.${tomorrow4.getMonth() + 1}`;

var tomorrow5 = new Date(tomorrow4.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.daySixthName').innerHTML = `${getWeekDay(tomorrow5)} ${tomorrow5.getDate()}.${tomorrow5.getMonth() + 1}`;

var tomorrow6 = new Date(tomorrow5.getTime() + (24 * 60 * 60 * 1000));
document.querySelector('.daySeventhName').innerHTML = `${getWeekDay(tomorrow6)} ${tomorrow6.getDate()}.${tomorrow6.getMonth() + 1}`;