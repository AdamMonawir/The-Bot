//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Order Command
const bearCommand = new SlashCommandBuilder()
    .setName('bear')
    .setDescription('Order your favourite meal!')

    //bear option
    .addStringOption((option) => option
      .setName('bear')
      .setDescription('Select your bear')
      .setRequired(true)
      .setChoices(
        {name: 'Talking Bear', value: 'Talking Bear'}, 
        {name: 'Question Bear', value: 'Question Bear'}, 
        {name: 'Pro Bear', value: 'Pro Bear'},
        {name: 'Con Bear', value: 'Con Bear'},
        {name: 'Leaving Bear', value: 'Leaving Bear'},
        {name: 'Joke Steal Bear', value: 'Joke Steal Bear'},
        {name: 'Swear Bear', value: 'Swear Bear'},
        {name: 'Disagree Bear', value: 'Disagree Bear'},
        {name: 'Agree Bear', value: 'Agree Bear'}
      )
    )
export default bearCommand.toJSON();