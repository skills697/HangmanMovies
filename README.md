# Hangman game with IMDB's Top 250 Movies
#### Made with Node/Express/Angular/SQLite

### Installation
Download files.
run the npm install for loading the node modules
Run the hangman services with "npm run serve"

Currently setup to run on localhost:4200

### How it works
Selects a random IMDB movie (from their top 250 list)
It first looks to read values from the local movie_titles database
If no movies are found or the movies that are in the movie titles database belong to a previous day, it will scrape a fresh list of movie titles from the IMDB website.
Once it has a list of movie titles, it will randomly select one to use for a game of hangman.

Guess the movie name to win!
