#  Movie Likes

By: Ji Ye

This microservice is responsible for handling the number of likes of existing movies. It is able to get the number of likes or can update the number of likes for a chosen movie.
## APIs
**PUT /movies/:id/likes**  
Data format (Status 201):  
{  
	"movie id" : "number of likes"  
}  

Error (Status 400):  
"Movie ID (#) does not exist."  

**GET /movies/:id/likes**  
Data format (Status 201):  
"Number of likes"  

Error  (Status 400):  
"Movie ID (#) does not exist."
