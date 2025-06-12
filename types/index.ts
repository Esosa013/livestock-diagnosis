export interface Symptom {
  id: string;
  name: string;
  category: 'general' | 'respiratory' | 'digestive' | 'neurological' | 'skin' | 'reproductive' | 'musculoskeletal' | 'behavioral' | 'mammary';
  description: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  imageUrl: string;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
}

export interface DiagnosisResult {
  disease: Disease | null;
  matchPercentage: number;
  alternativeDiseases: Disease[];
}

export interface AnimalInfo {
  type: string;
  age: string;
  sex: string;
  breed: string;
  weight: string;
  // id: string;
}

export interface VitalSigns {
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  bodyCondition: string;
}

export interface EnvironmentalFactors {
  housing: string;
  feeding: string;
  recentChanges: string;
  otherAnimalsAffected: boolean;
  location: string;
  season: string;
}

export interface PhysicalExam {
  eyeCondition: string;
  mouthCondition: string;
  skinCondition: string;
  lymphNodes: string;
  abdomen: string;
  udderCondition: string;
}