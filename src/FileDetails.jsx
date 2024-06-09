export default function FileDetails({fileData}) {
    const {birthtimeMs, atimeMs, mtimeMs, size} = fileData

    const formatDate = (ms) => {
        const date = new Date(ms)
        return date.toLocaleString()
    }
    
    if (Object.keys(fileData).length > 0) return (
        <section className="file-details">
            <h3>File Details</h3>
            <p><span>Created:</span> {formatDate(birthtimeMs)}</p>
            <p><span>Last modified:</span> {formatDate(mtimeMs)}</p>
            <p><span>Last access:</span> {formatDate(atimeMs)}</p>
            <p><span>Size:</span> {size/1000} KB</p>
        </section>
    )
}