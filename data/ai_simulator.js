import { OPPORTUNITIES } from './mock_data.js';

/**
 * AI SIMULATOR FOR LEVELED OS
 * Simulates high-quality, customized AI responses for mentoring, roadmaps, university readiness, essay reviews, and project ideas.
 */

// Basic text utility to scan for keywords
function containsAny(text, keywords) {
  const normalized = text.toLowerCase();
  return keywords.some(k => normalized.includes(k.toLowerCase()));
}

export const AISimulator = {
  
  /**
   * Generates a milestone roadmap based on the student profile
   */
  getExamsForUser(user) {
    if (!user) return [];
    
    const country = user.country || 'United States';
    const career = (user.careerGoals || '').toLowerCase();
    const dreamUnis = (user.dreamUniversities || []).map(u => u.toLowerCase());
    
    const targetsMIT = dreamUnis.some(u => u.includes('mit') || u.includes('massachusetts'));
    const targetsStanford = dreamUnis.some(u => u.includes('stanford'));
    const targetsHarvard = dreamUnis.some(u => u.includes('harvard'));
    const targetsOxford = dreamUnis.some(u => u.includes('oxford'));
    const targetsCambridge = dreamUnis.some(u => u.includes('cambridge'));
    const targetsIIT = dreamUnis.some(u => u.includes('iit') || u.includes('indian institute'));
    const targetsNUS = dreamUnis.some(u => u.includes('nus') || u.includes('national university'));
    const targetsImperial = dreamUnis.some(u => u.includes('imperial'));
    
    const isEngineeringOrCS = containsAny(career, ['engineering', 'software', 'computer', 'ai', 'data science', 'analytics', 'cybersecurity', 'robotics', 'blockchain', 'web3', 'coding', 'informatics']);
    const isBioMed = containsAny(career, ['bioinformatics', 'medicine', 'biomedical', 'biology', 'neuroscience', 'ecology', 'marine', 'pre-med', 'healthcare']);
    const isBusinessEco = containsAny(career, ['business', 'finance', 'economics', 'public policy', 'product strategy', 'entrepreneurship', 'commerce', 'management']);
    const isPhysicsAstro = containsAny(career, ['physics', 'astrophysics', 'astronomy', 'materials science', 'chemistry']);
    
    let stream = 'General';
    if (isEngineeringOrCS) {
      stream = 'Engineering/CS';
    } else if (isBioMed) {
      stream = 'Medicine/Bio';
    } else if (isBusinessEco) {
      stream = 'Business/Econ';
    } else if (isPhysicsAstro) {
      stream = 'Physics/Chem';
    }
    
    const exams = [];
    
    // 1. Target University Specific Forced Exams (Highest Priority)
    if (targetsIIT) {
      exams.push('JEE Main & Advanced (Mandatory for IIT Admissions)');
    }
    
    // Add Oxbridge admissions tests for international / domestic applicants targeting Oxford/Cambridge/Imperial
    if (targetsOxford || targetsCambridge || targetsImperial) {
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        exams.push('Oxbridge PAT (Physics Aptitude Test) or ENGAA (Engineering Assessment)');
      } else if (stream === 'Medicine/Bio') {
        exams.push('UCAT (University Clinical Aptitude Test for Medicine)');
      } else if (stream === 'Business/Econ') {
        exams.push('TSA (Thinking Skills Assessment for Economics & Management)');
      }
    }
    
    // 2. Country-Specific Local Standardized Exams
    if (country === 'India') {
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        if (!targetsIIT) exams.push('JEE Main & Advanced (Engineering Entrance)');
        exams.push('BITSAT (Birla Institute Entrance)');
        exams.push('National Science / Astronomy Olympiads');
      } else if (stream === 'Medicine/Bio') {
        exams.push('NEET (Medical College Admission Test)');
        exams.push('Indian National Biology Olympiad (INBO)');
        exams.push('National Science Olympiad (Chemistry/Biology)');
      } else if (stream === 'Business/Econ') {
        exams.push('Common University Entrance Test (CUET) for Commerce/Econ');
        exams.push('IPMAT (Management Entrance Test)');
        exams.push('National Economics Olympiad');
      } else {
        exams.push('Class 10/12 Board Exams (CBSE/ICSE/State Boards)');
        exams.push('Common University Entrance Test (CUET)');
      }
    } else if (country === 'United Kingdom') {
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        exams.push('A-Levels (Mathematics, Further Mathematics, Physics)');
        if (!targetsOxford && !targetsCambridge && !targetsImperial) {
          exams.push('Oxbridge PAT or MAT (if applying to Oxford/Cambridge/Imperial)');
        }
      } else if (stream === 'Medicine/Bio') {
        exams.push('A-Levels (Biology, Chemistry, Mathematics)');
        if (!targetsOxford && !targetsCambridge) exams.push('University Clinical Aptitude Test (UCAT)');
      } else if (stream === 'Business/Econ') {
        exams.push('A-Levels (Mathematics, Economics, Business)');
        if (!targetsOxford && !targetsCambridge) exams.push('Thinking Skills Assessment (TSA) or TMUA');
      } else {
        exams.push('A-Levels / GCSEs in target subjects');
      }
    } else if (country === 'United States') {
      if (stream === 'Engineering/CS') {
        exams.push('SAT / ACT (College Entrance)');
        exams.push('AP Calculus BC & AP Computer Science A');
        exams.push('AP Physics C (Mechanics & E&M)');
        exams.push('USA Computing Olympiad (USACO)');
      } else if (stream === 'Medicine/Bio') {
        exams.push('SAT / ACT (College Entrance)');
        exams.push('AP Biology & AP Chemistry');
        exams.push('AP Calculus AB');
        exams.push('US National Chemistry Olympiad (USNCO)');
      } else if (stream === 'Business/Econ') {
        exams.push('SAT / ACT (College Entrance)');
        exams.push('AP Microeconomics & AP Macroeconomics');
        exams.push('AP Statistics & AP Calculus AB');
      } else {
        exams.push('SAT / ACT College Entrance Tests');
        exams.push('AP Exams aligned with your major');
      }
    } else if (country === 'Singapore') {
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        exams.push('GCE A-Levels (H2 Physics/Mathematics/Computing)');
        exams.push('Singapore Physics/Math Olympiad');
      } else if (stream === 'Medicine/Bio') {
        exams.push('GCE A-Levels (H2 Biology/Chemistry)');
        exams.push('Singapore Biology/Chemistry Olympiad');
      } else if (stream === 'Business/Econ') {
        exams.push('GCE A-Levels (H2 Economics/Mathematics)');
      } else {
        exams.push('GCE A-Levels / IB Diploma');
      }
    } else {
      // General Fallback
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        exams.push(`National STEM Entrance Exams (${country})`);
        exams.push('Subject Olympiads (Math/Physics/Informatics)');
      } else if (stream === 'Medicine/Bio') {
        exams.push(`National Medical Entrance Exams (${country})`);
        exams.push('Subject Olympiads (Biology/Chemistry)');
      } else if (stream === 'Business/Econ') {
        exams.push(`National Commerce/Business Entrance Exams (${country})`);
      } else {
        exams.push(`National University Entrance Exams (${country})`);
      }
    }
    
    // 3. International Target Universities Core Standardized Exam Injector
    if ((targetsMIT || targetsStanford || targetsHarvard) && country !== 'United States') {
      if (!exams.includes('SAT / ACT (College Entrance)')) {
        exams.push('SAT / ACT (US College Standardized Entrance Exam)');
      }
      if (stream === 'Engineering/CS' && !exams.includes('AP Calculus BC & AP Computer Science A')) {
        exams.push('AP Exams (Calculus BC, Physics C, CS A to validate STEM rigor)');
      } else if (stream === 'Medicine/Bio' && !exams.includes('AP Biology & AP Chemistry')) {
        exams.push('AP Exams (Biology, Chemistry to validate Life Science rigor)');
      } else if (stream === 'Business/Econ' && !exams.includes('AP Microeconomics & AP Macroeconomics')) {
        exams.push('AP Exams (Micro/Macroeconomics, Statistics to validate Business rigor)');
      }
    }
    
    if (targetsNUS && country !== 'Singapore') {
      if (!exams.includes('SAT / ACT (College Entrance)') && !exams.includes('SAT / ACT (US College Standardized Entrance Exam)')) {
        exams.push('SAT / ACT (NUS International Standardized Requirement)');
      }
      exams.push('AP Advanced Placement Exams (Highly valued by NUS Admissions)');
    }

    return [...new Set(exams)];
  },

  generateRoadmap(user) {
    if (!user) return [];

    const milestones = [];
    const interests = user.interests || [];
    const career = user.careerGoals || '';
    
    // Check if college student
    const isCollege = (user.grade && (
      user.grade.toLowerCase().includes('college') || 
      user.grade.toLowerCase().includes('undergrad') || 
      user.grade.toLowerCase().includes('university') || 
      user.grade.toLowerCase().includes('freshman') || 
      user.grade.toLowerCase().includes('sophomore') || 
      user.grade.toLowerCase().includes('junior') || 
      user.grade.toLowerCase().includes('senior') ||
      user.grade.toLowerCase().includes('graduate')
    ));
    
    if (isCollege) {
      // Return Career & Internship Milestones
      milestones.push({
        id: 'mile-course-skill',
        title: `Master ${career || 'Major'} Coursework & Certifications`,
        category: 'Academics',
        description: `Optimize your GPA and secure industry-recognized credentials in your major focus area (e.g., Cloud computing, Python Data Science, or UI/UX certificates).`,
        difficulty: 'Medium',
        timeCommitment: '8-10 hours/week',
        xpReward: 400,
        resources: [
          'Coursera & edX major-specific specializations',
          'AWS/Google Cloud certification paths',
          'University academic tutoring and study groups'
        ],
        steps: [
          'Map out your major graduation course requirements and prerequisites.',
          'Complete at least 1 industry certification course related to your career goal.',
          'Form or join a study group for your most challenging major class.',
          'Maintain a target GPA of 3.6+ during this semester.'
        ]
      });

      milestones.push({
        id: 'mile-resume-portfolio',
        title: `Build Professional Resume & Capstone Portfolio`,
        category: 'Portfolio',
        description: `Ditch the high-school achievements. Create a professional case-study resume and link active code repositories or design assets.`,
        difficulty: 'Hard',
        timeCommitment: '6-8 hours/week',
        xpReward: 500,
        resources: [
          'LaTeX Resume templates (Overleaf)',
          'GitHub Pages or Vercel for project hosting',
          'University Career Center resume guide'
        ],
        steps: [
          'Draft a 1-page professional resume using active action verbs.',
          'Deploy at least 2 major technical case studies or capstone projects to GitHub/portfolio.',
          'Link evidence files, live demos, and documentation to your Leveled Portfolio.',
          'Have your resume reviewed by your university career advisor.'
        ]
      });

      milestones.push({
        id: 'mile-intern-recruit',
        title: `Apply to Summer Internships & Network`,
        category: 'Career',
        description: `Research recruiting cycles for top companies and secure a summer internship to gain real-world experience.`,
        difficulty: 'Hard',
        timeCommitment: '10-12 hours/week',
        xpReward: 600,
        resources: [
          'LinkedIn Jobs and Handshake portals',
          'Company recruiting calendars and deadlines',
          'Alumni directories for informational interviews'
        ],
        steps: [
          'Identify and save 15 target summer internship openings on Leveled.',
          'Reach out to 3 alumni on LinkedIn working at target companies for informational chats.',
          'Submit applications to at least 10 saved internship roles.',
          'Track application statuses (Interview, Offer, Rejected) in your dashboard.'
        ]
      });

      milestones.push({
        id: 'mile-cold-outreach',
        title: `Execute Research Outreach & Cold Email Sprints`,
        category: 'Research',
        description: `Contact university professors or research labs to secure an on-campus Research Assistantship (RA).`,
        difficulty: 'Expert',
        timeCommitment: '4-6 hours/week',
        xpReward: 500,
        resources: [
          'University faculty research directories',
          'Leveled Cold Outreach AI Email Generator',
          'Google Scholar listings of target professors'
        ],
        steps: [
          'Identify 3 professors whose research aligns with your career goals.',
          'Read and summarize 2 recent papers written by each target professor.',
          'Use the Leveled AI email helper to draft a customized, respectful cold outreach pitch.',
          'Send outreach emails requesting a brief chat to discuss open assistant roles.'
        ]
      });

      milestones.push({
        id: 'mile-mock-interview',
        title: `Complete Mock Interviews & Technical Prep`,
        category: 'Interview',
        description: `Prepare for behavioral, case, or technical interviews by practicing live mock sessions.`,
        difficulty: 'Expert',
        timeCommitment: '6-8 hours/week',
        xpReward: 700,
        resources: [
          'LeetCode / HackerRank (for software)',
          'Case Interview Secrets (for consulting)',
          'Behavioral STAR method templates'
        ],
        steps: [
          'Solve at least 25 technical practice questions or review 5 consulting cases.',
          'Draft STAR-format responses for the top 5 common behavioral questions.',
          'Conduct at least 2 mock interview sessions with peers or career advisors.',
          'Review feedback and refine your elevator pitch.'
        ]
      });

      if (window.LeveledApp && window.LeveledApp.state && window.LeveledApp.state.customRoadmapMilestones) {
        milestones.push(...window.LeveledApp.state.customRoadmapMilestones);
      }

      return milestones;
    }

    // Check logged GPA results for High Schoolers
    const gradeResults = user.gradeResults || {};
    const recentGpa = gradeResults.gpa ? parseFloat(gradeResults.gpa) : null;
    
    // Prepended Localized Exam Milestone based on user's country and stream
    const countryName = user.country || 'United States';
    const careerGoals = (user.careerGoals || '').toLowerCase();
    
    const isEngineeringOrCS = containsAny(careerGoals, ['engineering', 'software', 'computer', 'ai', 'data science', 'analytics', 'cybersecurity', 'robotics', 'blockchain', 'web3', 'coding', 'informatics']);
    const isBioMed = containsAny(careerGoals, ['bioinformatics', 'medicine', 'biomedical', 'biology', 'neuroscience', 'ecology', 'marine', 'pre-med', 'healthcare']);
    const isBusinessEco = containsAny(careerGoals, ['business', 'finance', 'economics', 'public policy', 'product strategy', 'entrepreneurship', 'commerce', 'management']);
    const isPhysicsAstro = containsAny(careerGoals, ['physics', 'astrophysics', 'astronomy', 'materials science', 'chemistry']);
    
    let stream = 'General';
    if (isEngineeringOrCS) {
      stream = 'Engineering/CS';
    } else if (isBioMed) {
      stream = 'Medicine/Bio';
    } else if (isBusinessEco) {
      stream = 'Business/Econ';
    } else if (isPhysicsAstro) {
      stream = 'Physics/Chem';
    }
    
    const gradeLower = (user.grade || '').toLowerCase();
    const isJuniorHS = containsAny(gradeLower, ['9', '10', 'freshman', 'sophomore']);
    const boardGrade = isJuniorHS ? 'Class 10' : 'Class 12';
    
    let localExamMilestone = null;

    const targetUniNames = (user.dreamUniversities || []).join(' or ');
    const targetUniStr = targetUniNames ? ` to maximize admission prospects at **${targetUniNames}**` : '';
    
    if (countryName === 'India') {
      let title = 'Ace Board Exams & National Entrance Tests';
      let description = `Prepare for board examinations and domestic entrance tests required for higher studies in India${targetUniStr}.`;
      
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        title = 'Crack JEE Main & Advanced & Board Exams';
        description = `Prepare for the Joint Entrance Examination (JEE) to gain admission to IITs/NITs${targetUniStr ? ` (specifically targeting **${targetUniNames}**)` : ''}, and target high scores in your ${boardGrade} Board Exams (CBSE/ICSE/State Boards) in Physics, Chemistry, and Mathematics.`;
      } else if (stream === 'Medicine/Bio') {
        title = 'Crack NEET & Board Exams';
        description = `Prepare for the National Eligibility cum Entrance Test (NEET) for medical school admissions${targetUniStr ? ` (specifically targeting **${targetUniNames}**)` : ''}, and focus on your ${boardGrade} Board Exams in Physics, Chemistry, and Biology.`;
      } else if (stream === 'Business/Econ') {
        title = 'Ace CUET, Commerce Entrance & Board Exams';
        description = `Prepare for the Common University Entrance Test (CUET) and management tests to secure entry into top central universities (like Delhi University)${targetUniStr ? ` (specifically targeting **${targetUniNames}**)` : ''}, focusing on your Board Exams in Economics, Business Studies, and Mathematics.`;
      }
      
      localExamMilestone = {
        id: 'mile-local-exam',
        title: title,
        category: 'Exams',
        description: description,
        difficulty: 'Expert',
        timeCommitment: '15-20 hours/week',
        xpReward: 600,
        resources: [
          'NCERT Textbooks for domain-specific subjects (fundamental reference)',
          'Previous Year Question Papers and mock keys',
          'Online mock portals and video lectures (PhysicsWallah, Unacademy, Khan Academy India)'
        ],
        steps: [
          `Download and print the official domain syllabus for target entrance exams.`,
          `Solve past 10 years of ${boardGrade} Board Exam chapter-wise papers to ensure 95%+ performance.`,
          `Practice domain multiple-choice question papers under strict timed conditions.`,
          `Identify key concept gaps and take full-length mock exams to improve speed.`
        ],
        teammates: false
      };
    } else if (countryName === 'United Kingdom') {
      let title = 'Excel in A-Levels & Admissions Tests';
      let description = `Secure top predicted A-Level grades and prepare for university admissions tests required for UK universities${targetUniStr}.`;
      
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        title = 'Excel in STEM A-Levels & admissions tests (PAT/MAT/ENGAA)';
        description = `Secure top predicted grades (A*A*A) in Maths, Further Maths, and Physics, and prepare for admissions tests (such as PAT, MAT, or ENGAA) required for engineering at ${targetUniNames || 'Cambridge/Oxford'}.`;
      } else if (stream === 'Medicine/Bio') {
        title = 'Excel in Bio-Chem A-Levels & medical tests (UCAT/BMAT)';
        description = `Secure top predicted grades (A*AA) in Biology and Chemistry A-Levels, and register for the UCAT medical entrance exam required for ${targetUniNames || 'UK Medical schools'}.`;
      } else if (stream === 'Business/Econ') {
        title = 'Excel in Business/Econ A-Levels & aptitude tests (TMUA/TSA)';
        description = `Secure top predicted grades in Maths and Economics A-Levels, and prepare for the Thinking Skills Assessment (TSA) or TMUA required for ${targetUniNames || 'Russell Group universities'}.`;
      }
      
      localExamMilestone = {
        id: 'mile-local-exam',
        title: title,
        category: 'Exams',
        description: description,
        difficulty: 'Expert',
        timeCommitment: '10-12 hours/week',
        xpReward: 600,
        resources: [
          'UCAS guide and university course entrance grade profiles',
          'Physics & Maths Tutor (PMT) past papers database',
          'Official admissions assessment specimens (Oxbridge/Russell Group portals)'
        ],
        steps: [
          `Review UCAS requirements and target grades (e.g. A*A*A) for your chosen courses.`,
          `Register for relevant subject entrance tests by the autumn deadlines.`,
          `Solve past A-Level papers from AQA, OCR, or Edexcel under timed conditions.`,
          `Draft and refine your UCAS Personal Statement with subject teachers.`
        ],
        teammates: false
      };
    } else if (countryName === 'United States') {
      let title = 'Master SAT / ACT & Advanced Placement (AP) Exams';
      let description = `Prepare for college entrance tests (SAT/ACT) and complete Advanced Placement (AP) exams to demonstrate maximum academic rigor${targetUniStr}.`;
      
      if (stream === 'Engineering/CS') {
        title = 'Master SAT / ACT & STEM Advanced Placement (AP) Exams';
        description = `Prepare for college entrance tests (SAT/ACT) and target rigorous STEM APs (like AP Calculus BC, AP Physics C, AP Computer Science A) to showcase analytical excellence to universities like ${targetUniNames || 'MIT/Stanford'}.`;
      } else if (stream === 'Medicine/Bio') {
        title = 'Master SAT / ACT & Bio-Chem Advanced Placement (AP) Exams';
        description = `Prepare for college entrance tests (SAT/ACT) and focus on life science APs (like AP Biology, AP Chemistry, AP Calculus AB) to show pre-med aptitude to universities like ${targetUniNames || 'Ivy League / Top Tier colleges'}.`;
      } else if (stream === 'Business/Econ') {
        title = 'Master SAT / ACT & Econ-Stat Advanced Placement (AP) Exams';
        description = `Prepare for college entrance tests (SAT/ACT) and focus on social science APs (like AP Microeconomics, AP Macroeconomics, AP Statistics) to show quantitative business potential for ${targetUniNames || 'top business schools'}.`;
      }
      
      localExamMilestone = {
        id: 'mile-local-exam',
        title: title,
        category: 'Exams',
        description: description,
        difficulty: 'Hard',
        timeCommitment: '8-10 hours/week',
        xpReward: 500,
        resources: [
          'Official College Board SAT Practice on Khan Academy',
          'AP Classroom portal and course descriptions',
          'Barron\'s or Princeton Review study manuals for target AP subjects'
        ],
        steps: [
          'Take a diagnostic SAT/ACT mock test and design a 10-week practice calendar.',
          'Aim to complete at least 3-4 AP classes/exams in subjects aligned with your intended major.',
          'Complete weekly timed practice sections in AP Classroom and analyze weak areas.',
          'Take the official SAT/ACT exam and submit scores to target colleges.'
        ],
        teammates: false
      };
    } else {
      // General/Default
      let title = `Ace National University Entrance & Standardized Exams (${countryName})`;
      let description = `Optimize your local secondary school certificate score and entrance exams required for university admission in ${countryName}${targetUniStr}.`;
      
      if (stream === 'Engineering/CS' || stream === 'Physics/Chem') {
        title = `Ace STEM Entrance Exams (${countryName})`;
        description = `Prepare for the mathematics and science university entrance examinations required for your engineering stream in ${countryName} to target ${targetUniNames || 'domestic top campuses'}.`;
      } else if (stream === 'Medicine/Bio') {
        title = `Ace Medical/Science Entrance Exams (${countryName})`;
        description = `Prepare for the biology and chemistry entrance examinations required for your medical stream in ${countryName} to target ${targetUniNames || 'domestic top campuses'}.`;
      } else if (stream === 'Business/Econ') {
        title = `Ace Business/Humanities Entrance Exams (${countryName})`;
        description = `Prepare for the economics and aptitude examinations required for your business stream in ${countryName} to target ${targetUniNames || 'domestic top campuses'}.`;
      }
      
      localExamMilestone = {
        id: 'mile-local-exam',
        title: title,
        category: 'Exams',
        description: description,
        difficulty: 'Hard',
        timeCommitment: '8-10 hours/week',
        xpReward: 500,
        resources: [
          'Official National Ministry of Education test syllabus guidelines',
          'Local university admissions test papers and sample materials',
          'Online course platforms (Khan Academy, Coursera, edX)'
        ],
        steps: [
          'Check target domestic university admission requirements for entrance exams and cutoffs.',
          'Map out the regional syllabus and build a weekly study calendar.',
          'Practice official practice tests and past papers from previous years.',
          'Register for local university intake tests and schedule necessary document submissions.'
        ],
        teammates: false
      };
    }

    if (localExamMilestone) {
      milestones.push(localExamMilestone);
    }

    // Milestone 1: Academics & Foundation (Always included, customized by strengths or adjusted by GPA)
    let subject = 'Mathematics';
    const strengths = user.academicStrengths || [];
    
    if (stream === 'Engineering/CS') {
      subject = strengths.includes('Computer Science') ? 'Computer Science' : (strengths.includes('Mathematics') ? 'Mathematics' : 'Computer Science');
    } else if (stream === 'Physics/Chem') {
      subject = strengths.includes('Physics') ? 'Physics' : (strengths.includes('Chemistry') ? 'Chemistry' : 'Physics');
    } else if (stream === 'Medicine/Bio') {
      subject = strengths.includes('Biology') ? 'Biology' : (strengths.includes('Chemistry') ? 'Chemistry' : 'Biology');
    } else if (stream === 'Business/Econ') {
      subject = strengths.includes('Economics') ? 'Economics' : (strengths.includes('Mathematics') ? 'Mathematics' : 'Economics');
    } else if (strengths.length > 0) {
      subject = strengths[0];
    }
    
    let acadTitle = `Participate in high-level ${subject} Olympiad`;
    let acadDesc = `Establish subject-matter authority by preparing for and competing in a reputable regional or national competition in ${subject}.`;

    let acadSteps = [
      'Review the official syllabus and source textbooks.',
      'Complete at least 5 previous year question papers under exam conditions.',
      'Identify weak chapters and resolve problems with a study group.',
      'Register for the preliminary round of the Olympiad.'
    ];

    if (recentGpa !== null && recentGpa < 3.5) {
      acadTitle = `Academic Recovery & GPA Booster Sprint`;
      acadDesc = `Focus on raising your cumulative GPA to a more competitive range (above 3.6) by establishing rigorous study habits and seeking tutoring in ${subject}.`;
      acadSteps = [
        `Identify specific concept gaps in your ${subject} coursework.`,
        'Schedule 3 hours of weekly focused review inside the Leveled Calendar.',
        'Attend teacher office hours or peer tutoring sessions twice a week.',
        'Achieve a grade of A- or above in your next major exam to boost your average.'
      ];
    } else if (recentGpa !== null && recentGpa >= 3.8) {
      acadTitle = `Elite ${subject} Research & Science Fair Prep`;
      acadDesc = `Leverage your excellent GPA (${recentGpa}) to start early research or advanced preparation for national science fairs in ${subject}.`;
      acadSteps = [
        `Identify an advanced niche question in ${subject} going beyond standard curriculum.`,
        'Write a 1-page research design proposal with target literature resources.',
        'Find a local university mentor or school advisor to review your methodology.',
        'Register for the regional science & engineering fair (ISEF affiliate).'
      ];
    }

    milestones.push({
      id: 'mile-acad',
      title: acadTitle,
      category: 'Academic',
      description: acadDesc,
      difficulty: 'Hard',
      timeCommitment: '6-8 hours/week for 3 months',
      xpReward: 400,
      resources: [
        `Past papers and official syllabus guidelines`,
        `Art of Problem Solving (AoPS) online forums`,
        `Advanced textbooks on ${subject}`
      ],
      steps: acadSteps,
      teammates: false
    });

    // Milestone 2: Technical Project or Portfolio Showcase (Based on CS/Tech/Creative interest)
    const isTech = containsAny(interests.join(' ') + ' ' + career, ['cs', 'tech', 'coding', 'ai', 'software', 'programming', 'engineering', 'math']);
    if (isTech) {
      milestones.push({
        id: 'mile-tech',
        title: 'Build and Deploy an AI-Powered App',
        category: 'Technical',
        description: 'Design, code, and deploy an application that leverages a large language model API to solve a real student problem.',
        difficulty: 'Medium',
        timeCommitment: '5-7 hours/week for 6 weeks',
        xpReward: 500,
        resources: [
          'Vite & React documentation',
          'Vercel or Netlify for free frontend hosting',
          'OpenAI API Quickstart guides'
        ],
        steps: [
          'Brainstorm the application scope and sketch wireframes.',
          'Setup the frontend repository and configure an API proxy server.',
          'Integrate the AI endpoint and create prompt templates.',
          'Conduct testing with 5 peers and deploy the live version online.'
        ],
        teammates: true
      });
    } else {
      milestones.push({
        id: 'mile-creative',
        title: 'Create and Launch a Specialized Podcast or Newsletter',
        category: 'Creativity',
        description: `Create an independent media outlet focused on ${career || 'global issues'} to showcase your research and communication skills.`,
        difficulty: 'Medium',
        timeCommitment: '4-6 hours/week for 8 weeks',
        xpReward: 450,
        resources: [
          'Substack or Medium platform setup',
          'Spotify for Podcasters (formerly Anchor)',
          'Canva for graphic design assets'
        ],
        steps: [
          'Define the content calendar and write a 1-page editorial guide.',
          'Design the visual identity (logo, color palette) on Canva.',
          'Draft and publish your first 3 long-form articles or interview episodes.',
          'Share your publications on LinkedIn and student community channels to reach 100 subscribers.'
        ],
        teammates: true
      });
    }

    // Milestone 3: Leadership & Initiative
    milestones.push({
      id: 'mile-leader',
      title: 'Lead a School or Community Initiative',
      category: 'Leadership',
      description: 'Found a new club, lead an environmental campaign, or organize a hackathon in your school to demonstrate project management and leadership.',
      difficulty: 'Hard',
      timeCommitment: '3-4 hours/week for 2 months',
      xpReward: 600,
      resources: [
        'Club constitution template & advisor guide',
        'Leveled collaboration dashboard to recruit co-organizers',
        'Local community council event guidelines'
      ],
      steps: [
        'Draft a proposal outlining the mission, timeline, and advisor signature.',
        'Pitch the idea to your school principal or local community head.',
        'Recruit a core committee of 3-4 members and hold weekly planning sprints.',
        'Execute the launch event with at least 30 active student attendees.'
      ],
      teammates: true
    });

    // Milestone 4: Research / Academic Writing
    milestones.push({
      id: 'mile-research',
      title: 'Write and Submit a Research Paper',
      category: 'Research',
      description: `Author a 5-page research review paper on a topic at the intersection of ${interests[0] || 'Science'} and ${career || 'Technology'}.`,
      difficulty: 'Expert',
      timeCommitment: '6-8 hours/week for 12 weeks',
      xpReward: 800,
      resources: [
        'Google Scholar & ResearchGate for paper lookups',
        'Zotero for bibliography management',
        'Journal of Emerging Investigators (JEI) author guidelines'
      ],
      steps: [
        'Select a niche scientific question and draft a literature review.',
        'Gather data, conduct surveys, or code a simulation to test your hypothesis.',
        'Draft the abstract, introduction, methodology, and conclusion.',
        'Format in LaTeX/Word and submit to a high school peer-reviewed journal.'
      ],
      teammates: false
    });

    // Milestone 5: Social Impact / Volunteering (Based on Extracurriculars)
    milestones.push({
      id: 'mile-impact',
      title: 'Launch a Social Impact Campaign',
      category: 'Impact',
      description: 'Design and execute a community fundraising or educational program to address an underserved local issue.',
      difficulty: 'Medium',
      timeCommitment: '2-4 hours/week for 1 month',
      xpReward: 500,
      resources: [
        'GoFundMe or local crowdfunding guidelines',
        'Youth Volunteer Network directory',
        'Instagram & TikTok resource kits for social impact advocacy'
      ],
      steps: [
        'Identify a local food bank, shelter, or educational gap.',
        'Organize a donation drive or set up a peer-to-peer tutoring program.',
        'Reach out to local businesses for sponsorship or matching funds.',
        'Document the impact statistics (e.g. $1000 raised, 50 families fed).'
      ],
      teammates: true
    });

    if (window.LeveledApp && window.LeveledApp.state && window.LeveledApp.state.customRoadmapMilestones) {
      milestones.push(...window.LeveledApp.state.customRoadmapMilestones);
    }

    return milestones;
  },

  /**
   * Generates profile scores (out of 100) based on profile attributes and completed milestones
   */
  calculateProfileScores(user, completedMilestones = []) {
    if (!user) return { academic: 0, leadership: 0, research: 0, technical: 0, impact: 0, creativity: 0, overall: 0 };

    // Initial base scores calculated from onboarding selection
    let academic = 50;
    let leadership = 40;
    let research = 35;
    let technical = 35;
    let impact = 40;
    let creativity = 45;

    // Academic Strengths
    if (user.academicStrengths?.length) {
      academic += user.academicStrengths.length * 5;
    }
    // Interests count
    if (user.interests?.length) {
      creativity += user.interests.length * 3;
    }
    // Extracurriculars
    if (user.extracurricularInterests?.length) {
      leadership += user.extracurricularInterests.length * 4;
      impact += user.extracurricularInterests.length * 3;
    }

    // Adjust based on specific interests
    const interestsStr = (user.interests || []).join(' ').toLowerCase();
    if (interestsStr.includes('code') || interestsStr.includes('tech') || interestsStr.includes('robot')) {
      technical += 15;
    }
    if (interestsStr.includes('write') || interestsStr.includes('art') || interestsStr.includes('design') || interestsStr.includes('music')) {
      creativity += 15;
    }
    if (interestsStr.includes('debate') || interestsStr.includes('mun') || interestsStr.includes('politic')) {
      leadership += 15;
    }
    if (interestsStr.includes('science') || interestsStr.includes('biol') || interestsStr.includes('math')) {
      research += 15;
    }

    // Milestones added scores
    completedMilestones.forEach(mId => {
      if (mId === 'mile-acad') {
        academic += 15;
        research += 5;
      }
      if (mId === 'mile-tech') {
        technical += 20;
        creativity += 10;
      }
      if (mId === 'mile-creative') {
        creativity += 20;
        leadership += 5;
      }
      if (mId === 'mile-leader') {
        leadership += 20;
        impact += 15;
      }
      if (mId === 'mile-research') {
        research += 25;
        academic += 10;
      }
      if (mId === 'mile-impact') {
        impact += 20;
        leadership += 10;
      }
    });

    // Cap at 100
    academic = Math.min(Math.round(academic), 100);
    leadership = Math.min(Math.round(leadership), 100);
    research = Math.min(Math.round(research), 100);
    technical = Math.min(Math.round(technical), 100);
    impact = Math.min(Math.round(impact), 100);
    creativity = Math.min(Math.round(creativity), 100);

    const overall = Math.round((academic + leadership + research + technical + impact + creativity) / 6);

    return { academic, leadership, research, technical, impact, creativity, overall };
  },

  /**
   * Generates a university readiness evaluation
   */
  evaluateUniversityReadiness(uni, profileScores) {
    // Score based on weighted metrics
    const wAcad = uni.weightAcademics / 100;
    const wTech = uni.weightTechnical / 100;
    const wRes = uni.weightResearch / 100;
    const wLead = uni.weightLeadership / 100;
    const wImp = uni.weightImpact / 100;

    let score = (profileScores.academic * wAcad) +
                (profileScores.technical * wTech) +
                (profileScores.research * wRes) +
                (profileScores.leadership * wLead) +
                (profileScores.impact * wImp);

    // Scaling adjustments
    score = Math.min(Math.round(score), 100);

    // Readiness Analysis
    const strong = [];
    const weak = [];
    const gaps = [];
    const recs = [];

    // Analyze gaps
    if (profileScores.academic < 80 && uni.weightAcademics >= 25) {
      weak.push('Academic Rigor');
      gaps.push('Your standardized scores or academic challenges need backing.');
      recs.push(`Study and take advanced AP exams or sit for competitive exams like Olympiads.`);
    } else {
      strong.push('Academic Foundation');
    }

    if (profileScores.technical < 75 && uni.weightTechnical >= 20) {
      weak.push('Technical Complexity');
      gaps.push('Lack of advanced building, system design, or engineering documentation.');
      recs.push('Build a custom open-source application and publish the repository on GitHub.');
    } else if (uni.weightTechnical >= 15) {
      strong.push('Technical Project Portfolio');
    }

    if (profileScores.research < 70 && uni.weightResearch >= 20) {
      weak.push('Academic Research');
      gaps.push('No formal scientific methodology or long-form publication drafts.');
      recs.push('Collaborate with a university researcher or publish in high school science journals.');
    } else if (uni.weightResearch >= 15) {
      strong.push('Independent Research Capabilities');
    }

    if (profileScores.leadership < 70 && uni.weightLeadership >= 15) {
      weak.push('Executive Leadership');
      gaps.push('Absence of officer roles, club founding, or organizational oversight.');
      recs.push('Establish a club chapter at your school or organize a regional conference.');
    } else if (uni.weightLeadership >= 15) {
      strong.push('Leadership Initiative');
    }

    if (profileScores.impact < 70 && uni.weightImpact >= 15) {
      weak.push('Community Social Impact');
      gaps.push('No measurable volunteer metrics or local community change initiatives.');
      recs.push('Start a local fundraiser or direct action campaign to help local shelters.');
    } else if (uni.weightImpact >= 15) {
      strong.push('Measurable Social Impact');
    }

    // Default strong/weak filling in case
    if (strong.length === 0) strong.push('General Potential');
    if (weak.length === 0) weak.push('No obvious weaknesses! Maintain consistency.');
    if (recs.length === 0) recs.push('Keep maintaining your profile streak and updating your accomplishments!');

    return {
      score,
      strong,
      weak,
      gaps,
      recs
    };
  },

  /**
   * Simulates Chat responses for the AI Mentor
   */
  getMentorResponse(message, user, chatHistory = []) {
    const name = user?.name || 'Student';
    const major = user?.careerGoals || 'your goals';
    const interests = (user?.interests || []).join(', ');
    const country = user?.country || '';
    const city = user?.city || '';
    const locationStr = city ? `${city}, ${country}` : country;

    // Country-specific exam recommendations
    const COUNTRY_EXAMS = {
      'United States': ['SAT / ACT', 'AP Exams (CS, Math, Physics)', 'AMC / AIME Math Competitions'],
      'United Kingdom': ['A-Levels', 'GCSE / IGCSE', 'UK Mathematics Trust Challenge', 'Oxbridge Admissions Tests (MAT, PAT, TSA)'],
      'India': ['JEE Main / Advanced (Engineering)', 'NEET (Medicine)', 'National Science Olympiads (NSO/NCO)', 'KVPY Fellowship'],
      'Canada': ['SAT / ACT (for US apps)', 'Waterloo Math Contests', 'Shad Canada Application'],
      'Australia': ['ATAR Exams', 'Australian Mathematics Competition', 'UNSW ICAS Assessments'],
      'Singapore': ['A-Levels / IB', 'Singapore Math Olympiad', 'NUS/NTU Aptitude Tests'],
      'UAE': ['EmSAT', 'IB / A-Levels', 'Dubai Future Accelerators Youth Track'],
      'Nigeria': ['WAEC / NECO', 'JAMB UTME', 'Cowbell Mathematics Competition'],
      'Pakistan': ['MDCAT / ECAT', 'A-Levels / FSc', 'National Science Olympiad'],
      'Germany': ['Abitur', 'TestAS', 'German Mathematics Olympiad'],
      'Japan': ['EJU (for international)', 'JLPT', 'University Entrance Exams (共通テスト)'],
    };

    // Normalize message
    const msg = message.toLowerCase();

    // 1. Next actions / What to do next
    if (containsAny(msg, ['next', 'what should i do', 'action', 'todo', 'plan', 'roadmap'])) {
      return `Hi ${name}! Based on your interest in **${interests || 'growth'}** and career goal in **${major}**, here are the priority actions I suggest:
      
1. **Optimize Your Roadmap:** Head to the [Roadmap](#roadmap) tab. I suggest starting with the *Olympiad preparation* or *technical project* milestone.
2. **Explore Matches:** I've surfaced highly matching opportunities in the [Opportunities](#discovery) page${country ? `, including ones accessible from **${country}**` : ''}.
3. **Extracurricular Activities:** Head to the [Extracurriculars](#extracurriculars) panel to brainstorm a passion project blueprint or outline a research paper target.
      
Which of these would you like to plan out first?`;
    }

    // 2. University admissions / College prep
    if (containsAny(msg, ['uni', 'college', 'admission', 'mit', 'stanford', 'harvard', 'ivy'])) {
      return `For top tier universities like MIT, Stanford, and Harvard, admissions officers look for a "spike" rather than a well-rounded average profile.
      
Here is my advice for your profile:
- **For MIT/Stanford:** Focus heavily on your **Technical and Research scores** (currently visible in your [Readiness](#readiness) panel). They want to see that you can build stuff that actually works or publish novel findings.
- **For Harvard:** Focus on your **Leadership and Impact scores**. You need to demonstrate character, initiative, and the ability to influence peers.
${country && country !== 'United States' ? `\n- **International Applicant Tip (${country}):** International students need to demonstrate even stronger "spikes." Consider taking **standardized tests** like SAT/ACT to validate your academics for US schools. Also highlight unique experiences from your local context in ${locationStr || country} — admissions love diverse perspectives!` : ''}
      
I recommend choosing your target in the [University Readiness](#readiness) section, which will automatically extract your custom gaps!`;
    }

    // 2.5 Degree / Major / Bachelor / Graduate recommendations
    if (containsAny(msg, ['degree', 'major', 'bachelor', 'study', 'what course', 'what program', 'undergrad program', 'graduate program'])) {
      const grade = user?.grade || '';
      const isCollegeStudent = (grade && (
        grade.toLowerCase().includes('college') || 
        grade.toLowerCase().includes('undergrad') || 
        grade.toLowerCase().includes('university') || 
        grade.toLowerCase().includes('freshman') || 
        grade.toLowerCase().includes('sophomore') || 
        grade.toLowerCase().includes('junior') || 
        grade.toLowerCase().includes('senior') ||
        grade.toLowerCase().includes('graduate')
      ));

      let degreeRec = '';
      if (isCollegeStudent) {
        // Recommend Graduate degree paths (Master's, PhD, MBA)
        if (containsAny(major, ['cs', 'tech', 'coding', 'ai', 'software', 'programming', 'engineering', 'math'])) {
          degreeRec = `Since you are already in college/undergrad focusing on **${major}**, if you wish to specialize further and lead advanced engineering teams, I recommend targeting a **Master of Science (M.S.) in Computer Science (specializing in AI/ML)** or a **Ph.D. in Computer Science/Robotics**. For industry acceleration, a Master in Engineering Management (MEM) is also highly valuable.`;
        } else if (containsAny(major, ['business', 'entrepreneur', 'finance', 'consulting', 'management'])) {
          degreeRec = `Since you are already in college/undergrad, for a career in **${major}**, the gold standard is a **Master of Business Administration (MBA)** (typically after 2-4 years of work experience) or a specialized **M.S. in Quantitative Finance or Business Analytics** to secure roles in investment banking or management consulting.`;
        } else if (containsAny(major, ['medical', 'doctor', 'bio', 'health', 'science'])) {
          degreeRec = `For a career in **${major}**, you should prepare for **Medical School (M.D./D.O.)** or a **Ph.D. in Biomedical Sciences/Bioinformatics** depending on whether you want to practice clinically or lead laboratory research.`;
        } else if (containsAny(major, ['design', 'ui', 'ux', 'art', 'game'])) {
          degreeRec = `For advanced design roles in **${major}**, you can target a **Master of Design (M.Des.) in Interaction Design** or a **Master of Science in Human-Computer Interaction (HCI)**.`;
        } else {
          degreeRec = `For advanced paths in **${major}**, I recommend targeting a specialized **Master's or Ph.D. program** that aligns with your research or corporate recruitment goals.`;
        }
        return `Hi ${name}! As an undergraduate/graduate focusing on **${major}**, here is the graduate degree path I recommend:
        
${degreeRec}

**Key Roadmap Tip:** Graduate schools and top recruiters prioritize real-world deliverables. Focus on securing research assistantships, publishing preprints, and keeping your Leveled Portfolio updated with case study evidence!

Would you like to explore preparation timelines for graduate admissions (like GRE/GMAT prep) or corporate recruitment cycles?`;
      } else {
        // Recommend Bachelors / Undergraduate degrees
        if (containsAny(major, ['cs', 'tech', 'coding', 'ai', 'software', 'programming', 'engineering', 'math'])) {
          degreeRec = `For a career in **${major}**, I highly recommend pursuing a **Bachelor of Science (B.S.) in Computer Science, Computer Engineering, or Data Science**. Focus on universities that offer specialized coursework in Machine Learning, Algorithms, and Software Engineering.`;
        } else if (containsAny(major, ['business', 'entrepreneur', 'finance', 'consulting', 'management'])) {
          degreeRec = `For a career in **${major}**, you should target a **Bachelor of Business Administration (BBA) or a B.S. in Finance, Economics, or Management Science**. Look for programs with strong case-study methods, venture incubators, and finance labs.`;
        } else if (containsAny(major, ['medical', 'doctor', 'bio', 'health', 'science'])) {
          degreeRec = `For a career in **${major}**, a **B.S. in Biology, Biochemistry, or Biomedical Sciences** is the ideal pre-med or research path. Make sure your target university provides undergraduate research opportunities in molecular biology or clinical shadowing.`;
        } else if (containsAny(major, ['design', 'ui', 'ux', 'art', 'game'])) {
          degreeRec = `For a career in **${major}**, I recommend a **Bachelor of Fine Arts (BFA) in Interaction Design, a B.S. in Human-Computer Interaction (HCI), or a Bachelor of Graphic Design**. Focus on schools with strong portfolio building programs and interdisciplinary design labs.`;
        } else {
          degreeRec = `For a career in **${major}**, I recommend pursuing a **B.S. or B.A. in a closely aligned major (e.g. Economics, Public Policy, or Engineering)**. Tailor your electives to build quantitative and communication skills.`;
        }
        return `Hi ${name}! Since your goal is **${major}**, here is the degree path I recommend for you:
        
${degreeRec}

**Key Roadmap Tip:** Top universities look for alignment between your current high school projects and your intended major. You can build credibility by listing relevant courses, AP/A-Level choices, or self-study certifications in your Leveled Calendar and Portfolio!

Would you like me to suggest some specific university programs or online preparatory courses for this degree?`;
      }
    }

    // 3. Opportunities / Competitions (NEW - location-aware)
    if (containsAny(msg, ['opportunit', 'competition', 'contest', 'program', 'discover'])) {
      const localExams = AISimulator.getExamsForUser(user);
      let response = `Great question, ${name}! Here's what I recommend based on your profile${country ? ` in **${locationStr || country}**` : ''}:\n\n`;
      
      if (localExams.length > 0) {
        response += `**📍 Accessible from ${country}:**\n`;
        localExams.forEach(e => { response += `- ${e}\n`; });
        response += `\n`;
      }
      
      response += `**🌍 Global Opportunities (open to everyone):**\n`;
      response += `- International Olympiad in Informatics (IOI)\n`;
      response += `- Rise Global Challenge — lifelong scholarship for 100 teens\n`;
      response += `- Regeneron ISEF — world's largest pre-college science fair\n`;
      response += `- Google Summer of Code (GSoC) — online, remote\n\n`;
      response += `Check the [Opportunities](#extracurriculars) tab — I've tagged each one with location badges so you can quickly spot what's accessible to you!`;
      
      return response;
    }

    // 4. Exams / Tests (NEW - location-aware)
    if (containsAny(msg, ['exam', 'test', 'sat', 'act', 'jee', 'neet', 'a-level', 'ap ', 'standardized'])) {
      const localExams = AISimulator.getExamsForUser(user);
      let response = `Here are the key exams I recommend for you${country ? ` in **${country}**` : ''}, ${name}:\n\n`;
      
      if (localExams.length > 0) {
        response += `**📍 Priority Exams for ${country}:**\n`;
        localExams.forEach(e => { response += `- ✅ ${e}\n`; });
      }
      
      if (country && country !== 'United States') {
        response += `\n**🇺🇸 If applying to US universities:**\n`;
        response += `- SAT or ACT (most US universities accept both)\n`;
        response += `- AP Exams in your subject area (strong differentiator)\n`;
        response += `- TOEFL/IELTS (if English isn't your first language)\n`;
      }
      
      response += `\nUse the [Calendar](#calendar) to schedule study sessions, and I'll help you build a prep plan!`;
      return response;
    }

    // 5. Scholarships (NEW)
    if (containsAny(msg, ['scholarship', 'financial', 'funding', 'afford', 'money'])) {
      let response = `Here are scholarship opportunities I recommend for you, ${name}:\n\n`;
      response += `**🌍 Global Scholarships:**\n`;
      response += `- **Rise Global Challenge** — Full lifelong funding + mentorship for 100 selected teens\n`;
      response += `- **United World Colleges (UWC)** — Full scholarships to study IB abroad\n`;
      response += `- **Questbridge** — Full-ride partnerships with top US universities\n\n`;
      
      if (country && country !== 'United States') {
        response += `**📍 Tips for students in ${country}:**\n`;
        response += `- Many US universities offer **need-blind admissions for international students** (MIT, Harvard, Yale, Princeton, Amherst)\n`;
        response += `- Apply for **local government scholarships** in ${country} for studying abroad\n`;
        response += `- Check if your dream university offers specific **${country} scholarships**\n\n`;
      }
      
      response += `Strengthen your profile with extracurriculars and a strong portfolio — that's the best scholarship strategy!`;
      return response;
    }

    // 6. Weaknesses / Profile improvements
    if (containsAny(msg, ['weak', 'improve', 'strengthen', 'gap', 'score', 'score breakdown'])) {
      return `Looking closely at your current profile breakdown, ${name}:
      
- **Your Strength Zone:** Your profile shows promising capability in academic strengths.
- **Your Primary Gap:** You need more **Leadership** or **Research** experiences. High-tier universities and scholarship boards want to see you leading initiatives rather than just being a member.
      
**Next Step Recommendation:** Try generating an extracurricular idea focused on leadership in the [Extracurriculars](#extracurriculars) tab. I will generate a step-by-step launch roadmap for you!`;
    }

    // 7. Essays / Writing
    if (containsAny(msg, ['essay', 'write', 'critique', 'statement of purpose'])) {
      return `I can help you review and grade your college application essays! Go ahead and visit the [Essay Review Studio](#essay) page. 
      
Paste your draft there, and I will analyze it across:
- **Structure and Flow**
- **Authenticity and Storytelling**
- **Grammar and Clarity**
- **Personal Reflection**
      
*Note: I will not write the essay for you, but I will give you a complete revision checklist!*`;
    }

    // 8. Help / Greeting
    if (containsAny(msg, ['hello', 'hi', 'hey', 'help', 'who are you'])) {
      return `Yo ${name}! I'm Ivy, your AI Advisor, and we are lowkey about to cook up a crazy portfolio${country ? ` for **${locationStr || country}**` : ''}, fr fr. I'm here to make sure you have that main character energy for college apps.
      
Here are some things you can ask me:
- *"What opportunities are available in my country?"*
- *"What exams should I prepare for?"*
- *"How do I get into my dream university?"*
- *"Can you review my essay drafts?"*
- *"What scholarships am I eligible for?"*
      
What's on your mind today? Let's get it!`;
    }

    // Default Fallback
    return `Bruh, that's lowkey a solid question, ${name}. Fr fr though, let's translate that energy into a concrete **Extracurricular Activity**! Bet you'd cook up something crazy on the [Extracurriculars Showcase](#extracurriculars) — go outline it, and I'll draft a step-by-step roadmap for you, no cap. 🚀`;
  },

  /**
   * Generates custom project ideas
   */
  generateProjectIdeas(criteria) {
    const { interests, skills, goals, time, budget, resources } = criteria;
    const hours = parseInt(time) || 5;

    const ideas = [];

    // Idea 1: Tech/AI Project
    ideas.push({
      title: `AI-Powered Helper for ${interests || 'Students'}`,
      overview: `A web or mobile application designed to solve a productivity or resource gap for youth interested in ${interests || 'learning'}. Uses standard AI APIs.`,
      difficulty: hours >= 8 ? 'Hard' : 'Medium',
      learningOutcomes: ['Full-stack integration', 'API orchestration', 'Git workflows', 'User research'],
      portfolioValue: 'Shows practical software development expertise, user-centered design, and independent problem-solving skills.',
      timeEstimate: `${hours * 6} hours total (6 weeks at ${hours}h/week)`,
      steps: [
        'Research 5 peers to list their biggest pain points.',
        'Setup a GitHub repository and write a simple frontend form.',
        'Integrate a serverless function to talk to an AI chat API.',
        'Launch a beta version, collect user feedback, and write a repository README detailing code structure.'
      ]
    });

    // Idea 2: Research & Editorial Project
    ideas.push({
      title: `Independent Research Review: The Future of ${goals || 'Technology'}`,
      overview: `A comprehensive literature review paper analyzing recent peer-reviewed studies on a critical sub-issue in ${goals || 'your field'}.`,
      difficulty: 'Hard',
      learningOutcomes: ['Academic citation standards', 'Information synthesis', 'Critical analysis', 'Scientific writing'],
      portfolioValue: 'Exhibits deep intellectual vitality, academic discipline, and publication readiness.',
      timeEstimate: `${hours * 8} hours total (8 weeks at ${hours}h/week)`,
      steps: [
        'Collect at least 15 research papers from Google Scholar on the topic.',
        'Draft a 1-page outline defining the critical debate points.',
        'Write the 2,500-word manuscript detailing the history, current limits, and future outlook.',
        'Submit the manuscript to high school peer journals or publish it publicly on a Substack blog.'
      ]
    });

    // Idea 3: Community Organization / Social Initiative
    ideas.push({
      title: `The ${interests || 'Youth'} Action Network`,
      overview: `A localized community volunteer group or advocacy club to educate local school children on ${interests || 'important topics'}.`,
      difficulty: 'Medium',
      learningOutcomes: ['Public relations', 'Leadership', 'Resource budgeting', 'Public speaking'],
      portfolioValue: 'Provides powerful proof of leadership, team leadership, social accountability, and execution capability.',
      timeEstimate: `${hours * 4} hours total (4 weeks at ${hours}h/week)`,
      steps: [
        'Create an informational slide deck and design promotional graphics.',
        'Pitch the program to local community centers or school club advisors.',
        'Organize a 1-day workshop or clean-up drive with at least 10 volunteers.',
        'Create a social media post showing metrics (students tutored, trash collected, or funds raised).'
      ]
    });

    return ideas;
  },

  /**
   * Evaluates essay text and returns feedback
   */
  critiqueEssay(essayText, promptDetails) {
    const wordCount = essayText.split(/\s+/).filter(w => w.length > 0).length;
    
    // Rubric calculations
    let scoreStructure = 6;
    let scoreStory = 5;
    let scoreGrammar = 7;
    let scoreImpact = 5;

    // Check factors in text
    if (wordCount > 250) {
      scoreStructure += 2;
    }
    if (containsAny(essayText, ['i learned', 'realized', 'my perspective', 'transformed', 'grew'])) {
      scoreStory += 3;
    }
    if (containsAny(essayText, ['because', 'therefore', 'consequently', 'furthermore', 'for example'])) {
      scoreStructure += 1;
    }
    if (containsAny(essayText, ['achieved', 'launched', 'created', 'helped', 'improved', 'percent', 'dollars'])) {
      scoreImpact += 3;
    }
    if (wordCount > 650) {
      scoreGrammar -= 1; // Penalty for overly long essays (usually has fluff)
    }

    // Limit scores
    scoreStructure = Math.min(scoreStructure, 10);
    scoreStory = Math.min(scoreStory, 10);
    scoreGrammar = Math.min(scoreGrammar, 10);
    scoreImpact = Math.min(scoreImpact, 10);

    const overall = Math.round(((scoreStructure + scoreStory + scoreGrammar + scoreImpact) / 40) * 100);

    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    const checklist = [
      { text: 'Proofread for passive voice verbs', done: false },
      { text: 'Verify word count conforms to limits', done: wordCount <= 650 },
      { text: 'Ensure the introduction has a hook', done: essayText.length > 150 },
      { text: 'Make body paragraphs focus on personal actions', done: scoreStory >= 8 },
      { text: 'Quantify impact (numbers, percentages, scales)', done: scoreImpact >= 8 }
    ];

    if (scoreStory >= 8) {
      strengths.push('Strong authentic voice. The narrative shows vulnerability and reflection.');
    } else {
      weaknesses.push('Overly descriptive of the event, but lacking in personal reflection.');
      suggestions.push('Shift the focus from "what happened" to "how it changed my thinking" (use the 30% description, 70% reflection rule).');
    }

    if (scoreImpact >= 8) {
      strengths.push('Excellent impact metrics. The essay clearly shows the outcomes of your actions.');
    } else {
      weaknesses.push('Abstract statements of helpfulness without concrete metrics.');
      suggestions.push('Add specific numbers: How many people did you tutor? How much money did you raise? How long did the project run?');
    }

    if (scoreStructure >= 8) {
      strengths.push('Clear logical transitions between paragraphs.');
    } else {
      weaknesses.push('Weak paragraph transitions. The narrative jumps abruptly.');
      suggestions.push('Create a clean chronological flow: Hook -> Context -> Crisis/Challenge -> Action -> Growth/Outcome.');
    }

    if (wordCount < 150) {
      weaknesses.push('The draft is too brief to show deep self-reflection.');
      suggestions.push('Elaborate on the challenges you faced and how they forced you to acquire new skills.');
    }

    // Default fills
    if (strengths.length === 0) strengths.push('Competent grammar and spell check cleanliness.');
    if (weaknesses.length === 0) weaknesses.push('No critical flaws found. Refine vocabulary selection.');
    if (suggestions.length === 0) suggestions.push('Have a fresh set of eyes proofread for tone pacing.');

    return {
      wordCount,
      scores: {
        structure: scoreStructure,
        story: scoreStory,
        grammar: scoreGrammar,
        impact: scoreImpact,
        overall
      },
      strengths,
      weaknesses,
      suggestions,
      checklist
    };
  },

  /**
   * Generates custom research paper topics
   */
  generateResearchSuggestions(interests, career) {
    const list = [];
    const mainField = interests || 'STEM';

    list.push({
      title: `The Impact of Machine Learning Algorithms in Analyzing ${mainField} Datasets`,
      field: `Computational Science & ${mainField}`,
      abstract: `This paper explores how convolutional neural networks or random forest regressions can be utilized to automate the feature analysis and categorization of data anomalies within ${mainField}.`,
      methodology: `1. Retrieve 3 open-source datasets from Kaggle/NCBI relating to ${mainField}.\n2. Pre-process datasets in Python (clean missing entries, normalize scales).\n3. Train and compare 3 classifiers: Random Forest, SVM, and a simple neural network.\n4. Document precision, recall, and F1 accuracy curves, highlighting the model performance.`,
      journals: ['IEEE Access', 'Journal of Emerging Investigators', 'National High School Journal of Science'],
      portfolioValue: 'Demonstrates deep analytical rigor, programming competence, and the ability to apply computer science to complex domain questions.',
      difficulty: 'Expert',
      timeEstimate: '10-12 hours/week for 8 weeks'
    });

    list.push({
      title: `Socio-Economic Barriers and Novel Resource Allocation Methods in ${career || 'Public Health'}`,
      field: `Environmental Economics & Policy`,
      abstract: `A comparative policy critique examining the distribution inefficiencies in local municipal services, proposing a decentralized routing framework for resources in ${career || 'modern sectors'}.`,
      methodology: `1. Review 15 peer-reviewed policy manuals detailing municipality resource distribution.\n2. Design a standardized 10-question survey distributed to 50 local citizens to isolate resource bottlenecks.\n3. Formulate a mathematical allocation model using linear programming optimization in Excel.\n4. Write the policy review and submit recommendations to the local city council.`,
      journals: ['Harvard College Economics Review', 'Undergraduate Journal of Politics', 'Journal of Youth Initiatives'],
      portfolioValue: 'Exhibits active civic awareness, quantitative policy analysis skills, and strong public policy writing capabilities.',
      difficulty: 'Hard',
      timeEstimate: '6-8 hours/week for 6 weeks'
    });

    list.push({
      title: `A Literature Synthesis: Reviewing Next-Generation Materials for Enhancing ${mainField} Efficiency`,
      field: `Materials Science & Engineering`,
      abstract: `Synthesizing 20+ recent publications between 2021-2026 to evaluate the mechanical limitations and chemical properties of novel materials applied within ${mainField}.`,
      methodology: `1. Conduct systematic query search in Google Scholar and PubMed for the materials.\n2. Extract performance data matrices (tensile strength, thermodynamic limits, cost per unit).\n3. Draft a comparative summary table highlighting the materials strengths/weaknesses.\n4. Analyze scaling bottlenecks and propose 3 directions for future laboratory experiments.`,
      journals: ['Nature Nanotechnology (Student reviews)', 'Scientific American (High School)', 'Journal of Materials Research'],
      portfolioValue: 'Proves advanced subject knowledge, scholarly database navigation ability, and systematic academic paper structure competence.',
      difficulty: 'Medium',
      timeEstimate: '4-6 hours/week for 4 weeks'
    });

    return list;
  },

  /**
   * Evaluates student custom project or research ideas
   */
  critiqueIdea(ideaText, type = 'project') {
    const text = ideaText.trim();
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    let rigor = 5;
    let appeal = 5;
    let feasibility = 7;

    const strengths = [];
    const weaknesses = [];
    const suggestions = [];
    const nextSteps = [];

    if (wordCount < 15) {
      return {
        tooShort: true,
        feedback: 'Your idea pitch is too brief for an AI evaluation. Please write at least 2-3 sentences (20+ words) detailing your core concept, goals, and target resources!'
      };
    }

    // Evaluate based on keywords
    const lower = text.toLowerCase();
    
    if (containsAny(lower, ['ai', 'machine learning', 'algorithm', 'neural network', 'cnn', 'dataset', 'code', 'python'])) {
      rigor += 3;
      feasibility -= 1; // Tech is harder
      strengths.push('High technical complexity. Utilizing programming and ML shows analytical depth.');
      suggestions.push('Keep the model scope narrow. Do not try to train a model from scratch; use pre-trained weights (HuggingFace, OpenAI APIs) and fine-tune them.');
      nextSteps.push('Set up a GitHub repository and draft your system architecture flow diagram.');
    } else {
      feasibility += 1;
      strengths.push('Accessible project scope. High probability of completion within standard schedules.');
    }

    if (containsAny(lower, ['research', 'paper', 'literature review', 'academic', 'study', 'journals'])) {
      rigor += 2;
      appeal += 2;
      strengths.push('Focuses on academic research structure which highly appeals to selective universities.');
      suggestions.push('Clearly define your research question. A broad topic is hard to evaluate; focus on a specific sub-niche (e.g., "instead of cancer", focus on "a specific receptor").');
      nextSteps.push('Gather at least 10 peer-reviewed papers on Google Scholar and save them in Zotero.');
    }

    if (containsAny(lower, ['nonprofit', 'social impact', 'volunteer', 'community', 'campaign'])) {
      appeal += 3;
      strengths.push('Strong civic alignment. Demonstrates community empathy and leadership initiative.');
      suggestions.push('Focus on measurable impact. Admissions officers look for numbers: How many meals? How much funding? How many active volunteers?');
      nextSteps.push('Define your 1-month impact target metrics and design a basic website landing page (Linktree/Carrd).');
    }

    if (containsAny(lower, ['startup', 'business', 'marketing', 'product', 'customer', 'revenue'])) {
      appeal += 2;
      feasibility -= 1;
      strengths.push('Entrepreneurial mindset. Shows resourcefulness and market-driven thinking.');
      suggestions.push('Build a Minimum Viable Product (MVP) first. Do not spend months building; launch a simple landing page to collect email signups first to test demand.');
      nextSteps.push('Conduct customer validation interviews with 15 target users in your market.');
    }

    // Word count additions
    if (wordCount > 60) {
      rigor += 1;
      appeal += 1;
    }

    // Limit ranges
    rigor = Math.min(rigor, 10);
    appeal = Math.min(appeal, 10);
    feasibility = Math.min(feasibility, 10);

    const overall = Math.round(((rigor + appeal + feasibility) / 30) * 100);

    if (rigor < 6) {
      weaknesses.push('Low academic rigor or technical depth. The concept feels generic.');
      suggestions.push('Elevate the complexity: Can you add a data collection phase, or automate a process using a Python script, or base it on a peer review framework?');
    }
    if (feasibility < 6) {
      weaknesses.push('High execution bottleneck. The scope might be too massive for a single student.');
      suggestions.push('Reduce features. Focus on doing ONE thing extremely well before scaling.');
    }

    if (strengths.length === 0) strengths.push('Clear personal motivation behind the project.');
    if (weaknesses.length === 0) weaknesses.push('Scope is well-balanced. No critical bottlenecks identified.');
    if (suggestions.length === 0) suggestions.push('Define your advisor (a teacher, mentor, or senior student) to review milestones.');
    if (nextSteps.length === 0) nextSteps.push('Set up your project deadline in the Leveled Calendar to begin logging hours.');

    return {
      tooShort: false,
      scores: {
        rigor,
        appeal,
        feasibility,
        overall
      },
      strengths,
      weaknesses,
      suggestions,
      nextSteps
    };
  },

  /**
   * Contextual Q&A advice about a specific extracurricular project
   */
  simulateExtracurricularAdvice(title, query) {
    const q = query.toLowerCase();
    
    // Default reply
    let reply = `That is a great question regarding your extracurricular project "${title}". To make this project highly competitive for top-tier university admissions, focus on documenting your systematic steps. Try to define clear outcomes, gather feedback, and log all milestones.`;
    
    if (containsAny(q, ['start', 'begin', 'how to', 'first step', 'steps'])) {
      reply = `To get started with "${title}", your first step should be to outline the project's scope. Draft a 1-page proposal detailing:
      1. What problem you are solving.
      2. Your target audience or user base.
      3. A list of 4 key milestones.
      Define a folder or repository and log this proposal as your first sprint milestone!`;
    }
    else if (containsAny(q, ['evidence', 'verify', 'prove', 'outcome', 'upload'])) {
      reply = `Admissions officers value verified outcomes! For "${title}", you can upload several types of evidence:
      - **Photos/Screenshots:** Upload a photo showing the live prototype or event outcome.
      - **PDF Documents:** Upload project proposals, research abstracts, survey spreadsheets, or certificates.
      - **Links:** Direct links to public GitHub repos, live websites, YouTube demo videos, or Substack newsletters.
      Any evidence logged is automatically synced as an artifact in your Portfolio showcase gallery!`;
    }
    else if (containsAny(q, ['resource', 'book', 'tools', 'software', 'stack'])) {
      if (title.toLowerCase().includes('robot') || title.toLowerCase().includes('hardware')) {
        reply = `For a robotics project like "${title}", I recommend using:
        - **Hardware:** Arduino Uno or Raspberry Pi Pico for microcontrollers.
        - **CAD Design:** Fusion 360 or Tinkercad (free for students) to model custom parts.
        - **Sensors:** HC-SR04 ultrasonic sensors for distance detection, or MPU6050 gyro sensors.
        - **Resources:** Instructables and the official Arduino forums contain excellent sample schematics.`;
      } else if (title.toLowerCase().includes('research') || title.toLowerCase().includes('paper') || title.toLowerCase().includes('analysis')) {
        reply = `For academic research like "${title}", these resources are essential:
        - **Search:** Google Scholar and Semantic Scholar to locate peer-reviewed studies.
        - **Reference Management:** Zotero or Mendeley to automatically format MLA/APA citations.
        - **Data Analysis:** Python (using pandas and matplotlib libraries) or Google Sheets.
        - **Writing:** Overleaf (LaTeX) for clean, professional mathematical typesetting.`;
      } else {
        reply = `For "${title}", I recommend using these standard tools:
        - **Design:** Canva or Figma for wireframes, presentation decks, and logos.
        - **Execution:** Google Docs for drafting proposals and Google Sheets to log surveys or timelines.
        - **Advisors:** Reach out to a school teacher or local professional in this field to act as a project advisor.`;
      }
    }
    else if (containsAny(q, ['university', 'admissions', 'portfolio', 'mit', 'stanford', 'college'])) {
      reply = `Selective universities want to see "candidate spikes"—deep competence in a specific area. For "${title}", ensure you don't just participate passively. Aim to:
      1. **Show Leadership:** Expand the project by running a club, organizing a hackathon, or training other students.
      2. **Generate Real Impact:** Get actual users, run surveys, or submit your findings to secondary school science journals.
      3. **Showcase it:** Ensure your Portfolio website highlights this capstone prominently with files and outcome notes.`;
    }
    
    return reply;
  },

  /**
   * Contextual Q&A advice about how to study / prepare for a specific opportunity
   */
  simulateOpportunityAdvice(name, query) {
    const q = query.toLowerCase();
    
    // Default reply
    let reply = `Preparing for **${name}** requires a targeted strategy. I recommend reviewing previous exam/competition formats, setting up a structured study schedule in your Leveled Calendar, and gathering recommended prep materials.`;
    
    if (containsAny(q, ['study', 'prepare', 'how to', 'succeed', 'learn'])) {
      reply = `To prepare effectively for **${name}**, follow this study blueprint:
      1. **Understand the Format:** Analyze past question papers or guidelines to know exactly what is tested (e.g. time limits, languages, or presentation style).
      2. **Master Fundamentals:** Re-study core concepts (for coding, focus on algorithms and data structures; for research, focus on methodology and reading literature).
      3. **Timed Practice:** Take practice tests or draft mock submissions under realistic constraints.
      4. **Get Feedback:** Share your work or code with peers or mentors for critique.`;
    }
    else if (containsAny(q, ['resource', 'book', 'link', 'material', 'practice', 'past paper'])) {
      reply = `Here are the top prep resources for **${name}**:
      - **Official Site:** Check their main website for past problems, archives, and rules.
      - **Online Communities:** Forums like Reddit (e.g., r/cscareerquestions, r/physics), Discord groups, or competitive programming platforms (Codeforces, LeetCode).
      - **Study Guides:** Look for open-source GitHub repositories containing study sheets, checklists, and recommended textbooks.`;
    }
    else if (containsAny(q, ['evidence', 'portfolio', 'record'])) {
      reply = `You can log preparation milestones for **${name}** using the **📎 Log Preparation Evidence** button. Good evidence items include:
      - Solutions to difficult practice problems or code commits on GitHub.
      - Drafts of your application essays or pitch deck slides.
      - Screenshots of practice score summaries or certificates of completion for preparatory courses.
      Logging evidence automatically publishes these milestones to your Portfolio showcase page!`;
    }
    
    return reply;
  },

  /**
   * Automatically generates a description for an achievement
   */
  generateAchievementDescription(title, category) {
    const templates = {
      'Award': [
        `Awarded for exceptional performance in \${title}. Demonstrated strategic thinking, dedication, and excellence against a highly competitive field.`,
        `Secured top honors in \${title}, showcasing a deep understanding of the subject matter and a commitment to academic excellence.`
      ],
      'Sports': [
        `Led the team to victory in \${title}. Demonstrated strong teamwork, leadership under pressure, and physical endurance.`,
        `Achieved outstanding athletic results in \${title}. Displayed immense discipline, rigorous training ethics, and competitive drive.`
      ],
      'Music': [
        `Delivered an outstanding performance at \${title}. Highlighted years of dedicated practice, technical mastery, and artistic expression.`,
        `Showcased exceptional musical talent in \${title}, earning recognition for creativity, precision, and passion.`
      ],
      'Arts': [
        `Created and exhibited award-winning work in \${title}. Demonstrated an innovative approach to visual storytelling and design principles.`,
        `Recognized for outstanding artistic vision in \${title}, showcasing advanced technical skills and unique creative expression.`
      ],
      'STEM': [
        `Achieved top placement in \${title}. Demonstrated advanced problem-solving skills, rigorous analytical thinking, and a passion for scientific inquiry.`,
        `Developed innovative solutions in \${title}. Applied complex theoretical concepts to practical challenges with measurable success.`
      ],
      'Certificate': [
        `Successfully completed \${title}, acquiring advanced knowledge and practical skills directly applicable to real-world scenarios.`,
        `Earned certification in \${title}, demonstrating a commitment to continuous learning and professional development.`
      ],
      'Volunteer': [
        `Dedicated significant time and effort to \${title}. Made a measurable positive impact on the community through compassionate service.`,
        `Led community initiatives for \${title}. Demonstrated strong civic responsibility and a commitment to helping underserved populations.`
      ],
      'Leadership': [
        `Spearheaded initiatives as part of \${title}. Successfully managed teams, coordinated complex logistics, and delivered impactful results.`,
        `Demonstrated exceptional leadership in \${title}, guiding peers through challenging projects and fostering a collaborative environment.`
      ],
      'Other': [
        `Achieved significant milestones in \${title}, demonstrating adaptability, dedication, and a strong work ethic.`,
        `Recognized for outstanding contributions in \${title}, showcasing a diverse skill set and commitment to excellence.`
      ]
    };

    const categoryTemplates = templates[category] || templates['Other'];
    return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  },

  /**
   * Simulates Chat responses for the Bob the Builder AI
   */
  getBobResponse(message, user, chatHistory = []) {
    const name = user?.name || 'Student';
    const major = user?.careerGoals || 'your field';
    const msg = message.toLowerCase();

    // Check specific preset theme commands first
    if (msg.includes('warm yellow')) {
      return `Done! I've updated your theme preset to **Warm Yellow**! ☀️ It has a warm, inviting gradient that fits creative or humanities focuses beautifully. [[UPDATE_STYLE: {"themePreset": "warm-yellow"}]]`;
    }
    if (msg.includes('electric indigo')) {
      return `Done! I've switched your theme preset to **Electric Indigo**! ⚡ This ultra-modern dark gradient is excellent for technology and software engineering portfolios. [[UPDATE_STYLE: {"themePreset": "electric-indigo"}]]`;
    }
    if (msg.includes('emerald sunset')) {
      return `Done! I've updated your theme preset to **Emerald Sunset**! 🌅 The rich green-to-cyan gradient is perfect for natural sciences and biomedical profiles. [[UPDATE_STYLE: {"themePreset": "emerald-sunset"}]]`;
    }
    if (msg.includes('cyberpunk') || msg.includes('neon')) {
      return `Done! I've changed your theme preset to **Cyberpunk Neon**! 🤖 Featuring high-contrast dark backgrounds, neon borders, and monospace Courier typography, this is a bold developer look. [[UPDATE_STYLE: {"themePreset": "cyberpunk-dark"}]]`;
    }
    if (msg.includes('sakura')) {
      return `Done! I've updated your theme preset to **Sakura Blossom**! 🌸 A soft, elegant pink aesthetic with playful double borders and rounded cards. [[UPDATE_STYLE: {"themePreset": "sakura-blossom"}]]`;
    }
    if (msg.includes('ocean breeze')) {
      return `Done! I've updated your theme preset to **Ocean Breeze**! 🌊 This clean, sky-blue look works wonders for general profiles, business, and policy majors. [[UPDATE_STYLE: {"themePreset": "ocean-breeze"}]]`;
    }
    if (msg.includes('royal obsidian')) {
      return `Done! I've switched your theme preset to **Royal Obsidian**! 👑 A deep indigo dark mode with Georgia serif typography that looks highly academic. [[UPDATE_STYLE: {"themePreset": "royal-obsidian"}]]`;
    }
    if (msg.includes('neon mint')) {
      return `Done! I've updated your theme preset to **Neon Mint**! 🌿 A light green/mint setup with Courier fonts and dotted backgrounds. [[UPDATE_STYLE: {"themePreset": "neon-mint"}]]`;
    }
    if (msg.includes('dark mode') || msg.includes('midnight dark')) {
      return `Done! I've updated your theme preset to **Midnight Dark**! 🌙 A premium slate-dark design with Outfit typography and linear-gradient accents. [[UPDATE_STYLE: {"themePreset": "midnight-dark"}]]`;
    }

    if (containsAny(msg, ['bio', 'summary', 'write', 'about me', 'greetings', 'text'])) {
      const bioText = `Highly motivated student focused on ${major}. Actively seeking opportunities to apply my skills in practical projects, collaborate with peers, and contribute to meaningful initiatives. Dedicated to continuous learning and building real-world experience.`;
      return `Hey ${name}! I've got you covered. Here's a highly professional, credible bio tailored to your goal in **${major}**. I've also applied it directly to your page!
      
*"${bioText}"*

**🔧 How to edit further:**
You can double-click or click directly on your bio text in the live preview on the right to edit it inline Webflow-style! [[UPDATE_BIO: "${bioText}"]]`;
    }

    if (containsAny(msg, ['theme', 'color', 'preset', 'style', 'look', 'palette'])) {
      return `🎨 Let's talk aesthetics, ${name}! Choosing the right palette is crucial for making a strong first impression.

Here are my recommendations based on your goals in **${major}**:
• ⚡ **Electric Indigo** or **Royal Obsidian**: Perfect for CS/Engineering. Looks modern and sharp.
• 🌅 **Emerald Sunset**: Great for Biology or Medicine.
• ☀️ **Warm Yellow** or **Sakura Blossom**: Bright, energetic, and highly personal.

**🔨 Just tell me which one to apply!** For example, say *"Change my theme to Electric Indigo"* or *"Use Warm Yellow"* and I'll update it for you instantly!`;
    }

    if (containsAny(msg, ['section', 'showcase', 'visible', 'reorder', 'order', 'manage'])) {
      return `🏗️ Section management is key to directing the admissions officer's eye to your strongest points!

**Here is my blueprint for you:**
1. **Student Spotlight (Hero):** Keep this clean with a direct bio and verified credentials.
2. **Key Scores & Stats:** Keep this visible! It dynamically showcases your academic and extracurricular growth.
3. **Achievements & Awards:** Remove any placeholder or fake info. Put your real certifications here.

**🔧 Just ask me to toggle or customize them!** For example, say *"Hide achievements"* or *"Show timeline"* and I'll adjust it for you in real-time!`;
    }

    return `Hey ${name}! I'm Bob 🔨. I'm here to help you build a stunning, professional portfolio website that showcases your real skills.

You can ask me to:
• ✍️ **Write and apply a professional bio** for your field.
• 🎨 **Change your theme** (e.g. say *"Change theme to Cyberpunk Neon"* or *"Apply Emerald Sunset theme"*).
• 📋 **Organize your sections** (e.g. say *"Hide achievements"*).

What should we customize next?`;
  }
};
