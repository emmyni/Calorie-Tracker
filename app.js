// storage container
const StorageCtrl = (function() {
    // public methods
    return {
        storeItems: function(item) {
            let items;
            // check if any items in ls
            if(localStorage.getItem('items') === null) {
                items = [];
                // push new item 
                items.push(item);
                // set ls
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                // get what it already in ls
                items = JSON.parse(localStorage.getItem('items'));

                // push new item
                items.push(item);

                // reset ls
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        }, 
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        }, 
        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();


// Item Controller
const ItemCtrl = (function() {
    // Item Constructor 
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // public methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            // create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // calories to numbers
            calories = parseInt(calories);

            // create new item
            newItem = new Item(ID, name, calories);
            // add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            // loop through items
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories) {
            // calories to number
            calories = parseInt(calories);
            
            let found = null;
            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id) {
            // get ids
            const ids = data.items.map(function(item) {
                return item.id;
            });

            // get index
            const index = ids.indexOf(id); 

            // remove item
            data.items.splice(index, 1);
        },
        clearallItems: function() {
            data.items = '';
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getTotalCalories: function() {
            let total = 0;
            // loop through items and add cals
            data.items.forEach(function(item) {
                total += item.calories;
            })
            // set total cal in data structure
            data.totalCalories = total;
            // return total
            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }
})();



// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemlist: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn', 
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories', 
        totalCalories: '.total-calories'
    }

    // public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
               html += `<li class="collection-item" id="item-${item.id}">
               <strong>${item.name}: </strong><em>${item.calories}Calories</em>
               <a href="#" class="secondary-content">
                   <i class="edit-item fa fa-pencil"></i>
               </a>
           </li>`; 
            });

            // insert list items
            document.querySelector(UISelectors.itemlist).innerHTML = html;
        }, 
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value, 
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item) {
            // show the list
            document.querySelector(UISelectors.itemlist).style.display = 'block';
            // create li element
            li = document.createElement('li');
            // add class and id
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            // add html
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;
            // insert item
            document.querySelector(UISelectors.itemlist).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array 
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories}Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            })
        },
        hideList: function() {
            document.querySelector(UISelectors.itemlist).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();



// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // load event listeners
    const loadEventListeners = function() {
        // get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add Items event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // disable submit on enter
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit icon click event
        document.querySelector(UISelectors.itemlist).addEventListener('click', itemEditClick);

        // update icon click event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // delete click event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }

    // add item submit
    const itemAddSubmit = function(e) {
        // get form input from UI controller
        const input = UICtrl.getItemInput();
        
        // check for name and calories input 
        if(input.name !== '' && input.calories !== '') {
            // add itme
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add item to UI
            UICtrl.addListItem(newItem);
            // get calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to UI 
            UICtrl.showTotalCalories(totalCalories);

            // store in localStorage
            StorageCtrl.storeItems(newItem);
            
            //clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // click edit item button
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // get list item id
            const listId = e.target.parentNode.parentNode.id;
            
            // break into an array
            const listIdArr = listId.split('-');

            // get the actual id 
            const id = parseInt(listIdArr[1]);
            
            // get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // add item to form
            UICtrl.addItemToForm();

        }
        e.preventDefault();
    }

    // update item submit
    const itemUpdateSubmit = function(e) {
        // get item inpur
        const input = UICtrl.getItemInput();

        //update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // update ui
        UICtrl.updateListItem(updatedItem);

        // get calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to UI 
        UICtrl.showTotalCalories(totalCalories);

        // update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // delete button event
    const itemDeleteSubmit = function(e) {
        // get current item 
        const currentItem = ItemCtrl.getCurrentItem();

        // delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // get calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to UI 
        UICtrl.showTotalCalories(totalCalories);

        // delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();


        e.preventDefault();
    } 

    // clear items event
    const clearAllItemsClick = function() {
         // get calories
         const totalCalories = ItemCtrl.getTotalCalories();
         // add total calories to UI 
         UICtrl.showTotalCalories(totalCalories);
         //clear fields

        // Delete all items from data structure
        ItemCtrl.clearallItems();

        // remove from UI
        UICtrl.removeItems();

        // remove from local storage
        StorageCtrl.clearItemsFromStorage();

        // hide the UL
        UICtrl.hideList();
    }

    // public methods
    return {
        init: function() {
            // clear edit stat/ set inital set
            UICtrl.clearEditState();
            // fetch items from data structure
            const items = ItemCtrl.getItems();

            // check if any items 
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
             // populate list with items
            UICtrl.populateItemList(items);
            }

             // get calories
             const totalCalories = ItemCtrl.getTotalCalories();
             // add total calories to UI 
             UICtrl.showTotalCalories(totalCalories);

            // load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();