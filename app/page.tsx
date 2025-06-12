"use client";

import { ReactNode, useState, useCallback, useMemo, useEffect, use } from 'react';
import { Search, AlertTriangle, Stethoscope, X, RefreshCw, HelpCircle, History, LogOut, User, Heart, Thermometer, Activity, Calendar, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useFarm } from './useFarm';

 
export default function Home() {
  const {animalInfo,
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
        ageGroups,
        animalTypes,
        sexOptions,
        breedTypes,
        showDetailedSymptoms,
        setShowDetailedSymptoms,
        isLoading,
        setActiveTab,} = useFarm();
  return (
    <TooltipProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 text-gray-800 p-4 sm:p-8"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
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
                Advanced Livestock Diagnosis System
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive multi-criteria analysis for accurate livestock disease identification
              </p>
            </div>
          </header>

          {/* Progress Overview */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-white rounded-xl p-6 border border-green-200 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-700">Diagnostic Progress</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllData}
                className="text-red-600 hover:bg-red-50 border-red-200"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            <Progress 
              value={getCompletionPercentage()} 
              className="h-3 bg-gray-100"
            />
            <p className="text-sm text-green-600 mt-2">
              {getCompletionPercentage().toFixed(1)}% Complete - Fill in more details for better diagnosis accuracy
            </p>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-white border border-green-200 rounded-lg">
              <TabsTrigger value="animal" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Animal Info
              </TabsTrigger>
              <TabsTrigger value="vitals" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Vital Signs
              </TabsTrigger>
              <TabsTrigger value="symptoms" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Symptoms
              </TabsTrigger>
              <TabsTrigger value="physical" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Physical Exam
              </TabsTrigger>
              <TabsTrigger value="environment" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Environment
              </TabsTrigger>
            </TabsList>

            {/* Animal Information Tab */}
            <TabsContent value="animal">
              <Card className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-green-700">Animal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="animal-type">Animal Type *</Label>
                    <Select value={animalInfo.type} onValueChange={(value) => setAnimalInfo(prev => ({...prev, type: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {animalTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="age-group">Age Group *</Label>
                    <Select value={animalInfo.age} onValueChange={(value) => setAnimalInfo(prev => ({...prev, age: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageGroups.map(age => (
                          <SelectItem key={age} value={age}>{age}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={animalInfo.sex} onValueChange={(value) => setAnimalInfo(prev => ({...prev, sex: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        {sexOptions.map(sex => (
                          <SelectItem key={sex} value={sex}>{sex}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="breed-type">Breed Type</Label>
                    <Select value={animalInfo.breed} onValueChange={(value) => setAnimalInfo(prev => ({...prev, breed: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select breed type" />
                      </SelectTrigger>
                      <SelectContent>
                        {breedTypes.map(breed => (
                          <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={animalInfo.weight}
                      onChange={(e) => setAnimalInfo(prev => ({...prev, weight: e.target.value}))}
                    />
                  </div>

                  {/* <div>
                    <Label htmlFor="animal-id">Animal ID/Tag</Label>
                    <Input
                      id="animal-id"
                      placeholder="Enter animal ID"
                      value={animalInfo.id}
                      onChange={(e) => setAnimalInfo(prev => ({...prev, id: e.target.value}))}
                    />
                  </div> */}
                </div>
              </Card>
            </TabsContent>

            {/* Vital Signs Tab */}
            <TabsContent value="vitals">
              <Card className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-green-700 flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Vital Signs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="temperature">Body Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="Normal: 38.5-39.5°C for cattle"
                      value={vitalSigns.temperature}
                      onChange={(e) => setVitalSigns(prev => ({...prev, temperature: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
                    <Input
                      id="heart-rate"
                      type="number"
                      placeholder="Normal: 60-80 bpm for cattle"
                      value={vitalSigns.heartRate}
                      onChange={(e) => setVitalSigns(prev => ({...prev, heartRate: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="respiratory-rate">Respiratory Rate (breaths/min)</Label>
                    <Input
                      id="respiratory-rate"
                      type="number"
                      placeholder="Normal: 20-30 for cattle"
                      value={vitalSigns.respiratoryRate}
                      onChange={(e) => setVitalSigns(prev => ({...prev, respiratoryRate: e.target.value}))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="body-condition">Body Condition Score (1-5)</Label>
                    <Select value={vitalSigns.bodyCondition} onValueChange={(value) => setVitalSigns(prev => ({...prev, bodyCondition: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select body condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Very Thin</SelectItem>
                        <SelectItem value="2">2 - Thin</SelectItem>
                        <SelectItem value="3">3 - Average</SelectItem>
                        <SelectItem value="4">4 - Good</SelectItem>
                        <SelectItem value="5">5 - Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Symptoms Tab */}
            <TabsContent value="symptoms">
              <div className="space-y-6">
                <Card className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                  <div className="relative mb-4 flex items-center space-x-2">
                    <div className="flex-grow relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                      <Input
                        placeholder="Search symptoms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-50 border-green-200"
                      />
                    </div>
                    
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
                  <p className="text-sm text-green-600 mb-4">
                    {selectedSymptoms.length} symptoms selected
                  </p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(symptomsByCategory).map(([category, categorySymptoms]) => (
                    <Card key={category} className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                      <h3 className="text-xl font-semibold capitalize mb-4 text-green-700">
                        {category} Symptoms
                      </h3>
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
                              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors flex items-center cursor-pointer"
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
              </div>
            </TabsContent>

            {/* Physical Examination Tab */}
            <TabsContent value="physical">
              <Card className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-green-700">Physical Examination Findings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eye-condition">Eye Condition</Label>
                    <Select value={physicalExam.eyeCondition} onValueChange={(value) => setPhysicalExam(prev => ({...prev, eyeCondition: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select eye condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal - Clear and bright</SelectItem>
                        <SelectItem value="discharge">Discharge present</SelectItem>
                        <SelectItem value="red">Red/inflamed</SelectItem>
                        <SelectItem value="cloudy">Cloudy</SelectItem>
                        <SelectItem value="sunken">Sunken (dehydration)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="mouth-condition">Mouth/Gum Condition</Label>
                    <Select value={physicalExam.mouthCondition} onValueChange={(value) => setPhysicalExam(prev => ({...prev, mouthCondition: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mouth condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal - Pink and moist</SelectItem>
                        <SelectItem value="pale">Pale gums</SelectItem>
                        <SelectItem value="dry">Dry mouth</SelectItem>
                        <SelectItem value="lesions">Lesions/sores present</SelectItem>
                        <SelectItem value="excessive-saliva">Excessive salivation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skin-condition">Skin Condition</Label>
                    <Select value={physicalExam.skinCondition} onValueChange={(value) => setPhysicalExam(prev => ({...prev, skinCondition: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skin condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="rash">Rash/irritation</SelectItem>
                        <SelectItem value="lesions">Lesions/wounds</SelectItem>
                        <SelectItem value="hair-loss">Hair loss</SelectItem>
                        <SelectItem value="parasites">External parasites</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="lymph-nodes">Lymph Nodes</Label>
                    <Select value={physicalExam.lymphNodes} onValueChange={(value) => setPhysicalExam(prev => ({...prev, lymphNodes: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lymph node condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal size</SelectItem>
                        <SelectItem value="enlarged">Enlarged</SelectItem>
                        <SelectItem value="hard">Hard/firm</SelectItem>
                        <SelectItem value="painful">Painful to touch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="abdomen">Abdominal Condition</Label>
                    <Select value={physicalExam.abdomen} onValueChange={(value) => setPhysicalExam(prev => ({...prev, abdomen: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select abdominal condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="distended">Distended/bloated</SelectItem>
                        <SelectItem value="painful">Painful to touch</SelectItem>
                        <SelectItem value="rigid">Rigid</SelectItem>
                        <SelectItem value="decreased-sounds">Decreased gut sounds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="udder-condition">Udder Condition (if applicable)</Label>
                    <Select value={physicalExam.udderCondition} onValueChange={(value) => setPhysicalExam(prev => ({...prev, udderCondition: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select udder condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="swollen">Swollen</SelectItem>
                        <SelectItem value="hard">Hard/mastitis</SelectItem>
                        <SelectItem value="discharge">Abnormal discharge</SelectItem>
                        <SelectItem value="not-applicable">Not applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Environmental Factors Tab */}
            <TabsContent value="environment">
              <Card className="bg-white border border-green-100 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-6 text-green-700">Environmental & Management Factors</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="housing">Housing Conditions</Label>
                      <Select value={environmentalFactors.housing} onValueChange={(value) => setEnvironmentalFactors(prev => ({...prev, housing: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select housing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pasture">Pasture/outdoor</SelectItem>
                          <SelectItem value="barn">Barn/indoor</SelectItem>
                          <SelectItem value="feedlot">Feedlot</SelectItem>
                          <SelectItem value="mixed">Mixed indoor/outdoor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="feeding">Feeding System</Label>
                      <Select value={environmentalFactors.feeding} onValueChange={(value) => setEnvironmentalFactors(prev => ({...prev, feeding: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select feeding system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grazing">Grazing only</SelectItem>
                          <SelectItem value="hay">Hay/silage</SelectItem>
                          <SelectItem value="grain">Grain feeding</SelectItem>
                          <SelectItem value="mixed">Mixed ration</SelectItem>
                          <SelectItem value="concentrate">Concentrate feeding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location/Region</Label>
                      <Input
                        id="location"
                        placeholder="Enter farm location or region"
                        value={environmentalFactors.location}
                        onChange={(e) => setEnvironmentalFactors(prev => ({...prev, location: e.target.value}))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="season">Current Season</Label>
                      <Select value={environmentalFactors.season} onValueChange={(value) => setEnvironmentalFactors(prev => ({...prev, season: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="autumn">Autumn/Fall</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id="other-animals-affected"
                        checked={environmentalFactors.otherAnimalsAffected}
                        onCheckedChange={(checked) => setEnvironmentalFactors(prev => ({...prev, otherAnimalsAffected: !!checked}))}
                        className="border-green-400 data-[state=checked]:bg-green-600"
                      />
                      <Label htmlFor="other-animals-affected" className="text-sm font-medium">
                        Other animals in the herd showing similar symptoms
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="recent-changes">Recent Changes in Management, Feed, or Environment</Label>
                    <Textarea
                      id="recent-changes"
                      placeholder="Describe any recent changes in feed, housing, new animals introduced, vaccinations, treatments, weather changes, etc."
                      value={environmentalFactors.recentChanges}
                      onChange={(e) => setEnvironmentalFactors(prev => ({...prev, recentChanges: e.target.value}))}
                      className="min-h-20"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Diagnosis Results */}
          <AnimatePresence>
            {(selectedSymptoms.length > 0 || animalInfo.type || vitalSigns.temperature) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-8 space-y-6"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <RefreshCw className="h-8 w-8 text-green-600 animate-spin" />
                    <span className="ml-3 text-green-700">Analyzing diagnostic criteria...</span>
                  </div>
                ) : diagnosis ? (
                  <Card className="bg-white border border-green-100 rounded-xl p-8 shadow-lg">
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <h2 className="text-3xl font-bold text-green-700">
                            {diagnosis.disease.name}
                          </h2>
                          <div className="flex items-center gap-1">
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
                        
                        <div className="bg-green-50 rounded-lg p-4 mb-6">
                          <p className="text-green-800 font-medium mb-2">
                            Diagnostic Confidence: {diagnosis.matchPercentage.toFixed(1)}%
                          </p>
                          <p className="text-sm text-green-700">
                            Based on {selectedSymptoms.length} symptoms, 
                            {animalInfo.type && ` ${animalInfo.type.toLowerCase()} characteristics,`}
                            {vitalSigns.temperature && ' vital signs,'}
                            {Object.values(physicalExam).some(val => val) && ' physical examination findings,'}
                            {Object.values(environmentalFactors).some(val => val) && ' environmental factors'}
                          </p>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">{diagnosis.disease.description}</p>
                        
                        <div className="mb-6">
                          <h3 className="font-semibold mb-4 text-green-700 text-lg">Treatment Recommendations:</h3>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <ul className="space-y-3 text-gray-700">
                              {diagnosis.disease.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-600 mr-3 mt-1 font-bold">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                            <div>
                              <p className="font-medium text-yellow-800 mb-1">Important Notice</p>
                              <p className="text-sm text-yellow-700">
                                This diagnostic tool is for informational purposes only. Always consult with a qualified veterinarian 
                                for accurate diagnosis and treatment. Emergency cases require immediate professional attention.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="w-80 bg-gray-100 rounded-xl p-4">
                          {/* <img
                            src="/api/placeholder/300/240"
                            alt={diagnosis.disease.name}
                            className="w-full h-60 object-cover rounded-lg border-2 border-green-200"
                          /> */}
                          {/* <p className="text-sm text-gray-600 mt-2 text-center">
                            Typical presentation of {diagnosis.disease.name}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Alert className="bg-white border border-orange-200 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <AlertTitle className="text-orange-700">Insufficient Data for Diagnosis</AlertTitle>
                    <AlertDescription className="text-gray-700">
                      Please provide more information across different criteria tabs to generate a comprehensive diagnosis.
                      Focus on completing animal information, vital signs, and key symptoms for better accuracy.
                    </AlertDescription>
                  </Alert>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Card */}
          {(selectedSymptoms.length > 0 || Object.values(animalInfo).some(val => val)) && (
            <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4">Diagnostic Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">Animal Info</p>
                  <p className="text-green-600">
                    {animalInfo.type || 'Not specified'} - {animalInfo.age || 'Age unknown'}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Symptoms</p>
                  <p className="text-green-600">{selectedSymptoms.length} selected</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Vital Signs</p>
                  <p className="text-green-600">
                    {vitalSigns.temperature && `Temp: ${vitalSigns.temperature}°C`}
                    {vitalSigns.heartRate && `, HR: ${vitalSigns.heartRate}`}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Completion</p>
                  <p className="text-green-600">{getCompletionPercentage().toFixed(0)}% complete</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}