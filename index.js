const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  setInterval(() => {
    if (
      new Date().getHours() == "00" &&
      new Date().getMinutes() == "00" &&
      new Date().getSeconds() == "00"
    ) {
      client.getChats().then((chats) => {
        const group = chats.find((chat) => chat.name.includes("Crazy people"));
        client.sendMessage(group.id._serialized, "Good morning");
      });
    }
  }, 1000);
});

client.on("message", (message) => {
  if (message.body.toLowerCase().includes("hi")) {
    message.reply("hi");
  } else if (message.body.toLowerCase().includes("thank")) {
    message.reply("most welcome");
  } else if (
    message.body.toLowerCase().includes("happy") &&
    message.body.toLowerCase().includes("birth")
  ) {
    message.reply("Thank you 😄");
  } else if (message.body.toLowerCase().includes("good")) {
    if (message.body.toLowerCase().includes("morning")) {
      message.reply("Good morning");
    } else if (message.body.toLowerCase().includes("afternoon")) {
      message.reply("Good afternoon");
    } else if (message.body.toLowerCase().includes("evening")) {
      message.reply("Good evening");
    } else if (message.body.toLowerCase().includes("night")) {
      message.reply("Good night, sweet dreams");
    }
  } else if (
    message.body.toLowerCase().includes("happy") &&
    message.body.toLowerCase().includes("diwali")
  ) {
    message.reply("Happy Diwali");
  }
});

client.initialize();
