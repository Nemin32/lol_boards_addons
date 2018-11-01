// ==UserScript==
// @name         LoL Boards Ranks
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Megmutatja hány pontod van a Fórumon.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        none
// ==/UserScript==

let collected_names = {}
let already_did = 0

function getPoints(name) {
    if (collected_names[name] !== undefined) return collected_names[name]

    const link = `https://boards.eune.leagueoflegends.com/hu/player/eune/${name}`
    return fetch(link).then(raw => raw.text()).then(resp => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(resp, "text/html")

        const span = doc.querySelector(".lifetime-upvotes span")
        if (span === null) {
            return "Hiba"
        } else {
            return span.getAttribute("data-short-number")
        }
    })
}

async function handleUser(user) {
    user.innerText += ` [${await getPoints(user.innerText)}]`
}

function processNames(after) {
  let users = [...document.querySelectorAll("span.username")]
  users.splice(0, already_did)
  already_did = users.length
  users.forEach(user => handleUser(user))
}

(function() {
    'use strict';
    try {
        document.querySelector(".show-more.box").addEventListener("click", () => {
            setTimeout(() => {
                processNames(already_did)
            }, 3000)
        })
    } catch(e) {console.log("[RANK] No button found.")}
    
    processNames(0)
})();
