# Vinyl

A community for record enthusiasts to review their favorite albums.

## Setting up Development Environment

- Clone the repository
- Install your dependencies: `npm install`
- Create your database: `npm run db:create`
- Load the schema and seed data: `npm run db:reset`
- Create a `.env` file and copy and paste the content of the `.env.template` file and insert your own environment variables.
- Run the server: `npm run dev`

## Technical Stack

### Back End
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/) ([Documentation](https://expressjs.com/en/4x/api.html))

### Database
* [PostgreSQL](https://www.postgresql.org/)
  * [pg-promise](https://github.com/vitaly-t/pg-promise)

### Front End
* [Pug](https://github.com/pugjs/pug)
