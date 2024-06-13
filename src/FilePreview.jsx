import { NavLink } from 'react-router-dom'
import { FaFolder, FaRegFilePdf, FaRegFileWord, FaRegFileExcel, FaRegFilePowerpoint } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function FilePreview({ fileName, pathname }) {
    const [fileType, setFileType] = useState('')

    useEffect(() => {
        if (fileName.includes('.')) setFileType(fileName.split('.')[1])
    }, [])
    

  // I build the pathname in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios
  return (
    <NavLink
      className="file-preview"
      key={fileName}
      to={`${pathname}${pathname === '/' ? fileName : '/' + fileName}`}
    >
      {fileType === '' && <FaFolder />}
      {fileType === 'pdf' && <FaRegFilePdf />}
      {fileType === 'docx' && <FaRegFileWord />}
      {fileType === 'xlsx' && <FaRegFileExcel />}
      {fileType === 'pptx' && <FaRegFilePowerpoint />}

      {fileName}
    </NavLink>
  )
}
