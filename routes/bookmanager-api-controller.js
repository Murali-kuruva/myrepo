const BookService = require("../services/bookmanager-service");
const Book=require('../entities/book');
const BookRepository=require('../repositories/book-repository');

let bookRepository=new BookRepository();

var bookService=new BookService(bookRepository);

//express calls user logic
// for url --> /books
async function  getBookList(request,response){

    //user logic to get user data
    let books=await bookService.getAll();  //user logic
    //express sends JSON response directly to the client
    await response.send(books);  
}
async function  rendeBookList(request,response){

    //user logic to get user data
    let books=await bookService.getAll();  //user logic
    //express sends JSON response directly to the client
    await response.render('books/list',{books}); 
}


async function addBook(request,response){
    debugger;
    var book=request.body;
    console.log('book',book);
    try{
        await bookService.add(book);
        response.status(201); //created install
        await response.send(book);
    }catch(e){
        response.status(400);
        await response.send(e.message);
        console.log(e.message);
    }
}

// express is responsible for passing control to user function
//for url format -->   /authors/vivek-dutta-mishra
async function getBookById(request,response){

    //express extracts url part and adds to request.params
    let id= request.params.bookid; //this should be the last part of url /authors/details/:authorId

    //user logic
    let book=await bookService.getById(id);
    if(book)
        await response.send(book); //express
    else{
        response.status(404); //not found -->express
        await response.send({error: `book not found`, id:id}); //express
    }

};

async function removeBook(request,response){
    let id=request.params.bookid;
    await bookService.remove(id);
    response.status(204); //no content
    await response.send({error: `book not found`, id:id});
}


var express = require('express');
var router = express.Router();


//all this will be mapped /books/
router.get('/', getBookList);
router.post('/', addBook);
router.get('/:bookid', getBookById);
router.delete('/:bookid', removeBook);



module.exports = router;