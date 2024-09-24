import { IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonToast, useIonRouter } from '@ionic/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const RegisterUserScreen: React.FC = () => {
    const router = useIonRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firtsName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let additionalData: any = {
                name: firtsName,
                lastName: lastName,
                userType: 'DRIVER',
                phone: "",
                businessName: "",
                createdAt: ""
            };
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            additionalData.createdAt = new Date();
            await setDoc(doc(db, 'users', user.uid), {
              email: user.email,
              ...additionalData
            });
            setLoading(false);
            router.push('/home');
        } catch (err: any) {
            setLoading(false);
            console.log(err);
            setOpen(true);
            if(err.code == "auth/email-already-in-use") {
                setErrMsg('El usuario ingresado ya existe');
                return;
            }
            setErrMsg('Se ha producido un error en el registro');
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

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">First Name</label>
                            <input type="text" id="name" className="bg-gray-100 border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon" value={firtsName} onChange={e => setFirstName(e.target.value)} required />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-white dark:text-white">Last Name</label>
                            <input type="text" id="lastName" className="bg-gray-100 border border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>

                        <button type="submit" className='flex items-center justify-center w-full text-white bg-[#EF5AFF] rounded-lg py-2 hover:bg-gray-200 transition duration-200'>
                            Sign Up
                        </button>
                        <Link to="/login" className='text-white text-center'>You have account?, <span className='text-[#75D2FD] underline mb-[90px]'>Login Now</span></Link>
                    </form>

                    <div className='flex-grow' />

                    <img src="/assets/logo-drivers.svg" className='mb-[60px] w-[220px] h-[220px]' alt="" />
                </div>
                <IonLoading trigger="open-loading" isOpen={isLoading} />
                <IonToast
                    isOpen={isOpen}
                    message={errMsg}
                    duration={5000}
                    color={'danger'}
                ></IonToast>
            </IonContent>
        </IonPage>
    );
};

export default RegisterUserScreen;
