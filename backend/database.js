const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "test",
    database: "vueNodeProject",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

//autoexecute
//if such table does not exist, a table for storing user credentials will be created
const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(100), 
    profile_picture VARCHAR(200)//path to profile picture
    );`;
execute(createTblQuery).then(result => {
    if (result) {
        console.log('Table for users created');
    }
});


//if a tabel for posts containing their dates and content does not exist, it will be created
const createPostsTableQuery = `
CREATE TABLE IF NOT EXISTS "posts" (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    postdate DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(386) NOT NULL 
);
`;
execute(createPostsTableQuery).then(result => {
    if (result) {
        console.log('Table for posts created');
    }
});

module.exports = pool;