var express = require('express');
var router = express.Router();

const users = require('../app/controllers/users');

//to get
router.post('/login', users.login);
router.get('/signup', users.signup);
router.get('/logout', users.logout);
router.get('/users', users.allUsers);

//to create
router.post('/users', users.create);

//find by id
router.param('userId', users.userById);

const Decks = require('../app/controllers/DealDecks');
router.get('/dealdecks', Decks.allDecks);
router.post('/dealdecks', Decks.insert);
router.get('/dealdecks/:dealdecksId', Decks.display);
router.put('/dealdecks/:dealdecksId', Decks.update);
router.delete('/dealdecks/:dealdecksId', Decks.delete);

router.param('deckId',Decks.decksById);

var index = require('../app/controllers/ind');
router.get('/', index.render);

module.exports = router;
