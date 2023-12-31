import { config } from "../config";

export const appText = {
  welcomeText: `
Hello! I'm a Telegram bot that generates AI Images using OpenAI technology.\n
By default, the bot generates <b>${config.sessionDefault.numImages} image(s)</b> per prompt, with <b>${config.sessionDefault.imgSize} size</b>\n
<b>Commands</b>
/help - This menu
/gen [text] - Generates an Image from a given prompt
/genEn [text] - Generates an Image from an enhanced prompt

<b>Edit an Image</b>
To edit the image using OpenAi API, reply to a message in our chat with a picture and write the prompt. 

<b>Generate images variations</b>
To generates variations of an image using OpenAi API, reply to a message in our chat with a picture and write the number of variations (max 10). 

`,
};
