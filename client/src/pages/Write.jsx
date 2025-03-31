import React, { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'

const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.title || '')
  const [title, setTitle] = useState(state?.desc || '')
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || '')

  const navigate = useNavigate()
  const quillRef = useRef()

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('/upload', formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='add'>
      <div className='content'>
        <input
          type='text'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className='editorContainer'>
          <ReactQuill
            className='editor'
            theme='snow'
            value={value}
            onChange={setValue}
            ref={quillRef}
          />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: 'none' }}
            type='file'
            id='file'
            name=''
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='file' htmlFor='file'>
            Upload Image
          </label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'philosophy'}
              name='cat'
              value='philosophy'
              id='philosophy'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='philosophy'>Philosophy</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'futurology'}
              name='cat'
              value='futurology'
              id='futurology'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='futurology'>Futurology</label>
          </div>
         
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'socialpsychology'}
              name='cat'
              value='socialpsychology'
              id='socialpsychology'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='socialpsychology'>Social Psychology</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'hermeneutics'}
              name='cat'
              value='hermeneutics'
              id='hermeneutics'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='hermeneutics'>Hermeneutics</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'management'}
              name='cat'
              value='management'
              id='management'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='management'>Management</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
