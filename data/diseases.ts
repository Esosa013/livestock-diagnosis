import { Disease } from '@/types';

export const diseases: Disease[] = [
  {
    id: 'fmd',
    name: 'Foot and Mouth Disease',
    description: 'A highly contagious viral disease affecting cloven-hoofed animals. Characterized by fever and blister-like sores on the mouth, tongue, feet, and teats. Primarily impacts cattle, sheep, goats, and pigs.',
    symptoms: ['fever', 'lethargy', 'appetite-loss', 'lesions', 'nasal-discharge', 'weight-loss', 'difficulty-walking'],
    imageUrl: 'https://www.bayvets.co.uk/wp-content/uploads/2022/02/shutterstock_1221198586.jpg',
    severity: 'severe',
    recommendations: [
      'Isolate infected animals immediately',
      'Contact veterinary authorities',
      'Implement strict biosecurity measures',
      'Vaccinate healthy animals',
      'Disinfect all equipment and facilities',
      'Restrict animal movement',
      'Monitor other animals for symptoms'
    ]
  },
  {
    id: 'pneumonia',
    name: 'Bovine Respiratory Disease (BRD)',
    description: 'A complex, multifactorial respiratory disease in cattle caused by viral and bacterial pathogens. Often triggered by stress, transportation, and environmental conditions.',
    symptoms: [
      'coughing', 
      'nasal-discharge', 
      'breathing-difficulty', 
      'fever', 
      'lethargy', 
      'appetite-loss', 
      'chest-congestion', 
      'rapid-breathing'
    ],
    imageUrl: 'https://www.vff.org.au/wp-content/uploads/2024/01/Cow-with-Pneumonia.jpg',
    severity: 'moderate',
    recommendations: [
      'Provide clean, well-ventilated housing',
      'Administer prescribed antibiotics',
      'Ensure adequate rest',
      'Monitor temperature regularly',
      'Reduce stress factors',
      'Implement vaccination program',
      'Maintain proper nutrition',
      'Isolate sick animals'
    ]
  },
  {
    id: 'mastitis',
    name: 'Mastitis',
    description: 'An inflammatory condition of the mammary gland and udder tissue in dairy animals, typically caused by bacterial infections. Can significantly impact milk production and animal welfare.',
    symptoms: [
      'fever', 
      'lethargy', 
      'appetite-loss', 
      'swelling', 
      'abnormal-milk', 
      'reduced-milk-production', 
      'pain-when-touched'
    ],
    imageUrl: 'https://vossenagriculture.com/wp-content/uploads/2024/09/blogs_posts-shutterstock_1677257290-scaled.jpg',
    severity: 'moderate',
    recommendations: [
      'Implement proper milking hygiene',
      'Separate infected animals',
      'Apply recommended antibiotic treatment',
      'Monitor milk production',
      'Use teat dips and post-milking sprays',
      'Maintain clean milking equipment',
      'Conduct regular udder health checks'
    ]
  },
  {
    id: 'bvd',
    name: 'Bovine Viral Diarrhea (BVD)',
    description: 'A complex viral disease that can cause a wide range of clinical signs in cattle. Persistent infection can lead to immunosuppression and reproductive problems.',
    symptoms: [
      'fever', 
      'diarrhea', 
      'weight-loss', 
      'appetite-loss', 
      'nasal-discharge', 
      'abortion', 
      'reduced-fertility',
      'skin-lesions'
    ],
    imageUrl: 'https://eqk4booyvjq.exactdn.com/wp-content/uploads/2024/06/Bovine-viral-diarrhoea-virus.jpg?lossy=1&ssl=1',
    severity: 'moderate',
    recommendations: [
      'Identify and remove persistently infected animals',
      'Implement strict biosecurity measures',
      'Vaccination of breeding herds',
      'Regular testing of young stock',
      'Isolate new animals before introducing to herd',
      'Maintain clean living conditions',
      'Consult veterinary specialists'
    ]
  },
  {
    id: 'anthrax',
    name: 'Anthrax',
    description: 'A serious infectious disease caused by spore-forming bacteria. Can cause sudden death in animals and poses significant zoonotic risks.',
    symptoms: [
      'sudden-death', 
      'fever', 
      'tremors', 
      'difficulty-breathing', 
      'bloody-discharge', 
      'swelling', 
      'seizures'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571590591428-53bfd3e2d5cf?auto=format&fit=crop&q=80',
    severity: 'severe',
    recommendations: [
      'Immediate veterinary intervention',
      'Quarantine affected area',
      'Vaccination of uninfected animals',
      'Proper disposal of infected carcasses',
      'Disinfection of contaminated environments',
      'Wear protective equipment',
      'Report to local animal health authorities'
    ]
  },
  {
    id: 'rabies',
    name: 'Rabies',
    description: 'A fatal viral disease that affects the central nervous system of mammals. Transmitted through bites from infected animals.',
    symptoms: [
      'behavioral-changes', 
      'aggression', 
      'excessive-salivation', 
      'paralysis', 
      'seizures', 
      'fear-of-water', 
      'head-tilt'
    ],
    imageUrl: 'https://cdn.passporthealthusa.com/wp-content/uploads/2022/01/rabies-do-to-animals.jpg?x93413',
    severity: 'severe',
    recommendations: [
      'Immediate veterinary euthanasia',
      'Strict quarantine',
      'Post-exposure prophylaxis for humans',
      'Vaccination of domestic animals',
      'Control of wild animal populations',
      'Report to local health authorities',
      'Prevent contact with wildlife'
    ]
  },
  {
    id: 'heat-stroke',
    name: 'Heat Stroke',
    description: 'A life-threatening condition caused by excessive heat exposure, leading to dehydration and organ failure.',
    symptoms: ['temperature-sensitivity', 'dehydration', 'lethargy', 'tremors', 'rapid-breathing'],
    imageUrl: 'https://portkennedyvet.com.au/wp-content/uploads/2020/01/Heat-Stroke-in-Animals.jpg',
    severity: 'severe',
    recommendations: [
      'Move animal to a cool, shaded area',
      'Provide cool water immediately',
      'Apply cool, wet towels',
      'Seek veterinary assistance',
      'Ensure proper ventilation in enclosures'
    ]
  },
  {
    id: 'intestinal-parasites',
    name: 'Intestinal Parasites',
    description: 'Infection caused by internal parasites leading to digestive distress and malnutrition.',
    symptoms: ['diarrhea', 'weight-loss', 'bloating', 'vomiting', 'excessive-gas', 'stomach-distension'],
    imageUrl: 'https://i.ytimg.com/vi/EmPzVaqfhQQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgSSg_MA8=&rs=AOn4CLAlY4eDIhuBbWiEq5FgNycsOocFdQ',
    severity: 'moderate',
    recommendations: [
      'Administer anti-parasitic treatment',
      'Maintain a clean living environment',
      'Regular deworming schedule',
      'Monitor weight and appetite',
      'Ensure proper nutrition'
    ]
  },
  {
    id: 'neurological-disorder',
    name: 'Neurological Disorder',
    description: 'A condition affecting the nervous system, leading to coordination problems and abnormal behavior.',
    symptoms: ['coordination', 'circling', 'abnormal-reflexes', 'eye-twitching', 'drooping-ears', 'head-tilt'],
    imageUrl: 'https://brightcarevet.com/animal-neurology/wp-content/uploads/sites/2/2023/07/dog-vet-02.jpg',
    severity: 'moderate',
    recommendations: [
      'Consult a veterinary neurologist',
      'Perform diagnostic tests',
      'Provide supportive care',
      'Monitor closely for worsening symptoms',
      'Ensure proper diet and hydration'
    ]
  },
  {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'A chronic condition causing joint pain and stiffness, often seen in older animals.',
    symptoms: ['joint-pain', 'stiffness', 'lameness', 'difficulty-walking', 'joint-swelling'],
    imageUrl: 'https://www.echucavets.com.au/wp-content/uploads/2019/04/feature_image_2-1000x675.jpg',
    severity: 'mild',
    recommendations: [
      'Provide joint supplements',
      'Ensure comfortable bedding',
      'Encourage mild exercise',
      'Administer anti-inflammatory medication',
      'Monitor weight and diet'
    ]
  },
  {
    id: 'skin-infection',
    name: 'Skin Infection',
    description: 'A bacterial or fungal infection of the skin, causing lesions, itching, and inflammation.',
    symptoms: ['lesions', 'itching', 'rash', 'discoloration', 'scaling', 'crusty-skin', 'wounds'],
    imageUrl: 'https://www.nadis.org.uk/media/1420/053111_1401_skinconditi9.png',
    severity: 'moderate',
    recommendations: [
      'Apply topical antibacterial or antifungal treatment',
      'Maintain clean and dry skin',
      'Administer prescribed antibiotics',
      'Ensure proper hygiene',
      'Monitor for spread of infection'
    ]
  },
];