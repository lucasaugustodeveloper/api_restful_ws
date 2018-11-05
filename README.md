# API Restful Node e MySQL

Development API with Node(Restify) and MySQL

## Folder Structure
    .
    |__ src/
    |   |__ http/
    |   |   |__ routes/
    |   |   |   |__ auth/
    |   |   |   |   |__ auth.route.js
    |   |   |   |__ categories/
    |   |   |   |   |__ categories.route.js
    |   |   |   |__ home/
    |   |   |   |   |__ home.route.js
    |   |   |__ loadRoutesByPath.js
    |   |   |__ routes.js
    |   |__ server/
    |   |   |__ services/
    |   |       |__ mysql
    |   |           |__ auth/
    |   |           |   |__ index.js
    |   |           |__ categories/
    |   |           |   |__ index.js
    |   |           |__ helpers/
    |   |           |   |__ index.js
    |   |           |__ tests/
    |   |           |   |__ auth.test.js
    |   |           |   |__ categories.test.js
    |   |           |   |__ setup.js
    |   |           |   |__ users.test.js
    |   |           |__ users/
    |   |           |   |__ index.js
    |   |           |__ index.js
    |   |__ cors.js
    |   |__ index.js
    |   |__ jwtMiddleware.js
    |__ .editorconfig
    |__ .env.simple
    |__ .eslintrc.json
    |__ .gitignore
    |__ .travis.yml
    |__ package.json
    |__ README.md
    |__ tables.sql
    |

##  Clone this Project
```sh
$ git clone https://github.com/laugustofrontend/api_restful_ws.git
```

##  Prepare ambient
```sh
$ cd api_restful_ws
$ npm install or npm i
```

##  Execute tests
```sh
$ npm run test or npm test
```

##  Execute Project
```sh
$ npm run dev
```
