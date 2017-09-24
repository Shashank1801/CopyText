var LS_NAME = "copy-list"
function loadListfromLocalStorage() {
  var ls = localStorage.getItem(LS_NAME);
  ls = JSON.parse(ls);
  //console.log(ls);
  if (ls == null) {
    return;
  }
  var i;
  var divelem = document.getElementById("text-list");
  var list = "";
  for (var key in ls) {
    list = list + '<br><button class="copy" id="' + key + '">Copy</button><input type="input" class="input-text" id="input-' + key + '"value="' + ls[key] + '"/><button class="delete-' + key + '" >Delete</button><br>';
  }
  divelem.innerHTML = list;
  $("#key").val("");
  $("#value").val("");

};

function addToLocalStorage() {
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;
  if(key=="" || value==""){
    return;
  }
  var ls = localStorage.getItem(LS_NAME);
  if (ls != null) {
    ls = JSON.parse(ls);
  } else {
    ls = {}
  }
  ls[key] = value;
  //console.log(ls);
  ls = JSON.stringify(ls);
  localStorage.setItem(LS_NAME, ls);
  $("#add-area").show();
  $("#save-area").hide();
  loadListfromLocalStorage();
};

function renderSaveHTML() {
  return '<input id="key" placeholder="Type key here"/><br>' +
    '<input id="value" placeholder="Type value here"><br>' +
    '<button id="save">Save</button> <button id="cancel">Cancel</button>';
};

function addHTML() {
  return '<button class="btn" id="add">Add</button> ';
};


$(document).ready(function () {
  loadListfromLocalStorage();
  
  $("#add").click(function () {
    $("#add-area").hide();
    $("#save-area").show();
  });

  $("#save").click(function () {
    addToLocalStorage();
    
  });
});
