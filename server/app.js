import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';

import authRoutes from './routes/auth.js';
import dashboardRoute from './routes/dashboard.js';
import verifyToken from './utils/verifyToken.js';
import env from 'dotenv';
env.config();

const app = express();
const PORT= process.env.PORT || 5600  ;
import session from 'express-session';
import ExpressError from './utils/ExpressError.js';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

main()
.then(() => {
    console.log('Pinged to Database. Connected Successfully! ');
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}).catch(err => {
    console.error(err);
});
 

async function main(){
    await mongoose.connect(process.env.DB_URL);
}

const store= MongoStore.create({
    mongoUrl: process.env.DB_URL, //or 'mongoUrl/dbUrl, if local/cloudAtlas
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, 
});

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE!", err);
});
   
const sessionOptions= {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};


app.use(session(sessionOptions));

app.use('/cvi', authRoutes);
app.use('/cvi/dashboard',  dashboardRoute);

app.get("/home", (req,res)=>{
    res.send("Cast Resumiarmus on your nxt opponent!");
});


app.all("*", (req,res,next)=>{
   next(new ExpressError(404, "Page not found!") );
});

app.use((err, req, res,next)=>{
    let {status, message}=err;
    res.status(status).send(message);
})



/*Testing db and Debug */
// const newUser= new User({
//     firstName: 'Jennie',
//     lastName: 'Doe',
//     email: "rubyjane@blackpink.in",
//     password: "inyour@rea",
// });
// await newUser.save()
// app.get("/testing", async(req,res)=>{
//     const newResume= new Resume({
//         title: 'Ruby Jane Kim',
//         template: 'BlueBlack',
//         personal: {
//             firstName: 'Jennie',
//             lastName: 'Kim',
//             phone: '+2355690457',
//             email: 'rubyjane@blackpink.in',
//             website: 'bpvenom.in',
//         },
//         education: [
//             {
//                 university: 'seoul university',
//                 degree: 'Art of Aesthetics',
//                 startDate: '22 Sep 2016',
//                 endDate: '17 Aug 2019',
//                 gpa: '8.75'
//             }
//         ],
//         experience: [
//             {
//                 title: 'Ruby Jane',
//                 organisation: 'Blackpink',
//                 startDate: '9 Dec 2018',
//                 endDate:'ongoing',
//                 description: 'Njoying my lifeabouts in pursuing the art of aesthetics in my life.'
//             },
//         ],
//         skills: [
//             {
//                 skillName: 'Ambidextrous',
//                 keywords: '#Dancer, #bp, #moon'
//             },
//             {
//                 skillName: 'Hip-Hop Dancer',
//                 keywords: '#Dance, #heartful'
//             }
//         ],
//         projects: [{
//             projectName: 'Coachella Tour',
//             keywords: '#rock, #worth, #blast',
//             projectDescription: [ 'Pink venom Starlight', 'Moonlight-You and me' ],
//             projectLink: 'www.blackpinkofficial.in'
//         }],
//         achievements: [
//             {
//                 title: 'Best Dancer Award of the Year 2022',
//                 date: '22 January 2024',
//                 organisation: 'US Cabinet of Culture',
//                 description: ['member of blackpink community', 'seoul kpop dancer A1'],
//             }
//         ],
//         createdBy: '665418c5c5735151089e2b6e',

//     });

//     await newResume.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log("uncaught error", err.message);
//     });

//     res.send("Resume generated successfully!");

// });