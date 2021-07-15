const mongoose = require('mongoose');
const Product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/medicarePlus', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("Mongo Conn Open");
    })
    .catch((err) => {
        console.log("Mongo Conn Error: ");
        console.log(err);
    });

var seedProducts = [
    {
        title: "Carboplatin 450mg", 
        image: "../assets/pharma.jpg",
        description: "This medication is prescribed for the treatment of ovarian cancer. It contains platinum; stops the growth of cancer cells.",
        price: 2333,
        type: "pharma"
    },
    {
        title: "Docataxel 80mg", 
        image: "../assets/pharma.jpg",
        description: "Docataxel 80mg Injections - 1 Pack. It is used in the treatment of various cancers, such as locally advanced or metastatic breast cancer.",
        price: 500,
        type: "pharma"
    },
    {
        title: "Fluorouracil", 
        image: "../assets/pharma.jpg",
        description: "Fluorouracil (5-FU) is a pyrimidine analogue used as an antineoplastic agent to treat multiple solid tumors including colon, rectal, breast, gastric.",
        price: 30,
        type: "pharma"
    },
    {
        title: "Paclitaxel", 
        image: "../assets/pharma.jpg",
        description: "Paclitaxel, sold under the brand name Taxol treats a number of cancers - ovarian, esophageal, breast etc.",
        price: 4100,
        type: "pharma"
    },
    {
        title: "Tamoxifen", 
        image: "../assets/pharma.jpg",
        description: "Tamoxifen, sold under the brand name Nolvadex, is a selective estrogen receptor modulator used to prevent breast cancer in women.",
        price: 1550,
        type: "pharma"
    },
    {
        title: "Epirubicin", 
        image: "../assets/pharma.jpg",
        description: "Epirubicin is an anthracycline drug used for chemotherapy or in combination with other medications to treat breast cancer in post-surgical patients.",
        price: 2333,
        type: "pharma"
    },
    {
        title: "Letrozole 2.5mg Tablet 10s", 
        image: "../assets/pharma.jpg",
        description: "Femara (letrozole) is a non-steroidal aromatase inhibitor (lowers estrogen production) used to treat breast cancer in postmenopausal women.",
        price: 390,
        type: "pharma"
    },
    {
        title: "Cyphos 500mg Injection", 
        image: "../assets/pharma.jpg",
        description: "Cyclophosphamide, also known as cytophosphane among other names, is a medication used as chemotherapy and to suppress the immune system.",
        price: 75,
        type: "pharma"
    },
    {
        title: "Mammogram", 
        image: "../assets/diagnostic.jpg",
        description: "A mammogram is an X-ray of the breast. Mammograms are commonly used to screen for breast cancer.",
        price: 1000,
        type: "diag"
    },
    {
        title: "Breast Ultrasound", 
        image: "../assets/diagnostic.jpg",
        description: "Ultrasound may be used to determine whether a new breast lump is a solid mass or a fluid-filled cyst.",
        price: 1050,
        type: "diag"
    },
    {
        title: "Computerized tomography (CT) scan", 
        image: "../assets/diagnostic.jpg",
        description: "To establish the extent (stage) of your cancer after positive diagnosis.",
        price: 1050,
        type: "diag"
    },
    {
        title: "Breast magnetic resonance imaging (MRI)", 
        image: "../assets/diagnostic.jpg",
        description: "An MRI machine uses a magnet and radio waves to create pictures of the interior of your breast.",
        price: 3000,
        type: "diag"
    }
    
];

async function addData() {
    await Product.insertMany(seedProducts);
    console.log("Added seed data.")
}

addData();