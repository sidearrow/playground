import React, { useState, useMemo } from 'react';

import './data-table.scss';

const MetaInfo: React.FC<{
  start: number;
  end: number;
  length: number;
}> = ({ start, end, length }) => (
  <div className="text-center mt-1">
    <span>{start + 1} 件</span>
    <span style={{ marginLeft: '0.5rem' }}>～</span>
    <span style={{ marginLeft: '0.5rem' }}>{end + 1} 件</span>
    <span style={{ marginLeft: '0.5rem' }}>（全 {length} 件）</span>
  </div>
);

const SortArrow: React.FC<{
  isAsc: boolean | null;
}> = ({ isAsc }) => (
  <span className="ml-05">
    <span className={`sort-arrow ${isAsc ? 'active' : ''}`}>￪</span>
    <span className={`sort-arrow ${isAsc ? '' : 'active'}`}>￬</span>
  </span>
);

const DataTable: React.FC<{
  data: (string | number | null)[][];
  cells: ((v: string | number | null) => JSX.Element)[];
  headers: {
    text: string;
    isSort?: boolean;
  }[];
  defaultSort: {
    index: number;
    isAsc: boolean;
  };
}> = ({ data, headers, cells, defaultSort }) => {
  const sortData = (i: number, isAsc: boolean) => {
    data.sort((a, b) => isAsc ? Number(a[i]) - Number(b[i]) : Number(b[i]) - Number(a[i]));
  };

  sortData(defaultSort.index, defaultSort.isAsc);

  const lengthPerPage = 20;
  const length = data.length;
  const maxPage = Math.ceil(length / lengthPerPage);

  const [sort, setSort] = useState({
    index: defaultSort.index,
    isAsc: defaultSort.isAsc,
  });
  const [pageNum, setPageNum] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(lengthPerPage - 1);

  const pageData = useMemo(() => {
    sortData(sort.index, sort.isAsc);
    const start = lengthPerPage * (pageNum - 1);
    const end = pageNum === maxPage ? length - 1 : lengthPerPage * pageNum - 1;
    setStart(start);
    setEnd(end);
    return data.slice(start, end + 1);
  }, [pageNum, sort]);

  return (
    <>
      <div className='data-table pb-1'>
        <table>
          <thead>
            <tr>{headers.map((header, i) => (
              <th onClick={() => {
                headers[i].isSort && setSort({ index: i, isAsc: i === sort.index ? !sort.isAsc : true })
              }}>
                <span>{header.text}</span>
                {header.isSort && (<SortArrow isAsc={i === sort.index ? sort.isAsc : null} />)}
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {pageData.map((tr, i) => (
              <tr key={i}>{tr.map((td, j) => (
                cells[j](td)
              ))}</tr>
            ))}
          </tbody>
        </table>
        <div className='mt-1 text-center'>{[...Array(maxPage)].map((_, i) => (
          <span className={`mr-1 ${pageNum === (i + 1) ? 'fw-bold' : 'link'}`} onClick={() => setPageNum(i + 1)} key={i}>{i + 1}</span>
        ))}</div>
        <MetaInfo start={start} end={end} length={length} />
      </div>
    </>
  );
};

export default DataTable;
