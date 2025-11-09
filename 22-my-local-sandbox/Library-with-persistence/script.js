const itemList = document.getElementById("item-list");
const itemForm = document.getElementById("item-form");
//const formBtn = itemForm.querySelector("button");
const nameInput = document.getElementById("name-input");
const authorInput = document.getElementById("author-input");
const clearListBtn = document.getElementById("btn-clear-list");
const filterInput = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((mediaItem) => addItemToDOM(mediaItem));
  //checkUI();
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("mediaItems") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("mediaItems"));
  }

  return itemsFromStorage;
}

function addItemToStorage(mediaItem) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(mediaItem);

  // Convert to JSON string and set to local storage
  localStorage.setItem("mediaItems", JSON.stringify(itemsFromStorage));
}

function addItemToDOM(mediaItem) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(mediaItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function filterMediaItems(e) {
  const mediaItems = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((mediaItem) => {
    const itemName = mediaItem.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkIfItemExists(mediaItem) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(mediaItem);
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem("mediaItems");

  //checkUI();
}

function removeItem(mediaItem) {
  if (
    confirm(
      `Are you sure you want to remove the item "${mediaItem.textContent}"?`
    )
  ) {
    // Remove item from DOM
    mediaItem.remove();

    // Remove item from storage
    removeItemFromStorage(mediaItem.textContent);

    //checkUI();
  }
}

function removeItemFromStorage(mediaItem) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== mediaItem);

  // Re-set to localstorage
  localStorage.setItem("mediaItems", JSON.stringify(itemsFromStorage));
}

function onAddItemSubmit(e) {
  e.preventDefault();

  // trim the input value to remove whitespace - disallowing duplicate items due to white space in the process
  const newMediaNameItem = nameInput.value.trim();

  // Validate Input
  if (newMediaNameItem === "") {
    alert("Please add an item");
    return;
  }

  if (checkIfItemExists(newMediaNameItem)) {
    alert(`The item "${newMediaNameItem}" already exists!`);
    return;
  }

  // Check for edit mode
  // if (isEditMode) {
  //   const itemToEdit = itemList.querySelector('.edit-mode');

  //   removeItemFromStorage(itemToEdit.textContent);
  //   itemToEdit.classList.remove('edit-mode');
  //   itemToEdit.remove();
  //   isEditMode = false;
  // } else {
  //   if (checkIfItemExists(newItem)) {
  //     alert(`The item "${newItem}" already exists!`);
  //     return;
  //   }
  // }

  // Create item DOM element
  addItemToDOM(newMediaNameItem);

  // Add item to local storage
  addItemToStorage(newMediaNameItem);

  //checkUI();

  nameInput.value = "";
  authorInput.value = "";
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.closest("li")) {
    //setItemToEdit(e.target);
    console.log("placeholder..");
  }
}

function init() {
  itemList.addEventListener("click", onClickItem);
  itemForm.addEventListener("submit", onAddItemSubmit);
  clearListBtn.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterMediaItems);
  displayItems();
}

init();
