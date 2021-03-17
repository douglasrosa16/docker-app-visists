const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
    host: 'redis-server',  //-> é o nome do meu service do docker-compose
    port: 6379 //Porta default
}); //Client representa a conexão com redis
client.set('visits', 0);

app.get('/',(req, res) => {
    //process.exit(100); //Executa um erro
    client.get('visits', (err, visits) => {
        res.send('Number of visits is '+ visits);
        client.set('visits', parseInt(visits) + 1);
    })
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});