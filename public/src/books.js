function findAuthorById(authors, id) {
  let result = authors.find((authorObj)=>
  {
    return authorObj.id === id
  })
  return result? result: null;
}



function findBookById(books, id) {
  let result = books.find((booksObj)=>{
    return booksObj.id===id
  })
  return result? result:null;
}



function partitionBooksByBorrowedStatus(books) {
// go through books array and filter for books where the borrowed books have not been returned
let notReturnedBooks = books.filter((bookObj)=>{
  let borrow = bookObj.borrows
  //are ANY of the books that have been borrowed not been returned?
  let haveNotBeenReturned = borrow.some((currentBook)=>{
    // some() returns true or false and will show true is any of the elements are true
    return currentBook.returned === false;
  })
  //if it returns true, the current element(bookObj) will be part of the result array 
  //if it returns false, the current element(bookObj) will not make it through filter and not be part of the result
  return haveNotBeenReturned;
});
let returnedBooks = books.filter((bookObj)=>{
  let borrow = bookObj.borrows; 
//has EVERY book that has been checked out been returned?
let hasBeenReturned = borrow.every((currentBook)=>{
  //every() returns true or false, only true if ALL elements are true
  return currentBook.returned === true;
})
//if it returns true, the current element(bookObj) will be part of the result array
//if it returns false, the current element(courseObj) will not make it through the filter and will not be in result
return hasBeenReturned;
})

return [notReturnedBooks, returnedBooks];

  }
  



function getBorrowersForBook(book, accounts) {
  // let borrows = books.borrows
  let {borrows} = book; //destructure borrows books array from the book object
  //for each element in the borrows array we want a new array with the related account object
  let result = borrows.map((borrowsAccount)=>{
    //current borrows account id. see if you can find an account object whos id  === the the borrowsAccount.id in the accounts array 
    let foundAccountObj = accounts.find((accountObj)=>{
      return accountObj.id === borrowsAccount.id;
    })
    //add a property for the books returned info to the found account object
    foundAccountObj.returned = borrowsAccount.returned;
    return foundAccountObj;
  })
return result.splice(0,10)
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
