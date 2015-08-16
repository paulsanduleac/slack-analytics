function queryAccounts() {
    // Get a list of all Google Analytics accounts for this user
  var request = gapi.client.analytics.management.accounts.list();
  request.execute(printAccounts);
}
/*
 * The results of the list method are passed as the results object.
 * The following code shows how to iterate through them.
 */
function printAccounts(results) {
  if (results && !results.error) {
    var accounts = results.items;
    var list = document.createElement("ul");
    for (var i = 0, account; account = accounts[i]; i++) {
		var item = document.createElement("li");
		var temptext1 = document.createTextNode(account.name);
		var temptext2 = document.createTextNode(' (accountId: ' + account.id + ')');
		item.appendChild(temptext1);
		item.appendChild(temptext2);
		listProperties(account.id, account.name);
		console.log('Account Id: ' + account.id);
		console.log('Account Name: ' + account.name);
		list.appendChild(item);
    }
    var div = document.getElementById("accounts");
    div.appendChild(list);
  }
}

/*
 * Requests a list of all properties for the authorized user.
 */
function listProperties(accountId, accountName) {
  var request = gapi.client.analytics.management.webproperties.list({
    'accountId': accountId
  });

  request.execute(printProperties);
}

/*
 * The results of the list method are passed as the results object.
 * The following code shows how to iterate through them.
 */
function printProperties(results) {
  if (results && !results.error) {
    var properties = results.items;
    var item = document.createElement("li");
    for (var i = 0, property; property = properties[i]; i++) {
		console.log('Property Id: ' + property.id);
		console.log('Property Name: ' + property.name);
		console.log('Property Profiles: ' + property.profileCount);
		if (property.websiteUrl) {
        	console.log('Property URL: ' + property.websiteUrl);
			}
		console.log('Created: ' + property.created);
		console.log('Updated: ' + property.updated);
		
		var itemcontents = document.createElement("div");
		var temptext1 = document.createTextNode('Property Id: ' + property.id);
		var temptext2 = document.createTextNode(' (accountId: ' + account.id + ')');
		itemcontents.appendChild(temptext1);
		itemcontents.appendChild(temptext2);
		item.appendChild(item);
    }
    var list = document.getElementById("properties");
    list.appendChild(item);
  }
}
