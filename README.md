# ChefUp
A mobile application that takes away the struggle from finding personalized recipes and learning how to make them

#### Winner of the SSU Spring 2019 Tech Showcase Audience Favorite award

## Features
ChefUp allows users to search for recipes in a much simpler way. 
You can change your dietary settings to show only recipes that fit your specific dietary needs.
Once you find a recipe you like, you can click on it to see more details about it, such as the ingredients (and amounts needed), what tools you will need, and how long it will take to make.
When you are ready to cook, scroll down and click on the "Show Steps" button.
Some recipes come with visual graphics detailing how exactly each step needs to be done, taking out all the confusion of the ordinary step process.
ChefUp also comes in with built in step timers (which can be run concurrently), so you won't have to swap in between ChefUp and your phone's timer app.

## In-Progress Features
- Adding the ability for users to create and upload their own recipes.

## Known Issues
- Pages that do have extra ingredient information will sometimes not show the extra info, and need to be re-entered (sometimes several times) to display correctly.


## How to Download & Run
1. Make sure you have the latest version of node, yarn & expo installed (Mac install commands)
    1. `brew update`
    2. `brew install node`
    3. `brew install yarn`
    4. `npm install -g expo-cli`
2. Download this repository: `git clone https://github.com/amay723/ChefUp.git`
3. Install App and API modules
    1. `cd ChefUpApp/`
    2. `npm install`
    3. `cd ChefUpApi/`
    4. `npm install`
4. Setup your database configuration
    1. Edit `ChefUpApi/db_connection-example.js` with your SQL database information
    2. Rename `ChefUpApi/db_connection-example.js` to `db_connection.js`
    3. Import our SQL database setup file `ChefUpApi/DB` into your database
5. Start the node server inside the ChefUpApi folder: `node server.js`
6. Start the expo server inside the ChefUpApp folder: `npm start`

## Screenshots
<img src="https://i.imgur.com/yQBKUSb.png" alt="Home Screen" height="50%" width="50%">
<img src="https://i.imgur.com/cAnyBIs.png" alt="Dietary Preferences Screen" height="50%" width="50%">
<img src="https://i.imgur.com/hpnF4RH.png" alt="Search Screen" height="50%" width="50%">
<img src="https://i.imgur.com/b11e1jF.png" alt="Recipe Info Screen" height="50%" width="50%">
<img src="https://i.imgur.com/GnL4TOG.png" alt="Recipe Step Screen" height="50%" width="50%">
