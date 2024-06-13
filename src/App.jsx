import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import FilePreview from './FilePreview'
import FileDetails from './FileDetails'
import { FaFileUpload } from 'react-icons/fa'

export default function App() {
  const [filesNames, setFilesNames] = useState([])
  const [fileData, setFileData] = useState({})
  // I can't use Routes because it's not possible to predict the files structure, therefore I use useLocation
  const { pathname } = useLocation()

  useEffect(() => {
    fetchFiles()
  }, [pathname])

  const fetchFiles = () => {
    // I build the pathname at FilePreview component, in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios request
    axios
      .get(`http://localhost:3000/file/?path=${pathname}`) // I use req.query because the server can't handle req.params with multiple slashes(/)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setFilesNames(res.data)
          setFileData({})
        } else {
          setFileData(res.data)
          setFilesNames([])
        }
      })
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      axios
        .post(`http://localhost:3000/file/?path=${pathname}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => fetchFiles())
    }
  }

  return (
    <section className="app-container">
      <section className="header">
        <h1 className="logo">DRIVER</h1>
        <label htmlFor="fileInput" className="custom-upload-btn">
          <FaFileUpload />
          Upload File
        </label>
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          accept=".jpg, .pptx, .xlsx, .docx, .pdf"
          onChange={handleFileChange}
        />
      </section>

      <section className="main">
        {filesNames.length > 0 && ( // if it's a directory
          <>
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
          </>
        )}

        {Object.keys(fileData).length > 0 && ( // if it's a single file
          <FileDetails fileData={fileData} />
        )}
      </section>
    </section>
  )
}
