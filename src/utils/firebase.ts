import { doc, getDoc, setDoc } from 'firebase/firestore';
import {  auth, db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { IPodcast, IPodcastEpisode } from '../interfaces/podcast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const checkUserLoggedIn = (): Promise<any> => {
  return new Promise((resolve: any, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data()
        resolve({
          ...user,
          ...userData
        });
      } else {
        resolve(false);
      }
    }, (error) => {
      reject(error);
    });
  });
};

export const signOutUser = ():Promise<any> => {
  return new Promise((resolve: any, reject) => {
    signOut(auth)
    .then(() => {
      resolve(true);
    })
    .catch(() => {
      reject(false);
    })
  });
}

export const loginOrRegisterWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const additionalData = {
        name: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        userType: 'CUSTOMER',
        phone: user.phoneNumber || '',
        businessName: null,
        createdAt: new Date(),
      };

      await setDoc(userRef, {
        email: user.email,
        ...additionalData,
      });

      console.log('Usuario registrado con éxito');
    } else {
      console.log('El usuario ya está registrado, realizando login');
    }

    return { success: true, user };
  } catch (error: any) {
    console.error('Error al iniciar sesión o registrar usuario:', error);
    return { ok: false, error: error.message };
  }
};

export const getMusic = async () => {
  try {
    const musicRef = collection(db, 'songs');
    
    const musicSnapshot = await getDocs(musicRef);

    const music = musicSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      success: true,
      music
    };
  } catch (error: any) {
    console.error('Error al obtener lista de reproduccion:', error);
    return { success: false, error: error.message };
  }
};

export const getOfferts = async () => {
  try {
    const offertsRef = collection(db, 'offerts');
    
    const offertsSnapshot = await getDocs(offertsRef);

    const offerts = offertsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      success: true,
      offerts
    };
  } catch (error: any) {
    console.error('Error al obtener offerts:', error);
    return { success: false, error: error.message };
  }
};

export const getFun = async () => {
  try {
    const funRef = collection(db, 'fun');
    
    const funSnapshot = await getDocs(funRef);

    const funs = funSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      success: true,
      funs
    };
  } catch (error: any) {
    console.error('Error al obtener funs:', error);
    return { success: false, error: error.message };
  }
};

export const listPodcasts = async (): Promise<{ success: boolean; podcasts?: IPodcast[]; error?: string }> => {
  try {
    const podcastsRef = collection(db, 'podcasts');
    const podcastsSnapshot = await getDocs(podcastsRef);

    const podcasts = podcastsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as IPodcast[];

    return {
      success: true,
      podcasts
    };
  } catch (error: any) {
    console.error('Error al obtener la lista de podcasts:', error);
    return { success: false, error: error.message };
  }
};

export const listPodcastEpisodes = async (podcastId: string): Promise<{ success: boolean; episodes?: IPodcastEpisode[]; error?: string }> => {
  try {
    const podcastRef = doc(db, 'podcasts', podcastId);
    const podcastDoc = await getDoc(podcastRef);

    if (!podcastDoc.exists()) {
      return { success: false, error: 'El podcast no existe' };
    }

    const podcastData = podcastDoc.data() as IPodcast;
    const episodes = podcastData.episodes || [];

    return {
      success: true,
      episodes
    };
  } catch (error: any) {
    console.error('Error al obtener los episodios del podcast:', error);
    return { success: false, error: error.message };
  }
};

export const getSettingsList = async () => {
  try {
    const settingsCollection = collection(db, 'general_settings');
    const querySnapshot = await getDocs(settingsCollection);

    if (querySnapshot.empty) {
      throw new Error('No se encontró ningún documento de configuración');
    }

    const settingsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: settingsList };
  } catch (error: any) {
    console.error('Error al obtener configuraciones:', error);
    return { success: false, error: error.message };
  }
};

export const getAds = async () => {
  try {
    const adsCollection = collection(db, 'ads');
    const querySnapshot = await getDocs(adsCollection);

    const ads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      ok: true,
      data: ads
    }
  } catch(err: any) {
    console.error('Error al obtener configuraciones:', err);
    return { success: false, error: err.message };
  }
}