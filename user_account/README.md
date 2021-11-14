#  Movie Likes

By: Ray Nguyen  

This microservice handles log-in, sign-up, and password encryption.
## APIs
**POST /register**: Allow users sign up for accounts  
Data format (Status 201):  
`{  
	"id": Date.now(),
    "username": req.body.username,
    "email": req.body.email,
    :password": hashPassword, 
}`

Error (Status 409):  
`"Email already used"`

Error  (Status 500):  
`"Internal server error"`
