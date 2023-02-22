//import
import { SlashCommandBuilder } from '@discordjs/builders';

//Order Command
const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favourite meal!')

    //Food option
    .addStringOption((option) => option
      .setName('food')
      .setDescription('Select your favourite food')
      .setRequired(true)
      .setChoices(
        {name: 'Cake', value: 'Cake',}, 
        {name: 'Hamburger', value: 'Hamburger',}, 
        {name: 'Pizza', value: 'Pizza',}
      )
    )

      //Drink option
      .addStringOption((option) => option
        .setName('drink')
        .setDescription('Select a drink to pair')
        .setRequired(true)
        .setChoices(
          {name: 'Water', value: 'Water',},
          {name: 'Coca-Cola', value: 'Coca-Cola',},
          {name: 'Sprite', value: 'Sprite',},
        )
      )

export default orderCommand.toJSON();