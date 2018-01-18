// ==UserScript==
// @name         LoL Boards Endless Scrolling
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/*
// @grant        none
// ==/UserScript==

function handle(but) {
    if (window.pageYOffset/document.body.clientHeight >= 0.75) {
        but.click();
    }
}

(function() {
    'use strict';

    let but = document.querySelector(".show-more-label");
    if (but == undefined || but == null) {
        but = document.querySelector(".btn-large.btn-large-secondary");
    } else {
        but = but.parentNode;
    }

    if ((but != undefined && but != null)) {
        setInterval(handle, 3000, but);
        console.log("[Endless] Button found.");
    } else {
        console.log("[Endless] Button not found.");
    }
})();
