// ==UserScript==
// @name         LoL Boards Blocklist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Let's you block users (hides their posts and comments)
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let blocklist = GM_getValue("blocklist", "").split(",");

function deletePosts() {
    blocklist.forEach( name => {
        let posts = document.querySelectorAll(".discussion-list-item");

        posts.forEach(post => {
            const author = post.querySelector(".username").innerText.split(" (")[0];
            if (author == name) {
                post.parentElement.removeChild(post);
            }
        });
    });

    blocklist.forEach( name => {
        document.querySelectorAll(".nested-comment").forEach(el => {
            const author = el.querySelector(".username").innerText.split(" (")[0];
            if (author == name) {el.querySelector(".toggle-minimized").click()};
        })
    });
}

function rebuildNameList(ui) {
    ui.querySelectorAll(".name_div").forEach(el => el.parentNode.removeChild(el));
    blocklist.forEach(name => {
        if (name != "") {
            let container = document.createElement("div");
            container.id = "blocklist_" + name;
            container.className = "name_div";

            let name_p = document.createElement("span");
            name_p.innerText = "  - " + name;
            let delete_button = document.createElement("input");
            delete_button.type = "button";
            delete_button.value = "[X]";
            delete_button.onclick = () => {
                let root = document.getElementById("blocklist_" + name);
                root.parentElement.removeChild(root);

                blocklist = blocklist.filter(e => e != name);
                GM_setValue("blocklist", blocklist.join(","));
            }

            container.appendChild(delete_button);
            container.appendChild(name_p);

            ui.appendChild(container);
        }
    });

}

function addUI() {
    const root = document.querySelector(".column.side");
    let ui = document.createElement("div");
    ui.className = "box";
    ui.id = "nemin_ui";

    ui.innerHTML = "<center><h3>Tiltólista</h3><hr><br><span><b>Használat: 'Név1, Név2, Név3,...'</b></span>";

    let editor = document.createElement("input");
    let confirm = document.createElement("input");
    confirm.type = "button";
    confirm.value = "Mentés";

    confirm.onclick = () => {
        let names = editor.value.split(",").map(a => a.trim());
        names.forEach(name => {
            if (blocklist.filter(n => n==name).length == 0) {
                blocklist.push(name)
            }
        })

        GM_setValue("blocklist", blocklist.join(","));
        rebuildNameList(ui);
        deletePosts();
    }

    ui.appendChild(editor);
    ui.appendChild(confirm);
    ui.appendChild(document.createElement("br"));
    ui.appendChild(document.createElement("br"));

    rebuildNameList(ui);

    root.appendChild(ui);
}

function hook() {
    deletePosts(GM_getValue("blocklist", "").split(","));
    try {
        document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(deletePosts, 2500)}));
        console.log("[Blocklist] Button found");
    } catch(e) {
        console.log("[Blocklist] Button not found.");
    }
}

(function() {
    'use strict';
    addUI();
    hook();
})();
