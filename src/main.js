//import
import { config } from 'dotenv';
import { Client, CommandInteraction, GatewayIntentBits, InteractionCollector, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'
import express from 'express';
import {setTimeout as wait} from 'node:timers/promises';
import OrderCommand from './commands/order.js'
import PingCommand from './commands/ping.js'
import TerenceCommand from './commands/terence.js'
import TagthemCommand from './commands/tag_them.js'

//webhost
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send(`The Bot is online`));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

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
const GUILD_ID = process.env.GUILD_ID;

//Rest
const rest = new REST({ version: '10' }).setToken(TOKEN);

//login check
client.once('ready', () => { console.log(`${client.user.username} has logged in`) });

//Interaction
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
        await interaction.reply({content:"Pong"})

        //Time to Gaslight
        console.log("Begin Gaslight")
        await wait(4000);
        console.log("Gaslight sent, confusion begins")
        await interaction.followUp({content:"Shhh I don't exist sh you are insane, PONG!", ephemeral: true})
      }

      //Terence Command
      if (interaction.commandName === 'terence') {
        const times = interaction.options.get('times').value;
        await interaction.reply({content:"<@268452594924388353> DO YOUR HOMEWORK!!!"})
      
       //Loop
        let i = 0
       let n = 1
       while (i < times) {
         i++
         await wait(5000);
          await interaction.followUp({content:"<@268452594924388353> DO YOUR HOMEWORK!!!" + i})
       }
     }
  
      //Tag them Command
      if (interaction.commandName === 'tag_them') {
        const who = interaction.options.get('who').value;
        interaction.reply({content:interaction.user.username + `   pinged, <@${who}> you must really need them NOW!!!`})
      }
  
      //[PLACE_HOLDER] Command
      
    }
  });
}

interction();

//Main function
async function main() {

  const commands = [OrderCommand, PingCommand, TerenceCommand, TagthemCommand];

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