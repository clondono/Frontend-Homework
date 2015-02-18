(function(){

	items = [];
})()

/**
 * used to update the json string in the json text box when a single item is entered.
 * @param {string} value the value entered into the item text box.
 */
function add_json(value){
	items.push(value);
	var json_input = document.getElementById('json_input');
	json_input.value = JSON.stringify(items);
};

/**
 * Function called when an item is deleted. It erases 
 * the array of strings that we have that represents the items
 * and recreates the list. Then it updates the json textbox string.
 */
function update_json(){
	var json_input = document.getElementById('json_input');
	items = [];
	var item_list = document.getElementById('item_list');
	children = item_list.children;
	for(var x = 0; x< children.length;x++){
		value = children[x].children[0].textContent;
		items.push(value);
	};

	if (items.length === 0){

		json_input.value = "";		
	}
	else {
		json_input.value = JSON.stringify(items);
	}
};
	/**
	 * function called when adding an item to the item list either by submitting 
	 * a singular item or by iterating through json list
	 */
	function add_item(value){
			var item_list = document.getElementById('item_list');
		
			var new_list_item = document.createElement('li');
			new_list_item.className += "list_item";
			var new_delete = document.createElement('a');
			new_delete.className += "delete_link";
			new_delete.textContent ="delete";
			new_delete.onclick = function(){
				var parent = this.parentNode;
				var grand_parent = parent.parentNode;
				grand_parent.removeChild(parent);
				update_json();
			};

			var new_item = document.createElement('div');
			new_item.className += 'item';
			new_item.textContent = value;
			new_list_item.appendChild(new_item);
			new_list_item.appendChild(new_delete);
			item_list.appendChild(new_list_item);
			add_json(value);


	};

	/**
	 * single submit is called whne someone submits a single item using the add button
	 */
	function single_submit(){
		
		var json_error = document.getElementById('json_error');
		json_error.style.visibility='hidden';		var item_input = document.getElementById('item_input');

		var value = document.getElementById('item_input').value;

		if (value !== ""){

		add_item(value);
		item_input.value = "";
		}
	};

	/**
	 * json_submit is called when a user attempts to submit a json string from the load json
	 * button. If the content is not parsable with json then an error message is shown and the string
	 * in the textbox reverts to the current list of items or blank if no items exist.
	 */
	function json_submit(){
		var json_input = document.getElementById('json_input');

		try {
			json_list = JSON.parse(json_input.value);
			var item_list = document.getElementById('item_list');
			var json_error = document.getElementById('json_error');
			json_error.style.visibility='hidden';
			
			while(item_list.firstChild){
				item_list.removeChild(item_list.firstChild);
			}
			items = [];
			for(var x = 0; x< json_list.length;x++){
				add_item(json_list[x]);
			}

		}	
		catch (e) {
			var json_error = document.getElementById('json_error');
			json_error.style.visibility='visible';
		}
		finally {
			if (items.length === 0){
				json_input.value = "";		
			}
			else {
				json_input.value = JSON.stringify(items);
			}
		}
	};

