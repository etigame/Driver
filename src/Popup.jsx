import { useState } from 'react'

export default function Popup({ popupContent, setIsPopupShown, handleNewFolder }) {
  const [folderName, setFolderName] = useState('')

  return (
    <section className="popup-overlay">
      <section className="popup">
        <button className='close' onClick={() => setIsPopupShown(false)}>&times;</button>
        {popupContent === 'newFolder' && (
          <form onSubmit={(e) => handleNewFolder(e, folderName)}>
            <label htmlFor="folderName">Folder Name</label>
            <input
              type="text"
              name="folderName"
              id="folderName"
              value={folderName}
              onInput={(e) => setFolderName(e.target.value)}
            />
            <button type="submit">Create Folder</button>
          </form>
        )}
      </section>
    </section>
  )
}
