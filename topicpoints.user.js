// ==UserScript==
// @name         LoL Boards Points
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Profiloldali pontok
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*/player/*/*
// @grant        none
// ==/UserScript==

/* jshint ignore:start */
let returnPoints = (discussion_id, discussion_app_id) => {
    return new Promise((resolve, reject) => {
        const request = fetch("https://boards.eune.leagueoflegends.com/api/"+discussion_app_id+"/discussions/"+discussion_id)
        request.then(resp => resp.json()).then(jsonResp => {
            resolve(jsonResp.discussion.upVotes - jsonResp.discussion.downVotes)
        })
    })
}

(function() {
    let rows = document.querySelectorAll(".discussion-list-item")
    for (let i in rows) {
        try {
        const disc_id = rows[i].getAttribute("data-discussion-id")
        const app_id = rows[i].getAttribute("data-application-id")
        const originalText = rows[i].querySelector(".title-span").textContent


        returnPoints(disc_id, app_id).then(resp => {
            rows[i].querySelector(".title-span").textContent = "[" + resp + "] " + originalText
        })
        } catch(e) {
            console.log("Points could not be read.");
        }
    }
})();
/* jshint ignore:end */
