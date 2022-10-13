function getTotalBooksCount(books) {
  return books.length;
}




function getTotalAccountsCount(accounts) {
  return accounts.length;
}




function getBooksBorrowedCount(books) {
  //declare variable and loop through book array with reduce as accumulator pattern
  //for every book obj in the book array we want to look to see if at least one book is currently checked out  
let result = books.reduce((total, bookObj)=>{
  let areAnyBooksBorrowed = bookObj.borrows.some((bookObj)=>{
    return bookObj.returned === false;
  })
  if (areAnyBooksBorrowed) total++;
  return total;
}, 0);

return result;
}





function getMostCommonGenres(books=[]) {
  let genreObj = {};
  books.forEach((bookObj)=>{
    let currentBookObjGenre = bookObj.genre;
    //check if the current bookObj's genre exists as a key in the genreObj
    if(currentBookObjGenre in genreObj) {
      genreObj[currentBookObjGenre] += 1;
    }else{
      //else->if the genre is not in the genreObj then creat a key in the genreObj
      genreObj[currentBookObjGenre]=1
    }
  });
  //get the key from the genre object and put it in an array 
  let genreArray = Object.keys(genreObj);
  //console.log(genreArray)
  //for each genre in the genre array, create an object with a name and count property 
  let result = genreArray.map((genre)=>{
    //genre represents a genre name like "science"
    //genreObj[genre] gives the count form the genreObj
    return  {name: genre, count: genreObj[genre]};

  });
  result.sort((a, b) => (a.count < b.count ? 1 : -1))
result =result.slice(0,5)
  return result;
}
  




function getMostPopularBookHelper(books=[]){
  //sort the books array by the bookObj's borrows ammount (bookObj.borrows.length)
  books.sort((bookA, bookB)=>{
    return bookB.borrows.length - bookA.borrows.length;
  })
  return books
}


function getMostPopularBooks(books) { 
books = getMostPopularBookHelper(books)
let result = books.slice(0,5).map((bookObj)=>{
  return {name: bookObj.title, count: bookObj.borrows.length}
})
return result
}



function helperJoinFirstAndLast(first, last){
  return `${first} ${last}`
}


function getMostPopularAuthors(books=[], authors=[]){
  let mostPopularBooks = getMostPopularBookHelper(books);
  let topFiveBooks =mostPopularBooks.slice(0,5);
  let result=topFiveBooks.map((bookObj)=>{
    //num accounts
    let numAccounts = bookObj.borrows.length;
    //id of author
    let {authorId} = bookObj;
    let foundAuthor = authors.find((authorObj)=>{
      return authorObj.id ===authorId;
    })
    let fullName =helperJoinFirstAndLast(foundAuthor.name.first, foundAuthor.name.last)
    return {name: fullName, count: numAccounts}
  })
  return result
}




module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
