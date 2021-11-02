import React, { useState } from 'react'

const AddTask = ({ onAdd }) => {
    // const [task, setTask] = useState('')
    // const [date, setDate] = useState('')
    // const [reminder, setReminder] = useState(false)
    const [formData, setFormData] = useState({
        text: "",
        day: "",
        reminder: false
    })
    const { text, day, reminder } = formData

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: name === 'reminder' ? e.currentTarget.checked : value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            alert("Please enter the task");
            return
        }
        onAdd({
            text,
            day,
            reminder
        })

        setFormData({
            text: "",
            day: "",
            reminder: false
        })
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text"
                    name="text"
                    value={text}
                    onChange={(e) => onChange(e)}
                    placeholder="Add task name" />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text" name="day" value={day} onChange={(e) => onChange(e)} placeholder="Add day & time" />
            </div>
            <div className="form-control form-control-check">
                {/* <div className="form-control-check"> */}
                <label>Set Reminder</label>
                <input type="checkbox" name="reminder" checked={reminder} onChange={(e) => onChange(e)} />
                {/* </div> */}
            </div>

            <input type="submit" className="btn btn-block" value='Save Task' />
        </form>
    )
}

export default AddTask