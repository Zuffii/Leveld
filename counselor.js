// counselor.js - School & Counselor Portal Client Script

let studentsData = [];
let currentSchool = '';
let activeStudent = null;

// Initialize dashboard elements
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchStudents();
  setupEventListeners();
});

// Fetch all student records
async function fetchStudents() {
  try {
    const response = await fetch('/api/admin/students');
    if (!response.ok) {
      throw new Error('Failed to fetch students database');
    }
    const data = await response.json();
    studentsData = data.students || [];
    
    populateSchoolSelector();
    loadSchoolDashboard();
  } catch (error) {
    console.error('Error fetching students:', error);
    showErrorState();
  }
}

// Populate the Sidebar School Selector Dropdown
function populateSchoolSelector() {
  const select = document.getElementById('school-select');
  if (!select) return;

  // Extract unique schools from database
  const schools = [...new Set(studentsData.map(s => s.user?.school).filter(Boolean))];
  
  if (schools.length === 0) {
    select.innerHTML = '<option value="">No schools in system</option>';
    return;
  }

  select.innerHTML = schools.map(school => `<option value="${school}">${school}</option>`).join('');
  
  // Set default current school to the first one
  currentSchool = schools[0];
  select.value = currentSchool;
}

// Load metrics and students table for the selected school
function loadSchoolDashboard() {
  if (!currentSchool) return;

  // Filter students by current school
  const schoolStudents = studentsData.filter(s => s.user?.school === currentSchool);

  // Update subtitle
  document.getElementById('school-subtitle').textContent = `Managing student profiles at ${currentSchool}`;

  // Calculate & Update Metrics
  const total = schoolStudents.length;
  const avgLevel = total > 0 ? (schoolStudents.reduce((sum, s) => sum + (s.level || 1), 0) / total).toFixed(1) : 0;
  const avgXP = total > 0 ? Math.round(schoolStudents.reduce((sum, s) => sum + (s.xp || 0), 0) / total) : 0;
  const avgStreak = total > 0 ? Math.round(schoolStudents.reduce((sum, s) => sum + (s.streak || 0), 0) / total) : 0;

  document.getElementById('metric-total-students').textContent = total;
  document.getElementById('metric-avg-level').textContent = avgLevel;
  document.getElementById('metric-avg-xp').textContent = avgXP.toLocaleString();
  document.getElementById('metric-avg-streak').textContent = `${avgStreak} 🔥`;

  // Populate Career Goals filter dropdown based on this school's students
  populateCareerFilter(schoolStudents);

  // Render Table Roster
  renderStudentsTable(schoolStudents);
}

// Populate the Career Path filter select element
function populateCareerFilter(schoolStudents) {
  const select = document.getElementById('filter-status');
  if (!select) return;

  const careerGoals = [...new Set(schoolStudents.map(s => s.user?.careerGoals).filter(Boolean))];
  
  let html = '<option value="">All Career Paths</option>';
  html += careerGoals.map(goal => `<option value="${goal}">${goal}</option>`).join('');
  select.innerHTML = html;
}

// Render the Roster table
function renderStudentsTable(filteredStudents) {
  const tbody = document.getElementById('student-table-body');
  if (!tbody) return;

  // Apply active filters (search, grade, career path)
  const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
  const gradeFilter = document.getElementById('filter-grade').value;
  const careerFilter = document.getElementById('filter-status').value;

  const displayedStudents = filteredStudents.filter(entry => {
    const user = entry.user || {};
    
    // Search match
    const nameMatch = (user.name || '').toLowerCase().includes(searchQuery);
    const usernameMatch = (user.username || '').toLowerCase().includes(searchQuery);
    const goalsMatch = (user.careerGoals || '').toLowerCase().includes(searchQuery);
    const uniMatch = (user.dreamUniversities || []).some(uni => uni.toLowerCase().includes(searchQuery));
    const skillsMatch = (user.skills || []).some(skill => skill.toLowerCase().includes(searchQuery));
    const interestsMatch = (user.interests || []).some(interest => interest.toLowerCase().includes(searchQuery));
    
    const searchMatch = !searchQuery || (nameMatch || usernameMatch || goalsMatch || uniMatch || skillsMatch || interestsMatch);

    // Grade match
    let studentGrade = (user.grade || '').toString();
    // Normalize e.g. "10th Grade" or "10" to match selection "10"
    if (studentGrade.includes('th')) {
      studentGrade = studentGrade.split('th')[0].trim();
    }
    const gradeMatch = !gradeFilter || studentGrade === gradeFilter;

    // Career match
    const careerMatch = !careerFilter || user.careerGoals === careerFilter;

    return searchMatch && gradeMatch && careerMatch;
  });

  if (displayedStudents.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <span class="empty-icon">🔍</span>
            <p>No matching student records found for the current filters.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = displayedStudents.map(entry => {
    const user = entry.user || {};
    const name = user.name || 'Anonymous Student';
    const username = user.username || 'unknown';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'ST';
    
    // Format dream universities
    const dreamSchool = (user.dreamUniversities && user.dreamUniversities.length > 0) 
      ? user.dreamUniversities[0] 
      : 'Not Decided';

    return `
      <tr data-username="${username}">
        <td>
          <div class="student-meta-cell">
            <div class="student-avatar">${initials}</div>
            <div>
              <div class="student-name">${name}</div>
              <div class="student-username">@${username}</div>
            </div>
          </div>
        </td>
        <td>Grade ${user.grade || 'N/A'}</td>
        <td><span class="badge badge-blue">Lvl ${entry.level || 1}</span></td>
        <td style="font-weight: 500;">${(entry.xp || 0).toLocaleString()}</td>
        <td>${entry.streak || 0} 🔥</td>
        <td>${user.careerGoals || 'Undecided'}</td>
        <td style="color: var(--color-text-secondary);">${dreamSchool}</td>
      </tr>
    `;
  }).join('');

  // Add event listeners to table rows to open student inspector
  tbody.querySelectorAll('tr[data-username]').forEach(row => {
    row.addEventListener('click', () => {
      const username = row.getAttribute('data-username');
      openStudentInspector(username);
    });
  });
}

// Open and populate the Sliding Side Panel for the clicked student
function openStudentInspector(username) {
  const entry = studentsData.find(s => s.user?.username === username);
  if (!entry) return;

  activeStudent = entry;
  const user = entry.user || {};
  const initials = (user.name || 'ST').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  // Set Profile header details
  document.getElementById('inspector-avatar').textContent = initials;
  document.getElementById('inspector-name').textContent = user.name || 'Anonymous Student';
  document.getElementById('inspector-school-grade').textContent = `${user.school || 'Leveld Academy'} • Grade ${user.grade || 'N/A'}`;
  
  document.getElementById('inspector-level').textContent = entry.level || 1;
  document.getElementById('inspector-xp').textContent = (entry.xp || 0).toLocaleString();
  document.getElementById('inspector-streak').textContent = `${entry.streak || 0} 🔥`;

  // Render Inspector Tab contents
  renderProfileTab();
  renderProjectsTab();
  renderEssaysTab();
  renderMentorTab();

  // Reset tab to Profile default
  switchTab('tab-profile');

  // Activate Inspector UI
  document.getElementById('student-inspector').classList.add('active');
  document.getElementById('inspector-backdrop').classList.add('active');
}

// Close Student Inspector
function closeStudentInspector() {
  activeStudent = null;
  document.getElementById('student-inspector').classList.remove('active');
  document.getElementById('inspector-backdrop').classList.remove('active');
}

// Render Profile Details Tab
function renderProfileTab() {
  if (!activeStudent) return;
  const user = activeStudent.user || {};

  document.getElementById('insp-career').textContent = user.careerGoals || 'Not specified';
  
  const dreamSchoolList = user.dreamUniversities || [];
  document.getElementById('insp-universities').textContent = dreamSchoolList.length > 0 
    ? dreamSchoolList.join(', ') 
    : 'Not specified';

  // Render tags
  renderTagContainer('insp-strengths', user.academicStrengths || [], 'No academic strengths listed');
  renderTagContainer('insp-interests', user.interests || [], 'No interests listed');
  renderTagContainer('insp-skills', user.skills || [], 'No key skills listed');
}

function renderTagContainer(containerId, items, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<span style="color: var(--color-text-muted); font-size: 13px; font-style: italic;">${emptyText}</span>`;
    return;
  }

  container.innerHTML = items.map(item => `<span class="tag-item">${item}</span>`).join('');
}

// Render Projects List Tab
function renderProjectsTab() {
  const container = document.getElementById('insp-projects-list');
  if (!container) return;

  const projects = activeStudent?.projects || [];
  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <span class="empty-icon">🔨</span>
        <p>No research or passion projects started in workspace.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map(proj => {
    const statusText = proj.status === 'completed' ? 'Completed' : 'In Progress';
    const badgeClass = proj.status === 'completed' ? 'badge-green' : 'badge-blue';
    const typeLabel = proj.type ? (proj.type.charAt(0).toUpperCase() + proj.type.slice(1)) : 'Project';

    // Renders checklist items
    const stepsHtml = (proj.steps && proj.steps.length > 0) ? `
      <div class="project-steps">
        <strong style="font-size: 12px; color: var(--color-text-muted);">WORKSPACE MILESTONES:</strong>
        ${proj.steps.map(step => `
          <div class="project-step">
            <input type="checkbox" class="step-checkbox" disabled ${step.done ? 'checked' : ''}>
            <span class="step-text ${step.done ? 'done' : ''}">${step.text}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    // Renders learnings if present
    const learningsHtml = proj.learnings ? `
      <div class="project-learnings">
        <strong>Learnings & Key Achievements:</strong><br>${proj.learnings}
      </div>
    ` : '';

    // Renders evidence items
    const evidenceHtml = (proj.evidenceList && proj.evidenceList.length > 0) ? `
      <div class="evidence-list">
        <strong style="font-size: 11px; color: var(--color-text-muted);">EVIDENCE ATTACHED:</strong>
        ${proj.evidenceList.map(ev => `
          <a href="${ev.url || '#'}" target="_blank" class="evidence-item">
            <span>🔗</span> <strong>${ev.title}</strong> - ${ev.description}
          </a>
        `).join('')}
      </div>
    ` : '';

    return `
      <div class="project-card">
        <div class="project-header">
          <div>
            <h5 class="project-title">${proj.title}</h5>
            <span class="badge ${badgeClass}" style="margin-top: 6px;">${typeLabel} • ${statusText}</span>
          </div>
        </div>
        <p class="project-desc">${proj.description || 'No description provided.'}</p>
        ${stepsHtml}
        ${learningsHtml}
        ${evidenceHtml}
      </div>
    `;
  }).join('');
}

// Render Essay Studio Drafts Tab
function renderEssaysTab() {
  const container = document.getElementById('insp-essays-list');
  if (!container) return;

  const essays = activeStudent?.essayCritiques || [];
  if (essays.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <span class="empty-icon">✍️</span>
        <p>No essays reviewed in Essay Studio yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = essays.map(essay => {
    const crit = essay.critique || {};
    const scores = crit.scores || {};
    const overallScore = scores.overall || 'N/A';

    return `
      <div class="essay-card">
        <div class="project-header">
          <div>
            <h5 class="essay-title">Prompt: "${essay.prompt || 'College Essay Draft'}"</h5>
            <span class="badge badge-blue" style="margin-top: 6px;">Evaluated on: ${essay.date || 'N/A'}</span>
          </div>
          <div style="background: rgba(var(--color-accent-rgb), 0.15); border: 1px solid var(--color-accent); color: var(--color-accent); width: 44px; height: 44px; border-radius: var(--border-radius-sm); display: flex; align-items: center; justify-content: center; font-family: var(--font-family-display); font-weight: 800; font-size: 18px;">
            ${overallScore}
          </div>
        </div>
        
        <div class="essay-content-preview">${essay.draft || 'Empty draft contents.'}</div>
        
        <div class="essay-feedback">
          <strong style="color: var(--color-success); font-size: 11px; text-transform: uppercase;">narrative scores:</strong>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 16px; margin: 6px 0 12px 0; font-size: 12px; color: var(--color-text-secondary);">
            <div>📐 Structure: <strong>${scores.structure || 0}/10</strong></div>
            <div>📖 Authenticity: <strong>${scores.story || 0}/10</strong></div>
            <div>🌍 Impact: <strong>${scores.impact || 0}/10</strong></div>
            <div>✍️ Pacing: <strong>${scores.grammar || 0}/10</strong></div>
          </div>
          
          <strong style="color: var(--color-accent); font-size: 11px; text-transform: uppercase;">AI Ivy Feedback Review:</strong>
          <ul style="padding-left: 18px; margin-top: 6px; display: flex; flex-direction: column; gap: 4px; font-size: 12.5px;">
            <li><strong>Strengths:</strong> ${(crit.strengths || []).join(', ') || 'No notable strengths logged.'}</li>
            <li><strong>Key Recommendation:</strong> ${(crit.suggestions || []).slice(0, 1).join('') || 'Review structure guidelines.'}</li>
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

// Render AI Mentor Chats Tab
function renderMentorTab() {
  const container = document.getElementById('insp-chat-log');
  if (!container) return;

  const chatLogs = activeStudent?.mentorHistory || [];
  if (chatLogs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <span class="empty-icon">🤖</span>
        <p>No active conversations recorded with AI Mentor.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = chatLogs.map(chat => {
    const senderLabel = chat.sender === 'mentor' ? 'Ivy (AI)' : 'Student';
    const bubbleClass = chat.sender === 'mentor' ? 'mentor' : 'user';
    return `
      <div class="chat-bubble ${bubbleClass}">
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 4px;">
          ${senderLabel}
        </div>
        <div>${chat.text || ''}</div>
      </div>
    `;
  }).join('');

  // Scroll to bottom of chat logs when populated
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 100);
}

// Handle switching tabs inside Student Inspector
function setupEventListeners() {
  // School selection dropdown event
  const schoolSelect = document.getElementById('school-select');
  if (schoolSelect) {
    schoolSelect.addEventListener('change', (e) => {
      currentSchool = e.target.value;
      loadSchoolDashboard();
    });
  }

  // Filter input events
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const schoolStudents = studentsData.filter(s => s.user?.school === currentSchool);
      renderStudentsTable(schoolStudents);
    });
  }

  const gradeFilter = document.getElementById('filter-grade');
  if (gradeFilter) {
    gradeFilter.addEventListener('change', () => {
      const schoolStudents = studentsData.filter(s => s.user?.school === currentSchool);
      renderStudentsTable(schoolStudents);
    });
  }

  const careerFilter = document.getElementById('filter-status');
  if (careerFilter) {
    careerFilter.addEventListener('change', () => {
      const schoolStudents = studentsData.filter(s => s.user?.school === currentSchool);
      renderStudentsTable(schoolStudents);
    });
  }

  // Close inspector elements
  document.getElementById('close-inspector').addEventListener('click', closeStudentInspector);
  document.getElementById('inspector-backdrop').addEventListener('click', closeStudentInspector);

  // Inspector tab selection handlers
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const tabId = trigger.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Dark/Light theme toggles
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

// Switch Tab helper
function switchTab(tabId) {
  // Deactivate all triggers and panes
  document.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

  // Activate targets
  const activeTrigger = document.querySelector(`.tab-trigger[data-tab="${tabId}"]`);
  const activePane = document.getElementById(tabId);

  if (activeTrigger) activeTrigger.classList.add('active');
  if (activePane) activePane.classList.add('active');
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('counselor_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('counselor_theme', newTheme);
  updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  
  const icon = btn.querySelector('span');
  const label = document.getElementById('theme-label');

  if (theme === 'dark') {
    icon.textContent = '🌙';
    label.textContent = 'Dark Mode';
  } else {
    icon.textContent = '☀️';
    label.textContent = 'Light Mode';
  }
}

// Fallback Error Display
function showErrorState() {
  const tbody = document.getElementById('student-table-body');
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <span class="empty-icon">⚠️</span>
            <p>Error connecting to server. Please check that server.rb is running locally.</p>
          </div>
        </td>
      </tr>
    `;
  }
}
