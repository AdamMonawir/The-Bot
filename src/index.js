//import
import { config } from 'dotenv';
import { Client, CommandInteraction, GatewayIntentBits, InteractionCollector, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'

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
client.once('ready', () =>{console.log(`${client.user.username} has logged in`)});
//message check
//client.on('messageCreate', (message) => {console.log(message.content)});

//Interaction
client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        console.log('Hello World');
        interaction.reply({ content: `Your order was ${interaction.options.getString('food')} pay up`
    })
    }

});

//Commands
async function main() {
    const commands = [
        {
            name:'order',
            description: 'Order something..',
            options: [
            {
                name: 'food',
                description: 'the type of food',
                type: 3,
                required: true,
            }
        ],
    },
];
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