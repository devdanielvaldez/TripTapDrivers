import { Link, Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './index.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import SplashScreen from './pages/Splash/Splash';
import EmailLoginScreen from './pages/RegisterUser/EmailLogin';
import RegisterUserScreen from './pages/RegisterUser/RegisterUser';
import { User } from 'lucide-react';
import AppHomeScreen from './pages/Home/Home';
import NavigationBar from './components/NavigationBar';

setupIonicReact();

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <IonPage>
          <IonContent>
              <div className="bg-[#181818] text-white pt-[70px] pl-10 pr-10 pb-[10px]">
                  <header className="flex justify-between items-center">
                      <div>
                          <img src="/assets/logo_2.svg" className='w-10 h-10' alt="" />
                      </div>
                      <Link to="" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center">
                          <User size={20} className="text-gray-400" />
                      </Link>
                  </header>
              </div>
              {children}
              {/* Puedes mostrar un mensaje de error si la validación falla */}
              <NavigationBar />
          </IonContent>
      </IonPage>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/splash">
          <SplashScreen />
        </Route>
        <Route exact path="/login">
          <EmailLoginScreen />
        </Route>
        <Route exact path="/register">
          <RegisterUserScreen />
        </Route>
        <Route exact path="/home">
          <MainLayout>
            <AppHomeScreen />
          </MainLayout>
        </Route>


        <Route exact path="/">
          <Redirect to="/splash" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
