import {dbCurrent, dbNext, dbPrevious} from "../models";

export const getDbSaions = (saison) => {
    let db;
    switch (saison) {
        case "current":
            db = dbCurrent;
            break;
        case "next":
            db = dbNext;
            break;
        case "previous":
            db = dbPrevious;
            break;
        default:
            db = dbCurrent;
            break;
    }
    return db;
}