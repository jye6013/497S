const express = require('express')
const port = 5000
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const http = require('http')
const bodyParser = require('body-parser')

const users = require('./data').userDB
const server = http.createServer(app)

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname,'./public')))

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname+'/express/login.html'));
  //__dirname : It will resolve to your project folder.
})

app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);
    
            res.send("<div align ='center'><h2>Registration successful</h2><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch{
        res.send("Internal server error");
    }
})


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})