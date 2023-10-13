//create pushes table 
/*var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });*/
var pages = ['page1', 'page2', 'page3'];
var currentPageIndex = -1;
console.log(currentPageIndex + " top of js");
var username = " "; //document.querySelector('.namereg'); same as user.displayName
var password = " ";
var email = " ";
var signtype = "";
let loggedInPerson = false;
/*console.log(currentPageIndex);
var showNextPage = function() {
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    
    display.innerHTML = template;
    if (currentPageIndex == 2) {
        renderTournament();
        console.log("populate? full html means to use AJAX and pull stuff from DB about it");
    }
};
var showPreviousPage = function() {
    currentPageIndex = (currentPageIndex - 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    

    display.innerHTML = template;

};*/

/*
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        //currentPageIndex = 0;
        console.log(signtype, ": sty ", username, " : uname");
        if (signtype === "free" && user.displayName == null) {
            console.log("enter HERE!");
            user.updateProfile({ displayName: username.toString() }).then(function() {
                    console.log(user.displayName, " inside 1");
                })
                .catch(function(error) {
                    console.log("error");
                });
            console.log(user.displayName, " after catch");
        } else {
            username = user.displayName;
        }
        showNextPage();
        console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
        console.log("after login");
        startApp(user);
    } else {
        if (currentPageIndex == 1) {
            showPreviousPage();
        }
        console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
        console.log("First AUTH");
        renderLogin();
    }
});
*/
/*let renderTournament = () => {

};*/
let renderLogin = () => {
    loginHTML();
    /*var google_provider = new firebase.auth.GoogleAuthProvider();
    google_provider.setCustomParameters({ prompt: 'select_account' });*/
    var google_provider = new firebase.auth.GoogleAuthProvider();
    google_provider.setCustomParameters({
        prompt: 'select_account'
    });
    console.log("entered");
    console.log($("#logbutton")[0]);
    $("#logbutton").on("click", () => {
        firebase.auth().signInWithRedirect(google_provider);
        //const tryF = firebase.auth().currentUser;
        //console.log(tryF.displayName, " test");
        //showNextPage();
    });
    $("#logbuttonDB").on("click", () => {
        const logReg = $("#logReg")[0];
        $("#fnameL").val("");
        $("#pwdL").val("");
        $("#emailL").val("");
        logReg.showModal();
        $("#closeLog").click(() => {
            const logReg = $("#logReg")[0];
            password = $("#pwdL").val();
            email = $("#emailL").val();;
            firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
                    username = $("#fnameL").val();
                    // Signed in
                    var user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
            logReg.close();
        });
    });
    $("#registerbutton").on("click", () => {
        const modalReg = $("#modalReg")[0];
        $("#fnameR").val("");
        $("#pwdR").val("");
        $("#email").val("");
        modalReg.showModal();
        $("#closeReg").click(() => {
            console.log("reach");
            const modalReg = $("#modalReg")[0];
            username = $("#fnameR").val();
            password = $("#pwdR").val();
            email = $("#email").val();;
            let obj = {
                "Username": username,
                "Password": password,
                "Email": email
            };
            modalReg.close();
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                var pp = userCredentials.user;
                console.log(pp.displayName, " dd");
                user.updateProfile({
                        displayName: username.toString()
                    }).then(function() {
                        console.log(user.displayName, " inside 2");
                    })
                    .catch(function(error) {
                        console.log("error");
                    });
                console.log(user.displayName, " after catch");

            });
            console.log("teehee");
            signtype = "free";
            console.log(signtype);
        });
    });

};
let startApp = (user) => {
    homeHTML();
    console.log(user.email + ": startApp Email");
    if (signtype === "free" && user.displayName == null) {
        user.updateProfile({
            displayName: username
        });
    }
    console.log("hi");
    console.log(user.displayName + ": udispo");
    console.log(username + ": uddddd");
    $("#namereg").text(username);
    $("#logoutbutton").on("click", () => {
        firebase.auth().signOut();
    });
    $("#createtourney").on("click", () => {
        const modalCreate = $("#modalCreate")[0];
        $("#tname").val("");
        $("#gname").val("");
        $("#nump").val("");
        $("#gpwd").val("");
        modalCreate.showModal();
        $("#closeCreate").click(() => {
            const tourneyName = $("#tname").val();
            const gamename = $("#gname").val();
            const numplayers = $("#nump").val();
            const gamepwd = $("#gpwd").val();
            const ownersArry = [user.displayName];
            const ownerDisplayName = user.displayName;
            const ownerEmail = user.email;
            const playersArry = [""];
            const matches = [""];
            const joinableLink = ("https://cisc472-tourney.web.app/", "Tournament/"); // ,tourneyName, "/", gamename, "/", ownerDisplayName);
            let obj = {
                "TournamentName": tourneyName,
                "GameName": gamename,
                "NumPlayers": numplayers,
                "GamePassword": gamepwd,
                "Owners": ownersArry,
                "Players": playersArry,
                "Games": matches,
                "OwnerEmail": ownerEmail,
                "OwnerName": ownerDisplayName,
                "JoinableLink": joinableLink
            };
            //then ajax stuff into game on firebase
            const modalCreate = $("#modalCreate")[0];
            console.log("pushed");
            let newRef = firebase.database().ref("/Tournament").push();
            newRef.set({
                "TournamentName": tourneyName,
                "GameName": gamename,
                "NumPlayers": numplayers,
                "GamePassword": gamepwd,
                "Owners": ownersArry,
                "Players": playersArry,
                "Games": matches,
                "OwnerEmail": ownerEmail,
                "OwnerName": ownerDisplayName,
                id: newRef.key
            });
            modalCreate.close();
            //showNextPage();
        });
        //console.log("redering");
        //firebase.database().ref("/surveys").on("value", ss => {});

    });
    console.log("redering");
    firebase.database().ref("/Tournament").on("value", ss => {
        $("#linkGlobalTables").html("");
        $("#yourTables").html("");
        $("#linkGlobalTables").append(`<h3>Global Tables</h3>`)
        $("#yourTables").append(`<h3>Your Tables</h3>`)
        let allTournaments = ss.val() || {};
        Object.keys(allTournaments).map(sID => {
            let theTournament = allTournaments[sID];
            if (theTournament.OwnerName == user.displayName) {
                $("#yourTables").append(`<a class="survey-wrap" href="/Tournament/${sID}"><h3 id="hyperLink">${theTournament.TournamentName}</h3></a>`);
            }
            $("#linkGlobalTables").append(`<a class="survey-wrap" href="/Tournament/${sID}"><h3 id="hyperLink">${theTournament.TournamentName}</h3></a>`);
        });

    });


};
let routeToPage = (parts, user) => {
    //addLogout();
    console.log(parts.length);
    if (parts.length < 3) {
        //showNextPage();
        startApp(user);
    } else {
        if (parts[1] == "Tournament" && parts[2].length > 1) {
            //renderSurvey(parts[2]);
            renderTournament(parts[2]);
            console.log("teehee");
        } else {
            alert("Tournament Doesnt Exist / Invalid Link");
            //showNextPage();
            startApp(user);
        }
    }
};
/*var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });*/
document.addEventListener('DOMContentLoaded', function() {
    console.log("render page");
    let pn = document.location.pathname;
    console.log(pn);
    let URLparts = pn.split("/");
    if (URLparts.length == 3) {
        console.log(URLparts[1], "--------", URLparts[2]);
    }

    firebase.auth().onAuthStateChanged(user => {
        if (!!user) {
            //currentPageIndex = 0;
            loggedInPerson = user;
            console.log(signtype, ": sty ", username, " : uname");
            if (signtype === "free" && user.displayName == null) {
                console.log("enter HERE!");
                user.updateProfile({
                        displayName: username.toString()
                    }).then(function() {
                        console.log(user.displayName, " inside 1");
                    })
                    .catch(function(error) {
                        console.log("error");
                    });
                console.log(user.displayName, " after catch");
            } else {
                username = user.displayName;
            }
            //showNextPage();
            console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
            console.log("after login");
            routeToPage(URLparts, user);
            //startApp(user);
        } else {
            if (currentPageIndex == 1) {
                loginHTML();
            }
            loggedInPerson = false;
            console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
            console.log("First AUTH");
            renderLogin();
        }
    });
    //Expecting /tourney/:uidhere
    /*
    firebase.auth().onAuthStateChanged(user => {
        if (!!user){
        loggedInPerson = user;
        routeToPage(URLparts);
        } else {
        loggedInPerson = false;
        $("#logout-wrap").remove();
        renderLogin();
        }
    });*/
    console.log("SPLIT!");
});

let loginHTML = () => {
    $("#main").html("");
    $("#main").append(`<div class="toppart">
    <h1 style="position: absolute;left:32%;top:25%">WELCOME TO THE TOURNAMENT SITE!</h1>
    <button id="logbutton" class="logbutton">Log In! Google</button>
    <button id="logbuttonDB" class="logbuttonDB">Log In!</button>
    <dialog class="logReg" id="logReg">
        <h1 style="text-align: center;">Welcome!</h1>
        <label for="fnameL">Username:</label>
        <input type="text" id="fnameL" name="fnameL" class="fnameL" value=""></input>
        <label for="pwdL">Password:</label>
        <input type="password" id="pwdL" name="pwdL" class="pwdL" value=""></input>
        <label for="emailL">Email:</label>
        <input type="email" id="emailL" name="emailL" class="emailL" value=""></input>
        <button class="closeLog" id="closeLog">Submit</button>
    </dialog>
    <button id="registerbutton" class="registerbutton">Register Here!</button>
    <dialog class="modalReg" id="modalReg">
        <h1 style="text-align: center;">Welcome!</h1>
        <label for="fnameR">Username:</label>
        <input type="text" id="fnameR" name="fnameR" class="fnameR" value=""></input>
        <label for="pwdR">Password:</label>
        <input type="password" id="pwdR" name="pwdR" class="pwdR" value=""></input>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" class="email" value=""></input>
        <button class="closeReg" id="closeReg">Submit</button>
    </dialog>
    <button id="helpbutton" class="helpbutton">Need Help?</button>
    <p style="position:absolute;left: 1%;top: 60%;" id="da">Username:</p>
</div>
<div class="homebody">
    <h1 id="introbody" class="introbody">Welcome to the tournament! Please sign in above to get started!</h1>
</div>`);
};
let homeHTML = () => {
    $("#main").html("");
    $("#main").append(`<div class="toppart">
    <h1 style="position: absolute;left:32%;top:25%">WELCOME TO THE TOURNAMENT SITE!</h1>
    <p style="position:absolute;left: 1%;top: 60%;" id="da">Username:</p>
    <button id="logoutbutton" class="logoutbutton">Logout</button>
    <p style="position:absolute;left: 5.5%;top: 60%;" id="namereg" class="namereg"></p>
</div>
<div class="homebody">
    <button id="createtourney" class="createtourney">CREATE TOURNEY HERE!</button>
    <dialog class="modalCreate" id="modalCreate">
        <h1 style="text-align: center;">Create Your Tournament!</h1>
        <label for="tname">Name of Tournament:</label>
        <input type="text" id="tname" name="tname" class="tname" value=""></input>
        <label for="gname">Name of Game:</label>
        <input type="text" id="gname" name="gname" class="gname" value=""></input>
        <label for="nump">Number of Players:</label>
        <input type="text" id="nump" name="nump" class="nump" value=""></input>
        <label for="gpwd">Password (blank if none):</label>
        <input type="password" id="gpwd" name="gpwd" class="gpwd" value=""></input>
        <label for="pbox">Public?</label>
        <input type="checkbox" id="pbox" name="pbox" class="pbox" value="Public"></input>
        <button class="closeCreate" id="closeCreate">Create!</button>
    </dialog>
    <button id="jointourney" class="jointourney">JOIN A TOURNEY!</button>
</div>
<div id="linkGlobalTables" class="linkGlobalTables"></div>
<div id="yourTables" class="yourTables"></div>`);
};
let renderTournament = (sID) => {
    $("#main").html("");
};
//showNextPage();