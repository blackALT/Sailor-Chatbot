require('dotenv-safe').config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);
const axios = require("axios");

const helpMessage = `
    API Sailor Bot:
    /searchTarget <target> - Returns GET /urls?target=query
    /searchURL <url> - Returns GET /urls?url=query
    /addUrl - Send POST /urls
    /man - Detailed manual
`;

const man = `
    How does it works?

    This bot is integrated with API Sailor, a simple project to search and colaborate with malicious URLs.
    "My search engine" is very simple:

    type /searchTarget <target>; <target> is a name of a real domain, like "xpto". You'll find all URLs related to this target.
    type /searchURL <url>; <url> is an URL that you want to know if is malicious or not, like "http://xpto.fake". You'll find a exactly URL and it status.
    
    API Sailor@2021
`;

bot.start((ctx) => {
    ctx.reply(`
    API Sailor Bot:
    Welcome, ${ctx.from.first_name}!!
    Here is a safety place to search and colaborate with malicious URL
    Please, find me at gitHub to contribute with my project: https://github.com/blackALT/APISailor-chatbot
    
    API Sailor@2021
    `);
});

bot.help(ctx => {
    ctx.reply(helpMessage);
});

bot.command('man', ctx => {
    ctx.reply(man);
})

bot.command('searchURL', (ctx) => {
    let input = ctx.message.text.split(" ");
    let query = input[1];   
    axios.get('https://reprograma-sailor.herokuapp.com/urls/',{
        params:{
            url: query
        }
    })
    .then(res => {
        for (let i = 0; i < res.data.length; i++){
            ctx.reply(`
            API Sailor says:
            URL: ${res.data[i].url}
            Alvo: ${res.data[i].target}
            Malicioso: ${res.data[i].isMalicious}
            Data de Submissão: ${res.data[i].submissionDate}`)
        }
        console.log(res.data)
        console.log(query);
      
    }) .catch( err => {
        console.log(err);
        ctx.reply('Error');
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