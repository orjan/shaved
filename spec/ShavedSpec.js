describe("Shaved Spec", function () {

  beforeEach(function() {
 
  });

  it("should be possible to create a template", function() {
    var template = Shaved.template();
  });
  
  it("should be possible to render a template", function() {
    var template = new ShavedTemplate("");
	template.render({});
  });
  
  /* Substitution spec */
  it("should be possible to render a static template", function() {
	var template = new ShavedTemplate("<h1>Apan ola</h1>");
	expect(template.render()).toEqual("<h1>Apan ola</h1>");
  }); 
  
  it("should be possible pass a model to the template", function() {
	var template = new ShavedTemplate("<h1>@Model.Name</h1>");
	expect(template.render({ Name: "Apan ola"})).toEqual("<h1>Apan ola</h1>");
  });
 
  it("should be possible pass a complex model to a template with multiple values", function() {
	var template = new ShavedTemplate("<h1>@Model.Name</h1><p>@Model.Email</p>");
	expect(template.render({ Name: "Calle", Email: "calle@hotmail.com"})).toEqual("<h1>Calle</h1><p>calle@hotmail.com</p>");
  });

  it("should be able to pass a nested model to the template", function() {
	var template = new ShavedTemplate("<h1>@Model.Address.ZipCode</h1>");
	expect(template.render({ Address: { ZipCode: 1337}} )).toEqual("<h1>1337</h1>");
  });
  
  /* Loop */
  /*
	  @foreach (var ninja in Model) {@ninja.Name,}
	*/
  /*it("should be possible to iterate a template", function() {
	var template = new ShavedTemplate("@foreach (var ninja in Model) {@ninja.Name,}");
	var ninjas = [{Name: "Calle"}, {Name: "Ola"}];
	expect(template.render(ninjas)).toEqual("Calle,Ola,");
  });
  */

  it("should be able to pass a nested model to the template3", function() {
	var template = new ShavedTemplate("Textcommand1 @ninja.Name TextCommand2");
	template.compile();
	// expect(template.render({ Address: { ZipCode: 1337}} )).toEqual("<h1>1337</h1>");
  });  

  it("should render TextCommand", function() {
	var command = new TextCommand("<h1>1337</h1>");
	expect(command.render({ Address: { ZipCode: 1337}} )).toEqual("<h1>1337</h1>");
  });

  it("should render ValueCommand", function() {
	stackValues["@Model"] = { ninja: { Name: "Calle" } };
	var command = new ValueCommand("@Model.ninja.Name");
	expect(command.render( )).toEqual("Calle");
  });

  it("should render ForCommand", function() {
	stackValues["@Model"] = [{Name:"Calle"},{Name:"Balle"}]; 
	var command = new ForCommand("");
	command.addCommand(new TextCommand("APA"));
	expect(command.render()).toEqual("APAAPA");
  });

  it("should render ForCommand with values", function() {
	stackValues["@Model"] = [{Name:"Calle"},{Name:"Balle"}]; 
	var command = new ForCommand("");
	command.addCommand(new ValueCommand("@ninja.Name"));
	expect(command.render([{Name:"Calle"},{Name:"Balle"}])).toEqual("CalleBalle");
  });
  it("should pass @", function() {
	var ats = {"@Model": { Name: "Calle" }};  
	//debugger;
	expect(ats["@Model"]["Name"]).toEqual("Calle");
  });    
});