// ==UserScript==
// @name         LoL Boards New Comment Indicator
// @namespace    http://nemin32.github.io
// @version      0.1
// @description  Highlights new comments
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/c/*
// @grant        none
// ==/UserScript==

const isHidden = (el) => !el.offsetHeight && !el.offsetWidth

function handle() {
    let comments = document.querySelectorAll(".nested-comment")

    comments.forEach((el) => {
        if (!isHidden(el.querySelector(".comment-new-indicator"))) {
            el.setAttribute("orig_color", el.style.backgroundColor)
            el.style.backgroundColor = "#510700"
            el.addEventListener("click", () => {el.style.backgroundColor = el.getAttribute("orig_color")})
        }
    })
}

function hook() {document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(handle, 4000);}));}

(function() {
    'use strict';

    setTimeout(() => {
    handle();
    hook();
    }, 1000)
})();
