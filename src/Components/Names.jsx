import React, { useState, useEffect } from 'react';


export function Pagination ({totalPages, onPageChange, page}) {
const buttonsToShow = [];

buttonsToShow.push(0);

if (page > 1) {
  buttonsToShow.push(page - 1);
}

if (page > 2) {
  buttonsToShow.push(page - 2);
}

if (page > 3) {
  buttonsToShow.push(page - 3);
}

buttonsToShow.push(page);


if (page < totalPages - 3) {
  buttonsToShow.push(page + 3);
}

if (page < totalPages - 2) {
  buttonsToShow.push(page + 2);
}

if (page < totalPages - 1) {
  buttonsToShow.push(page + 1);
}

buttonsToShow.push(totalPages - 1);

const uniqueButtons = [...new Set(buttonsToShow)].sort((a,b) => a - b);

return (
    <>
      {uniqueButtons.map((_, index) => 
      <button key={index}
        onClick={() => onPageChange(uniqueButtons[index])}
        disabled={uniqueButtons[index] === page}
        > {uniqueButtons[index] + 1} </button>)}
    </>
  );
}


export default function Name() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5113/api/names?page=${page}&pagesize=${pageSize}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error (`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setData(result);
      }
      catch (err) {
        setError(err.message || 'Failed to fetch data');
      }
      finally {
        setLoading(false)
      }

    }
      fetchData();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

return (
  <>
  <div>
    <h2>Names:</h2>

    {data?.items?.length > 0 ? (
      data.items.map((item, index) => (
        <div key={index}>
          {item.name}
        </div>
      ))
    ) : (
      <div>No items</div>
    )}
  </div>
    <Pagination 
     totalPages={data.numberOfPages} 
     onPageChange={setPage} 
      page={page}
    />
  </>
);
}
