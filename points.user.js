// ==UserScript==
// @name         LoL Boards Profile Points
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Megmutatja hány pontot kaptak a kommentjeid és posztjaid.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/player/*/*
// @grant        none
// ==/UserScript==

let postnum = 0
let commnum = 0

function crawler(root, sought) {
  let retval = undefined;
  for (let elem in root) {
    if (root[elem].id == sought) {
      retval = root[elem]
      break;
    }
  }

  if (retval !== undefined) return retval

  for (let elem in root) {
    const ret = crawler(root[elem].replies.comments, sought)
    if (ret !== undefined) return ret
  }

  return undefined
}

function addToHeader(root, up, down) {
  root.innerHTML += `
    <div class = 'right'>
      <center>
      <p style = 'display: inline; color: green; font-size: larger'>${up}</p>
      <p style = 'display: inline; color: orange; font-size: larger'>/</p>
      <p style = 'display: inline; color: red; font-size: larger'>${down}</p>
      <br>
      <p style = 'display: inline; color: darkorange; font-size: larger'>[${up - down}]</p>
      </center>
    </div>`
}

function handleComments(from) {
    const comments = [...document.querySelectorAll(".comment-row")]
    commnum = comments.length
    comments.splice(0, from)

    comments.forEach(comm => {
        const comment_list_item = comm.querySelector(".comment-list-item")
        const discID = comment_list_item.getAttribute("data-discussion-id")
        const commentID = comment_list_item.getAttribute("data-comment-id")
        const appID = comment_list_item.getAttribute("data-application-id")
        const APIsite = `https://boards.eune.leagueoflegends.com/api/${appID}/discussions/${discID}`

        fetch(APIsite).then(raw => raw.json()).then(resp => {
            const root = resp.discussion.comments.comments
            const comm_api = crawler(root, commentID)

            //console.log(comm_api.upVotes - comm_api.downVotes, comm_api.upVotes, comm_api.downVotes)
            const up = comm_api.upVotes
            const down = comm_api.downVotes
            addToHeader(comm.querySelector(".header.byline.clearfix"), up, down)

        })
    })
}

function handlePosts(from) {
    const posts = [...document.querySelectorAll(".discussion-list-item")]
    postnum = posts.length
    posts.splice(0, from)

    posts.forEach(post => {
        const discID = post.getAttribute("data-discussion-id")
        const appID = post.getAttribute("data-application-id")
        const APIsite = `https://boards.eune.leagueoflegends.com/api/${appID}/discussions/${discID}`

        fetch(APIsite).then(raw => raw.json()).then(resp => {
            addToHeader(post.querySelector(".riot-commented"), resp.discussion.upVotes, resp.discussion.downVotes)
        })
    })
}


(function() {
    'use strict';

    handleComments(0)
    handlePosts(0)
    document.querySelector(".show-more.box").addEventListener("click", () => {
        setTimeout(() => {
            handleComments(commnum)
            handlePosts(postnum)
        }, 3000)
    })

    // Your code here...
})();
