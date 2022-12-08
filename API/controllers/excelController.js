var Excel = require('exceljs')
var path = require('path')
const {pool} = require("../db.config.js");

var wb = new Excel.Workbook();
var filePath = path.resolve(__dirname, 'test.xlsx')

wb.xlsx.readFile(filePath).then(function () {
    var artistes = [[]];
    var scenes = [[]];
    var concerts = [[]];
    var prestataires = [[]];
    var pays = [[]];
    var genres = [[]];
    var categories = [[]];
    var possede = [[]];


    wb.eachSheet(function (worksheet, sheetId) {
        if (worksheet.name === 'artistes') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    artistes[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'scenes') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    scenes[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }

        else if(worksheet.name === 'concerts') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    concerts[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'prestataires') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    prestataires[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'pays') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    pays[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'genres') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    genres[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'categories') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    categories[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else if (worksheet.name === 'possede') {
            worksheet.eachRow(function (row, rowNumber) {
                row.eachCell(function (cell, colNumber) {
                    possede[rowNumber - 1][colNumber - 1] = cell.value;
                });
            })
        }
        else{
            throw new Error("Erreur de nom de feuille");
        }
    });

    pool.query("INSERT INTO nextSeasons.artistes (nom,photo,biographie,lien_video,lien_site,id_categorie) VALUES $1", [artistes], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
    pool.query("INSERT INTO nextSeasons.scenes (libelle,jauge,latitude,longitude,id_typescene) VALUES $1", [scenes], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
    pool.query("INSERT INTO nextSeasons.concerts (id_scene,id_artiste,date_debut,duree,nb_personnes,annee) VALUES $1", [concerts], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    });
    pool.query("INSERT INTO nextSeasons.prestataires (libelle,id_type_prestataire) VALUES $1", [prestataires], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })

    pool.query("INSERT INTO nextSeasons.pays (libelle) VALUES $1", [pays], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
    pool.query("INSERT INTO nextSeasons.genres (libelle) VALUES $1", [genres], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
    pool.query("INSERT INTO nextSeasons.categories (libelle) VALUES $1", [categories], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
    pool.query("INSERT INTO nextSeasons.possede (id_artiste,id_reseau_sociaux,lien) VALUES $1", [possede], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.rowCount);
    })
})