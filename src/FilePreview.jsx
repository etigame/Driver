import { NavLink } from 'react-router-dom'
import {
  FaFolder,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFilePowerpoint,
  FaCloudDownloadAlt,
  FaRegTrashAlt,
} from 'react-icons/fa'
import { AiOutlineFileJpg } from 'react-icons/ai'
import { IoMdMore } from 'react-icons/io'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Popup from './Popup'

export default function FilePreview({ fileName, pathname, fetchFiles }) {
  const [fileType, setFileType] = useState('')
  const [isTooltipShown, setIsTooltipShown] = useState(false)
  const [isPopupShown, setIsPopupShown] = useState(false)
  const [popupContent, setPopupContent] = useState('')

  useEffect(() => {
    if (fileName.includes('.')) setFileType(fileName.split('.')[1])
    else setFileType('folder')
  }, [])

  const handleFileActions = (e) => {
    e.preventDefault()
    setIsTooltipShown((prev) => !prev)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setIsTooltipShown(false)
    axios
      .delete(`http://localhost:3000/file/?path=${pathname}/${fileName}`)
      .then((res) => fetchFiles())
  }

  const handlePopup = (e) => {
    e.preventDefault()
    setIsTooltipShown(false)
    setIsPopupShown(true)
    setPopupContent('rename')
  }

  const handleRename = (e, newName) => {
    // i send the old path via query params 
    axios
      .put(`http://localhost:3000/file/?path=${pathname}/${fileName}`, {
        newPath: `${pathname}/${newName}`
      })
      .then((res) => fetchFiles())

    setIsPopupShown(false)
  }

  // I build the pathname in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios
  return (
    <>
      <NavLink
        className="file-preview"
        key={fileName}
        to={`${pathname}${pathname === '/' ? fileName : '/' + fileName}`}
      >
        <span className={`file-preview-icon ${fileType}`}>
          {fileType === 'folder' && <FaFolder />}
          {fileType === 'pdf' && <FaRegFilePdf />}
          {fileType === 'docx' && <FaRegFileWord />}
          {fileType === 'xlsx' && <FaRegFileExcel />}
          {fileType === 'pptx' && <FaRegFilePowerpoint />}
          {fileType === 'jpg' && <AiOutlineFileJpg />}
        </span>

        <div className="file-preview-bottom">
          <span className="file-preview-name" title={fileName}>
            {fileName}
          </span>
          <span
            className="file-preview-actions"
            onClick={(e) => handleFileActions(e)}
          >
            <IoMdMore />
          </span>
        </div>

        {isTooltipShown && (
          <section className="file-actions-tooltip">
            <div className="action">
              <span className='action-icon'>
                <IoInformationCircleOutline />
              </span>
              <span className="action-name">Details</span>
            </div>
            <div className="action">
              <span className='action-icon'>
                <FaCloudDownloadAlt />
              </span>
              <span className="action-name">Download</span>
            </div>
            <div className="action" onClick={handlePopup}>
              <span className='action-icon'>
                <MdOutlineDriveFileRenameOutline />
              </span>
              <span className="action-name">Rename</span>
            </div>
            <div className="action" onClick={handleDelete}>
              <span className='action-icon'>
                <FaRegTrashAlt />
              </span>
              <span className="action-name">Remove</span>
            </div>
          </section>
        )}
      </NavLink>
      {isPopupShown && (
        <Popup
          popupContent={popupContent}
          setIsPopupShown={setIsPopupShown}
          fileName={fileName}
          handleRename={handleRename}
        />
      )}
    </>
  )
}
