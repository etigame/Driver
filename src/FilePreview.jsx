import { NavLink } from 'react-router-dom'

export default function FilePreview({ fileName, pathname }) {
    console.log(pathname)
    // I build the pathname in a way that he'll look like the structure in the root/public folder in the server - then I send it with axios
  return (
    <NavLink className="file-preview" key={fileName} to={`${pathname}${pathname === '/' ? fileName : '/' + fileName}`}>
      {fileName}
    </NavLink>
  )
}
