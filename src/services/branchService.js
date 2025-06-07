import { db } from '../firebaseConfig';
import { 
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';

export const addBranch = async (branchData) => {
  try {
    const docRef = await addDoc(collection(db, 'branches'), branchData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getBranches = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'branches'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const getBranchById = async (branchId) => {
  try {
    const q = query(collection(db, 'branches'), where('id', '==', branchId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]?.data();
  } catch (error) {
    throw error;
  }
};