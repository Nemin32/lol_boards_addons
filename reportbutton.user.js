// ==UserScript==
// @name         Report gomb
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Kicseréli a Jelentés gombot egy valódi gombra.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/c/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let gombok = document.querySelectorAll(".report-link");
    let gombszam = gombok.length;

    for (let o = 0; o < gombszam; o++) {
        gombok[o].innerHTML = "<img src = 'https://i.imgur.com/k5NpjZl.png' width = '32' height = '32'/>";
    }
})();
