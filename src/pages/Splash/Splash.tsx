import { IonContent, IonPage } from '@ionic/react';

const SplashScreen: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="bg-gradient-to-b from-bg-1 to-bg-2 h-full relative">
                    {/* Logo centrado en X y Y */}
                    <div className="h-full flex items-center justify-center">
                        <img
                            src="/assets/logo-white.svg"
                            className="w-[130px] h-[130px] animate-scale-up"
                        />
                    </div>
                    
                    {/* Logo alineado en la parte inferior */}
                    <img 
                        src="/assets/logo-drivers.svg" 
                        className="w-[230px] h-[230px] absolute bottom-10 left-1/2 transform -translate-x-1/2" 
                        alt="" 
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SplashScreen;
