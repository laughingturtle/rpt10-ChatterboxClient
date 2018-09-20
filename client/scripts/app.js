 // YOUR CODE HERE:
class Chatterbox {
  constructor() {
    this.server = "http://parse.rpt.hackreactor.com/chatterbox/classes/messages"
    this.username = window.location.search.slice(10);
    this.text = 'text';
    this.roomname = 'roomname';
    this.currentRoom = 'Lobby';
    this.message = 'messagesesee';
    this.publishUsername = 'test';
    this.publishText = 'test';
//   this.publishText = '';
//   this.publishUsername = '';
//   this.publishRoomname = '';
    // this.createMessage();
    this.rooms = [];
    this.friends = [];
    this.newRoomName = 'newroomname';
    this.dropdown = '';
    this.init();
  }

  init(){
    this.listeners();
    setInterval(function() {
      app.fetch.call(app);
    }, 10000);
  }

  send(message){
    // escape text in form to protect against xss attack
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message = ', message); //tester
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

fetch(){
  $.ajax({
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt',
    // data: {"order":"-createdAt", "group": "chatroom"},
    contentType: 'application/json',
    success: function (data) {
      app.clearMessages.call(app);
      console.log('chatterbox: Message received');
      console.log('our data = ', data);
      app.prepareMessage(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to receive message', data);
    }
  });
}

  prepareMessage(data){
      for (var key in data["results"]){
        console.log('data[results][key] :', data["results"][key]);
        console.log('data[results][key][username] :', data["results"][key]["username"]);
        console.log('data[results][key][text] :', data["results"][key]["text"]);
        console.log('this', this);
      this.publishUsername = this.encodeHTML(data["results"][key]["username"]);
      this.publishText = this.encodeHTML(data["results"][key]["text"]);
      // let snippet = $(`<div class='publishedMessages'><span class='pubusername'>@${this.publishUsername}</span>:- <span class='pubtext'>${this.publishText}</span></div>`);
      let snippet = $(`<div class='publishedMessages'><span class='pubusername'><a href="#${this.publishUsername}" class="pubUsername2">@${this.publishUsername}</a></span>:- <span class='pubtext'>${this.publishText}</span></div>`);
      if(this.publishUsername !== undefined && this.publishText !== undefined){
        //XSS METHOD CALLBACK
      if(this.publishText.includes("&lt;") !== true && this.publishText.includes("('") !== true && this.publishText.includes("$(") !== true){
          $("#chats").append(snippet);
        }
      }
    };
    $(document).ready(function() {
      $(".pubUsername2").click(function() {
        console.log("you clicked on username");
        app.addFriend.call(app);
      });
    });
  }

  clearMessages() {
    $("#chats").empty();
  }

  // renderMessage(data) {
  //   // var data = arguments;
  //   // console.log('this inside render message = ', this);
  //   // console.log('our data.results = ', data["results"][0]);
  // }

  renderMessage(data) {
    var div = $('<div></div>');
    div.text(message.text);
    $("#chats").append(div);
    // $('#chats').append('<div class="chat">' + '<span class="username" data-user></span></div>');
  }

  renderRoom() {
    let div = $("<div></div>")
    $("#roomSelect").append(div);
  }


  createNewRoom(){
    this.newRoomName = $("#newRoomName").val();
    if(this.newRoomName !== ''){
      this.rooms.push(this.newRoomName);
      console.log(this.rooms);
      this.populateDropdown();
    }
  }




  changeRoom(){
    this.currentRoom = $("#roomsDropDown").val();
    this.roomname = $("#roomsDropDown").val();
    $('#roomname').val(this.roomname);
    $('#roomname').val(this.roomname);
    $('#currRoomInner').text(this.currentRoom);
  }




  populateDropdown(){
    for(var i = 0; i < this.rooms.length; i++){
      var val = this.rooms[i];
      this.dropdown = $(`<option value='${val}'>${val}</option>`);
      $("#roomsDropDown").append(this.dropdown);
    }
  }


  //ADD A FRIEND UPON CLICKING THEIR USERNAME;
  addFriend(){
    var newFriend = $(".pubUsername2").val();
    if(newFriend !== ""){
      console.log('this in the addFriends method = ', this);
      this.friends.push(newFriend);
    }
    console.log('our friends array = ', this.friends);
  };


  //CREATE A MESSAGE UPON CLICKING SEND
  createMessage(){
      // console.log("create message is running");
      this.text = $("#textmessage").val();
      // console.log('our text = ', this.text);
      this.roomname = $("#roomname").val();
      // console.log('our roomname = ', this.roomname);
      this.message = {
        username: this.username,
        text: this.text,
        roomname: this.roomname
      };
      // console.log('our message = ', this.message);
      this.send(this.message);
    };


    //LISTENERS FUNCTION WITH ACTIONS
    listeners(){
      $(document).ready(function() {
        $("#btn").click(function() {
        console.log("you clicked your message submit button, whoohooo!!!");
          app.createMessage.call(app);
        });
        $("#btn2").click(function() {
        console.log("you clicked your add room button");
          app.createNewRoom.call(app);
        });
        $("#btn3").click(function() {
        console.log("you clicked your change room button");
          app.changeRoom.call(app);
        });
      });
    };

    //XSS ESCAPE METHOD
    encodeHTML(data){
      console.log('ssssssssssssssssss = ', data);
      if(data !== undefined){
        return data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/%20/g, ' ');
      }
    }
    // console.log("create Message is running");
    // //link the form with the send button
    //   console.log("clicked");

    //upon clicking send
    //send the information within the form to the app.send() function;

  };

const app = new Chatterbox();
/*
errors
- code is continually adding the same posts the page, over and over. Is not updating with new ones. - page refresh? or view refresh?

refactor to pass the following tests:

1) chatroom behavior - should be able to clear messages from the DOM.
2) should try to send a message upon clicking submit.
 */

/*
fix fetch / loading so new posts show up and only new posts are posted.
refresh displayed messages

refactor to pass the following tests:

1) chatroom behavior - should be able to clear messages from the DOM.
2) should try to send a message upon clicking submit.

refactor code for es6

Add new functionality:
xss escape / parse data before we post it to the page.
issue xss attack

-- add rooms as per learn spec
-- add socializing options as per learn spec

*/