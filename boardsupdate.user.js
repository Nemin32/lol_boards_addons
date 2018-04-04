// ==UserScript==
// @name         LoL Boards Redesign
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  "Kicsit sárga, kicsit savanyú... DE A MIENK!"
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/*
// @grant        none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function colorMods() {
    document.querySelectorAll(".username").forEach((name) => {
        if (name.innerText.match(/Shikaichi|Mind The Gap|Zooty|Nemin/)) {name.style = "color: #ff9d00";}
        if (name.innerText.match(/DannyT/)) {name.style = "color: #0098ff";}
    });
}

function editHeader() {
    let childP = document.createElement("p");

    childP.innerText = "„Kicsit sárga, kicsit savanyú, de a mienk!”";
    childP.style = "font-weight: bold; font-style: italic;";

    $("h2")[0].childNodes[1].innerText = "Fórumok";
    $("#breadcrumbs")[0].insertBefore(childP, $("#breadcrumbs")[0].querySelector("hr"));
}

function hook() {
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(colorMods, 4000);}));
        console.log("[ForumUpdate] Button found");
    } catch(e) {
        console.log("[ForumUpdate] Button not found.");
    }
}

const new_board_style = `
.button, .riot-athena-body .btn.riot-athena-submit, body a.button {
    background-color: #4b5556a1;
    outline: #949fa0 solid 1px;
    color: #dce2e2;
    font-family: "Beaufort for LoL",serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 16px;
}

#discussion #content div.body { max-width: 90% !important; }
.nested-comment .body-container .body span.high-quality { max-width: 90% !important; }
#discussion #content { padding: 25px 20px 20px 75px !important; }
body.apollo .content .discussion-list.sticky {background-color: rgba(23,47,70,.9) !important; }

#board-info, #navigation-container, #red-tracker, #search-form, .discussion.box.main.glow, .new-discussion-box.box, body.apollo .content .discussion-list.box.main, body.apollo .content .discussion-list.sticky {
    border: 1px solid #063f4c;
}

body.apollo .content .discussion-list.box.main { background-color: #121d27 !important;}
body .backdrop .magic {background-image: url(https://lolstatic-a.akamaihd.net/apollo/assets/boards_magic.jpg) !important;}
html body .backdrop .header {background-image: url('https://i.imgur.com/xLmoOpi.jpg') !important;}

.discussion.box.main.glow {background-color: #0e161db8 !important;}
.nested-comment {background-color: #10181f !important;}
.edit.form-container textarea, .reply.form-container textarea {color: #a7a7a7 !important;}

input, textarea {border: 1px solid #195657 !important;}

.edit .preview.box, .reply.form-container .textarea-holder, .reply.form-container.main .bottom-bar, .riot_apollo[data-poll-widget="show"] table.riot-athena-result-collection tr.riot-athena-choice.selected, .riot_apollo[data-poll-widget="show"] table.riot-athena-result-collection tr.riot-athena-total.selected, input.box, textarea.box {
    background-color: #1c2935 !important;
}

.edit .textarea-holder, .reply.form-container .bottom-bar, .reply.form-container .preview.box, .reply.form-container.main .textarea-holder {
    background-color: #10181f;
}

#query {border: none !important;}
`;

(function() {
    'use strict';

    const url = window.location.toString().split("/");
    f (url[url.length-1].length == 0) editHeader();
    setTimeout(() => {hook(); colorMods();}, 2000);

    addGlobalStyle(new_board_style);
})();
