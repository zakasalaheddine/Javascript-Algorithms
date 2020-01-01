const person1Calendar = [
    ["9:00", "10:30"],
    ["12:30", "13:00"],
    ["16:00", "18:00"]
]
const person1Boundary = ["9:00", "20:00"]
const person2Calendar = [
    ["10:00", "11:30"],
    ["12:30", "14:30"],
    ["14:30", "15:00"],
    ["16:00", "17:00"]
]
const person2Boundary = ["10:00", "18:30"]
const meatingTime = 30
const output = [
    ["11:30", "12:00"],
    ["15:00", "16:00"],
    ["18:00", "18:30"]
]
const compareTimes = (time1, time2) => {
    const convertedTime1 = parseInt(time1.split(':')[0]) * 60 + parseInt(time1.split(':')[1])
    const convertedTime2 = parseInt(time2.split(':')[0]) * 60 + parseInt(time2.split(':')[1])
    if (convertedTime1 < convertedTime2)
        return -1;
    else if (convertedTime1 > convertedTime2)
        return 1;
    return 0;
}

const isTimeBetweenEnough = (time1, time2, duration) => {
    const convertedTime1 = parseInt(time1.split(':')[0]) * 60 + parseInt(time1.split(':')[1])
    const convertedTime2 = parseInt(time2.split(':')[0]) * 60 + parseInt(time2.split(':')[1])
    if(Math.abs(convertedTime1 - convertedTime2) >= duration)
        return true;
    return false;
}
const generateFreeTime = (calendar, boundary) => {
    const result = [];
    if (compareTimes(boundary[0], calendar[0][0]) !== 0) {
        result.push([boundary[0], calendar[0][0]]);
    }
    calendar.map((item, index) => {
        if (index + 1 < calendar.length)
            if (compareTimes(item[1], calendar[index + 1][0]) !== 0) {
                result.push([item[1], calendar[index + 1][0]])
            }
    })
    if (compareTimes(calendar[calendar.length - 1][1], boundary[1]) !== 0) {
        result.push([calendar[calendar.length - 1][1], boundary[1]]);
    }
    return result;
}
const findAvailableTimes = (calendar1, boundary1, calendar2, boundary2) => {
    const p1FreeCalendar = generateFreeTime(calendar1, boundary1);
    const p2FreeCalendar = generateFreeTime(calendar2, boundary2);
    const result = [];
    p1FreeCalendar.map(item => {
        for(let value of p2FreeCalendar){
            let compare1 = compareTimes(value[0], item[0]);
            let compare2 = compareTimes(value[1], item[1]);
            if((compare1 === 1 || compare1 === 0 )){
                if(compare2 === -1 || compare2 === 0){
                    if(isTimeBetweenEnough(value[0], item[1], meatingTime))
                        result.push([value[0], item[1]])
                    break;
                }
            }
            if(compare1 === -1 && compare2 === -1){
                if(compareTimes(item[0], value[1]) === -1){
                    if(isTimeBetweenEnough(item[0], value[1], meatingTime))
                        result.push([item[0], value[1]])
                    break;
                }
            }
        }
    })
    return result;
}
console.log(findAvailableTimes(person1Calendar, person1Boundary, person2Calendar, person2Boundary))