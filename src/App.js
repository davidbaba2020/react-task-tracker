import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Task from './components/Tasks';


function App() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTask = async ()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTask()
  }, [])

  //Fetch Tasks from server
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  
  //Fetch Task from server (Only One)
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  
  //Add Task
  const addTask = async (task) =>{
    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task) 
    })
    const data = await res.json()
    setTasks([...tasks, data])


  // const id = Math.floor(Math.random()*10000) + 1
  // const newTAsk = {id, ...task}
  // setTasks([...tasks,newTAsk])
  }

  //For deleting task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle to set the reminder 
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id)
    const updatedTask = {...taskToggle, reminder: !taskToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id? {...task, reminder: data.reminder}: task
    ))
  }

  return (
    <Router>
        <div className="container">
          <Header onAdd = {() => setShowAddTaskForm(!showAddTaskForm)} showAdd = {showAddTaskForm}/>
          
          <Route path ='/' exact render= {(props)=>(
            <>
              {showAddTaskForm && <AddTask onAdd ={addTask} />}
          {tasks.length > 0 ? (<Task tasks = {tasks} onDelete ={deleteTask} onToggle = {toggleReminder} /> ) : ('No Task to show')}
            </>
          )}/>
          <Route path ='/about' component = {About}/>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
