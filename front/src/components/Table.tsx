import React, { useState, useMemo } from 'react';

type TableData = (string | number | null)[][];

const MetaInfo: React.FC<{
  start: number;
  end: number;
  length: number;
}> = ({ start, end, length }) => (
  <div>
    <span>{start + 1} 件</span>
    <span style={{ marginLeft: '0.5rem' }}>～</span>
    <span style={{ marginLeft: '0.5rem' }}>{end + 1} 件</span>
    <span style={{ marginLeft: '0.5rem' }}>（全 {length} 件）</span>
  </div>
);

const Table: React.FC<{ tableData: TableData }> = ({ tableData }) => {
  const lengthPerPage = 20;
  const length = tableData.length;
  const maxPage = Math.ceil(length / lengthPerPage);

  const [pageNum, setPageNum] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(lengthPerPage - 1);

  const pageData = useMemo(() => {
    const start = lengthPerPage * (pageNum - 1);
    const end = pageNum === maxPage ? length - 1 : lengthPerPage * pageNum - 1;
    setStart(start);
    setEnd(end);

    return tableData.slice(start, end);
  }, [pageNum]);

  return (
    <>
      <div className='data-table'>
        <table>
          <tbody>
            {pageData.map((tr, i) => (
              <tr key={i}>{tr.map((td, j) => (
                <td key={j}>{td}</td>
              ))}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-1 text-center'>{[...Array(maxPage)].map((_, i) => (
        <span className={`mr-1 ${pageNum === (i + 1) ? '' : 'link'}`} onClick={() => setPageNum(i + 1)} key={i}>{i + 1}</span>
      ))}</div>
      <MetaInfo start={start} end={end} length={length} />
    </>
  );
};

export default Table;
