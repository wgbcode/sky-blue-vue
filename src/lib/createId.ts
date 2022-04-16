let id = parseInt(localStorage.getItem('idMax') || "0")

function createId() {
    id += 1
    localStorage.setItem('idMax', id.toString())
    return id.toString()
}

export default createId