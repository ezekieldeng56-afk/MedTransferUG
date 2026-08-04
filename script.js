let squadCount = 0;
let budget = 100000;
let transferWindowOpen = true;
// Transfer window closes 14 days from opening
const deadline = new Date();

// Add 14 days
deadline.setDate(deadline.getDate() + 14);
let loggedIn = false;
let loggedInClub = "";
const managerPasswords = {
    BPHARM: "BPHARM@2026",
    BDS: "BDS@2026",
    BNUR: "BNUR@2026",
    BMR: "BMR@2026",
    BSLT: "BSLT@2026",
    BMAM: "BMAM@2026",
    BBSB: "BBSB@2026",
    BCYT: "BCYT@2026",
    BOPT: "BOPT@2026"
};
const squads = {
  BPHARM: [
    "Isaac Soyekwo",
    "Ebenezer Wamezaya",
    "Joel Nuwamanya",
    "Nagitta Resty",
    "Kabuye John Joash",
    "Musinguzi Peter",
    "Serunkuuma Tariq",
      "Goodness Man",
      "Joel",
      "Magezi",
      "Asiimwe Henry"
  ],

  BDS: [
    "Augustine Maximillian",
    "Phoebe Treasure",
    "Araphat Chemical",
    "Busuulwa Asraph",
    "Mondo Daniel",
    "Mungudit Moses",
    "Ojula Emmanuel",
      "Ryan Gift",
      "Kikaire Noah",
      "Collins Adams",
      "Mungudit Moses"
  ],

  BNUR: [
    "Deng Ezekiel",
    "Agaba Vincent",
    "Mutyaba Moses",
    "Gideon Cherop",
    "Gideon Musika",
      "Sharon Newton",
      "The Sadat"
  ],

  BMR: [
    "Odeke Andrew",
    "Koxy Acram",
    "Lionel Cassey"
  ],

  BSLT: [
    "Lucky Godwin",
    "Lutaaya Kevin"
  ],

  BMAM: [
    "Abhinava Raval",
    "Shon Uncle",
    "Gilbert Ayesigamukama",
    "Collins Abaasa", 
      "Cassey Breezy",
      "Sheila Rhoda",
      "Vaibhava Vignesh"
  ],

  BBSB: [
    "Allan Odoch",
    "Wejuli Jeremiah",
    "Andres Kenan",
    "Opset Emma",
    "Shakur 2Pac"
  ],

  BCYT: [
    "Martin Magandaazi",
    "Onzima Alex",
    "Kasalirwe Derrick"
  ],

  BOPT: [
    "Machar Bol",
    "Eluru Chris",
    "Ndagije Christine"
  ]
};
const playerTeams = {

    "Isaac Soyekwo": "BPHARM",
    "Ebenezer Wamezaya": "BPHARM",
    "Joel Nuwamanya": "BPHARM",
    "Nagitta Resty": "BPHARM",

    "Phoebe Treasure": "BDS",

    "Deng Ezekiel": "BNUR",
    "Agaba Vincent": "BNUR",

    "Lucky Godwin": "BSLT",

    "Abhinava Raval": "BMAM",
    "Shon Uncle": "BMAM",
    "Gilbert Ayesigamukama": "BMAM",
    "Collins Abaasa": "BMAM",
"Cassey Breezy":"BMAM",
    "Odeke Andrew": "BMR",

    "Eluru Chris": "BOPT",

    "Onzima Alex": "BCYT",
    "Kasalirwe Derrick": "BCYT"
    "Asiimwe Henry": "BPHARM",
"Allan Odoch": "BBSB",
"Wejuli Jeremiah": "BBSB",
};
function signPlayer(playerName, fee, position, buttonId){
if (!transferWindowOpen) {
    alert("The transfer window is CLOSED.");
    return;
}
    if(!loggedIn){
    alert("Please log in as a manager first.");
    return;
}

if(loggedInClub !== document.getElementById("clubSelect").value){
    alert("You can only manage your own club.");
    return;
}



if(budget >= fee){

budget = budget - fee;

updateDashboard();
let team = document.getElementById("team-list");

let player = document.createElement("li");

player.textContent = playerName + " | " + position + " ✅ Signed";

team.appendChild(player);

squadCount = squadCount + 1;

document.getElementById("managerSquad").textContent = squadCount;
document.getElementById("managerTransfers").textContent = squadCount;let button = document.getElementById(buttonId);

button.textContent = "✅ Signed";

button.disabled = true;

document.getElementById("managerBudget").textContent = budget;
// Move player between squads

let newClub = document.getElementById("clubSelect").value;
  if (newClub === "") {
    alert("Please select your club first.");
    return;
  }
let oldClub = playerTeams[playerName];
console.log(playerName, oldClub);
if (newClub === oldClub) {
    alert("❌ Transfer Rejected!\n\n" +
      playerName +
      " is already a " +
      oldClub +
      " player.");
    return;
}
    if(newClub !== ""){

let oldClub = playerTeams[playerName];

let index = squads[oldClub].indexOf(playerName);

if(index !== -1){

squads[oldClub].splice(index, 1);

}

squads[newClub].push(playerName);

playerTeams[playerName] = newClub;
        showSquad();
let history = document.getElementById("transferHistory");

if (history.firstElementChild &&
    history.firstElementChild.textContent === "No transfers yet.") {
    history.innerHTML = "";
}

let transfer = document.createElement("li");

transfer.textContent =
playerName + " : " + oldClub + " ➜ " + newClub;

history.prepend(transfer);
  let news = document.getElementById("transferNews");

if (news.innerText === "No transfer news yet.") {
    news.innerHTML = "";
}

let headline = document.createElement("p");

headline.innerHTML =
"🚨 <strong>BREAKING:</strong> " +
playerName +
" joins <strong>" +
newClub +
"</strong> from " +
oldClub +
" for <strong>UGX " +
fee.toLocaleString() +
"</strong>.";

news.prepend(headline);
alert(playerName + " transferred to " + newClub);

}

}

else{

alert("Not enough budget");

}

}
function viewProfile(name, course, year, position, rating, fee, photo){

document.getElementById("profileModal").style.display="block";
document.getElementById("playerPhoto").src = photo;
document.getElementById("playerName").textContent=name;

document.getElementById("playerCourse").textContent=course;

document.getElementById("playerYear").textContent=year;

document.getElementById("playerPosition").textContent=position;

document.getElementById("playerRating").textContent=rating;

document.getElementById("playerFee").textContent=fee;

}

function closeProfile(){

document.getElementById("profileModal").style.display="none";

}
function showSquad() {

    const course = document.getElementById("squadSelect").value;
    const squadList = document.getElementById("squadList");

    if (course === "") {
        squadList.innerHTML = "";
        return;
    }

    let html = `
    <div class="squad-box">
        <h3>${course} Squad</h3>
        <p>Total Players: ${squads[course].length}</p>
        <div class="squad-players">
    `;

    squads[course].forEach(function(player) {

        html += `
        <div class="squad-player">
            👤 ${player}
        </div>
        `;

    });

    html += `
        </div>
    </div>
    `;

    squadList.innerHTML = html;
}
function updateDashboard(){

    let club = document.getElementById("clubSelect").value;

    if(club==""){
        document.querySelector("#managerDashboard h3").textContent="No Club Selected";
        return;
    }

    document.querySelector("#managerDashboard h3").textContent =
    club + " Manager Dashboard";
document.getElementById("managerClub").textContent = club;
    document.getElementById("managerBudget").textContent = budget;

    document.getElementById("managerTransfers").textContent = squadCount;

    document.getElementById("managerSquad").textContent =
    squads[club].length;

    document.getElementById("managerWindow").textContent =
    transferWindowOpen ? "🟢 OPEN" : "🔴 CLOSED";

}
function toggleWindow() {

    transferWindowOpen = !transferWindowOpen;

    let status = document.getElementById("windowStatus");

    if (transferWindowOpen) {
        status.innerHTML = "🟢 OPEN";
        status.style.color = "green";
    } else {
        status.innerHTML = "🔴 CLOSED";
        status.style.color = "red";
    }

      }
function updateCountdown() {

    const now = new Date();

    const difference = deadline - now;

    if (difference <= 0) {

        transferWindowOpen = false;

        document.getElementById("windowStatus").innerHTML =
        "🔴 TRANSFER WINDOW CLOSED";

        document.getElementById("windowStatus").style.color = "red";

        document.getElementById("countdown").innerHTML =
        "Transfer deadline has passed.";

        return;
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
    "⏳ " +
    days + " Days " +
    hours + " Hours " +
    minutes + " Minutes " +
    seconds + " Seconds Remaining";
}
window.onload = function() {

    updateCountdown();

    setInterval(updateCountdown, 1000);
let savedLogin = localStorage.getItem("loggedIn");
let savedClub = localStorage.getItem("loggedInClub");

if(savedLogin === "true"){

    loggedIn = true;
    loggedInClub = savedClub;

    document.getElementById("loginStatus").innerHTML =
    "✅ Logged in as " + savedClub + " Manager";

}
};
function loginManager(){

    let club = document.getElementById("clubSelect").value;
    let password = document.getElementById("managerPassword").value;

    if(club==""){
        alert("Please select your club first.");
        return;
    }

    if(password === managerPasswords[club]){

        loggedIn = true;
        loggedInClub = club;
localStorage.setItem("loggedIn", "true");
localStorage.setItem("loggedInClub", club);
        document.getElementById("loginStatus").innerHTML =
        "✅ Logged in as " + club + " Manager";

        alert("Login successful!");

    }else{

        alert("Incorrect password.");

    }

}
