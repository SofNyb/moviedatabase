// src/components/Pagination.jsx
export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const delta = 2; // pages shown before/after current

  const range = [];
  range.push(0); // first page

  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages - 2, currentPage + delta); i++) {
    range.push(i);
  }

  if (totalPages > 1) range.push(totalPages - 1); // last page

  // remove duplicates and sort (safe because we build in order)
  const pages = [...new Set(range)].sort((a, b) => a - b);

  // insert ellipsis where gaps exist
  const finalPages = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      finalPages.push(-1); // ellipsis marker
    }
    finalPages.push(pages[i]);
  }

  return (
    <div className="d-flex justify-content-center gap-2 my-4 flex-wrap">
      <button
        className="btn btn-outline-primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {finalPages.map((p) =>
        p === -1 ? (
          <span key={`ellipsis-${Math.random()}`} className="px-2 align-self-center">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`btn ${p === currentPage ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => onPageChange(p)}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        className="btn btn-outline-primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        Next
      </button>
    </div>
  );
}
