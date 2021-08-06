const express = require('express');
const app = express();
const Router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const imp = require('./Scheme.js');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(Router);

mongoose.connect('mongodb://localhost:27017/categoriesdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function (err) {
    if (err) return console.log(err);
    app.listen(3000,function () {
            console.log('Server is running');
        });
});

Router.get('/categories', async function (request, response) {
    try {
        let findUser = await imp.User.find({});
        response.send(findUser);
    } catch (err) {
        console.log('err' + err);
        response.status(400).send(err);
    }
});

Router.get('/categories/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let findOneUser = await imp.User.findOne({
            _id: id
        });
        response.send(findOneUser);
    } catch (err) {
        console.log('err' + err);
        response.status(400).send(err);
    }
});

Router.post('/categories/create', async function (request, response) {
    if (!request.body.name) {
        response.status(400).send('userName is required');
    }

    try {
        let {
            name
        } = request.body;

        const user = new imp.User({
            name
        });
        const saveUser = await user.save();
        response.send(saveUser);
    } catch (err) {
        console.log('err ' + err);
        response.status(400).send(err);
    }
});

Router.delete('/categories/:id', async function (request, response) {
    try {
        let id = request.params.id;
        let deleteUser = await imp.User.deleteOne({
            _id: id
        });
        response.send(deleteUser);
    } catch (err) {
        console.log('err' + err);
        response.status(404).send('Not found');
    }
});

Router.put('/categories/:id', async function (request, response) {
    if (!request.body.name) {
        response.status(400).send('userName is required')
    };

    try {
let id = request.params.id;
        let {
            name
        } = request.body;

        let replaceUser = await imp.User.replaceOne({
            _id : id
        }, {
            name
        });
        response.send(replaceUser);
    } catch (err) {
        console.log('err ' + err);
        response.status(404).send('Not found');

    }
});