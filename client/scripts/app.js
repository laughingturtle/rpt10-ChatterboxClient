// YOUR CODE HERE:
  var app = {};
  app.server = "http://parse.rpt.hackreactor.com/chatterbox/classes/messages"

  app.init = function(){
    $( document ).ready(function() {
      $("#btn").click(function(){
        this.send();
      });
  });
    // document.getElementById("btn").addEventListener("click", this.send);
  }

  //LOOK AT SPEC RUNNER ON THIS ONE & DESIRED STRUCTURE
  app.send = function() {
    //escape text in form to protect against xss attack
    console.log("you clicked me!!!");
    //
  //   var message = $("#msgs").serializeArray().reduce(function(obj, item){
  //     obj[item.name] = item.value;
  //     return obj;
  // }, {});
  //     console.log('our message: ', message);

    var message = {
      text: 'It\'s good to be the king',
      roomname: 'lobby',
      username: 'Mel Brooks'
    };

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };


  app.fetch = function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
    });
  }

  app.clearMessages = function() {
    $("#chats").empty();
  }

//RANDY ADDED
  app.renderMessage = function() {
    var div = $('<div></div>');
    // div.text(message.text);
    $('#chats').append(div);
  }

//RANDY ADDED
  app.renderRoom = function() {
    var el = $('<div>');
    $('#roomSelect').append(el);
  }

// app.init();

// function foo(){
//   console.log("foo!");
// }

//add a textBox to html with a button;
//send contents to parse;
//escape input before sending;
//get parse stream;
//place in ID Chats (<div id="chats"></div>);

//add dropdown for rooms;
//allow users to create their own rooms and enter others;
//allow users to friend other users;
//display all messages sent by friends in bold;
//allow users to create their own name
//allow users to send messages
//set up a way to refresh messages either automatically or with a button
//


//copy config.example.js;
//rename copy to config.js;
//repoint Information to given in Slack;

// $.ajaxPrefilter(function (settings, _, jqXHR) {
//     jqXHR.setRequestHeader('X-Parse-Application-Id', '28D19FA3745BA5570D04B4C37461926637EB45FF');
//     jqXHR.setRequestHeader('X-Parse-REST-API-Key', 'D89B0AB80513AA4936590C82C75F81E80C2BF4E3');
//   });

//http://parse.RPT10.hackreactor.com/chatterbox/classes/messages  <======
