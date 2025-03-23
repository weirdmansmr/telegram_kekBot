const {Telegraf, Markup} = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

async function getCat(c, catType = '') {
    try {
        let photoUrl;

        if (!catType) photoUrl = `https://cataas.com/cat?t=${new Date().getTime()}`
        else if (catType === 'gif') photoUrl = `https://cataas.com/cat/gif?t=${new Date().getTime()}`
        else photoUrl = `https://cataas.com/cat/${catType}?t=${new Date().getTime()}`
        await c.replyWithPhoto(photoUrl, {
            caption: `Держи котэ 🐾`
        })
    } catch (e) {
        console.error('Что-то не так с фото', e)
        await c.reply('Ещё раз давай')
    }
}

bot.start(async (ctx) => {
    await ctx.reply('Что хочешь, сестрёнка?', Markup
        .keyboard([
            [
                'Хочу любого котэ', 
                'Хочу рыжего котэ',
            ],
            [
                'Хочу чёрного котэ',
                'Хочу белого котэ'
            ],
            [
                'Хочу гифку котэ'
            ]
        ]).resize()
    )
});

bot.hears('Хочу любого котэ', async (c) => await getCat(c))
bot.hears('Хочу рыжего котэ', async (c) => await getCat(c, 'ginger'))
bot.hears('Хочу чёрного котэ', async (c) => await getCat(c, 'black'))
bot.hears('Хочу белого котэ', async (c) => await getCat(c, 'white'))
bot.hears('Хочу гифку котэ', async (c) => await getCat(c, 'gif'))

bot.launch().then(() => console.log('Started'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));