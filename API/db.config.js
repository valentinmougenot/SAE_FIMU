import pkg from 'pg';
const {Pool} = pkg;

export const dbConfig = {
    HOST: "localhost",
    USER: "fimu",
    PASSWORD: "1212",
    DB: "fimu",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const credentials = {
    user:process.env.DB_USERNAME,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT
}
export const pool = new Pool(credentials);

