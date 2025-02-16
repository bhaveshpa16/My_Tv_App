import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { ShowCard } from './components/ShowCard';
import { ShowDetail } from './components/ShowDetail';

function App() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/schedule');
        if (!response.ok) throw new Error('Failed to fetch schedule');
        const data = await response.json();
        setSchedule(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">TV Schedule</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schedule.map((item) => (
            <ShowCard
              key={item.id}
              schedule={item}
              onClick={() => setSelectedShow(item.show)}
            />
          ))}
        </div>
      </main>

      {selectedShow && (
        <ShowDetail
          show={selectedShow}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </div>
  );
}

export default App;