import { useState, useEffect, useRef } from "preact/hooks";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PAGINATION_THRESHOLD } from "../constants/constants";
import { RepoCard } from "./RepoCard";
import { Pagination } from "./Pagination";

/**
 * Container for the repository list with pagination and infinite scroll logic.
 * This is an interactive component that will be selectively hydrated.
 */
export function RepoListContainer() {
  const { repos, githubColors } = useGitHubRepos();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(PAGINATION_THRESHOLD);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const totalPages = Math.ceil(repos.length / PAGINATION_THRESHOLD);
  const paginatedRepos = isMobile
    ? repos.slice(0, visibleCount)
    : repos.slice((currentPage - 1) * PAGINATION_THRESHOLD, currentPage * PAGINATION_THRESHOLD);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMobile || visibleCount >= repos.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGINATION_THRESHOLD);
        }
      },
      { rootMargin: "200px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isMobile, visibleCount, repos.length]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        {paginatedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} githubColors={githubColors} />
        ))}
      </div>

      {isMobile && visibleCount < repos.length && (
        <div ref={loadMoreRef} className="h-20" />
      )}

      {!isMobile && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
