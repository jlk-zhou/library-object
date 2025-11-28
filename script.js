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

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read; 
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

function toggleRead(bookUUID) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].uuid === bookUUID) {
            myLibrary[i].toggleReadStatus(); 
            displayLibrary(myLibrary); 
        }
    }
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
            "author": `by ${book.author}`, 
            "pages": `${book.pages} pages`, 
            "read": book.read ? "Read" : "Not Read"
        }; 

        // Populate the new book card
        for (const field of Object.entries(bookCardFields)) {
            // console.log(field[0]); 
            const fieldDisplay = document.createElement("p"); 
            fieldDisplay.textContent = field[1]; 
            fieldDisplay.setAttribute("class", field[0])
            newBookCard.appendChild(fieldDisplay); 
        }

        // Add remove button to book card 
        const removeBtn = document.createElement("button"); 
        removeBtn.setAttribute("class", "remove-btn"); 
        removeBtn.textContent = "Remove"; 
        newBookCard.appendChild(removeBtn); 

        // Make remove button functional
        removeBtn.addEventListener("click", () => removeBookFromLibrary(
            newBookCard.getAttribute("data-uuid")
        )); 

        // Add toggle read status button to book card
        const toggleReadBtn = document.createElement("button"); 
        toggleReadBtn.setAttribute("class", "toggle-read"); 
        toggleReadBtn.textContent = book.read ? "Mark as Unread": "Mark as Read"; 
        newBookCard.appendChild(toggleReadBtn); 

        // Make toggle read button functional
        toggleReadBtn.addEventListener("click", () => {
            toggleRead(
                newBookCard.getAttribute("data-uuid")
            ); 
            if (toggleReadBtn.textContent === "Mark as Read") {
                toggleReadBtn.textContent = "Mark as Unread"; 
            } else {
                toggleReadBtn.textContent = "Mark as Read"; 
            }
        })

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