export const Onboarding = {
  currentStep: 1, // 1: Logic & Personality Test, 2: Career Recommendation, 3: Account Setup
  testStep: 1,    // Sub-step inside Step 1 (1 to 10 for each question)
  testAnswers: {
    q1: null, q2: null, q3: null, q4: null,
    q5: null, q6: null, q7: null, q8: null, q9: null, q10: null
  },
  chosenCareer: '',
  suggestedCareer: '',
  data: {
    name: '',
    username: '',
    email: '',
    password: '',
    grade: '11th Grade',
    dreamUniversities: ['MIT'],
    careerGoals: '',
    age: '16',
    school: 'Lincoln High',
    country: 'United States',
    city: '',
    interests: ['Coding', 'Robotics'],
    skills: ['Web Development', 'Python'],
    academicStrengths: ['Computer Science', 'Mathematics'],
    extracurricularInterests: ['Robotics Club'],
    availableHours: '6-8 hours/week'
  },
  activeCareerCategory: 'Engineering & Technology',
  careerCategories: {
    'Engineering & Technology': [
      'Artificial Intelligence & Software Engineering',
      'Aerospace Engineering',
      'Mechanical Engineering',
      'Electrical & Computer Engineering',
      'Robotics & Automation',
      'Data Science & Analytics',
      'Cybersecurity & Information Systems',
      'Chemical Engineering',
      'Civil & Environmental Engineering',
      'Bioengineering & Biotechnology',
      'Blockchain & Web3 Development'
    ],
    'Science & Research': [
      'Bioinformatics & Academic Research',
      'Medicine & Biomedical Sciences',
      'Environmental Science & Sustainability',
      'Psychology & Neuroscience',
      'Physics & Astrophysics',
      'Chemistry & Materials Science',
      'Marine Biology & Ecology'
    ],
    'Business & Social Sciences': [
      'Business & Entrepreneurship',
      'Finance & Quantitative Analysis',
      'Product Strategy & Social Innovation',
      'Economics & Public Policy',
      'International Relations & Diplomacy',
      'Pre-Law, Speech & Public Policy'
    ],
    'Creative & Design': [
      'UI/UX Product Design & Game Architecture',
      'Media, Film & Communications',
      'Architecture & Urban Planning',
      'Graphic Design & Visual Arts',
      'Music Production & Audio Engineering',
      'Creative Writing & Journalism'
    ],
    'Humanities & Education': [
      'Philosophy & Ethics',
      'History & Anthropology',
      'Education & Curriculum Design',
      'Linguistics & Translation Studies'
    ]
  },

  init() {
    this.currentStep = 1;
    this.testStep = 1;
    this.testAnswers = {
      q1: null, q2: null, q3: null, q4: null,
      q5: null, q6: null, q7: null, q8: null, q9: null, q10: null
    };
    this.chosenCareer = '';
    this.activeCareerCategory = 'Engineering & Technology';
    this.initializeRandomQuestions();

    // Fast-track steps for screenshots if query parameters are present
    if (window.location.search.includes('step=2')) {
      this.currentStep = 2;
      this.testAnswers = {
        q1: 'B', q2: 'A', q3: 'B', q4: 'B',
        q5: 'B', q6: 'A', q7: 'A', q8: 'A', q9: 'A', q10: 'A'
      };
    } else if (window.location.search.includes('step=3')) {
      this.currentStep = 3;
      this.chosenCareer = 'Artificial Intelligence & Software Engineering';
    }

    // Check if there was a username typed in login page that didn't exist
    const pendingUsername = localStorage.getItem('leveled_pending_username');
    if (pendingUsername) {
      this.data.username = pendingUsername;
      this.data.name = pendingUsername;
      localStorage.removeItem('leveled_pending_username');
    }

    this.render();
  },

  render() {
    const container = document.getElementById('onboarding-layout');
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card onboarding-card" style="animation: view-enter 0.5s ease; max-width: 650px; width: 100%; margin: 40px auto; padding: 32px;">
        <div class="logo-container" style="justify-content: center; padding-bottom: 24px;">
          <div class="logo-icon" style="padding: 5px; box-sizing: border-box;">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" style="width: 100%; height: 100%;">
              <path d="M 14 12.5 L 14 25.5 L 23 25.5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
              <polygon points="8.5,8 16,4.5 22.5,7 15,10.5" fill="currentColor" stroke="none" />
              <path d="M 11.5,9.3 Q 14.5,12.5 17.5,9.3 Z" fill="currentColor" stroke="none" />
              <path d="M 15,7.5 Q 20.5,8 20.5,12" stroke-width="0.8" stroke-linecap="round" />
              <circle cx="20.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <span class="logo-text" style="font-size: 28px;">Leveld Onboarding</span>
        </div>

        <!-- Progress Steps indicator -->
        <div class="step-indicator" style="margin-bottom: 32px;">
          <div class="step-dot ${this.currentStep >= 1 ? 'active' : ''} ${this.currentStep > 1 ? 'completed' : ''}"></div>
          <div class="step-dot ${this.currentStep >= 2 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}"></div>
          <div class="step-dot ${this.currentStep >= 3 ? 'active' : ''} ${this.currentStep > 3 ? 'completed' : ''}"></div>
        </div>

        <div class="onboarding-step-content">
          ${this.currentStep === 1 ? this.renderAssessmentWizard() : ''}
          ${this.currentStep === 2 ? this.renderCareerRecommendationStep() : ''}
          ${this.currentStep === 3 ? this.renderAccountSetupStep() : ''}
        </div>
      </div>
    `;

    this.bindEvents();
  },

  initializeRandomQuestions() {
    const patternRecognitionPool = [
      { id: 1, category: 'Aptitude • Pattern Recognition', title: 'What comes next in the sequence: <strong>2, 4, 6, 8, ...</strong> ?', choices: { A: '9', B: '10', C: '11', D: '12' }, correct: 'B' },
      { id: 1, category: 'Aptitude • Pattern Recognition', title: 'What comes next in the sequence: <strong>3, 9, 27, ...</strong> ?', choices: { A: '54', B: '81', C: '45', D: '36' }, correct: 'B' },
      { id: 1, category: 'Aptitude • Pattern Recognition', title: 'What comes next in the sequence: <strong>1, 1, 2, 3, 5, 8, ...</strong> ?', choices: { A: '10', B: '12', C: '13', D: '15' }, correct: 'C' },
      { id: 1, category: 'Aptitude • Pattern Recognition', title: 'What comes next in the sequence: <strong>A, C, E, G, ...</strong> ?', choices: { A: 'H', B: 'I', C: 'J', D: 'K' }, correct: 'B' }
    ];

    const wordLogicPool = [
      { id: 2, category: 'Aptitude • Word Logic', title: 'Dog is to Puppy as Cat is to:', choices: { A: 'Kitten', B: 'Cub', C: 'Foal', D: 'Chick' }, correct: 'A' },
      { id: 2, category: 'Aptitude • Word Logic', title: 'Book is to Reading as Fork is to:', choices: { A: 'Writing', B: 'Eating', C: 'Cleaning', D: 'Sleeping' }, correct: 'B' },
      { id: 2, category: 'Aptitude • Word Logic', title: 'Glove is to Hand as Sock is to:', choices: { A: 'Head', B: 'Arm', C: 'Foot', D: 'Leg' }, correct: 'C' },
      { id: 2, category: 'Aptitude • Word Logic', title: 'Ice is to Cold as Fire is to:', choices: { A: 'Wet', B: 'Hot', C: 'Dry', D: 'Soft' }, correct: 'B' }
    ];

    const simpleReasoningPool = [
      { id: 3, category: 'Aptitude • Simple Reasoning', title: 'If all apples are fruits, and I have an apple, then I have a:', choices: { A: 'Vegetable', B: 'Fruit', C: 'Grain', D: 'Berry' }, correct: 'B' },
      { id: 3, category: 'Aptitude • Simple Reasoning', title: 'If all squares are rectangles, and shape A is a square, shape A is a:', choices: { A: 'Triangle', B: 'Circle', C: 'Rectangle', D: 'Oval' }, correct: 'C' },
      { id: 3, category: 'Aptitude • Simple Reasoning', title: 'If it only rains when it is cloudy, and it is currently sunny, then:', choices: { A: 'It is raining', B: 'It is not raining', C: 'It will snow', D: 'It rained yesterday' }, correct: 'B' },
      { id: 3, category: 'Aptitude • Simple Reasoning', title: 'If John is taller than Sam, and Sam is taller than Tom, then John is:', choices: { A: 'Shorter than Tom', B: 'Taller than Tom', C: 'Same height as Tom', D: 'Shorter than Sam' }, correct: 'B' }
    ];

    const basicMathPool = [
      { id: 4, category: 'Aptitude • Basic Math', title: 'If you start with 10 and add 5 three times, what do you get?', choices: { A: '20', B: '25', C: '30', D: '15' }, correct: 'B' },
      { id: 4, category: 'Aptitude • Basic Math', title: 'A pen and a pencil cost $1.10. The pen costs $1.00 more than the pencil. How much is the pencil?', choices: { A: '$0.10', B: '$0.05', C: '$0.15', D: '$0.08' }, correct: 'B' },
      { id: 4, category: 'Aptitude • Basic Math', title: 'If 5 machines take 5 minutes to make 5 widgets, how long does it take 100 machines to make 100 widgets?', choices: { A: '100 minutes', B: '50 minutes', C: '5 minutes', D: '20 minutes' }, correct: 'C' },
      { id: 4, category: 'Aptitude • Basic Math', title: 'A shop has a 20% discount on a $50 jacket. What is the discount price?', choices: { A: '$30', B: '$40', C: '$45', D: '$35' }, correct: 'B' }
    ];

    const collaborationPool = [
      { id: 5, category: 'Personality • Collaboration Style', title: 'When working on a group project, you prefer to:', choices: { A: 'Build the technical parts — code, circuits, or prototypes.', B: 'Do the research and write up findings.', C: 'Design the presentation slides and visuals.', D: 'Organize the team and assign tasks.' } },
      { id: 5, category: 'Personality • Collaboration Style', title: 'In a team competition, your ideal role is:', choices: { A: 'The lead developer or builder.', B: 'The analyst or strategist finding info.', C: 'The creative director or UX designer.', D: 'The project manager or pitch presenter.' } }
    ];

    const sparkPool = [
      { id: 6, category: 'Personality • Spark Focus', title: 'On a free Saturday, you would most enjoy:', choices: { A: 'Coding a personal project or tinkering with hardware.', B: 'Reading articles or watching documentaries about science.', C: 'Drawing, designing, or playing creative video games.', D: 'Volunteering, debating, or organizing a community event.' } },
      { id: 6, category: 'Personality • Spark Focus', title: 'If you won a grant to do anything, you would:', choices: { A: 'Setup a personal lab or coding workstation.', B: 'Buy books and subscribe to scientific journals.', C: 'Buy high-end creative software and cameras.', D: 'Fund a startup or start a non-profit organization.' } }
    ];

    const learningPool = [
      { id: 7, category: 'Personality • Learning Style', title: 'You learn something new best by:', choices: { A: 'Building something hands-on that uses the concept.', B: 'Reading about it thoroughly and taking notes.', C: 'Watching visual tutorials and creating diagrams.', D: 'Discussing it with friends or teaching it to someone.' } },
      { id: 7, category: 'Personality • Learning Style', title: 'When exploring a new subject, your first step is:', choices: { A: 'Write a script or construct a physical model.', B: 'Download 3 research papers or read a wiki page.', C: 'Look at infographics or watch animations.', D: 'Attend a seminar or discuss it in an online forum.' } }
    ];

    const problemSolvingPool = [
      { id: 8, category: 'Personality • Problem Solving', title: 'When something goes wrong with your work, you first:', choices: { A: 'Try different solutions until something works.', B: 'Look up what might have caused it.', C: 'Rethink the approach from a fresh angle.', D: 'Ask teammates or mentors for advice.' } },
      { id: 8, category: 'Personality • Problem Solving', title: 'When faced with a difficult challenge, you typically:', choices: { A: 'Open your editor or workshop to debug the issue.', B: 'Formulate a list of hypotheses and test them.', C: 'Draw a sketch or map it out visually.', D: 'Call a brainstorm meeting with your team.' } }
    ];

    const workingPool = [
      { id: 9, category: 'Personality • Working Style', title: 'You feel most productive when you are:', choices: { A: 'Shipping fast — building prototypes and iterating quickly.', B: 'Working carefully — making sure every detail is verified.', C: 'Being creative — making things look and feel beautiful.', D: 'Leading others — planning events and coordinating efforts.' } },
      { id: 9, category: 'Personality • Working Style', title: 'Your ideal work environment is:', choices: { A: 'A makerspace or software development lab.', B: 'A quiet library or structured research archive.', C: 'A bright studio with music and color.', D: 'A busy boardroom or collaborative co-working hub.' } }
    ];

    const dreamPool = [
      { id: 10, category: 'Personality • Dream Goal', title: 'In college, you are most excited to:', choices: { A: 'Join hackathons and build startups.', B: 'Work in a research lab with professors.', C: 'Study design, film, or creative arts.', D: 'Run student government or lead campus organizations.' } },
      { id: 10, category: 'Personality • Dream Goal', title: 'Your ultimate career ambition is to:', choices: { A: 'Build a breakthrough technological product.', B: 'Discover a new scientific principle or theory.', C: 'Create a world-renowned art piece, movie, or brand.', D: 'Become a chief executive, founder, or community leader.' } }
    ];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    this.activeQuestions = [
      getRandom(patternRecognitionPool),
      getRandom(wordLogicPool),
      getRandom(simpleReasoningPool),
      getRandom(basicMathPool),
      getRandom(collaborationPool),
      getRandom(sparkPool),
      getRandom(learningPool),
      getRandom(problemSolvingPool),
      getRandom(workingPool),
      getRandom(dreamPool)
    ];
  },

  getQuestionsList() {
    if (!this.activeQuestions) {
      this.initializeRandomQuestions();
    }
    return this.activeQuestions;
  },

  renderAssessmentWizard() {
    const questions = this.getQuestionsList();
    const q = questions[this.testStep - 1];
    const userAns = this.testAnswers[`q${q.id}`];

    // Compute progress percent
    const progressPercent = Math.round(((this.testStep - 1) / questions.length) * 100);

    return `
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin-bottom: 4px; text-align: center;">⚡ Skills &amp; Aptitude Assessment</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; text-align: center; margin-bottom: 24px;">Question ${this.testStep} of 10</p>

        <!-- Progress Bar -->
        <div style="width: 100%; height: 6px; background-color: var(--bg-tertiary); border-radius: 3px; overflow: hidden; margin-bottom: 28px; border: 1px solid var(--border-color);">
          <div style="width: ${progressPercent || 2}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 3px; transition: width 0.3s ease;"></div>
        </div>

        <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 20px; margin-bottom: 24px; text-align: left;" class="question-container">
          <div style="font-size: 11px; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 6px;">${q.category}</div>
          <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; line-height: 1.45;">${q.title}</div>
          
          <div class="test-choice-container" data-q="q${q.id}" style="display: flex; flex-direction: column; gap: 12px;">
            ${Object.entries(q.choices).map(([key, val]) => `
              <button class="test-choice-btn ${userAns === key ? 'selected' : ''}" data-ans="${key}" style="text-align: left; display: flex; align-items: center; gap: 12px; padding: 14px 18px;">
                <span class="test-choice-icon" style="flex-shrink: 0;">${key}</span> 
                <span style="font-size: 13.5px;">${val}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 12px;">
          <button class="btn btn-secondary" id="btn-wizard-back" style="flex: 1; display: ${this.testStep === 1 ? 'none' : 'block'};">Back</button>
          <button class="btn btn-primary" id="btn-wizard-next" style="flex: 2; padding: 12px;" ${userAns ? '' : 'disabled'}>
            ${this.testStep === 10 ? '🤖 Complete &amp; Grade' : 'Next Question &rarr;'}
          </button>
        </div>
      </div>
    `;
  },

  renderCareerRecommendationStep() {
    const questions = this.getQuestionsList();
    
    // 1. Calculate cognitive aptitude score (Questions 1-4)
    let aptitudeScore = 0;
    for (let i = 0; i < 4; i++) {
      const q = questions[i];
      if (this.testAnswers[`q${q.id}`] === q.correct) {
        aptitudeScore++;
      }
    }

    // 2. Calculate personality profile scores (Questions 5-10)
    // Options A, B, C, D in the random pools map strictly to:
    // A: Tech (Analytical Software Architect)
    // B: Research (Computational Researcher)
    // C: Creative (Creative Product Designer)
    // D: Leader (Strategic Public Policy/Social Entrepreneur)
    let techCount = 0;
    let researchCount = 0;
    let creativeCount = 0;
    let leaderCount = 0;

    const weights = { q5: 1.0, q6: 2.0, q7: 1.5, q8: 1.5, q9: 1.5, q10: 2.0 };
    for (let i = 5; i <= 10; i++) {
      const qKey = `q${i}`;
      const ans = this.testAnswers[qKey];
      const w = weights[qKey];
      if (ans === 'A') techCount += w;
      else if (ans === 'B') researchCount += w;
      else if (ans === 'C') creativeCount += w;
      else if (ans === 'D') leaderCount += w;
    }

    // Determine highest score personality
    let personality = 'Social Entrepreneur & Impact Leader';
    let careerSuggestion = 'Product Strategy & Social Innovation';
    let strengthsText = 'Empathetic Deduction, High Social Collaboration, Out-of-box Strategy.';

    const maxScore = Math.max(techCount, researchCount, creativeCount, leaderCount);

    if (maxScore === techCount) {
      personality = 'Analytical Software Architect';
      careerSuggestion = 'Artificial Intelligence & Software Engineering';
      strengthsText = 'Algorithmic Problem Solving, Technical Systems Prototyping, Code Optimization.';
    } else if (maxScore === researchCount) {
      personality = 'Computational Researcher';
      careerSuggestion = 'Bioinformatics & Academic Research';
      strengthsText = 'Quantitative Data Synthesis, Peer-reviewed Abstract Outlining, Research Rigor.';
    } else if (maxScore === creativeCount) {
      personality = 'Creative Product Designer';
      careerSuggestion = 'UI/UX Product Design & Game Architecture';
      strengthsText = 'Aesthetic Layout Prototyping, User Experience Empathy, Interactive Styling.';
    } else if (maxScore === leaderCount) {
      personality = 'Strategic Public Policy Leader';
      careerSuggestion = 'Pre-Law, Speech & Public Policy';
      strengthsText = 'Debating & Speech Strategy, Community Organization, Resource Mobilization.';
    }

    this.suggestedCareer = careerSuggestion;

    return `
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin-bottom: 8px; text-align: center;">🎨 AI Career Pathfinder</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; text-align: center; margin-bottom: 24px;">Your skills &amp; aptitude assessment results have been compiled:</p>

        <!-- Scoring widgets -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
          <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--primary); text-transform: uppercase;">Cognitive Aptitude</div>
            <div style="font-size: 24px; font-weight: 800; color: var(--text-primary); margin-top: 4px;">${Math.round((aptitudeScore / 4) * 100)}%</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${aptitudeScore} of 4 correct</div>
          </div>
          <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 14px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--secondary); text-transform: uppercase;">Primary Profile Fit</div>
            <div style="font-size: 15px; font-weight: 800; color: var(--text-primary); margin-top: 10px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${personality.split(' & ')[0]}</div>
          </div>
        </div>

        <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 18px; margin-bottom: 24px; text-align: left;">
          <div style="font-size: 11px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Your Core Cognitive Strengths</div>
          <div style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5;">
            ✓ <strong>${strengthsText}</strong> Your selections highlight a natural orientation toward ${personality.toLowerCase()}. Top universities heavily value these specific execution traits in candidates.
          </div>
        </div>

        <div class="career-suggestion-card" style="padding: 24px; text-align: left;">
          <div style="font-size: 11px; font-weight: 800; color: var(--secondary); text-transform: uppercase; margin-bottom: 6px;">Suggested Path Recommendation</div>
          <h4 class="career-suggestion-title" style="margin-bottom: 8px;">${careerSuggestion}</h4>
          <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.45; margin-bottom: 16px;">This career pathway leverages your specific technical and creative strengths. Leveld OS will configure roadmap templates and project incubators aligned with this path.</p>
          <button class="btn btn-primary" id="btn-accept-career" style="width: 100%; padding: 10px; font-size: 13.5px;">Accept AI Career Recommendation</button>
        </div>

        <div style="margin: 20px 0; border-top: 1px solid var(--border-color); padding-top: 16px; text-align: left;">
          <div style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px;">Or browse and select a custom target path:</div>
          
          <style>
            .category-tab {
              padding: 6px 12px;
              background-color: var(--bg-tertiary);
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius-sm);
              font-size: 11px;
              color: var(--text-secondary);
              cursor: pointer;
              transition: all var(--transition-fast);
              font-weight: 700;
              text-transform: uppercase;
              white-space: nowrap;
            }
            .category-tab:hover {
              border-color: var(--primary);
              color: var(--text-primary);
            }
            .category-tab.active {
              background-color: var(--primary-glow);
              border-color: var(--primary);
              color: var(--primary);
            }
            .career-pill {
              padding: 8px 12px;
              background-color: var(--bg-primary);
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius-sm);
              font-size: 12px;
              color: var(--text-secondary);
              cursor: pointer;
              transition: all var(--transition-fast);
              text-align: left;
              line-height: 1.3;
            }
            .career-pill:hover {
              border-color: var(--primary);
              background-color: var(--primary-glow);
              color: var(--text-primary);
            }
            .career-pill.selected {
              background-color: var(--primary-glow);
              border-color: var(--primary);
              color: var(--primary);
              font-weight: 700;
              box-shadow: 0 0 8px var(--primary-glow);
            }
          </style>

          <!-- Category Tabs -->
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;" class="custom-scrollbar">
            ${Object.keys(this.careerCategories).map(cat => `
              <div class="category-tab ${this.activeCareerCategory === cat ? 'active' : ''}" data-cat="${cat}">
                ${cat.replace('Sciences', '').replace('Technology', 'Tech')}
              </div>
            `).join('')}
          </div>

          <!-- Career Pills Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${this.careerCategories[this.activeCareerCategory].map(career => {
              const isSelected = this.chosenCareer === career;
              return `
                <div class="career-pill ${isSelected ? 'selected' : ''}" data-career="${career}">
                  ${career}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button class="btn btn-secondary" id="btn-back-test" style="flex: 1;">Retake Test</button>
          <button class="btn btn-primary" id="btn-next-career" style="flex: 2; padding: 12px;" ${this.chosenCareer ? '' : 'disabled'}>Continue with Career Goals</button>
        </div>
      </div>
    `;
  },

  renderAccountSetupStep() {
    return `
      <div>
        <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin-bottom: 8px; text-align: center;">🔒 Create User Account</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; text-align: center; margin-bottom: 24px;">Configure your credentials to secure your workspace profile inside the Leveld backend database.</p>

        <form id="credentials-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 14px; text-align: left;">
          
          <div class="form-group">
            <label class="form-label" for="acct-name">Full Student Name</label>
            <input type="text" id="acct-name" class="form-control" placeholder="E.g., Jane Doe" required value="${this.data.name}">
          </div>

          <div class="form-group">
            <label class="form-label" for="acct-email">Email Address</label>
            <input type="email" id="acct-email" class="form-control" placeholder="E.g., janedoe@example.com" required value="${this.data.email}">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="acct-username">Username</label>
              <input type="text" id="acct-username" class="form-control" placeholder="E.g., janedoe1" required value="${this.data.username}">
            </div>
            <div class="form-group">
              <label class="form-label" for="acct-password">Password</label>
              <input type="password" id="acct-password" class="form-control" placeholder="••••••••" required value="${this.data.password}">
            </div>
          </div>

          <style>
            .pill-chip {
              padding: 8px 14px;
              background-color: var(--bg-tertiary);
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius-md);
              font-size: 12.5px;
              color: var(--text-secondary);
              cursor: pointer;
              transition: all var(--transition-fast);
              font-weight: 600;
            }
            .pill-chip:hover {
              border-color: var(--primary);
              background-color: var(--primary-glow);
              color: var(--text-primary);
            }
            .pill-chip.selected {
              background-color: var(--primary);
              border-color: var(--primary);
              color: white;
              box-shadow: 0 4px 12px var(--primary-glow);
            }
            .uni-selection-card {
              border-width: 1px;
              border-style: solid;
              background-color: var(--bg-primary);
            }
            .uni-selection-card:hover {
              border-color: var(--primary) !important;
              background-color: var(--primary-glow) !important;
            }
            .uni-selection-card.selected {
              border-color: var(--primary) !important;
              background-color: var(--primary-glow) !important;
            }
            .country-selection-card {
              border-width: 1px;
              border-style: solid;
              background-color: var(--bg-primary);
            }
            .country-selection-card:hover {
              border-color: var(--secondary) !important;
              background-color: var(--secondary-glow) !important;
            }
            .country-selection-card.selected {
              border-color: var(--secondary) !important;
              background-color: var(--secondary-glow) !important;
            }
          </style>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" style="margin-bottom: 2px;">Grade Level</label>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">Select your current academic tier:</div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div>
                  <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">High School</div>
                  <div class="grade-pill-group" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div class="pill-chip ${this.data.grade === '9th Grade' ? 'selected' : ''}" data-val="9th Grade">9th Grade</div>
                    <div class="pill-chip ${this.data.grade === '10th Grade' ? 'selected' : ''}" data-val="10th Grade">10th Grade</div>
                    <div class="pill-chip ${this.data.grade === '11th Grade' ? 'selected' : ''}" data-val="11th Grade">11th Grade</div>
                    <div class="pill-chip ${this.data.grade === '12th Grade' ? 'selected' : ''}" data-val="12th Grade">12th Grade</div>
                  </div>
                </div>
                <div>
                  <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">University &amp; Graduate</div>
                  <div class="grade-pill-group" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div class="pill-chip ${this.data.grade === 'Undergraduate (Freshman)' ? 'selected' : ''}" data-val="Undergraduate (Freshman)">Freshman</div>
                    <div class="pill-chip ${this.data.grade === 'Undergraduate (Sophomore)' ? 'selected' : ''}" data-val="Undergraduate (Sophomore)">Sophomore</div>
                    <div class="pill-chip ${this.data.grade === 'Undergraduate (Junior)' ? 'selected' : ''}" data-val="Undergraduate (Junior)">Junior</div>
                    <div class="pill-chip ${this.data.grade === 'Undergraduate (Senior)' ? 'selected' : ''}" data-val="Undergraduate (Senior)">Senior</div>
                    <div class="pill-chip ${this.data.grade === 'Graduate Student' ? 'selected' : ''}" data-val="Graduate Student">Graduate</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                <span>Dream University Target</span>
                <span id="active-uni-selection-badge" style="font-size: 12px; color: var(--primary); font-weight: 800;">
                  Selected: ${this.data.dreamUniversities[0] || 'MIT'}
                </span>
              </label>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">Filter and click to select your aspiration campus:</div>
              <input type="text" id="uni-search-bar" class="form-control" placeholder="🔍 Type to filter (e.g. Harvard, Stanford, Cambridge)..." style="margin-bottom: 10px; font-size: 13.5px; padding: 10px 14px;">
              
              <div id="uni-chips-grid" style="
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 8px;
                max-height: 180px;
                overflow-y: auto;
                padding: 6px;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius-md);
                background-color: var(--bg-tertiary);
              " class="custom-scrollbar">
                ${[
                  { name: 'Harvard University', shortcut: 'HARVARD' },
                  { name: 'Yale University', shortcut: 'YALE' },
                  { name: 'Princeton University', shortcut: 'PRINCETON' },
                  { name: 'Columbia University', shortcut: 'COLUMBIA' },
                  { name: 'University of Pennsylvania', shortcut: 'UPENN' },
                  { name: 'Brown University', shortcut: 'BROWN' },
                  { name: 'Dartmouth College', shortcut: 'DARTMOUTH' },
                  { name: 'Cornell University', shortcut: 'CORNELL' },
                  { name: 'MIT', shortcut: 'MIT' },
                  { name: 'Stanford University', shortcut: 'STANFORD' },
                  { name: 'Caltech', shortcut: 'CALTECH' },
                  { name: 'Carnegie Mellon University', shortcut: 'CMU' },
                  { name: 'Georgia Tech', shortcut: 'GT' },
                  { name: 'ETH Zürich', shortcut: 'ETH' },
                  { name: 'UC Berkeley', shortcut: 'BERKELEY' },
                  { name: 'UCLA', shortcut: 'UCLA' },
                  { name: 'University of Michigan', shortcut: 'MICHIGAN' },
                  { name: 'University of Virginia', shortcut: 'UVA' },
                  { name: 'UNC Chapel Hill', shortcut: 'UNC' },
                  { name: 'UIUC', shortcut: 'UIUC' },
                  { name: 'UT Austin', shortcut: 'UT AUSTIN' },
                  { name: 'University of Washington', shortcut: 'UW' },
                  { name: 'Purdue University', shortcut: 'PURDUE' },
                  { name: 'UW-Madison', shortcut: 'WISCONSIN' },
                  { name: 'Duke University', shortcut: 'DUKE' },
                  { name: 'Northwestern University', shortcut: 'NORTHWESTERN' },
                  { name: 'University of Chicago', shortcut: 'UCHICAGO' },
                  { name: 'NYU', shortcut: 'NYU' },
                  { name: 'Johns Hopkins University', shortcut: 'JHU' },
                  { name: 'Rice University', shortcut: 'RICE' },
                  { name: 'Vanderbilt University', shortcut: 'VANDY' },
                  { name: 'USC', shortcut: 'USC' },
                  { name: 'Emory University', shortcut: 'EMORY' },
                  { name: 'Georgetown University', shortcut: 'GEORGETOWN' },
                  { name: 'University of Notre Dame', shortcut: 'NOTRE DAME' },
                  { name: 'Washington University in St. Louis', shortcut: 'WASHU' },
                  { name: 'Tufts University', shortcut: 'TUFTS' },
                  { name: 'Boston University', shortcut: 'BU' },
                  { name: 'University of Oxford', shortcut: 'OXFORD' },
                  { name: 'University of Cambridge', shortcut: 'CAMBRIDGE' },
                  { name: 'University of Toronto', shortcut: 'UTORONTO' },
                  { name: 'Imperial College London', shortcut: 'IMPERIAL' },
                  { name: 'University College London', shortcut: 'UCL' },
                  { name: 'National University of Singapore', shortcut: 'NUS' },
                  { name: 'University of Melbourne', shortcut: 'MELBOURNE' },
                  { name: 'McGill University', shortcut: 'MCGILL' },
                  { name: 'University of British Columbia', shortcut: 'UBC' },
                  { name: 'University of Hong Kong', shortcut: 'HKU' },
                  { name: 'University of Tokyo', shortcut: 'TOKYO' },
                  { name: 'Seoul National University', shortcut: 'SNU' }
                ].map(uni => {
                  const isSelected = this.data.dreamUniversities[0] === uni.name;
                  return `
                    <div class="uni-selection-card ${isSelected ? 'selected' : ''}" data-uni="${uni.name}" style="
                      padding: 8px 12px;
                      border: 1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'};
                      border-radius: var(--border-radius-sm);
                      font-size: 11.5px;
                      cursor: pointer;
                      transition: all var(--transition-fast);
                      display: flex;
                      flex-direction: column;
                      gap: 2px;
                      text-align: left;
                      box-shadow: ${isSelected ? '0 0 8px var(--primary-glow)' : 'none'};
                    ">
                      <span style="font-weight: 800; color: ${isSelected ? 'var(--primary)' : 'var(--text-primary)'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${uni.shortcut}
                      </span>
                      <span style="font-size: 9.5px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${uni.name}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <span>Country of Residence</span>
              <span id="active-country-selection-badge" style="font-size: 12px; color: var(--secondary); font-weight: 800;">
                Selected: ${this.data.country || 'United States'}
              </span>
            </label>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px;">Filter and click to select your country:</div>
            <input type="text" id="country-search-bar" class="form-control" placeholder="🔍 Search country..." style="margin-bottom: 10px; font-size: 13.5px; padding: 10px 14px;">
            
            <div id="country-chips-grid" style="
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
              gap: 8px;
              max-height: 150px;
              overflow-y: auto;
              padding: 6px;
              border: 1px solid var(--border-color);
              border-radius: var(--border-radius-md);
              background-color: var(--bg-tertiary);
            " class="custom-scrollbar">
              ${[
                { name: 'United States', flag: '🇺🇸' },
                { name: 'United Kingdom', flag: '🇬🇧' },
                { name: 'Canada', flag: '🇨🇦' },
                { name: 'India', flag: '🇮🇳' },
                { name: 'Australia', flag: '🇦🇺' },
                { name: 'Germany', flag: '🇩🇪' },
                { name: 'France', flag: '🇫🇷' },
                { name: 'Singapore', flag: '🇸🇬' },
                { name: 'Japan', flag: '🇯🇵' },
                { name: 'South Korea', flag: '🇰🇷' },
                { name: 'China', flag: '🇨🇳' },
                { name: 'Brazil', flag: '🇧🇷' },
                { name: 'Mexico', flag: '🇲🇽' },
                { name: 'Nigeria', flag: '🇳🇬' },
                { name: 'South Africa', flag: '🇿🇦' },
                { name: 'Kenya', flag: '🇰🇪' },
                { name: 'UAE', flag: '🇦🇪' },
                { name: 'Saudi Arabia', flag: '🇸🇦' },
                { name: 'Pakistan', flag: '🇵🇰' },
                { name: 'Bangladesh', flag: '🇧🇩' },
                { name: 'Indonesia', flag: '🇮🇩' },
                { name: 'Malaysia', flag: '🇲🇾' },
                { name: 'Philippines', flag: '🇵🇭' },
                { name: 'Turkey', flag: '🇹🇷' },
                { name: 'Italy', flag: '🇮🇹' },
                { name: 'Spain', flag: '🇪🇸' },
                { name: 'Netherlands', flag: '🇳🇱' },
                { name: 'Sweden', flag: '🇸🇪' },
                { name: 'Switzerland', flag: '🇨🇭' },
                { name: 'New Zealand', flag: '🇳🇿' }
              ].map(c => {
                const isSelected = this.data.country === c.name;
                return `
                  <div class="country-selection-card ${isSelected ? 'selected' : ''}" data-country="${c.name}" style="
                    padding: 8px 12px;
                    border: 1px solid ${isSelected ? 'var(--secondary)' : 'var(--border-color)'};
                    border-radius: var(--border-radius-sm);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all var(--transition-fast);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-align: left;
                    background-color: var(--bg-primary);
                    box-shadow: ${isSelected ? '0 0 8px var(--secondary-glow)' : 'none'};
                  ">
                    <span style="font-size: 18px;">${c.flag}</span>
                    <span style="font-weight: 700; color: ${isSelected ? 'var(--secondary)' : 'var(--text-primary)'}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${c.name}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="acct-city">City</label>
            <input type="text" id="acct-city" class="form-control" placeholder="E.g., San Francisco" value="${this.data.city}">
          </div>

          <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); padding: 12px; margin-top: 8px;">
            <span style="font-size: 11px; font-weight: 800; color: var(--secondary); text-transform: uppercase;">Selected Target Aspiration:</span>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${this.chosenCareer}</div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 16px;">
            <button type="button" class="btn btn-secondary" id="btn-back-career" style="flex: 1;">Back</button>
            <button type="submit" class="btn btn-primary" style="flex: 2; padding: 12px;">🚀 Build My Workspace</button>
          </div>
        </form>
      </div>
    `;
  },

  bindEvents() {
    // STEP 1 Events (Wizard MCQ questions)
    if (this.currentStep === 1) {
      const choiceBtns = document.querySelectorAll('.test-choice-btn');
      choiceBtns.forEach(btn => {
        btn.onclick = () => {
          choiceBtns.forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          
          const ansVal = btn.getAttribute('data-ans');
          this.testAnswers[`q${this.testStep}`] = ansVal;

          // Enable next button
          const nextBtn = document.getElementById('btn-wizard-next');
          if (nextBtn) nextBtn.removeAttribute('disabled');
        };
      });

      const nextBtn = document.getElementById('btn-wizard-next');
      if (nextBtn) {
        nextBtn.onclick = () => {
          if (this.testStep < 10) {
            this.testStep++;
            this.render();
          } else {
            // End of test, proceed to Career path grading
            this.currentStep = 2;
            this.render();
          }
        };
      }

      const backBtn = document.getElementById('btn-wizard-back');
      if (backBtn) {
        backBtn.onclick = () => {
          if (this.testStep > 1) {
            this.testStep--;
            this.render();
          }
        };
      }
    }

    // STEP 2 Events (Career Recommendation)
    if (this.currentStep === 2) {
      const acceptBtn = document.getElementById('btn-accept-career');
      const selectCustom = document.getElementById('select-custom-career');
      const continueBtn = document.getElementById('btn-next-career');

      const setCareer = (career) => {
        this.chosenCareer = career;
        if (continueBtn) continueBtn.removeAttribute('disabled');
      };

      if (acceptBtn) {
        acceptBtn.onclick = () => {
          const sugCard = document.querySelector('.career-suggestion-card');
          if (sugCard) {
            sugCard.style.borderStyle = 'solid';
            sugCard.style.backgroundColor = 'rgba(6, 182, 212, 0.15)';
          }
          setCareer(this.suggestedCareer);
          this.render();
          LeveledApp.showToast('✓ Recommendation accepted.');
        };
      }

      // Bind category tabs clicks
      const categoryTabs = document.querySelectorAll('.category-tab');
      categoryTabs.forEach(tab => {
        tab.onclick = () => {
          this.activeCareerCategory = tab.getAttribute('data-cat');
          this.render();
        };
      });

      // Bind career cards/pills clicks
      const careerPills = document.querySelectorAll('.career-pill');
      careerPills.forEach(pill => {
        pill.onclick = () => {
          const sugCard = document.querySelector('.career-suggestion-card');
          if (sugCard) {
            sugCard.style.borderStyle = 'dashed';
            sugCard.style.backgroundColor = 'transparent';
          }
          const careerVal = pill.getAttribute('data-career');
          setCareer(careerVal);
          this.render();
          LeveledApp.showToast('✓ Custom field selected.');
        };
      });

      const backTestBtn = document.getElementById('btn-back-test');
      if (backTestBtn) {
        backTestBtn.onclick = () => {
          this.currentStep = 1;
          this.testStep = 1;
          this.testAnswers = {
            q1: null, q2: null, q3: null, q4: null,
            q5: null, q6: null, q7: null, q8: null, q9: null, q10: null
          };
          this.initializeRandomQuestions();
          this.render();
        };
      }

      if (continueBtn) {
        continueBtn.onclick = () => {
          if (this.chosenCareer) {
            this.currentStep = 3;
            this.render();
          }
        };
      }
    }

    // STEP 3 Events (Account Setup)
    if (this.currentStep === 3) {
      const backCareerBtn = document.getElementById('btn-back-career');
      if (backCareerBtn) {
        backCareerBtn.onclick = () => {
          this.currentStep = 2;
          this.render();
        };
      }

      // Bind Grade Pill Clicks
      const gradePills = document.querySelectorAll('.grade-pill-group .pill-chip');
      gradePills.forEach(pill => {
        pill.onclick = () => {
          gradePills.forEach(p => p.classList.remove('selected'));
          pill.classList.add('selected');
          this.data.grade = pill.getAttribute('data-val');
        };
      });

      // Bind Uni Card Clicks
      const uniCards = document.querySelectorAll('#uni-chips-grid .uni-selection-card');
      const selectionBadge = document.getElementById('active-uni-selection-badge');
      uniCards.forEach(card => {
        card.onclick = () => {
          uniCards.forEach(c => {
            c.classList.remove('selected');
            c.style.borderColor = 'var(--border-color)';
            c.style.boxShadow = 'none';
            c.querySelector('span').style.color = 'var(--text-primary)';
          });
          card.classList.add('selected');
          card.style.borderColor = 'var(--primary)';
          card.style.boxShadow = '0 0 8px var(--primary-glow)';
          card.querySelector('span').style.color = 'var(--primary)';
          const uniName = card.getAttribute('data-uni');
          this.data.dreamUniversities = [uniName];
          if (selectionBadge) selectionBadge.textContent = `Selected: ${uniName}`;
        };
      });

      // Bind Uni Search filter
      const searchBar = document.getElementById('uni-search-bar');
      if (searchBar) {
        searchBar.oninput = () => {
          const query = searchBar.value.toLowerCase();
          uniCards.forEach(card => {
            const uniName = card.getAttribute('data-uni').toLowerCase();
            const shortcut = card.querySelector('span').textContent.toLowerCase();
            if (uniName.includes(query) || shortcut.includes(query)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        };
      }

      // Bind Country Card Clicks
      const countryCards = document.querySelectorAll('#country-chips-grid .country-selection-card');
      const countryBadge = document.getElementById('active-country-selection-badge');
      countryCards.forEach(card => {
        card.onclick = () => {
          countryCards.forEach(c => {
            c.classList.remove('selected');
            c.style.borderColor = 'var(--border-color)';
            c.style.boxShadow = 'none';
            c.querySelectorAll('span')[1].style.color = 'var(--text-primary)';
          });
          card.classList.add('selected');
          card.style.borderColor = 'var(--secondary)';
          card.style.boxShadow = '0 0 8px var(--secondary-glow)';
          card.querySelectorAll('span')[1].style.color = 'var(--secondary)';
          const countryName = card.getAttribute('data-country');
          this.data.country = countryName;
          if (countryBadge) countryBadge.textContent = `Selected: ${countryName}`;
        };
      });

      // Bind Country Search filter
      const countrySearchBar = document.getElementById('country-search-bar');
      if (countrySearchBar) {
        countrySearchBar.oninput = () => {
          const query = countrySearchBar.value.toLowerCase();
          countryCards.forEach(card => {
            const countryName = card.getAttribute('data-country').toLowerCase();
            if (countryName.includes(query)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        };
      }

      const credForm = document.getElementById('credentials-form');
      if (credForm) {
        credForm.onsubmit = () => {
          const name = document.getElementById('acct-name').value.trim();
          const email = document.getElementById('acct-email').value.trim();
          const username = document.getElementById('acct-username').value.trim();
          const password = document.getElementById('acct-password').value.trim();

          // Assemble final user state parameters
          this.data.name = name;
          this.data.email = email;
          this.data.username = username;
          this.data.password = password;
          // Note: this.data.grade, this.data.dreamUniversities, and this.data.country are already updated on-click!
          this.data.country = this.data.country || 'United States';
          this.data.city = document.getElementById('acct-city')?.value || '';
          this.data.careerGoals = this.chosenCareer;

          // Generate dynamic skills and academic fields aligned with the selected career
          const careerLower = this.chosenCareer.toLowerCase();
          
          if (careerLower.includes('aerospace') || careerLower.includes('mechanical')) {
            this.data.interests = ['Aerospace Engineering', 'Robotics', 'Space Technology'];
            this.data.skills = ['CAD Design', 'Aerodynamics', 'Fluid Mechanics'];
            this.data.academicStrengths = ['Physics', 'Mathematics'];
          } else if (careerLower.includes('software') || careerLower.includes('artificial intelligence') || careerLower.includes('computer') || careerLower.includes('robotics')) {
            this.data.interests = ['Software Engineering', 'AI & Machine Learning', 'Tech Innovation'];
            this.data.skills = ['Python', 'System Architecture', 'Algorithmic Logic'];
            this.data.academicStrengths = ['Computer Science', 'Mathematics'];
          } else if (careerLower.includes('data science') || careerLower.includes('analytics') || careerLower.includes('statistics')) {
            this.data.interests = ['Data Science', 'Statistics', 'Analytics'];
            this.data.skills = ['Data Analysis', 'Python Coding', 'SQL Database'];
            this.data.academicStrengths = ['Mathematics', 'Statistics'];
          } else if (careerLower.includes('medicine') || careerLower.includes('biomedical') || careerLower.includes('bioinformatics') || careerLower.includes('biology')) {
            this.data.interests = ['Medicine', 'Biomedical Science', 'Healthcare'];
            this.data.skills = ['Lab Techniques', 'Data Analysis', 'Scientific Writing'];
            this.data.academicStrengths = ['Biology', 'Chemistry'];
          } else if (careerLower.includes('economics') || careerLower.includes('policy') || careerLower.includes('business') || careerLower.includes('finance') || careerLower.includes('strategy')) {
            this.data.interests = [this.chosenCareer.split(' & ')[0], 'Finance', 'Strategy'];
            this.data.skills = ['Financial Modeling', 'Market Research', 'Policy Analysis'];
            this.data.academicStrengths = ['Economics', 'Mathematics'];
          } else {
            this.data.interests = [this.chosenCareer.split(' & ')[0], 'Research', 'Tech Innovation'];
            this.data.skills = ['Research Design', 'Data Analysis', 'Scientific Writing'];
            this.data.academicStrengths = ['Mathematics', 'Physics'];
          }

          LeveledApp.completeOnboarding(this.data);
        };
      }
    }
  }
};
