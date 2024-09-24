import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Viaje', image: '/assets/home/viaje.svg', route: 'payment' },
  { name: 'Envio', image: '/assets/home/envio.svg', route: 'podcasts' },
  { name: 'Encargo', image: '/assets/home/encargo.svg', route: 'funs' },
  { name: 'Reserva', image: '/assets/home/reserva.svg', route: 'news' },
];

const AppHomeScreen = () => {
  return (
    <div className="bg-[#181818] min-h-screen text-white pl-10 pr-10">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500"
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <h1 className='text-white font-medium mb-[30px]'>Sugerencias</h1>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <Link to={category.route}>
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
            </Link>
            <p className="text-sm text-center">
              {category.name.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word}
                  {i < category.name.split(' ').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppHomeScreen;