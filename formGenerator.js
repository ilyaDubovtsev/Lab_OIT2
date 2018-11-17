$(document).ready(function () {
    $( "#generate" ).click(function(){
      $("#result").empty();
      var obj = $("#source").val();
      var formInfo = JSON.parse(obj);

      var form = document.createElement("form");
      form.name = 'myForm';
      form.method = formInfo.method;
      form.action = formInfo.action;
      form.id = "form"
      document.querySelector("#result").appendChild(form);

      formInfo.fields.forEach(e => {
        switch(e.type){
          case "textarea":
            var textarea = document.createElement("textarea");
            textarea.form = form.id; 
            textarea.id = guid();        
            textarea.name = e.name;
            textarea.required = e.necessary;
            if (e.test){
              textarea.pattern = e.test;
            }
            if (e.label){
              var label = document.createElement("label");
              label.for = textarea.id;
              label.textContent = e.label;
              document.querySelector(form.id).appendChild(label);
            }
            document.querySelector(form.id).appendChild(textarea);
            break; 

          case "info":
            var label = document.createElement("label");
            label.textContent = e.label;
            document.querySelector(form.id).appendChild(label);
            break;
            
          default:
            var input = document.createElement("input");
            var inputId = guid();
            var labelId = guid();
            input.id = inputId;        
            input.name = e.name;
            input.type = e.type;
            input.className = e.type;            
            if (e.value){
              input.value = e.value;
            }
            input.required = e.necessary;
            if (e.test){
              input.pattern = e.test;
            }
            if (e.label){
              var label = document.createElement("label");
              label.for = input.id;
              label.id = labelId;
              label.textContent = e.label;
              document.querySelector(form.id).appendChild(label);
            }
            document.querySelector(form.id).appendChild(input);
            
            if (e.if){
              document.querySelector(form.id).onchange = function(){
                var key = Object.keys(e.if);
                var value = e.if[key];
                if ($("input[name=" + key + "]:checked").val() != value){
                  $("input[name=" + e.name + "]").hide();
                  $("label[id='" + labelId + "']").hide();
                }
                else{
                  $("input[name=" + e.name + "]").show();
                  $("label[id='" + labelId + "']").show();
                }
              }
            }
        }     
      });

      var submit = document.createElement("input");
      submit.type = "submit";
      submit.className = "submit"
      document.querySelector(form.id).appendChild(submit);
    });
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}