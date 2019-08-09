// ==UserScript==
// @name         Szín eszköztár
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Könnyebb szinezés
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/c/*/*
// @match        https://boards.eune.leagueoflegends.com/hu/submit
// @grant        none
// ==/UserScript==

function reverse(s){
    return s.split("").reverse().join("");
}

function changeText(span, code) {
    const start = Math.min(span.selectionStart,span.selectionEnd)
    const end = Math.max(span.selectionStart,span.selectionEnd)

    let firstpart = span.value.slice(0, start)
    let secondpart = span.value.slice(end, span.value.length)
    let selected = span.value.slice(start, end)

    span.value = firstpart + code + selected + reverse(code) + secondpart;
}

function createButton(color, code, span) {
    const button = document.createElement("div")

    button.title = color;
    button.className = "button formatting nemin " + color
    button.addEventListener("click", () => {changeText(span, code)})

    return button
}

function injectStyle() {
    const style = `
.button.nemin {
background: none;
}

.button.nemin.zold  {background: darkgreen  !important}
.button.nemin.lila  {background: purple     !important}
.button.nemin.kek   {background: darkcyan   !important}
.button.nemin.piros {background: darkred    !important}
`

    const style_element = document.createElement("style")
    style_element.innerHTML = style;

    document.head.appendChild(style_element)
}

function hookTXT(txt, buttons) {
        const colors = {
            zold: "**_*~~",
            lila: "_**~~",
            kek: "_*~~",
            piros: "_***~~"
        }

        const first = buttons.firstChild;
        for (const c in colors) {
            try {
                buttons.insertBefore(createButton(c, colors[c], txt), first)
            } catch (e) {
                console.log("ERR: " + e)
            }
        }
}

(function() {
    'use strict';
    injectStyle()

    let body = document.querySelector("#body")

    if (body) {
        setTimeout(() => {hookTXT(body, document.querySelector(".rfmtoolbar .buttons"))}, 500)
    } else {
    setInterval(() => {
        const divs = document.body.querySelectorAll(".reply")

        for (const d in divs) {
            const div = divs[d]

            if (div.querySelector && div.querySelector(".button.nemin") == undefined) {
                hookTXT(div.querySelector("textarea"), div.querySelector(".rfmtoolbar .buttons"))
            }
        }},500)
    }
})();
