let squadCount = 0;
let budget = 40000;
let signedButtons = [];
let managerSignings = {};
let signedPlayers = [];
let transferWindowOpen = true;

const deadline = new Date();
deadline.setDate(deadline.getDate() + 14);

let adminLoggedIn = false;
const adminPassword = "MedTransfer2027";

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


/* =========================
   COURSE SQUADS
========================= */

let squads = {

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


/* =========================
   ORIGINAL PLAYER CLUBS
========================= */

let playerTeams = {

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


/* =========================
   SIGN PLAYER
========================= */

function signPlayer(playerName, fee, position, buttonId) {

    if (!transferWindowOpen) {
        alert("The transfer window is CLOSED.");
        return;
    }

    if (!loggedIn) {
        alert("Please log in as a manager first.");
        return;
    }

    let newClub = document.getElementById("clubSelect").value;

    if (newClub === "") {
        alert("Please select your club first.");
        return;
    }

    if (loggedInClub !== newClub) {
        alert("You can only manage your own club.");
        return;
    }

    /* Maximum 2 players */
    let currentClub = document.getElementById("clubSelect").value;

if (!managerSignings[currentClub]) {
    managerSignings[currentClub] = 0;
}

if (managerSignings[currentClub] >= 2) {
    alert("Maximum of 2 signings allowed for " + currentClub + " Manager.");
    return;
}

    /* Prevent same player being signed twice */
    if (signedPlayers.includes(playerName)) {
        alert(
            "❌ Transfer Rejected!\n\n" +
            playerName +
            " has already been signed."
        );
        return;
    }

    /* Check budget */
    if (budget < fee) {
        alert("Not enough budget.");
        return;
    }

    let oldClub = playerTeams[playerName];

    if (!oldClub) {
        alert("Transfer error: player's original club was not found.");
        return;
    }

    /* Prevent signing a player from your own club */
    if (newClub === oldClub) {
        alert(
            "❌ Transfer Rejected!\n\n" +
            playerName +
            " is already a " +
            oldClub +
            " player."
        );
        return;
    }


    /* =========================
       PROCESS TRANSFER
    ========================= */

    budget = budget - fee;
    squadCount = squadCount + 1;
    managerSignings[currentClub] = managerSignings[currentClub] + 1;

    /* Add to My Team */
    let team = document.getElementById("team-list");

    let player = document.createElement("li");

    player.textContent =
        playerName + " | " + position + " ✅ Signed";

    team.appendChild(player);


    /* Disable button */
    let button = document.getElementById(buttonId);

    if (button) {

        button.textContent = "✅ Signed";
        button.disabled = true;

    }

    /* Remember signed button */
    if (!signedButtons.includes(buttonId)) {

        signedButtons.push(buttonId);

    }


    /* Remember signed player */
    if (!signedPlayers.includes(playerName)) {

        signedPlayers.push(playerName);

    }


    /* =========================
       MOVE PLAYER BETWEEN SQUADS
    ========================= */

    let index = squads[oldClub].indexOf(playerName);

    if (index !== -1) {

        squads[oldClub].splice(index, 1);

    }

    if (!squads[newClub].includes(playerName)) {

        squads[newClub].push(playerName);

    }

    playerTeams[playerName] = newClub;


    /* =========================
       TRANSFER NEWS
    ========================= */

    let news = document.getElementById("transferNews");

    if (
        news.innerText.includes("No transfer news yet")
    ) {

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


    /* =========================
       UPDATE DASHBOARD
    ========================= */

    updateDashboard();

    showSquad();


    /* =========================
       SAVE EVERYTHING
    ========================= */

    saveData();


    alert(
        playerName +
        " transferred to " +
        newClub
    );
}


/* =========================
   VIEW PROFILE
========================= */

function viewProfile(
    name,
    course,
    year,
    position,
    rating,
    fee,
    photo
) {

    document.getElementById("profileModal").style.display = "block";

    document.getElementById("playerPhoto").src = photo;

    document.getElementById("playerName").textContent = name;

    document.getElementById("playerCourse").textContent = course;

    document.getElementById("playerYear").textContent = year;

    document.getElementById("playerPosition").textContent = position;

    document.getElementById("playerRating").textContent = rating;

    document.getElementById("playerFee").textContent = fee;
}


function closeProfile() {

    document.getElementById("profileModal").style.display = "none";

}


/* =========================
   SHOW COURSE SQUAD
========================= */

function showSquad() {

    const course =
        document.getElementById("squadSelect").value;

    const squadList =
        document.getElementById("squadList");

    if (course === "") {

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


/* =========================
   MANAGER DASHBOARD
========================= */

function updateDashboard() {

    let club =
        document.getElementById("clubSelect").value;

    if (club === "") {

        document.querySelector(
            "#managerDashboard h3"
        ).textContent = "No Club Selected";

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
    ).textContent = budget;


    document.getElementById(
        "managerTransfers"
    ).textContent = squadCount;


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
}


/* =========================
   TRANSFER WINDOW
========================= */

function toggleWindow() {

    transferWindowOpen =
        !transferWindowOpen;

    let status =
        document.getElementById("windowStatus");


    if (transferWindowOpen) {

        status.innerHTML =
            "🟢 TRANSFER WINDOW OPEN";

        status.style.color = "green";

    } else {

        status.innerHTML =
            "🔴 TRANSFER WINDOW CLOSED";

        status.style.color = "red";
    }


    updateDashboard();

}


/* =========================
   COUNTDOWN
========================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        deadline - now;


    if (difference <= 0) {

        transferWindowOpen = false;

        document.getElementById(
            "windowStatus"
        ).innerHTML =
            "🔴 TRANSFER WINDOW CLOSED";


        document.getElementById(
            "windowStatus"
        ).style.color = "red";


        document.getElementById(
            "countdown"
        ).innerHTML =
            "Transfer deadline has passed.";

        updateDashboard();

        return;
    }


    let days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    let hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    let minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    let seconds =
        Math.floor(
            (difference %
                (1000 * 60)) /
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


/* =========================
   MANAGER LOGIN
========================= */

function loginManager() {

    let club =
        document.getElementById(
            "clubSelect"
        ).value;


    let password =
        document.getElementById(
            "managerPassword"
        ).value;


    if (club === "") {

        alert(
            "Please select your club first."
        );

        return;
    }


    if (
        password ===
        managerPasswords[club]
    ) {

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


        alert("Login successful!");


    } else {

        alert("Incorrect password.");

    }
}


/* =========================
   ADMIN LOGIN
========================= */

function loginAdmin() {

    let password =
        document.getElementById(
            "adminPassword"
        ).value;


    if (password === adminPassword) {

        adminLoggedIn = true;


        document.getElementById(
            "adminStatus"
        ).innerHTML =
            "👑 Admin Logged In";


        document.getElementById(
            "adminResetBtn"
        ).style.display =
            "inline-block";


        alert("Welcome Admin!");


    } else {

        alert(
            "Incorrect Admin Password."
        );

    }
}


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        "budget",
        budget
    );


    localStorage.setItem(
        "squadCount",
        squadCount
    );


    localStorage.setItem(
        "signedButtons",
        JSON.stringify(
            signedButtons
        )
    );


    localStorage.setItem(
        "signedPlayers",
        JSON.stringify(
            signedPlayers
        )
    );


    localStorage.setItem(
        "playerTeams",
        JSON.stringify(
            playerTeams
        )
    );


    localStorage.setItem(
        "squads",
        JSON.stringify(
            squads
        )
    );


    let teamList =
        document.getElementById(
            "team-list"
        );

    if (teamList) {

        localStorage.setItem(
            "teamList",
            teamList.innerHTML
        );

    }


    let transferNews =
        document.getElementById(
            "transferNews"
        );

    if (transferNews) {

        localStorage.setItem(
            "transferNews",
            transferNews.innerHTML
        );
localStorage.setItem(
    "managerSignings",
    JSON.stringify(managerSignings)
);
    }
}


/* =========================
   LOAD DATA
========================= */

function loadData() {

    let savedBudget =
        localStorage.getItem("budget");


    let savedSquadCount =
        localStorage.getItem("squadCount");


    let savedSignedButtons =
        localStorage.getItem(
            "signedButtons"
        );


    let savedSignedPlayers =
        localStorage.getItem(
            "signedPlayers"
        );


    let savedPlayerTeams =
        localStorage.getItem(
            "playerTeams"
        );


    let savedSquads =
        localStorage.getItem(
            "squads"
        );


    let savedTeamList =
        localStorage.getItem(
            "teamList"
        );


    let savedTransferNews =
        localStorage.getItem(
            "transferNews"
        );


    /* Budget */

    if (savedBudget !== null) {

        budget =
            Number(savedBudget);

    }


    /* Squad count */

    if (savedSquadCount !== null) {

        squadCount =
            Number(savedSquadCount);

    }


    /* Signed buttons */

    if (savedSignedButtons !== null) {

        try {

            signedButtons =
                JSON.parse(
                    savedSignedButtons
                );

        } catch (error) {

            signedButtons = [];

        }

    }


    /* Signed players */

    if (savedSignedPlayers !== null) {

        try {

            signedPlayers =
                JSON.parse(
                    savedSignedPlayers
                );

        } catch (error) {

            signedPlayers = [];

        }

    }


    /* Player teams */

    if (savedPlayerTeams !== null) {

        try {

            playerTeams =
                JSON.parse(
                    savedPlayerTeams
                );

        } catch (error) {

            console.log(
                "Could not load player teams."
            );

        }

    }


    /* Squads */

    if (savedSquads !== null) {

        try {

            squads =
                JSON.parse(
                    savedSquads
                );

        } catch (error) {

            console.log(
                "Could not load squads."
            );

        }

    }


    /* My Team */

    if (savedTeamList !== null) {

        let teamList =
            document.getElementById(
                "team-list"
            );

        if (teamList) {

            teamList.innerHTML =
                savedTeamList;

        }

    }


    /* Transfer News */

    if (savedTransferNews !== null) {

        let transferNews =
            document.getElementById(
                "transferNews"
            );

        if (transferNews) {

            transferNews.innerHTML =
                savedTransferNews;

        }
let savedManagerSignings =
    localStorage.getItem("managerSignings");

if (savedManagerSignings !== null) {
    managerSignings = JSON.parse(savedManagerSignings);
}
    }


    /* Restore signed buttons */

    signedButtons.forEach(
        function(id) {

            let button =
                document.getElementById(id);

            if (button) {

                button.disabled = true;

                button.textContent =
                    "✅ Signed";

            }

        }
    );


    /* Update dashboard */

    if (
        document.getElementById(
            "managerBudget"
        )
    ) {

        document.getElementById(
            "managerBudget"
        ).textContent =
            budget;

    }


    if (
        document.getElementById(
            "managerSquad"
        )
    ) {

        document.getElementById(
            "managerSquad"
        ).textContent =
            squadCount;

    }


    if (
        document.getElementById(
            "managerTransfers"
        )
    ) {

        document.getElementById(
            "managerTransfers"
        ).textContent =
            squadCount;

    }
}


/* =========================
   RESET MARKET
========================= */

function resetMarket() {

    let password =
        prompt(
            "Enter Admin Password"
        );


    if (password !== adminPassword) {

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


/* =========================
   PAGE STARTUP
========================= */

window.onload = function() {

    /* Load saved market data first */
    loadData();


    /* Countdown */
    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* Restore manager login */
    let savedLogin =
        localStorage.getItem(
            "loggedIn"
        );


    let savedClub =
        localStorage.getItem(
            "loggedInClub"
        );


    if (
        savedLogin === "true" &&
        savedClub
    ) {

        loggedIn = true;

        loggedInClub =
            savedClub;


        let loginStatus =
            document.getElementById(
                "loginStatus"
            );


        if (loginStatus) {

            loginStatus.innerHTML =
                "✅ Logged in as " +
                savedClub +
                " Manager";

        }


        let clubSelect =
            document.getElementById(
                "clubSelect"
            );


        if (clubSelect) {

            clubSelect.value =
                savedClub;

        }


        updateDashboard();

    }

};
