import React from 'react';
import { Calendar } from 'lucide-react';

interface NewsItem {
  _id: string;
  title: string;
  date: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about the latest developments in rural communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2 text-gray-500 mb-3">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">Read more about this important update...</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;