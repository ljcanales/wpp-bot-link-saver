const mongoose = require('mongoose');
const config = require('./config')

const DATABASE_URI = config.DATABASE_URI;

mongoose.set('useFindAndModify', false);
mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(e));
