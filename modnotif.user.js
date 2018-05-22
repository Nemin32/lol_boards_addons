// ==UserScript==
// @name         LoL Boards Mod Notification
// @namespace    http://nemin32.github.io/
// @version      0.1
// @description  Shows if an admin has commented under a post.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/*
// @grant        none
// ==/UserScript==

let modnames = [];
let didAlready = 0;

function crawler(comments) {
    for (let el of comments.comments) {
        if (el.user.isModerator && modnames.indexOf(el.user.name) == -1) {
          modnames.push(el.user.name);
        }

        crawler(el.replies)
    }
}

function handle() {
    const elems = document.querySelectorAll(".discussion-list-item")

    elems.forEach((elem, pos) => {
        if (pos < didAlready) return;

        const app_id = elem.getAttribute("data-application-id")
        const disc_id = elem.getAttribute("data-discussion-id")

        fetch("https://boards.eune.leagueoflegends.com/api/"+app_id+"/discussions/"+disc_id).then(ret => ret.json()).then(ret => {
            modnames = [];
            if (ret.discussion.user.isModerator) modnames.push(ret.discussion.user.name)
            crawler(ret.discussion.comments)

            if ( modnames.length > 0) {

                let img = document.createElement("img")
                img.src="https://i.imgur.com/ZjcNXjH.png"
                img.style.display = "block-inline"
                img.width = 23
                img.height = 23
                img.style.margin = "4px 0px"
                img.title="Moderátori hozzászólások:\n"
                modnames.forEach((name, pos) => {img.title += (name+((pos != modnames.length-1) ? ", " : ""))})
                elem.querySelector(".riot-commented").appendChild(img)

            }
        })
    })

    didAlready = elems.length;
}

function hook() {
    document.querySelector(".show-more").addEventListener("click", (function() {setTimeout(handle, 4000);}));
}

(function() {
    if (window.location.toString().split("/").length <= 6) {
        setTimeout(()=>{handle(); hook();}, 2000)
    }
})();

//Unused:

/*let adm = */
//img.src="https://i.imgur.com/3rzQhgo.png"
/*ret.discussion.user.isModerator || adm*/
//console.log("[" + elem.querySelector(".title-span").innerText + "]")
                //let txt = document.createElement("span")
                //txt.textContent = "Moderátori hozzászólás"
                //txt.style.display = "block"
//elem.querySelector(".riot-commented").innerText += ((adm[1] == "") ? ret.discussion.user.name : adm[1])

/*
function crawler(comments) {
  let retval = false;
  for (let el of comments.comments) {
      console.log(el.user.name)
    if (el.user.isModerator) {
        if (modnames.indexOf(el.user.name) == -1) modnames.push(el.user.name);
        return true;
    } else {
      if (!retval[0]) {
        retval = crawler(el.replies)
      }
    }
  }

  return retval
}
*/
