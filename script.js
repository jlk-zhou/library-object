const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Did you forget the 'new' operator? ")
    }
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.read = read; 
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read); 
    myLibrary.push(book); 
}

function removeDivsByClass(className) {
    const divsToRemove = document.querySelectorAll(`div.${className}`); 
    divsToRemove.forEach(div => {
        div.remove(); 
    }); 
}

function displayLibrary(library) {
    const libraryDiv = document.querySelector(".library"); 
    removeDivsByClass("book"); 

    for (book of library) {
        // Create the card for the book
        const newBookCard = document.createElement("div")
        newBookCard.setAttribute("class", "book"); 

        // Alter book fields to be displayed
        let bookCardFields = {
            "title": book.title, 
            "by": `by ${book.author}`, 
            "pages": `${book.pages} pages`, 
            "read": book.read ? "Read" : "Not Read"
        }; 

        // Populate the new book card
        for (field of Object.values(bookCardFields)) {
            const fieldDisplay = document.createElement("p"); 
            fieldDisplay.textContent = field; 
            newBookCard.appendChild(fieldDisplay); 
        }

        // Prepend the new book card
        libraryDiv.prepend(newBookCard); 
    }
}

displayLibrary(myLibrary); 