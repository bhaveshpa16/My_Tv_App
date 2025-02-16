import React from 'react';
import { X, Clock, Star, Tv, Tag } from 'lucide-react';

export function ShowDetail({ show, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={show.image?.original || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80'}
            alt={show.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 p-2 rounded-full text-white hover:bg-black/90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{show.name}</h2>
            {show.rating?.average && (
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 mr-1" />
                {show.rating.average}
              </div>
            )}
          </div>

          {show.network && (
            <div className="flex items-center text-gray-600 mb-2">
              <Tv className="w-4 h-4 mr-2" />
              {show.network.name}
            </div>
          )}

          {show.schedule && (
            <div className="flex items-center text-gray-600 mb-4">
              <Clock className="w-4 h-4 mr-2" />
              {show.schedule.time} on {show.schedule.days.join(', ')}
            </div>
          )}

          {show.genres?.length > 0 && (
            <div className="flex gap-2 mb-4">
              {show.genres.map((genre) => (
                <div key={genre} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {genre}
                </div>
              ))}
            </div>
          )}

          <div 
            className="text-gray-700 prose"
            dangerouslySetInnerHTML={{ __html: show.summary || 'No description available.' }}
          />
        </div>
      </div>
    </div>
  );
}