// YOUR CODE HERE:
class Chatterbox {
  constructor() {
    this.server = "http://parse.rpt.hackreactor.com/chatterbox/classes/messages"
    this.username = window.location.search.slice(10);
    this.text = 'text';
    this.roomname = 'roomname';
    this.message = 'messagesesee';
//   this.publishText = '';
//   this.publishUsername = '';
//   this.publishRoomname = '';
    // this.createMessage();
    this.init();
  }

  init(){
    this.listeners();
    setInterval(function() {
      app.fetch.call(app);
    }, 3000);
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
        console.log('chatterbox: Message received');
        console.log('our data = ', data);
        app.renderMessage(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
    }

  clearMessages() {
    $("#chats").empty();
  }

  renderMessage(data) {
   // var data = arguments;
    console.log('this inside render message = ', this);
    console.log('our data.results = ', data["results"][0]);
    //   app.renderMessage.apply(null, data);
    for (var key in data["results"]){
        console.log('data[results][key] :', data["results"][key]);
        console.log('data[results][key][username] :', data["results"][key]["username"]);
        console.log('data[results][key][text] :', data["results"][key]["text"]);
      var publishUsername = data["results"][key]["username"];
      var publishText = data["results"][key]["text"];
      let snippet = $(`<div class ='publishedMessages'><span class='pubusername'>@${publishUsername}</span>: <span class='pubtext'>${publishText}</span></div>`);
      $("#chats").append(snippet);
    };
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
      console.log("create message is running");
      this.text = $("#textmessage").val();
      console.log('our text = ', this.text);
      this.roomname = $("#roomname").val();
      console.log('our roomname = ', this.roomname);
      this.message = {
        username: this.username,
        text: this.text,
        roomname: this.roomname
      };
      console.log('our message = ', this.message);
      this.send(this.message);
    };

    //LISTENERS FUNCTION WITH ACTIONS
    listeners(){
      $(document).ready(function() {
        $("#btn").click(function() {
        console.log("you clicked your button, whoohooo!!!");
          app.createMessage.call(app);
        });
      });
    };
    // console.log("create Message is running");
    // //link the form with the send button

    //   console.log("clicked");


    //upon clicking send
      //send the information within the form to the app.send() function;




  };

const app = new Chatterbox();

