import { Symptom } from '@/types';

export const symptoms: Symptom[] = [
  // General Symptoms
  { 
    id: 'fever', 
    name: 'High Fever', 
    category: 'general',
    description: 'Elevated body temperature above normal range, indicating potential infection or inflammatory response. Can signify serious underlying health issues in livestock.'
  },
  { 
    id: 'lethargy', 
    name: 'Lethargy/Weakness', 
    category: 'general',
    description: 'Unusual tiredness, lack of energy, and reduced responsiveness. Often indicates the animal is experiencing significant physical or physiological stress.'
  },
  { 
    id: 'appetite-loss', 
    name: 'Loss of Appetite', 
    category: 'general',
    description: 'Significant reduction in food intake or complete refusal to eat. Can be a critical sign of disease, pain, or metabolic dysfunction.'
  },
  { 
    id: 'weight-loss', 
    name: 'Rapid Weight Loss', 
    category: 'general',
    description: 'Sudden and significant decrease in body weight, potentially indicating serious metabolic, digestive, or systemic health problems.'
  },
  { 
    id: 'dehydration', 
    name: 'Signs of Dehydration', 
    category: 'general',
    description: 'Reduced fluid intake or excessive fluid loss, characterized by dry mucous membranes, reduced skin elasticity, and sunken eyes.'
  },
  { 
    id: 'depression', 
    name: 'Behavioral Depression', 
    category: 'general',
    description: 'Marked reduction in normal animal behaviors, reduced interaction, and lack of typical responsiveness to stimuli.'
  },
  { 
    id: 'tremors', 
    name: 'Body Tremors', 
    category: 'general',
    description: 'Involuntary muscle movements or shaking, potentially indicating neurological issues, metabolic disorders, or severe stress.'
  },
  { 
    id: 'swelling', 
    name: 'Generalized Swelling', 
    category: 'general',
    description: 'Widespread inflammation or fluid accumulation throughout the body, suggesting systemic infection or serious health condition.'
  },
  { 
    id: 'temperature-sensitivity', 
    name: 'Temperature Sensitivity', 
    category: 'general',
    description: 'Abnormal reactions to environmental temperature, including excessive shivering or heat intolerance, indicating potential metabolic or neurological issues.'
  },
  { 
    id: 'sudden-death', 
    name: 'Sudden Death', 
    category: 'general',
    description: 'Unexpected and rapid death without prolonged illness, often indicating acute systemic failure or extremely severe underlying condition.'
  },

  // Respiratory Symptoms
  { 
    id: 'coughing', 
    name: 'Persistent Coughing', 
    category: 'respiratory',
    description: 'Repeated, forceful expulsion of air from lungs, potentially indicating respiratory infection, inflammation, or blockage.'
  },
  { 
    id: 'nasal-discharge', 
    name: 'Nasal Discharge', 
    category: 'respiratory',
    description: 'Abnormal fluid or mucus flow from nostrils, which can be clear, cloudy, or contain blood, suggesting respiratory infection.'
  },
  { 
    id: 'breathing-difficulty', 
    name: 'Difficulty Breathing', 
    category: 'respiratory',
    description: 'Labored, irregular, or painful breathing patterns indicating potential lung, heart, or systemic health problems.'
  },
  { 
    id: 'wheezing', 
    name: 'Wheezing', 
    category: 'respiratory',
    description: 'High-pitched whistling sound during breathing, typically indicating airway inflammation or obstruction.'
  },
  { 
    id: 'rapid-breathing', 
    name: 'Rapid or Labored Breathing', 
    category: 'respiratory',
    description: 'Abnormally fast or strained breathing, suggesting respiratory distress, infection, or cardiovascular issues.'
  },
  { 
    id: 'chest-congestion', 
    name: 'Chest Congestion', 
    category: 'respiratory',
    description: 'Accumulation of fluid or mucus in lung airways, causing difficulties in breathing and potential infection.'
  },
  { 
    id: 'lung-sounds', 
    name: 'Abnormal Lung Sounds', 
    category: 'respiratory',
    description: 'Unusual sounds like crackling, rattling, or reduced breath sounds when listening to lungs, indicating potential respiratory issues.'
  },
  { 
    id: 'throat-inflammation', 
    name: 'Throat Inflammation', 
    category: 'respiratory',
    description: 'Swelling and irritation of throat tissues, potentially causing difficulty swallowing and respiratory discomfort.'
  },
  { 
    id: 'bloody-discharge', 
    name: 'Bloody Discharge', 
    category: 'respiratory',
    description: 'Presence of blood in mucus or respiratory secretions, indicating severe respiratory tract damage or infection.'
  },

  // Digestive Symptoms
  { 
    id: 'diarrhea', 
    name: 'Diarrhea', 
    category: 'digestive',
    description: 'Frequent, loose, or watery bowel movements indicating digestive tract inflammation, infection, or dietary issues.'
  },
  { 
    id: 'bloating', 
    name: 'Bloating', 
    category: 'digestive',
    description: 'Abnormal distension of the abdomen, often caused by gas accumulation or digestive tract obstruction.'
  },
  { 
    id: 'vomiting', 
    name: 'Vomiting', 
    category: 'digestive',
    description: 'Forceful expulsion of stomach contents, suggesting gastrointestinal infection, poisoning, or systemic illness.'
  },
  { 
    id: 'constipation', 
    name: 'Constipation', 
    category: 'digestive',
    description: 'Difficulty passing stool or infrequent bowel movements, indicating potential dietary, metabolic, or intestinal issues.'
  },
  { 
    id: 'bloody-stool', 
    name: 'Blood in Stool', 
    category: 'digestive',
    description: 'Presence of blood in feces, suggesting serious gastrointestinal bleeding, infection, or internal damage.'
  },
  { 
    id: 'abdominal-pain', 
    name: 'Abdominal Pain', 
    category: 'digestive',
    description: 'Visible discomfort or sensitivity in the stomach area, potentially indicating inflammation, infection, or organ dysfunction.'
  },
  { 
    id: 'excessive-gas', 
    name: 'Excessive Gas', 
    category: 'digestive',
    description: 'Abnormal gas production in the digestive tract, causing discomfort and potential distension of the abdomen.'
  },
  { 
    id: 'stomach-distension', 
    name: 'Stomach Distension', 
    category: 'digestive',
    description: 'Abnormal enlargement of the stomach area, potentially indicating severe digestive issues or metabolic problems.'
  },
  { 
    id: 'reduced-rumination', 
    name: 'Reduced Rumination', 
    category: 'digestive',
    description: 'Decreased or halted process of re-chewing partially digested food, indicating potential digestive system malfunction.'
  },

  // Neurological Symptoms
  { 
    id: 'coordination', 
    name: 'Poor Coordination', 
    category: 'neurological',
    description: 'Difficulty maintaining balance, unsteady movement, and impaired motor control suggesting neurological disorders.'
  },
  { 
    id: 'seizures', 
    name: 'Seizures', 
    category: 'neurological',
    description: 'Sudden, uncontrolled electrical disturbances in the brain causing physical convulsions and loss of bodily control.'
  },
  { 
    id: 'head-tilt', 
    name: 'Head Tilting', 
    category: 'neurological',
    description: 'Persistent tilting of the head to one side, often indicating inner ear problems or neurological disorders.'
  },
  { 
    id: 'muscle-weakness', 
    name: 'Muscle Weakness', 
    category: 'neurological',
    description: 'Reduced muscle strength and difficulty performing normal movement, suggesting nerve or muscular system issues.'
  },
  { 
    id: 'paralysis', 
    name: 'Partial or Complete Paralysis', 
    category: 'neurological',
    description: 'Loss of muscle function in part or all of the body, indicating severe neurological damage or systemic disease.'
  },
  { 
    id: 'circling', 
    name: 'Circling Behavior', 
    category: 'neurological',
    description: 'Repetitive walking in circular patterns, suggesting potential brain, inner ear, or neurological disorders.'
  },
  { 
    id: 'abnormal-reflexes', 
    name: 'Abnormal Reflexes', 
    category: 'neurological',
    description: 'Unusual responses to stimuli or altered reflex actions, indicating potential neurological system dysfunction.'
  },
  { 
    id: 'drooping-ears', 
    name: 'Drooping Ears', 
    category: 'neurological',
    description: 'Inability to hold ears upright or maintain normal ear position, potentially indicating nerve damage or neurological issues.'
  },
  { 
    id: 'eye-twitching', 
    name: 'Eye Twitching', 
    category: 'neurological',
    description: 'Involuntary movement of eye muscles, suggesting potential neurological stress or underlying health conditions.'
  },

  // Skin Symptoms
  { 
    id: 'lesions', 
    name: 'Skin Lesions', 
    category: 'skin',
    description: 'Abnormal changes in skin tissue, including wounds, bumps, or areas of damaged skin, potentially indicating infection or disease.'
  },
  { 
    id: 'hair-loss', 
    name: 'Hair Loss', 
    category: 'skin',
    description: 'Patches of missing hair or widespread coat thinning, suggesting nutritional, hormonal, or skin health issues.'
  },
  { 
    id: 'itching', 
    name: 'Excessive Itching', 
    category: 'skin',
    description: 'Persistent scratching or rubbing of skin, indicating potential allergies, parasites, or skin infections.'
  },
  { 
    id: 'rash', 
    name: 'Rash or Skin Eruptions', 
    category: 'skin',
    description: 'Widespread skin inflammation, bumps, or discolored patches suggesting allergic reactions or systemic diseases.'
  },
  { 
    id: 'discoloration', 
    name: 'Skin Discoloration', 
    category: 'skin',
    description: 'Unusual changes in skin color or pigmentation, potentially indicating underlying health conditions or nutritional issues.'
  },
  { 
    id: 'wounds', 
    name: 'Unhealing Wounds', 
    category: 'skin',
    description: 'Persistent skin injuries that do not heal normally, suggesting compromised immune system or metabolic problems.'
  },
  { 
    id: 'scaling', 
    name: 'Skin Scaling', 
    category: 'skin',
    description: 'Dry, flaky skin with visible scaling or peeling, indicating potential dermatological or systemic health issues.'
  },
  { 
    id: 'crusty-skin', 
    name: 'Crusty or Scabby Skin', 
    category: 'skin',
    description: 'Hardened, dried skin formations suggesting chronic skin infections, parasites, or serious dermatological conditions.'
  },

  // Reproductive Symptoms
  { 
    id: 'infertility', 
    name: 'Infertility', 
    category: 'reproductive',
    description: 'Inability to conceive or produce viable offspring, potentially caused by hormonal, structural, or systemic health issues.'
  },
  { 
    id: 'abortion', 
    name: 'Spontaneous Abortion', 
    category: 'reproductive',
    description: 'Unexpected loss of pregnancy before full term, indicating potential infectious, nutritional, or genetic problems.'
  },
  { 
    id: 'irregular-heat', 
    name: 'Irregular Heat Cycles', 
    category: 'reproductive',
    description: 'Abnormal or inconsistent reproductive cycles, suggesting hormonal imbalances or underlying health conditions.'
  },
  { 
    id: 'vaginal-discharge', 
    name: 'Abnormal Vaginal Discharge', 
    category: 'reproductive',
    description: 'Unusual fluid or mucus from reproductive tract, potentially indicating infection, inflammation, or reproductive disorders.'
  },
  { 
    id: 'testicular-swelling', 
    name: 'Testicular Swelling', 
    category: 'reproductive',
    description: 'Enlargement or inflammation of testicles, suggesting potential infections, injuries, or reproductive system disorders.'
  },
  { 
    id: 'reduced-fertility', 
    name: 'Reduced Fertility', 
    category: 'reproductive',
    description: 'Decreased ability to reproduce, potentially caused by various physiological, environmental, or health-related factors.'
  },

  // Musculoskeletal Symptoms
  { 
    id: 'lameness', 
    name: 'Lameness', 
    category: 'musculoskeletal',
    description: 'Abnormal gait or difficulty walking, indicating potential joint, muscle, or bone-related health issues.'
  },
  { 
    id: 'joint-swelling', 
    name: 'Joint Swelling', 
    category: 'musculoskeletal',
    description: 'Enlargement and inflammation of joints, suggesting potential arthritis, injury, or systemic inflammatory conditions.'
  },
  { 
    id: 'stiffness', 
    name: 'Muscle Stiffness', 
    category: 'musculoskeletal',
    description: 'Reduced muscle flexibility and increased resistance to movement, indicating potential muscle or joint disorders.'
  },
  { 
    id: 'difficulty-walking', 
    name: 'Difficulty Walking', 
    category: 'musculoskeletal',
    description: 'Impaired mobility and challenges in normal locomotive movement, suggesting serious musculoskeletal problems.'
  },
  { 
    id: 'joint-pain', 
    name: 'Joint Pain', 
    category: 'musculoskeletal',
    description: 'Discomfort or sensitivity in joint areas, potentially indicating inflammation, injury, or degenerative conditions.'
  },
  { 
    id: 'pain-when-touched', 
    name: 'Pain When Touched', 
    category: 'musculoskeletal',
    description: 'Sensitivity or reactive pain when physical contact is made, suggesting underlying inflammatory or injury-related conditions.'
  },

  // Behavioral Symptoms
  { 
    id: 'behavioral-changes', 
    name: 'Behavioral Changes', 
    category: 'behavioral',
    description: 'Significant alterations in typical animal behavior, potentially indicating psychological stress, neurological issues, or underlying health problems.'
  },
  { 
    id: 'aggression', 
    name: 'Increased Aggression', 
    category: 'behavioral',
    description: 'Unusual hostile or violent behavior beyond normal temperament, suggesting potential pain, neurological issues, or hormonal imbalances.'
  },
  { 
    id: 'excessive-salivation', 
    name: 'Excessive Salivation', 
    category: 'behavioral',
    description: 'Abnormal production of saliva, potentially indicating oral diseases, neurological disorders, or toxic exposures.'
  },
  { 
    id: 'fear-of-water', 
    name: 'Fear of Water', 
    category: 'behavioral',
    description: 'Unusual aversion or anxiety around water, potentially indicating neurological conditions like rabies or severe psychological stress.'
  },

  // Mammary Symptoms
  { 
    id: 'abnormal-milk', 
    name: 'Abnormal Milk Production', 
    category: 'mammary',
    description: 'Changes in milk color, consistency, or composition, suggesting potential infections, nutritional issues, or hormonal imbalances.'
  },
  { 
    id: 'reduced-milk-production', 
    name: 'Reduced Milk Production', 
    category: 'mammary',
    description: 'Decreased milk output compared to normal levels, indicating potential health issues, nutritional deficiencies, or stress.'
  }
];