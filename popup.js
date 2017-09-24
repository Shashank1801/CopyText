// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

var LS_NAME = "copy-list"
function loadListfromLocalStorage(){
		var ls = localStorage.getItem(LS_NAME);
		ls = JSON.parse(ls);
		//console.log(ls);
		if(ls==null){
			return;
		}
		var i;
		var divelem = document.getElementById("text-list");
		var list="";
		for(var key in ls){
			list = list + '<br><button class="copy" id="' + key + '">Copy</button><input type="input" class="input-text" id="input-'+key+'"value="'+ ls[key]+'"/><button class="delete-'+ key +'" >Delete</button><br>';
		}
		divelem.innerHTML = list;
};

function addToLocalStorage(){
  var ls = localStorage.getItem(LS_NAME);
  var key = document.getElementById("key").value;
  var value = document.getElementById("value").value;
  if(key=="" || value==""){
    alert("Empty key/value not allowed!")
  }

  if(ls!=null){
    ls = JSON.parse(ls);
  }else{
    ls = {}
  }
  ls[key] = value;
  //console.log(ls);
  ls = JSON.stringify(ls);
  localStorage.setItem(LS_NAME, ls);
  loadListfromLocalStorage();  
};

function renderSaveHTML(){
  return  '<input id="key" placeholder="Type key here"/><br>' + 
          '<input id="value" placeholder="Type value here"><br>' + 
          '<button id="save" onClick="addToLocalStorage()">Save</button> <button id="cancel">Cancel</button>';
}

function addHTML(){
  return '<button class="btn" id="add">Add</button> ';
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
	
	loadListfromLocalStorage();
	
	var copyBtn = document.querySelector('.copy');
	//var saveBtn = document.getElementsByClassName();
	if(copyBtn){
    copyBtn.addEventListener('click', function(event) {
      var id = this.id;
      var inputelem = document.getElementById("input-"+id);
      inputelem.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
      console.log('Oops, unable to copy');
      }
    });
  }
  
  var addBtn = document.getElementById("add");  
  if(addBtn){
    addBtn.addEventListener("click", function(event){
      var elem = document.getElementById("add-area");
      elem.innerHTML = renderSaveHTML();
      if(key==="" || value===""){
        alert("Empty key/value not allowed!");
        return;
      }
    });
  }
  
  var saveBtn = document.getElementById("save");
  
  });
});
