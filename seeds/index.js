// sudo systemctl start mongod  // To start the mongoDB server
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedhelper');


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is Connected:)');
});


// Made a index.js file whenever we want to seed data in our database.

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        let rand = Math.floor(Math.random() * 100) + 1;
        const camp = new Campground({
            title: `${descriptors[Math.floor(Math.random() * descriptors.length)]}, ${places[Math.floor(Math.random() * places.length)]}`,
            location: `${cities[rand].name}, ${cities[rand].state}`,
            author: "60e5338feae6d7234960ed3f",
            geometry: { type: 'Point', coordinates: [cities[rand].lon, cities[rand].lat] },
            images: [
                {
                    url: 'https://res.cloudinary.com/unseenwarrior/image/upload/v1625897533/Yelp-camp/ki2qvqghqfwu1vadpzwv.jpg',
                    filename: 'Yelp-camp/ki2qvqghqfwu1vadpzwv'
                }
            ],
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore autem expedita, optio necessitatibus consequuntur magni tenetur odit harum illo nobis sunt quam. Repellat inventore nesciunt veritatis perspiciatis rerum, fuga iste!',
            price: rand
        });
        await camp.save();
    }
    console.log('New data is added');
}

seedDB().then(() => {
    mongoose.connection.close();
});