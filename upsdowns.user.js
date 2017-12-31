// ==UserScript==
// @name         LoL Boards UpsDowns
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Shows how many upvotes and downvotes a topic has
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        none
// ==/UserScript==

function setPoints(d) {
    let up = d.getAttribute("data-apollo-up-votes");
    let down = d.getAttribute("data-apollo-down-votes");

    let par = document.createElement("p");
    par.innerText = "[" + up + ((Number(down) == 0) ? ", " : ", -") + down + "]";

    d.querySelector(".riot-voting").appendChild(par);
}

let didAlready = 0;

function updatePoints() {
    let points = document.querySelectorAll(".riot-apollo.voting, .voting.small-1.columns.riot-apollo");
    for (let np = didAlready; np < points.length; np++) {
        setPoints(points[np]);
    }
    didAlready = points.length;
    
    //Állítsd át "false"-ra, ha az alternatív színt szeretnéd és "true"-ra, ha a simát. Macskakörmök nélkül!
    if (true) {
        document.querySelectorAll(".total-votes").forEach(f => {
            const votes = Number(f.innerText);
            if (votes <= -8) {
                f.style = "color: #5e0c0c;";
            } else if (votes < 0) {
                f.style = "color: #ad1616;";
            } else if (votes >= 8) {
                f.style = "color: #0ece0e;";
            } else if (votes > 2) {
                f.style = "color: #16ad16;";
            } else {
                f.style = "color: lightblue;";
            }
        });
    } else {
        document.querySelectorAll(".total-votes").forEach(f => {
            const votes = Number(f.innerText);
            if (votes <= -8) {
                f.style = "color: #FF2828;";
            } else if (votes < 0) {
                f.style = "color: #FF9A00;";
            } else if (votes >= 8) {
                f.style = "color: #39EE29;";
            } else if (votes > 1) {
                f.style = "color: #69e1f3;";
            } else {
                f.style = "color: #CAB5A2e;"; //ez az alap volt
            }
        });
    }
}

function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(updatePoints, 4000);}));
        console.log("[UpsDowns] Button found");
    } catch(e) {
        console.log("[UpsDowns] Button not found.");
    }
}

(function() {
    'use strict';

    setTimeout(() => {
        updatePoints();
        hook();
    }, 2000);
})();
