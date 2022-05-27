
function sortme(array){
    array.sort(function (a, b) {
     return a.toLowerCase().localeCompare(b.toLowerCase());
 })
  return console.log(array);
 }

 module.exports.sortme = sortme;