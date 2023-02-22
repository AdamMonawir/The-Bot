//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Terence Command
const terenceCommand = new SlashCommandBuilder()
    .setName('terence')
    .setDescription('Will scream at terence to do his homework')

    //Times
    .addNumberOption((option) => option
      .setName('times')
      .setDescription('Select your favourite food')
      .setRequired(true)
    )
      
export default terenceCommand.toJSON();