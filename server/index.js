import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import postRoutes from './routes/posts.js';

//Initialize the app with express.
const app = express();
dotenv.config();

//body parser to 
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

//Connect database to our app.
/*const CONNECTION_URL = 'mongodb+srv://fede:mernstack@cluster0.nwiqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';*/
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Serrver running in port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
