// ==UserScript==
// @name         LoL Boards UpsDowns
// @namespace    http://tampermonkey.net/
// @version      0.1
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

    console.log(par.innerText);

    d.querySelector(".riot-voting").appendChild(par);
}

(function() {
    'use strict';

    let discs = document.querySelectorAll(".riot-apollo.voting, .voting.small-1.columns.riot-apollo");


    for (let i = 0; i < discs.length; i++) {
        setPoints(discs[i]);
    }
})();
