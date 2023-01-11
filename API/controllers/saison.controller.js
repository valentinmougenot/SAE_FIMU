import { concert } from '../models/concert.model.js';
import {db} from '../models/index.js';
const Saison = db.saison;
const Op = db.Sequelize.Op;

export const create = (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour créer une saison"
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
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer une saison"
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
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour supprimer toutes les saisons"
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

export const migrateDataToPreviousSeasons = async (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour migrer les données vers la saison précédente"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour migrer les données vers la saison précédente"
        });
        return;
    }
    try {
        let curAnnee = await db.concert.findOne({
            attributes: ['annee'],
        });
        curAnnee = curAnnee.annee;
    
        const artistesCurrentSeason = await db.artiste.findAll();
      
        for (let artiste of artistesCurrentSeason) {
            const id = artiste.dataValues.id;
            delete artiste.dataValues.id;
            let artistePreviousSeason = null;
            const artisteSearch = await db.artistePrevious.findOne({ where: { nom: artiste.dataValues.nom } });
            if (artisteSearch) {
                artistePreviousSeason = artisteSearch.dataValues;
            } 
            else {
                artistePreviousSeason = await db.artistePrevious.create(artiste.dataValues);
            }
            await db.jouePrevious.create({ id_artiste: artistePreviousSeason.id, annee: curAnnee });
    
            const faitCurrentSeason = await db.fait.findAll({ where: { id_artiste: id } });
            for (let fait of faitCurrentSeason) {
                const faitSearch = await db.faitPrevious.findOne({ where: { id_artiste: artistePreviousSeason.id, id_genre: fait.id_genre } });
                if (!faitSearch) {
                    await db.faitPrevious.create({id_artiste: artistePreviousSeason.id, id_genre: fait.id_genre});
                }
            }
    
            const nationaliteCurrentSeason = await db.nationalite.findAll({ where: { id_artiste: id } });
            for (let nationalite of nationaliteCurrentSeason) {
                const nationaliteSearch = await db.nationalitePrevious.findOne({ where: { id_artiste: artistePreviousSeason.id, id_pays: nationalite.dataValues.id_pays } });
                if (!nationaliteSearch) {
                    await db.nationalitePrevious.create({id_artiste: artistePreviousSeason.id, id_pays: nationalite.dataValues.id_pays});
                }
            }

            const possedeCurrentSeason = await db.possede.findAll({ where: { id_artiste: id } });
            for (let possede of possedeCurrentSeason) {
                if (!artisteSearch) {
                    await db.possedePrevious.create({id_artiste: artistePreviousSeason.id, id_reseaux_sociaux: possede.dataValues.id_reseaux_sociaux, lien: possede.dataValues.lien});
                }
                else {
                    const possedeSearch = await db.possedePrevious.findOne({ where: { id_artiste: artistePreviousSeason.id, id_reseaux_sociaux: possede.dataValues.id_reseaux_sociaux } });
                    if (!possedeSearch) {
                        await db.possedePrevious.create({id_artiste: artistePreviousSeason.id, id_reseaux_sociaux: possede.dataValues.id_reseaux_sociaux, lien: possede.dataValues.lien});
                    }
                    else {
                        await db.possedePrevious.update({lien: possede.dataValues.lien}, { where: { id_artiste: artistePreviousSeason.id, id_reseaux_sociaux: possede.dataValues.id_reseaux_sociaux } });
                    }
                }
            }

            await db.fait.destroy({ where: { id_artiste: id } });
            await db.nationalite.destroy({ where: { id_artiste: id } });
            await db.possede.destroy({ where: { id_artiste: id } });
        }
        await db.concert.destroy({ where: {} });
        await db.artiste.destroy({ where: {} });
        await db.propose.destroy({ where: {} });
        await db.stand.destroy({ where: {} });
        await db.scene.destroy({ where: {} });

        res.send({ message: "Migration des données vers la saison précédente effectuée avec succès" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Erreur lors de la migration des données vers la saison précédente"
        });
    }

}

export const migrateDataToCurrentSeason = async (req, res) => {
    if (!req.session.identifiant) {
        res.status(401).send({
            message: "Vous devez être connecté pour migrer les données vers la saison courrante"
        });
        return;
    }
    if (req.session.role !== "Administrateur") {
        res.status(401).send({
            message: "Vous devez être administrateur pour migrer les données vers la saison courrante"
        });
        return;
    }
    try {
        await db.artiste.destroy({ where: {} });
        const artistesNextSeason = await db.artisteNext.findAll();
        for (let artiste of artistesNextSeason) {
            await db.artiste.create(artiste.dataValues);
        }

        await db.scene.destroy({ where: {} });
        const scenesNextSeason = await db.sceneNext.findAll();
        for (let scene of scenesNextSeason) {
            await db.scene.create(scene.dataValues);
        }

        await db.stand.destroy({ where: {} });
        const standsNextSeason = await db.standNext.findAll();
        for (let stand of standsNextSeason) {
            await db.stand.create(stand.dataValues);
        }

        await db.concert.destroy({ where: {} });
        const concertsNextSeason = await db.concertNext.findAll();
        for (let concert of concertsNextSeason) {
            await db.concert.create(concert.dataValues);
        }

        await db.possede.destroy({ where: {} });
        const possedeNextSeason = await db.possedeNext.findAll();
        for (let possede of possedeNextSeason) {
            await db.possede.create(possede.dataValues);
        }

        await db.fait.destroy({ where: {} });
        const faitNextSeason = await db.faitNext.findAll();
        for (let fait of faitNextSeason) {
            await db.fait.create(fait.dataValues);
        }

        await db.nationalite.destroy({ where: {} });
        const nationaliteNextSeason = await db.nationaliteNext.findAll();
        for (let nationalite of nationaliteNextSeason) {
            await db.nationalite.create(nationalite.dataValues);
        }

        await db.propose.destroy({ where: {} });
        const proposeNextSeason = await db.proposeNext.findAll();
        for (let propose of proposeNextSeason) {
            await db.propose.create(propose.dataValues);
        }

        await db.proposeNext.destroy({ where: {} });
        await db.nationaliteNext.destroy({ where: {} });
        await db.faitNext.destroy({ where: {} });
        await db.possedeNext.destroy({ where: {} });
        await db.concertNext.destroy({ where: {} });
        await db.standNext.destroy({ where: {} });
        await db.sceneNext.destroy({ where: {} });
        await db.artisteNext.destroy({ where: {} });

        const curAnnee = await db.saison.max('annee');
        await db.saison.create({ annee: curAnnee + 1, couleur1: "#000000", couleur2: "#000000" });

        res.send({ message: "Migration des données vers la saison courante effectuée avec succès" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Erreur lors de la migration des données vers la saison courante"
        });
    }
}