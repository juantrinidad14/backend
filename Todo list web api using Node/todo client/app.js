

const todoUL = document.getElementById('todoUL')
const titleTextBox = document.getElementById('titleTextBox')
const priorityTextBox = document.getElementById('priorityTextBox')
const dateCreatedTextBox = document.getElementById('dateCreatedTextBox')
const saveTaskButton = document.getElementById('saveTaskButton')

saveTaskButton.addEventListener('click', () => {

    const title = titleTextBox.value
    const priority = priorityTextBox.value
    const dateCreated = dateCreatedTextBox.value


    //fettch request POST to Save our task
    fetch('http://localhost:3000/todos',{
        method: 'POST',
        headers: {
            'contet-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            priority: priority,
            dateCreated: dateCreated
        })
    
    }).then(response => response.json())
    .then(result => {
        if(result.success){
            fetchAllTasks

        }
    })

})


function fetchAllTasks () {

    todoUL.innerHTML = ''

    // fetch and display all tasks
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(tasks => {
            let taskItems = tasks.map(task => {
                return `<li>${task.title}</li>`

            })

            todoUL.insertAdjacentHTML('beforeend', taskItems.join(''))

        })

}

fetchAllTasks()
