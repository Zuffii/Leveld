import { Onboarding } from './components/Onboarding.js?v=3';
import { Dashboard } from './components/Dashboard.js?v=5';
import { Roadmap } from './components/Roadmap.js?v=4';
import { Mentor } from './components/Mentor.js?v=6';
import { Profile } from './components/Profile.js?v=3';
import { Calendar } from './components/Calendar.js?v=2';
import { Extracurriculars } from './components/Extracurriculars.js?v=7';
import { Landing } from './components/Landing.js?v=3';
import { AISimulator } from './data/ai_simulator.js?v=3';

import { Portfolio } from './components/Portfolio.js?v=5';
import { EssayStudio } from './components/EssayStudio.js?v=2';
import { Notes } from './components/Notes.js?v=2';
import { Pricing } from './components/Pricing.js?v=2';
import AdmissionsCalculator from './components/AdmissionsCalculator.js?v=3';
import { Jobs } from './components/Jobs.js?v=2';
import { OPPORTUNITIES } from './data/mock_data.js';

// Level limits definitions
const LEVEL_XP_THRESHOLDS = [0, 500, 1200, 2500, 4500, 7500, 11500, 17000];
const LEVEL_TITLES = [
  'Explorer',        // Level 1
  'Builder',         // Level 2
  'Leader',          // Level 3
  'Innovator',       // Level 4
  'Scholar',         // Level 5
  'Elite Applicant', // Level 6
  'Visionary'        // Level 7+
];

class App {
  constructor() {
    window.LeveledApp = this;

    // Enable mock state for screenshots if requested
    if (window.location.search.includes('mock=true')) {
      const mockState = {
        user: {
          name: "Kantwon",
          username: "kantwon",
          password: "admin",
          grade: "12",
          school: "Georgia Tech High",
          country: "United States",
          interests: ["Coding", "Robotics", "Design"],
          skills: ["Web Development", "Python", "UI Design"],
          academicStrengths: ["Mathematics", "Computer Science"],
          careerGoals: "Software Engineering",
          dreamUniversities: ["Georgia Tech", "MIT", "Stanford"],
          availableHours: "6-8 hours/week"
        },
        xp: 1850,
        level: 3,
        streak: 5,
        lastActiveDate: new Date().toISOString().split('T')[0],
        completedMilestones: ["milestone-1", "milestone-2"],
        savedOpportunities: [],
        opportunityApplications: {},
        projects: [
          {
            id: "proj-mock-1",
            title: "Autonomous Maze Solving Robot",
            description: "Built a micro-mouse robot that navigates a 16x16 maze using flood-fill pathfinding.",
            type: "passion",
            status: "completed",
            steps: [],
            learnings: "I learned how to design custom PCBs, interface ultrasonic sensors with Arduino, and optimize pathfinding algorithms in C++ for memory-constrained microcontrollers.",
            dateAdded: "2026-05-15",
            evidenceList: [
              {
                id: "ev-m1",
                type: "photo",
                title: "Robot Prototype Maze Run",
                url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
                description: "Photo of the micro-mouse robot prototype completing the maze test run in under 45 seconds.",
                date: "2026-05-20"
              },
              {
                id: "ev-m2",
                type: "link",
                title: "Maze Algorithm GitHub Repository",
                url: "https://github.com/kantwon/micromouse-maze-solver",
                description: "Complete Arduino implementation of the flood-fill pathfinding algorithm with unit tests.",
                date: "2026-05-22"
              }
            ]
          },
          {
            id: "proj-mock-2",
            title: "Analysis of Neural Style Transfer Architectures",
            description: "A research paper comparing Gatys style transfer with feed-forward real-time style networks.",
            type: "research",
            status: "completed",
            steps: [],
            learnings: "I learned how to implement VGG-19 loss networks, train feed-forward generators in PyTorch, and write an academic abstract suitable for secondary school science journals.",
            dateAdded: "2026-06-01",
            evidenceList: [
              {
                id: "ev-m3",
                type: "pdf",
                title: "Research Paper Draft (Preprint)",
                url: "docs/neural_style_transfer_preprint.pdf",
                description: "Preprint PDF submitted to the Journal of Science Research (JSR) detailing hyperparameter search results.",
                date: "2026-06-03"
              },
              {
                id: "ev-m4",
                type: "log",
                title: "PyTorch Model Training Run Log",
                url: "",
                description: "Successfully reduced style reconstruction loss by 35% using style weight hyperparameter adjustments.",
                date: "2026-06-04"
              }
            ]
          }
        ],
        portfolioAchievements: [
          { id: "ach-m1", title: "1st Place Science Fair", category: "Award", date: "2025-05-10", detail: "Won grand prize at state level for robotics innovation." },
          { id: "ach-m2", title: "Coding Club President", category: "Leadership", date: "2025-09-01", detail: "Lead weekly meetings and mentoring for 25+ club members." }
        ],
        portfolioBio: "I'm a senior at Georgia Tech High passionate about robotics and neural networks. I build autonomous machines and write clean code to solve real-world engineering problems.",
        portfolioTheme: "custom",
        portfolioStyles: {
          bgStart: "#f43f5e",
          bgEnd: "#f97316",
          textColor: "#ffffff",
          borderRadius: "16",
          glassOpacity: "0.8",
          emoji: "🚀",
          fontFamily: "Outfit",
          themePreset: "custom"
        },
        customizerOpen: true
      };
      localStorage.setItem('leveled_state', JSON.stringify(mockState));
      localStorage.setItem('leveled_users', JSON.stringify([mockState]));
    }

    if (window.location.search.includes('logout=true')) {
      localStorage.removeItem('leveled_state');
    }

    this.state = this.loadState();
    this.initTheme();
    this.initEventListeners();
    this.checkStreak();
    this.renderShell();
  }

  loadState() {
    const defaultState = {
      user: null, // Holds onboarding profile
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedMilestones: [],
      savedOpportunities: [],
      opportunityApplications: {}, // { oppId: 'saved' | 'in_progress' | 'submitted' | 'accepted' }
      projects: [],
      essayCritiques: []
    };

    const saved = localStorage.getItem('leveled_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Sync structures in case of upgrades
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error('Error loading saved state, resetting.', e);
        return defaultState;
      }
    }
    return defaultState;
  }

  saveState() {
    localStorage.setItem('leveled_state', JSON.stringify(this.state));
    this.updateHeaderStats();

    // Persist current state in multi-user local database
    if (this.state.user && this.state.user.name) {
      const rawUsers = localStorage.getItem('leveled_users');
      let users = [];
      if (rawUsers) {
        try { users = JSON.parse(rawUsers); } catch(e) {}
      }
      const idx = users.findIndex(u => u.user.name.toLowerCase() === this.state.user.name.toLowerCase());
      if (idx !== -1) {
        users[idx] = this.state;
      } else {
        users.push(this.state);
      }
      localStorage.setItem('leveled_users', JSON.stringify(users));

      // Sync with the backend database
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(data => {
        console.log('Backend sync status:', data);
      })
      .catch(err => {
        console.warn('Backend sync failed, saved locally:', err);
      });
    }
  }

  initTheme() {
    const saved = localStorage.getItem('leveled_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeUI(saved);
  }

  toggleTheme() {
    if (!this.state.user) return; // Prevent toggling on landing page
    
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('leveled_theme', newTheme);
    this.updateThemeUI(newTheme);
  }

  updateThemeUI(theme) {
    const icons = document.querySelectorAll('.theme-icon, #theme-toggle-mobile');
    const labels = document.querySelectorAll('.theme-label');
    
    icons.forEach(el => {
      el.textContent = theme === 'dark' ? '☀️' : '🌙';
    });

    labels.forEach(el => {
      el.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    });
  }

  initEventListeners() {
    // Theme triggers
    const desktopToggle = document.getElementById('theme-toggle-desktop');
    if (desktopToggle) desktopToggle.addEventListener('click', () => this.toggleTheme());
    
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    if (mobileToggle) mobileToggle.addEventListener('click', () => this.toggleTheme());
    
    const logoutDock = document.getElementById('logout-dock');
    if (logoutDock) logoutDock.addEventListener('click', () => this.handleLogout());

    // Navigation triggers
    window.addEventListener('hashchange', () => this.handleRouting());

    // Sidebar navigation highlight handlers
    const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (hash) {
          // Allow routing via standard hashchange
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });

    // AI Mentor FAB Triggers
    const mentorFab = document.getElementById('ivy-mentor-bird');
    const mentorMobile = document.getElementById('mentor-trigger-mobile');
    
    if (mentorFab) {
      mentorFab.addEventListener('click', () => this.toggleMentorPanel());
    }
    if (mentorMobile) {
      mentorMobile.addEventListener('click', () => this.toggleMentorPanel());
    }

    // Slide-out Menu (Hamburger)
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const slideMenu = document.getElementById('slide-menu');
    const slideOverlay = document.getElementById('slide-menu-overlay');
    const slideClose = document.getElementById('slide-menu-close');

    const openSlideMenu = () => {
      slideMenu.classList.add('open');
      slideOverlay.classList.add('open');
      // Highlight current page
      const currentHash = window.location.hash.replace('#', '') || 'dashboard';
      document.querySelectorAll('.slide-menu-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === currentHash);
      });
    };
    const closeSlideMenu = () => {
      slideMenu.classList.remove('open');
      slideOverlay.classList.remove('open');
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSlideMenu);
    if (slideClose) slideClose.addEventListener('click', closeSlideMenu);
    if (slideOverlay) slideOverlay.addEventListener('click', closeSlideMenu);

    // Slide menu nav links
    document.querySelectorAll('.slide-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        closeSlideMenu();
      });
    });

    // Modal Close
    document.getElementById('modal-close-btn').addEventListener('click', () => this.closeModal());
    document.getElementById('modal-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') this.closeModal();
    });

    // Logout triggers
    const logoutDesktop = document.getElementById('logout-desktop');
    const logoutMobile = document.getElementById('logout-mobile');
    const logoutAction = () => {
      const confirmLogout = confirm('Are you sure you want to log out of Leveld OS?');
      if (confirmLogout) {
        this.state = {
          user: null,
          xp: 0,
          level: 1,
          streak: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          completedMilestones: [],
          savedOpportunities: [],
          opportunityApplications: {},
          projects: [],
          essayCritiques: []
        };
        this.saveState();
        this.initTheme(); // Re-evaluate theme after logout
        this.renderShell();
      }
    };
    if (logoutDesktop) logoutDesktop.addEventListener('click', logoutAction);
    if (logoutMobile) logoutMobile.addEventListener('click', logoutAction);

    // Profile peek trigger
    const profilePeek = document.getElementById('profile-peek');
    if (profilePeek) {
      profilePeek.style.cursor = 'pointer';
      profilePeek.addEventListener('click', () => {
        window.location.hash = '#profile';
      });
    }
  }

  toggleMentorPanel() {
    const panel = document.getElementById('ai-mentor-panel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      Mentor.onOpen();
    }
  }

  checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = this.state.lastActiveDate;

    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive === yesterdayStr) {
        // Increment streak
        this.state.streak += 1;
        this.showToast('🔥 Daily Streak Active! Streak: ' + this.state.streak + ' days');
      } else {
        // Reset streak
        this.state.streak = 1;
      }
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  addXP(amount, reason) {
    this.state.xp += amount;
    this.showToast(`+${amount} XP: ${reason}`);
    
    // Check level up
    let newLevel = this.state.level;
    for (let i = 0; i < LEVEL_XP_THRESHOLDS.length; i++) {
      if (this.state.xp >= LEVEL_XP_THRESHOLDS[i]) {
        newLevel = i + 1;
      }
    }

    if (newLevel > this.state.level) {
      this.state.level = newLevel;
      const title = LEVEL_TITLES[newLevel - 1] || 'Visionary';
      this.showLevelUpModal(newLevel, title);
    }
    
    this.saveState();
    this.updateHeaderStats();
    
    // Re-render dashboard if visible
    if (window.location.hash === '#dashboard' || !window.location.hash) {
      Dashboard.render();
    }
  }

  showToast(message) {
    const container = document.getElementById('xp-toast-container');
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.innerHTML = `<span>⚡</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  showLevelUpModal(level, title) {
    this.openModal(`
      <div class="level-up-modal-content" style="text-align: center; padding: 20px 0;">
        <div style="font-size: 72px; margin-bottom: 12px; animation: bounce 1s infinite alternate;">🏆</div>
        <h2 style="font-family: var(--font-heading); font-size: 32px; font-weight: 800; background: linear-gradient(135deg, var(--color-level), var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">LEVEL UP!</h2>
        <p style="color: var(--text-secondary); font-size: 16px; margin-bottom: 24px;">You have achieved level <strong>${level}</strong>!</p>
        <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 16px; display: inline-block; margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 800; color: var(--color-level); text-transform: uppercase; letter-spacing: 1px;">New Rank unlocked</div>
          <div style="font-family: var(--font-heading); font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">${title}</div>
        </div>
        <div>
          <button class="btn btn-primary" onclick="LeveledApp.closeModal()">Awesome!</button>
        </div>
      </div>
    `);
  }

  openModal(html) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    body.innerHTML = html;
    overlay.style.display = 'flex';
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.style.display = 'none';
  }

  updateHeaderStats() {
    const xpEl = document.getElementById('xp-value');
    if (xpEl) xpEl.textContent = this.state.xp.toLocaleString();
    
    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.textContent = this.state.streak;
    
    // Sidebar elements
    if (this.state.user) {
      const nameEl = document.getElementById('sidebar-user-name');
      if (nameEl) nameEl.textContent = this.state.user.name;
      
      const badgeEl = document.getElementById('sidebar-level-badge');
      if (badgeEl) badgeEl.textContent = this.state.level;
      
      const titleEl = document.getElementById('sidebar-user-level-title');
      if (titleEl) titleEl.textContent = LEVEL_TITLES[this.state.level - 1] || 'Visionary';
      
      const avatarEl = document.getElementById('sidebar-avatar');
      if (avatarEl) {
        const firstInitial = this.state.user.name.charAt(0).toUpperCase();
        avatarEl.textContent = firstInitial;
      }
    }
    this.updateCollegeNavigation();
  }

  updateCollegeNavigation() {
    const user = this.state.user;
    if (!user) return;

    const isCollege = (user.grade && (
      user.grade.toLowerCase().includes('college') || 
      user.grade.toLowerCase().includes('undergrad') || 
      user.grade.toLowerCase().includes('university') || 
      user.grade.toLowerCase().includes('freshman') || 
      user.grade.toLowerCase().includes('sophomore') || 
      user.grade.toLowerCase().includes('junior') || 
      user.grade.toLowerCase().includes('senior')
    ));

    const jobsSidebar = document.getElementById('nav-sidebar-jobs');
    const jobsMobile = document.getElementById('nav-mobile-jobs');

    const ecSidebarLabel = document.querySelector('#nav-sidebar-extracurriculars');
    const ecMobileLabel = document.querySelector('#nav-mobile-extracurriculars .bottom-nav-label');

    const essaySidebarLabel = document.querySelector('#nav-sidebar-essay');
    
    if (isCollege) {
      if (jobsSidebar) jobsSidebar.style.display = 'flex';
      if (jobsMobile) jobsMobile.style.display = 'inline-flex';
      
      if (ecSidebarLabel) ecSidebarLabel.textContent = 'Internships & Work';
      if (ecMobileLabel) ecMobileLabel.textContent = 'Interns';
      
      if (essaySidebarLabel) essaySidebarLabel.textContent = 'Resume Studio';
    } else {
      if (jobsSidebar) jobsSidebar.style.display = 'none';
      if (jobsMobile) jobsMobile.style.display = 'none';
      
      if (ecSidebarLabel) ecSidebarLabel.textContent = 'Extracurriculars';
      if (ecMobileLabel) ecMobileLabel.textContent = 'Extra';
      
      if (essaySidebarLabel) essaySidebarLabel.textContent = 'Essay Studio';
    }
  }

  renderShell() {
    if (window.location.search.includes('onboarding=true')) {
      document.getElementById('app-layout').style.display = 'none';
      document.getElementById('landing-layout').style.display = 'none';
      document.getElementById('onboarding-layout').style.display = 'flex';
      Onboarding.init();
    } else if (!this.state.user) {
      // Show Landing Page
      document.getElementById('app-layout').style.display = 'none';
      document.getElementById('onboarding-layout').style.display = 'none';
      document.getElementById('landing-layout').style.display = 'flex';
      Landing.render();
    } else {
      // Show App Layout
      document.getElementById('landing-layout').style.display = 'none';
      document.getElementById('onboarding-layout').style.display = 'none';
      document.getElementById('app-layout').style.display = 'grid';
      this.updateHeaderStats();
      this.updateCollegeNavigation();
      Mentor.init();
      this.handleRouting();
    }
  }

  completeOnboarding(profileData) {
    const initialState = {
      user: profileData,
      xp: 100,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      completedMilestones: [],
      savedOpportunities: [],
      opportunityApplications: {},
      projects: [],
      essayCritiques: []
    };

    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialState)
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.error || 'Registration failed'); });
      }
      return res.json();
    })
    .then(data => {
      this.state = data.state;
      this.saveState();
      this.renderShell();
      this.showToast('🚀 Profile registered in database! Welcome.');
    })
    .catch(err => {
      console.warn('Backend unavailable, running locally:', err);
      this.state = initialState;
      this.saveState();
      this.renderShell();
      this.showToast('🚀 Profile created locally! Welcome.');
    });
  }

  handleRouting() {
    let hash = window.location.hash || '#dashboard';

    // Intercept Jobs for under 12th grade
    if (hash === '#jobs' && this.state.user) {
      const user = this.state.user;
      let currentGradeNum = parseInt(user.grade) || 10;
      if (typeof user.grade === 'string' && user.grade.includes('th')) {
        currentGradeNum = parseInt(user.grade.split('th')[0]) || 10;
      }
      const isCollege = (user.grade && (
        user.grade.toLowerCase().includes('college') || 
        user.grade.toLowerCase().includes('undergrad') || 
        user.grade.toLowerCase().includes('university') || 
        user.grade.toLowerCase().includes('freshman') || 
        user.grade.toLowerCase().includes('sophomore') || 
        user.grade.toLowerCase().includes('junior') || 
        user.grade.toLowerCase().includes('senior')
      ));

      if (currentGradeNum <= 12 && !isCollege) {
        this.openModal(`
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 64px; margin-bottom: 16px;">🛑</div>
            <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; margin-bottom: 12px;">Whoa there, speedster!</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">The Job Search module is strictly for College students and graduates. Go pass 12th grade first, kiddo! 😂</p>
            <button class="btn btn-primary" onclick="LeveledApp.closeModal(); window.location.hash = '#dashboard';">Okay, back to school 🎒</button>
          </div>
        `);
        // Do not render the view
        return;
      }
    }
    
    // Redirect obsolete routes
    if (hash === '#discovery') {
      Extracurriculars.activeTab = 'opportunities';
      window.location.hash = '#extracurriculars';
      return;
    }
    if (hash === '#readiness') {
      window.location.hash = '#profile';
      return;
    }

    // Deactivate all sections and nav highlights
    const sections = document.querySelectorAll('.app-view');
    sections.forEach(s => {
      s.style.display = 'none';
      s.classList.remove('active-view');
    });

    const navLinks = document.querySelectorAll('.nav-link, .bottom-nav-link');
    navLinks.forEach(l => l.classList.remove('active'));

    const route = hash.substring(1);
    const targetSection = document.getElementById(`view-${route}`);
    const pageTitle = document.getElementById('current-page-title');

    if (targetSection) {
      targetSection.style.display = 'block';
      setTimeout(() => targetSection.classList.add('active-view'), 10);
      
      // Update page title
      if (pageTitle) {
        if (route === 'dashboard' && this.state.user) {
          const firstName = this.state.user.name.split(' ')[0];
          pageTitle.textContent = `Welcome, ${firstName}`;
        } else if (route === 'admissions') {
          pageTitle.textContent = 'Admissions Calculator';
        } else if (route === 'jobs') {
          pageTitle.textContent = 'Career & Job Search';
        } else {
          const titleWords = route.charAt(0).toUpperCase() + route.slice(1);
          pageTitle.textContent = titleWords;
        }
      }

      // Update nav link active highlight
      const activeNavItems = document.querySelectorAll(`a[href="${hash}"]`);
      activeNavItems.forEach(el => el.classList.add('active'));

      // Render corresponding module
      this.renderViewComponent(route);
    }
  }

  renderViewComponent(route) {
    switch (route) {
      case 'dashboard':
        Dashboard.render();
        break;
      case 'roadmap':
        Roadmap.render();
        break;
      case 'profile':
        Profile.render();
        break;
      case 'calendar':
        Calendar.render();
        break;
      case 'extracurriculars':
        Extracurriculars.render();
        break;

      case 'portfolio':
        Portfolio.render();
        break;
      case 'essay':
        EssayStudio.render();
        break;
      case 'notes':
        Notes.render();
        break;
      case 'admissions':
        AdmissionsCalculator.render();
        break;
      case 'jobs':
        Jobs.render();
        break;
      case 'pricing':
        Pricing.render();
        break;
      default:
        console.error('Unknown route:', route);
    }
  }

  openMilestoneWorkspace(milestone) {
    const state = this.state;
    // Find existing project matching milestone
    let project = state.projects.find(p => p.milestoneId === milestone.id || (milestone.oppId && p.oppId === milestone.oppId) || p.title === milestone.title);
    
    if (!project) {
      // Create new project
      const type = milestone.isOpportunity ? 'opportunity' : (milestone.category === 'Research' ? 'research' : 'passion');
      project = {
        id: `proj-${Date.now()}`,
        milestoneId: milestone.id,
        oppId: milestone.oppId || null,
        title: milestone.title,
        description: milestone.description,
        type: type,
        status: 'in_progress',
        steps: milestone.steps.map(stepText => ({
          text: stepText,
          done: false,
          evidence: '',
          dateLogged: ''
        })),
        learnings: '',
        evidenceList: [],
        chatLog: [],
        dateAdded: new Date().toISOString().split('T')[0]
      };
      state.projects.push(project);
      this.saveState();
      this.showToast(`🚀 Started Workspace for "${milestone.title}"`);
    }

    Extracurriculars.activeTab = 'active';
    Extracurriculars.selectedProjectId = project.id;
    Extracurriculars.activeStepIndex = null;
    
    window.location.hash = '#extracurriculars';
  }

  openOpportunityWorkspace(opp) {
    const state = this.state;
    let project = state.projects.find(p => p.oppId === opp.id || p.title === opp.name);
    
    if (!project) {
      const stepsText = this.getOpportunitySteps(opp.category);
      project = {
        id: `proj-${Date.now()}`,
        oppId: opp.id,
        title: opp.name,
        description: opp.description,
        type: 'opportunity',
        status: 'in_progress',
        steps: stepsText.map(stepText => ({
          text: stepText,
          done: false,
          evidence: '',
          dateLogged: ''
        })),
        learnings: '',
        evidenceList: [],
        chatLog: [],
        dateAdded: new Date().toISOString().split('T')[0]
      };
      state.projects.push(project);
      this.saveState();
      this.showToast(`🚀 Started Workspace for "${opp.name}"`);
    }

    Extracurriculars.activeTab = 'active';
    Extracurriculars.selectedProjectId = project.id;
    Extracurriculars.activeStepIndex = null;
    
    window.location.hash = '#extracurriculars';
  }

  openRoadmapEventModal(id, title, type, mCategory = '') {
    const state = this.state;
    const isCompleted = state.completedMilestones.includes(id);

    // Swap activity replacement options
    const replacementOpps = OPPORTUNITIES.slice(0, 3);
    
    // Find matching project for evidence or details
    let project = state.projects.find(p => p.milestoneId === id || p.title === title);

    let modalHTML = `
      <div style="text-align: left; padding: 24px 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <span style="font-size: 11px; font-weight: 800; background-color: rgba(6,182,212,0.1); color: var(--secondary); padding: 4px 10px; border-radius: 8px; text-transform: uppercase;">${type || mCategory || 'Milestone'}</span>
          ${isCompleted ? '<span style="font-size: 11px; font-weight: 700; color: #10b981; background: rgba(16,185,129,0.1); padding: 4px 10px; border-radius: 8px;">✓ Completed</span>' : ''}
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; margin-bottom: 12px; color: var(--text-primary);">${title}</h3>
    `;

    if (isCompleted) {
      // Find evidence submitted
      let evidenceHTML = '';
      if (project && project.evidenceList && project.evidenceList.length > 0) {
        const lastEv = project.evidenceList[project.evidenceList.length - 1];
        evidenceHTML = `
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-top: 16px;">
            <div style="font-weight: 700; font-size: 13px; color: var(--text-primary); margin-bottom: 4px;">Submitted Evidence:</div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;"><strong>${lastEv.title}</strong> - ${lastEv.description}</div>
            <a href="${lastEv.url}" target="_blank" class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
              ${lastEv.type === 'link' ? '🔗 Link' : lastEv.type === 'photo' ? '🖼️ Media' : '📄 PDF'} ↗
            </a>
          </div>
        `;
      }
      modalHTML += `
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.5;">You have completed this milestone! Excellent work. The evidence has been added to your portfolio showcase.</p>
        ${evidenceHTML}
        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal();" style="flex: 1; border-radius: 12px; font-size: 13px; padding: 12px;">Close</button>
        </div>
      `;
    } else {
      modalHTML += `
        <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 24px;">Complete this milestone to earn XP, level up, and showcase your achievements in your portfolio.</p>
        
        <!-- Tab Switching for completion / workspace -->
        <div style="display: flex; gap: 12px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
          <button id="modal-tab-evidence" class="modal-tab-btn active" style="background: none; border: none; font-size: 13px; font-weight: 700; color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 8px; cursor: pointer; transition: all 0.2s; font-family: var(--font-heading);">📎 Complete with Evidence</button>
          <button id="modal-tab-workspace" class="modal-tab-btn" style="background: none; border: none; font-size: 13px; font-weight: 700; color: var(--text-muted); padding-bottom: 8px; cursor: pointer; transition: all 0.2s; font-family: var(--font-heading);">⚡ Open Workspace / Swap</button>
        </div>

        <!-- Tab 1: Evidence Submission Form -->
        <div id="modal-panel-evidence" style="display: block;">
          <form id="milestone-evidence-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Evidence Title</label>
              <input type="text" id="ev-title" class="form-control" placeholder="e.g., Deployed AI Helper Site" required style="font-size: 13px; padding: 10px;">
            </div>
            <div>
              <label style="display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Evidence Description</label>
              <textarea id="ev-desc" class="form-control" placeholder="What did you accomplish and what did you learn?" rows="2" required style="font-size: 13px; padding: 10px; resize: none;"></textarea>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px; margin-bottom: 12px;">
              <div>
                <label style="display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Type</label>
                <select id="ev-type" class="form-control" style="font-size: 13px; padding: 10px;">
                  <option value="link">🔗 Link / URL</option>
                  <option value="photo">🖼️ Image / Media</option>
                  <option value="pdf">📄 PDF Document</option>
                </select>
              </div>
              <div>
                <label style="display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">URL / File Path</label>
                <input type="text" id="ev-url" class="form-control" placeholder="e.g., https://github.com/... or assets/project.png" required style="font-size: 13px; padding: 10px;">
              </div>
            </div>
            <div>
              <label style="display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Or upload proof file (PDF, Image, Docs)</label>
              <input type="file" id="ev-file" class="form-control" style="font-size: 12px; padding: 8px;" accept="image/*,application/pdf,.doc,.docx,.txt,text/plain">
            </div>
            
            <button type="submit" class="btn btn-primary" style="margin-top: 12px; padding: 12px; font-weight: 700; border-radius: 12px; font-size: 13px; background: linear-gradient(135deg, #10b981, #059669); border: none;">✓ Complete & Add to Portfolio</button>
          </form>
        </div>

        <!-- Tab 2: Workspace & Skip options -->
        <div id="modal-panel-workspace" style="display: none;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <button class="btn btn-primary" id="btn-go-to-workspace" style="padding: 14px 20px; font-size: 13px; border-radius: 12px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; font-weight: 700;">⚡ Go to Project Workspace</button>
            
            <div style="border-top: 1px solid var(--border-color); margin-top: 8px; padding-top: 16px;">
              <button class="btn btn-secondary" onclick="document.getElementById('skip-panel').style.display='block'; this.style.display='none';" style="padding: 10px 16px; font-size: 12px; border-radius: 12px; width: 100%; border-color: rgba(239, 68, 68, 0.3); color: #ef4444; background: rgba(239, 68, 68, 0.05);">⚠️ Swap or Remove Activity</button>
              
              <div id="skip-panel" style="display: none; margin-top: 0; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px; box-shadow: 0 12px 32px rgba(0,0,0,0.05);">
                <h4 style="font-size: 14px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">Swap Activity?</h4>
                <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">Skipping this without replacement will lower your admissions scores. Choose an alternative:</p>
                
                <div style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-bottom: 16px;">
                  ${replacementOpps.map(opp => `
                    <div class="replacement-mini-card" onclick="document.getElementById('replace-category-input').value = '${opp.name}'; document.querySelectorAll('.replacement-mini-card').forEach(c=>c.style.borderColor='var(--border-color)'); this.style.borderColor='var(--primary)';" style="padding: 10px; border: 2px solid var(--border-color); border-radius: 12px; cursor: pointer; transition: all 0.2s; background: var(--bg-secondary);">
                      <div style="font-size: 10px; color: var(--primary); font-weight: 700; text-transform: uppercase; margin-bottom: 2px;">${opp.category}</div>
                      <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${opp.name}</div>
                    </div>
                  `).join('')}
                </div>
                
                <input type="hidden" id="replace-category-input" value="">
  
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <button class="btn btn-primary" id="btn-replace-milestone" style="font-size: 12px; padding: 10px; border-radius: 12px;">🔄 Swap Activity</button>
                  <button class="btn btn-danger" id="btn-skip-milestone" style="font-size: 12px; padding: 10px; background-color: transparent; color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px;">🚫 Delete Activity (Warning)</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.openModal(modalHTML);

    // Bind event handlers inside the modal after open
    setTimeout(() => {
      // Tab switching
      const tabEv = document.getElementById('modal-tab-evidence');
      const tabWork = document.getElementById('modal-tab-workspace');
      const panelEv = document.getElementById('modal-panel-evidence');
      const panelWork = document.getElementById('modal-panel-workspace');

      if (tabEv && tabWork) {
        tabEv.onclick = () => {
          tabEv.classList.add('active');
          tabEv.style.color = 'var(--primary)';
          tabEv.style.borderBottom = '2px solid var(--primary)';
          tabWork.classList.remove('active');
          tabWork.style.color = 'var(--text-muted)';
          tabWork.style.borderBottom = 'none';
          panelEv.style.display = 'block';
          panelWork.style.display = 'none';
        };

        tabWork.onclick = () => {
          tabWork.classList.add('active');
          tabWork.style.color = 'var(--primary)';
          tabWork.style.borderBottom = '2px solid var(--primary)';
          tabEv.classList.remove('active');
          tabEv.style.color = 'var(--text-muted)';
          tabEv.style.borderBottom = 'none';
          panelWork.style.display = 'block';
          panelEv.style.display = 'none';
        };
      }

      // File upload helper
      const fileInput = document.getElementById('ev-file');
      const urlInput = document.getElementById('ev-url');
      if (fileInput && urlInput) {
        fileInput.onchange = () => {
          if (fileInput.files.length > 0) {
            urlInput.removeAttribute('required');
            urlInput.placeholder = "File selected for upload (URL optional)";
            urlInput.disabled = true;
          } else {
            urlInput.setAttribute('required', 'true');
            urlInput.placeholder = "e.g., https://github.com/...";
            urlInput.disabled = false;
          }
        };
      }

      // Go to workspace button
      const goToWorkspaceBtn = document.getElementById('btn-go-to-workspace');
      if (goToWorkspaceBtn) {
        goToWorkspaceBtn.onclick = () => {
          this.closeModal();
          
          // Generate full milestone structure so openMilestoneWorkspace can find/create the project
          const user = state.user;
          const milestones = AISimulator.generateRoadmap(user);
          const milestone = milestones.find(m => m.id === id) || {
            id: id,
            title: title,
            category: type || 'Passion Project',
            description: '',
            steps: ['Research the topic', 'Build a prototype', 'Log findings'],
            xpReward: 300
          };
          this.openMilestoneWorkspace(milestone);
        };
      }

      // Evidence Submission Submit
      const evidenceForm = document.getElementById('milestone-evidence-form');
      if (evidenceForm) {
        evidenceForm.onsubmit = async (event) => {
          event.preventDefault();
          const evTitle = document.getElementById('ev-title').value.trim();
          const evDesc = document.getElementById('ev-desc').value.trim();
          const evType = document.getElementById('ev-type').value;
          const evUrlInput = document.getElementById('ev-url');
          let evUrl = evUrlInput.value.trim();

          const fileInput = document.getElementById('ev-file');
          if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            try {
              evUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = e => reject(e);
                reader.readAsDataURL(file);
              });
            } catch (e) {
              console.error("Error reading file:", e);
              return alert("Failed to read upload file.");
            }
          }

          if (!evTitle || !evDesc || (!evUrl && evUrlInput.hasAttribute('required'))) {
            return alert('Please fill in all evidence fields or select a file to upload!');
          }

          // 1. Create matching project if not exists
          const user = state.user;
          const milestones = AISimulator.generateRoadmap(user);
          const milestone = milestones.find(m => m.id === id) || {
            id: id,
            title: title,
            category: type || 'Passion Project',
            description: '',
            steps: ['Research the topic', 'Build a prototype', 'Log findings'],
            xpReward: 300
          };

          let proj = state.projects.find(p => p.milestoneId === id || p.title === title);
          if (!proj) {
            const projType = milestone.category === 'Research' ? 'research' : 'passion';
            proj = {
              id: `proj-${Date.now()}`,
              milestoneId: id,
              oppId: milestone.oppId || null,
              title: title,
              description: milestone.description || '',
              type: projType,
              status: 'completed',
              steps: (milestone.steps || ['Research the topic', 'Build a prototype', 'Log findings']).map(sText => ({
                text: sText,
                done: true,
                evidence: evUrl,
                dateLogged: new Date().toISOString().split('T')[0]
              })),
              learnings: evDesc,
              evidenceList: [],
              chatLog: [],
              dateAdded: new Date().toISOString().split('T')[0]
            };
            state.projects.push(proj);
          } else {
            proj.status = 'completed';
            proj.steps.forEach(s => { s.done = true; });
          }

          // 2. Add evidence object to project evidenceList
          proj.evidenceList = proj.evidenceList || [];
          proj.evidenceList.push({
            id: `ev-${Date.now()}`,
            title: evTitle,
            description: evDesc,
            type: evType, // 'link', 'photo', 'pdf'
            url: evUrl,
            date: new Date().toISOString().split('T')[0]
          });

          // 3. Mark milestone as completed
          if (!state.completedMilestones.includes(id)) {
            state.completedMilestones.push(id);
          }

          // 4. Save state, add XP, close modal, and toast
          this.saveState();
          const xp = milestone.xpReward || 300;
          this.addXP(xp, `Completed Milestone: ${title}`);
          this.closeModal();
          this.showToast(`🏆 Milestone Completed & Added to Portfolio!`);

          // 5. Re-render the active view component
          const activeRoute = (window.location.hash || '#dashboard').substring(1);
          this.renderViewComponent(activeRoute);
        };
      }

      // Swap / Skip button triggers
      const replaceBtn = document.getElementById('btn-replace-milestone');
      if (replaceBtn) {
        replaceBtn.onclick = () => {
          const cat = document.getElementById('replace-category-input').value;
          if (!cat) return alert('Please select a replacement card first!');
          state.replacedMilestones = state.replacedMilestones || {};
          state.replacedMilestones[id] = { title: cat, category: 'Custom', description: `Student swapped to: ${cat}` };
          this.saveState();
          this.closeModal();
          this.showToast('Activity swapped successfully! Roadmap updated.');
          
          const activeRoute = (window.location.hash || '#dashboard').substring(1);
          this.renderViewComponent(activeRoute);
        };
      }

      const skipBtn = document.getElementById('btn-skip-milestone');
      if (skipBtn) {
        skipBtn.onclick = () => {
          if (confirm('Are you sure you want to delete this activity? This will lower your Admissions Insights scores.')) {
            state.skippedMilestones = state.skippedMilestones || [];
            if (!state.skippedMilestones.includes(id)) state.skippedMilestones.push(id);
            this.saveState();
            this.closeModal();
            this.showToast('Activity deleted from plan.');
            
            const activeRoute = (window.location.hash || '#dashboard').substring(1);
            this.renderViewComponent(activeRoute);
          }
        };
      }
    }, 100);
  }
  }

  getOpportunitySteps(category) {
    if (category === 'olympiad') {
      return [
        'Review syllabus and official competitive programming guidebooks.',
        'Solve at least 10 historical Olympiad contest questions under time limits.',
        'Practice key data structures (trees, graphs) and dynamic programming algorithms.',
        'Simulate a full-length contest environment and compile performance logs.'
      ];
    } else if (category === 'hackathon') {
      return [
        'Research prior winning hackathon projects and tech stacks.',
        'Form a collaboration team and sketch wireframe interface layouts.',
        'Build a functional frontend and integrate API mock layers.',
        'Record a 2-minute project demo video and write a Devpost description page.'
      ];
    } else if (category === 'research') {
      return [
        'Conduct a comprehensive literature search on Google Scholar.',
        'Draft a structured research abstract and outline the core methodology.',
        'Gather and analyze primary data sets using Python or Google Sheets.',
        'Write the final research paper draft and submit to peer-reviewed science journals.'
      ];
    } else if (category === 'internship') {
      return [
        'Update your professional resume highlighting relevant technical skills.',
        'Contribute to open source GitHub issues or build personal projects.',
        'Prepare cover letters and request reference approvals.',
        'Submit the application form and schedule practice interview questions.'
      ];
    } else if (category === 'course') {
      return [
        'Enroll in the Coursera portal and access course materials.',
        'Establish a weekly study schedule (target 4-6 hours/week).',
        'Complete all lesson videos, quizzes, and hands-on coding labs.',
        'Submit the final capstone project and secure your official verified certificate.'
      ];
    } else {
      return [
        'Review application eligibility criteria and deadline rules.',
        'Write or draft the personal statements or essays.',
        'Obtain necessary transcripts, certificates, or letters of recommendation.',
        'Verify resource URLs and complete the online application portal.'
      ];
    }
  }
}

// Instantiate and expose globally
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.LeveledApp = new App();
  });
} else {
  window.LeveledApp = new App();
}

