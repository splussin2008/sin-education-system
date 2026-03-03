import { collection, getDocs, query, where, QueryConstraint } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Material, Grade, Subject, Level } from '../types/material';
import { mockMaterials } from '../data/mockMaterials';

// Collection name
const COLLECTION_NAME = 'materials';

/**
 * [準備段階] 今はダミーデータを返しますが、将来的にFirestoreからデータを取得します
 */
export async function getMaterialsFromFirestore(
    grade?: Grade | '',
    subject?: Subject | '',
    level?: Level | '',
    keyword?: string
): Promise<Material[]> {
    // TODO: firebaseConfigが設定され、Firestoreにデータが入ったらこちらのコメントアウトを外す
    /*
    try {
      const materialsRef = collection(db, COLLECTION_NAME);
      let q = query(materialsRef);
      const constraints: QueryConstraint[] = [];
  
      if (grade) constraints.push(where('grade', '==', grade));
      if (subject) constraints.push(where('subject', '==', subject));
      if (level) constraints.push(where('level', '==', level));
      
      if (constraints.length > 0) {
        q = query(materialsRef, ...constraints);
      }
  
      const querySnapshot = await getDocs(q);
      const materials: Material[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        materials.push({
          id: doc.id,
          title: data.title,
          grade: data.grade,
          subject: data.subject,
          unit: data.unit,
          level: data.level,
          pdfUrl: data.pdfUrl,
        });
      });
  
      // クライアント側でキーワード絞り込み（Firestoreの制限回避）
      if (keyword) {
        return materials.filter(m => m.unit.includes(keyword) || m.title.includes(keyword));
      }
      
      return materials;
    } catch (error) {
      console.error("Error fetching materials from Firestore: ", error);
      return [];
    }
    */

    // フォールバック（現在はダミーデータを返す）
    console.log('Firebase integration is ready. Using mock data for now.');
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = [...mockMaterials];
            if (grade) results = results.filter(m => m.grade === grade);
            if (subject) results = results.filter(m => m.subject === subject);
            if (level) results = results.filter(m => m.level === level);
            if (keyword) results = results.filter(m => m.unit.includes(keyword) || m.title.includes(keyword));
            resolve(results);
        }, 500); // 疑似的なネットワーク遅延
    });
}
