const workTimeDis = document.getElementById('workTime'),
      playTimeDis = document.getElementById('playTime'),
      reset = document.getElementById('reset'),
      silence = document.getElementById('silence'),
      pause = document.getElementById('pause'),
      workUp = document.getElementById('workUp'),
      workDown = document.getElementById('workDown'),
      playUp = document.getElementById('playUp'),
      playDown = document.getElementById('playDown'),
      alarm = document.getElementById('alarm');

let workTimer = 25 * 60, //Default.
    playTimer = 5 * 60, //Default.
    workTime = workTimer,
    playTime = playTimer,
    paused = false,
    x,
    y;
    
//INITIAL DISPLAY:
workTimeDis.value = `${workTime / 60}:00`;
playTimeDis.value = `${playTime / 60}:00`;

//WORK TIME SECTION:
workUp.addEventListener('click', ()=> { workTime += 60; workTimeDis.value = `${workTime / 60}:00`; });

workTimeDis.addEventListener('click', ()=> {
  document.getElementById("workTime").disabled = true;
  x = setInterval( ()=>{ workCountDown(); }, 1000);
});

workDown.addEventListener('click', ()=> { workTime -= 60; workTimer < 0 ? workTime = 0 : workTimeDis.value = `${workTime / 60}:00`; });

//PLAY TIME SECTION:
playUp.addEventListener('click', ()=> { playTime += 60; playTimeDis.value = `${playTime / 60}:00`; });

playTimeDis.addEventListener('click', ()=> {
  document.getElementById("playTime").disabled = true;
  y = setInterval( ()=>{ playCountDown(); }, 1000);
});

playDown.addEventListener('click', ()=> { playTime -= 60; playTimer < 0 ? playTime = 0 : playTimeDis.value = `${playTime / 60}:00`; });

//CONTROLS SECTION:
reset.addEventListener('click', resetTime);

silence.addEventListener('click', ()=> { alarm.pause(); });

pause.addEventListener('click', ()=> { if(!paused){ paused = true; pause.innerHTML = 'Play'; } else{ paused = false; pause.innerHTML = 'Pause'; } });

//FUNCTION SECTION:
function workCountDown(){
  if (paused === true){ workTime++; } //Checks pause value and counter-acts the countdown.
  workTime -= 1;
  let workMinutes = (workTime / 60) | 0,
      workSeconds = (workTime % 60) | 0;
//Adds placeholder "0" to minutes and seconds for consistancy:
      workMinutes = workMinutes < 10 ? "0" + workMinutes : workMinutes;
      workSeconds = workSeconds < 10 ? "0" + workSeconds : workSeconds;
//Checks time left on countdown:
  if(workTime >= 0){ workTimeDis.value = `${workMinutes}:${workSeconds}`; }
  else{ resetTime(); alarm.play(); }
}
function playCountDown(){
  if (paused === true){ playTime++; } //Checks pause value and counter-acts the countdown.
  playTime -= 1;
  let playMinutes = (playTime / 60) | 0,
      playSeconds = (playTime % 60) | 0;
//Adds placeholder "0" to minutes and seconds for consistancy:
      playMinutes = playMinutes < 10 ? "0" + playMinutes : playMinutes;
      playSeconds = playSeconds < 10 ? "0" + playSeconds : playSeconds;
//Checks time left on countdown:
  if(playTime >= 0){ playTimeDis.value = `${playMinutes}:${playSeconds}`; }
  else{ resetTime(); alarm.play(); }
}
function resetTime(){ //Resets everything to default:
  workTime = workTimer;
  workTimeDis.value = `${workTime / 60}:00`;
  clearInterval(x);
  document.getElementById("workTime").disabled = false;

  playTime = playTimer;
  playTimeDis.value = `${playTime / 60}:00`;
  clearInterval(y);
  document.getElementById("playTime").disabled = false;

  paused = false;
  pause.innerHTML = 'Pause';
}
