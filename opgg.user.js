// ==UserScript==
// @name         LoL Boards OP.GG Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Puts an OP.GG Button next to every user.
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
        
        let but = document.createElement("input");
        but.type = "button";
        but.value = "OP.GG";
        but.onclick = () => {window.open("http://eune.op.gg/summoner/userName=" + encodeURIComponent(final) + "/", "_blank");};
        names[name].parentNode.parentNode.insertBefore(but, names[name].parentNode.nextSibling);
    }
})();
