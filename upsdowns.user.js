// ==UserScript==
// @name         LoL Boards UpsDowns
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Shows how many upvotes and downvotes a topic has
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        none
// ==/UserScript==

function setPoints(d) {
    let up = d.getAttribute("data-apollo-up-votes");
    let down = d.getAttribute("data-apollo-down-votes");

    let par = document.createElement("p");
    par.innerText = "(" + up + ((Number(down) == 0) ? ", " : ", -") + down + ")";

    d.querySelector(".riot-voting").appendChild(par);
}

let didAlready = 0;

function updatePoints() {
    let points = document.querySelectorAll(".riot-apollo.voting, .voting.small-1.columns.riot-apollo");
    for (let np = didAlready; np < points.length; np++) {
        setPoints(points[np]);
    }
    didAlready = points.length;
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
