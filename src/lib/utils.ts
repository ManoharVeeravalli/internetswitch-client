





export function formatDate(timeStamp: number) {
    const date = new Date(timeStamp);

    let dateStr = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    let timeStr = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return `${dateStr}, ${timeStr}`
}


export function formatBytes(bytes: number) {
    if (bytes < 1024) {
        return bytes + " B";
    } else if (bytes < (1024 * 1024)) {
        return (bytes / 1024).toFixed(2) + " KB";
    } else {
        return (bytes / 1024 / 1024).toFixed(2) + " MB";
    }
}