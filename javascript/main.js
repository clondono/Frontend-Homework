(function(){

	items = [];
})()

function add_json(value){
	console.log("add_json");
	items.push(value);
	var json_input = document.getElementById('json_input');
	json_input.value = JSON.stringify(items);
};

function update_json(){
	var json_input = document.getElementById('json_input');
	console.log("updateing json")
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
	 * [add_item description]
	 * @return {[type]} [description]
	 */
	function add_item(value){
			console.log("add item")
			var item_list = document.getElementById('item_list');
			console.log(item_list);
		
			var new_list_item = document.createElement('li');
			console.log(new_list_item);
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
	 * single submit is called whne someone
	 * @return {[type]} [description]
	 */
	function single_submit(){
		
		var json_error = document.getElementById('json_error');
		json_error.style.visibility='hidden';		var item_input = document.getElementById('item_input');

		var value = document.getElementById('item_input').value;
		console.log(value);

		if (value !== ""){

		add_item(value);
		item_input.value = "";
		}
	};

	/**
	 * [json_submit description]
	 * @return {[type]} [description]
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
				console.log(json_list[x]);
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

