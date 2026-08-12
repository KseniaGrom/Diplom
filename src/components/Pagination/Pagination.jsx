import React from 'react';
import './Pagination.css';
import vectorLeft from '../../Images/Pagination/vectorleft.png';
import vectorRight from '../../Images/Pagination/vectorright.png';

function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  // ★ ЛОГИКА: показываем 1-3, при нажатии вправо — все страницы ★
  const getVisiblePages = () => {
    const pages = [];

    if (currentPage <= 3) {
      // ★ Если мы на 1, 2 или 3 странице — показываем только 1, 2, 3 ★
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 3) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else {
      // ★ Если мы за 3-й страницей — показываем 1, точки, текущую и соседние, точки, последнюю ★
      pages.push(1);
      pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button 
        className="pagination__btn pagination__btn--prev"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <img src={vectorLeft} alt="◀" className="pagination__arrow" />
      </button>

      {visiblePages.map((page, index) => (
        page === '...' ? (
          <span key={`dot-${index}`} className="pagination__dots">...</span>
        ) : (
          <button
            key={page}
            className={`pagination__btn ${page === currentPage ? 'pagination__btn--active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      ))}

      <button 
        className="pagination__btn pagination__btn--next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <img src={vectorRight} alt="▶" className="pagination__arrow" />
      </button>
    </div>
  );
}

export default Pagination;