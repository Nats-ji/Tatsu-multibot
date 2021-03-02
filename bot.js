const Discord = require("discord.js");
const config = require('./config.json');
const messages = require('./messages.json')
var { parseArgsStringToArgv } = require('string-argv');

var su = null;
var maxMessages = null;
var timeToWait = null, minTime = 2000, maxTime = 4350;
var content = null;
var prune = false;
var stop = false;
var bet = 1;
var cookieto = null;

for (const token of config.botToken) {
  let count = 1;
  const client = new Discord.Client();
  client.config = config;

  try {
    client.on("message", async message => {
      if (message.content.indexOf(client.config.prefix) !== 0) return;
      const member = message.author;
      const prefix = config.prefix;
      const args = message.content.slice(prefix.length).trim();
      setCmdValues(args);
      if (su != null && su != "all" && su != client.user.username && su != message.guild.member(client.user).nickname) return;

      if (command === 'say') {
      	say(msg);
      }

      if (command === "fish") {
        if (!maxMessages)
          maxMessages = 250;
        function sendFishy() {
          console.clear();
          console.log(`Afk fishing, current run ${count}/${maxMessages}.`);
          message.channel.send("t!fish");

          if (count < maxMessages && !stop) {
            count++;
            timeToWait = Math.floor(Math.random() * 1500) + 30500;
            setTimeout(sendFishy, timeToWait);
          } else {
            count = 1;

            prune = false;
            console.log("Afk fishing finished.");
          }
        }


        sendFishy();
      }

      if (command === "sellfish") {
        console.clear();
        console.log("Selling all fish.");
        let sell = 1;
        function sendsell() {
          if (sell == 1) {
            message.channel.send("t!fish sell common");
            console.log("Sold all common fish.");
            sell++;
          } else if (sell == 2) {
            message.channel.send("t!fish sell uncommon");
            console.log("Sold all uncommon fish.");
            sell++;
          } else if (sell == 3) {
            message.channel.send("t!fish sell garbage");
            console.log("Sold all trash.");
            sell = 1;
            count++;
          }

          if (count <= 1 && !stop) {
            timeToWait = Math.floor(Math.random() * 1500) + 5500;
            setTimeout(sendsell, timeToWait);
          } else {
            count = 1;
            prune = false;
            console.log("Sold all inventory.");
          }
        }


        sendsell();
      }

      if (command === "train") {
        if (!maxMessages)
          maxMessages = 170;
        function sendTrain() {
          console.clear();
          console.log(`Afk training pet, current run ${count}/${maxMessages}.`);
          message.channel.send("t!tg train");

          if (count < maxMessages && !stop) {
            count++;
            timeToWait = Math.floor(Math.random() * 1500) + 5500;
            setTimeout(sendTrain, timeToWait);
          } else {
            count = 1;

            prune = false;
            console.log("Finished");
          }
        }


        sendTrain();
      }

      if (command === "walk") {
        if (!maxMessages)
          maxMessages = 25;
        let walk = 1;
        function sendWalk() {
          console.clear();
          console.log(`Afk walking pet, current run ${count}/${maxMessages}.`);
          if (walk == 1) {
            message.channel.send("t!tg walk");
            walk++;
          } else if (walk == 2) {
            message.channel.send("t!tg walk");
            walk++;
          } else if (walk == 3) {
            message.channel.send("t!tg feed");
            walk = 1;
            count++;
          }

          if (count <= maxMessages && !stop) {
            timeToWait = Math.floor(Math.random() * 1500) + 5500;
            setTimeout(sendWalk, timeToWait);
          } else {
            count = 1;

            prune = false;
            console.log("Finished");
          }
        }


        sendWalk();
      }

      if (command === "slot") {
        if (!maxMessages)
          maxMessages = 100;
        function sendSlot() {
          console.clear();
          console.log(`Afk playing slot. Betting ${bet} Credit(s) each run, current run ${count}/${maxMessages}.`);
          message.channel.send(`t!slot ${bet}`);

          if (count < maxMessages && !stop) {
            count++;
            timeToWait = Math.floor(Math.random() * 1500) + 5500;
            setTimeout(sendSlot, timeToWait);
          } else {
            count = 1;
            bet = 1;

            prune = false;
            console.log("Finished");
          }
        }


        sendSlot();
      }

      if (command === "cookie") {
        if (!maxMessages)
          maxMessages = 10;
        function sendCookie() {
          let touser = null;
          if (cookieto && cookieto != "random")
            touser = cookieto;
          else
            touser = message.guild.members.random().user.username;
          console.clear();
          console.log(`Afk sending cookies. Sending to ${touser}, current run ${count}/${maxMessages}.`);
          message.channel.send(`t!cookie ${touser}`);

          if (count < maxMessages && !stop) {
            count++;
            timeToWait = Math.floor(Math.random() * 1500) + 5500;
            setTimeout(sendCookie, timeToWait);
          } else {
            count = 1;
            cookieto = null;

            prune = false;
            console.log("Finished");
          }
        }


        sendCookie();
      }

      if (command === "level") {
        if (!maxMessages)
        maxMessages = 200;

        function getRandomInt(min, max) {
          // Maximum exclusive and minimum inclusive
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min) + min);
        }

        function sendLevel() {
          let content = messages[getRandomInt(0, messages.length)];
          console.clear();
          console.log(`Afk leveling up, current run ${count}/${maxMessages}.`);
          console.log(`Message sent: ${content}`);
          message.channel.send(content);

          if (count < maxMessages && !stop) {
            count++;
            timeToWait = Math.floor(Math.random() * 10000) + 120500
            setTimeout(sendLevel, timeToWait);
          } else {
            count = 1;
            console.log("Finished");
          }
        }


        sendLevel();
      }

      function say(msg) {
        message.channel.send(msg);
      }

      function prune() {
        if (message.channel.lastMessage.author != client.user) return;
        message.channel.fetchMessages()
        .then(messages => {
          let message_array = messages.array();
          message_array.length = 1;
          message_array.map(msg => msg.delete().catch(O_o => {}));
        }).catch(console.error);
      }
    });
  } catch (error) {
    console.error("CAUGHT ERROR =>", error);
  }

  client.login(token);
}


function setCmdValues(cmd) {
  var args = parseArgsStringToArgv(cmd);
  var argLength = args.length;
  command = args[0];
  let j = 1;
  su = null;
  maxMessages = null;
  timeToWait = null, minTime = 2000, maxTime = 4350;
  content = null;
  prune = false;
  stop = false;
  bet = 1;
  cookieto = null;
  if (command == "su") {
    su = args[1];
    j = 2;
    command = args[2];
  }
  for (j; j < argLength; j++) {
    let argsLeft = j + 1 < argLength;
    let arg = args[j];
    let nextArg = args[j + 1];

    if (argsLeft) {
      if (arg == "count")
        maxMessages = nextArg;
      if (command == "slot" && arg == "bet")
        bet = nextArg;
      if (command == "cookie" && arg == "to")
        cookieto = nextArg;
      if (command == "say") {
        if (arg == "msg")
          msg = nextArg;
      }
    }
    if (command == "say" && arg !="msg")
      msg = arg;
    if (arg == "prune") {
      prune = true;
    }
  }
}
