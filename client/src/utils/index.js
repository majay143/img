/// the functions which are reused in out entire applications are exists in this utils folder
import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}// using filsaver to download the images that are rendered on the Home page 
// after a creating post 
export async function downloadImage(_id,photo){
  FileSaver.saveAs(photo,`download-${_id}.jpg`)
}