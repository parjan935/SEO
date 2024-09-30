const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 50*1024*1024 } 
});
app.post('/process_video', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.setHeader('Content-Type', req.file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename=${req.file.originalname}`);
    res.send(req.file.buffer);
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// // Enable CORS for all routes
// app.use(cors());

// // Configure multer to store files in memory
// const storage = multer.memoryStorage();
// const upload = multer({
//     storage,
//     limits: { fileSize: 50 * 1024 * 1024 } // Limit file size to 50MB
// });

// // Route to handle video processing
// app.post('/processvideo', upload.single('video'), (req, res) => {
//     // Check if a file was uploaded
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Set headers for the response
//     res.setHeader('Content-Type', req.file.mimetype);
//     res.setHeader('Content-Disposition', `attachment; filename=${req.file.originalname}`);

//     // Send the file back as a response
//     res.send(req.file.buffer);
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
