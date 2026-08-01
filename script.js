let squadCount = 0;
let budget = 100000;

function signPlayer(playerName, fee, position, buttonId){

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