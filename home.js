function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;

  books.forEach(({ borrows }) => {
    borrows.every(({ returned }) => {
      if (returned === false) {
        borrowedBooks++;
      }
    });
  });
  return borrowedBooks;
}

function getMostCommonGenres(books) {
  let lookup = {};
  books.forEach((booksObj) => {
    const { genre } = booksObj;
    lookup.hasOwnProperty(genre) ? lookup[genre]++ : (lookup[genre] = 1);
  });
  const genreArr = Object.keys(lookup);
  let unorderedArray = genreArr.map((genre) => {
    let count = lookup[genre];
    let currentObj = { name: genre, count };
    return currentObj;
  });
  let result = unorderedArray.sort((a, b) => b.count - a.count);
  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length;
  });
  let result = books.map((bookObj) => {
    const { title, borrows } = bookObj;
    let obj = { name: title, count: borrows.length };
    return obj;
  });
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length;
  });
  const topFive = books.slice(0, 5);
  let result = topFive.map(({ authorId, borrows }) => {
    let foundAuthor = authors.find((authorObj) => {
      return authorObj.id === authorId;
    });
    let authorName = helperFunction(
      foundAuthor.name.first,
      foundAuthor.name.last
    );
    let obj = { name: authorName, count: borrows.length };
    return obj;
  });
  return result;
}

function helperFunction(first, last) {
  return `${first} ${last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
