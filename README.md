# 497S

This microservice lets you posts reviews on the movies found in the movie list page. 
It lets the user learn more about the quality of the respective movies therein helping them to decide if they want to add it to their list of movies.

I implemented it with APIs: getting and posting the comment made by the user

Techinology used: JavaScript

I responds to the route:
GET ‘/movies/:id/reviews’, POST ‘/movies/:id/reviews’

the structure of the messages it receives/sends: 
GET- receive the movie review of the user(JSon)
POST - update the movie review on the particular movie(JSon)

