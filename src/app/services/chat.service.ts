import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import type firebase from 'firebase';
let ts: firebase.firestore.Timestamp;

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  currentUser: User = null;
  
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged( user => {
      console.log('changed: ', user);
      this.currentUser = user;
    });
  }
  
  async signUp({email, password}) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email, password
      );
      
      console.log(credential);
      const uid = credential.user.uid;
      
      return this.afs.doc(
        `users/${uid}`
        ).set({uid, email: credential.user.email})
      }
      
      
      signIn({email, password}) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
      }
      
      signOut() {
        return this.afAuth.signOut();
      }
    }
    