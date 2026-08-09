/* =====================================================
   MEDTRANSFER UG
   MAIN JAVASCRIPT
===================================================== */


/* ==========================
   BASIC SETTINGS
========================== */

const STARTING_BUDGET = 40000;
const MAX_SIGNINGS = 2;

const adminPassword = "MedTransfer2027";

let transferWindowOpen = true;
let loggedIn = false;
let loggedInClub = "";
let adminLoggedIn = false;


/* ==========================
   MANAGER PASSWORDS
========================== */

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


/* ==========================
   ORIGINAL COURSE SQUADS
========================== */

const originalSquads = {

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


/* ==========================
   ORIGINAL PLAYER CLUBS
========================== */

const originalPlayerTeams = {

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
    "Cassey Breezy": "BMAM",

    "Odeke Andrew": "BMR",

    "Eluru Chris": "BOPT",

    "Onzima Alex": "BCYT",
    "Kasalirwe Derrick": "BCYT",

    "Asiimwe Henry": "BPHARM",

    "Allan Odoch": "BBSB",
    "Wejuli Jeremiah": "BBSB"

};


/* ==========================
   ACTIVE DATA
========================== */

let squads = JSON.parse(JSON.stringify(originalSquads));

let playerTeams = JSON.parse(
    JSON.stringify(originalPlayerTeams)
);


/* Budget for each manager */

let clubBudgets = {

    BPHARM: STARTING_BUDGET,
    BDS: STARTING_BUDGET,
    BNUR: STARTING_BUDGET,
    BMR: STARTING_BUDGET,
    BSLT: STARTING_BUDGET,
    BMAM: STARTING_BUDGET,
    BBSB: STARTING_BUDGET,
    BCYT: STARTING_BUDGET,
    BOPT: STARTING_BUDGET

};


/* Number of players signed by each manager */

let clubSignings = {

    BPHARM: 0,
    BDS: 0,
    BNUR: 0,
    BMR: 0,
    BSLT: 0,
    BMAM: 0,
    BBSB: 0,
    BCYT: 0,
    BOPT: 0

};


/* Players that have already been transferred */

let signedPlayers = {};


/* Transfer news */

let transferNewsData = [];


/* Transfer deadline */

let deadline;


/* ==========================
   SAVE DATA
========================== */

function saveData(){

    localStorage.setItem(
        "clubBudgets",
        JSON.stringify(clubBudgets)
    );

    localStorage.setItem(
        "clubSignings",
        JSON.stringify(clubSignings)
    );

    localStorage.setItem(
        "squads",
        JSON.stringify(squads)
    );

    localStorage.setItem(
        "playerTeams",
        JSON.stringify(playerTeams)
    );

    localStorage.setItem(
        "signedPlayers",
        JSON.stringify(signedPlayers)
    );

    localStorage.setItem(
        "transferNewsData",
        JSON.stringify(transferNewsData)
    );

    localStorage.setItem(
        "transferWindowOpen",
        transferWindowOpen
    );

    if(deadline){

        localStorage.setItem(
            "transferDeadline",
            deadline.getTime()
        );

    }

}


/* ==========================
   LOAD DATA
========================== */

function loadData(){

    let savedBudgets =
        localStorage.getItem("clubBudgets");

    let savedSignings =
        localStorage.getItem("clubSignings");

    let savedSquads =
        localStorage.getItem("squads");

    let savedPlayerTeams =
        localStorage.getItem("playerTeams");

    let savedSignedPlayers =
        localStorage.getItem("signedPlayers");

    let savedNews =
        localStorage.getItem("transferNewsData");

    let savedWindow =
        localStorage.getItem("transferWindowOpen");

    let savedDeadline =
        localStorage.getItem("transferDeadline");


    if(savedBudgets){

        clubBudgets =
            JSON.parse(savedBudgets);

    }


    if(savedSignings){

        clubSignings =
            JSON.parse(savedSignings);

    }


    if(savedSquads){

        squads =
            JSON.parse(savedSquads);

    }


    if(savedPlayerTeams){

        playerTeams =
            JSON.parse(savedPlayerTeams);

    }


    if(savedSignedPlayers){

        signedPlayers =
            JSON.parse(savedSignedPlayers);

    }


    if(savedNews){

        transferNewsData =
            JSON.parse(savedNews);

    }


    if(savedWindow !== null){

        transferWindowOpen =
            savedWindow === "true";

    }


    if(savedDeadline){

        deadline =
            new Date(Number(savedDeadline));

    }else{

        deadline = new Date();

        deadline.setDate(
            deadline.getDate() + 14
        );

        localStorage.setItem(
            "transferDeadline",
            deadline.getTime()
        );

    }

}


/* ==========================
   RENDER TRANSFER NEWS
========================== */

function renderTransferNews(){

    const news =
        document.getElementById("transferNews");

    if(!news){
        return;
    }


    if(transferNewsData.length === 0){

        news.innerHTML =
            "<p>No transfer news yet.</p>";

        return;

    }


    news.innerHTML = "";


    transferNewsData.forEach(function(item){

        let headline =
            document.createElement("p");

        headline.innerHTML =
            "🚨 <strong>BREAKING:</strong> " +
            item.player +
            " joins <strong>" +
            item.newClub +
            "</strong> from " +
            item.oldClub +
            " for <strong>UGX " +
            Number(item.fee).toLocaleString() +
            "</strong>.";

        news.appendChild(headline);

    });

}


/* ==========================
   RENDER SIGNED BUTTONS
========================== */

function restoreSignedButtons(){

    Object.keys(signedPlayers).forEach(
        function(playerName){

            let buttonId =
                signedPlayers[playerName].buttonId;

            let button =
                document.getElementById(buttonId);

            if(button){

                button.disabled = true;

                button.textContent =
                    "✅ Signed";

            }

        }
    );

}


/* ==========================
   UPDATE MANAGER DASHBOARD
========================== */

function updateDashboard(){

    let club =
        document.getElementById("clubSelect").value;


    if(club === ""){

        document.querySelector(
            "#managerDashboard h3"
        ).textContent =
            "No Club Selected";

        return;

    }


    document.querySelector(
        "#managerDashboard h3"
    ).textContent =
        club + " Manager Dashboard";


    document.getElementById(
        "managerClub"
    ).textContent = club;


    document.getElementById(
        "managerBudget"
    ).textContent =
        clubBudgets[club];


    document.getElementById(
        "managerTransfers"
    ).textContent =
        clubSignings[club];


    document.getElementById(
        "managerSquad"
    ).textContent =
        squads[club].length;


    document.getElementById(
        "managerWindow"
    ).textContent =
        transferWindowOpen
        ? "🟢 OPEN"
        : "🔴 CLOSED";


    renderMyTeam();

}


/* ==========================
   RENDER MY TEAM
========================== */

function renderMyTeam(){

    const team =
        document.getElementById("team-list");

    if(!team){
        return;
    }


    team.innerHTML = "";


    if(loggedInClub === ""){

        return;

    }


    Object.keys(signedPlayers).forEach(
        function(playerName){

            let transfer =
                signedPlayers[playerName];


            if(transfer.newClub === loggedInClub){

                let player =
                    document.createElement("li");

                player.textContent =
                    playerName +
                    " | " +
                    transfer.position +
                    " ✅ Signed";

                team.appendChild(player);

            }

        }
    );

}


/* ==========================
   SIGN PLAYER
========================== */

function signPlayer(
    playerName,
    fee,
    position,
    buttonId
){

    if(!transferWindowOpen){

        alert(
            "The transfer window is CLOSED."
        );

        return;

    }


    if(!loggedIn){

        alert(
            "Please log in as a manager first."
        );

        return;

    }


    let selectedClub =
        document.getElementById(
            "clubSelect"
        ).value;


    if(selectedClub === ""){

        alert(
            "Please select your club first."
        );

        return;

    }


    if(loggedInClub !== selectedClub){

        alert(
            "You can only manage your own club."
        );

        return;

    }


    /* Maximum 2 players per manager */

    if(clubSignings[selectedClub] >= MAX_SIGNINGS){

        alert(
            "Maximum of 2 signings allowed for " +
            selectedClub +
            " Manager."
        );

        return;

    }


    /* Player already transferred */

    if(signedPlayers[playerName]){

        alert(
            playerName +
            " has already been signed by " +
            signedPlayers[playerName].newClub +
            "."
        );

        return;

    }


    /* Cannot sign your own player */

    let oldClub =
        playerTeams[playerName];


    if(oldClub === selectedClub){

        alert(
            "❌ Transfer Rejected!\n\n" +
            playerName +
            " is already a " +
            oldClub +
            " player."
        );

        return;

    }


    /* Check budget */

    if(clubBudgets[selectedClub] < fee){

        alert(
            "Not enough budget."
        );

        return;

    }


    /* Deduct fee */

    clubBudgets[selectedClub] =
        clubBudgets[selectedClub] - fee;


    /* Increase manager signings */

    clubSignings[selectedClub] =
        clubSignings[selectedClub] + 1;


    /* Remove player from old club */

    if(
        squads[oldClub] &&
        squads[oldClub].includes(playerName)
    ){

        let index =
            squads[oldClub].indexOf(
                playerName
            );

        if(index !== -1){

            squads[oldClub].splice(
                index,
                1
            );

        }

    }


    /* Add player to new club */

    if(!squads[selectedClub]){

        squads[selectedClub] = [];

    }


    squads[selectedClub].push(
        playerName
    );


    /* Update player club */

    playerTeams[playerName] =
        selectedClub;


    /* Save transfer */

    signedPlayers[playerName] = {

        oldClub: oldClub,

        newClub: selectedClub,

        fee: fee,

        position: position,

        buttonId: buttonId

    };


    /* Add transfer news */

    transferNewsData.unshift({

        player: playerName,

        oldClub: oldClub,

        newClub: selectedClub,

        fee: fee

    });


    /* Disable button */

    let button =
        document.getElementById(buttonId);


    if(button){

        button.textContent =
            "✅ Signed";

        button.disabled = true;

    }


    /* Update page */

    updateDashboard();

    showSquad();

    renderTransferNews();


    /* SAVE EVERYTHING */

    saveData();


    alert(
        playerName +
        " transferred to " +
        selectedClub
    );

}


/* ==========================
   VIEW PLAYER PROFILE
========================== */

function viewProfile(
    name,
    course,
    year,
    position,
    rating,
    fee,
    photo
){

    document.getElementById(
        "profileModal"
    ).style.display = "block";


    document.getElementById(
        "playerPhoto"
    ).src = photo;


    document.getElementById(
        "playerName"
    ).textContent = name;


    document.getElementById(
        "playerCourse"
    ).textContent = course;


    document.getElementById(
        "playerYear"
    ).textContent = year;


    document.getElementById(
        "playerPosition"
    ).textContent = position;


    document.getElementById(
        "playerRating"
    ).textContent = rating;


    document.getElementById(
        "playerFee"
    ).textContent = fee;

}


/* ==========================
   CLOSE PROFILE
========================== */

function closeProfile(){

    document.getElementById(
        "profileModal"
    ).style.display = "none";

}


/* ==========================
   SHOW COURSE SQUAD
========================== */

function showSquad(){

    const course =
        document.getElementById(
            "squadSelect"
        ).value;


    const squadList =
        document.getElementById(
            "squadList"
        );


    if(course === ""){

        squadList.innerHTML = "";

        return;

    }


    let html = `
        <div class="squad-box">

        <h3>${course} Squad</h3>

        <p>
        Total Players:
        ${squads[course].length}
        </p>

        <div class="squad-players">
    `;


    squads[course].forEach(
        function(player){

            html += `
                <div class="squad-player">
                    👤 ${player}
                </div>
            `;

        }
    );


    html += `
        </div>
        </div>
    `;


    squadList.innerHTML =
        html;

}


/* ==========================
   MANAGER LOGIN
========================== */

function loginManager(){

    let club =
        document.getElementById(
            "clubSelect"
        ).value;


    let password =
        document.getElementById(
            "managerPassword"
        ).value;


    if(club === ""){

        alert(
            "Please select your club first."
        );

        return;

    }


    if(
        password ===
        managerPasswords[club]
    ){

        loggedIn = true;

        loggedInClub = club;


        localStorage.setItem(
            "loggedIn",
            "true"
        );


        localStorage.setItem(
            "loggedInClub",
            club
        );


        document.getElementById(
            "loginStatus"
        ).innerHTML =
            "✅ Logged in as " +
            club +
            " Manager";


        updateDashboard();


        alert(
            "Login successful!"
        );


    }else{

        alert(
            "Incorrect password."
        );

    }

}


/* ==========================
   ADMIN LOGIN
========================== */

function loginAdmin(){

    let password =
        document.getElementById(
            "adminPassword"
        ).value;


    if(password === adminPassword){

        adminLoggedIn = true;


        document.getElementById(
            "adminStatus"
        ).innerHTML =
            "👑 Admin Logged In";


        let resetButton =
            document.getElementById(
                "adminResetBtn"
            );


        if(resetButton){

            resetButton.style.display =
                "inline-block";

        }


        alert(
            "Welcome Admin!"
        );


    }else{

        alert(
            "Incorrect Admin Password."
        );

    }

}


/* ==========================
   RESET MARKET
========================== */

function resetMarket(){

    let password =
        prompt(
            "Enter Admin Password"
        );


    if(password !== adminPassword){

        alert(
            "Wrong Admin Password!"
        );

        return;

    }


    localStorage.clear();


    alert(
        "✅ Transfer Market Reset Successfully!"
    );


    location.reload();

}


/* ==========================
   TRANSFER WINDOW
========================== */

function toggleWindow(){

    transferWindowOpen =
        !transferWindowOpen;


    let status =
        document.getElementById(
            "windowStatus"
        );


    if(transferWindowOpen){

        status.innerHTML =
            "🟢 TRANSFER WINDOW OPEN";

        status.style.color =
            "green";

    }else{

        status.innerHTML =
            "🔴 TRANSFER WINDOW CLOSED";

        status.style.color =
            "red";

    }


    saveData();

}


/* ==========================
   COUNTDOWN
========================== */

function updateCountdown(){

    const now =
        new Date();


    const difference =
        deadline - now;


    if(difference <= 0){

        transferWindowOpen =
            false;


        document.getElementById(
            "windowStatus"
        ).innerHTML =
            "🔴 TRANSFER WINDOW CLOSED";


        document.getElementById(
            "countdown"
        ).innerHTML =
            "Transfer deadline has passed.";


        saveData();

        return;

    }


    let days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    let hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    let minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    let seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById(
        "countdown"
    ).innerHTML =

        "⏳ " +
        days +
        " Days " +
        hours +
        " Hours " +
        minutes +
        " Minutes " +
        seconds +
        " Seconds Remaining";

}


/* ==========================
   PAGE START
========================== */

window.onload = function(){

    loadData();


    let savedLogin =
        localStorage.getItem(
            "loggedIn"
        );


    let savedClub =
        localStorage.getItem(
            "loggedInClub"
        );


    if(savedLogin === "true"){

        loggedIn = true;

        loggedInClub =
            savedClub || "";


        let loginStatus =
            document.getElementById(
                "loginStatus"
            );


        if(loginStatus){

            loginStatus.innerHTML =
                "✅ Logged in as " +
                loggedInClub +
                " Manager";

        }

    }


    updateCountdown();


    setInt
