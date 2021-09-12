var path = require('path');
require(path.join(__dirname, 'database'));
const express = require('express');
const app = express();
const contactController = require(path.join(__dirname, 'controller', 'contactController'));

// settings
app.set('port', process.env.PORT || 3000);

// routes
app.get('/:username', async (req, res) => {
    const { username } = req.params;
    let link = await contactController.getLinkByUsername(username);
    res.redirect(link);
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')} ...`);
});

