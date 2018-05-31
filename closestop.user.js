// ==UserScript==
// @name         LoL Boards Accidental Close Stopper
// @namespace    http://nemin32.github.io/
// @version      0.1
// @description  Stops you from accidentaly closing the page while writing a comment
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/c/*
// @grant        none
// ==/UserScript==

const exit = (ev) => {ev.returnValue = "lel"; return "lel"}

function handle() {
    const texts = [...document.querySelectorAll(".expanding-clone")];

    let found = false;
    texts.some(outer => {
        const text = outer.querySelector("span").innerHTML;
        if (text != "") {found = true; return true;}
    })

    if (found) {
        window.addEventListener("beforeunload", exit);
    } else {
        window.removeEventListener("beforeunload", exit);
    }
}

function clickHandle(e) {
    if (e.target.getAttribute("data-bind") == "click: createComment") {
        window.removeEventListener("beforeunload", exit);
    }
}

(function() {
    'use strict';
    document.addEventListener("keydown", handle)
    document.addEventListener("click", clickHandle, true)
})();