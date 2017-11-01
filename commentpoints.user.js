// ==UserScript==
// @name         LoL Boards Komment Pontok
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nemin
// @match        *://boards.eune.leagueoflegends.com/hu/player/*/*
// @grant        none
// ==/UserScript==


/* jshint ignore: start */
function crawler(data, target) {
    for (i in data) {
        console.log(target + ": " + data[i].id);
        if (data[i].id == target) return (data[i].upVotes - data[i].downVotes)

        let res =crawler(data[i].replies.comments, target)

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
};
/* jshint ignore: end */


(function() {
    'use strict';

    let comments = document.querySelectorAll(".comment-list-item");

    for (let x = 0; x < comments.length; x++) {
        handle(comments[x]);
    }
    //handle(comments[1]);
})();
