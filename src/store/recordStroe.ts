import recordListModel from '@/models/recordListModel'

const recordStore = {
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => { recordListModel.create(record) },



}

export default recordStore