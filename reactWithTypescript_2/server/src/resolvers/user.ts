import { generateAccessToken } from "./../jwt";
import { hash, compare } from "bcrypt";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { db } from "../firebase";
import { Product, Resolver } from "./types";

const userResolver: Resolver = {
  Query: {
    login: async (parent, { email, passWord }) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);

      let token;
      const res: DocumentData[] = [];

      snapshot.forEach((doc) => {
        const d = doc.data();
        res.push({
          id: doc.id,
          ...d,
        });
      });

      for (const d of res) {
        if (await compare(passWord, d.passWord)) {
          token = generateAccessToken(d.id);
        }
      }
      console.log("token", token);
    },
  },
  Mutation: {
    addUser: async (parent, { email, passWord, nickName }) => {
      const newUser = {
        email,
        passWord: await hash(passWord, 5),
        nickName,
        createdAt: serverTimestamp(),
      };
      const result = await addDoc(collection(db, "user", email), newUser);
      return true;
    },
  },
};

export default userResolver;

//
