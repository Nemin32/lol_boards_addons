// ==UserScript==
// @name         LoL Boards Ranks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows you how many upvotes a user has.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*
// @grant        none
// ==/UserScript==

/* jshint ignore:start */

async function getName(name) {
    let page = await fetch("https://boards.eune.leagueoflegends.com/hu/player/eune/" + name).then(a => a.text())

    try {
    return page.match(/"lifetime-upvotes">\n\t\t<span class="number opaque" data-short-number="(\d+)">/)[1]
    } catch (e) {
    return 0
    }
}

let didAlready = 0

function updateNames() {
    let names = document.querySelectorAll(".username")
    for (let np = didAlready; np < names.length; np++) {
        getName(names[np].innerText).then(retval => {
            if (retval != 0) names[np].innerText += " (" + retval + ")"
        })
    }
    didAlready = names.length
}

function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(updateNames, 4000)}))
        console.log("[Rank] Button found")
    } catch(e) {
        console.log("[Rank] Button not found.")
    }
}

(function() {
    'use strict';

    updateNames()
    hook()
})();
/* jshint ignore:end */
