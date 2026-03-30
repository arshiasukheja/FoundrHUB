/* FoundrHUB — Main App Entry */

const App = () => {
  /* Intersection Observer for reveal animations */
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <main>
        <Hero />
        <FeaturedGrid />
        <FounderStory />
        <AnalyticsDashboard />
        <FooterCTA />
      </main>
    </React.Fragment>
  );
};

/* Mount */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
