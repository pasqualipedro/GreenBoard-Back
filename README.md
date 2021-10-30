# Greenbook
## API for the project Greenbook 

Greenbook is a api, based on express, bcrypt, mongoose and jsonwebtoken, to help the user to manage their financial life 

## Features

- Create categories to your expenditures
- Register your transactions
- Consolidate all the information into a dashboard

## Tech
Greenbook Api uses:
- node.js
- express
- jsonwebtoken
- bcrypt
- mongoose
- nodemon

## Installation

GreenBook requires [Node.js](https://nodejs.org/) v10+ to run.

In the source folder add an .env file with this variables:

MONGO_URI - for your atlas cluster or local mongodb TOKEN_SECRET - for your jwt secret EXPIRATION_AUTH_TOKEN - for setting your expiration time for jwt

Install the dependencies and devDependencies and start the server.

```sh
cd GreenBoard-Back
npm i
node app
```
You can test http://localhost:5000/.

You can test with: https://fupprojects.herokuapp.com/api

The common endpoints are the following:
All end point except /login and /signup need to be access with token on Authorization header

METHOD       | ENDPOINT                        | PAYLOAD                                                                                                                                                                                                                                 | RESPONSE (add status code)                                               | Action                                                                                                  |
|--------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| POST         | /auth/login                     | { email: String, password: String }                                                                                                                                                                                                     | Auth token on Headers                                                    | Return JWT to private routes                                                                            |
| POST         | /auth/signup                    | { name: String, lastName: String, age: Number, email: String, pass:   String, passConfirmation: String }                                                                                                                                | { msg: New user created, newUser }                                       | Criacao de novo usuario + adicao de categorias default                                                  |
| POST         | /category/add/                  | { name: String, description: String, budget: Number,  inUse:Boolean, userID: userID }                                                                                                                                                   | { msg: `>${newUserCategory.name}< was added to user categories` }        | Adicionar novas categorias  à lista   de um usuario especifico                                          |
| DELETE       | /category/delete/:catId         | { catId }                                                                                                                                                                                                                               | { msg: `>${delUserCategory.name}< was deleted successfuly` }             | Deletar categoria especifica da lista de categorias de um usuario   especifico                          |
| GET          | /category/all/:userId           | EMPTY                                                                                                                                                                                                                                   | { msg: `All categories from >${userId}< are:`,   allCategoriesFromUser } | Busca todas as categorias de um unico usuario                                                           |
| PUT          | /category/update/:userId/:catId | {     name: String,       description: String    budget:   Number     inUse: true }                                                                                                                                                     | { msg: `>${getOneCategoryFromUser.name}< updated succesfuly` }           | Fazer update de categorias especificas jà pertencentes à lista de   categorias de um usuario especifico |
| POST         | /transaction/add                | {         startDate: Date,         endDate: Date,         type: String,         description: String,         label: label,         category_id: category_id,         value: Number,         frequency: String,         userID: id     } | { msg: `New transaction created successfuly`, addNewTransaction}         | Criar/Adicionar nova transacao ao Dash de um usuario especifico                                         |
| GET          | /transaction/all                | -                                                                                                                                                                                                                                       | { msg: `All transactions are:`, allTransactionsFromUser }                | Buscar todas as transacoes daquele usuario                                                              |
| DELETE       | /transaction/delete/:transId    | const { transId } = request.params                                                                                                                                                                                                      |                                                                          |                                                                                                         |
| PUT          | /transaction/update/:transId    | const { transId } = request.params                                                                                                                                                                                                      |                                                                          |                                                                                                         |
| GET          | /userinfo/get                   | -                                                                                                                                                                                                                                       | { msg: `User info is:`, userFullInfo }                                   | Buscar informacoes do usuario logado                                                                    |
| PUT          | /userinfo/update                | const { id } = request.user                                                                                                                                                                                                             |                                                                          |                                                                                                         |
| PUT (Update) | /transaction/update/:transId    | const { transId } = request.params                                                                                                                                                                                                      |                                                                          |                                                                                                         |
| USER ROUTES  |                                 |                                                                                                                                                                                                                                         |                                                                          |                                                                                                         |
| GET (fetch)  | /userinfo/get                   | -                                                                                                                                                                                                                                       | { msg: `User info is:`, userFullInfo }                                   | Buscar informacoes do usuario logado                                                                    |
| PUT (Update) | /userinfo/update                | const { id } = request.user                                                                                                                                                                                                             |                                                                          |                                                                                                         |
| PUT (Update) | /userinfo/update                | const { id } = request.user                                                                                                                                                                                                             |                                                                          |                                                                                                         |



This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
