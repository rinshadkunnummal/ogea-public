import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StatsCard from '../../Components/StatsCard/StatsCard';

const StatsSection = () => {
  const { stats } = useOutletContext();
  
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">Statistics</h1>
      <p className="text-gray-600 mb-4">Overview of all articles and categories.</p>
      <nav className="stats grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatsCard title={"Total Contents"} value={stats.loading ? "..." : stats.totalArticles.toString()} />
        <StatsCard title={"Articles"} value={stats.loading ? "..." : stats.articles.toString()} />
        <StatsCard title={"Stories"} value={stats.loading ? "..." : stats.stories.toString()} />
        <StatsCard title={"Poems"} value={stats.loading ? "..." : stats.poems.toString()} />
        <StatsCard title={"Essays"} value={stats.loading ? "..." : stats.essays.toString()} />
        <StatsCard title={"Seminars"} value={stats.loading ? "..." : stats.seminars.toString()} />
        <StatsCard title={"Reviews"} value={stats.loading ? "..." : stats.reviews.toString()} />
        <StatsCard title={"Letters"} value={stats.loading ? "..." : stats.letters.toString()} />
      </nav>
    </div>
  );
};

export default StatsSection;
