const express = require('express')
const bodyParser = require('body-parser')
const StringHelper = require('./stringHelper')
const app = express()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json())


app.listen(3000, () => {
    console.log('server is starting on 3000 port')
})


app.post('/api/v1/palindrome', (req, res) => {

    let response = {
        "palindrome": false
    }
    if (req.body && req.body.value) {
        response.palindrome = StringHelper.checkPalindrome(req.body.value)
    }
    res.json(response)

})

app.post('/api/v1/anagrams', (req, res) => {
    let response = {
        "data": []
    }

    if (req.body && req.body.value) {
        response.data = StringHelper.getGroupAnagram(req.body.value)
    }
    res.json(response)

})
app.post("/api/v1/login", async (req, res) => {


    try {

        const {email, password} = req.body;

        // Validate user input
        if (!(email && password)) {
            res.json({"status": "error", "message": "All input is required"});
        }

        const user = {
            _id: 1,
            email: "m@g.com",
            password: "7c4a8d09ca3762af61e59520943dc26494f8941b"
        };

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                {user_id: user._id, email},
                "tokenKey",
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            // user
            res.json(user);
            console.log(user)
        }
        res.json({"status": "error", "message": "Invalid Credentials"});
    } catch (err) {
        console.log(err);
    }
});
  

  
  