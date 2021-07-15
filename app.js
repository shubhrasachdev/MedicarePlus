const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Doctor = require('./models/doctor');
const Patient = require('./models/patient');
const Appointment = require('./models/appointment');

const doctors = require('./routes/doctors');
const patients = require('./routes/patients');
const appointments = require('./routes/appointments');
const consults = require('./routes/consults');
const diagnostics = require('./routes/diagnostics');

mongoose.connect('mongodb://localhost:27017/medicarePlus', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected.");
});


const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));

const sessionConfig = {
    secret: "abcde",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // week
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Patient.authenticate()));
passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/doctors', doctors);
app.use('/patients', patients);
app.use('/appointments', appointments);
app.use('/consults', consults);
app.use('/diagnostics', diagnostics);

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('*', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("Listening on port 3000.")
});