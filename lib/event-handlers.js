let logger;
const UTAH_EVENTS_URL = "https://orientation.utah.edu/_rss/events.xml";

let Parser = require('rss-parser');
let parser = new Parser();

function initHandler(flexLogger) {
    logger = flexLogger;
}

async function transformResults(results, modules) {
    let responseResults = [];
    results.forEach((result) => {
        responseResults.push(modules.kinveyEntity.entity(result));
    });
    return responseResults;
}

async function getAllEventItems(context, complete, modules) {
    let feed = await parser.parseURL(UTAH_EVENTS_URL);

    if (typeof feed === 'undefined' || feed === null) {
        return complete().notFound('The entity could not be found').next();
    } 
    else {
        transformResults(feed.items, modules).then((resultData) => {
            return complete().setBody(resultData).ok().next();
        })
    }
}

async function getCount(context, complete, modules) {
    let feed = await parser.parseURL(UTAH_EVENTS_URL);

    if (typeof feed === 'undefined' || feed === null) {
        return complete().notFound('The entity could not be found').next();
    } 
    else {
        return complete().setBody({'count':feed.items.length}).ok().next();
    }
}

exports.listHandler = getAllEventItems;
exports.countHandler = getCount;
exports.initHandler = initHandler;