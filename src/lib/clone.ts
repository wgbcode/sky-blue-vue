function clone(data: RecordItem) {
    return JSON.parse(JSON.stringify(data))
}

export default clone