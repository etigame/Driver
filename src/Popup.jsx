import { useState } from 'react'

export default function Popup({
  popupContent,
  setIsPopupShown,
  handleNewFolder,
  fileName, handleRename
}) {
  const [folderName, setFolderName] = useState('') // to create new folder
  const [newName, setNewName] = useState(fileName) // to rename file or dir

  return (
    <section className="popup-overlay">
      <section className="popup">
        <button className="close" onClick={() => setIsPopupShown(false)}>
          &times;
        </button>
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

        {popupContent === 'rename' && (
          <form onSubmit={(e) => handleRename(e, newName)}>
            <label htmlFor="newName">Rename</label>
            <input
              type="text"
              name="newName"
              id="newName"
              value={newName}
              onInput={(e) => setNewName(e.target.value)}
            />
            <button type="submit">Rename</button>
          </form>
        )}
      </section>
    </section>
  )
}
