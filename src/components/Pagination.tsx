interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="mt-20 flex flex-wrap items-center justify-start gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="border border-muted/60 px-4 py-2 md:py-4 lg:py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/80 transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:border-muted/30 disabled:text-muted/30 disabled:cursor-not-allowed"
      >
        [ PREV ]
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`border px-4 py-2 md:py-4 lg:py-2 font-mono text-xs tracking-[0.2em] transition-colors ${page === currentPage
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-muted/60 text-muted/80 enabled:hover:border-primary enabled:hover:text-primary'
            }`}
        >
          {page.toString().padStart(2, '0')}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="border border-muted/60 px-4 py-2 md:py-4 lg:py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/80 transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:border-muted/30 disabled:text-muted/30 disabled:cursor-not-allowed"
      >
        [ NEXT ]
      </button>
    </div>
  );
}
