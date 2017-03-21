var doc = document;
doc.addEventListener("DOMContentLoaded", function(ev){
	var newForm = doc.getElementById('getForm');
	newForm.addEventListener('click', function(ev){
		fetch("https://randomform.herokuapp.com/")
			.then(function(response){
				return response.json();
			}).then(function(res){
				console.log(res);
				var container = doc.getElementById('container');
				var frag = doc.createDocumentFragment();
				var form = doc.createElement('form');
				form.setAttribute("id",res.data.form_id);
				form.setAttribute('name',res.data.form_name);
				form.setAttribute('action',"");
				form.setAttribute('method','POST');

				form.appendChild(createFormElements(res.data.form_fields));

				var submit = doc.createElement('button');
				submit.setAttribute('type','submit');
				submit.appendChild(doc.createTextNode('submit'));

				form.appendChild(submit);

				frag.appendChild(form);
				container.appendChild(frag);
				document.querySelector("form").addEventListener('submit', function(ev){
					var formElement = ev.target;
					var formData = new FormData(formElement);
					
					var header = new Headers({
						"Content-Type": "application/json"
					});

					fetch('https://randomform.herokuapp.com/submit',{
						method: "POST",
  						body: formData,
  						headers: header
					}).then(function(response){
						return response.json();
					}).then(function(r){
						debugger
					});
					
				});
			});
	});
	
});

function createFormElements(fields){
	var div = doc.createElement('div');
	fields.forEach(function(ele){
		switch(ele.component){
			case 'textinput': div.appendChild(createInput(ele));
				break;
			case 'select': div.appendChild(createSelect(ele));
				break;
			case 'textarea': div.appendChild(createTextArea(ele));
				break;	
			case 'checkbox': div.appendChild(createCheckBox(ele));
				break;	
			case 'radio': div.appendChild(createRadio(ele));
				break;	
		}
	});
	return div;
}

function createRadio(ele){
	var div = doc.createElement('div');
	div.setAttribute('contenteditable', ele.editable);
	div.appendChild(doc.createTextNode(ele.description));

	var label = doc.createElement('label');
	label.appendChild(doc.createTextNode(ele.label));

	div.appendChild(label);

	ele.options.forEach(function(rad){
		var l = doc.createElement('label');		
		var radio = doc.createElement('input');
		radio.setAttribute('type', 'radio');
		radio.setAttribute('name', ele.label);
		l.appendChild(radio);
		l.appendChild(doc.createTextNode(rad));
		div.appendChild(l);
	});
	return div;
}

function createInput(ele){
	var input = doc.createElement('input');
	var div = doc.createElement('div');
	input.setAttribute('required', ele.required);
	input.setAttribute('pattern', ele.validation);
	div.appendChild(doc.createTextNode(ele.description));
	div.appendChild(doc.createTextNode(ele.label));
	div.appendChild(input);
	div.setAttribute('contenteditable', ele.editable);
	return div;

}

function createSelect(ele){
	var div = doc.createElement('div');
	div.setAttribute('contenteditable', ele.editable);
	div.appendChild(doc.createTextNode(ele.description));

	var label = doc.createElement('label');
	label.appendChild(doc.createTextNode(ele.label));

	var select = doc.createElement('select');
	select.setAttribute('required', ele.required);
	ele.options.forEach(function(opts){
		var opt = doc.createElement('option');
		opt.setAttribute('value', opts);
		opt.appendChild(doc.createTextNode(opts));
		select.appendChild(opt);
	});

	label.appendChild(select);
	div.appendChild(label);
	return div;
}

function createTextArea(ele){
	var div = doc.createElement('div');
	div.setAttribute('contenteditable', ele.editable);

	var label = doc.createElement('label');
	label.appendChild(doc.createTextNode(ele.label));

	var textarea = doc.createElement('textarea');
	textarea.setAttribute('required', ele.required);
	textarea.setAttribute('pattern', ele.validation);

	label.appendChild(textarea);
	div.appendChild(label);

	return div;
}

function createCheckBox(ele){
	var div = doc.createElement('div');
	div.setAttribute('contenteditable',ele.editable);
	div.appendChild(doc.createTextNode(ele.description));

	var label = doc.createElement('label');
	label.appendChild(doc.createTextNode(ele.label));

	div.appendChild(label);

	ele.options.forEach(function(check){
		var l = doc.createElement('label');
		
		
		var checkbox = doc.createElement('input');
		checkbox.setAttribute('required', ele.required);
		checkbox.setAttribute('type', 'checkbox');

		l.appendChild(checkbox);
		l.appendChild(doc.createTextNode(check));

		div.appendChild(l);
	});

	return div;
}
