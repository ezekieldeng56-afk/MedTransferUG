/* ============================================
   SUPABASE CONNECTION
============================================ */

const SUPABASE_URL =
    "https://fmhvcjidqpeyywylsqzy.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_2QjZptN6qnDQs_N9I6aAvw_ncY2iD33";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

let cloudSyncReady = false;
let squadCount = 0;
let budget = 40000;
let signedButtons = [];
let signedPlayers = [];

let managerSignings = {};

let managerBudgets = {
  BPHARM: 40000,
  BDS: 40000,
  BNUR: 40000,
  BMR: 40000,
  BSLT: 40000,
  BMAM: 40000,
  BBSB: 40000,
  BCYT: 40000,
  BOPT: 40000,
};

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
  BOPT: "BOPT@2026",
};

/* ========================= COURSE SQUADS ========================= */

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
    "Asiimwe Henry",
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
    "Mungudit Moses",
  ],

  BNUR: [
    "Deng Ezekiel",
    "Agaba Vincent",
    "Mutyaba Moses",
    "Gideon Cherop",
    "Gideon Musika",
    "Sharon Newton",
    "The Sadat",
  ],

  BMR: ["Odeke Andrew", "Koxy Acram", "Lionel Cassey"],

  BSLT: ["Lucky Godwin", "Lutaaya Kevin"],

  BMAM: [
    "Abhinava Raval",
    "Shon Uncle",
    "Gilbert Ayesigamukama",
    "Collins Abaasa",
    "Cassey Breezy",
    "Sheila Rhoda",
    "Vaibhava Vignesh",
  ],

  BBSB: [
    "Allan Odoch",
    "Wejuli Jeremiah",
    "Andres Kenan",
    "Opset Emma",
    "Shakur 2Pac",
  ],

  BCYT: ["Martin Magandaazi", "Onzima Alex", "Kasalirwe Derrick"],

  BOPT: ["Machar Bol", "Eluru Chris", "Ndagije Christine"],
};

/* ========================= ORIGINAL PLAYER CLUBS ========================= */

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
  "Wejuli Jeremiah": "BBSB",
};

/* ========================= SIGN PLAYER ========================= */

async function signPlayer(playerName, fee, position, buttonId) {
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

  /* Maximum 2 players per manager */

  let currentClub = newClub;

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
      "\u274C Transfer Rejected!\n\n" + playerName + " has already been signed."
    );
    return;
  }

  /* Check manager budget */

  if (managerBudgets[currentClub] < fee) {
    alert("Not enough budget for " + currentClub + " Manager.");

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
      "\u274C Transfer Rejected!\n\n" +
        playerName +
        " is already a " +
        oldClub +
        " player."
    );
    return;
  }

  /* ========================= PROCESS TRANSFER ========================= */

  managerBudgets[currentClub] = managerBudgets[currentClub] - fee;

  managerSignings[currentClub] = managerSignings[currentClub] + 1;

  squadCount = squadCount + 1;

  /* Disable button */
  let button = document.getElementById(buttonId);

  if (button) {
    button.textContent = "\u2705 Signed";
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

  /* ========================= MOVE PLAYER BETWEEN SQUADS ========================= */

  let index = squads[oldClub].indexOf(playerName);

  if (index !== -1) {
    squads[oldClub].splice(index, 1);
  }

  if (!squads[newClub].includes(playerName)) {
    squads[newClub].push(playerName);
  }

  playerTeams[playerName] = newClub;

  /* ========================= TRANSFER NEWS ========================= */

  let news = document.getElementById("transferNews");

  if (news.innerText.includes("No transfer news yet")) {
    news.innerHTML = "";
  }

  let headline = document.createElement("p");

  headline.innerHTML =
    "\uD83D\uDEA8 <strong>BREAKING:</strong> " +
    playerName +
    " joins <strong>" +
    newClub +
    "</strong> from " +
    oldClub +
    " for <strong>UGX " +
    fee.toLocaleString() +
    "</strong>.";

  news.prepend(headline);

  /* ========================= UPDATE DASHBOARD ========================= */

  updateDashboard();

  showSquad();

  /* ========================= SAVE EVERYTHING ========================= */

  saveData();

await uploadMedTransferState();

await saveTransferNewsToCloud(
    playerName,
    oldClub,
    newClub,
    fee
);

alert(
    playerName +
    " transferred to " +
    newClub
);
}

/* ========================= VIEW PROFILE ========================= */

function viewProfile(name, course, year, position, rating, fee, photo) {
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

/* ========================= SHOW COURSE SQUAD ========================= */

function showSquad() {
  const course = document.getElementById("squadSelect").value;

  const squadList = document.getElementById("squadList");

  if (course === "") {
    squadList.innerHTML = "";

    return;
  }

  let html = ` <div class="squad-box"> <h3>${course} Squad</h3> <p> Total Players: ${squads[course].length} </p> <div class="squad-players"> `;

  squads[course].forEach(function (player) {
    html += ` <div class="squad-player"> ðŸ‘¤ ${player} </div> `;
  });

  html += ` </div> </div> `;

  squadList.innerHTML = html;
}

/* ========================= MANAGER DASHBOARD ========================= */

function updateDashboard() {
  let club = document.getElementById("clubSelect").value;

  if (club === "") {
    document.querySelector("#managerDashboard h3").textContent =
      "No Club Selected";

    return;
  }

  document.querySelector("#managerDashboard h3").textContent =
    club + " Manager Dashboard";

  document.getElementById("managerClub").textContent = club;

  document.getElementById("managerBudget").textContent = managerBudgets[club];

  document.getElementById("managerTransfers").textContent =
    managerSignings[club] || 0;

  document.getElementById("managerSquad").textContent = squads[club].length;

  document.getElementById("managerWindow").textContent = transferWindowOpen
    ? "\uD83D\uDFE2 OPEN"
    : "\uD83D\uDD34 CLOSED";
}

/* ========================= TRANSFER WINDOW ========================= */

function toggleWindow() {
  if (!adminLoggedIn) {
    alert("Only Admin can open or close the transfer window.");
    return;
  }
  transferWindowOpen = !transferWindowOpen;

  let status = document.getElementById("windowStatus");

  if (transferWindowOpen) {
    status.innerHTML = "\uD83D\uDFE2 TRANSFER WINDOW OPEN";

    status.style.color = "green";
  } else {
    status.innerHTML = "\uD83D\uDD34 TRANSFER WINDOW CLOSED";

    status.style.color = "red";
  }

  updateDashboard();
}

/* ========================= COUNTDOWN ========================= */

function updateCountdown() {
  const now = new Date();

  const difference = deadline - now;

  if (difference <= 0) {
    transferWindowOpen = false;

    document.getElementById("windowStatus").innerHTML =
      "\uD83D\uDD34 TRANSFER WINDOW CLOSED";

    document.getElementById("windowStatus").style.color = "red";

    document.getElementById("countdown").innerHTML =
      "Transfer deadline has passed.";

    updateDashboard();

    return;
  }

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));

  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    "⌛" +
    days +
    " Days " +
    hours +
    " Hours " +
    minutes +
    " Minutes " +
    seconds +
    " Seconds Remaining";
}

/* ========================= MANAGER LOGIN ========================= */

function loginManager() {
  let club = document.getElementById("clubSelect").value;

  let password = document.getElementById("managerPassword").value;

  if (club === "") {
    alert("Please select your club first.");

    return;
  }

  if (password === managerPasswords[club]) {
    loggedIn = true;

    loggedInClub = club;

    localStorage.setItem("loggedIn", "true");

    localStorage.setItem("loggedInClub", club);

    document.getElementById("loginStatus").innerHTML =
      "âœ… Logged in as " + club + " Manager";

    updateDashboard();

    alert("Login successful!");
  } else {
    alert("Incorrect password.");
  }
}

/* ========================= ADMIN LOGIN ========================= */

function loginAdmin() {
  let password = document.getElementById("adminPassword").value;

  if (password === adminPassword) {
    adminLoggedIn = true;

    document.getElementById("adminStatus").innerHTML = "âœ… Admin Logged In";

    document.getElementById("adminResetBtn").style.display = "inline-block";

    alert("Welcome Admin!");
  } else {
    alert("Incorrect Admin Password.");
  }
}

/* ========================= SAVE DATA ========================= */

function saveData() {
  localStorage.setItem("budget", budget);

  localStorage.setItem("squadCount", squadCount);
  localStorage.setItem("managerBudgets", JSON.stringify(managerBudgets));
  localStorage.setItem("managerSignings", JSON.stringify(managerSignings));
  localStorage.setItem("signedButtons", JSON.stringify(signedButtons));

  localStorage.setItem("signedPlayers", JSON.stringify(signedPlayers));

  localStorage.setItem("playerTeams", JSON.stringify(playerTeams));

  localStorage.setItem("squads", JSON.stringify(squads));

  let transferNews = document.getElementById("transferNews");

  if (transferNews) {
    localStorage.setItem("transferNews", transferNews.innerHTML);
  }
}

/* ========================= LOAD DATA ========================= */

function loadData() {
  let savedBudget = localStorage.getItem("budget");

  let savedSquadCount = localStorage.getItem("squadCount");
  let savedManagerBudgets = localStorage.getItem("managerBudgets");

  let savedManagerSignings = localStorage.getItem("managerSignings");

  let savedSignedButtons = localStorage.getItem("signedButtons");

  let savedSignedPlayers = localStorage.getItem("signedPlayers");

  let savedPlayerTeams = localStorage.getItem("playerTeams");

  let savedSquads = localStorage.getItem("squads");

  let savedTeamList = localStorage.getItem("teamList");

  let savedTransferNews = localStorage.getItem("transferNews");

  /* Budget */

  if (savedBudget !== null) {
    budget = Number(savedBudget);
  }

  /* Squad count */

  if (savedSquadCount !== null) {
    squadCount = Number(savedSquadCount);
  }
  /* Manager budgets */

  if (savedManagerBudgets !== null) {
    try {
      managerBudgets = JSON.parse(savedManagerBudgets);
    } catch (error) {
      console.log("Could not load manager budgets.");
    }
  }

  /* Manager signings */

  if (savedManagerSignings !== null) {
    try {
      managerSignings = JSON.parse(savedManagerSignings);
    } catch (error) {
      console.log("Could not load manager signings.");
    }
  }

  /* Signed buttons */

  if (savedSignedButtons !== null) {
    try {
      signedButtons = JSON.parse(savedSignedButtons);
    } catch (error) {
      signedButtons = [];
    }
  }

  /* Signed players */

  if (savedSignedPlayers !== null) {
    try {
      signedPlayers = JSON.parse(savedSignedPlayers);
    } catch (error) {
      signedPlayers = [];
    }
  }

  /* Player teams */

  if (savedPlayerTeams !== null) {
    try {
      playerTeams = JSON.parse(savedPlayerTeams);
    } catch (error) {
      console.log("Could not load player teams.");
    }
  }

  /* Squads */

  if (savedSquads !== null) {
    try {
      squads = JSON.parse(savedSquads);
    } catch (error) {
      console.log("Could not load squads.");
    }
  }

  /* My Team */

  if (savedTeamList !== null) {
    let teamList = document.getElementById("team-list");

    if (teamList) {
      teamList.innerHTML = savedTeamList;
    }
  }

  /* Transfer News */

  if (savedTransferNews !== null) {
    let transferNews = document.getElementById("transferNews");

    if (transferNews) {
      transferNews.innerHTML = savedTransferNews;
    }
  }

  /* Restore signed buttons */

  signedButtons.forEach(function (id) {
    let button = document.getElementById(id);

    if (button) {
      button.disabled = true;

      button.textContent = "\u2705 Signed";
    }
  });

  /* Update dashboard */

  if (document.getElementById("managerBudget")) {
    document.getElementById("managerBudget").textContent = budget;
  }

  if (document.getElementById("managerSquad")) {
    let currentClub = document.getElementById("clubSelect").value;

    if (currentClub !== "") {
      document.getElementById("managerSquad").textContent =
        squads[currentClub].length;
    }
  }

  if (document.getElementById("managerTransfers")) {
    let currentClub = document.getElementById("clubSelect").value;

    document.getElementById("managerTransfers").textContent =
      managerSignings[currentClub] || 0;
  }
}

/* ========================= RESET MARKET ========================= */

function resetMarket() {
  let password = prompt("Enter Admin Password");

  if (password !== adminPassword) {
    alert("Wrong Admin Password!");

    return;
  }

  localStorage.clear();

  alert("\u2705 Transfer Market Reset Successfully!");

  location.reload();
}

/* ========================= PAGE STARTUP ========================= */

window.onload = function () {
  /* Load saved market data first */
  loadData();

  /* Countdown */
  updateCountdown();

  setInterval(updateCountdown, 1000);

  /* Restore manager login */
  let savedLogin = localStorage.getItem("loggedIn");

  let savedClub = localStorage.getItem("loggedInClub");

  if (savedLogin === "true" && savedClub) {
    loggedIn = true;

    loggedInClub = savedClub;

    let loginStatus = document.getElementById("loginStatus");

    if (loginStatus) {
      loginStatus.innerHTML = "\u2705 Logged in as " + savedClub + " Manager";
    }

    let clubSelect = document.getElementById("clubSelect");

    if (clubSelect) {
      clubSelect.value = savedClub;
    }

    updateDashboard();
  }
};
/* ============================================
   MEDTRANSFER CLOUD SYNC
============================================ */

async function uploadMedTransferState() {

    try {

        const state = {
            managerBudgets: managerBudgets,
            managerSignings: managerSignings,
            signedButtons: signedButtons,
            signedPlayers: signedPlayers,
            playerTeams: playerTeams,
            squads: squads,
            transferWindowOpen: transferWindowOpen,
            deadline: deadline
                ? deadline.toISOString()
                : null
        };

        const { error } =
            await supabaseClient
                .from("medtransfer_state")
                .update({
                    state: state,
                    updated_at: new Date().toISOString()
                })
                .eq("id", 1);

        if (error) {
            console.error(
                "Cloud save failed:",
                error
            );
            return false;
        }

        cloudSyncReady = true;

        return true;

    } catch (error) {

        console.error(
            "Cloud save error:",
            error
        );

        return false;
    }
}


/* ============================================
   DOWNLOAD SHARED STATE
============================================ */

async function downloadMedTransferState() {

    try {

        const { data, error } =
            await supabaseClient
                .from("medtransfer_state")
                .select("state")
                .eq("id", 1)
                .single();

        if (error) {

            console.error(
                "Cloud load failed:",
                error
            );

            return;
        }

        if (
            !data ||
            !data.state ||
            Object.keys(data.state).length === 0
        ) {
            console.log(
                "No cloud data yet."
            );

            return;
        }

        const cloud = data.state;


        /* Restore budgets */

        if (
            cloud.managerBudgets &&
            typeof cloud.managerBudgets === "object"
        ) {
            managerBudgets =
                cloud.managerBudgets;
        }


        /* Restore signings */

        if (
            cloud.managerSignings &&
            typeof cloud.managerSignings === "object"
        ) {
            managerSignings =
                cloud.managerSignings;
        }


        /* Restore signed buttons */

        if (
            Array.isArray(
                cloud.signedButtons
            )
        ) {
            signedButtons =
                cloud.signedButtons;
        }


        /* Restore signed players */

        if (
            Array.isArray(
                cloud.signedPlayers
            )
        ) {
            signedPlayers =
                cloud.signedPlayers;
        }


        /* Restore player teams */

        if (
            cloud.playerTeams &&
            typeof cloud.playerTeams === "object"
        ) {
            playerTeams =
                cloud.playerTeams;
        }


        /* Restore squads */

        if (
            cloud.squads &&
            typeof cloud.squads === "object"
        ) {
            squads =
                cloud.squads;
        }


        /* Restore transfer window */

        if (
            typeof cloud.transferWindowOpen ===
            "boolean"
        ) {
            transferWindowOpen =
                cloud.transferWindowOpen;
        }


        /* Restore deadline */

        if (cloud.deadline) {

            const savedDeadline =
                new Date(cloud.deadline);

            if (
                !Number.isNaN(
                    savedDeadline.getTime()
                )
            ) {
                deadline =
                    savedDeadline;
            }
        }


        /* Update website */

        updateDashboard();
        showSquad();

        restoreSignedButtons();

        updateCountdown();

        console.log(
            "✅ MedTransfer cloud data loaded."
        );

    } catch (error) {

        console.error(
            "Cloud download error:",
            error
        );
    }
}


/* ============================================
   RESTORE SIGNED BUTTONS
============================================ */

function restoreSignedButtons() {

    if (
        !Array.isArray(
            signedButtons
        )
    ) {
        return;
    }

    signedButtons.forEach(
        function(buttonId) {

            const button =
                document.getElementById(
                    buttonId
                );

            if (button) {

                button.textContent =
                    "✅ Signed";

                button.disabled = true;
            }
        }
    );
}


/* ============================================
   SAVE TRANSFER NEWS TO CLOUD
============================================ */

async function saveTransferNewsToCloud(
    playerName,
    oldClub,
    newClub,
    fee
) {

    try {

        const { error } =
            await supabaseClient
                .from("medtransfer_news")
                .insert({
                    player_name:
                        playerName,

                    old_club:
                        oldClub,

                    new_club:
                        newClub,

                    fee:
                        fee
                });

        if (error) {

            console.error(
                "News save failed:",
                error
            );
        }

    } catch (error) {

        console.error(
            "News cloud error:",
            error
        );
    }
}


/* ============================================
   LOAD TRANSFER NEWS
============================================ */

async function loadTransferNews() {

    try {

        const { data, error } =
            await supabaseClient
                .from("medtransfer_news")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );

        if (error) {

            console.error(
                "News load failed:",
                error
            );

            return;
        }

        const news =
            document.getElementById(
                "transferNews"
            );

        if (!news) {
            return;
        }

        if (
            !data ||
            data.length === 0
        ) {

            news.innerHTML =
                "<p>No transfer news yet.</p>";

            return;
        }

        news.innerHTML = "";

        data.forEach(
            function(item) {

                const headline =
                    document.createElement(
                        "p"
                    );

                headline.innerHTML =
                    "🚨 <strong>BREAKING:</strong> " +
                    item.player_name +
                    " joins <strong>" +
                    item.new_club +
                    "</strong> from " +
                    item.old_club +
                    " for <strong>UGX " +
                    Number(
                        item.fee
                    ).toLocaleString() +
                    "</strong>.";

                news.appendChild(
                    headline
                );
            }
        );

    } catch (error) {

        console.error(
            "News error:",
            error
        );
    }
}


/* ============================================
   REAL-TIME UPDATES
============================================ */

function startMedTransferRealtime() {

    supabaseClient
        .channel(
            "medtransfer-live"
        )

        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table:
                    "medtransfer_state"
            },

            async function(payload) {

                console.log(
                    "🔄 State updated by another device."
                );

                await downloadMedTransferState();

            }
        )

        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table:
                    "medtransfer_news"
            },

            async function(payload) {

                console.log(
                    "📰 New transfer news."
                );

                await loadTransferNews();

            }
        )

        .subscribe(
            function(status, error) {

                console.log(
                    "Realtime:",
                    status
                );

                if (error) {

                    console.error(
                        "Realtime error:",
                        error
                    );
                }
            }
        );
}


/* ============================================
   START CLOUD SYSTEM
============================================ */

async function startMedTransferCloud() {

    console.log(
        "🌐 Connecting MedTransfer to Supabase..."
    );

    await downloadMedTransferState();

    await loadTransferNews();

    startMedTransferRealtime();

    console.log(
        "✅ MedTransfer cloud system ready."
    );
}


/* ============================================
   START
============================================ */

setTimeout(
    function() {

        startMedTransferCloud();

    },
    1000
);
