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
  if(divelem==null){
    return;
  }
  var list = "";
  for (var key in ls) {
    // list = list + '<br><button class="copy" id="' + key + '">Copy</button><input type="input" class="input-text" id="input-' + key + '"value="' + ls[key] + '"/><button class="delete-' + key + '" >Delete</button><br>';
    list = list + '<div class="row"><div class="col-lg-6"><div class="input-group entries">' + 
                  '<span class="input-group-btn"><button class="btn btn-secondary" type="button" id="copy-' + key + '"><i class="fa fa-copy"></i></button></span>' + 
                  '<input readonly="true" type="text" class="form-control" value="' + ls[key] + '" id="input-'+ key +'">'+
                  '<span class="input-group-btn"><button class="btn btn-secondary" type="button" id="edit-' + key + '"><i class="fa fa-edit"></i></button></span>' + 
                  '</div></div></div>';
    
    var copyKeyId = "#copy-"+key;
    var editKeyId = "#edit-"+key;

    $(copyKeyId).click(function(){
      console.log("copy clicked for id" + copyKeyId);
    });

    $(editKeyId).click(function(){
      console.log("copy clicked for id" + editKeyId);
    });
  }
  divelem.innerHTML = list;
  $("#key").val("");
  $("#value").val("");

  // add event listeners for the copy and save buttons


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
  
  // will be hidden when DOM loads
  $("#save-area").hide();

  $("#add").click(function () {
    // console.log("add button clicked")
    $("#add-area").hide();
    $("#save-area").show();
  });

  $("#save").click(function () {
    addToLocalStorage();
    
  });
});
