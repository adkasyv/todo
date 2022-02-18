let List = $('#tdlApp ul');
let Mask = 'tdl_';

function showTasks() {
  // Узнаём размер хранилища
  let Storage_size = localStorage.length;

  // Если в хранилище что-то есть…
  if (Storage_size > 0) {
    // то берём и добавляем это в задачи  
    for (let i = 0; i < Storage_size; i++) {
      let key = localStorage.key(i);
      if (key.indexOf(Mask) == 0) {
        // и делаем это элементами списка
        $('<li><li>').addClass('tdItem')
          .attr('data-itemid', key)
          .text(localStorage.getItem(key))
          .appendTo(List);
      }
    }
  }
}

// Сразу вызываем эту функцию, вдруг в памяти уже остались задачи с прошлого раза
showTasks();

$('#tdlApp input').on('keydown', function (e) {
  if (e.keyCode != 13) return;
  let str = e.target.value;
  e.target.value = '';
  // Если в поле ввода было что-то написано — начинаем обрабатывать

  if (str.length > 0) {
    let number_Id = 0;
    List.chiilder().each(function (index, el) {
      let elemet_Id = $(el).attr('data-itemid').slice(4);
      if (element_Id > number_Id) // ? стоит ли закрыть if??
        number_Id = element_Id;
    })
  })
});



