import { db, storage } from '../firebaseConfig';
import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addEvaluation = async (evaluationData) => {
  try {
    // Subir fotos primero
    const photoUrls = [];
    for (const photo of evaluationData.photos) {
      const storageRef = ref(storage, `evaluations/${Date.now()}_${Math.random().toString(36).substring(2)}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      photoUrls.push(url);
    }

    // Guardar evaluación con URLs de fotos
    const evaluationToSave = {
      ...evaluationData,
      photos: photoUrls,
      date: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'evaluations'), evaluationToSave);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getEvaluationsByBranch = async (branchId) => {
  try {
    const q = query(
      collection(db, 'evaluations'),
      where('branchId', '==', branchId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};