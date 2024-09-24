import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#181818] p-6 mt-2">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <Link to="/payment" className="text-white focus:outline-none">
          <img src="/assets/menu/actividad.svg" className='w-[27px]' alt="" />
        </Link>
        <Link to='/podcasts' className="text-white focus:outline-none">
        <img src="/assets/menu/comision_viajes.svg" className='w-[27px]' alt="" />
        </Link>
        <Link to='/home' className="p-4 -mt-8 focus:outline-none">
        <img src="/assets/menu/home_btn.svg" className='w-[70px]' alt="" />
          
        </Link>
        <button className="text-white focus:outline-none">
        <img src="/assets/menu/anuncios.svg" className='w-[25px]' alt="" />
          
        </button>
        <Link to='/points' className="text-white focus:outline-none">
        <img src="/assets/menu/ganancias.svg" className='w-[28px]' alt="" />
          
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;