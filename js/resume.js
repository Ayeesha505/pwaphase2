var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);

}
var request;

var idb=window.indexedDB||window.mozIndexedDB|| window.msIndexedDB||window.webkitIndexedDB;
 var open=idb.open("StoreData",1);
console.log("indexedDB is created");

open.onupgradeneeded=function (event) {
  var request=event.target.result;

var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});

}

open.onerror=function (error) {
  console.log("object store is not creates",+error);
}
open.onsuccess=function (event) {
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
  transaction.objectStore("Formdata");
  var storeDB=transaction.objectStore("Formdata");


var info=storeDB.get(paramValue);
info.onsuccess=function (data) {
  console.log(data.target.result);
  display(data.target.result);
resume(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  var img=document.createElement("img");

  img.src="images/girl.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var mail=document.createElement("h3");
  mail.textContent=data.email;
  left.append(mail);


}
function resume(data) {
  var career=document.createElement("h1");
  career.textContent="career objective";
  right.append(career);
  var car=document.createElement("p");
  car.textContent=data.career;
  right.append(car);
  var head1=document.createElement("h1");
  head1.textContent="education details";
  right.append(head1);
  var table=document.createElement("table");

      let row='';
        row +="<tr><th>"+"college"+"</th>"+
        "<th>"+"degree"+"</th>"+
        "<th>"+"branch"+"</th>"+
        "<th>"+"marks"+"</th></tr>";

      for (i in data.education){
        row +="<tr><td>"+data.education[i]. college+"</td>"+
        "<td>"+data.education[i].degree +"</td>"+
        "<td>"+data.education[i].branch+"</td>"+
        "<td>"+data.education[i].marks+"</td></tr>";
}
table.innerHTML=row  ;
right.append(table);
}
