import {db} from '../models/index.js';
import {pool} from '../db.config.js';
const Saison = db.saison;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une saison"
        });
        return;
    }
    if (!req.body.annee) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const saison = {
        annee: req.body.annee,
        couleur1: req.body.couleur1,
        couleur2: req.body.couleur2
    };
    
    Saison.create(saison)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Saison."
            });
        });
}

export const findAll = (req, res) => {
    Saison.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Saisons."
            });
        });
}

export const findOne = (req, res) => {
    const id = req.params.id;
    Saison.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Saison with id=" + id
            });
        });
}

export const update = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier une saison"
        });
        return;
    }
    const id = req.params.id;

    Saison.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Saison was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Saison with id=${id}. Maybe Saison was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Saison with id=" + id
            });
        });
}

export const deleteOne = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer une saison"
        });
        return;
    }
    const id = req.params.id;

    Saison.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Saison was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Saison with id=${id}. Maybe Saison was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Saison with id=" + id
            });
        });
}

export const deleteAll = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour supprimer toutes les saisons"
        });
        return;
    }
    Saison.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Saisons were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Saisons."
            });
        });
}

export const switchNextToCurrentScene= (req, res) => {
    pool.query('BEGIN TRANSACTION INSERT INTO ' +
        'currentseason.scenes(libelle,jauge,latitude,longitude,id_typescene) ' +
        'SELECT libelle,jauge,latitude,longitude,id_typescene' +
        'FROM nextseason.scenes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

export const deleteCurrentBeforeSwitchScene= (req, res) => {
    pool.query('DELETE FROM nextseason.scenes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

export const switchPreviousArtistes = (req, res) => {
    pool.query('BEGIN TRANSACTION INSERT INTO ' +
        'previousseasons.artistes(nom,photo,biograpghie,lien_video,lien_site,id_categorie) ' +
        'SELECT nom,photo,biograpghie,lien_video,lien_site,id_categorie ' +
        'FROM currentseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}


export const switchNextArtistes = (req, res) => {
    pool.query('BEGIN TRANSACTION INSERT INTO ' +
        'currentseason.artistes(id,nom,photo,biograpghie,lien_video,lien_site,id_categorie) ' +
        'SELECT id,nom,photo,biograpghie,lien_video,lite_site,id_categorie ' +
        'FROM nextseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

export const switchCurrentConcert= (req, res) => {
    pool.query('BEGIN TRANSACTION INSERT INTO ' +
        'currentseason.cocnert(id_scene,id_artiste,date_debut,duree,nb_personne,annee) ' +
        'SELECT id_scene,id_artiste,date_debut,duree,nb_personne,annee' +
        'FROM nextseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }
}

export const switchPreviousPossede = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un lien entre un réseau social et un artiste"
        });
        return;
    }
    pool.query('BEGIN TRANSACTION INSERT INTO ' +
        'currentseason.scenes(id,libelle,jauge,latitude,longitude,id_typescene) ' +
        'SELECT id,libelle,jauge,latitude,longitude,id_typescene' +
        'FROM nextseason.scenes;') , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    }

}

export const switchCurrentToPreviousSeason = async (req, res) => {
    let n;
    let resultats;
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour modifier un lien entre un réseau social et un artiste"
        });
        return;
    }
    await pool.query('SELECT COUNT (*) FROM currentseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        n = JSON.stringify(results.rows);
    }

    await pool.query('SELECT * FROM currentseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
        resultats = results;
    }
    n = JSON.stringify(resultats.length);

    let annee;
    await pool.query('SELECT annee FROM currentseason.concert LIMIT 1;') , (error, results) => {
        if (error) {
            throw error
        }
        annee = JSON.stringify(results[0].annee);
    }
    console.log(4)
    for (let i = 0; i < n; i++) {
        let id;
        console.log(5)
        await pool.query('INSERT INTO previousseasons.artistes(nom,photo,biograpghie,lien_video,lien_site,id_categorie) ' +
            'VALUES ($1,$2,$3,$4,$5,$6)', [resultats[i].nom, resultats[i].photo, resultats[i].biographie, resultats[i].lien_video, resultats[i].lien_site, resultats[i].id_categorie], (error, results) => {
            if (error) {
                throw error
            }
        })
        console.log(6)
        await pool.query('SELECT MAX(id) FROM previousseasons.artistes;') , (error, results) => {
            if (error) {
                throw error
            }
            id = JSON.stringify(results);
        }
        let possede = [];
        console.log(7)
        await pool.query('SELECT * FROM currentseason.possede WHERE id_artiste = $1', [resultats[i].id], (error, results) => {
            if (error) {
                throw error
            }
            possede = JSON.stringify(results);
        })
        console.log(8)
        for (let j = 0; j < possede.length; j++) {
            console.log(12)
            await pool.query('INSERT INTO previousseasons.possede(id_artiste,id_reseaux_sociaux,lien) ' +
                'VALUES ($1,$2,$3)', [id, possede[j].id_reseaux_sociaux, possede[j].lien], (error, results) => {
                if (error) {
                    throw error
                }
            })
        }
        console.log(9)
        await pool.query('INSERT INTO previousseasons.joue(id_artiste,annee) ' +
            'VALUES ($1,$2)', [id, annee], (error, results) => {
            if (error) {
                throw error
            }
        })
        let fait;
        console.log(10)
        await pool.query('SELECT * FROM currentseason.fait WHERE id_artiste = $1', [resultats[i].id], (error, results) => {
            if (error) {
                throw error
            }
            fait = JSON.stringify(results);
        })
        console.log(11)
        for (let j = 0; j < fait.length; j++) {
            console.log(13)
            await pool.query('INSERT INTO previousseasons.fait(id_artiste,id_genre) ' +
                'VALUES ($1,$2)', [id, fait[j].id_genre], (error, results) => {
                if (error) {
                    throw error
                }
            })
        }

    }
    console.log(14)
    await pool.query('DELETE FROM currentseason.artistes;') , (error, results) => {
        if (error) {
            throw error
        }
    }
    console.log(15)
    await pool.query('DELETE FROM currentseason.concerts;') , (error, results) => {
        if (error) {
            throw error
        }
    }
    console.log(16)
    await pool.query('DELETE FROM currentseason.scenes;') , (error, results) => {
        if (error) {
            throw error
        }
    }
}