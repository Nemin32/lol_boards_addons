// ==UserScript==
// @name         LoL Boards Average Posts per Day
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows you how many posts you post a day on average.
// @author       Nemin
// @match        https://boards.eune.leagueoflegends.com/hu/player/*/*
// @grant        none
// ==/UserScript==

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

//jshint ignore: start
async function getCommPerDay(name) {
  let fetch_comments = await fetch("https://boards.eune.leagueoflegends.com/hu/player/eune/" + name + "?json_wrap=1&content_type=comment").then(resp => resp.json());
  let fetch_date = await fetch("https://boards.eune.leagueoflegends.com/api/users/eune/" + name).then(resp => resp.json());

  let numComm = fetch_comments["searchResultsCount"];
  let regist_date = new Date(fetch_date["createdAt"]);

  let days = days_between(new Date, regist_date);

  return (+(numComm/days).toFixed(2));
}
//jshint ignore: end

getCommPerDay(document.querySelectorAll(".players-profile-title")[1].innerHTML).then(val => document.querySelector(".lifetime-upvotes").innerHTML += "<br>(kb. " + val + " / nap)");
