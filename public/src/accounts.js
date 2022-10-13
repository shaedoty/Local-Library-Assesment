function findAccountById(accounts, id) {
  let result = accounts.find((accountsObj)=>{
return accountsObj.id===id;
  })
  return result;
}




function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB)=>{
    //a-b way for alphabatize
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()? -1:1
  })
  return accounts;
}




function getTotalNumberOfBorrows(account, books=[]) { 
  //destructure accounts
  const {id} = account;
  //use reduce, works like accumulator pattern
  let total = books.reduce((total, bookObj)=>{
    let isAccountInBook = bookObj.borrows.some((borrowsObj)=>{
       //check if any bookObj.id === given id (id)
    return borrowsObj.id === id;
    })
   if(isAccountInBook){
    total++
   }
    // reduce function has to return something to add to the total 
   return total
 }, 0)
return total
}



function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  //extract given account id and rename it givenAccountId
  const {id:givenAccountId} = account;
  //loop through books with filter() and return the books objects whose borrows contains the givenAccountId
  let booksAccountHasOnIt = books.filter((bookObj)=>{
    //if the bookObj.borrows has a borrowsObj whose id === the givenAccountId, return the bookObj. Otherwise don't return the bookObj
    let recentBorrower = bookObj.borrows[0]
    if(recentBorrower.returned === false && recentBorrower.id === givenAccountId){
      //modify the book object to have an author property and the value of author obj matches
      //find author id
      const {authorId} = bookObj
      //find the author who has that id form the bookObj.authorId;
      let foundAuthorObj = authors.find((authorObj)=>{
        return authorObj.id === authorId
      })
      //add the foundAuthorId to the bookObj
      bookObj.author = foundAuthorObj
      return bookObj
    }
  }) 
  
  return booksAccountHasOnIt 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
