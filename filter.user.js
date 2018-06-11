// ==UserScript==
// @name         LoL Boards Filter
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Filter out some unnecessary categories
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/*
// ==/UserScript==

let cats = []

const button_lang = {
    hu: "Mentés",
    en: "Save",
    pl: "Zapisać",
    el: "Αποθηκεύσετε",
    ro: "Salveaza",
    cs: "Uložení"
}

function handle(cat) {
    let discs = document.querySelectorAll(".discussion-list-item");

    let a = 0;
    while (a < discs.length) {
        if (cat.indexOf(discs[a].querySelector(".discussion-footer").querySelectorAll("a")[1].innerText) > -1) {
            discs[a].remove();
        }
        a++;
    }
}

function selector() {
    let container = document.createElement("div");
    container.id = "nemin_container";
    container.className = "box";
    container.style.padding = "16px"

    let vals = window.localStorage.getItem("filter");
    if (vals == null) vals = []; else vals = vals.split(",")

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
    button.style.width = "120px"
    button.style.height = "30px";
    button.style.display = "block"
    button.style.margin = "0 auto"
    button.value = button_lang[window.location.toString().split("/")[3]];


    button.onclick = () => {
        const chk = document.querySelector("#nemin_container").querySelectorAll("input");

        let filterCat = "";

        for (let i = 0; i < chk.length; i++) {
            if (chk[i].checked) {
            filterCat += chk[i].value + ",";
            }
        }

        window.localStorage.setItem("filter", filterCat)


        location.reload();
    };

    container.appendChild(document.createElement("br"));
    container.appendChild(button);

    document.querySelector(".column.side").insertBefore(container, document.querySelector("navigation-container"));
}

function hook() {
    try {
        let filter = window.localStorage.getItem("filter");
        if (filter == null) filter = []; else filter = filter.split(",")

        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(handle, 4000, filter);}));
        console.log("[Filter] Button found");
    } catch(e) {
        console.log("[Filter] Button not found.");
    }
}

(function() {
    'use strict';
    hook();

    setTimeout(() => {
        cats = [...document.querySelectorAll(".safe")]
            .filter((elem) => {return elem.getAttribute('href').split("/").length == 6 && elem.getAttribute('href')
            .search("boards\.eune\.leagueoflegends\.com") != -1})
            .map(elem => elem.innerText)
            .map(elem => elem.replace(/ ([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, ''))
            .map(elem => elem.replace(/(\•) /g, ""));

        console.log(cats)

        let filter = window.localStorage.getItem("filter");
        if (filter == null) filter = []; else filter = filter.split(",")

        setTimeout(handle, 500, filter);
        setTimeout(selector, 1000);
    }, 1000);
})();
