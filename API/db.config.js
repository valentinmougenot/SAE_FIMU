export const dbConfig = {
    HOST: "localhost",
    USER: "valentinmougenot",
    PASSWORD: "root",
    DB: "current_season",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};