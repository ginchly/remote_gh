require 'rubygems'
require 'google/api_client'
require 'launchy'

# Get your credentials from the APIs Console
CLIENT_ID = '948498267910-jgkmroldlcv18q101st25f43ava9m17g.apps.googleusercontent.com'
CLIENT_SECRET = '_6abjrfV3yR-1vfclQHClZgq'
OAUTH_SCOPE = 'https://www.googleapis.com/auth/drive'
REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'

# Create a new API client & load the Google Drive API 
client = Google::APIClient.new
drive = client.discovered_api('drive', 'v2')

# Request authorization
client.authorization.client_id = CLIENT_ID
client.authorization.client_secret = CLIENT_SECRET
client.authorization.scope = OAUTH_SCOPE
client.authorization.redirect_uri = REDIRECT_URI

uri = client.authorization.authorization_uri
Launchy.open(uri)

# Exchange authorization code for access token
$stdout.write  "Enter authorization code: "
client.authorization.code = gets.chomp
client.authorization.fetch_access_token!


#result = client.execute(
#  :api_method => drive.files.list)
result = client.execute(:uri => "https://www.googleapis.com/drive/v2/files/1wm1TAoTO8wp-Zu3yUJacpOl0uxWGtPQjo1ku0xuVMc" )
#https://www.googleapis.com/drive/v2/files/1wm1TAoTO8wp-Zu3yUJacpOl0uxWGtPQjo1ku0xuVMc

# Pretty print the API result
jj result.data.to_hash