// ==UserScript==
// @name         LoL Boards Votefixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fixes the splitting of votes
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        none
// ==/UserScript==

function fixVotes() {
    const votes = document.querySelectorAll(".riot-voting");

    votes.forEach((vote) => {
        vote.addEventListener("mouseover", () => {
            try {
                vote.querySelector("#vote-breakdown").style.display = "block"
                vote.querySelector("#vote-total").style.display = "none"
            } catch(e) {}
        })

        vote.addEventListener("mouseout", () => {
            try {
                vote.querySelector("#vote-breakdown").style.display = "none"
                vote.querySelector("#vote-total").style.display = "block"
            } catch(e) {}
        })
    })
}

function hook() {document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(fixVotes, 4000);}));}

(function() {
    'use strict';

    if (window.location.toString().split("/")[5] != "c") {
        setTimeout(() => {
            hook()
            fixVotes()
        }, 2000);
    } else {
        console.log("[FixVotes] Commentpage, so nothing was done.")
    }
})();
