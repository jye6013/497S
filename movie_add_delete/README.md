#  Movie List Add/Delete 

By: Huy Hoang

This microservice is responsible for modifying operations to the users' movie list, which are adding and deleting. The users can create and modify their own movies list by choosing the action.

## APIs
**GET /movies/:id/**: Get the movies list given user id
Data format (Status 201):  
`"{  
	"movie id" : {
        "title",
        "description"
    }   
}"`

Error (Status 400):  
`"Movie ID (#) does not exist."`

**POST /movies/:id/update**  : Add a new movie to the movie list  
Data format (Status 201):  
`"{  
	"movie id" : {
        "title",
        "description"
    }
"`

Error  (Status 400):  
`"Movie ID (#) does not exist."`

**DELETE /movies/:id/**: delete a movie from movie list
Data format (Status 201):  
`"{  
	"movie id" : {
        "title",
        "description"
    }   
}"`

Error (Status 400):  
`"Movie ID (#) does not exist."`
