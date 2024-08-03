// script.js

$(document).ready(function () {
    $('#calendar').fullCalendar({
        locale: 'tr', 
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: [],
        eventClick: function (event) {
            alert('Görev: ' + event.title + '\n' + 'Tarih: ' + event.start.format('DD MMMM YYYY, HH:mm'));
        }
    });

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const deadlineInput = document.getElementById('deadline-input');
    const categoryInput = document.getElementById('category-input');
    const tagsInput = document.getElementById('tags-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const task = taskInput.value;
        const deadline = deadlineInput.value;
        const category = categoryInput.value;
        const tags = tagsInput.value.split(',').map(tag => tag.trim());

        addTask(task, deadline, category, tags);

        taskInput.value = '';
        deadlineInput.value = '';
        categoryInput.value = 'iş';
        tagsInput.value = '';
    });

    function addTask(task, deadline, category, tags) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const deleteButton = document.createElement('button');

        span.innerHTML = `<strong>${task}</strong> <br>
                          <small>Teslim: ${new Date(deadline).toLocaleString()}</small> <br>
                          <small>Kategori: ${category}</small> <br>
                          <small>Etiketler: ${tags.join(', ')}</small>`;

        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => {
            $(li).fadeOut(300, () => {
                taskList.removeChild(li);
            });
            $('#calendar').fullCalendar('removeEvents', function (event) {
                return event.title === task;
            });
        });

        $(li).hide().appendTo(taskList).fadeIn(300);
        li.appendChild(span);
        li.appendChild(deleteButton);

        // Takvim için olay ekle
        $('#calendar').fullCalendar('renderEvent', {
            title: task,
            start: deadline,
            allDay: false
        }, true);
    }
});
