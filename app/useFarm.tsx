import { ReactNode, useState, useCallback, useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FaCircle } from "react-icons/fa";
import { AnimalInfo, VitalSigns, EnvironmentalFactors, PhysicalExam } from '@/types';

export const useFarm = () => {
  
    const symptoms = [
  { id: 'fever', name: 'Fever', category: 'general', description: 'Elevated body temperature above normal range' },
  { id: 'lethargy', name: 'Lethargy', category: 'general', description: 'Unusual tiredness or lack of energy' },
  { id: 'loss_appetite', name: 'Loss of Appetite', category: 'general', description: 'Reduced or no interest in food' },
  { id: 'coughing', name: 'Coughing', category: 'respiratory', description: 'Persistent coughing or respiratory distress' },
  { id: 'difficulty_breathing', name: 'Difficulty Breathing', category: 'respiratory', description: 'Labored or rapid breathing' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', description: 'Loose or watery stools' },
  { id: 'vomiting', name: 'Vomiting', category: 'digestive', description: 'Forceful ejection of stomach contents' },
  { id: 'lameness', name: 'Lameness', category: 'musculoskeletal', description: 'Difficulty walking or favoring one limb' },
  { id: 'swelling', name: 'Swelling', category: 'musculoskeletal', description: 'Visible swelling in joints or limbs' },
];

const animalTypes = ['Cattle', 'Sheep', 'Goat', 'Pig', 'Horse', 'Chicken', 'Other'];
const ageGroups = ['Newborn (0-1 month)', 'Young (1-6 months)', 'Juvenile (6-12 months)', 'Adult (1-5 years)', 'Senior (5+ years)'];
const sexOptions = ['Male', 'Female', 'Castrated Male'];
const breedTypes = ['Dairy', 'Beef', 'Dual Purpose', 'Breeding', 'Commercial'];



  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailedSymptoms, setShowDetailedSymptoms] = useState(false);
  const [activeTab, setActiveTab] = useState('symptoms');
     const [animalInfo, setAnimalInfo] = useState<AnimalInfo>({
        type: '',
        age: '',
        sex: '',
        breed: '',
        weight: '',
        // id: ''
      });
    
      const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
        temperature: '',
        heartRate: '',
        respiratoryRate: '',
        bodyCondition: ''
      });
    
      const [environmentalFactors, setEnvironmentalFactors] = useState<EnvironmentalFactors>({
        housing: '',
        feeding: '',
        recentChanges: '',
        otherAnimalsAffected: false,
        location: '',
        season: ''
      });
    
      const [physicalExam, setPhysicalExam] = useState<PhysicalExam>({
        eyeCondition: '',
        mouthCondition: '',
        skinCondition: '',
        lymphNodes: '',
        abdomen: '',
        udderCondition: ''
      });
    
      const severityIcons: Record<"mild" | "moderate" | "severe", ReactNode> = {
        mild: (
          <Tooltip>
            <TooltipTrigger>
              <FaCircle className="text-green-500" />
            </TooltipTrigger>
            <TooltipContent>Mild Severity</TooltipContent>
          </Tooltip>
        ),
        moderate: (
          <Tooltip>
            <TooltipTrigger>
              <FaCircle className="text-yellow-500" />
            </TooltipTrigger>
            <TooltipContent>Moderate Severity</TooltipContent>
          </Tooltip>
        ),
        severe: (
          <Tooltip>
            <TooltipTrigger>
              <FaCircle className="text-red-500" />
            </TooltipTrigger>
            <TooltipContent>Severe Severity</TooltipContent>
          </Tooltip>
        ),
      };
    
      // Mock diagnosis function
      const diagnosis = useMemo(() => {
        if (selectedSymptoms.length === 0) return null;
        
        // Mock diagnosis result
        return {
          disease: {
            name: 'Bovine Respiratory Disease',
            description: 'A common respiratory condition affecting cattle, often caused by viral or bacterial infections.',
            severity: 'moderate' as const,
            recommendations: [
              'Isolate affected animals immediately',
              'Consult veterinarian for antibiotic treatment',
              'Ensure proper ventilation in housing',
              'Monitor temperature and respiratory rate daily'
            ],
            imageUrl: '/api/placeholder/300/200'
          },
          matchPercentage: 78.5,
          alternativeDiseases: []
        };
      }, [selectedSymptoms]);
    
      const handleSymptomToggle = useCallback((symptomId: string, checked: boolean) => {
        setSelectedSymptoms(prev => 
          checked 
            ? [...prev, symptomId] 
            : prev.filter(id => id !== symptomId)
        );
      }, []);
    
      const clearAllData = () => {
        setSelectedSymptoms([]);
        setSearchTerm('');
        setAnimalInfo({ type: '', age: '', sex: '', breed: '', weight: '', id: '' });
        setVitalSigns({ temperature: '', heartRate: '', respiratoryRate: '', bodyCondition: '' });
        setEnvironmentalFactors({ housing: '', feeding: '', recentChanges: '', otherAnimalsAffected: false, location: '', season: '' });
        setPhysicalExam({ eyeCondition: '', mouthCondition: '', skinCondition: '', lymphNodes: '', abdomen: '', udderCondition: '' });
      };
    
      const filteredSymptoms = useMemo(() => 
        symptoms.filter(symptom =>
          symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]
      );
    
      const symptomsByCategory = useMemo(() => 
        filteredSymptoms.reduce((acc, symptom) => {
          if (!acc[symptom.category]) {
            acc[symptom.category] = [];
          }
          acc[symptom.category].push(symptom);
          return acc;
        }, {} as Record<string, typeof symptoms>)
      , [filteredSymptoms]);
    
      const getCompletionPercentage = () => {
        let totalFields = 0;
        let completedFields = 0;
    
        // Count animal info fields
        Object.values(animalInfo).forEach(value => {
          totalFields++;
          if (value.trim()) completedFields++;
        });
    
        // Count vital signs fields
        Object.values(vitalSigns).forEach(value => {
          totalFields++;
          if (value.trim()) completedFields++;
        });
    
        // Count symptoms
        totalFields += symptoms.length;
        completedFields += selectedSymptoms.length;
    
        return (completedFields / totalFields) * 100;
      };

      return {
        animalInfo,
        setAnimalInfo,
        vitalSigns,
        setVitalSigns,
        environmentalFactors,
        setEnvironmentalFactors,
        physicalExam,
        setPhysicalExam,
        severityIcons,
        diagnosis,
        selectedSymptoms,
        setSelectedSymptoms,
        handleSymptomToggle,
        searchTerm,
        setSearchTerm,
        filteredSymptoms,
        symptomsByCategory,
        clearAllData,
        getCompletionPercentage,
        activeTab,
        setActiveTab,
        ageGroups,
        animalTypes,
        sexOptions,
        breedTypes,
        showDetailedSymptoms,
        setShowDetailedSymptoms,
        isLoading,
      };
}