//import
import { SlashCommandBuilder } from '@discordjs/builders';

//link Command
const linkCommand = new SlashCommandBuilder()
    .setName('link')
    .setDescription('I will send the link to the leaderboards')

export default linkCommand.toJSON();