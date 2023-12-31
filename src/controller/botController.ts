import { bot } from '../bot'
import { WorkerPayload } from "../workers/task-worker";
import {
  improvePrompt,
  postGenerateImg,
  alterGeneratedImg,
} from "../api/openAi"; 


export const imgGen = async (data: WorkerPayload) => {
  const { chatId, prompt, numImages, imgSize } = data
  try {
    bot.api.sendMessage(chatId, "generating the output...");
    const imgs = await postGenerateImg(prompt, numImages, imgSize);
    imgs.map((img: any) => {
      bot.api.sendPhoto(chatId, img.url) //ctx.replyWithPhoto(img.url);
    });
    return true
  } catch (e) {
    console.log("/gen Error", e);
    bot.api.sendMessage(chatId, "There was an error while generating the image");
    return false
  }
}

export const imgGenEnhanced = async (data: WorkerPayload) => {
  const { chatId, prompt, numImages, imgSize } = data
  try {
    const upgratedPrompt = await improvePrompt(prompt);
    if (upgratedPrompt) {
      bot.api.sendMessage(chatId, 
        `The following description was added to your prompt: ${upgratedPrompt}`
      );
    }
    const imgs = await postGenerateImg(
      upgratedPrompt || prompt,
      numImages,
      imgSize
    );
    imgs.map((img: any) => {
      bot.api.sendPhoto(chatId, img.url);
    });
    return true
  } catch (e) {
    console.log("/genEn Error", e);
    bot.api.sendMessage(chatId, "There was an error while generating the image");
    return false
  }
}

export const alterImg = async (data: WorkerPayload) => {
  const { chatId, prompt, numImages, imgSize, filePath } = data
  try {
    const imgs = await alterGeneratedImg(
      chatId,
      prompt!,
      filePath!,
      numImages!,
      imgSize!
    );
    imgs!.map((img: any) => {
      bot.api.sendPhoto(chatId, img.url);
    });
  } catch (e) {
    console.log("/genEn Error", e);
    bot.api.sendMessage(chatId, "There was an error while generating the image");
    return false
  }

}

