import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { generateFullReport } from '../utils/pdfUtils';

export const generateBranchReport = async (branchId) => {
  try {
    const branch = await getBranchById(branchId);
    const evaluations = await getEvaluationsByBranch(branchId);
    const questions = await getQuestions();
    
    if (evaluations.length > 0) {
      generateFullReport(evaluations[0], branch, questions);
    }
  } catch (error) {
    throw error;
  }
};

const getQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};