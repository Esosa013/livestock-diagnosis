// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveSearch: (searchData: DiagnosisSearch) => Promise<void>;
  recentSearches: DiagnosisSearch[];
};

export type DiagnosisSearch = {
  id: string;
  timestamp: number;
  selectedSymptoms: string[];
  diagnosisResult: any; // Adjust this type based on your diagnosis result structure
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<DiagnosisSearch[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchRecentSearches(user.uid);
      } else {
        setRecentSearches([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchRecentSearches = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists() && userDoc.data().recentSearches) {
        setRecentSearches(userDoc.data().recentSearches);
      }
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        recentSearches: []
      });
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await fetchRecentSearches(userCredential.user.uid);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setRecentSearches([]);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const saveSearch = async (searchData: DiagnosisSearch) => {
    if (!user) return;

    try {
      // Get current user data
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        let currentSearches = userDoc.data().recentSearches || [];
        
        // Add new search
        currentSearches = [searchData, ...currentSearches].slice(0, 10);
        
        // Update in Firestore
        await updateDoc(userRef, {
          recentSearches: currentSearches
        });
        
        // Update local state
        setRecentSearches(currentSearches);
      }
    } catch (error) {
      console.error("Error saving search:", error);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    saveSearch,
    recentSearches
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};