// 需在 .eslintrc.js 中配置
type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: tag[],
    fetch: () => tag[],
    create: (name: string) => "duplicated" | 'success'
    save: () => void
    remove: (id: string) => Boolean
    update: (id: string, name: string) => "success" | 'not found' | 'duplicated'
}

