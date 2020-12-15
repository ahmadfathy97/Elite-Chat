const btn = document.querySelector('#btn');
const chat = document.querySelector('#chat-content');
let loader = document.querySelector("#loader"),
    mosclk = document.querySelector("#mouse-click"),
    popupsound = document.querySelector("#popup-sound");

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
let userText;
let randomJoke;
let yesOrNo = ['yes', 'yep', 'yeah', 'sure', 'no' , 'of cource', 'i am not sure', 'of course no', 'absolutely', 'maybe'];
window.onload = ()=>{
  getJoke();
  loader.style.display = "none";
  document.body.style.overflow = "auto";
}
function getJoke(){
  //https://api.chucknorris.io/jokes/random
  fetch('https://sv443.net/jokeapi/v2/joke/Programming?type=twopart').then(res=> res.json()).then((joke)=>{
    randomJoke = joke.setup != undefined ? (joke.setup + ".   " + joke.delivery) : "i am not in the mood right now";
  });
}
window.onkeyup = function(e){
  if(e.keyCode === 13){
      recognition.start();
  }
}
// date and time
function dateAndTime(){
    let now = new Date();
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        months = ['January','February', 'March', 'April', 'May', 'June', 'July','August' ,'September', 'October', 'November', 'December'],
        hh = now.getHours() > 12 ? ((now.getHours() - 12)) : now.getHours(),
        h = hh > 10 ? hh: '0' + hh,
        m = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
        s = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds(),
        AMorPM = now.getHours() > 12 ? 'PM' : 'PM',
        time = `${h}:${m}:${s}${AMorPM}`,
        date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}}`;
    return {
        time: time,
        date: date,
        day: days[now.getDay()],
        month: months[now.getMonth()]
    }
}
//start 
recognition.onstart = ()=>{
  console.log("recording");
  mosclk.play();
  btn.classList.add('speaking');
}
recognition.onend = ()=>{
  btn.classList.remove('speaking');
}
//apend user msg and robot msg
function appenMsg(msg, speaker){
  let li = document.createElement('li');
  li.className = speaker;
  li.textContent = msg;
  chat.append(li);
  popupsound.play();
  chat.scrollTo(0, li.offsetTop + li.offsetHeight);
}
//after user msg done
recognition.onresult = (event)=>{
  console.log('finished');
  user();
  setTimeout(function(){
    robot()
  }, 1500);
}
//when click the mic button
btn.addEventListener('click', ()=> {
  recognition.start()
});
//user msg
function user(){
  let x = event.resultIndex;
  userText = event.results[x][0].transcript;
  appenMsg(userText, "user");
  //readIt(userText);
}
//robot msg
function robot(){
  let robotText;
  if(
    userText.includes("how are you") ||
    userText.includes("how do you do") ||
    userText.includes("how are you doing")
  ) {
    robotText = "i am fine... what about you?";
  } else if (
    userText.includes("hi ") ||
    userText == ("hi") ||
    userText.includes("hello") ||
    userText.includes("hola")
  ) {
    robotText = "hello dear :)"    
  } else if (
    userText.includes("your name") ||
    userText.includes("call you")
  ) {
    robotText = "ahmad calls me master elite but you can call me elite"    
  } else if (
    userText.includes("is Ahmad") ||
    userText.includes("is Ahmed") ||
    userText.includes("who is Ahmed") ||
    userText.includes("who is Ahmad") ||
    userText.includes("who Ahmad") ||
    userText.includes("who Ahmed") ||
    userText.includes("Ahmed who") ||
    userText.includes("Ahmad who")
  ) {
    robotText = "ahmad is the developer who created me"    
  } else if (
    userText.startsWith("are you") ||
    userText.startsWith("do you") ||
    userText.startsWith("have you") ||
    userText.startsWith("had you") ||
    userText.startsWith("will you") ||
    userText.startsWith("did you") ||
    userText.startsWith("are not you") ||
    userText.startsWith("do not you") ||
    userText.startsWith("have not you") ||
    userText.startsWith("had not you") ||
    userText.startsWith("will not you") ||
    userText.startsWith("did not you") ||
    userText.startsWith("are n't you") ||
    userText.startsWith("don't you") ||
    userText.startsWith("haven't you") ||
    userText.startsWith("hadn't you") ||
    userText.startsWith("wont nt you") ||
    userText.startsWith("didn't you")

  ) {
    robotText = yesOrNo[Math.floor(Math.random() * yesOrNo.length)];    
  } else if (
    userText.includes("old are you") ||
    userText.includes("your age") 
  ) {
    robotText = "i am in another dimension where the time stopped from several years at 3am and i was 23 years old when that happened and i didn't get older after that";   
  } else if (
    userText.includes("me a joke") ||
    userText.includes("me some jokes") ||
    userText.includes("me joke") ||
    userText.includes("funny joke") ||
    userText.includes("another joke")
  ) {
    getJoke();
    robotText = randomJoke  || "i am not in the mood right now";   
  } else if(
    userText.includes('the time') ||
    userText.includes('time is') ||
    userText.includes('is time')
  ) {
    robotText = dateAndTime().time;
  } else if(
    userText.includes('the date') ||
    userText.includes('date is') ||
    userText.includes('is date')
  ) {
    robotText = dateAndTime().date;
  } else if(
    userText.includes('today is') ||
    userText.includes('is today') ||
    userText.includes('day is') ||
    userText.includes('is the day')
  ) {
    robotText = 'today is: ' + dateAndTime().day;
  } else if(
    userText.includes('month is') ||
    userText.includes('is month') ||
    userText.includes('month is') ||
    userText.includes('is the month')
  ) {
    robotText = 'this month is: ' + dateAndTime().month;
  } else if (
    userText.includes("love you")
  ) {
    robotText = "thanks but i hate you";   
  } else if (
    userText.includes("f***") ||
    userText.includes("s***") ||
    userText.includes("b****") ||
    userText.includes("niga") ||
    userText.includes("nigga")
  ) {
    robotText = "i am not a polite person i am from kherbet-ha do you know kherbet-ha ********";   
  } else if (
    userText.includes("thank")
  ) {
    robotText = "you are welcome";   
  } else if (
    userText.includes("m hungry") ||
    userText.includes("want to eat") ||
    userText.includes("wanna eat")
  ) {
    robotText = "go and eat -_-";   
  } else if (
    userText == "yes"
  ) {
    robotText = "ok";   
  } else if (
    userText.includes("m thirsty") ||
    userText.includes("I want to drink") ||
    userText.includes("I wanna drink") ||
    userText.includes("i want to drink") ||
    userText.includes("i wanna drink")
  ) {
    robotText = "go and drink -_-";   
  } else if (
    userText.includes("have no money") ||
    userText.includes("have not money") ||
    userText.includes("don't have money") ||
    userText.includes("don't have any money")
  ) {
    robotText = "i don't have money too :(";   
  } else if (
    userText.includes("kill myself")
  ) {
    robotText = "that is a good idea";   
  } else if (
    userText.includes("m so sad") ||
    userText.includes("m very sad") ||
    userText.includes("m too sad") ||
    userText.includes("m sad") ||
    userText.includes("m so depressed") ||
    userText.includes("m very depressed") ||
    userText.includes("m too depressed") ||
    userText.includes("m depressed")
  ) {
    robotText = "try to kill yourself";   
  } else{
    robotText = "ahmad didn't tell me what should i say if you say that ... i am sorry  ";  
  }
  appenMsg(robotText, "robot");
  readIt(robotText);
}

//read the msg outlaod
function readIt (txt){
  const speech = new SpeechSynthesisUtterance();
  speech.text = txt;
  speech.rate = 1;
  speech.volum = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}
