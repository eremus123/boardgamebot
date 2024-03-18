# boardgamebot
Does your boardgame collection look like this: <img src="https://i.imgur.com/h4CQ7Vy.jpeg"><img src="https://i.imgur.com/sj35Hq5.jpeg"><img src="https://i.imgur.com/reO4M8w.jpeg"><img src="https://i.imgur.com/KtNjwIg.jpeg">

Or even worse, like this:
<img src="https://i.imgur.com/fCeUffi.jpeg"><img src="https://i.imgur.com/UxCnaTS.jpeg">

Completely overwhelmed by the vast selection out there, or just trying to get started to build your collection but don't want to overlap with games that your friends already own? How do you even know which of your friends own 'that game'? 

If only there was an easier way to keep track of not only your own collection, but also the groups that you often play with.... 



# Screenshots
### Welcome Screen:
<img src="https://i.imgur.com/XqISViz.jpeg">


### Group Screen:
<img src="https://imgur.com/BEExwM7.jpeg">


### Users Screen:
<img src="https://imgur.com/Hqt2RpE.jpeg">


### Games Screen:
<img src="https://imgur.com/gxEtxSC.jpeg">


# Technologies Used

- JavaScript JSX
- React
- Airtable
- CSS

# Getting Started

1. Clone this repo and install cors-anywhere via "npm install cors-anywhere"
2. A folder titled node_modules should be auto-generated containing the CORS Anywhere installation.
3. In \node_modules\cors-anywhere (cd node_modules\cors-anywhere) you should find a file called server.js.
4. Run the node via "node server.js"
5. You should see something like the following if the server started correctly: Running CORS Anywhere on 127.0.0.1:8080. 
6. In a new terminal, run the React App via "npm run dev"
7. Access the app interface via localhost. (http://localhost:5173/)

# Next Steps

- Search within your group to see if anyone owns the game
- Include ratings in the game search feature
- Login directly to BGG to save to your own collections and stats
- Keep track of the number of plays for each game that you own.
- Suggest recommended games that you might like based on your own collection
- Don't know which game to play? Introducing a randomizer to pick a game that your group owns!
- Support for more than 100 games displayed


# Acknowledgements & References

- Airtable API Docs: https://airtable.com/appnFG2kbIVgZNH8a/api/docs#curl/table:boardgames
- BGG XML API2: https://boardgamegeek.com/wiki/page/BGG_XML_API2
- BGG XML API2 Guide: https://www.tayloraliss.com/bggapi/index.html
- Debugging: ChatGPT 3.5

