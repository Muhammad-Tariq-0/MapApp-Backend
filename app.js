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

