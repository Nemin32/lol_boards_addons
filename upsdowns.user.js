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
    let d_id = d.getAttribute("data-discussion-id");
    let a_id = d.getAttribute("data-application-id");

    fetch("https://boards.eune.leagueoflegends.com/api/"+ a_id + "/discussions/" + d_id).then(a => a.json()).then(b => {
        let ups = b["discussion"]["upVotes"];
        let down = b["discussion"]["downVotes"];

        let par = document.createElement("p");
        par.innerText = "(" + ups + ((Number(down) == 0) ? ", " : ", -") + down + ")";

        d.querySelector(".riot-voting").appendChild(par);
    });
}

(function() {
    'use strict';

    let discs = document.querySelectorAll(".discussion-list-item");

    for (let i = 0; i < discs.length; i++) {
        setPoints(discs[i]);
    }
})();
