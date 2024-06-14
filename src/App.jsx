import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import FilePreview from './FilePreview'
import FileDetails from './FileDetails'
import { FaFileUpload, FaFolderPlus } from 'react-icons/fa'
import Popup from './Popup'

export default function App() {
  const [filesNames, setFilesNames] = useState([])
  const [fileData, setFileData] = useState({})
  // I can't use Routes because it's not possible to predict the files structure, therefore I use useLocation
  const { pathname } = useLocation()
  const [isPopupShown, setIsPopupShown] = useState(false)
  const [popupContent, setPopupContent] = useState('')

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
      axios
        .post(`http://localhost:3000/file/?path=${pathname}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => fetchFiles())
    }
  }

  const handleNewFolder = (e, folderName) => {
    e.preventDefault()
    if (folderName) {
      axios
        .post(`http://localhost:3000/file/create-folder/?path=${pathname}`, {folderName})
        .then((res) => fetchFiles())
    }

    setIsPopupShown(false)
  }

  const handlePopup = () => {
    setIsPopupShown(true)
    setPopupContent('newFolder')
  }

  return (
    <>
      <section className="app-container">
        <section className="header">
          <NavLink className="logo" to="/">
            DRIVER
          </NavLink>
          <div className="header-actions">
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
            <button className="new-folder-btn" onClick={() => handlePopup()}>
              <FaFolderPlus />
              New Folder
            </button>
          </div>
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
      {isPopupShown && (
        <Popup
          popupContent={popupContent}
          setIsPopupShown={setIsPopupShown}
          handleNewFolder={handleNewFolder}
        />
      )}
    </>
  )
}
