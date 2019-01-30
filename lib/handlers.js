let logger;
const UTAH_NEWS_URL = "https://unews.utah.edu/feed/";

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

async function getAllNewsItems(context, complete, modules) {
    let feed = await parser.parseURL(UTAH_NEWS_URL);

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
    let feed = await parser.parseURL(UTAH_NEWS_URL);

    if (typeof feed === 'undefined' || feed === null) {
        return complete().notFound('The entity could not be found').next();
    } 
    else {
        return complete().setBody({'count':feed.items.length}).ok().next();
    }
}

async function getByGuid(context, complete, modules) {
    let feed = await parser.parseURL(UTAH_NEWS_URL);
    const entityId = context.entityId;

    if (typeof feed === 'undefined' || feed === null) {
        return complete().notFound('The entity could not be found').next();
    }
    else {
        return complete().setBody(
            modules.kinveyEntity.entity(
                feed.items.find(item => item.guid.includes(entityId))
            )
        ).ok().next();
    }
}

exports.listHandler = getAllNewsItems;
exports.countHandler = getCount;
exports.initHandler = initHandler;
exports.fetchHandler = getByGuid;