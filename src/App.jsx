import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import FilePreview from './FilePreview'
import FileDetails from './FileDetails'

export default function App() {
  const [filesNames, setFilesNames] = useState([])
  const [fileData, setFileData] = useState({})
  // I can't use Routes because it's not possible to predict the files structure, therefore I use useLocation
  const { pathname } = useLocation()

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/file')
  //     .then((res) => setFilesNames(res.data))
  // }, [])

  useEffect(() => {
    // I build the pathname at FilePreview component, in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios request
    axios
      .get(`http://localhost:3000/file/?path=${pathname}`) // I use req.query because the server can't handle req.params with multiple slashes(/)
      .then((res) => {
        if (Array.isArray(res.data)) setFilesNames(res.data)
        else setFileData(res.data)
      })
  }, [pathname])

  function handleSubmit(e) {
    e.preventDefault()
    const file = new FormData(e.target)
    axios.post(`http://localhost:3000/file/?path=${pathname}`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  return (
    <section className="app-container">
      <h1 className="header">DRIVER</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="myFile" id="myFile" />
        <button type="submit">Upload</button>
      </form>

      {filesNames.length > 0 && ( // if it's a directory
        <section className="main">
          <section className="folders-container">
            <h1>Folders</h1>
            <section className="folder-list">
              {filesNames.map((fileName) => {
                if (!fileName.includes('.'))
                  return (
                    <FilePreview
                      key={fileName}
                      fileName={fileName}
                      pathname={pathname}
                    />
                  )
              })}
            </section>
          </section>

          <section className="files-container">
            <h1>Files</h1>
            <section className="file-list">
              {filesNames.map((fileName) => {
                if (fileName.includes('.'))
                  return (
                    <FilePreview
                      key={fileName}
                      fileName={fileName}
                      pathname={pathname}
                    />
                  )
              })}
            </section>
          </section>
        </section>
      )}

      {Object.keys(fileData).length > 0 && ( // if it's a single file
        <FileDetails fileData={fileData} />
      )}
    </section>
  )
}
