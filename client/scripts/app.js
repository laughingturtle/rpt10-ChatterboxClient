// YOUR CODE HERE:
class Chatterbox {
  constructor() {
    this.server = "http://parse.rpt.hackreactor.com/chatterbox/classes/messages"
    this.username = window.location.search.slice(10);
    this.text = 'text';
    this.roomname = 'roomname';
    this.message = 'messagesesee';
    // this.init();
  }

  init(){
    //$(document).ready(function() {
    // setInterval(function() {
    // this.fetch();
    // }, 3000);
    //});
  }


  //THIS WAS INSIDE OF OUR SEND FUNCTION <==============
  // send(){
  //   // escape text in form to protect against xss attack
  //   console.log("you clicked me!!!");
  //   //
  //   this.message = $("#msgs").serializeArray().reduce(function(obj, item){
  //     obj[item.name] = item.value;
  //     return obj;
  //   }, {});
  //   this.message.username = this.username;
  //   console.log('our message: ', this.message);


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
  // setInterval(function() {
    $.ajax({
      url: this.server,
      type: 'GET',
      // data: JSON.stringify(message),
      data: 'order=-createdAt',
      // data: {"order":"-createdAt", "group": "chatroom"},
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received');
        console.log('data', data)
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  // }, 1000);
  }

  clearMessages() {
    $("#chats").empty();
  }

  renderMessage() {
    let div = $("<div></div>");
    $("#chats").append(div);
  }

  renderRoom() {
    let div = $("<div></div>")
    $("#roomSelect").append(div);
  }

  //ADD A FRIEND UPON CLICKING THEIR USERNAME;
  addFriend(){

  };

  //CREATE A MESSAGE UPON CLICKING SEND
  createMessage(){
    //link the form with the send button
    $("#btn").click(function(){
      console.log("clicked");
      this.text = $("#textmessage").val();
      console.log(this.text);
      this.roomname = $("#roomname").val();
      console.log(this.roomname);
    });
    //upon clicking send
      //send the information within the form to the app.send() function;
    this.message = {
      username: this.username,
      text: this.text,
      roomname: this.roomname
    };
    console.log(this.message);
    this.send(this.message);
  };


  };

const app = new Chatterbox();


//add a textBox to html with a button;
//send contents to parse;
//escape input before sending;
//get parse stream;
//place in ID Chats (<div id="chats"></div>);

//add drop down for rooms;
//allow users to create their own rooms and enter others;
//allow users to friend other users;
//display all messages sent by friends in bold;
//allow users to create their own name
//allow users to send messages
//set up a way to refresh messages either automatically or with a button
//
