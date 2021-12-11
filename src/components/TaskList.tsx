import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    const task:Task ={
      id: Math.floor(Math.random() * 1000),
      title: newTaskTitle,
      isComplete: false
    }
     setTasks( [...tasks, task])
  }

  function handleToggleTaskCompletion(id: number) {
    const updatedTasks = [...tasks];
    const index = tasks.findIndex(task => task.id === id)
    updatedTasks[index].isComplete = !tasks[index].isComplete
    setTasks(updatedTasks);
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    const deletedTasks = [...tasks];
    const index = tasks.findIndex(task => task.id === id)
    delete deletedTasks[index];
    setTasks( deletedTasks);
    // Remova uma task da listagem pelo ID
  }

  console.log('teste', newTaskTitle)

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
    
              <button type="submit" disabled={!newTaskTitle } data-testid="add-task-button" onClick={handleCreateNewTask}>
                <FiCheckSquare size={16} color="#fff"/>
              </button>
        
        
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>

              {newTaskTitle  &&
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input 
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>
              }

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}