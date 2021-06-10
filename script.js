let timerObj = {
   minutes : 0,
   seconds : 0,
   timerId : 0
};

function playSound() {
    let amount = 3;
    var audio = new Audio("Timer_Sound_Effect.mp3");
    function alarm() {
    audio.pause();
    audio.currentTime = 0; 
    audio.play();
    }
 for (let i=0; i<amount; i++) {
    setTimeout(alarm, 1200*i);
 }
}
function updateValue(key , value) {
if (value < 0 ) {
   value = 0;
   console.log("Positive numbers only :( ");
}
if(key=="seconds") {
   if(value < 10) {
      value = "0" + value;
   } 
}
if(key=="seconds") {
   if(value>59) 
   value = 59;
}

$("#"+key).html(value || 0);
timerObj[key] = value;
/* console.log("Min: "+timerObj.minutes);
console.log("Sec: "+timerObj.seconds); */ 
}
(function detectChanges(key) {
   // console.log("Detect changes");
   let input = "#" + key +"-input";
   $(input).change(function() {
      updateValue(key, $(input).val());
   });
   $(input).keyup(function() {
      updateValue(key, $(input).val());
   });

   return arguments.callee;

})("minutes")("seconds");

function startTimer() {
   buttonManeger( ["start" , false] , ["stop" , true] , ["pause" , true]);
   freezeInputs();
   timerObj.timerId = setInterval(function(){
      timerObj.seconds--;
      if(timerObj.seconds < 0) {
         if(timerObj.minutes == 0) {
            playSound();
            return stopTimer();
         }
         timerObj.seconds = 59;
         timerObj.minutes--;
      }
      updateValue("minutes" , timerObj.minutes);
      updateValue("seconds" , timerObj.seconds);
   },1000);
} 

function stopTimer() {
   clearInterval(timerObj.timerId);
   buttonManeger( ["start" , true] , ["stop" , false] , ["pause" , false]);
   unfreezeInputs();
   updateValue("minutes" , $("#minutes-input").val());
   updateValue("seconds" , $("#seconds-input").val());

}

function pauseTimer() {
   buttonManeger( ["start" , true] , ["stop" , true] , ["pause" , false]);
   clearInterval(timerObj.timerId);
}

function buttonManeger(...buttonArray) {
   for(let i=0; i<buttonArray.length; i++) {
      let button = "#" + buttonArray[i][0] +"-button";
   
   if(buttonArray[i][1]) {
      $(button).removeAttr("disabled");
   }
   else {
      $(button).attr("disabled" , "disabled");
   }
}
}
function freezeInputs() {
   $("#minutes-input").attr("disabled" , "disabled");
   $("#seconds-input").attr("disabled" , "disabled");
}
function unfreezeInputs() {
   $("#minutes-input").removeAttr("disabled");
   $("#seconds-input").removeAttr("disabled");
}

