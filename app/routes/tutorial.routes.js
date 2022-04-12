const tutorials = require("../controllers/tutorial.controller.js");

module.exports = app => {
    var router = require('express').Router();

    router.post("/createRecord", tutorials.createRecord);
    router.get("/findAllTutorials", tutorials.findAllTutorials);
    router.get('/findTutorialByID/:id', tutorials.findTutorialByID);
    router.get('/findTutorialByTitle', tutorials.findTutorialByTitle);
    router.put('/updateTutorialId/:id', tutorials.updateTutorialId);
    router.put('/updateTutorialPublished/:published', tutorials.updateTutorialPublished);
    router.delete("/deleteTutorialByID/:id", tutorials.deleteTutorialByID);
    router.delete("/deleteTutorialByTitle/:title", tutorials.deleteTutorialByTitle);
    router.delete("/deleteTutorial", tutorials.deleteTutorial);
    app.use('/api/tutorials', router);

};
