"use client";

import { ReactNode, useState, useCallback, useMemo } from 'react';
import { Search, AlertTriangle, Stethoscope, X, RefreshCw, HelpCircle } from 'lucide-react';
import { symptoms } from '@/data/symptoms';
import { diagnoseDisease } from '@/lib/diagnosis';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { Symptom } from '@/types';



export default function LivestockDiagnosisApp() {
  // Severity Icons with Tooltips
  const severityIcons: Record<"mild" | "moderate" | "severe", ReactNode> = {
    mild: (
      <Tooltip>
        <TooltipTrigger>
          <FaCircle className="text-green-400" />
        </TooltipTrigger>
        <TooltipContent>Mild Severity</TooltipContent>
      </Tooltip>
    ),
    moderate: (
      <Tooltip>
        <TooltipTrigger>
          <FaCircle className="text-yellow-400" />
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

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailedSymptoms, setShowDetailedSymptoms] = useState(false);

  const diagnosis = useMemo(() => {
    setIsLoading(true);
    const result = diagnoseDisease(selectedSymptoms);
    setTimeout(() => setIsLoading(false), 500);
    return result;
  }, [selectedSymptoms]);

  const handleSymptomToggle = useCallback((symptomId: string, checked: boolean) => {
    setSelectedSymptoms(prev => 
      checked 
        ? [...prev, symptomId] 
        : prev.filter(id => id !== symptomId)
    );
  }, []);

  const clearAllSymptoms = () => {
    setSelectedSymptoms([]);
    setSearchTerm('');
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
    }, {} as Record<string, Symptom[]>)
  , [filteredSymptoms]);

  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-8"
      >
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 relative">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2"
            >
              <Stethoscope className="h-24 w-24 text-emerald-500" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-emerald-300 mb-4 tracking-tight">
              Livestock Health Diagnostic System
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive symptom analysis for accurate livestock disease identification
            </p>
          </header>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10 bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-emerald-500/30 shadow-2xl"
          >
            <div className="relative mb-4 flex items-center space-x-2">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-emerald-500" />
                <Input
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-emerald-500/30 text-gray-100 placeholder-emerald-500/50 focus:ring-emerald-500"
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={clearAllSymptoms}
                    className="text-emerald-500 hover:bg-emerald-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear All Symptoms</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setShowDetailedSymptoms(!showDetailedSymptoms)}
                    className="text-emerald-500 hover:bg-emerald-500/10"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show Detailed Symptom Information</TooltipContent>
              </Tooltip>
            </div>
            <Progress 
              value={(selectedSymptoms.length / symptoms.length) * 100} 
              className="h-2 bg-gray-700"
            />
            <p className="text-sm text-emerald-300 mt-2 text-center">
              {selectedSymptoms.length} of {symptoms.length} symptoms selected
            </p>
          </motion.div>

          {/* Symptoms Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.entries(symptomsByCategory).map(([category, categorySymptoms]) => (
              <Card 
                key={category} 
                className="bg-gray-800/50 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-6 shadow-2xl"
              >
                <h2 className="text-xl font-semibold capitalize mb-4 text-emerald-400">
                  {category} Symptoms
                </h2>
                <div className="space-y-3">
                  {categorySymptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={(checked) => handleSymptomToggle(symptom.id, !!checked)}
                        className="border-emerald-500 data-[state=checked]:bg-emerald-500"
                      />
                      <label
                        htmlFor={symptom.id}
                        className="text-sm font-medium text-gray-300 hover:text-emerald-300 transition-colors flex items-center"
                      >
                        {symptom.name}
                        {showDetailedSymptoms && symptom.description && (
                          <Tooltip>
                            <TooltipTrigger>
                              <FaRegQuestionCircle className="ml-2 text-emerald-500" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              {symptom.description}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {selectedSymptoms.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                  </div>
                ) : diagnosis.disease ? (
                  <Card className="bg-gray-800/50 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-emerald-400 mb-4">
                          {diagnosis.disease.name}
                        </h2>
                        <p className="text-emerald-200 mb-4 text-sm">
                          Match Confidence: {diagnosis.matchPercentage.toFixed(1)}%
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-gray-300 mr-2">Severity:</p>
                          <div className="flex space-x-1">
                            {Object.keys(severityIcons).map((level) => (
                              <span 
                                key={level} 
                                className={diagnosis.disease?.severity === level ? "" : "opacity-10"}
                              >
                                {severityIcons[level as "mild" | "moderate" | "severe"]}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-6">{diagnosis.disease.description}</p>
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3 text-emerald-400">Recommendations:</h3>
                          <ul className="space-y-2 text-gray-300">
                            {diagnosis.disease.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-emerald-500 mr-2">▸</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          src={diagnosis.disease.imageUrl}
                          alt={diagnosis.disease.name}
                          className="w-64 h-64 object-cover rounded-xl border-4 border-emerald-500/30"
                        />
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Alert 
                    variant="destructive" 
                    className="bg-gray-800/50 backdrop-blur-lg border border-red-500/20 rounded-xl"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <AlertTitle className="text-red-400">No Definitive Diagnosis</AlertTitle>
                    <AlertDescription className="text-gray-300">
                      Based on the selected symptoms, we cannot provide a definitive diagnosis.
                      Please consult a veterinarian for professional medical advice.
                      {diagnosis.alternativeDiseases.length > 0 && (
                        <div className="mt-4">
                          <p className="font-semibold text-emerald-400 mb-2">
                            Possible conditions to discuss:
                          </p>
                          <ul className="space-y-1 text-gray-300">
                            {diagnosis.alternativeDiseases.map(disease => (
                              <li key={disease.id} className="flex items-start">
                                <span className="text-emerald-500 mr-2">▸</span>
                                {disease.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}