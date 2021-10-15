import { useLocation  } from 'react-router'
import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation() 
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color= {showAdd ? 'red':'green'} text ={showAdd ? 'Close':'Add'} onClick = {onAdd}/>}
        </header>
    )
}

export default Header

Header.defaultProps= {
    title: "My Task Tracker"
}

Header.prototype = {
    title: PropTypes.string.isRequired,
}