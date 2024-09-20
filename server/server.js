const express = require('express');
const cors = require('cors');
const { User } = require('./db');  // Destructure User from db.js
const port = 8999;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/user', async (req, res) => {
    try {
        const value = req.query.search;
        if (!value) {
            const response = User.find({});
            return res.json(response);
        }
        const searchTerms = value.split(' ');
        let query;
        if (searchTerms.length === 2) {
            query = {
                $and: [
                    { first_name: { $regex: searchTerms[0], $options: 'i' } },
                    { last_name: { $regex: searchTerms[1], $options: 'i' } }
                ]
            };
        } else {
            query = {
                $or: [
                    { first_name: { $regex: searchTerms[0], $options: 'i' } },
                    { last_name: { $regex: searchTerms[0], $options: 'i' } }
                ]
            };
        }

        // Perform the search based on the constructed query
        const users = await User.find(query);
        
        if (users.length > 0) {
            res.status(200).json(users);  // Return matching users
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
