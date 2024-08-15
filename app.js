const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all maps_graded locations with pagination
// app.get('/maps_graded', (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 100;
//     const offset = (page - 1) * limit;

//     const query = 'SELECT * FROM maps_graded LIMIT ? OFFSET ?';
//     db.query(query, [limit, offset], (err, results) => {
//         if (err) {
//             console.error('Error fetching maps_graded locations:', err);
//             res.status(500).json({ error: 'Database error' });
//         } else {
//             console.log('Maps Graded Locations:', results);
//             res.json(results);
//         }
//     });
// });

app.get('/maps_graded', (req, res) => {
    const query = 'SELECT * FROM maps_graded';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maps_graded locations:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            console.log('Maps Graded Locations:', results.length);
            res.json(results);
        }
    });
});


// Get total count of maps_graded locations
app.get('/maps_graded_count', (req, res) => {
    const query = 'SELECT COUNT(*) AS count FROM maps_graded';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maps_graded count:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ count: results[0].count });
        }
    });
});

// Get a specific maps_graded location by ID
app.get('/maps_graded/:id', (req, res) => {
    const query = 'SELECT * FROM maps_graded WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error fetching maps_graded location:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            console.log('Maps Graded Location:', results[0]);
            res.json(results[0]);
        }
    });
});



///////////////////////// All USERS related Queries //////////////////////////////////
// Get all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);  // Ensure this returns an array of users
        }
    });
});

// Get total count of users
app.get('/users/count', (req, res) => {
    const query = 'SELECT COUNT(*) AS count FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users count:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ count: results[0].count });
        }
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Define the query for inserting a new user
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    // Execute the query
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            console.log('User added:', results.insertId);
            res.status(201).json({ id: results.insertId, email });
        }
    });
});


///////////////////////// Point of Interest Queries //////////////////////////////////

app.get('/pois', (req, res) => {
    const query = 'SELECT * FROM poi';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching POIs:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);  // Ensure this returns an array of POIs
        }
    });
});

app.get('/pois/:userid/:name', (req, res) => {
    const { userid, name } = req.params;
    const query = 'SELECT * FROM poi WHERE userid = ? AND name = ?';
    db.query(query, [userid, name], (err, results) => {
        if (err) {
            console.error('Error fetching POI:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'POI not found' });
        } else {
            res.json(results[0]);  // Return the specific POI
        }
    });
});

app.post('/pois', (req, res) => {
    const {
        userid,
        name,
        address,
        rating,
        latitude,
        longitude,
        place_id,
        category,
        country,
        description,
        photo_url,
        fact1,
        fact2,
        fact3
    } = req.body;

    // Check if required fields are provided
    if (!userid || !name || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Define the query for inserting a new POI
    const query = `
        INSERT INTO poi (
            userid, name, address, rating,
            latitude, longitude, place_id,
            category, country, description,
            photo_url, fact1, fact2, fact3
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query
    db.query(query, [
        userid, name, address, rating,
        latitude, longitude, place_id,
        category, country, description,
        photo_url, fact1, fact2, fact3
    ], (err, results) => {
        if (err) {
            console.error('Error inserting POI:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            console.log('POI added:', results.insertId);
            res.status(201).json({ id: results.insertId });
        }
    });
});
app.delete('/pois/:id', (req, res) => {
    const { id } = req.params; // Get id from URL parameters
    const query = 'DELETE FROM poi WHERE id = ?'; // Query to delete based on id
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting POI:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'POI not found' });
        } else {
            res.status(200).json({ message: 'POI deleted successfully' });
        }
    });
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



















// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const db = require('./db');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Get all maps_graded locations with pagination
// app.get('/maps_graded', (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 100;
//     const offset = (page - 1) * limit;

//     const query = 'SELECT * FROM maps_graded LIMIT ? OFFSET ?';
//     db.query(query, [limit, offset], (err, results) => {
//         if (err) {
//             console.error('Error fetching maps_graded locations:', err);
//             res.status(500).json({ error: 'Database error' });
//         } else {
//             console.log('Maps Graded Locations:', results);
//             res.json(results);
//         }
//     });
// });

// // Get a specific maps_graded location by ID
// app.get('/maps_graded/:id', (req, res) => {
//     const query = 'SELECT * FROM maps_graded WHERE id = ?';
//     db.query(query, [req.params.id], (err, results) => {
//         if (err) {
//             console.error('Error fetching maps_graded location:', err);
//             res.status(500).json({ error: 'Database error' });
//         } else {
//             console.log('Maps Graded Location:', results[0]);
//             res.json(results[0]);
//         }
//     });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

