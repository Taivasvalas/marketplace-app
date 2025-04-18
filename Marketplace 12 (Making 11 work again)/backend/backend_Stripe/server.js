// Imports
require('dotenv').config()




const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const express = require('express')
const cors = require("cors")
const app = express()

const path = require("path");

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))


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
  // origin: 'http://localhost:3000',

  // For Other http requests (Update to accept requests from other places) --> 
  // origin: [`${BASE_URL30}`, `${BASE_URL80}`,  `${BASE_URL81}`],
  origin: '*',

  credentials: true,
}));

// Original
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));


// "express.json" Commented out below, so that we can access the raw data Stripe send using webhooks
// app.use(express.json())

// const { v4: uuidv4 } = require('uuid');
const router = express.Router();
// const fetch = require('node-fetch');

// const session = require('express-session');

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       // maxAge: 1000 * 10 * 60
//   },
// }));
    
      
      
// Variables:
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

accounts = []















items = []

const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
  console.log("\n\n\n\n\nFilen tiedot: ", file);
  cb(null, Date.now() + path.extname (file.originalname));
  },
});

const upload = multer({ storage: storage });



itemId = 76;

app.post("/upload", express.json(), upload.single("image"), (req, res) => {
  // Assuming you are saving the file in the "public" directory
  console.log("\n\nMyytävän Tuotteen Tiedot: ", req.body, "\n\n\n\n")
  console.log("\n\nMyytävän Tuotteen 2341231312: ", req.body.sellerNumber, "\n\n\n\n")
  
  // After "upload.single("image")" the req.file has more properties. Push items with req.file after that
  
  const imagePath = req.file.filename;
  // const imageUrl = `${BASE_URL81}/${imagePath}`;
  const imageUrl = `${BASE_URL81}/images/${imagePath}`;

  
  console.log("\n\nKUVA: ", req.file, "\n\n\n\n")
  
  
  items.push({
    name: req.body.name,
    description: req.body.description,
    info: req.body.info,
    price: req.body.price,
    currency: req.body.currency,
    sellerNumber: req.body.sellerNumber,  
    file: req.file,
    itemId: itemId
  })

  itemId = itemId + 1;

  console.log(items)

  // console.log("ITEMITTTT :",items)

  res.json({ imageUrl });
});












app.get("/get-items", (req, res) => {
  console.log("ITEMEIOTÄ* VIHDOIN",items)
  // console.log("ITEMEIOTÄ* VIHDOIN", items[0].sellerNumber);
  const itemsWithImageUrls = items.map((item) => ({
    name: item.name,
    description: item.description,
    info: item.info,
    price: item.price,
    currency: item.currency,
    sellerNumber: item.sellerNumber,
    itemId: item.itemId,
    imageUrl: `${BASE_URL81}/images/${item.file.filename}`,
  }));

  // console.log("\n\n\nITEMIN IDDD\n\n", item.id)
  // console.log("\n\n\nITEMIN IDDD\n\n", item.id)
  // console.log("\n\n\nITEMIN IDDD\n\n", item.id)
  // console.log("\n\n\nITEMIN IDDD\n\n", item.id)

  res.json(itemsWithImageUrls);
});

















// Routes

app.get("/", (req, res) => {
  // data = {
    //   x: 10,
  //   y: 20
  // }
  console.log(accounts)


  if (accounts[0] != undefined)
  {
      console.log("0: ",accounts[0].accountId)
    }
    if (accounts[1] != undefined)
    {
        console.log("1: ", accounts[1].accountId)
      }
      if (accounts[2] != undefined)
  {
    console.log("2: ", accounts[2].accountId)
  }

  res.send("You fetches localhost:8081/");
});




// For identifying the account. this specifies the account number
let metadataCounter = 0;

// Endpoint to initiate seller onboarding
app.post('/onboard-seller', express.json(), async (req, res) => {
  console.log("\n\n\n\nOnboarding Seller")


  // const response = await fetch("http://localhost:8080/CheckAccountId", {
  //       // method: 'POST',
  //       mode: "cors",
  //       credentials: 'include',
  //       // headers: {
  //       //   'Content-Type': 'application/json',
  //       //   // Add any other headers as needed
  //       // },
  //       // body: JSON.stringify(dataToSend),
  // });

  // if (!response.ok) {
  //   throw new Error(`Error from Backend #1: ${response.statusText}`);
  // }
  // const accountNumber = await response.json();
  // console.log('\n\n\nData from Backend #1 nro 1123:', accountNumber.accountNumber, "\n\n\n");

  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  console.log("IDENTIFYYY: ", req.body.accountNumberTrue)
  

  try {
    const account = await stripe.accounts.create({
      type: 'express', // or 'custom' if you need more control
      business_type: 'individual',
      business_profile: {
        url: 'www.Buy.com', // Prefill with the website URL
        mcc: '5734', // Merchant Category Code (MCC) for Software (you can adjust based on your specific business)
      },
      individual: {
        first_name: 'Test',
        last_name: 'Account',
        email: 'test@example.com',
        phone: '+358451741255', // Include the country code for Finland (+358)
        address: {
          line1: '123 Main St',
          city: 'Helsinki',
          postal_code: '00170',
          state: '', // Leave empty or provide if applicable
          country: 'FI',
        },
        dob: {
          day: 1,        // Replace with the actual day of birth
          month: 1,      // Replace with the actual month of birth
          year: 1990,    // Replace with the actual year of birth
        },
        // Add other fields as needed
      },
      
      metadata: {
        uniqueId: metadataCounter,
        uniqueId2: req.body.accountNumberTrue,
      }
    });

    // laita session.accounts.accountId: accountId OIKEASSA KOODISSA
    accounts.push({
      accountId: account.id,
      uniqueId: metadataCounter,
    })
    

    console.log("EKA AKKOUNTTI CONSOLI",accounts)

    metadataCounter = metadataCounter + 1;


    
// For creating costum account
  //   type: 'custom',
  //   country: 'Fi',
  //   email: 'jenny.rosen@example.com',
  //   business_type: 'individual',
  //   individual: {
  //     first_name: 'Jenny',
  //     last_name: 'Rosen',
  //     // Only include the fields you want to collect
  //     email: 'jenny.rosen@example.com',
  //     dob: {
  //       day: 1,
  //       month: 1,
  //       year: 1990,
  //     },
  //     phone: '2015550123',
  //     // Add other fields as needed
  //   },
  //   capabilities: {
  //     card_payments: { requested: true },
  //     transfers: { requested: true },
  //   },
  // });



    const accountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${BASE_URL30}/`, // Redirect URL after refreshing
      return_url: `${BASE_URL30}/`, // Redirect URL after completing onboarding
      type: 'account_onboarding',
    });

    console.log('\nCreated AccountLinks:', accountLinks);
    console.log('\nCreated Account Registeration Link:', accountLinks.url, "\n\n\n\n");

    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)
    console.log(accountLinks.url)

    res.json({ url: accountLinks.url });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('Error onboarding seller');
  }
});





app.post('/webhook-account-created', express.raw({ type: 'application/json' }), async (req, res) => {

  console.log("\n\n\n\nEndpoint Secret: ", process.env.STRIPE_ENDPOINT_SECRET_WEBHOOK_ACCOUNT_CREATED)
  
  const sig = req.headers['stripe-signature'];
  console.log("\nSignature: ", sig)

  const rawBody = req.body
  console.log("\nRaw Body: ", rawBody)
  
  stringBody = req.body.toString();
  parsedBody = JSON.parse(stringBody)
  console.log("\nParsed Body: ", parsedBody)

  const accountInfo = await stripe.accounts.retrieve(parsedBody.data.object.account)
  const metadata = accountInfo.metadata
  const uniqueId = accountInfo.metadata.uniqueId
    
  let event;

  try {
    console.log("\n\n\n\nConstructEvent Begins")
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET_WEBHOOK_ACCOUNT_CREATED);
    console.log("ConstructEvent Successfull\n\n\n\n")

  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'account.external_account.created':

      

      // const dataToSend = {
      //   key1: 'value1',
      //   key2: 'value2',
      //   // Add other data as needed
      // };
      console.log(metadata.uniqueId2)
      console.log(metadata.uniqueId2)
      console.log(metadata.uniqueId2)
      console.log(metadata.uniqueId2)
      console.log(metadata.uniqueId2)



      const response = await fetch(`${BASE_URL80}/ChangeSession`, {
        method: 'POST',
        mode: "cors",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify({
          accountNumberTrue: metadata.uniqueId2,
          sellerNumber: metadata.uniqueId,
        }),
      });


      if (!response.ok) {
        console.log(response)
        throw new Error(`Error from Backend #1: ${response.statusText}`);
      }

      const responseData = await response.json();

      console.log('\n\n\nData from Backend #1:', responseData, "\n\n\n");
      
      
      const accountExternalAccountCreated = event.data.object;
      console.log("accountExternalAccountCreated: ", accountExternalAccountCreated)

      console.log("\n\n\n\nThe Metadata: ", metadata)
      console.log("The Unique ID: ", uniqueId, "\n")
      
      break;
    case 'account.external_account.deleted':
      const accountExternalAccountDeleted = event.data.object;
      console.log("accountExternalAccountDeleted: ", accountExternalAccountDeleted)

      break;
      case 'account.external_account.updated':
        const accountExternalAccountUpdated = event.data.object;
        console.log("accountExternalAccountUpdated: ", accountExternalAccountUpdated)
        
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.sendStatus(200);
});


const fs = require('fs');

app.post('/checkout-session-completed', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET_WEBHOOK_CHECKOUT_SESSION_COMPLETED);
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const metadata = session.metadata;
      const itemId = metadata.itemId;

      if (items[0].itemId == itemId) {
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
        console.log("GPT HUIJAAAA")
      }
      console.log("ITEMSSSSS\n\n\n\n\n\n\nIDDD\n\n\n\n\n ----> \n -->", items,"\n\n\n\n\n\n\n\n")
      console.log("ITEMSSSSS\n\n\n\n\n\n\nIDDD\n\n\n\n\n ----> \n -->", items[0].itemId,"\n\n\n\n\n\n\n\n")

      // Find the item in the items array with the same itemId
      // const itemIndex = items.findIndex(item => item.itemId === itemId);


      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        console.log(i)
        
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log(items[i].itemId)
        console.log(items[i].itemId)
        console.log(items[i].itemId)
        console.log(items[i].itemId)
        console.log(items[i].itemId)
        console.log(items[i].itemId)
        console.log(items[i].itemId)

        console.log("3333333333333")
        console.log("3333333333333")
        console.log(item.itemId)
        console.log(item.itemId)
        console.log(item.itemId)
        console.log(item.itemId)
        console.log(item.itemId)
        console.log(item.itemId)
        console.log(item.itemId)
        
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log("3333333333333")
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)
        console.log(itemId)

        if (item.itemId == itemId) {
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");
          console.log("XX");

          


        
          const removedItem = items.splice(i, 1)[0]; // Remove and get the removed item

          if (removedItem) {
            // Delete the associated picture file from the server
            const imagePath = path.join(__dirname, 'public', removedItem.file.filename);

            fs.unlink(imagePath, (err) => {
              if (err) {
                console.error('Error deleting image file:', err);
              } else {
                console.log('Image file deleted successfully');
              }
            });

            console.log('Item removed with itemId:', itemId);
          } else {
            console.log('No item removed from the items array');
          }
        break;
      
      }}


      // if (itemIndex !== -1) {
      //   // Remove the item from the items array
      //   items.splice(itemIndex, 1);
      //   console.log('Item removed with itemId:', itemId);
      // } else {
      //   console.log('Item not found in the items array with itemId:', itemId);
      // }
    //   break;
    // default:
    //   console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
});






app.post("/create-checkout-session", express.json(), async (req, res) => {
  try {
    console.log("\n\n\n\n\n\n\n\nn\nn\nn\nn KÄYTTÄJÄT",accounts, "\n\n\n")
    console.log(req.body)
    console.log(req.body)
    console.log(req.body.items)
    console.log(req.body.items.receiver)
    // Calculates the total price.
    // const totalPrice = req.body.price

    // Calculate application fee (0.9%)
    // const applicationFeeAmount = Math.round((totalPrice * 0.009));
    
    // console.log("Fee: ", applicationFeeAmount)
    // console.log("Total price: ", totalPrice)
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);
    console.log(req.body.items.itemId);

    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: toString(req.body.items.name),
            },
            unit_amount: req.body.items.price * 100, // 10 EUR in cents
          },
          quantity: 1,
        },
        // You can add more items if needed
        // For the custom product "Akii"
        // {
        //   price_data: {
        //     currency: "eur",
        //     product_data: {
        //       name: req.body.name,
        //     },
        //     unit_amount: 1000, // 10 EUR in cents
        //   },
        //   quantity: 1,
        // },
      ],
      

      metadata: {
        itemId: req.body.items.itemId
      },


      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      payment_intent_data: {
        // Specify the seller's account ID as the destination for the funds
        transfer_data: {
          destination: accounts[req.body.items.receiver].accountId,
        },
        application_fee_amount: req.body.items.price * 100 * 0.09,
      },
    })
    // console.log(accounts[req.body.items.receiver].accountId)
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})









// For test mode:

app.post('/get-dashboard-url', express.json(), async (req, res) => {
  console.log("asaoijasdfljhsadf")
  console.log("asaoijasdfljhsadf")
  console.log("asaoijasdfljhsadf")
  console.log("asaoijasdfljhsadf")


  console.log(accounts)
  console.log(accounts)
  console.log(accounts)

  console.log(req.body)
  console.log(req.body)
  
  console.log(req.body.accountNumber)
  console.log(req.body.accountNumber)

  console.log(req.body.sellerNumber)
  console.log(req.body.sellerNumber)
  
  try {
    const requestedUniqueId = req.body.sellerNumber; // The uniqueId of the requested account
    let accountThisId = null;
for (let i = 0; i < accounts.length; i++) {
  if (accounts[i].uniqueId == requestedUniqueId) {
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    console.log("JEPJEPJEP")
    accountThisId = accounts[i];
    break; // Stop the loop once the account is found
  }
}
    
    if (!accountThisId) {
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      console.log("EIIIKKKKKK")
      return res.status(404).json({ error: 'Account not found' });

    }
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.sellerNumber)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    console.log(accountThisId.accountId)
    
    // const dashboardUrl = `https://dashboard.stripe.com/test/accounts/${accountThisId.accountId}`;
    const dashboardUrl = await stripe.accounts.createLoginLink(accountThisId.accountId);
    console.log(dashboardUrl)
    console.log(dashboardUrl)
    console.log(dashboardUrl)
    console.log(dashboardUrl)
    console.log(dashboardUrl)
    console.log(dashboardUrl)
    console.log(dashboardUrl.url)
    
    res.json({ url: dashboardUrl.url }); // Return the URL to the client
  } catch (error) {
    console.error('Error generating dashboard URL:', error);
    res.status(500).json({ error: 'Error generating dashboard URL' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// itemId = 76;

// app.post("/upload", express.json(), upload.single("image"), (req, res) => {
//   // Assuming you are saving the file in the "public" directory
//   console.log("\n\nMyytävän Tuotteen Tiedot: ", req.body, "\n\n\n\n")
//   console.log("\n\nMyytävän Tuotteen 2341231312: ", req.body.sellerNumber, "\n\n\n\n")
  
//   // After "upload.single("image")" the req.file has more properties. Push items with req.file after that
  
//   const imagePath = req.file.filename;
//   const imageUrl = `http://localhost:8081/${imagePath}`;
  
//   console.log("\n\nKUVA: ", req.file, "\n\n\n\n")
  
  
//   items.push({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     currency: req.body.currency,
//     sellerNumber: req.body.sellerNumber,  
//     file: req.file,
//     itemId: itemId
//   })

//   itemId = itemId + 1;

//   console.log(items)

//   // console.log("ITEMITTTT :",items)

//   res.json({ imageUrl });
// });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Server:
app.listen(process.env.BACKEND_URL, () => {
  console.log(`Server is running on port ${process.env.BACKEND_URL}`);
});