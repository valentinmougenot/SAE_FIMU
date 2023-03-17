import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    HOST: process.env.HOSTNAME,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

export default dbConfig;