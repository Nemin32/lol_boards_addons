// ==UserScript==
// @name         LoL Boards Komment Pontok
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Kijelzi a pontokat a kommentek mellett.
// @author       Nemin
// @match        *://boards.eune.leagueoflegends.com/hu/player/*/*
// @grant        none
// ==/UserScript==

function crawler(data, target) {
    for (let i in data) {
        if (data[i].id == target) return (data[i].upVotes - data[i].downVotes);

        let res =crawler(data[i].replies.comments, target);

        if (res != -1) return res;
    }

    return -1;
}

function handle(comment) {
    let req = fetch("https://boards.eune.leagueoflegends.com/api/" + comment.getAttribute("data-application-id") + "/discussions/" + comment.getAttribute("data-discussion-id") + "/comments");

    req.then(resp => resp.json()).then(
        jsonresp => {
            comment.querySelector(".body").innerHTML = ("<b>[" + crawler(jsonresp.comments, comment.getAttribute("data-comment-id")) + "]</b>") + comment.querySelector(".body").innerHTML;
        }
    );
}

let didAlready = 0;

function updateNames() {
    let comments = document.querySelectorAll(".comment-list-item");

    for (let x = didAlready; x < comments.length; x++) {
        handle(comments[x]);
    }

    didAlready = comments.length;
}


function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(updateNames, 4000);}));
        console.log("[Comment Points] Button found");
    } catch(e) {
        console.log("[Comment Points] Button not found.");
    }
}


(function() {
    'use strict';

    updateNames();
    hook();
})();
