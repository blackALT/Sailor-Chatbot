require('dotenv-safe').config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);
const axios = require("axios");

const helpMessage = `
    API Sailor Bot:
    /searchTarget <target> - Returns GET /urls?target=query
    /searchURL <url> - Returns GET /urls?url=query
    /addUrl - Send POST /urls
`;

const welcome = `
    Welcome to API Sailor Bot!
    Here is a safety place to search and colaborate with malicious URL
    Please, find me at github to contribute with my project: https://github.com/blackALT/APISailor-chatbot
    API Sailor@2021
`;

bot.start((ctx) => {
    `Hello ${ctx.from.first_name}`
    ctx.reply(welcome);
});

bot.help(ctx => {
    ctx.reply(helpMessage);
});

bot.command('searchURL', (ctx) => {
    let input = ctx.message.text.split(" ");
    let query = input[1];   
    axios.get('https://reprograma-sailor.herokuapp.com/urls',{
        params:{
            url: query
        }
    })
    .then(res => {
        console.log(res.data)
        console.log(query);
        ctx.reply(res.data);       
    }) .catch( err => {
        console.log(err);
        ctx.reply(err);
    })
})

bot.command('searchTarget', (ctx) => {
    let input = ctx.message.text.split(" ");
    let query = input[1];   
    axios.get('https://reprograma-sailor.herokuapp.com/urls',{
        params:{
            target: query
        }
    })
    .then(res => {
        console.log(res.data)
        console.log(query);
        ctx.reply(res.data);       
    }) .catch( err => {
        console.log(err);
        ctx.reply(err);
    })
})

bot.launch();