//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Ping Them Command
const tagthemCommand = new SlashCommandBuilder()
    .setName('tag_them')
    .setDescription('Ping who you wish')

  //Person tagged
    .addUserOption((option) => option
      .setName('who')
      .setDescription('Select your least favourite person')
      .setRequired(true)
    )

  //Times tagged
    .addNumberOption((option) => option
      .setName('repeats')
      .setDescription('How many times do they get tagged')
      .setRequired(true)
    )

export default tagthemCommand.toJSON();