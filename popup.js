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
};

function addToLocalStorage() {
  var key = document.getElementById("key");
  var value = document.getElementById("value");
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

};

function renderSaveHTML() {
  return '<input id="key" placeholder="Type key here"/><br>' +
    '<input id="value" placeholder="Type value here"><br>' +
    '<button id="save">Save</button> <button id="cancel">Cancel</button>';
};

function addHTML() {
  return '<button class="btn" id="add">Add</button> ';
};

document.addEventListener('DOMContentLoaded', () => {
  loadListfromLocalStorage();

  var copyBtn = document.querySelector('.copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function (event) {
      var id = this.id;
      var inputelem = document.getElementById("input-" + id);
      inputelem.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    });
  };

  var addBtn = document.getElementById("add");
  if (addBtn) {
    addBtn.addEventListener("click", function (event) {
      var elem = document.getElementById("add-area");
      elem.innerHTML = renderSaveHTML();
      if (key === "" || value === "") {
        alert("Empty key/value not allowed!");
        return;
      }
      addToLocalStorage(key, value);
      loadListfromLocalStorage();
    });
  };
});
