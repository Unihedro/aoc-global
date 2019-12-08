var scores = [];
var feats = [];
for (var key in parts) {
  parts[key].forEach(([user, time], index) => {
    var score = 100 - index;
    scores[user] = (scores[user] || 0) + score;
    if (!feats[user])
      feats[user] = {}
    feats[user][key]=[index, time]
  })
}
var sortedScores = scores.slice().sort((a, b) => b - a);
var rankLookup = {};
sortedScores.forEach((value, index) => rankLookup[value] || (rankLookup[value] = index));

var usersSorted = []; // iterate & insert
for (var id in users) {
  var user  = users[id];
  var score = scores[id];
  var rank  = rankLookup[score];
  var pos   = rank;
  while (usersSorted[pos]) pos++;
  usersSorted[pos] = [user, rank, score, feats[id]]
}
var $out = document.getElementById('out');
var replacements = [
  [/!a(.)/g, '//lh$1.googleusercontent.com/'],
  [/!b(.)/g, '//avatars$1.githubusercontent.com/u/'],
  [/!c/g, '//github.com/'],
  [/!d/g, '//pbs.twimg.com/profile_images/'],
  [/!e/g, '//twitter.com/'],
  [/!f/g, '//www.reddit.com/u/'],
];
function link(text) {
  for (var [from, to] of replacements)
    text = text.replace(from, to);
  return text;
}
for (var e of usersSorted) {
  var extraStats = '';
  if (e[1] < 100) {
    var e3 = Object.entries(e[3]);
    // if podium; show all
    console.log(e3);
    var podium = e3.filter(v => v[1][0] < 3);
    var rank = '';
    if (podium[0]) {
      var list = [[], [], []];
      podium.forEach(v => v[1][0] < 3 && (list[v[1][0]].push(v[0])));
      rank = list.map((v, i) => {
        if (v[0]) { // if any
          return `<span class="${['gold','silver','bronze'][i]} b">${v}</span>`
        }
      }).join('')
    } else {
      var bestRank = e3.map(v=>v[1][0]).sort((a,b)=>a-b)[0];
      var e3k = Object.keys(e[3]);
      var rankList = e3k.filter(k=>e[3][k][0]==bestRank);
      rank = `Best rank: #${bestRank} on ${rankList}`
    }
    var fastest = e3.map(v=>v[1][1]).sort((a,b)=>a-b)[0];
    var time = `Fastest solve: ${fastest} seconds`
    if (fastest < 150) {
      time = `<span class="time-${0 | (fastest / 30)} c">${time}</span>`
    }
    extraStats = `<span class="feats">Scored ${e3.length} times ${rank} ${time}</span>`
  }
  $out.insertAdjacentHTML('beforeend', `<p>${e[1]}) ${e[2]} ${
                          e[0].p ? `<img src="${link(e[0].p)}" height=20 /></img>` : ''
                  }${e[0].n} ${extraStats}</p>`);
}
