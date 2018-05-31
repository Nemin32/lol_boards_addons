// ==UserScript==
// @name         LoL Boards Accidental Close Stopper
// @namespace    http://nemin32.github.io/
// @version      0.3
// @description  Stops you from accidentaly closing the page while writing a comment
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/submit
// @match        https://boards.eune.leagueoflegends.com/*/c/*
// @match        https://boards.euw.leagueoflegends.com/*/submit
// @match        https://boards.euw.leagueoflegends.com/*/c/*
// @grant        none
// ==/UserScript==

const exit = (ev) => {ev.returnValue = "Do you really want to close this page?"; return "Do you really want to close this page?"}

const body = document.querySelector("#body")

function handle() {
    if (body != null) {
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
    } else {
        if (body.value.length > 30) {
            window.addEventListener("beforeunload", exit);
        } else {
            window.removeEventListener("beforeunload", exit);
        }
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
