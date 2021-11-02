import React from 'react'
// import PropTypes from 'propTypes'
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({ title, onAdd, showAddTask }) => {
    const path = window.location.pathname
    console.log(window.location.pathname)
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname.includes('about') ? '' :
                <Button color={!showAddTask ? 'green' : 'blue'} text={!showAddTask ? 'Add' : ' Hide Task'} onClick={onAdd} />}
        </header>
    )
}
// Header.defaultProps = {
//     title: "Task Tracker"
// }

Header.propTypes = {
    title: PropTypes.string.isRequired
}
//style in css
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header
