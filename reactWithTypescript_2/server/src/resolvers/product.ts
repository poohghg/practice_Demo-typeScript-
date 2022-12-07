import { Resolver } from "./types";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const PAGE_SIZE = 15;

const productResolver: Resolver = {
  Query: {
    products: async (parent, { cursor = "", showDeleted = false }) => {
      const products = collection(db, "products");
      const queryOptions = [orderBy("createdAt", "desc")];
      if (cursor) {
        const snapshot = await getDoc(doc(db, "products", cursor));
        queryOptions.push(startAfter(snapshot));
      }
      if (!showDeleted) queryOptions.unshift(where("createdAt", "!=", null));
      // 기본 쿼리
      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      // 서버에서 최시정보를 가져온다
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        }),
      );
      console.log(" DATA", data);
      return data;
    },
    product: async (parent, { id }) => {
      const snapshot = await getDoc(doc(db, "products", id));
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
  },
  Mutation: {},
};

export default productResolver;
