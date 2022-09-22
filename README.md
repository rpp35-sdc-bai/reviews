# Atelier Review Service

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)


## Created Using
![Express](https://img.shields.io/badge/-express-grey?style=for-the-badge&logo=express)
![Postgres](https://img.shields.io/badge/-Postgres-grey?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/-Redis-grey?style=for-the-badge&logo=redis) </br>
![AWS](https://img.shields.io/badge/-AWS-grey?style=for-the-badge&logo=amazonaws)
![Sequelize](https://img.shields.io/badge/-Sequelize-grey?style=for-the-badge&logo=sequelize)
![Mocha](https://img.shields.io/badge/-Mocha-grey?style=for-the-badge&logo=mocha)

## About <a name = "about"></a>

This is a scaleable microservice that can return return and filter reviews for spcific product id.

## Getting Started <a name = "getting_started"></a>

### Clone this Repo
```
git clone https://github.com/rpp35-sdc-bai/reviews
```

### Prerequisites

What you will need to run the project
<li>Node 16.0.0^ </li>
<li>Postgres </li>
<li>Redis</li>
</br>

### Installing

Project Setup

```
npm install 
```

Create a config file and setup it up similarly to the example config
```
touch  config.js
```



End with an example of getting some data out of the system or using it for a little demo.

## Usage <a name = "usage"></a>

Run test suite
```
npm test
```

Run the Development server
```
npm run dev
```

Run in Production
```
npm start
```

### Stress testing

Statisitcs are currently being tracked in new relic

Artillery can be configured in the stressTest.yaml file <br>
ids are gernated from loaderParams.json
```
npm run stress
```

Loader-IO <br>
Update the Loadiner-io.text file <br>
Update the /loaderio route in server.js to match your loader io project <br>
run server without logging during stress testing <br>
```
npm start
```