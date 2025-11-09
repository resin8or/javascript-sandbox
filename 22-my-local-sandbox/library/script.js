const itemList = document.getElementById("item-list");
const itemForm = document.getElementById("item-form");
//const formBtn = itemForm.querySelector("button");
const nameInput = document.getElementById("name-input");
const authorInput = document.getElementById("author-input");
const clearListBtn = document.getElementById("btn-clear-list");
const filterInput = document.getElementById("filter");

async function getMedia() {
  const media = await fetch("./mediaItems.json");
  const data = await media.json();
  console.log(data);
  //   listItems(data);
  ListItems2(data);
}

// Add elements to the DOM using a more hard-coded approach
function listItems(data) {
  itemList.innerHTML = "";
  data.mediaItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
        ${item.name}
        <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark"></i>
        </button>
        `;
    itemList.appendChild(li);
  });
}

// Add elements to the DOM programmatically
function ListItems2(data) {
  itemList.innerHTML = "";
  data.mediaItems.forEach((item) => {
    //console.log(item);
    // const li = document.createElement("li");
    // li.innerHTML = `Name: ${item.name} <br> Author: ${item.author}`;
    // const delBtn = document.createElement("button");
    // delBtn.classList.add("remove-item", "btn-link", "text-red");
    // const icon = document.createElement("i");
    // icon.className = "fa-solid fa-xmark";
    // delBtn.appendChild(icon);
    // li.appendChild(delBtn);
    addItemToDom(item);
    //itemList.appendChild(li);
  });
}

function onAddItemSubmit(e) {
  // Stop the refresh of the screen.
  e.preventDefault();
  //   console.log("add item ... ");

  const mediaItem = {
    name: nameInput.value.trim(),
    author: authorInput.value.trim(),
  };

  // Form validation
  if (mediaItem.name === "" || mediaItem.author === "") {
    alert("Complete all fields");
    return;
  }

  console.log("Media Name: " + mediaItem.name);
  console.log("Author Name: " + mediaItem.author);

  // Add the media to the list
  addItemToDom(mediaItem);
}

function addItemToDom(mediaItem) {
  // Create the list item
  const li = document.createElement("li");
  //   li.appendChild(document.createTextNode(mediaItem.name));
  //   li.appendChild(document.createTextNode(mediaItem.author));
  li.innerHTML = `Name: ${mediaItem.name} <br> Author: ${mediaItem.author}`;
  //   const li = document.createElement("li");
  //     li.innerHTML = `Name: ${item.name} <br> Author: ${item.author}`;

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
  //   const delBtn = document.createElement("button");
  //   delBtn.classList.add("remove-item", "btn-link", "text-red");

  //   const icon = document.createElement("i");
  //   icon.className = "fa-solid fa-xmark";
  //   delBtn.appendChild(icon);

  //   li.appendChild(delBtn);
  //   itemList.appendChild(li);

  clearInputs();
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  // go to https://fontawesome.com/icons/house?f=classic&s=solid for more icons
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function clearInputs() {
  nameInput.value = "";
  authorInput.value = "";
}

function removeItem(e) {
  console.log(e.target.parentElement);
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearAllListItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

function filterMediaItems(e) {
  const mediaItems = itemList.querySelectorAll("li");
  const filterText = e.target.value.toLowerCase();
  console.log("filterText: " + filterText);

  mediaItems.forEach((mediaItem) => {
    console.log("mediaItem: " + mediaItem.firstChild.textContent.toLowerCase());
    //const mediaItemName = mediaItem.firstChild.textContext.toLowerCase();
    const mediaItemName = mediaItem.firstChild.textContent.toLowerCase();
    if (mediaItemName.indexOf(filterText) != -1) {
      mediaItem.style.display = "flex";
    } else {
      mediaItem.style.display = "none";
    }
  });

  //    mediaItems.forEach((mediaItem) => {
  //     const itemText = mediaItem.textContent.toLowerCase();
  //     if (itemText.indexOf(filterText) !== -1) {
  //       mediaItem.style.display = "flex";
  //     } else {
  //       mediaItem.style.display = "none";
  //     }
  //   });
}

function init() {
  itemList.addEventListener("click", removeItem);
  itemForm.addEventListener("submit", onAddItemSubmit);
  clearListBtn.addEventListener("click", clearAllListItems);
  filterInput.addEventListener("input", filterMediaItems);
  getMedia();
}

init();
