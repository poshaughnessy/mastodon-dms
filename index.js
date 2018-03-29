const Mastodon = require('mastodon');

console.log('Using access token', process.env.MASTODON_ACCESS_TOKEN);

// TODO make this dynamic / easy to page through...
// Replace with a lower max ID to limit to older posts and navigate through
const MAX_ID = '103438';

const Masto = new Mastodon({
	access_token: process.env.MASTODON_ACCESS_TOKEN,
	api_url: process.env.MASTODON_API_URL || 'https://toot.cafe/api/v1/'
    });

function listDMs(err, data, response) {

    var foundDMs = false;

    if (!data || data.length < 1 ) {

	console.log('No DMs found');

	return;
    }

    for (var i=0; i < data.length; i++) {

	var notification = data[i];
	if (notification.status && notification.status.visibility === 'direct') {

	    // This is a DM!
	    
	    console.log(`Direct Message! ${notification.id} from ${notification.account.username} at ${notification.created_at}:\n${notification.status.content}\n`);

	    foundDMs = true;

	} else {

	    console.log(`Not a DM :( ${notification.id} ${notification.status.visibility}`);

        }

    }

    if (!foundDMs) {
	console.log('No DMs found');
    }

}

// 30 is the max allowed limit
Masto.get('notifications', {exclude_types: ['follow', 'favourite', 'reblog'], 'max_id': MAX_ID, limit: 30}, listDMs);

