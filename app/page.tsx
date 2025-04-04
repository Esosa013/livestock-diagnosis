"use client";

import { ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { Search, AlertTriangle, Stethoscope, X, RefreshCw, HelpCircle, History, LogOut, User } from 'lucide-react';
import { symptoms } from '@/data/symptoms';
import { diagnoseDisease } from '@/lib/diagnosis';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { Symptom } from '@/types';
import { useAuth, DiagnosisSearch } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function LivestockDiagnosisApp() {
  const router = useRouter();
  const { user, signOut, saveSearch, recentSearches } = useAuth();
  
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

  // Save diagnosis to recent searches when a new diagnosis is made
  useEffect(() => {
    const saveCurrentSearch = async () => {
      if (user && selectedSymptoms.length > 0 && !isLoading) {
        const searchData: DiagnosisSearch = {
          id: uuidv4(),
          timestamp: Date.now(),
          selectedSymptoms,
          diagnosisResult: diagnosis
        };
        
        await saveSearch(searchData);
      }
    };
    
    if (!isLoading && selectedSymptoms.length > 0) {
      saveCurrentSearch();
    }
  }, [diagnosis, selectedSymptoms, user, isLoading, saveSearch]);

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

  const loadSavedSearch = (search: DiagnosisSearch) => {
    setSelectedSymptoms(search.selectedSymptoms);
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

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8"
      >
        <div className="container mx-auto max-w-6xl">
          <header className="flex justify-between items-center mb-12 relative">
            <div className="text-center flex-grow">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2"
              >
                <Stethoscope className="h-24 w-24 text-green-600" />
              </motion.div>
              <h1 className="text-4xl font-extrabold text-green-700 mb-4 tracking-tight">
                Livestock Health Diagnostic System
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive symptom analysis for accurate livestock disease identification
              </p>
            </div>
            
            {user ? (
              <div className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium text-green-700">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-600 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => router.push('/login')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Sign In
              </Button>
            )}
          </header>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10 bg-white rounded-xl p-6 border border-green-200 shadow-lg"
          >
            <div className="relative mb-4 flex items-center space-x-2">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                <Input
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-green-200 text-gray-800 placeholder-green-300 focus:ring-green-500"
                />
              </div>
              
              {user && recentSearches.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-green-600 hover:bg-green-50 border-green-200"
                        >
                          <History className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64 max-h-80 overflow-y-auto">
                        <div className="px-2 py-1.5 text-sm font-medium text-green-700">
                          Recent Searches
                        </div>
                        <DropdownMenuSeparator />
                        {recentSearches.map((search) => {
                          const diagnosisName = search.diagnosisResult.disease 
                            ? search.diagnosisResult.disease.name 
                            : "No definitive diagnosis";
                          
                          return (
                            <DropdownMenuItem 
                              key={search.id}
                              onClick={() => loadSavedSearch(search)}
                              className="cursor-pointer"
                            >
                              <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center w-full">
                                  <span className="font-medium">{diagnosisName}</span>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(search.timestamp), 'MM/dd/yy')}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 truncate">
                                  {search.selectedSymptoms.length} symptoms selected
                                </span>
                              </div>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>View Search History</TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={clearAllSymptoms}
                    className="text-green-600 hover:bg-green-50 border-green-200"
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
                    className="text-green-600 hover:bg-green-50 border-green-200"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show Detailed Symptom Information</TooltipContent>
              </Tooltip>
              </div>
            <Progress 
              value={(selectedSymptoms.length / symptoms.length) * 100} 
              className="h-2 bg-gray-100"
            />
            <p className="text-sm text-green-600 mt-2 text-center">
              {selectedSymptoms.length} of {symptoms.length} symptoms selected
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {Object.entries(symptomsByCategory).map(([category, categorySymptoms]) => (
              <Card 
                key={category} 
                className="bg-white border border-green-100 rounded-xl p-6 shadow-md"
              >
                <h2 className="text-xl font-semibold capitalize mb-4 text-green-700">
                  {category} Symptoms
                </h2>
                <div className="space-y-3">
                  {categorySymptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={(checked) => handleSymptomToggle(symptom.id, !!checked)}
                        className="border-green-400 data-[state=checked]:bg-green-600"
                      />
                      <label
                        htmlFor={symptom.id}
                        className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors flex items-center"
                      >
                        {symptom.name}
                        {showDetailedSymptoms && symptom.description && (
                          <Tooltip>
                            <TooltipTrigger>
                              <FaRegQuestionCircle className="ml-2 text-green-500" />
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
                    <RefreshCw className="h-8 w-8 text-green-600 animate-spin" />
                  </div>
                ) : diagnosis.disease ? (
                  <Card className="bg-white border border-green-100 rounded-xl p-8 shadow-md">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-green-700 mb-4">
                          {diagnosis.disease.name}
                        </h2>
                        <p className="text-green-600 mb-4 text-sm">
                          Match Confidence: {diagnosis.matchPercentage.toFixed(1)}%
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex space-x-1">
                            {Object.keys(severityIcons).map((level) => (
                              <span 
                                key={level} 
                                className={diagnosis.disease?.severity === level ? "" : "opacity-20"}
                              >
                                {severityIcons[level as "mild" | "moderate" | "severe"]}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-6">{diagnosis.disease.description}</p>
                        <div className="mb-6">
                          <h3 className="font-semibold mb-3 text-green-700">Recommendations:</h3>
                          <ul className="space-y-2 text-gray-700">
                            {diagnosis.disease.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-600 mr-2">▸</span>
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
                          className="w-64 h-64 object-cover rounded-xl border-4 border-green-100"
                        />
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Alert 
                    variant="destructive" 
                    className="bg-white border border-red-200 rounded-xl"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <AlertTitle className="text-red-600">No Definitive Diagnosis</AlertTitle>
                    <AlertDescription className="text-gray-700">
                      Based on the selected symptoms, we cannot provide a definitive diagnosis.
                      Please consult a veterinarian for professional medical advice.
                      {diagnosis.alternativeDiseases.length > 0 && (
                        <div className="mt-4">
                          <p className="font-semibold text-green-700 mb-2">
                            Possible conditions to discuss:
                          </p>
                          <ul className="space-y-1 text-gray-700">
                            {diagnosis.alternativeDiseases.map(disease => (
                              <li key={disease.id} className="flex items-start">
                                <span className="text-green-600 mr-2">▸</span>
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