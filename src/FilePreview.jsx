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
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilePreview({ fileName, pathname, fetchFiles }) {
  const [fileType, setFileType] = useState('')
  const [isTooltipShown, setIsTooltipShown] = useState(false)

  useEffect(() => {
    if (fileName.includes('.')) setFileType(fileName.split('.')[1])
    else setFileType('folder')
  }, [])

  const handleFileActions = (e) => {
    e.preventDefault()
    setIsTooltipShown((prev) => !prev)
  }

  const handleDeleteFile = (e) => {
    e.preventDefault()
    axios.delete(`http://localhost:3000/file/?path=${pathname}/${fileName}`).then((res) => fetchFiles())
    setIsTooltipShown(false)
  }

  // I build the pathname in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios
  return (
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
          <div className='action'>
            <span>
              <IoInformationCircleOutline />
            </span>
            Details
          </div>
          <div className='action'>
            <span>
              <FaCloudDownloadAlt />
            </span>
            Download
          </div>
          <div className='action'>
            <span>
              <MdOutlineDriveFileRenameOutline />
            </span>
            Rename
          </div>
          <div className='action' onClick={handleDeleteFile}>
            <span>
              <FaRegTrashAlt />
            </span>
            Remove
          </div>
        </section>
      )}
    </NavLink>
  )
}
