//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Points Command
const pointCommand = new SlashCommandBuilder()
    .setName('point')
    .setDescription('I will give you points')

export default pointCommand.toJSON();