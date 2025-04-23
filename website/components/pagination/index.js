import { useState } from 'react';

export default function PaginationWrapper({
  children,
  limit,
  containerClassName,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(children.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const currentItems = children.slice(startIndex, startIndex + limit);
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <div className="text-neutral-500">
      <div className={containerClassName ? containerClassName : ''}>
        {currentItems}
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="disabled:opacity-50 underline"
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 underline"
        >
          Next
        </button>
      </div>
    </div>
  );
}
