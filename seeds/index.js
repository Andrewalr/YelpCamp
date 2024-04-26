const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "661f2e76e8694c2c344660da",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dhbedxi4o/image/upload/v1713555407/YelpCamp/nfki9pt9lpyy2atuulu1.jpg",
          filename: "YelpCamp/nfki9pt9lpyy2atuulu1",
        },
        {
          url: "https://res.cloudinary.com/dhbedxi4o/image/upload/v1713555407/YelpCamp/obefdeoigsa7algyiyhz.jpg",
          filename: "YelpCamp/obefdeoigsa7algyiyhz",
        },
        {
          url: "https://res.cloudinary.com/dhbedxi4o/image/upload/v1713555407/YelpCamp/serntgviy8mmjaqeu6pn.jpg",
          filename: "YelpCamp/serntgviy8mmjaqeu6pn",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
