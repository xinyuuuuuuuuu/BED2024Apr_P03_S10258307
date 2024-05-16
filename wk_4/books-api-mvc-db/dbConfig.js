// file defines an pbj containing your database connection details
module.exports = {
    user: "yy", // sql server login username
    password: "8910", // sql server login pw
    server: "localhost",
    database: "bed_db",
    trustServerCertificate: true,
    options: {
        port: 1433, // default sql server port
        connectionTimeout: 60000, // connection timeout value - connection timeout in milliseconod
    },
};