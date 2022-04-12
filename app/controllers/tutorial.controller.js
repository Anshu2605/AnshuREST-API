const { copyDone } = require("pg-protocol/dist/messages");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.createRecord = (req, res) => {
    //Validate request:
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Tutorial:
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };


    //Save Tutorial in the database:
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the tutorial"
            });
        });
};

//Retrieve all tutorials from the database and retrieving by title:
exports.findAllTutorials = (req, res) => {

    let condition = {};
    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving tutorials.'
            });
        });
};

//Retrieve the tutorial data by id:
exports.findTutorialByID = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: 'Cannot find Tutorial with id=${id}'
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};


//Retrieve the tutorial by title:
exports.findTutorialByTitle = (req, res) => {
    const tutorialTitle = req.query.title;
    var condition = tutorialTitle ? { title: { [Op.iLike]: '%${tutorialTitle}%' } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving tutorials.'
            });
        });
};


//Update the object by id:
exports.updateTutorialId = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                console.log(num);
                res.send({
                    message: "Tutorial was updated successfully;"
                });
            } else {
                res.send({
                    message: "Cannot update Tutorial with id = ${id}."
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};


//Update the object by published:
exports.updateTutorialPublished = (req, res) => {
    const published = req.params.published;
    Tutorial.update(req.body, {
        where: { published: published }
    })
        .then(data => {
            if (data) {
                res.send({
                    message: "Tutorial was updated"
                });
            } else {
                res.send({
                    message: "Cannot update Tutorial with published = ${published}."
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error updating the Tutorial with published=" + published
            });
        });
};



//Delete the object by id:
exports.deleteTutorialByID = (req, res) => {
    console.log("id");
    const id = req.params.id;
    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Tutorial with id=${id}."
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete the Tutorial with id = " + id,
            });
        });
};


//Delete the object by Title:
exports.deleteTutorialByTitle = (req, res) => {
    const tutorialTitle = req.params.title;
    Tutorial.destroy({
        where: { title: tutorialTitle }
    })
        .then(data => {
            if (data == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Tutorial with title = " + tutorialTitle
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete the Tutorial with title = " + tutorialTitle
            });
        });
};

//Delete the Tutorial object:
exports.deleteTutorial = (req, res) => {
    const tutorialId = req.body.id;
    const tutorialTitle = req.body.title;

    let condition = {};

    if (tutorialId && tutorialTitle) {                 //when both are not null 
        console.log("when both are not null");
        condition = {
            [Op.and]: [
                {
                    title: { [Op.eq]: tutorialTitle }
                },
                {
                    id: { [Op.eq]: tutorialId }
                }
            ]
        }
    }
    else if (tutorialId || tutorialTitle) {                    //when either of the one is null
        if (tutorialId) {                                       //when title is not null
            condition = {
                id: { [Op.eq]: tutorialId }
            }
        }
        else if (tutorialTitle) {                               //when id is not null
            condition = {
                title: { [Op.eq]: tutorialTitle }
            }

        }
        else {
            condition = {};                                         //dont do anything
        }

        Tutorial.destroy({
            where: condition
        }).then(data => {
            if (data == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: "Cannot delete Tutorial with title = " + tutorialTitle
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete the Tutorial with title = " + tutorialTitle
            });
        });
    };
};


/*
const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null; */