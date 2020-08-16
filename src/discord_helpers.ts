import { Message } from "discord.js";

export const handleMessage = (msg: Message) => {
    if (msg.content === '!squaddump') {
        msg.reply('pong');
    }
}