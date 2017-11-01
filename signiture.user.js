// ==UserScript==
// @name         LoL Boards Aláírás
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Egyszerű aláírás beillesztő.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/c/*/*
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==


(function() {
    'use strict';

    let alabutton = document.createElement("input");
    alabutton.type = "button";
    alabutton.value = "Aláírás Szerkesztése";

    let canclick = true;

    alabutton.addEventListener("click", () => {
        if (canclick) {
            canclick = false;
            let w= window.open("", "Aláírás", "scrollbars=0,resizable=0,width=400,height=300");
            w.document.body.margin = "0 auto !important";

            w.document.write("Helló! Kérlek írd be az aláírásod:<br>");
            let txt = w.document.createElement("textarea");
            txt.style.resizable = "none";
            txt.style.width = "375px";
            txt.style.height = "200px";

            let but = w.document.createElement("input");
            w.document.body.appendChild(txt);
            w.document.body.appendChild(w.document.createElement("br"));
            w.document.body.appendChild(but);

            but.type = "button";
            but.value = "Elfogadás";
            but.addEventListener("click", () => {w.close();});


            let check = () => {
                if (w.closed) {
                    GM_setValue("signo", txt.value);
                    clearInterval(timer);
                    canclick = true;
                }
            };
            let timer = setInterval(check, 500);
        }
    });

    $(".realm")[2].parentNode.appendChild(alabutton);

    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.tagName.toUpperCase() == "TEXTAREA" && target.getAttribute("finished") != "true") {
            target.value += ("\n---\n" + GM_getValue("signo", "Még nem állítottál be aláírást!"));
            target.setAttribute("finished", "true");
        }
    }, false);
})();
