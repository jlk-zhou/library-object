const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Did you forget the 'new' operator? ")
    }
    this.uuid = crypto.randomUUID();
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

function removeBookFromLibrary(bookUUID) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].uuid === bookUUID) {
            myLibrary.splice(i, 1); 
            displayLibrary(myLibrary); 
        }
    };
}

function displayLibrary(library) {
    const libraryDiv = document.querySelector(".library"); 
    removeDivsByClass("book"); 

    for (book of library) {
        // Create the card for the book
        const newBookCard = document.createElement("div")
        newBookCard.setAttribute("class", "book"); 
        newBookCard.setAttribute("data-uuid", book.uuid); 

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

        // Add remove button to book card 
        const removeBtn = document.createElement("button"); 
        removeBtn.setAttribute("class", "remove-btn"); 
        removeBtn.textContent = "Remove"; 
        newBookCard.appendChild(removeBtn); 

        removeBtn.addEventListener("click", () => removeBookFromLibrary(
            newBookCard.getAttribute("data-uuid")
        )); 

        // Prepend the new book card
        libraryDiv.prepend(newBookCard); 
    }
}

const addBookBtn = document.querySelector(".add"); 
const addBookForm = document.querySelector("dialog");
const closeButton = document.querySelector(".close"); 
const confirmBookBtn = document.querySelector("#confirmBtn"); 

const titleInput = document.querySelector("#title"); 
const authorInput = document.querySelector("#author"); 
const pagesInput = document.querySelector("#pages"); 
const readInput = document.querySelector("#read"); 

function resetInputs() {
    titleInput.value = ""; 
    authorInput.value = ""; 
    pagesInput.value = ""; 
    readInput.checked = false; 
}

addBookBtn.addEventListener("click", () => {
    addBookForm.showModal(); 
})

closeButton.addEventListener("click", () => {
    resetInputs(); 
    addBookForm.close(); 
})

confirmBookBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    let readState = readInput.checked ? true : false; 

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readState); 
    displayLibrary(myLibrary); 

    resetInputs(); 

    addBookForm.close(); 
})


