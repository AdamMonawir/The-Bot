//import
import { config } from 'dotenv';
import { Client, CommandInteraction, GatewayIntentBits, InteractionCollector, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'
import path from 'path';
import http from 'http';
import express from 'express';
import {setTimeout as wait} from 'node:timers/promises';
import Database from '@replit/database';
import OrderCommand from './commands/order.js'
import PingCommand from './commands/ping.js'
import TerenceCommand from './commands/terence.js'
import TagthemCommand from './commands/tag_them.js'
import BearCommand from './commands/bear.js'
import Random_numberCommand from './commands/random_number.js'
import LinkCommand from './commands/link.js'
import PointCommand from './commands/points.js'

//Database
const db = new Database()

//Haha Joke
let randomn = Math.floor(Math.random() * 11);

//webhost
const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json());
app.use(express.static("express"));
app.use('/', function(req,res){
    res.sendFile(path.join(process.cwd(), './src/template/index.html'));
});

server.listen(port);
console.debug('Server listening on port ' + port);

//.env file
config();

//intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//.env file
const TOKEN = process.env.B_Token
const CLIENT_ID = process.env.Client_ID  
const GUILD_ID = process.env.GUILD_ID

//Rest
const rest = new REST({ version: '10' }).setToken(TOKEN);

//login check
client.once('ready', () => { console.log(`${client.user.username} has logged in`) });

//Command Outputs
async function interction() {
  
  client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {

      //Order Command
      if (interaction.commandName === 'order') {
        const food = interaction.options.get('food').value;
        const drink = interaction.options.get('drink').value;
        interaction.reply({content:`Your order was ${food} and ${drink} pay up`})
        
        //Print to logs
        console.log(interaction.user.username + ` ordered ${food} and ${drink}`)
      }
     
      //Ping Command 
      if (interaction.commandName === 'ping') {
        const random = Math.floor(Math.random() * 101);
        await interaction.reply({content:"Pong"})
        console.log(random)

        //Super Secret Pong
        if (random === 5) {
          let current_point = await db.get(`${message.author.id}_current_point`)
          await interaction.followUp({content:"Super Secret Pong", ephemeral: true})
          await db.set(`${message.author.id}_point`, current_point + 5);
          console.log(`+5 point to ` + interaction.user.id + ` for Super Secret Pong`)
        } 

        //Secret Pong
        else if (random === 3 || random === 4 || random === 6 || random === 13 || random === 14 || random === 16 || random === 23 || random === 24 || random === 26 || random === 33 || random === 34 || random === 36 || random === 43 || random === 44 || random === 46 || random === 53 || random === 54 || random === 56 || random === 63 || random === 64 || random === 66 || random === 73 || random === 74 || random === 76 || random === 83 || random === 84 || random === 86 || random === 93 || random === 94 || random === 96){
          await interaction.followUp({content:"Secret Pong", ephemeral: true})
          await interaction.followUp({content:`+3 point to ` + interaction.user.username + ` for Secret Pong when I am bothered to setup leader boards`, ephemeral: true})
          console.log(`+3 point to ` + interaction.user.id + ` for secret pong`)
          }
      }

      //Terence Command
      if (interaction.commandName === 'terence') {
        const times = interaction.options.get('times').value;
        await interaction.reply({content:"<@268452594924388353> DO YOUR HOMEWORK!!!"})
      
        //Terence Loop
        let i = 0
        console.log("The amount of times the bot will repeat is " + times)
        while (i < times) {
          i++
          await wait(5000);
          await interaction.followUp({content:"<@268452594924388353> DO YOUR HOMEWORK!!!"})
          console.log("This is rotation " + i + " of " + times)
        }
        console.log("The end")
      }
  
      //Tag them Command
      if (interaction.commandName === 'tag_them') {
        const who = interaction.options.get('who').value;
        const repeats = interaction.options.get('repeats').value;
        await interaction.reply({content:interaction.user.username + ` pinged, <@${who}> you must really need them NOW!!!`})
        
        //Tag Loop
        let l = 0
        console.log("The amount of times the bot will repeat is " + repeats)
        while (l < repeats) {
          l++
          await wait(5000);
          await interaction.followUp({content:interaction.user.username + ` pinged, <@${who}> you must really need them NOW!!!`})
          console.log("This is rotation " + l + " of " + repeats)
        }
        console.log("The end")
      }
  
      //Bear Command
      if (interaction.commandName === 'bear') {
        const bear = interaction.options.get('bear').value;
        interaction.reply({content:`Your request was ${bear}`})
    }
      
      //Random number Command
      if (interaction.commandName === 'number') {
        const number = interaction.options.get('number').value;
      
        //Correct
        if(randomn === number) {
          await interaction.reply({content:`GG you were correct`})
          await interaction.followUp({content:`+3 point to ` + interaction.user.username + ` for random number guess when I am bothered to setup leader boards`, ephemeral: true})
          console.log(`+3 point to ` + interaction.user.id + ` for random number guess`)
        }
          
        //Less than 
        else if(randomn > number) {
          await interaction.reply({content:`Get your head out of the gutter`})
        }

        //Greater than
        else if(randomn < number) {
          await interaction.reply({content:`Why are you so high`})
        }
        //Hmm
        else {
          console.log("Ummm")
        }
      }
      //Link Command
      if (interaction.commandName === 'link') {
        interaction.reply({content:`Go to https://personal-discord-bot.melmothe1st.repl.co/ to see who is at the top of the leader board`})
      }
      //Point Command
      if (interaction.commandName === 'points') {
        let points = await db.get(`${message.author.id}_point`)
        interaction.reply({content:`${points}`})
      }
    }
  });
}

interction();

//Main function
async function main() {

  const commands = [OrderCommand, PingCommand, TerenceCommand, TagthemCommand, BearCommand, Random_numberCommand, LinkCommand, PointCommand];

  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands, });



    //Login
    client.login(TOKEN);
  } catch (error) {
    console.error(error);
  }
}

main();