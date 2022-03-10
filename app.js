var List = $('#tdlApp ul');
var Mask = 'tdl_';

function showTasks() {
  // Узнаём размер хранилища
  var Storage_size = localStorage.length;

  // Если в хранилище что-то есть…
  if (Storage_size > 0) {
    // то берём и добавляем это в задачи  
    for (var i = 0; i < Storage_size; i++) {
      var key = localStorage.key(i);
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

// Следим, когда пользователь напишет новую задачу в поле ввода и нажмёт Enter
$('#tdlApp input').on('keydown', function (e) {
  if (e.keyCode != 13) return;
  var str = e.target.value;
  e.target.value = '';

  // str = '&#128512' + str;

  // todo -- Что можно ещё сделать
  // todo Можно попробовать вставить в начало каждой задачи эмодзи, чтобы список стал нагляднее. Чтобы это сделать, после проверки длины строки (если она ненулевая и пользователь ввёл какой-то текст) добавьте операцию сложения символа и строки. Первое слагаемое (символ) — код эмодзи, например #128522, а второе слагаемое — та строка с задачей, которую ввёл пользователь. Результат положите снова в эту же строчку. Теперь у вас вначале будет идти красивый смайлик, а затем — текст задачи.

  // todo Можно добавить звук на закрытие задачи. Для этого используйте тег <audio> и добавьте в конец функции клика по задаче команду audio.play с помощью jQuery.






  // Если в поле ввода было что-то написано — начинаем обрабатывать
  if (str.length > 0) {
    var number_Id = 0;
    List.children().each(function (index, el) {
      var element_Id = $(el).attr('data-itemid').slice(4);
      if (element_Id > number_Id) // ? стоит ли закрыть if??
        number_Id = element_Id;
    })
    number_Id++;
    // Отправляем новую задачу сразу в память
    localStorage.setItem(Mask + number_Id, str);
    // и добавляем её в конец списка
    $('<li></li>').addClass('tdItem')
      .attr('data-itemid', Mask + number_Id)
      .attr('draggable', 'true')
      .text(str).appendTo(List);
  }
});

// По клику на задаче — убираем её из списка
$(document).on('click', '.tdItem', function (e) {
  // Находим задачу, по которой кликнули
  var jet = $(e.target);
  // Находим задачу, по которой кликнули
  localStorage.removeItem(jet.attr('data-itemid'));
  // и убираем её из списка
  jet.remove();
})


// *Возможность сортировки задач посредством перетаскивания (drag и drop).
document.addEventListener('DOMContentLoaded', (event) => {

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    e.stopPropagation(); // препятствует перенаправлению в браузере.

    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }


  // let items = document.querySelectorAll('.container_1 .box');
  // items.forEach(function (item) {
  //   item.addEventListener('dragstart', handleDragStart);
  //   item.addEventListener('dragover', handleDragOver);
  //   item.addEventListener('dragenter', handleDragEnter);
  //   item.addEventListener('dragleave', handleDragLeave);
  //   item.addEventListener('dragend', handleDragEnd);
  //   item.addEventListener('drop', handleDrop);
  // });

  let items = document.querySelectorAll('.container_2 .tdItem');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('drop', handleDrop);
  });

});