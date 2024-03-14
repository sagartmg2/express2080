const mongoose = require("mongoose");

const url =
  process.env.NODE_ENV == "production"
    ? process.env.MONGODB_URL_PROD
    : process.env.MONGODB_URL_DEV;

    
mongoose.connect(url).then(() => console.log("DB Connected!"));
