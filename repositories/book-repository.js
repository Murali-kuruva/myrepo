let book = require('../entities/book');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()

const username = process.env.BMS_DB_USERNAME;
const password = process.env.BMS_DB_PASSWORD;
const server = process.env.BMS_DB_SERVER;

const dbname = 'bookmanager';
const collectionName = 'books';

const uri = `mongodb+srv://${username}:${password}@${server}/${dbname}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class BookRepository {

    _constructor() {
        this.collection = null;
        client
            .connect()
            .then
        //this.collection= await client.db(dbname).collection(collectionName);
        client.db(dbname).collection(collectionName).then(collection => this.collection = collection);
    }

    constructor() {
        this.collection = null;
        client
            .connect()
            .then(async () => {
                this.collection = await client.db(dbname).collection(collectionName);
                console.log('collection is created');
            });

    }
    _waitForConnect() {

        return new Promise(resolve => {

            let id = setInterval(() => {
                console.log('checking if connection is available', this.collection);
                if (this.collection) {
                    clearInterval(id);
                    console.log('connectio is now ready');
                    resolve(); //work is over
                } //if the connection is set
            }, 10); //keep trying till the connection is ready
        });

    }

    //this is a function that will execute a call back over mongo collection
    //it will wait till collection is available. and then execute the command
    //it will return the value returned by the command
    async _execute(action) {

        await this._waitForConnect();


    }
    async getAll() {

        //let collection =await this.getAuthorCollection();   
        await this._waitForConnect();
        return await this.collection.find().toArray();

    }

    async add(book) {
          console
        await this.collection.insert(book);

    }

    async getById(id) {
        //let author=await (await this.getAll()).find(a=>a.id===id);

        let book = await this.collection.findOne({ id: id });
        return book;
    }

    async remove(id) {

        await this.collection.deleteOne({ id: id });
    }

    save() {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 10);
        });
    }
}
module.exports=BookRepository;