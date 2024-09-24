import { ChevronDown, MapPin } from "lucide-react";

export default function TravelSearch() {
  return (
    <>
      <div className="absolute z-50 bottom-0 left-0 right-0 max-w-md mx-auto bg-[#181818] rounded-t-lg overflow-hidden shadow-lg">
        <div className="pl-4 pr-4 pt-4 flex items-center justify-between">
          <button className="flex items-center ml-3">
            <img src="/assets/icons/back.svg" className="w-[70px]" alt="" />
          </button>
          <div className="flex space-x-2">
            <button className="bg-gray-700 text-white px-3 py-1 rounded-lg flex items-center">
              <img src="/assets/icons/reloj.png" className="w-[15px] mr-[10px]" alt="" />
              Ahora
              <ChevronDown className="ml-1 h-4 w-4 text-purple-500" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-none border border-white rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              <input
                type="text"
                placeholder="Ubicación Actual"
                className="bg-transparent text-white placeholder-gray-400 flex-1"
              />
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-gray-500 mr-2"></div>
              <input
                type="text"
                placeholder="¿A dónde va el usuario?"
                className="bg-transparent text-white placeholder-gray-400 flex-1"
              />
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          {[1, 2].map((item) => (
            <div key={item} className="mb-4 last:mb-0 flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-gray-400" />
              <div>
                <h3 className="font-semibold">Hard Rock Hotel</h3>
                <p className="text-sm text-gray-400">
                  Av. Principal de Punta Cana, Punta Cana km 07, Punta Cana, Re...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
