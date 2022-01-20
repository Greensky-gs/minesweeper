const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach((dir) => {
  fs.readdirSync(`./commands/${dir}`).filter((files) => files.endsWith('.js')).forEach((fileName) => {
    const prop = require(`./commands/${dir}/${fileName}`);
    client.commands.set(prop.help.name, prop);
    //Watch out files in the commands directory
  });
});

client.on('message', (message) => {
  const prefix = '!';
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift();
  
  const command = client.commands.get(commandName);
  
  //Here we checks all condition for a command to be runned.
  if (message.author.bot || message.webhookID || !command || !message.content.startsWith(prefix)) return;
  
  const run = new Promise((resolve, reject) => resolve(command.run(message, args, client)));
  run.catch((error) => {
    message.channel.send({ content: `:x: An error was found when command was runned !` });
    console.error(error);
  });
});
