import { IonContent, IonLoading, IonPage, IonToast, useIonRouter } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebaseConfig';

const EmailLoginScreen: React.FC = () => {
    const router = useIonRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            setEmail('');
            setPassword('');
            setLoading(false);
        };
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            setEmail('');
            setPassword('');
            router.push('/home');
        } catch (err) {
            setLoading(false);
            console.log(err);
            setOpen(true);
            return;
        }
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <div className='bg-[#181818] h-full flex flex-col items-center pt-10'>
                    <img src="/assets/triptap.svg" className='w-[140px] h-[140px]' alt="triptap_logo" />
                    <h1 className='text-center text-xl ml-9 mr-9 font-light text-white'>Registraté para recibir beneficios únicos como conductor.</h1>
                    <form onSubmit={handleLogin} className='flex flex-col space-y-4 mt-6 w-64'>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
                            <input type="text" id="email" className="bg-gray-100 border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@domain.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <input type="password" id="password" className="bg-gray-100 border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className='flex items-center justify-center w-full text-white bg-[#EF5AFF] rounded-lg py-2 hover:bg-gray-200 transition duration-200'>
                            Sign in
                        </button>
                        <Link to="/register" className='text-white text-center'>Don't have account?, <span className='text-[#75D2FD] underline mb-[90px]'>Register Now</span></Link>
                    </form>

                    {/* <div className='flex flex-col space-y-4 mt-6'>
                        <label className='text-center text-white'>OR</label>
                        <button className='flex items-center justify-center w-64 bg-white text-black rounded-lg py-2 hover:bg-gray-200 transition duration-200'>
                            <img src="/assets/icons/google.png" alt="Google" className='w-5 h-5 mr-2' />
                            Sign up with Google
                        </button>

                        <button className='flex items-center justify-center w-64 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-500 transition duration-200'>
                            <img src="/assets/icons/facebook.png" alt="Facebook" className='w-5 h-5 mr-2' />
                            Sign up with Facebook
                        </button>
                    </div> */}

                    <div className='flex-grow' />

                    <img src="/assets/logo-drivers.svg" className='mb-[60px] w-[220px] h-[220px]' alt="" />
                </div>
                <IonLoading trigger="open-loading" isOpen={isLoading} />
                <IonToast
                    isOpen={isOpen}
                    message="Usuario y/o Contraseña incorrectos"
                    duration={5000}
                    color={'danger'}
                ></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default EmailLoginScreen;
