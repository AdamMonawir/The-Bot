//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Ping Command
const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Will I pong')

export default pingCommand.toJSON();