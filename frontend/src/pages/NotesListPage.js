import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])


    let getNotes = async () => {

        let response = await fetch('/api/notes')
        let data = await response.json()
        setNotes(data)
    }

    return (
        <div className="notes">
            <div className="notes-header">
                <input className='search' placeholder=" &#x1F50D; Search"></input>   
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>

            <p className='noteslength'>{notes.length} Note</p>
             <AddButton />
        </div>
    )
}

export default NotesListPage