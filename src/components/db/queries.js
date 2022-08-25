// import pg from "pg";


// const Pool = pg.Pool

// const pool = new Pool({
//   host: "localhost",
//   user: "test",
//   password: "test",
//   database: "postgres",
//   port: 5432,
// });

// export const getListedNFTs = (request, response) => {
//   pool.query('SELECT * FROM ListedNFT ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }
// export const getRentedNFTs = (request, response) => {

//   pool.query('SELECT * FROM ListedNFT ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }

// module.exports = {
//   getListedNFTs,
//   getRentedNFTs,
// }