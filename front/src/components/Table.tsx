import React, { useState, useCallback, useEffect } from 'react';

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
  const lengthPerPage = 30;
  const length = tableData.length;
  const maxPage = Math.ceil(length / lengthPerPage);

  const [pageNum, setPageNum] = useState(1);
  const [pageData, setPageData] = useState({
    start: 0,
    end: lengthPerPage - 1,
    data: tableData.slice(0, lengthPerPage),
  });

  useEffect(() => {
    setPageData(Object.assign({}, {
      start: lengthPerPage * (pageNum - 1),
      end: pageNum === maxPage ? length - 1 : lengthPerPage * pageNum - 1,
      data: tableData.slice(pageData.start, pageData.end + 1),
    }));
  }, [pageNum]);

  return (
    <>
      <table>
        <tbody>
          {pageData.data.map(tr => (
            <tr>{tr.map(td => (
              <td>{td}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
      <div className='mt-1 text-center'>{[...Array(maxPage)].map((_, i) => (
        <span className='mr-1' onClick={() => setPageNum(i + 1)}>{i + 1}</span>
      ))}</div>
      <MetaInfo start={pageData.start} end={pageData.end} length={length} />
    </>
  );
};

export default Table;
