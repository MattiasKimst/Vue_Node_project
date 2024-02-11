const express = require('express');
const pool = require('./database');
const cors = require('cors')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const e = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const SECRET = "@(jK6%!./GGa9b|c.Lf10-";
const multer = require('multer');//for uploading files, in our case profile picture
const upload = multer({ dest: 'assets/' }); // uploads will go to assets folder


function generateJWT(userId) {
    return jwt.sign({id: userId}, SECRET, { expiresIn: 3600 });
}

async function validateJwt(cookies) {
    if(!cookies || !cookies.jwt)
        return false;

    try {
        const decoded = jwt.verify(cookies.jwt, SECRET);
        return true;
    } catch(e) {
        console.log("Error decoding JWT");
        console.log(e);
        return false;
    }
}

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is listening to port " + PORT);
});

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified
                    console.log('author is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authinticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).json({status: "fail", message: err.message});
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );

        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ status: "success", message: "", user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        if(err.code == "23505") res.status(400).json({status: "fail", message: "User already exists with the given email"});
        else res.status(500).json({status: "fail", message: err.message});
    }
});

// Update user profile
app.put('/api/profile', upload.single('profilePicture'), async (req, res) => {
    try {

        // Check authentication
        if(!validateJwt(req.cookies)) return res.status(401).json({status: "fail", message: "Not authenticated", posts: []});


        const userId = req.user.id; // Assuming you have middleware to decode JWT and add user to request object

        if (!req.file) {
            return res.status(400).json({ status: "fail", message: "Profile picture file is required" });
        }

        const profilePicturePath = '/assets/' + req.file.filename; // the profile picture is stored in the assets folder with a unique filename

        // Update the profile picture path in the database
        await pool.query("UPDATE users SET profile_picture = $1 WHERE id = $2", [profilePicturePath, userId]);

        res.status(200).json({ status: "success", message: "Profile picture updated." });
    } catch (error) {
        res.status(500).json({ status: "fail", message: error.message });
    }
});


app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /*
        To authenticate users, you will need to compare the password they provide with the one in the database.
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function.
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison.
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password.
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ status: "fail", message: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({  status: "fail", message: "", user_id: user.rows[0].id })
            .send();
    } catch (error) {
        res.status(401).json({ status: "fail", message: error.message });
    }
});

//logout a user = deletes the jwt
app.post('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({status: "success", message: "cookie cleared" });
});

app.get("/api/posts", async (req, res) => {
    try {
        if(!validateJwt(req.cookies)) return res.status(401).json({status: "fail", message: "Not authenticated", posts: []});

        const postsData = await pool.query("SELECT * FROM posts");
        for(let i = 0; i < postsData.rows.length; i++) {
            console.log(postsData.rows[i].id);
            postsData.rows[i] = {
                id: postsData.rows[i].id,
                postDate: postsData.rows[i].postdate,
                content: postsData.rows[i].content
            }
        }

        res.status(200).json({status: "success", message: "", posts: postsData.rows});
    } catch(e) {
        res.status(500).json({status: "fail", message: e.message, posts: []});
    }
});

app.post("/api/posts", async (req, res) => {
    try {
        if(!validateJwt(req.cookies)) return res.status(401).json({status: "fail", message: "Not authenticated"});

        let { content } = req.body;
        if(!content || content.length === 0) return res.status(401).json({status: "fail", message: "A post must have content"});

        await pool.query("INSERT INTO posts (content) VALUES ($1)", [content]);

        res.status(200).json({status: "success", message: "Post created."});
    } catch(e) {
        res.status(500).json({status: "fail", message: e.message});
    }
});

app.delete("/api/posts", async (req, res) => {
    try {
        if(!validateJwt(req.cookies)) return res.status(401).json({status: "fail", message: "Not authenticated"});

        await pool.query("TRUNCATE TABLE posts");
        res.status(200).json({status: "success", message: ""});
    } catch(e) {
        res.status(500).json({status: "fail", message: e.message});
    }
});

app.delete("/api/posts/:postId", async (req , res)=>{
    try {
        console.log("delete a post request has arrived")
        if (!validateJwt(req.cookies)) return res.status(401).json({ status: "fail", message: "Not authenticated" });
        const postid = req.params.postId;
        const deletepost = await pool.query("DELETE FROM posts WHERE id = $1",[postid]);
        res.status(200).json({status: "success", message: ""});
    } catch (err) {
        res.status(500).json({status: "fail", message: e.message});
    }
})

app.get("/api/posts/:postId", async (req, res) => {
    try {
        // Check authentication
        if (!validateJwt(req.cookies)) {
            return res.status(401).json({ status: "fail", message: "Not authenticated" });
        }

        const postId = req.params.postId;

        // Update the post with the new content
        const postsData = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);

        res.status(200).json({ status: "success", message: "", postData: {
            id: postsData.rows[0].id,
            postDate: postsData.rows[0].postdate,
            content: postsData.rows[0].content
        } });
    } catch (e) {
        res.status(500).json({ status: "fail", message: e.message });
    }
});

app.put("/api/posts/:postId", async (req, res) => {
    try {
        // Check authentication
        if (!validateJwt(req.cookies)) {
            return res.status(401).json({ status: "fail", message: "Not authenticated" });
        }

        const postId = req.params.postId;
        const { content } = req.body;

        // Check if content is provided
        if (!content || content.length === 0) {
            return res.status(400).json({ status: "fail", message: "Content must be provided for update" });
        }

        // Update the post with the new content
        await pool.query("UPDATE posts SET content = $1 WHERE id = $2", [content, postId]);

        res.status(200).json({ status: "success", message: "Post updated." });
    } catch (e) {
        res.status(500).json({ status: "fail", message: e.message });
    }
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Define an endpoint to serve files based on file path
app.get('/api/file/:filePath', (req, res) => {
    const filePath = req.params.filePath;
    res.sendFile(path.join(__dirname, 'assets', filePath));
});