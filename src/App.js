import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App({ match }) {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
  ]);



  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    // console.log(window.location.pathname)
    getTasks()
  }, [])


  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    // console.log(data)
    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data

  }

  const addTask = async (task) => {

    // const id = Math.floor(Math.random() * 10000 + 1)
    // const newTask = {
    //   id,
    //   ...task
    // }
    const res = await fetch('http://localhost:5000/tasks',
      {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(task)
      })

    const data = await res.json()

    setTasks([
      ...tasks,
      data
    ])
  }
  //Remove Task from server
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    // setTasks((state) => ([
    //   ...state.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task)

    // ]))
    const taskToToggle = await fetchTask(id)
    const toggledTask = {
      ...taskToToggle, reminder: !taskToToggle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toggledTask)
    })
    const data = await res.json()
    setTasks(
      tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  //Hide Task button 

  // const showTask = () => {
  //   console.log('show task')
  //   setShowAddTask(!showAddTask)
  // }
  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
        <Route exact path="/" render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks && tasks.length > 0 ?
              <Tasks tasks={tasks} onClick={deleteTask} onToggle={toggleReminder} /> : <p>No Tasks to show</p>}
          </>
        )} />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>

  );
}

export default App;
