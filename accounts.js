function findAccountById(accounts, id) {
  return accounts.find((account) => {
    return account.id === id;
  });
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    if (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  });
}

function getTotalNumberOfBorrows(account = {}, books = []) {
  let total = books.reduce((counter, { borrows }) => {
    let results = borrows.filter(({ id }) => {
      return id === account.id;
    });
    return counter + results.length;
  }, 0);
  return total;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  let possessedBooks = books.filter(({ borrows }) => {
    let borrowsEntry = borrows.filter(({ returned, id }) => {
      return id === account.id && returned === false;
    });
    return borrowsEntry.length > 0;
  });
  possessedBooks.map((book) => {
    let matchedAuthors = authors.filter(({ id }) => {
      return book.authorId === id;
    });
    book.author = matchedAuthors[0];
  });
  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
