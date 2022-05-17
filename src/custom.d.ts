// 需在 .eslintrc.js 中配置
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  showTagList: Tag[];
  currentTag?: Tag;
  selectedType: string;
  iconNameList: string[];
  selectedTagName: string[];
};
type RecordItem = {
  tag: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt: string;
  icon: string;
};
type Tag = {
  id: string;
  name: string;
  icon: string;
  type: string;
};
type TagListModel = {
  data: tag[];
  fetch: () => tag[];
  create: (name: string) => "duplicated" | "success";
  save: () => void;
  remove: (id: string) => Boolean;
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
};
