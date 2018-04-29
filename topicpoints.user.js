// ==UserScript==
// @name         LoL Boards Post Points
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Shows you how many points your topics got.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/player/*/*
// @grant        none
// ==/UserScript==

let returnPoints = (discussion_id, discussion_app_id) => {
    return new Promise((resolve, reject) => {
        const request = fetch("https://boards.eune.leagueoflegends.com/api/"+discussion_app_id+"/discussions/"+discussion_id);
        request.then(resp => resp.json()).then(jsonResp => {
            resolve([jsonResp.discussion.upVotes, jsonResp.discussion.downVotes]);
        });
    });
};

let didAlready = 0;

function updatePoints() {
    let rows = document.querySelectorAll(".discussion-list-item");
    for (let i = didAlready; i < rows.length; i++) {
        try {
            const disc_id = rows[i].getAttribute("data-discussion-id");
            const app_id = rows[i].getAttribute("data-application-id");
            const originalText = rows[i].querySelector(".title-span").textContent;


            returnPoints(disc_id, app_id).then(resp => {
                rows[i].querySelector(".title-span").textContent = "[" + resp[0] + " / " + ((resp[1] == 0) ? "" : "-") + resp[1] + "] (" + (resp[0]-resp[1]) + ") " + originalText;
            });
        } catch(e) {
            console.log("Points could not be read.");
        }
    }
    didAlready = rows.length;
}


function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(updatePoints, 4000);}));
        console.log("[Topic Points] Button found");
    } catch(e) {
        console.log("[Topic Points] Button not found.");
    }
}


(function() {
    updatePoints();
    hook();
})();
