var e = document.getElementsByClassName('leaderboard-entry')
var a = []
for (var i = 0; i < 100; i++) {
  var $children = e[i].children;
  var time = $children[1].innerText.match(/\S+$/)[0].split(':');
  time = (time[0] * 60 + +time[1]) * 60 + +time[2];
  e[i].removeChild($children[0]);
  e[i].removeChild($children[0]);
  var anon = $children[1] && $children[1].className == 'leaderboard-anon'
  var supporter = $children[anon ? 2 : 1] && $children[anon ? 2 : 1].className == 'supporter-badge'
  if (supporter) {
    e[i].removeChild($children[anon ? 2 : 1]);
  }
  var sponsor = $children[1] && $children[1].className == 'sponsor-badge'
  if (sponsor) {
    sponsor = {l: $children[1].href, n: $children[1].title.match(/\S+$/)[0]}
    e[i].removeChild($children[1]);
  }

  var name = e[i].innerText.trim();
  //var user = {n: name, t: time, s: 100 - i};
  var user = {n: name, t: time};

  if(supporter)   user['+'] = 1
  if(sponsor)     user['$'] = sponsor
  var link = $children[0].href;
  if(!anon){
  var photo = link ? $children[0].firstChild.firstChild && $children[0].firstChild.firstChild.src : $children[0].firstChild && $children[0].firstChild.src;
  if(photo)       user.p = photo
  }
  if(link)        user.l = link
  a[i]=user
}
//console.log(a)
var replacements = [
  [/"([ntpsl])"/g, '$1'],
  [/https?:(?=\/\/)/g, ''],
  [/\/\/lh(\d)\.googleusercontent\.com\//g, '!a$1'],
  [/\/\/avatars(\d)\.githubusercontent\.com\/u\//g, '!b$1'],
  [/\/\/github\.com\//g, '!c'],
  [/\/\/pbs\.twimg\.com\/profile_images\//g, '!d'],
  [/\/\/twitter\.com\//g, '!e'],
  [/\/\/www\.reddit\.com\/u\//g, '!f'],
];
var str = JSON.stringify(a);

for (var [from, to] of replacements)
  str = str.replace(from, to);

console.log(str)