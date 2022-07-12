const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate= new Date(2022,1,14,00,00,00);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

const weekday = weekdays [futureDate.getDay()];

giveaway.textContent =`Next Valentine's Day is  ${weekday} ${date} ${month} ${year} ${hours}: ${minutes}`;

// futute time in millisecond

const futureTime = futureDate.getTime();

function getRemainigTime(){
    const today = new Date().getTime();
    const t = futureTime - today;

    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    // calculate

    let days = t/oneDay;
    days = Math.floor(days);
    let hours =Math.floor( (t % oneDay) /oneHour );
    let minutes =Math.floor( (t % oneHour) /oneMinute );
    let seconds =Math.floor( (t % oneMinute) /1000 );

    // set values Array;
    const values = [days,hours,minutes,seconds];

    function format(item){
        if (item < 10 ){
            return item = `0${item}`
        }
        return item
    }

    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });
    if(t<0){
        clearInterval(countdown)
        deadline.innerHTML= `<h4 class="expaired">Sorry day is passed<h4>`
    }

}
// countdown refresh every 1000 millisecond = 1 second
let countdown = setInterval(getRemainigTime, 1000);

getRemainigTime();