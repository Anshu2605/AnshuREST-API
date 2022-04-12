module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "anshu123",
    DB: "testdb",
    dialect: "postgres",
    port: 5432,                             //database port number
    pool: {  
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};