	// Replace with your client ID from the developer console.
  var CLIENT_ID = '';

  // Set authorized scope.
  var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
  // Declare 
  var gapageviews, gausers;


function authorize(event) {
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    var useImmdiate = event ? false : true;
    var authData = {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: useImmdiate
    };
    // Get the value of profileID textfield
	var enteredProfileID = document.getElementById("profileID").value;

    gapi.auth.authorize(authData, function(response) {
      var authButton = document.getElementById('auth-button');
      if (response.error) {
        authButton.hidden = false;
      }
      else {
        authButton.hidden = true;
        
			// Load the Google Analytics client library.
			gapi.client.load('analytics', 'v3').then(function() {
					// Use the value of textfield
				    queryCoreReportingApi(enteredProfileID);
					// Kickoff of accounts
					queryAccounts();

			});
      }
    });
  }
function queryCoreReportingApi(profile) {
  // Query the Core Reporting API for the number sessions for
  // the past seven days.
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:' + profile,
    'start-date': 'yesterday',
    'end-date': 'yesterday',
    'metrics': 'ga:users, ga:pageviews'
  })
  .then(function(response) {
    preparedisplay(response.result);
  })
  .then(null, function(err) {
      // Log any errors.
      console.log(err);
  });
}
function preparedisplay(unformattedJson){

	var totals = unformattedJson.totalsForAllResults;
	gapageviews = JSON.stringify(totals['ga:pageviews'], null, 2).replace(/\"/g, "");
	gausers= JSON.stringify(totals['ga:users'], null, 2).replace(/\"/g, "");
	
	document.getElementById("show-pageviews").innerHTML = gapageviews.concat(" pageviews");
	document.getElementById("show-users").innerHTML = gausers.concat(" users");
	//sendtoslack(gapageviews, gausers);
}
function sendtoslack(pageviews, users){
	var $slack_url = "";
	var $text = "Yesterday: *" + users + " users* and *" + pageviews + " pageviews* on your web property." ;
	var $payload = 'payload={"channel": "@","username": "Google Analytics", "icon_emoji": ":ga:",  "text":"' + $text + '"}';
	$.post(
		$slack_url,
		$payload
  	);
}
function getnewprofile(){
	var $newprofile = document.getElementById("profileID").value;
	console.log('Received new profile ID');
	queryCoreReportingApi($newprofile);
}

