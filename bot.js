require('dotenv-safe').config();
const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);
const axios = require("axios");

const helpMessage = `
    API Sailor Bot:
    /malicious - Returns GET /urls/malicious
    /urls - Returns GET /urls
    /urls <target> -  GET /urls by target
    /urls <url> -  GET /urls by url
    /addUrl - Send POST /urls
`;

const welcome = `
    Welcome to API Sailor Bot!
    Here is a safety place to search and colaborate with malicious URL
    Please, find me at github to contribute with my project: https://github.com/blackALT/APISailor-chatbot
    API Sailor@2021
`;

bot.start((msg) => {
    msg.reply(welcome);
});

bot.help(msg => {
    msg.reply(helpMessage);
});

bot.launch();