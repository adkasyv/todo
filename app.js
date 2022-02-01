let addMessage = document.querySelector('.message'),
    addButton  = document.querySelector('.add'),
    todo       = document.querySelector('.todo');

let todoList = [];

addButton.addEventListener('click', function() {
    
    let newTodo = {
      todo: addMessage.value,
      checked: false,
      important: false
    };
    
    todoList.push(newTodo);
    displayMessages();
}); 


function displayMessages() {
  
  todoList.forEach(function(item, i){
      let displayMessage = `Наше дело: ${addMessage.value}`;
      console.log('displayMessage: ', displayMessage);
  });
}



