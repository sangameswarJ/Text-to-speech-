// Stop Narration if still speaking before unloading the page
window.onbeforeunload = function(){
  speechSynthesis.cancel();
}

// Initialize the speech synthesis
var speech = new SpeechSynthesisUtterance();
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;
  speech.voice = speechSynthesis.getVoices()[0];


// Element Selector
const voiceoption = document.getElementById('narrator')
const textField = document.getElementById("textField")
const speak = document.getElementById("speakBtn")
const pause = document.getElementById("pauseButton")
const stopBtn = document.getElementById("stopButton")
const narrationSpeed = document.getElementById("narrationSpeed")

window.onload = function(){
    /**
     * Listing Available Narration Voices
     */
    speechSynthesis.getVoices().forEach((voice,k) => {
      var opt = document.createElement('option')
      opt.value= k;
      opt.innerText = (voice.name).split(' - ')[0]
      voiceoption.appendChild(opt)
    })
    /**
     * Select the first voice option by default
     */
    speech.voice = speechSynthesis.getVoices()[0];

    /**
     * Update Narrator Voice
     */
    voiceoption.addEventListener('change', ()=>{
      speech.voice = speechSynthesis.getVoices()[voiceoption.value];
    })

    /** Trigger Speak event if Speak button is clicked */
    speak.addEventListener('click', speakInputText)
    /** Trigger Pause event if Pause button is clicked */
    pause.addEventListener('click', pauseSpeech)
    /** Trigger Stop event if Stop button is clicked */
    stopBtn.addEventListener('click', stopSpeech)
    /** Trigger Change Speed when Narration Speed value has changes */
    narrationSpeed.addEventListener('change', changeSpeed)
}


/** Play Text-to-Speech */
function speakInputText() {
  speech.text = textField && textField.value ? textField.value : "Enter the text you want to convert here";
  if(speechSynthesis.speaking)
    speechSynthesis.cancel();
  speechSynthesis.speak(speech);
}

/** Pause Text-to-Speech */
function pauseSpeech() {
  if(speechSynthesis.speaking){
    if(speechSynthesis.paused){
      speechSynthesis.resume()
    }else{
      speechSynthesis.pause()
    }
  }
}
/** Stop Text-to-Speech */
function stopSpeech() {
  if(speechSynthesis.speaking){
    speechSynthesis.cancel();
  }
}
/** Update Narration Speed */
function changeSpeed(voiceSpeed) {
    speech.rate = narrationSpeed.value;
}
