import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link, useParams, useNavigate } from 'react-router-dom'

const NotePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    let noteId = id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, []);


    let getNote = async () => {
        if (noteId === 'new') return

        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }


    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        navigate('/');
    }

    let handleSubmit = () => {
        console.log('NOTE:', note)
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body !== null) {
            createNote()
        }
        navigate('/');
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }))
        console.log('Handle Change:', note)
    }

    return (
        <div className="note" >
            <div className="note-header">
                <h3>
                    <Link to="/"> <ArrowLeft onClick={handleSubmit} /> </Link>
                </h3>
                {noteId !== 'new' ? (
                    <Link to="/"><button onClick={deleteNote}>Delete</button></Link>
                ) : (
                   <Link to="/"><button onClick={handleSubmit}>Done</button> </Link>
                )}

            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} defaultValue={note?.body}></textarea>
        </div>
    )
}

export default NotePage