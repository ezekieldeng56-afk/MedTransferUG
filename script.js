let squadCount = 0;
let budget = 100000;
let transferWindowOpen = true;
const squads = {
  BPHARM: [
    "Isaac Soyekwo",
    "Ebenezer Wamezaya",
    "Joel Nuwamanya",
    "Nagitta Resty",
    "Kabuye John Joash",
    "Musinguzi Peter",
    "Serunkuuma Tariq"
  ],

  BDS: [
    "Augustine Maximillian",
    "Phoebe Treasure",
    "Araphat Chemical",
    "Busuulwa Asraph",
    "Mondo Daniel",
    "Mungudit Moses",
    "Ojula Emmanuel"
  ],

  BNUR: [
    "Deng Ezekiel",
    "Agaba Vincent",
    "Mutyaba Moses",
    "Gideon Cherop",
    "Gideon Musika"
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
    "Collins Abaasa"
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

    "Odeke Andrew": "BMR",

    "Eluru Chris": "BOPT",

    "Onzima Alex": "BCYT",
    "Kasalirwe Derrick": "BCYT"
};
function signPlayer(playerName, fee, position, buttonId){
if (!transferWindowOpen) {
    alert("The transfer window is CLOSED.");
    return;
}
alert("Button working");


if(budget >= fee){

budget = budget - fee;


let team = document.getElementById("team-list");

let player = document.createElement("li");

player.textContent = playerName + " | " + position + " ✅ Signed";

team.appendChild(player);


squadCount = squadCount + 1;

document.getElementById("squad-size").textContent = squadCount;let button = document.getElementById(buttonId);

button.textContent = "✅ Signed";

button.disabled = true;

document.getElementById("budget").textContent = budget;
// Move player between squads

let newClub = document.getElementById("clubSelect").value;
  if (newClub === "") {
    alert("Please select your club first.");
    return;
  }
let oldClub = playerTeams[playerName];

if (newClub === oldClub) {
    alert("❌ Transfer Rejected!\n\n" +
      playerName +
      " is already a " +
      oldClub +
      " player.");
    return;
}
if(newClub !== "" && playerTeams[playerName]){

let oldClub = playerTeams[playerName];

let index = squads[oldClub].indexOf(playerName);

if(index !== -1){

squads[oldClub].splice(index, 1);

}

squads[newClub].push(playerName);

playerTeams[playerName] = newClub;
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

headline.textContent =
"🚨 BREAKING: " + playerName +
" has completed a move from " +
oldClub + " to " + newClub +
" for UGX " + fee;

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
