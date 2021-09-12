var path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const contact = require(path.join(__dirname, '..', 'model', 'contact'));

const getLinkByUsername = async (username) => {
    let userLink;
    await contact.findOne({'username' : username}, (err, data) => {
        if(data) {
            userLink = data.toObject().link;
        } else {
            userLink = `${config.DOMAIN}/${config.NOT_FOUND_PATH}`;
        }
    });
    return userLink;
};

module.exports = {
    getLinkByUsername
}
