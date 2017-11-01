// ==UserScript==
// @name         LoL Boards OP.GG Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  OP.GG Gomb
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/c/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let names = document.querySelectorAll(".username");
    for (let name = 0; name < names.length; name++) {
        let points_splitoff = names[name].innerText.split(" (")[0];
        let hozzmint_splitoff = points_splitoff.split("Hozzászólás, mint: ");
        let final = hozzmint_splitoff[hozzmint_splitoff.length-1];

        console.log("http://eune.op.gg/summoner/userName=" + encodeURIComponent(final) + "/");
        let but = document.createElement("input");
        but.type = "button";
        but.value = "OP.GG";
        but.onclick = () => {window.open("http://eune.op.gg/summoner/userName=" + encodeURIComponent(final) + "/", "_blank");};
        names[name].parentNode.parentNode.insertBefore(but, names[name].parentNode.nextSibling);
    }
})();
