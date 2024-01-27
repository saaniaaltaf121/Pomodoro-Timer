const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startbtn = document.querySelector('.startbtn');
const pausebtn = document.querySelector('.pausebtn');
const resumebtn = document.querySelector('.resumebtn');
const resettbtn = document.querySelector('.resettbtn');
const pomoCountDisplay = document.querySelector('.pomoCountDisplay');

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let timerID = null;
let oneRoundCompleted = false;
let totalcount = 0;
let paused = false;

const updateTitle = (msg) => {
    title.textContent = msg;

}
const saveLocalCounts = () => {
    let counts = JSON.parse(localStorage.getItem("pomocounts"));
    counts !== null ? counts++ : counts = 1;
    counts++;
    localStorage.setItem("pomocounts", JSON.stringify(counts))
}

const countDown = (time) => {
    return () => {
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = Math.floor(time % 60).toString().padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
    
        time--;
        if (time < 0) {
            stopTimer();
            if (!oneRoundCompleted) {


                timerID = startTimer(BREAK_TIME);
                oneRoundCompleted = true;
                updateTitle('Its Break Time!');
            }
            else {
                updateTitle('completed 1 Round!');
                setTimeout(() => updateTitle('Start Timer Again!'), 2000);
                totalcount++;
                saveLocalCounts();
                showPommoCounts();

            }
        }
    }
}








const startTimer = (startTime) => {
    if (timerID !== null) {
        stopTimer();
    }

    return setInterval(countDown(startTime), 1000)

}



const stopTimer = () => {
    clearInterval(timerID);
    timerID = null
}
const getTimeInSeconds = (timeString) => {
    const[minutes,second] = timeString.split(":");
    return parseInt(minutes * 60) + parseInt(second);

}


startbtn.addEventListener('click', () => {
    timerID = startTimer(WORK_TIME);
    updateTitle('Its Work Time!');


})
resettbtn.addEventListener('click', () => {
    stopTimer();
    timer.textContent = "25:00"
})
pausebtn.addEventListener('click', () => {
    stopTimer();
    paused = true;
    updateTitle("Timer Paused");

})

resumebtn.addEventListener('click', () => {
    if(paused = true){
        const currentTime = getTimeInSeconds(timer.textContent);
        timerID = startTimer(currentTime);
        paused = false;
        (!oneRoundCompleted) ? updateTitle("It's Work Time!") : updateTitle("It's Break Time!")

    }

})





const showPommoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if (counts < 0) {
        pomoCountDisplay.style.display = "flex";

    }
    pomoCountDisplay.firstElementChild.textContent = counts;
}
showPommoCounts();