// ==UserScript==
// @name         LoL Boards Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter out some unnecessary categories
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const cats = [
    "A játék állapota",
    "Csapat- és csapattagkereső",
    "E-sport",
    "Hibák a magyar verzióban",
    "Hivatalos bejelentések",
    "Minden egyéb",
    "Rajongói alkotások",
    "Segítség és támogatás",
    "Tippek és trükkök",
    "Általános beszélgetés",
    "Új kliens bugok",
    "Új kliens vélemények"
];

function handle(cat) {
    let discs = document.querySelectorAll(".discussion-list-item");

    let a = 0;
    while (a < discs.length) {
        if (cat.indexOf(discs[a].querySelector(".discussion-footer").querySelectorAll("a")[1].innerText) > -1) {
            console.log("miatosz");
            discs[a].remove();
        }
        a++;
    }
}

function selector() {
    let container = document.createElement("div");
    container.id = "nemin_container";
    container.className = "box";

    let vals = GM_getValue("filters", "").split(",");

    for (let i = 0; i < cats.length; i++) {
        let cb = document.createElement("input");
        let lab = document.createElement("label");
        cb.setAttribute("type", "checkbox");
        cb.value = cats[i];
        cb.id = "nemin_chkbox" + String(i);

        lab.setAttribute("for", cb.id);
        lab.innerText = " " + cats[i];

        cb.checked = vals.indexOf(cb.value) > -1;

        container.appendChild(cb);
        container.appendChild(lab);
        container.appendChild(document.createElement("br"));
    }

    let button = document.createElement("input");
    button.type = "button";
    button.value = "Mentés";


    button.onclick = () => {
        const chk = document.querySelector("#nemin_container").querySelectorAll("input");

        let filterCat = "";

        for (let i = 0; i < chk.length; i++) {
            if (chk[i].checked) {
            filterCat += chk[i].value + ",";
            }
        }

        GM_setValue("filters", filterCat);

        location.reload();
    };

    container.appendChild(document.createElement("br"));
    container.appendChild(button);

    document.querySelector(".column.side").insertBefore(container, document.querySelector("navigation-container"));
}

function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(handle, 4000, GM_getValue("filters", "").split(","));}));
        console.log("[Filter] Button found");
    } catch(e) {
        console.log("[Filter] Button not found.");
    }
}

(function() {
    'use strict';

    hook();
    setTimeout(handle, 1000, GM_getValue("filters", "").split(","));
    setTimeout(selector, 2000);
})();
