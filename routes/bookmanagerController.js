const BookService = require("../services/bookmanager-service");
const Book=require('../entities/book');
const BookRepository=require('../repositories/book-repository');

let bookRepository=new BookRepository();

var bookService=new BookService(bookRepository);


async function  getBookList(request,response){
    
    //user logic to get the user data
    var books=await bookService.getAll();

    //expres asks a VIEW ENGINE to create and send HTML response
    await response.render('books/list', {books:books});
    
}


async function  showBookForm(request,response){

    var book={};
    await response.render('books/create', {book:book});

}

async function addBook(request,response){
    var book=request.body;
    console.log('book',book);
    try{
    await bookService.add(book);
    await response.redirect('/books');
    }catch(e){
        console.log(e.message);
    }
}

async function showBookDetails(request,response){

    let id= request.params.bookId ; //this should be the last part of url /authors/details/:authorId

    let book=await bookService.getById(id);

    await response.render('books/details',{book});

};

async function removeBook(request,response){
    let id=request.params.bookId;
    await  bookService.remove(id);
    await response.redirect('/books'); //send back to author page
}



var express = require('express');
const { render } = require("ejs");
var router = express.Router();

//all this will be mapped /authors/
router.get('/', getBookList);
router.get('/create', showBookForm);
router.post('/create', addBook);

//:authorId indicates it is a variable
//router will automatically add the value to request.params
router.get('/details/:bookId', showBookDetails);
router.get('/delete/:bookId', removeBook);



module.exports = router;