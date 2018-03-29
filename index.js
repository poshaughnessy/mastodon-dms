const Mastodon = require('mastodon');

console.log('Using access token', process.env.MASTODON_ACCESS_TOKEN);

const Masto = new Mastodon({
	access_token: process.env.MASTODON_ACCESS_TOKEN,
	api_url: process.env.MASTODON_API_URL || 'https://toot.cafe/api/v1/'
    });

function listDMs(err, data, response) {

    if (!data || data.length < 1 ) {
	return;
    }

    for (var i=0; i < data.length; i++) {

	var notification = data[i];
	if (notification.status && notification.status === 'direct') {

	    // This is a DM!
	    
	    console.log(`Direct message from ${notification.account.username} at ${notification.created_at}:\n${notification.status.content}\n`);

	}

    }

}

Masto.get('notifications', {exclude_types: ['follow', 'favourite', 'reblog']}, listDMs);

