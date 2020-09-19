//Variables
const listContainer = document.getElementById('list-items');

//Event Listeners
eventListeners();

function eventListeners() {
	document.getElementById('form').addEventListener('submit', newTodo);
	listContainer.addEventListener('click', removeItem);
	document.addEventListener('DOMContentLoaded', onPageLoad);
}

//Functions

function contentTemplate(item) {
	const list = document.createElement('li');
	const removeBtn = document.createElement('span');
	removeBtn.classList = 'remove-item';
	removeBtn.textContent = 'X';
	list.textContent = item;
	list.appendChild(removeBtn);
	listContainer.appendChild(list);
}
/*  logic input, submit, template */
function newTodo(e) {
	e.preventDefault();

	console.log('form submitted');
	const inputData = document.querySelector('.input').value;
	contentTemplate(inputData);

	addItemToStorage(inputData);

	this.reset();
}

/*  remove item */
function removeItem(e) {
	if (e.target.classList.contains('remove-item')) {
		e.target.parentElement.remove();
	}

	removeItemInStorage(e.target.parentElement.textContent);
}

function addItemToStorage(inputData) {
	let storageItems = getItemInStorage();

	storageItems.push(inputData);
	localStorage.setItem('items', JSON.stringify(storageItems));
}

function getItemInStorage() {
	let items;
	const itemsInStorage = localStorage.getItem('items');

	if (itemsInStorage === null) {
		items = [];
	} else {
		items = JSON.parse(itemsInStorage);
	}
	return items;
}
function onPageLoad() {
	let storageItems = getItemInStorage();

	storageItems.forEach((item) => {
		contentTemplate(item);
	});
}

function removeItemInStorage(item) {
	let storageItems = getItemInStorage();

	//remove X
	const itemDelete = item.substring(0, item.length - 1);

	// loop through items
	storageItems.forEach((item, index) => {
		if (itemDelete === item) {
			storageItems.splice(index, 1);
		}
		console.log(storageItems);
	});

	// then we save the remaining element
	localStorage.setItem('items', JSON.stringify(storageItems));

	// alert('Item Deleted');
	displayAlert();
}

const alertElement = document.querySelector('.alert');
// message alert

function displayAlert() {
	const content = document.createElement('div');
	content.classList = 'alert-delete';
	content.style.display = 'block';
	content.textContent = 'Successfully Deleted';
	alertElement.appendChild(content);
	setTimeout(() => {
		content.style.display = 'none';
		content.classList = 'remove-transition';
	}, 3000);
}
