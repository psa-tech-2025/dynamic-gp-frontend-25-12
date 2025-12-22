import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // REGISTER
  async register(name: string, email: string, mobile: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);

    await this.firestore.collection('gp-users').doc(cred.user?.uid).set({
      uid: cred.user?.uid,
      name,
      email,
      mobile,
      role: 'citizen',
      createdAt: new Date()
    });

    return cred;
  }

  // LOGIN
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // LOGOUT
  logout() {
    return this.afAuth.signOut();
  }

  // STORAGE PATH: gp/
  uploadToGpFolder(file: File, uid: string) {
    const path = `gp/${uid}/${file.name}`;
    return this.storage.upload(path, file);
  }
    // 🔐 Send email verification
  async sendEmailVerification() {
    const user = await this.afAuth.currentUser;
    if (user && !user.emailVerified) {
      return user.sendEmailVerification();
    }
  }

  // 🔄 Forgot password
  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // 👀 Check email verification status
  getCurrentUser() {
    return this.afAuth.authState;
  }

  // logout() {
  //   return this.afAuth.signOut();
  // }
}
