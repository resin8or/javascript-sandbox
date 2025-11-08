const itemList = document.getElementById("item-list");
const itemForm = document.getElementById("item-form");
//const formBtn = itemForm.querySelector("button");

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
    const li = document.createElement("li");
    li.innerHTML = `Name: ${item.name} <br> Author: ${item.author}`;

    const delBtn = document.createElement("button");
    delBtn.classList.add("remove-item", "btn-link", "text-red");

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    delBtn.appendChild(icon);

    li.appendChild(delBtn);
    itemList.appendChild(li);
  });
}

function onAddItemSubmit(e) {
  e.preventDefault();

  //console.log("add item ... ");
}

function removeItem(e) {
  console.log(e.target.parentElement);
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

function init() {
  itemList.addEventListener("click", removeItem);
  itemForm.addEventListener("submit", onAddItemSubmit);
  getMedia();
}

init();
