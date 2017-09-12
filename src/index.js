/* TapFacts
 * Ask Alexa to tell you facts about tap dancing.
 * Adapted from https://github.com/alexa/skill-sample-nodejs-fact/blob/master/src/index.js
 * Darlene Wong
 * August 22, 2017
*/
'use strict';
var Alexa = require('alexa-sdk');


//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "Tap Facts";
var GET_FACT_MESSAGE = "Here's your fact: ";
var HELP_MESSAGE = "You can say tell me a tap fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

var data = [
    "Tap dancing is fun!",
    "Tap dance was created in the mid 1800 by Irish step-dancers.",
    "Metal taps for the shoes were introduced in 1915.",
    "Gene Kelly was the first one to combine different dance forms with tap dance, making it more popular.",
    "Tap dance is a combination of British Isles clog, and step dancing with the rhythms of West African drumming.",
    "Every year, around 6,000 tap dancers tap dance through the streets of New York City in the Macy's Thanksgiving Day Parade.",
    "Tap dance can be done to any kind of music, like jazz, hip hop, pop, or a cappella with no music at all!",
    "Fred Astaire was one of the first modern tap dancers.",
    "National Tap Dance Day is May 24th."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
