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

const getLinkByNumber = async (number) => {
    let userLink;
    await contact.findOne({'number' : number}, (err, data) => {
        if(data) {
            userLink = data.toObject().link;
        } else {
            userLink = '';
        }
    });
    return userLink;
};

const saveLink = async (number, link) => {
    let res = `${config.DOMAIN}/<su nombre de usuario>`;
    await contact.updateOne(
        {'number': number},
        {'link': link},
        {upsert: false}
    );
    await contact.findOne({'number' : number}, (err, data) => {
        if(data) {
            const { username } = data.toObject();
            res = `${config.DOMAIN}/${username}`;
        } else {
            res = '';
        }
    });
    return res;
};
const saveUsername = async (userNumber, newUsername) => {
    let wasChanged = false;
    let exists = true;
    await contact.findOne({'username' : newUsername}, (err, data) => {
        if(data) {
            exists = true;
        } else {
            exists = false;
        }
    });

    if(!exists) {
        await contact.updateOne(
            {'number': userNumber},
            {'username': newUsername},
            {upsert: true, new: true, setDefaultsOnInsert: true}
        );
        wasChanged = true;
    }
    return wasChanged;
};

module.exports = {
    getLinkByUsername,
    getLinkByNumber,
    saveLink,
    saveUsername
}
