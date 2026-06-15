import { AISimulator } from '../data/ai_simulator.js';
import { UNIVERSITIES } from '../data/mock_data.js';
import { Mentor } from './Mentor.js';

export const Profile = {
  activeUniId: '',
  currentPlan: 'Starter', // 'Starter' | 'Pro' | 'Scholar'

  render() {
    const container = document.getElementById('view-profile');
    const state = LeveledApp.state;
    const user = state.user;

    if (!user) return;

    // Load local card dark mode preference
    this.isCardDarkMode = localStorage.getItem('profile_card_dark_mode') === 'true';

    // Load current plan if set in user profile
    if (user.plan) {
      this.currentPlan = user.plan;
    } else {
      user.plan = this.currentPlan;
    }

    // Default target university calculation
    if (!this.activeUniId && user.dreamUniversities?.length) {
      const matchingUni = UNIVERSITIES.find(uni => 
        user.dreamUniversities.some(du => du.toLowerCase().includes(uni.id)) ||
        uni.name.toLowerCase().includes(user.dreamUniversities[0].toLowerCase())
      );
      this.activeUniId = matchingUni ? matchingUni.id : UNIVERSITIES[0].id;
    } else if (!this.activeUniId) {
      this.activeUniId = UNIVERSITIES[0].id;
    }

    const currentUni = UNIVERSITIES.find(uni => uni.id === this.activeUniId) || UNIVERSITIES[0];
    const profileScores = AISimulator.calculateProfileScores(user, state.completedMilestones);
    const evaluation = AISimulator.evaluateUniversityReadiness(currentUni, profileScores);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto; text-align: left;">
        
        <!-- Profile Settings Card -->
        <div class="glass-card profile-settings-card ${this.isCardDarkMode ? 'profile-card-dark' : ''}" id="profile-settings-card" style="padding: 24px; position: relative; overflow: visible !important; transition: all 0.3s ease;">
          ${Mentor.getIvyBirdHTML('profile')}
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 12px;">
            <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin: 0; color: var(--text-primary);" class="profile-card-title">Profile Settings</h3>
            <button id="btn-profile-theme-toggle" class="btn btn-secondary" style="padding: 6px 14px; font-size: 12px; font-weight: 700; border-radius: 100px; display: flex; align-items: center; gap: 6px;">
              ${this.isCardDarkMode ? '☀️ Card Light Mode' : '🌙 Card Dark Mode'}
            </button>
          </div>
          <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 24px;" class="profile-card-desc">Configure your student profile parameters, dream university targets, and subscription plan.</p>

          <form id="profile-settings-form" onsubmit="event.preventDefault();" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;" class="fit-grid">
            <div class="form-group">
              <label class="form-label" for="profile-name">Student Name</label>
              <input type="text" id="profile-name" class="form-control" value="${user.name || ''}" required style="font-size: 13.5px;">
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-username">Username</label>
              <input type="text" id="profile-username" class="form-control" value="${user.username || ''}" required style="font-size: 13.5px;">
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
            </style>

            <div class="form-group" style="grid-column: 1 / -1; display: flex; flex-direction: column; gap: 8px;">
              <label class="form-label" style="margin-bottom: 2px;">Grade Level</label>
              <div style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 4px;">Select your current academic tier:</div>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div>
                  <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">High School</div>
                  <div class="profile-grade-pill-group" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div class="pill-chip ${user.grade === '9th Grade' || user.grade === '9' ? 'selected' : ''}" data-val="9th Grade">9th Grade</div>
                    <div class="pill-chip ${user.grade === '10th Grade' || user.grade === '10' ? 'selected' : ''}" data-val="10th Grade">10th Grade</div>
                    <div class="pill-chip ${user.grade === '11th Grade' || user.grade === '11' ? 'selected' : ''}" data-val="11th Grade">11th Grade</div>
                    <div class="pill-chip ${user.grade === '12th Grade' || user.grade === '12' ? 'selected' : ''}" data-val="12th Grade">12th Grade</div>
                  </div>
                </div>
                <div>
                  <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">University &amp; Graduate</div>
                  <div class="profile-grade-pill-group" style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div class="pill-chip ${user.grade === 'Undergraduate (Freshman)' ? 'selected' : ''}" data-val="Undergraduate (Freshman)">Freshman</div>
                    <div class="pill-chip ${user.grade === 'Undergraduate (Sophomore)' ? 'selected' : ''}" data-val="Undergraduate (Sophomore)">Sophomore</div>
                    <div class="pill-chip ${user.grade === 'Undergraduate (Junior)' ? 'selected' : ''}" data-val="Undergraduate (Junior)">Junior</div>
                    <div class="pill-chip ${user.grade === 'Undergraduate (Senior)' ? 'selected' : ''}" data-val="Undergraduate (Senior)">Senior</div>
                    <div class="pill-chip ${user.grade === 'Graduate Student' ? 'selected' : ''}" data-val="Graduate Student">Graduate</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-school">High School</label>
              <input type="text" id="profile-school" class="form-control" value="${user.school || 'Lincoln High'}" required style="font-size: 13.5px;">
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-unis">Dream Universities (Comma-separated)</label>
              <input type="text" id="profile-unis" class="form-control" value="${(user.dreamUniversities || []).join(', ')}" required style="font-size: 13.5px;">
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-career">Career path</label>
              <input type="text" id="profile-career" class="form-control" value="${user.careerGoals || ''}" disabled style="font-size: 13.5px; opacity: 0.7;">
            </div>

            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label" for="profile-interests">Interests (Comma-separated)</label>
              <input type="text" id="profile-interests" class="form-control" value="${(user.interests || []).join(', ')}" required style="font-size: 13.5px;">
            </div>

            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label" for="profile-skills">Skills (Comma-separated)</label>
              <input type="text" id="profile-skills" class="form-control" value="${(user.skills || []).join(', ')}" required style="font-size: 13.5px;">
            </div>

            <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 20px; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <button type="submit" class="btn btn-primary" style="padding: 10px 24px; font-size: 13.5px;">Save Profile Changes</button>
                <button type="button" class="btn btn-secondary" id="btn-profile-plans" style="padding: 10px 20px; font-size: 13.5px; background-color: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.2); color: var(--primary);">
                  💳 Plans & Pricing (${this.currentPlan})
                </button>
              </div>
              
              <div style="font-size: 12.5px; color: var(--text-muted);">
                Subscription Plan: <strong style="color: var(--secondary); text-transform: uppercase;">${this.currentPlan}</strong>
              </div>
            </div>
          </form>
        </div>

        <!-- Target University Selector Tabs -->
        <div class="glass-card" style="padding: 16px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; padding-left: 8px;">Target Campus Selector</div>
          <div class="tag-selector" id="readiness-campus-tabs" style="gap: 10px;">
            ${UNIVERSITIES.map(uni => {
              const isDream = user.dreamUniversities.some(du => 
                du.toLowerCase().includes(uni.id) || uni.name.toLowerCase().includes(du.toLowerCase())
              );
              return `
                <div class="tag-chip ${uni.id === this.activeUniId ? 'selected' : ''}" data-id="${uni.id}" style="
                  border-style: ${isDream ? 'dashed' : 'solid'};
                  border-width: ${isDream ? '2px' : '1px'};
                ">
                  ${isDream ? '⭐ ' : ''}${uni.name}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Two-column Readiness Evaluation layout -->
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;" class="readiness-split">
          
          <!-- Column 1: SVG Readiness Score and Campus details -->
          <div style="display: flex; flex-direction: column; gap: 32px;">
            <div class="glass-card" style="text-align: center; padding: 32px 20px;">
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 24px;">Admissions Readiness</h4>
              
              <!-- Big Circle Dial -->
              <div style="position: relative; width: 160px; height: 160px; margin: 0 auto 20px auto;">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" stroke="var(--border-color)" stroke-width="10" fill="transparent"/>
                  <circle cx="80" cy="80" r="70" stroke="var(--secondary)" stroke-width="10" fill="transparent" 
                    stroke-dasharray="439.8" stroke-dashoffset="${439.8 - (439.8 * evaluation.score) / 100}" 
                    stroke-linecap="round" transform="rotate(-90 80 80)" style="transition: stroke-dashoffset 1s ease;"/>
                </svg>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <span style="font-family: var(--font-heading); font-size: 44px; font-weight: 800; color: var(--text-primary); line-height: 1;">${evaluation.score}</span>
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 4px;">Score / 100</span>
                </div>
              </div>

              <h5 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--text-primary);">${currentUni.name}</h5>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${currentUni.location}</p>
              
              <div style="font-size: 13px; color: var(--text-secondary); margin-top: 16px; line-height: 1.45; border-top: 1px solid var(--border-color); padding-top: 16px; text-align: left;">
                ${currentUni.details}
              </div>
            </div>

            <!-- Campus weightings -->
            <div class="glass-card">
              <h4 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; margin-bottom: 16px;">Selection Weighting</h4>
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between;">
                  <span>📚 Academics</span> <strong>${currentUni.weightAcademics}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>💻 Technical Projects</span> <strong>${currentUni.weightTechnical}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>🔬 Research</span> <strong>${currentUni.weightResearch}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>🛡️ Leadership</span> <strong>${currentUni.weightLeadership}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>🌍 Social Impact</span> <strong>${currentUni.weightImpact}%</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: Strengths, Weaknesses, Gaps & Suggested Actions -->
          <div style="display: flex; flex-direction: column; gap: 32px;">
            <!-- Strengths & Weaknesses Analysis -->
            <div class="glass-card">
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin-bottom: 20px;">Profile Fit Analysis</h4>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="fit-grid">
                <div>
                  <h5 style="font-size: 13px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 16px;">🟢</span> Strong Pillars
                  </h5>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; color: var(--text-secondary); padding: 0;">
                    ${evaluation.strong.map(s => `<li style="display: flex; gap: 6px; align-items: flex-start;"><span>✓</span> ${s}</li>`).join('')}
                  </ul>
                </div>
                
                <div>
                  <h5 style="font-size: 13px; font-weight: 800; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 16px;">🔴</span> Gaps & Weaknesses
                  </h5>
                  <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 13.5px; color: var(--text-secondary); padding: 0;">
                    ${evaluation.weak.map(w => `<li style="display: flex; gap: 6px; align-items: flex-start;"><span>⚠</span> ${w}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <!-- Gaps Detail & Specific Action Plan Recommendations -->
            <div class="glass-card">
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                <span>🎯</span> Recommended Actions to close Gaps
              </h4>
              
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${evaluation.gaps.map((gap, index) => `
                  <div style="display: flex; gap: 16px; align-items: flex-start; padding-bottom: 16px; border-bottom: ${index < evaluation.gaps.length - 1 ? '1px solid var(--border-color)' : 'none'}; text-align: left;">
                    <div style="background-color: var(--primary-glow); color: var(--primary); font-size: 14px; font-weight: 800; width: 28px; height: 28px; border-radius: var(--border-radius-round); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                      ${index + 1}
                    </div>
                    <div>
                      <h5 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${gap}</h5>
                      <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">${evaluation.recs[index]}</p>
                      
                      <!-- Quick action triggers -->
                      <div style="display: flex; gap: 12px; margin-top: 10px;">
                        ${evaluation.recs[index].toLowerCase().includes('club') || evaluation.recs[index].toLowerCase().includes('lead') ? `
                          <a href="#roadmap" class="btn btn-secondary" style="font-size: 11px; padding: 6px 12px;">Go to Roadmap</a>
                        ` : ''}
                        ${evaluation.recs[index].toLowerCase().includes('project') || evaluation.recs[index].toLowerCase().includes('build') ? `
                          <a href="#extracurriculars" class="btn btn-secondary" style="font-size: 11px; padding: 6px 12px;">Explore Extracurriculars</a>
                        ` : ''}
                        ${evaluation.recs[index].toLowerCase().includes('research') || evaluation.recs[index].toLowerCase().includes('paper') ? `
                          <a href="#extracurriculars" class="btn btn-secondary" style="font-size: 11px; padding: 6px 12px;">Incubate Research Paper</a>
                        ` : ''}
                        <button class="btn btn-secondary btn-ask-readiness-mentor" data-gap="${gap}" style="font-size: 11px; padding: 6px 12px;">Discuss Gaps</button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
        </div>

        <!-- Danger Zone section -->
        <div class="glass-card" style="padding: 24px; border-top: 4px solid var(--accent); background-color: rgba(239, 68, 68, 0.03); display: flex; flex-direction: column; gap: 20px;">
          <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: #ef4444; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>⚠️</span> Danger Zone
          </h4>
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid rgba(239, 68, 68, 0.1); padding-bottom: 16px;">
            <div>
              <h5 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0;">Change Career Major</h5>
              <p style="color: var(--text-secondary); font-size: 12.5px; margin: 4px 0 0 0; max-width: 650px;">
                Pivot to another field. Resets active checklists, milestones, and roadmap items.
              </p>
            </div>
            <button class="btn" id="btn-profile-reset-career" style="background-color: var(--accent); color: white; padding: 8px 16px; font-size: 12.5px; border: none; font-weight: bold; border-radius: var(--border-radius-md); cursor: pointer; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);">
              Pivot Career
            </button>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <h5 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0;">Delete Account</h5>
              <p style="color: var(--text-secondary); font-size: 12.5px; margin: 4px 0 0 0; max-width: 650px;">
                Permanently delete your account and erase all portfolio logs, XP scores, and files from the database.
              </p>
            </div>
            <button class="btn" id="btn-profile-delete-account" style="background-color: #dc2626; color: white; padding: 8px 16px; font-size: 12.5px; border: none; font-weight: bold; border-radius: var(--border-radius-md); cursor: pointer; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const state = LeveledApp.state;
    const user = state.user;

    // Bind Local Card Dark Mode Toggle
    const themeToggleBtn = document.getElementById('btn-profile-theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.onclick = () => {
        this.isCardDarkMode = !this.isCardDarkMode;
        localStorage.setItem('profile_card_dark_mode', this.isCardDarkMode.toString());
        
        const card = document.getElementById('profile-settings-card');
        if (card) {
          card.classList.toggle('profile-card-dark', this.isCardDarkMode);
          themeToggleBtn.innerHTML = this.isCardDarkMode ? '☀️ Card Light Mode' : '🌙 Card Dark Mode';
        }
        LeveledApp.showToast(this.isCardDarkMode ? '🌙 Card theme changed to Dark Mode' : '☀️ Card theme changed to Light Mode');
      };
    }

    // Bind Profile Grade Pill clicks
    const gradePills = document.querySelectorAll('.profile-grade-pill-group .pill-chip');
    gradePills.forEach(pill => {
      pill.onclick = () => {
        gradePills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
      };
    });

    // Save Profile Changes
    const settingsForm = document.getElementById('profile-settings-form');
    if (settingsForm) {
      settingsForm.onsubmit = () => {
        const name = document.getElementById('profile-name').value.trim();
        const username = document.getElementById('profile-username').value.trim();
        const selectedPill = document.querySelector('.profile-grade-pill-group .pill-chip.selected');
        const grade = selectedPill ? selectedPill.getAttribute('data-val') : (user.grade || '11th Grade');
        const school = document.getElementById('profile-school').value.trim();
        const dreamUnisRaw = document.getElementById('profile-unis').value;
        const interestsRaw = document.getElementById('profile-interests').value;
        const skillsRaw = document.getElementById('profile-skills').value;

        // Parse list fields
        const dreamUniversities = dreamUnisRaw.split(',').map(s => s.trim()).filter(Boolean);
        const interests = interestsRaw.split(',').map(s => s.trim()).filter(Boolean);
        const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

        // Update state user parameters
        user.name = name;
        user.username = username;
        user.grade = grade;
        user.school = school;
        user.dreamUniversities = dreamUniversities;
        user.interests = interests;
        user.skills = skills;

        LeveledApp.saveState();
        LeveledApp.updateHeaderStats();
        LeveledApp.showToast('✓ Profile settings updated successfully!');
        this.render();
      };
    }

    // Toggle Plans & Pricing
    const plansBtn = document.getElementById('btn-profile-plans');
    if (plansBtn) {
      plansBtn.onclick = () => {
        this.showPlansModal();
      };
    }

    // Campus Selector Tabs click
    const tabs = document.querySelectorAll('#readiness-campus-tabs .tag-chip');
    tabs.forEach(tab => {
      tab.onclick = () => {
        this.activeUniId = tab.getAttribute('data-id');
        this.render();
      };
    });

    // Ask mentor about readiness gap buttons
    const askButtons = document.querySelectorAll('.btn-ask-readiness-mentor');
    askButtons.forEach(btn => {
      btn.onclick = () => {
        const gapText = btn.getAttribute('data-gap');
        const panel = document.getElementById('ai-mentor-panel');
        panel.classList.add('open');
        window.sendMessageToMentor(`How can I address this specific gap in my profile: "${gapText}"?`);
      };
    });

    // Change Careers flow
    const resetBtn = document.getElementById('btn-profile-reset-career');
    if (resetBtn) {
      resetBtn.onclick = () => {
        this.confirmCareerChange();
      };
    }

    // Delete Account flow
    const deleteBtn = document.getElementById('btn-profile-delete-account');
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        this.confirmAccountDeletion();
      };
    }
  },

  showPlansModal() {
    const state = LeveledApp.state;

    const modalHTML = `
      <div style="padding: 16px 8px; text-align: left;">
        <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 8px; color: var(--text-primary);">Plans &amp; Pricing</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; text-align: center; margin-bottom: 32px;">Choose a pricing plan to unlock advanced AI co-pilot capabilities and admissions analyzers.</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 16px;" class="fit-grid">
          
          <!-- Starter Tier -->
          <div class="glass-card pricing-card-modal" style="padding: 24px; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; text-align: left; background-color: ${this.currentPlan === 'Starter' ? 'rgba(99, 102, 241, 0.05)' : 'transparent'}; border-color: ${this.currentPlan === 'Starter' ? 'var(--primary)' : 'var(--border-color)'};">
            <div>
              <span style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Starter</span>
              <div style="font-size: 26px; font-weight: 800; color: var(--text-primary); margin: 8px 0 16px 0;">$0 <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">/ forever</span></div>
              <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.4; margin-bottom: 20px;">Essential tools for basic student checklist mapping.</p>
              <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; color: var(--text-primary);">
                <li>✓ 🗺️ Standard Roadmap</li>
                <li>✓ 💡 Active Extracurriculars</li>
                <li>✓ 🏆 Level Progressions</li>
              </ul>
            </div>
            <button class="btn btn-secondary btn-select-tier" data-plan="Starter" style="width: 100%; padding: 8px;" ${this.currentPlan === 'Starter' ? 'disabled' : ''}>
              ${this.currentPlan === 'Starter' ? 'Current Active' : 'Switch Plan'}
            </button>
          </div>

          <!-- Pro Tier -->
          <div class="glass-card pricing-card-modal" style="padding: 24px; border: 2px solid ${this.currentPlan === 'Pro' ? 'var(--primary)' : 'var(--border-color)'}; display: flex; flex-direction: column; justify-content: space-between; text-align: left; background-color: ${this.currentPlan === 'Pro' ? 'rgba(99, 102, 241, 0.08)' : 'transparent'}; box-shadow: ${this.currentPlan === 'Pro' ? '0 8px 24px rgba(99, 102, 241, 0.15)' : 'none'};">
            <div>
              <span style="font-size: 10px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">Leveled Pro</span>
              <div style="font-size: 26px; font-weight: 800; color: var(--text-primary); margin: 8px 0 16px 0;">$19 <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">/ month</span></div>
              <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.4; margin-bottom: 20px;">Unleash conversational AI mentoring and custom portfolio templates.</p>
              <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; color: var(--text-primary);">
                <li>✓ 🤖 24/7 AI Mentor Chat</li>
                <li>✓ ⚡ Active Co-pilot workroom</li>
                <li>✓ 💼 Premium Live Website Portfolio</li>
                <li>✓ ✍️ Essay Reviewer Studio</li>
              </ul>
            </div>
            <button class="btn btn-primary btn-select-tier" data-plan="Pro" style="width: 100%; padding: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none;" ${this.currentPlan === 'Pro' ? 'disabled' : ''}>
              ${this.currentPlan === 'Pro' ? 'Current Active' : 'Upgrade to Pro'}
            </button>
          </div>

          <!-- Scholar Tier -->
          <div class="glass-card pricing-card-modal" style="padding: 24px; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; text-align: left; background-color: ${this.currentPlan === 'Scholar' ? 'rgba(99, 102, 241, 0.05)' : 'transparent'}; border-color: ${this.currentPlan === 'Scholar' ? 'var(--primary)' : 'var(--border-color)'};">
            <div>
              <span style="font-size: 10px; font-weight: 800; color: var(--secondary); text-transform: uppercase; letter-spacing: 1px;">Leveled Scholar</span>
              <div style="font-size: 26px; font-weight: 800; color: var(--text-primary); margin: 8px 0 16px 0;">$49 <span style="font-size: 12px; font-weight: 500; color: var(--text-secondary);">/ month</span></div>
              <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.4; margin-bottom: 20px;">Elite Admissions readiness and Research Paper Proposals incubator.</p>
              <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; color: var(--text-primary);">
                <li>✓ 🛡️ All Pro elements included</li>
                <li>✓ 🔬 Research Proposals Lab</li>
                <li>✓ 🏛️ Admissions Readiness Gaps</li>
                <li>✓ 📈 Unlimited reviews &amp; Roadmaps</li>
              </ul>
            </div>
            <button class="btn btn-secondary btn-select-tier" data-plan="Scholar" style="width: 100%; padding: 8px;" ${this.currentPlan === 'Scholar' ? 'disabled' : ''}>
              ${this.currentPlan === 'Scholar' ? 'Current Active' : 'Upgrade to Scholar'}
            </button>
          </div>

        </div>
      </div>
    `;

    LeveledApp.openModal(modalHTML);

    // Bind upgrade click events
    const selectBtns = document.querySelectorAll('.btn-select-tier');
    selectBtns.forEach(btn => {
      btn.onclick = () => {
        const targetPlan = btn.getAttribute('data-plan');
        this.currentPlan = targetPlan;
        state.user.plan = targetPlan;
        LeveledApp.saveState();
        
        // Close current pricing modal
        LeveledApp.closeModal();

        // Show level up style upgrade success modal
        setTimeout(() => {
          LeveledApp.openModal(`
            <div style="text-align: center; padding: 24px 12px;">
              <div style="font-size: 64px; margin-bottom: 16px; animation: bounce 1s infinite alternate;">💳</div>
              <h2 style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; background: linear-gradient(135deg, var(--secondary), var(--primary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">PLAN UPGRADED!</h2>
              <p style="color: var(--text-secondary); font-size: 14.5px; margin-bottom: 24px;">Your subscription has been successfully switched to **Leveled ${targetPlan}**.</p>
              <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 16px; display: inline-block; margin-bottom: 24px; text-align: left; font-size: 13.5px; line-height: 1.5;">
                ⚡ <strong>All features unlocked.</strong> Your Admissions Readiness weights and AI Mentor chats are fully activated with high-priority pipelines.
              </div>
              <div>
                <button class="btn btn-primary" onclick="LeveledApp.closeModal();" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; padding: 10px 24px;">Perfect, Let's Go!</button>
              </div>
            </div>
          `);
          LeveledApp.showToast(`💳 Subscription upgraded to ${targetPlan}!`);
          this.render();
        }, 300);
      };
    });
  },

  confirmCareerChange() {
    const warningHTML = `
      <div style="padding: 16px 8px; text-align: center;">
        <div style="font-size: 60px; color: var(--accent); margin-bottom: 16px;">⚠️</div>
        <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Are you absolutely sure?</h3>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.5; margin-bottom: 24px; text-align: left; background-color: rgba(239, 68, 68, 0.05); padding: 16px; border-left: 4px solid var(--accent); border-radius: var(--border-radius-md);">
          <strong>Warning:</strong> Changing your career path will permanently delete your active extracurricular projects, completed milestones, saved opportunity applications, and overall dashboard history. This action resets all progression parameters and cannot be undone.
        </p>
        
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal();" style="flex: 1; min-width: 120px; padding: 10px;">Cancel, Keep Progress</button>
          <button class="btn" id="btn-confirm-career-reset" style="flex: 1.5; min-width: 160px; background-color: var(--accent); color: white; border: none; font-weight: bold; border-radius: var(--border-radius-md); cursor: pointer; padding: 10px;">
            Reset Progress &amp; Change Career
          </button>
        </div>
      </div>
    `;

    LeveledApp.openModal(warningHTML);

    const confirmBtn = document.getElementById('btn-confirm-career-reset');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        LeveledApp.closeModal();
        
        // Reset state progress arrays
        const state = LeveledApp.state;
        state.xp = 0;
        state.level = 1;
        state.streak = 1;
        state.completedMilestones = [];
        state.projects = [];
        state.savedOpportunities = [];
        state.opportunityApplications = {};
        state.customRoadmapMilestones = [];
        state.milestoneChecklist = {};
        state.opportunityChecklists = {};
        state.opportunityChats = {};
        
        // Log out user parameter (forces onboarding setup screen)
        state.user = null;
        
        // Save state locally
        LeveledApp.saveState();
        localStorage.removeItem('leveled_state');

        LeveledApp.showToast('⚠️ Workspace reset. Loading career onboarding...');
        
        // Redirect to onboarding path finder test page
        setTimeout(() => {
          window.location.search = '?onboarding=true';
        }, 1000);
      };
    }
  },

  confirmAccountDeletion() {
    const warningHTML = `
      <div style="padding: 16px 8px; text-align: center;">
        <div style="font-size: 60px; color: #dc2626; margin-bottom: 16px;">⚠️</div>
        <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">Delete Account Permanently?</h3>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.5; margin-bottom: 24px; text-align: left; background-color: rgba(220, 38, 38, 0.05); padding: 16px; border-left: 4px solid #dc2626; border-radius: var(--border-radius-md);">
          <strong>Warning:</strong> This will permanently delete the account for <strong style="color: var(--text-primary);">${LeveledApp.state.user?.name || ''}</strong>. All of your portfolio items, checklists, milestones, XP, and profile records will be permanently erased from our database. This action is irreversible.
        </p>
        
        <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal();" style="flex: 1; min-width: 120px; padding: 10px;">Cancel, Keep Account</button>
          <button class="btn" id="btn-confirm-delete-account" style="flex: 1.5; min-width: 160px; background-color: #dc2626; color: white; border: none; font-weight: bold; border-radius: var(--border-radius-md); cursor: pointer; padding: 10px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);">
            Delete My Account
          </button>
        </div>
      </div>
    `;

    LeveledApp.openModal(warningHTML);

    const confirmBtn = document.getElementById('btn-confirm-delete-account');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const username = LeveledApp.state.user?.username;
        LeveledApp.closeModal();

        // Call backend API
        fetch('/api/delete-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username })
        })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.error || 'Deletion failed'); });
          }
          return res.json();
        })
        .then(data => {
          this.executeClientSideDeletion();
        })
        .catch(err => {
          console.warn('Backend deletion failed or offline, performing client-side cleanup:', err);
          this.executeClientSideDeletion();
        });
      };
    }
  },

  executeClientSideDeletion() {
    // Clear local storage items
    localStorage.removeItem('leveled_state');
    
    // Clear the current user from leveled_users local DB if present
    const rawUsers = localStorage.getItem('leveled_users');
    if (rawUsers) {
      try {
        let users = JSON.parse(rawUsers);
        const username = LeveledApp.state.user?.username?.toLowerCase();
        if (username) {
          users = users.filter(u => u.user?.username?.toLowerCase() !== username);
          localStorage.setItem('leveled_users', JSON.stringify(users));
        }
      } catch (e) {
        console.error('Error cleaning leveled_users:', e);
      }
    }

    // Reset local state to default state
    LeveledApp.state = {
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

    LeveledApp.showToast('🗑️ Account and data permanently deleted.');
    
    // Redirect to landing page / re-render
    setTimeout(() => {
      // Clear hash to return to dashboard/landing
      window.location.hash = '';
      LeveledApp.renderShell();
    }, 1000);
  }
};
