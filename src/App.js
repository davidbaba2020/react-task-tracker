import { useState } from 'react';
import { FaLess, FaLessThanEqual } from 'react-icons/fa';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Task from './components/Tasks';


function App() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [tasks, setTasks] = useState([
      {
          id: 1,
          text:'GSU Gettogether',
          day: 'Oct 10Th at 2:30pm',
          reminder: true,   
      },
      {
          id: 2,
          text:'Devotional Test',
          day: 'Oct 13Th at 3:0am',
          reminder: true,   
      },
      {
          id: 3,
          text:'Raect Classes',
          day: 'Oct 20Th at 8:30am',
          reminder: false,   
      },
      {
          id: 4,
          text:'DB Classes',
          day: 'Oct 30Th at 7:30am',
          reminder: true,   
      }
  ])

  //Add Task
  const addTask = (task) =>{
  const id = Math.floor(Math.random()*10000) + 1
  const newTAsk = {id, ...task}
  setTasks([...tasks,newTAsk])
  }

  //For deleting task
  const deleteTask = (id) =>{
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //To set the reminder 
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
    task.id === id? {...task, reminder: !task.reminder}: task
    ))
  }

  return (
    <div className="container">
      <Header onAdd = {() => setShowAddTaskForm(!showAddTaskForm)} showAdd = {showAddTaskForm}/>
      {showAddTaskForm && <AddTask onAdd ={addTask} />}
      {tasks.length > 0 ? (<Task tasks = {tasks} onDelete ={deleteTask} onToggle = {toggleReminder} /> ) : ('No Task to show')}
    </div>
  );
}

export default App;
