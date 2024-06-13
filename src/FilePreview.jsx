import { NavLink } from 'react-router-dom'
import {
  FaFolder,
  FaRegFilePdf,
  FaRegFileWord,
  FaRegFileExcel,
  FaRegFilePowerpoint,
} from 'react-icons/fa'
import { AiOutlineFileJpg } from "react-icons/ai";
import { useState, useEffect } from 'react'

export default function FilePreview({ fileName, pathname }) {
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    if (fileName.includes('.')) setFileType(fileName.split('.')[1])
        else setFileType('folder')
  }, [])

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
        {fileType === 'jpg' && <AiOutlineFileJpg />
}
      </span>
      <span className="file-preview-name">{fileName}</span>
    </NavLink>
  )
}
