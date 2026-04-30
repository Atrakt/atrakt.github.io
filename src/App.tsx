import { useGitHubRepos } from "./hooks/useGitHubRepos";
import { Sidebar } from "./components/Sidebar";
import { RepoListContainer } from "./components/RepoListContainer";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

/**
 * Main application layout.
 * This structure provides static scaffolding with targeted hydration points.
 */
export default function App() {
  const { globalLanguages } = useGitHubRepos();

  return (
    <div className="min-h-screen bg-background p-layout-sm md:p-layout-md lg:p-layout-lg selection:bg-primary/20 selection:text-primary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[var(--spacing-sidebar-w)_1fr] gap-12 lg:gap-20 items-start">
          {/* Sidebar Section */}
          <div id="sidebar">
            <Sidebar globalLanguages={globalLanguages} />
          </div>

          {/* Main List Section */}
          <main className="flex-1 relative lg:border-l lg:border-border lg:pl-layout-md xl:pl-20 md:mt-0">
            <div id="repolist">
              <RepoListContainer />
            </div>
          </main>
        </div>

        {/* Static Footer */}
        <div className="mt-20 pt-8">
          <Footer />
        </div>
      </div>

      {/* Scroll Button Section */}
      <div id="scroll-top">
        <BackToTop />
      </div>
    </div>
  );
}
