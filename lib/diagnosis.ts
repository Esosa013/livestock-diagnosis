import { Disease, DiagnosisResult } from '@/types';
import { diseases } from '@/data/diseases';

export function diagnoseDisease(selectedSymptoms: string[]): DiagnosisResult {
  let bestMatch: Disease | null = null;
  let highestMatchPercentage = 0;
  const alternativeDiseases: Disease[] = [];

  diseases.forEach(disease => {
    const matchingSymptoms = disease.symptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );

    const matchPercentage = (matchingSymptoms.length / selectedSymptoms.length) * 100;

    if (matchPercentage > highestMatchPercentage) {
      if (bestMatch) {
        alternativeDiseases.push(bestMatch);
      }
      bestMatch = disease;
      highestMatchPercentage = matchPercentage;
    } else if (matchPercentage > 30) {
      alternativeDiseases.push(disease);
    }
  });

  return {
    disease: highestMatchPercentage >= 50 ? bestMatch : null,
    matchPercentage: highestMatchPercentage,
    alternativeDiseases: alternativeDiseases
      .sort((a, b) => b.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length - a.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length)
      .slice(0, 3)
  };
}