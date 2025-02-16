import React from 'react';
import { Clock, Star, Tv } from 'lucide-react';

export function ShowCard({ schedule, onClick }) {
  const { show, airtime } = schedule;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48">
        <img
          src={show.image?.medium || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80'}
          alt={show.name}
          className="w-full h-full object-cover"
        />
        {show.rating?.average && (
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-sm flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {show.rating.average}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{show.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>{airtime}</span>
        </div>
        {show.network && (
          <div className="flex items-center text-gray-600 text-sm">
            <Tv className="w-4 h-4 mr-1" />
            <span>{show.network.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}