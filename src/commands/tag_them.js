//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Ping Them Command
const tagthemCommand = new SlashCommandBuilder()
    .setName('tag_them')
    .setDescription('Ping who you wish')

    .addUserOption((option) => option
      .setName('who')
      .setDescription('Select your least favourite person')
      .setRequired(true)
    )

export default tagthemCommand.toJSON();