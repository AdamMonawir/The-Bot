//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Random Number Command
const random_numberCommand = new SlashCommandBuilder()
    .setName('number')
    .setDescription('Can you guess the number')

    //Number
    .addNumberOption((option) => option
      .setName('number')
      .setDescription('Guess the number')
      .setRequired(true)
    )
      
export default random_numberCommand.toJSON();