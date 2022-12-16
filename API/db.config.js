export const dbConfig = {
    HOST: "localhost",
    USER: "simon",
    PASSWORD: "simon",
    DB: "fimu",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
