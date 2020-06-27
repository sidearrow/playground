export type SelectItem = {
  label: string;
  value: string;
};

const railwayTypeSelectItems: SelectItem[] = [
  { value: '11', label: '普通鉄道' },
  { value: '21', label: '懸垂式モノレール' },
  { value: '22', label: '跨座式モノレール' },
  { value: '31', label: '案内軌条式新交通システム' },
  { value: '32', label: '浮上式交通システム' },
  { value: '41', label: '鋼索鉄道' },
];

const companyTypeSelectItems: SelectItem[] = [
  { value: '1', label: 'JR' },
  { value: '2', label: '大手私鉄' },
  { value: '3', label: '準大手私鉄' },
  { value: '4', label: '公営鉄道' },
  { value: '5', label: '中小私鉄' },
];

export const constant = {
  selectItems: {
    companyType: companyTypeSelectItems,
    railwayType: railwayTypeSelectItems,
  },
};
