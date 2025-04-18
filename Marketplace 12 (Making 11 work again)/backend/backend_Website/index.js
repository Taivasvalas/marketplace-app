const session = require('express-session');
const express = require("express")
// const multer = require('multer');
const cors = require("cors"); 
const bcrypt = require("bcrypt");
const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

const path = require("path");

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");
app.use(express.json());

const config = require("./config");

// const localhost = "https://bd2d-82-181-133-70.ngrok-free.app"

// const BASE_URL80 = "http://localhost:8080";
const BASE_URL80 = "https://a83a-2001-14bb-67d-31fb-b0a4-a42a-ae56-b6a5.ngrok-free.app";
// const BASE_URL81 = "http://localhost:8081";
const BASE_URL81 = "https://9eca-2001-14bb-67d-31fb-b0a4-a42a-ae56-b6a5.ngrok-free.app";
// const BASE_URL30 = "http://localhost:3000";
const BASE_URL30 = "https://9e5d-2001-14bb-67d-31fb-b0a4-a42a-ae56-b6a5.ngrok-free.app";


app.use(cors({
    // Accepts http requests from anywhere (DANGEROUS)
    // origin: ['*'],

    // For local hosting -->
    // origin: ['http://localhost:3000', 'http://localhost:8081'],
    
    // For Other http requests (Update to accept requests from other places) --> 
    // origin: [`${BASE_URL30}`, `${BASE_URL81}`],
    origin: '*',

    
    credentials: true,
}));

// Original
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:8081'],
//     credentials: true,
// }));

app.set('trust proxy', 1); // 🛡️ Luottaa ngrokiin ja mahdollistaa secure cookies

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // maxAge: 1000 * 10 * 60
        secure: true, // 🔐 HTTPS-vaatimus
        sameSite: 'none', // 🔄 cross-site redirect toimii
        maxAge: 1000 * 60 * 5
    },
}));

cookieMaxAge = 1000 * 60 * 5;


// Variables
class Person {
    constructor(username, balance, password, accountNumber, isSeller, sellerNumber, stripeAccountId) {
        this.username = username;
        this.balance = balance;
        this.password = password;
        this.accountNumber = accountNumber;
        this.isSeller = isSeller;
        this.sellerNumber = sellerNumber;
        this.stripeAccountId = stripeAccountId;
    }   
}





const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, file.fieldname + '-' + Date.now());
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Add this middleware to your express app
app.use(upload.none());







accounts = [];
// Muista käyttää bcrypt salt
// accounts[0] = new Person("Akseli", 100, 1112)
let accountsLength = accounts.length;
// globalAccess = false;
const PORT = 8080;


accountNumber = 0



// Routes





app.get('/Logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            console.log('\n\nUser logged out');
            res.status(200).send('User logged out');
        }
    });
});




// Async function, because bcrypt is asunc.
app.post('/Login/Use-Form-Data', async (req, res, next) => {
    console.log("\n\n/Login/Use-Form-Data");
    console.log(req.body)
    console.log(req.body)
    
    let isValidLogin = false;
    for (let i = 0; i < accountsLength; i += 1) {
        if (accounts[i].username == req.body.username){
            try {
                // Compare passwords. Get salt out of accounts[i].password and hashes req.body.password and then compares those. Returns true or false.
                if (await bcrypt.compare(req.body.password, accounts[i].password)) {
                    if (req.body.stayLoggedIn) {
                        console.log('The stayLoggedIn checkbox is checked');
                        req.session.cookie.maxAge = cookieMaxAge;
                    } else {
                        // null = session will expire when the browser is closed.
                        req.session.cookie.maxAge = null;
                    }
                    console.log("Login Allowed");
                    req.session.username = req.body.username;
                    req.session.password = req.body.password;
                    req.session.isLoggedIn = true;
                    req.session.isSeller = accounts[i].isSeller;
                    console.log(req.session.username);
                    console.log(req.session.password);
                    isValidLogin = true;

                    req.session.accountNumber = accounts[i].accountNumber;
                    req.session.sellerNumber = accounts[i].sellerNumber;
                    console.log("Kirjauduttu sisään käyttäjälle")
                    console.log(accounts[i])
                    console.log(accounts[i])
                    console.log(accounts[i])
                }
            } catch {
                res.status(500).send("Error Logging in bcrypt")
            }
            break; // Exit the loop once a valid login is found
        }
    }


    res.send({isValidLogin});

    // Vanha koodi:
    // if (isValidLogin) {
    //     res.redirect(`${BASE_URL30}/`);
    // } else {
    //     console.log("Wrong Info");
    //     res.redirect(`${BASE_URL30}/`);
    // }
});



app.get('/accountData', (req, res) => {
    accountsLength = accounts.length;
    
    const data = {
        appName: config.appName,
        accounts: accounts,
        accountsLength
    };

    res.render("AccountsData", data);
})



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// bcrypt is an async library, so use async function
app.post('/Register-New-Account/Use-Form-Data', async (req, res, next) => {
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log("\n\n/Register-New-Account/Use-Form-Data");
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.stayLoggedIn);

    // const { username, password, stayLoggedIn } = req.body;
    // console.log('Username:', username);
    // console.log('Password:', password);
    // console.log('Stay Logged In:', stayLoggedIn);
    // console.log(req.body.formData);

    let isValidCreateAccount = true;
    if (req.body.username == "" && req.body.password == "")
        {
        
            // console.log("Form not valid!")

            // console.log("Form not valid!");
            // res.status(400).json({ error: 'Username and password are required.' });
            // return;


        }
    else
    {
        // let isValidLogin = false;
        console.log(req.body.username)
        console.log(req.body.username)
  
        for (let i = 0; i < accountsLength; i += 1) {
            if (accounts[i].username == req.body.username){
                // res.render("RegisterForm");
                console.log("Username already in use")
                console.log("Username already in use")
                
                isValidCreateAccount = false;
                // res.redirect('http://localhost:3000/');

                break; 
            }
        }
        if (isValidCreateAccount == true ){
            console.log("Form submitted");
            
            try {
                // Pitäisikö hash myös nimi ?
                // gensalt default is 10. Few hashes per seconds. 20 = few days per hash generation
                // const salt = await bcrypt.genSalt()
                // After tell the salt to use to the password cryption
                // const hashedPassword = await bcrypt.hash(req.body.password, salt);
                // console.log("Salt = ", salt)
                
                
                // Sama asia kuin yläpuolella. 10 = await bcrypt.genSalt().
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                
                // bcrypt saves the salt at the begin and the salted password after that. password = salt + salted password
                console.log("Salted password = ", hashedPassword)
                accounts.push(new Person(req.body.username, 0, hashedPassword, accountNumber, false, accountNumber, -100));
                if (req.body.stayLoggedIn) {
                    console.log('The stayLoggedIn checkbox is checked');
                    req.session.cookie.maxAge = cookieMaxAge;
                } else {
                    req.session.cookie.maxAge = null;
                }
            }
            catch
            {
                console.log("Error with bcrypt while pushing account array")
            }
            
            // accounts.push(new Person(req.body.username, 0, req.body.password));
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            req.session.isLoggedIn = true;
            req.session.isSeller = false;
            req.session.accountNumber = accountNumber;
            // req.session.sellerNumber     = desiredAccount.sellerNumber
            
            accountNumber = accountNumber + 1
            console.log("AL DONSEEEE")
            console.log("AL DONSEEEE")
            console.log("AL DONSEEEE")
        } else{
            console.log("Käyttäjänimi jo käytössä 2!!!")
            console.log("Käyttäjänimi jo käytössä 2!!!")
            console.log("Käyttäjänimi jo käytössä 2!!!")
        }
    }
    
    console.log(req.session.username);
    console.log(req.session.password + "\n\n\n");
    console.log(isValidCreateAccount)
    console.log(isValidCreateAccount)

    console.log(accounts)
    
    res.send({isValidCreateAccount});
})




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











app.get('/Is-Logged-In', (req, res) => {
    // console.log("\n\n/Is-Logged-In")
    // console.log(req.session.username);
    // console.log(req.session);
    // console.log("Account",accounts, "Tossa\n")
    

    

    // console.log("\n\n\n Account numbero :", req.session.accountNumber)
    // console.log("\n\n\n Account numbero :", req.session)
    
    if (req.session.isLoggedIn == true){
        console.log("True");
        data = {
            isLoggedIn: true
        }
    } 
    else 
    {
        // console.log("False");
        data = {
            isLoggedIn: false
        }
    }
    res.send(data);
})





app.post('/ChangeSession', (req, res) => {
    const receivedData = req.body;
    console.log("aaaaaa\naaa\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nACCOUNT START\n",accounts)
    console.log(req.body);
    console.log(req.body.sellerNumber);
    console.log(req.body.sellerNumber);
    console.log('Data received from Backend #20:', receivedData);
    console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    // console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    // console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    // console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    // console.log('Data received from Backend #20:', receivedData.accountNumberTrue);
    // console.log('Data received from Backend #2:', "HEEEOOOOO");
    // console.log('Data received from Backend #2:', "HEEEOOOOO");
    // req.session.cookie.maxAge = cookieMaxAge;
    // req.session.isSeller = true
    // console.log("\n\n\nSeller Session\n", req.session)
    // console.log("\n\n\nSeller Session\n", req.session.isSeller)

    

    let desiredAccount = accounts.find((account) => account.accountNumber == receivedData.accountNumberTrue);
    console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // Make sure req.session is initialized before setting properties on it
    req.session = req.session || {};  // Initialize if undefined

    desiredAccount.isSeller      = true
    desiredAccount.sellerNumber  = req.body.sellerNumber

    req.session.isSeller         = true
    req.session.sellerNumber     = desiredAccount.sellerNumber
    req.session.accountNumber    = desiredAccount.accountNumber

    console.log("\n\n\nAAACCOUNNTTTTTTT :     ",desiredAccount,"\n\n\n")
    console.log("\n\n\nSESSIONNNN       :      ",req.session,  "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")


    res.status(200).json({ success: true, message: 'Request from Backend #2 processed STEP 1' });
});



app.get('/CheckAccountId', (req, res) => {
    console.log('Data received from Backend #2:', "HIIIIIIIIII");
    // req.session.cookie.maxAge = cookieMaxAge;
    // req.session.isSeller = true
    // console.log("\n\n\nSeller Session\n", req.session)
    console.log("\n\n\n Account numbero oikea!!!1 :", req.session.accountNumber)
    console.log("\n\n\n Account numbero aaa :", req.session)
    console.log("\n\n\n Account numbero OIKEAA! :", req.session.accountNumber)


    
    // let desiredAccount = accounts.find((account) => account.accountNumber == receivedData.accountNumberTrue);
    // console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // req.session.accountNumber = desiredAccount.accountNumber

    // console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // console.log(req.session);

    // let desiredAccount = accounts.find((account) => account.sellerNumber == req.session.sellerNumber);
    // console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // req.session.accountNumber = desiredAccount.accountNumber

    // console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // console.log("SESSIOO: ",req.session);
    console.log("\n\nAccount",accounts, "Tossa\n")
    
    data = {
        accountNumber: req.session.accountNumber
    }
    
    res.send(data);
});



app.get('/CheckSellerNumber', (req, res) => {
    console.log('Data received from Backend #999:', "HIIIIIIIIII");
    // req.session.cookie.maxAge = cookieMaxAge;
    // req.session.isSeller = true
    // console.log("\n\n\nSeller Session\n", req.session)
    // console.log("\n\n\n Account numbero oikea!!!1 :", req.session.sellerNumber)
    console.log("\n\n\n Account numbero aaa :", req.session)
    console.log("\n\n\n Account numbero OIKEAA! :", req.session.sellerNumber)
    console.log("\n\n\n Account numbero OIKEAA! :", req.session.sellerNumber)
 



    let desiredAccount = accounts.find((account) => account.accountNumber == req.session.accountNumber);
    // let desiredAccount = req.session.accountNumber;
    console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    // req.session.sellerNumber = desiredAccount.sellerNumber

    console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

    console.log(req.session);
    console.log("\n\nAccount",accounts, "Tossa NYTTT TÄÄLLÄÄÄ\n.\n+\nn\nn\nn\n")
    
    data = {
        sellerNumber: req.session.sellerNumber
    }
    
    res.json(data);
});


app.get('/SessionSeller', (req, res) => {
    
    console.log('\n\nData received from Backend #2:', "HEEEOOOOO 22222\n\n");
    
    // console.log("\n\n\nSeller Session 11111\n", req.session)
    // console.log("\n\n\nSeller Session\n", req.session.isSeller)
    if (req.session.username){
        console.log(req.session.username)
        console.log(req.session.username)



        let desiredAccount = accounts.find((account) => account.username == req.session.username);
        console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")

        // desiredAccount.isSeller = true

        console.log("\n\n\nAAACCOUNNTTTTTTT:     ",desiredAccount,"\n\n\n")
        
        req.session.isSeller = desiredAccount.isSeller
        req.session.sellerNumber = desiredAccount.sellerNumber

        
        if (req.session.isSeller == true) {
            // console.log("AAAMENNNN")
            // console.log("AAAMENNNN")
            // console.log("AAAMENNNN")
            // console.log("AAAMENNNN")

            data = {
                isRegistered: true
            }
        }
        else{
            // console.log("NOUUUU")
            // console.log("NOUUUU")
            // console.log("NOUUUU")
            data = {
                isRegistered: false
            }
        }
        
        res.send(data);
    }else{
        res.json({ message: 'Success!' });
    }
});


app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
    );
