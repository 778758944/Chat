var $=require('jquery');
var img_url=require('./11.png');
require('./main.css');
var img=$("<img/>").attr('src',img_url);
function generateText() {
  var element = document.createElement('h2');
  element.innerHTML = "Hello world";
  $("body").append(img);
  return element;
}

$.get("/api/test",function(data){
	console.log(data);
});




module.exports = generateText;