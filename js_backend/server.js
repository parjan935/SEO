const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json()); 

const userRouter = require('./Routes/userRoutes');
const adminRouter = require('./Routes/adminRouter');

app.use('/user', userRouter); 
app.use('/admin', adminRouter); 

app.get('/', (req, res) => {
    res.send('CORS is enabled for all routes');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
