function findAuthorById(authors, id) {
  return authors.find((author) => {
    return author.id === id;
  });
}

function findBookById(books, id) {
  return books.find((book) => {
    return book.id === id;
  });
}

function partitionBooksByBorrowedStatus(books) {
  let bookStatus = books.filter((bookObj) => {
    const { borrows } = bookObj;
    return borrows[0].returned;
  });
  let notCheckedOut = books.filter((bookObj) => {
    const { borrows } = bookObj;
    return borrows[0].returned === false;
  });
  return [notCheckedOut, bookStatus];
}

function getBorrowersForBook(book = {}, accounts = []) {
  const { borrows } = book;
  let result = borrows.map((borrowsObj) => {
    let foundAccounts = accounts.find((accountsObj) => {
      return accountsObj.id === borrowsObj.id;
    });
    foundAccounts.returned = borrowsObj.returned;
    return foundAccounts;
  });
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
