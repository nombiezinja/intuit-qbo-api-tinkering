Call end points defined in app.js and change parameters accordingly to test out input and output expectations

Please note that this app was written as a stub client to help familiarize with Doorkeeper flow, my apologies for the bleh code. For me personally this was just a substitute for testing with curl or postman, sharing because it's easier than sharing my list of curl commands

Instructions for setting up sample oauth2 client- run these in sequence

# Everybody run this
* run `rails db:seed` if you haven't already in the project root directory
* `cd relevant_sample_apps/oauth2_client`
* `export NODE_ENV=development` 
* `npm install`
* `node app.js`

Getting an otp for your user if your user has otp turned on:
* `rails c` in your terminal then `User.find_by(email: '<email>').current_otp` (substitute `<email>` with whatever value was hard coded into the route for /new_exchange_user)
* Switch to `app.js` and put in whatever value was returned from the previous command as `otp_attempt` value 
* In dev environment you will have 5 minutes to use this otp; once this otp has been used, it will no longer be valid. 

# If you are working with exchange users 
* Hit end point on your browser: http://localhost:8080/new_exchange_user/<input_an_email_here>
* Hit end point on your browser: http://localhost:8080/newapp
* Hit end point on browser: http://localhost:8080/new_token_from_resource_owner_credentials
    * make sure `password`and `email` param values are the same as the user you have registered


# If you are working with ico users
* Hit end point on your browser: http://localhost:8080/new_ico_user/<input an email here>
* Hit end point on your browser: http://localhost:8080/newapp
* Hit end point on browser: http://localhost:8080/new_token_from_resource_owner_credentials
    * make sure `password` param value has same value as `password` param in /new_user router 
    * make sure `password`and `email` param values are the same as the user you have registered


# If you are working with the cs_app
* Hit end point on your browser: http://localhost:8080/new_cs_app_user
* Hit end point on your browser: http://localhost:8080/new_cs_app_token
* Hit end point on browser: http://localhost:8080/new_token_from_resource_owner_credentials
    * make sure `password`and `email` param values are the same as the user you have registered

