
function gapiOnLoadCallback() {
	gapi.client.setApiKey('AIzaSyDtszoE6zAROJye9g5ejxi-5wR9ylpKNyM');
	gapi.client.load('calendar', 'v3', function() {
		// This has a smell to it. I don't like the hard-coded
		// callback -- I should either use PubSub when time allows
		if (typeof window.eventListCallback !== 'undefined') {
			eventListCallback();
		};
	});
}

var gapiClient = {
	listUpcomingEvents: function(maxResults, callback) {
		var request = gapi.client.calendar.events.list({			
			  'calendarId': 'heartwoodmontessori.com_5m7fci1sql1nmfsp1dc3lk69n0@group.calendar.google.com',
			  'timeMin': (new Date()).toISOString(),
			  'showDeleted': false,
			  'singleEvents': true,
			  'maxResults': maxResults,
			  'orderBy': 'startTime'
		});

		// Execute is asyc, so I need to use a callback
		// to trigger my response
		request.execute(function(response) {
			callback.call(null, response.items);
		});
	}
}