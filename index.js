const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@doctor.ijq5hs8.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
          serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
          }
});
async function run() {
          try {
                    await client.connect();
                    const serviceCommand = client.db('doctor_portal').collection('service');

                    app.get('/service', async(req, res) =>{
                              const query = {};
                              const cursor = serviceCommand.find(query);
                              const services = await cursor.toArray();
                              res.send(services);
                    })

                    console.log("Pinged your deployment. You successfully connected to MongoDB!");
          } finally {
                    // await client.close();
          }
}
run().catch(console.dir);

app.get('/', (req, res) => {
          res.send('Hello From Doctor Uncle')
})

app.listen(port, () => {
          console.log(`Example app listening on port ${port}`)
})