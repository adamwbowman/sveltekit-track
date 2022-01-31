import weeks from "$lib/weeks.js";

let years = [], months = [], days = [];
let strMonth, strDay, strMinusWeek

let today = new Date();
let month = (today.getMonth() +1);
let day = (today.getDate());
let year = (today.getFullYear());

(month.toString().length < 2) ? strMonth = '0' + month : strMonth = month;
(day.toString().length < 2) ? strDay = '0' + day : strDay = day;

let dateToday = [strMonth, strDay, year].join('/');
export let findWeek = weeks.find(el => (el.start > dateToday));

let strCurrentWeek = (parseInt(findWeek.week) -1);
let strPreviousWeek = (parseInt(findWeek.week) -2);

export let currentWeek = weeks.find(el => (parseInt(el.week) == strCurrentWeek));
export let previousWeek = weeks.find(el => (parseInt(el.week) == strPreviousWeek));
// export let startDate = new Date(currentWeek.start);
// export let endDate = new Date(currentWeek.end);
// console.log(startDate+"-"+endDate);

export function formatShortDate(strDate) { 
	return strDate.toString().substring(0, 15); 
}