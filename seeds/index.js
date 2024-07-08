const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/CampgroundYelp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log("database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '6680f559c858260ab776a76d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis earum voluptate ipsa dolores autem perspiciatis sed, vel ducimus, commodi aspernatur laudantium perferendis tempora animi? Quae quaerat quidem nobis praesentium commodi.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyksiw4xd/image/upload/v1720086695/YelpCamp/tq0hg7fduyhuxzt7a7pq.jpg',
                    filename: 'YelpCamp/tq0hg7fduyhuxzt7a7pq'
                },
                {
                    url: 'https://res.cloudinary.com/dyksiw4xd/image/upload/v1720086695/YelpCamp/pxorwi6mg4sv1bhuldua.jpg',
                    filename: 'YelpCamp/pxorwi6mg4sv1bhuldua'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
