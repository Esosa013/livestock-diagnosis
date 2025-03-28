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