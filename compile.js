var users = [];
for (var key in parts) {
  var part = parts[key]
  parts[key] = part.map(entry => {
    //delete entry.s
    var userId = users.findIndex(v => v.n === entry.n && v.l === entry.l);
    if (userId >= 0) {
      return [userId, entry.t] // users[userId] is the info for user; entry.t is time in seconds
    }
    var n = Object.assign({}, entry);
    delete n.t
    var userId = users.length;
    users[userId] = n;
    return [userId, entry.t]
  })
}
var str = JSON.stringify(users).replace(/"([ntpsl])"/g, '$1');
console.log(str);
var str = JSON.stringify(parts).replace(/"([^"]+)"/g, '\n$1');
console.log(str);