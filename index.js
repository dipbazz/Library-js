const myLibrary = [];

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const BookCard = (holder, book, index) => {
  const createTitle = title => {
    const element = document.createElement('span');
    element.textContent = `Book Name: ${title} `;
    element.classList.add('book-item');
    holder.appendChild(element);
  };

  const createAuthor = author => {
    const element = document.createElement('span');
    element.textContent = `Author : ${author} `;
    element.classList.add('book-item');
    holder.appendChild(element);
  };


  const createPage = pages => {
    const element = document.createElement('span');
    element.textContent = `Pages: ${pages} `;
    element.classList.add('book-item');
    holder.appendChild(element);
  };

  // Check mark Button
  const createCheckMarkButton = (read, index) => {
    const element = document.createElement('button');
    element.setAttribute('data-index', index);
    element.innerText = read ? 'UnRead' : 'Read';
    element.classList.add('complete-btn');
    element.addEventListener('click', changeReadStatus); // eslint-disable-line
    holder.appendChild(element);
  };

  // Trash button
  const createTrashButton = index => {
    const element = document.createElement('button');
    element.setAttribute('data-index', index);
    element.innerHTML = '<i class = "fa fa-trash"></i>';
    element.classList.add('trash-btn');
    element.addEventListener('click', deleteBook); // eslint-disable-line
    holder.appendChild(element);
  };

  const create = () => {
    createTitle(book.title);
    createAuthor(book.author);
    createPage(book.pages);
    createCheckMarkButton(book.read, index);
    createTrashButton(index);
  };

  return { create };
};

const generateBook = () => {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const element = document.createElement('li');
    element.classList.add('book');

    BookCard(element, book, index).create();

    // Append to list
    bookList.appendChild(element);
  });
};

const deleteBook = (e) => {
  const item = e.target;
  const index = item.getAttribute('data-index');
  myLibrary.splice(index, 1);
  generateBook();
};

const changeReadStatus = (e) => {
  const item = e.target;
  const index = item.getAttribute('data-index');
  const book = myLibrary[index];
  book.read = !book.read;
  generateBook();
};

const formData = (form) => {
  const {
    title, author, pages, read,
  } = form.elements;

  const getTitle = () => title.value;
  const getAuthor = () => author.value;
  const getPages = () => pages.value;
  const getRead = () => read.value;

  return {
    getTitle, getAuthor, getPages, getRead,
  };
};

const addBook = (e) => {
  e.preventDefault();
  // To do DIV
  const form = document.querySelector('#form');
  const f = formData(form);
  if (myLibrary.some((book) => book.title === f.getTitle())) {
    return;
  }

  const book = new Book(f.getTitle(), f.getAuthor(), f.getPages(), f.getRead());

  myLibrary.push(book);
  generateBook();
  form.reset();
};

const bookButton = document.querySelector('.book-button');
bookButton.addEventListener('click', addBook);

document.querySelectorAll('.trash-btn').forEach(el => {
  el.addEventListener('click', deleteBook);
});
