# Google Analytics to Slack

A small JavaScript that announces one or more metrics from Google Analytics on Slack via incoming webhooks. 
Right now it is capable of authenticating with your GA account, listing your accounts and web properties (the latter only in console), getting users and pageviews for yesterday from GA and displaying them on the page, sending the users and pageviews totals to a Slack channel. Work is in progress.

Can be used for GA accounts where a service account cannot be added (for a server-side app), hence the current client-side implementation.

## To do:
- list accounts, web properties, profiles
- allow user to select profile by clicking (as easy as possible)
- let user enter Slack Webhook URL, Slack Payload options, Google's Client ID
