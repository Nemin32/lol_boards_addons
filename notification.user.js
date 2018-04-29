// ==UserScript==
// @name         LoL Boards Notification
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Notifies you if you got a new message.
// @author       Nemin
// @match        https://*.leagueoflegends.com/hu/*
// @exclude      https://boards.eune.leagueoflegends.com/hu/myupdates
// @exclude      https://boards.eune.leagueoflegends.com/hu/myupdates?show=unread
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /*fetch("https://boards.eune.leagueoflegends.com/hu/myupdates", {credentials: "include"}).then(a => a.text()).then(b => {
        if (b.search('<div class="empty-state">') == -1) {
            alert("Üzeneted érkezett!");
        }
    });*/
    fetch("https://boards.eune.leagueoflegends.com/en/myupdates.json?show=unread", {credentials: "include"}).then(a => a.json()).then(b => {
    if (b.resultsCount > 0) alert(b.resultsCount + " új üzeneted érkezett!");
    });
})();
