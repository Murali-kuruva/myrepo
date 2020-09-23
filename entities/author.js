
class Author{

    
    constructor(id,name, biography='', photograph='', email='' ){
        this.id=id;
        this.name=name;
        this.biography=biography;
        this.photograph=photograph;
        this.email=email;
        this.books=[];
    }

    /* note: functions inside class will not have a function prefix */

    toString(){
        return `Author[Id=${this.id}\tName=${this.name}\tBooks=${this.books.length}]`;
    }

    addBook(book){
        
        if(!book.author)
            book.author=this;

        if(book.author.id===this.id) //if the book is written by same author
            this.books.push(book);  //add it to book collection
    }

}


module.exports=Author;