var Shaved = new function() {};

Shaved.template = function() {

};

var stackValues = {};

function TextCommand(commandText) {
	var text = commandText;
	this.lMatch = function(preCommand) {
		return false;
	};

	this.render = function(Model) {
		return commandText;
	} 
};

function ValueCommand(commandText) {
	var text = commandText;
	this.lMatch = function(preCommand) {
		return preCommand === '@Model.';
	};

	this.render = function() {
		console.log(commandText);
		parts = commandText.split(".");
		var v = stackValues;
		for (key in parts) {
			v = v[parts[key]];
		}
		return v;
	}
};

function ForCommand(commandText) {
	var text = commandText;
	var instance = "t"
	var subCommands = new Array();

	this.lMatch = function(preCommand) {
		return preCommand === '@Model.';
	};

	this.addCommand = function(command) {
		subCommands.push(command);
	};

	this.render = function() {
		var result = "";
		var varName = "@ninja";
		var iteratorName = "@Model";
	
		for (var key in stackValues[iteratorName]) {
			stackValues[varName] = stackValues[iteratorName][key];
			for(var sub in subCommands) {
				result = result + subCommands[sub].render();
			}
			// Remove stackValue
		}
		return result;
	}
};

function ShavedTemplate(template) {
	this.template = template
	this.commands = [new TextCommand(), new ValueCommand()];		

	this.render = function(Model) {
		var result = this.template.replace(/[@](Model[.a-z0-9]*)/gi, function(str, parameter) {
			console.log(parameter);
			return eval(parameter);
		});
		return result;
	};
	
	this.compile = function() {
		var stack = new Array();
		
		var preCommand, bc;
		for (i=0; i < this.template.length; i++) {
			var c = this.template.charAt(i);
			console.log(bc);
			if (bc === undefined) {
			
			}

			
			if (c === '@') {
				stack.push(command);
				command = new Array();
			}
			command.push(c);
		}
		
		stack.push(new TextCommand());

	};
	
};



