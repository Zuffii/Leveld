import { AISimulator } from '../data/ai_simulator.js';
import { OPPORTUNITIES, UNIVERSITIES } from '../data/mock_data.js';
import { Extracurriculars } from './Extracurriculars.js';
import { Mentor } from './Mentor.js';

// Level limits definitions
const LEVEL_XP_THRESHOLDS = [0, 500, 1200, 2500, 4500, 7500, 11500, 17000];
const LEVEL_TITLES = [
  'Explorer', 'Builder', 'Leader', 'Innovator', 'Scholar', 'Elite Applicant', 'Visionary'
];

const AVATAR_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export const Dashboard = {
  renderGradeProgressionCard(user, state) {
    const isCollege = (user.grade && (
      user.grade.toLowerCase().includes('college') || 
      user.grade.toLowerCase().includes('undergrad') || 
      user.grade.toLowerCase().includes('university') || 
      user.grade.toLowerCase().includes('freshman') || 
      user.grade.toLowerCase().includes('sophomore') || 
      user.grade.toLowerCase().includes('junior') || 
      user.grade.toLowerCase().includes('senior')
    ));

    if (isCollege) {
      return `
        <div class="glass-card" style="padding: 24px; border-left: 4px solid #10b981; text-align: left; position: relative; background: #ffffff; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px; color: #10b981;">
                <span>🎓</span> Career Development Mode Active
              </h4>
              <p style="color: var(--text-secondary); font-size: 12.5px; margin-top: 6px; line-height: 1.5;">You have graduated high school and entered <strong>College Mode</strong> at <strong>${user.school || 'University'}</strong>, majoring in <strong>${user.careerGoals || 'Undecided'}</strong>. Your Job Search and Career roadmap are fully unlocked.</p>
            </div>
            <a href="#jobs" class="btn btn-primary" style="padding: 10px 20px; font-size: 12.5px; border-radius: var(--border-radius-round); border: none; background: #10b981; color: white; display: inline-flex; align-items: center; gap: 6px; text-decoration: none; font-weight: 700; transition: all 0.2s; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);">🔍 Go to Career Center</a>
          </div>
        </div>
      `;
    }

    return `
      <div class="glass-card" style="padding: 16px; border-left: 4px solid var(--primary); background: var(--bg-primary); margin-bottom: 8px;">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 6px; color: var(--text-primary);">
              <span>🎓</span> Grade ${user.grade || '10'} Progression
            </h4>
            <p style="color: var(--text-secondary); font-size: 11.5px; margin-top: 4px; margin-bottom: 0; line-height: 1.4;">Log results to advance your cycle.</p>
          </div>
          <button class="btn btn-primary" id="btn-pass-grade" style="padding: 8px 12px; font-size: 12px; border-radius: 8px; width: 100%;">🎓 Pass Current Grade</button>
        </div>
      </div>
    `;
  },

  render() {
    const container = document.getElementById('view-dashboard');
    const state = LeveledApp.state;
    const user = state.user;
    if (!user) return;

    // AI Recommendations Logic
    const savedOpps = OPPORTUNITIES.filter(o => state.savedOpportunities.includes(o.id));
    const aiRecs = OPPORTUNITIES.slice(0, 3).map(opp => {
      return `
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.9); transition: transform 0.2s, box-shadow 0.2s; padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.9)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.9)'" onclick="window.location.hash='#extracurriculars'">
          <div>
            <div style="font-size: 11px; color: var(--primary); font-weight: 700; text-transform: uppercase;">${opp.category}</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin: 2px 0;">${opp.name}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${opp.difficulty} Difficulty</div>
          </div>
          <div style="font-size: 20px;">⚡</div>
        </div>
      `;
    }).join('');

    const currentLvl = state.level || 1;
    const targetUniName = user.dreamUniversities?.[0] || 'Top University';
    const uniData = UNIVERSITIES.find(u => u.name.toLowerCase().includes(targetUniName.toLowerCase())) || {
        name: targetUniName,
        weightAcademics: 50,
        strongSectors: ['Academics', 'Leadership'],
        details: 'Requires stellar grades and impactful extracurriculars.'
    };
    
    // Simulate generic stats if uniData lacks them
    const reqGPA = targetUniName.match(/mit|stanford|harvard|oxford|cambridge/i) ? '3.96+ Unweighted' : '3.8+ Unweighted';
    const reqSAT = targetUniName.match(/mit|stanford|harvard/i) ? '1540+ or ACT 35+' : '1450+';
    const reqExams = targetUniName.match(/iit|bits|manipal/i) ? 'JEE Advanced / Mains, BITSAT' : 'AP Calculus, AP Physics';
    const reqECs = uniData.strongSectors.join(', ') + ' & ' + (uniData.details.includes('research') ? 'Research Publications' : 'National Level Awards');

    container.innerHTML = `
      <style>
        .minimal-dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }
        @media (max-width: 1024px) { .minimal-dash-grid { grid-template-columns: 1fr; } }
      </style>

      <div class="minimal-dash-grid">
        <!-- Main Left Column -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Welcome Card (Left Side) -->
          <div style="display: flex; align-items: center; gap: 16px; background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 16px 24px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), inset 0 2px 4px rgba(255, 255, 255, 0.8); transform: translateY(-1px); margin-bottom: 0;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 18px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
              Lvl ${currentLvl}
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 600; color: var(--text-secondary);">Welcome back,</div>
              <div style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${user.name} 👋</div>
            </div>
          </div>

          ${(() => {
            const fullRoadmap = typeof AISimulator !== 'undefined' ? AISimulator.generateRoadmap(user) : [];
            const activeIdx = fullRoadmap.findIndex(m => !(state.completedMilestones || []).includes(m.id));
            let stepsToShow = [];
            
            if (activeIdx === -1) {
              const lastThree = fullRoadmap.slice(-3);
              stepsToShow = lastThree.map((m, idx) => ({
                milestone: m,
                status: 'completed',
                labelText: `STEP ${fullRoadmap.length - lastThree.length + idx + 1} • ${m.category || 'Focus'}`,
                subText: 'Completed'
              }));
            } else {
              if (activeIdx > 0) {
                const m = fullRoadmap[activeIdx - 1];
                stepsToShow.push({
                  milestone: m,
                  status: 'completed',
                  labelText: `STEP ${activeIdx} • ${m.category || 'Focus'}`,
                  subText: 'Completed'
                });
              } else {
                stepsToShow.push({
                  milestone: {
                    id: 'onboarding-setup',
                    title: 'Leveld Profile Onboarding',
                    category: 'Setup'
                  },
                  status: 'completed',
                  labelText: 'STEP 1 • Setup',
                  subText: 'Completed'
                });
              }

              const mActive = fullRoadmap[activeIdx];
              stepsToShow.push({
                milestone: mActive,
                status: 'in_progress',
                labelText: `STEP ${activeIdx + (activeIdx > 0 ? 1 : 2)} • ${mActive.category || 'Focus'}`,
                subText: `In Progress`
              });

              if (activeIdx + 1 < fullRoadmap.length) {
                const mUpcoming = fullRoadmap[activeIdx + 1];
                stepsToShow.push({
                  milestone: mUpcoming,
                  status: 'upcoming',
                  labelText: `STEP ${activeIdx + (activeIdx > 0 ? 2 : 3)} • ${mUpcoming.category || 'Focus'}`,
                  subText: `Upcoming`
                });
              } else {
                stepsToShow.push({
                  milestone: {
                    id: 'next-goal',
                    title: 'Reach Level ' + (state.level + 1) + ' & Unlock Capstones',
                    category: 'Goal'
                  },
                  status: 'upcoming',
                  labelText: `STEP ${activeIdx + (activeIdx > 0 ? 2 : 3)} • Goal`,
                  subText: `Upcoming`
                });
              }
            }

            const compDate = new Date(Date.now() - 2 * 24 * 3600 * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});

            return `
              <div class="glass-card" style="padding: 24px; position: relative; margin-top: 40px; border-left: 4px solid var(--primary); overflow: visible !important;">
                ${Mentor.getIvyBirdHTML('dashboard')}

                <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 24px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                  <span>🗺️</span> Mini Roadmap
                </h3>
                
                <div style="position: relative; display: flex; justify-content: space-between; align-items: flex-start; width: 100%; gap: 24px; flex-wrap: wrap;">
                  <!-- Horizontal Timeline Connector Line -->
                  <div style="position: absolute; top: 12px; left: 16%; right: 16%; height: 2px; background: var(--border-color); z-index: 1;"></div>
                  
                  ${stepsToShow.map((step, idx) => {
                    const m = step.milestone;
                    let nodeStyle = '';
                    let subTextFormatted = '';
                    
                    if (step.status === 'completed') {
                      nodeStyle = 'background: #10b981; border: 4px solid var(--glass-bg); box-shadow: 0 0 0 1px #10b981;';
                      subTextFormatted = `Completed • ${compDate}`;
                    } else if (step.status === 'in_progress') {
                      nodeStyle = 'border: 3px solid #a855f7; background: var(--bg-primary); border: 4px solid var(--glass-bg); box-shadow: 0 0 0 1px #a855f7, 0 0 10px rgba(168, 85, 247, 0.4);';
                      subTextFormatted = `In Progress • ${m.category || 'Active Focus'}`;
                    } else {
                      nodeStyle = 'border: 3px solid #3b82f6; background: var(--bg-primary); border: 4px solid var(--glass-bg); box-shadow: 0 0 0 1px #3b82f6;';
                      subTextFormatted = `Upcoming • ${m.category || 'Next'}`;
                    }

                    return `
                      <div class="roadmap-step-clickable" data-id="${m.id}" data-type="${m.category}" data-title="${m.title}" style="flex: 1; min-width: 180px; display: flex; flex-direction: column; align-items: center; text-align: center; z-index: 2; cursor: pointer; transition: transform 0.2s;">
                        <!-- Timeline Node -->
                        <div style="width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; ${nodeStyle}"></div>
                        
                        <!-- Content Card -->
                        <div style="background: var(--bg-tertiary); padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-color); width: 100%; box-sizing: border-box; display: flex; flex-direction: column; height: 100%; min-height: 96px; justify-content: space-between; transition: all 0.2s;">
                          <div>
                            <div style="font-size: 9px; color: ${step.status === 'completed' ? '#10b981' : step.status === 'in_progress' ? '#a855f7' : '#3b82f6'}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">${step.labelText}</div>
                            <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-top: 4px; line-height: 1.3;">${m.title}</div>
                          </div>
                          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 8px; font-weight: 500;">${subTextFormatted}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          })()}
          
          <!-- University Requirements Card -->
          <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--secondary);">
            <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 20px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span>🏛️</span> ${uniData.name} Requirements
            </h3>
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">${uniData.details || 'Targeting this university requires an exceptionally strong profile.'}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="background: var(--bg-tertiary); padding: 12px; border-radius: 12px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Target GPA</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${reqGPA}</div>
              </div>
              <div style="background: var(--bg-tertiary); padding: 12px; border-radius: 12px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Standardized Tests</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${reqSAT}</div>
              </div>
              <div style="background: var(--bg-tertiary); padding: 12px; border-radius: 12px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Mandatory Exams</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${reqExams}</div>
              </div>
              <div style="background: var(--bg-tertiary); padding: 12px; border-radius: 12px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Key Extracurriculars</div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${reqECs}</div>
              </div>
            </div>
          </div>

          <!-- Floating Insight Widget -->
          <div class="glass-card" style="padding: 24px; position: relative; overflow: hidden; animation: floatWidget 6s ease-in-out infinite; transform-origin: center;">
            <style>
              @keyframes floatWidget {
                0% { transform: translateY(0px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                50% { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
                100% { transform: translateY(0px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              }
              .ambient-glow-circle {
                position: absolute; width: 120px; height: 120px; background: var(--primary); 
                border-radius: 50%; filter: blur(50px); opacity: 0.15; top: -30px; right: -30px;
              }
            </style>
            <div class="ambient-glow-circle"></div>
            <h3 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin-bottom: 12px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span>✨</span> Daily Profile Insight
            </h3>
            <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin: 0; position: relative; z-index: 1;">
              "Your focus on <strong>${user.careerGoals || 'your goals'}</strong> aligns perfectly with your current XP distribution. Keep participating in highly-rated Extracurriculars to max out your Scholar stats."
            </p>
          </div>

        </div>

        <!-- Sidebar Right Column -->
        <div style="display: flex; flex-direction: column; gap: 32px;">
          
          <!-- Academic Grade Progression (Moved to Side) -->
          ${this.renderGradeProgressionCard(user, state)}

          <!-- Ivy's Recommendation (Moved to right, made smaller) -->
          <div class="glass-card" style="padding: 16px;">
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; margin-bottom: 12px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
              <span>🔥</span> Ivy's Recommendation
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${aiRecs}
            </div>
          </div>

          <!-- Active Extracurriculars -->
          <div class="glass-card" style="padding: 24px;">
            <h4 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; margin-bottom: 16px;">Active Projects</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${(state.projects || []).filter(p => p.status !== 'completed').slice(0, 3).map(proj => `
                <div style="padding: 12px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.9); transition: transform 0.2s, box-shadow 0.2s;">
                  <h5 style="font-size: 13px; font-weight: 700; margin: 0 0 4px 0;">${proj.title}</h5>
                  <div style="font-size: 11px; color: var(--text-secondary);">${proj.steps.filter(s => s.done).length}/${proj.steps.length} Sprints Done</div>
                </div>
              `).join('')}
              ${(!state.projects || state.projects.filter(p => p.status !== 'completed').length === 0) ? `
                <p style="font-size: 12px; color: var(--text-muted); margin: 0; text-align: center;">No active projects right now.</p>
              ` : ''}
            </div>
          </div>

          <!-- Upcoming Deadlines -->
          <div class="glass-card" style="padding: 24px;">
            <h4 style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; margin-bottom: 16px;">⏰ Upcoming Deadlines</h4>
            <div style="position: relative; padding-left: 20px; margin-top: 8px;">
              <!-- Vertical Line -->
              ${savedOpps.length > 0 ? '<div style="position: absolute; left: 4px; top: 6px; bottom: 12px; width: 2px; background: var(--border-color);"></div>' : ''}
              ${savedOpps.length > 0 ? savedOpps.slice(0,4).map((opp, idx) => `
                <div style="position: relative; margin-bottom: 16px;">
                  <!-- Timeline Node Circle -->
                  <div style="position: absolute; left: -20px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: ${idx === 0 ? 'var(--primary)' : 'var(--border-color)'}; box-shadow: 0 0 0 4px var(--glass-bg), 0 0 0 5px ${idx === 0 ? 'var(--primary)' : 'transparent'}; z-index: 2;"></div>
                  <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${opp.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Due: ${opp.deadline}</div>
                </div>
              `).join('') : '<p style="font-size: 12px; color: var(--text-muted); margin: 0; text-align: center;">No upcoming deadlines.</p>'}
            </div>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  },
  bindEvents() {
    const state = LeveledApp.state;
    const user = state.user;

    // --- Mentor Suggestion Cards: Expand/Collapse ---
    document.querySelectorAll('.mentor-sug-header').forEach(header => {
      header.onclick = (e) => {
        if (e.target.closest('.btn-primary')) return; // don't toggle when clicking Practice Now
        const card = header.closest('.mentor-sug-card');
        const panel = card.querySelector('.mentor-sug-panel');
        const chevron = card.querySelector('.sug-chevron');
        const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
        
        // Close all others first
        document.querySelectorAll('.mentor-sug-panel').forEach(p => { p.style.maxHeight = '0px'; });
        document.querySelectorAll('.sug-chevron').forEach(c => { c.style.transform = 'rotate(0deg)'; });
        
        if (!isOpen) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          chevron.style.transform = 'rotate(90deg)';
        }
      };
    });

    // --- Mentor Suggestion: Mark Completed ---
    document.querySelectorAll('.sug-complete-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const sugId = btn.dataset.sugId;
        const scoreInput = document.querySelector(`.sug-score-input[data-sug-id="${sugId}"]`);
        const evidenceInput = document.querySelector(`.sug-evidence-input[data-sug-id="${sugId}"]`);
        
        const completed = JSON.parse(localStorage.getItem('leveled_completed_suggestions') || '{}');
        completed[sugId] = {
          score: scoreInput ? scoreInput.value.trim() : '',
          evidence: evidenceInput ? evidenceInput.value.trim() : '',
          date: new Date().toISOString()
        };
        localStorage.setItem('leveled_completed_suggestions', JSON.stringify(completed));
        
        // Award XP
        LeveledApp.state.xp = (LeveledApp.state.xp || 0) + 25;
        LeveledApp.saveState();
        LeveledApp.updateHeaderStats();
        LeveledApp.showToast(`✅ "${sugId.replace(/-/g, ' ')}" marked complete! +25 XP`);
        
        // Re-render
        this.render();
      };
    });

    // --- Mentor Suggestion: Undo ---
    document.querySelectorAll('.sug-undo-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const sugId = btn.dataset.sugId;
        const completed = JSON.parse(localStorage.getItem('leveled_completed_suggestions') || '{}');
        delete completed[sugId];
        localStorage.setItem('leveled_completed_suggestions', JSON.stringify(completed));
        LeveledApp.showToast(`↩ "${sugId.replace(/-/g, ' ')}" reopened.`);
        this.render();
      };
    });

    // Clickable roadmap events
    const roadmapSteps = document.querySelectorAll('.roadmap-step-clickable');
    roadmapSteps.forEach(step => {
      step.onclick = () => {
        const type = step.getAttribute('data-type');
        const id = step.getAttribute('data-id');
        const title = step.getAttribute('data-title') || step.querySelector('h5')?.innerText || 'Event';
        LeveledApp.openRoadmapEventModal(id, title, type);
      };
    });

    // Discuss with mentor button
    const mentorBtn = document.getElementById('btn-mentor-ask-next');
    if (mentorBtn) {
      mentorBtn.onclick = () => {
        const panel = document.getElementById('ai-mentor-panel');
        panel.classList.add('open');
        const state = LeveledApp.state;
        const nextMilestone = AISimulator.generateRoadmap(state.user).find(m => !state.completedMilestones.includes(m.id));
        if (nextMilestone) {
          window.sendMessageToMentor(`How can I start working on my roadmap milestone: "${nextMilestone.title}"?`);
        }
      };
    }

    const dashMentorBtn = document.getElementById('btn-dashboard-mentor');
    if (dashMentorBtn) {
      dashMentorBtn.onclick = () => {
        const panel = document.getElementById('ai-mentor-panel');
        panel.classList.add('open');
        window.sendMessageToMentor(`Analyze my profile gaps and advise on what I should prioritize next.`);
      };
    }

    // Find Opportunities click from Dashboard fallback link
    const findOppsBtn = document.querySelector('.btn-find-opps-dash');
    if (findOppsBtn) {
      findOppsBtn.onclick = () => {
        Extracurriculars.activeTab = 'opportunities';
      };
    }

    // Pass Grade / Graduation button
    const passGradeBtn = document.getElementById('btn-pass-grade');
    if (passGradeBtn) {
      passGradeBtn.onclick = () => {
        let currentGradeNum = parseInt(user.grade) || 10;
        if (user.grade && user.grade.includes('th')) {
          currentGradeNum = parseInt(user.grade.split('th')[0]) || 10;
        }

        const isGrade12 = currentGradeNum === 12;

        if (isGrade12) {
          // Open Graduation Modal
          LeveledApp.openModal(`
            <div style="text-align: left; padding: 10px 4px;">
              <span style="font-size: 11px; font-weight: 800; background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">Graduation Portal</span>
              <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin: 12px 0 6px 0; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎓 High School Graduation Ceremony</h3>
              <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 20px;">Congratulations on completing Grade 12! Let's log your final academic outcomes and transition your Leveld workspace into <strong>College & Career Mode</strong>.</p>
              
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Final Cumulative GPA <span style="color: #ef4444;">*</span></label>
                  <input type="number" id="grad-gpa" class="form-control" placeholder="e.g. 3.95" step="0.01" min="1.0" max="4.0" style="padding: 8px 12px;" required />
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Committed College / University <span style="color: #ef4444;">*</span></label>
                  <input type="text" id="grad-college" class="form-control" placeholder="e.g. Georgia Tech, Harvard" style="padding: 8px 12px;" required />
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Intended Major / Career Focus <span style="color: #ef4444;">*</span></label>
                  <input type="text" id="grad-major" class="form-control" placeholder="e.g. Software Engineering, Economics" style="padding: 8px 12px;" required />
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Attached Evidence (Report Card PDF, Certificate, or URL) <span style="color: #ef4444;">*</span></label>
                  <input type="text" id="grad-evidence" class="form-control" placeholder="e.g. final_transcript.pdf or drive.google.com/..." style="padding: 8px 12px;" required />
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                  <button class="btn btn-secondary" onclick="LeveledApp.closeModal()">Cancel</button>
                  <button class="btn btn-primary" id="btn-submit-graduation" style="background: linear-gradient(135deg, #10b981, #3b82f6); border: none; flex: 1;">🎓 Graduate & Unlock Career Mode</button>
                </div>
              </div>
            </div>
          `);

          document.getElementById('btn-submit-graduation').onclick = () => {
            const gpa = document.getElementById('grad-gpa').value.trim();
            const college = document.getElementById('grad-college').value.trim();
            const major = document.getElementById('grad-major').value.trim();
            const evidence = document.getElementById('grad-evidence').value.trim();

            if (!gpa || !college || !major || !evidence) {
              alert('Please fill in all graduation fields and attach evidence (e.g. report card PDF or URL) to complete the transition.');
              return;
            }

            // Save results
            user.gradeResults = user.gradeResults || {};
            user.gradeResults[`Grade-${currentGradeNum}`] = { gpa, college, major, evidence, date: new Date().toISOString() };
            user.grade = 'College';
            user.school = college;
            user.careerGoals = major;

            // Trigger graduation ceremony toast and modal
            LeveledApp.closeModal();
            LeveledApp.addXP(300, 'Graduated High School! Unlocked College & Career Mode');
            
            // Grand celebratory modal
            LeveledApp.openModal(`
              <div style="text-align: center; padding: 24px 12px;">
                <div style="font-size: 80px; animation: bounce 1s infinite alternate; margin-bottom: 16px;">🎓🐯🎉</div>
                <h2 style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">CONGRATULATIONS, GRADUATE!</h2>
                <p style="color: var(--text-secondary); font-size: 14.5px; line-height: 1.5; margin-bottom: 24px;">You have successfully completed high school and transitioned to <strong>College Mode</strong> at <strong>${college}</strong>!</p>
                
                <div style="background: rgba(255,255,255,0.02); border: 1.5px dashed var(--border-color); border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: left;">
                  <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">🆕 UNLOCKED IN COLLEGE MODE:</div>
                  <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                    <li>🔍 <strong>Job & Internship Search Hub</strong> (Find roles at Google, Apple, etc.)</li>
                    <li>💼 <strong>Resume Studio</strong> (Optimize cover letters & cold outreach templates)</li>
                    <li>🗺️ <strong>Career-Aligned Roadmap</strong> (Tailored for professional recruitment)</li>
                  </ul>
                </div>

                <button class="btn btn-primary" onclick="LeveledApp.closeModal(); window.location.hash = '#jobs';" style="padding: 10px 24px; background: linear-gradient(135deg, #10b981, #3b82f6); border: none; font-weight: 600;">⚡ Explore Career Center</button>
              </div>
            `);

            LeveledApp.saveState();
            LeveledApp.renderShell();
          };

        } else {
          // Open normal grade promotion modal
          const nextGrade = currentGradeNum + 1;
          LeveledApp.openModal(`
            <div style="text-align: left; padding: 10px 4px;">
              <span style="font-size: 11px; font-weight: 800; background: var(--primary-glow); color: var(--primary); padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">Grade Transition</span>
              <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin: 12px 0 6px 0;">🎓 Pass Grade ${currentGradeNum}</h3>
              <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.45; margin-bottom: 20px;">Advance your profile to <strong>Grade ${nextGrade}</strong>. Log your final results below to adjust your Leveld Roadmap.</p>
              
              <div style="display: flex; flex-direction: column; gap: 14px;">
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Yearly GPA <span style="color: #ef4444;">*</span></label>
                  <input type="number" id="pass-gpa" class="form-control" placeholder="e.g. 3.85" step="0.01" min="1.0" max="4.0" style="padding: 8px 12px;" required />
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Completed AP Exams / Standardized Tests</label>
                  <input type="text" id="pass-exams" class="form-control" placeholder="e.g. AP Calculus (5), SAT Chemistry (780)" style="padding: 8px 12px;" />
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Key Achievements &amp; Awards</label>
                  <textarea id="pass-awards" class="form-control" placeholder="e.g. Debate Club Champion, Robotics Lead..." rows="2" style="padding: 8px 12px; resize: vertical;"></textarea>
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Attached Evidence (Report Card PDF, Certificate, or URL) <span style="color: #ef4444;">*</span></label>
                  <input type="text" id="pass-evidence" class="form-control" placeholder="e.g. report_card_grade_${currentGradeNum}.pdf or drive.google.com/..." style="padding: 8px 12px;" required />
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                  <button class="btn btn-secondary" onclick="LeveledApp.closeModal()">Cancel</button>
                  <button class="btn btn-primary" id="btn-submit-promotion" style="flex: 1;">✓ Advance to Grade ${nextGrade}</button>
                </div>
              </div>
            </div>
          `);

          document.getElementById('btn-submit-promotion').onclick = () => {
            const gpa = document.getElementById('pass-gpa').value.trim();
            const exams = document.getElementById('pass-exams').value.trim();
            const awards = document.getElementById('pass-awards').value.trim();
            const evidence = document.getElementById('pass-evidence').value.trim();

            if (!gpa || !evidence) {
              alert('Please enter your GPA and attach evidence (e.g. report card PDF or URL) to advance.');
              return;
            }

            // Save results
            user.gradeResults = user.gradeResults || {};
            user.gradeResults[`Grade-${currentGradeNum}`] = { gpa, exams, awards, evidence, date: new Date().toISOString() };
            
            // Increment grade
            user.grade = `${nextGrade}th Grade`;

            LeveledApp.closeModal();
            LeveledApp.addXP(200, `Completed Grade ${currentGradeNum}! Promoted to Grade ${nextGrade}`);
            LeveledApp.saveState();
            this.render();
          };
        }
      };
    }
  },


  toggleDashboardTask(taskId) {
    const focusTasksJSON = localStorage.getItem('leveled_focus_tasks');
    let focusTasks = focusTasksJSON ? JSON.parse(focusTasksJSON) : [];
    const taskIndex = focusTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      focusTasks[taskIndex].completed = !focusTasks[taskIndex].completed;
      localStorage.setItem('leveled_focus_tasks', JSON.stringify(focusTasks));
      this.render();
    }
  },

  openOwnProfileModal(user, state) {
    const bioText = state.portfolioBio || "I'm building an ambitious student portfolio and scaling academic heights using Leveld OS.";
    const dreamUnis = user.dreamUniversities || ['MIT'];
    const skills = user.skills || [];
    const interests = user.interests || [];
    const currentLvl = state.level;

    const modalHTML = `
      <div style="text-align: left; padding: 10px 4px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
          <div style="width: 54px; height: 54px; border-radius: var(--border-radius-round); background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; border: 2px solid var(--border-color); flex-shrink: 0;">
            ${user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-primary); margin: 0;">${user.name} (You)</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0;">${user.school || 'High School'} • Grade ${user.grade || '12'}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Your Level</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--primary); margin-top: 4px;">Lvl ${currentLvl}</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${LEVEL_TITLES[currentLvl - 1]}</div>
          </div>
          <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Daily Streak</div>
            <div style="font-size: 18px; font-weight: 800; color: #f97316; margin-top: 4px;">🔥 ${state.streak} Days</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Keep learning!</div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Your Portfolio Bio</h4>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin: 0;">"${bioText}"</p>
        </div>

        <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Dream Universities</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${dreamUnis.map(u => `<span style="font-size: 10px; background-color: var(--bg-primary); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: var(--border-radius-xl); color: var(--text-primary);">${u}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Active Skills</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${skills.map(s => `<span style="font-size: 10px; background-color: var(--bg-primary); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: var(--border-radius-xl); color: var(--primary);">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; gap: 12px; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="width: 100%;">Close</button>
          <a href="#profile" onclick="LeveledApp.closeModal()" class="btn btn-primary" style="width: 100%; text-decoration: none; text-align: center; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary), var(--secondary));">
            ⚙️ Edit Profile
          </a>
        </div>
      </div>
    `;

    LeveledApp.openModal(modalHTML);
  },

  openPeerProfileModal(peer, state) {
    const peerLevel = peer.level || 1;
    const profileDetails = {
      school: peer.school || 'High School',
      skills: peer.skills || ['Research', 'Writing'],
      interests: peer.interests || ['Academic Outreach'],
      level: peerLevel,
      title: LEVEL_TITLES[peerLevel - 1] || 'Explorer',
      bio: `Studying ${peer.major || 'various subjects'} at ${peer.school || 'their school'}. Located in ${peer.city ? peer.city + ', ' : ''}${peer.country || 'the world'}.`,
      country: peer.country || '',
      city: peer.city || '',
      grade: peer.grade || ''
    };

    const isFriend = state.friends.includes(peer.id);

    const modalHTML = `
      <div style="text-align: left; padding: 10px 4px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
          <div style="width: 54px; height: 54px; border-radius: var(--border-radius-round); background: ${peer.color || 'var(--primary)'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; border: 2px solid var(--border-color); flex-shrink: 0;">
            ${peer.avatar}
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-primary); margin: 0;">${peer.name}</h3>
            <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0 0 0;">${profileDetails.school}${profileDetails.grade ? ' • Grade ' + profileDetails.grade.replace(' Grade','') : ''}</p>
            ${profileDetails.country ? `<p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">📍 ${profileDetails.city ? profileDetails.city + ', ' : ''}${profileDetails.country}</p>` : ''}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Current Level</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--primary); margin-top: 4px;">Lvl ${profileDetails.level}</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${profileDetails.title}</div>
          </div>
          <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Daily Streak</div>
            <div style="font-size: 18px; font-weight: 800; color: #f97316; margin-top: 4px;">🔥 ${peer.streak} Days</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Active learner</div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Biography & Goals</h4>
          <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.5; margin: 0;">"${profileDetails.bio}"</p>
        </div>

        <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Interests</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${profileDetails.interests.map(i => `<span style="font-size: 10px; background-color: var(--bg-primary); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: var(--border-radius-xl); color: var(--text-primary);">${i}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Top Skills</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${profileDetails.skills.map(s => `<span style="font-size: 10px; background-color: var(--bg-primary); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: var(--border-radius-xl); color: var(--primary);">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; gap: 12px; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="flex: 1;">Close</button>
          ${isFriend ? `
            <button class="btn btn-danger btn-modal-friend-action" data-action="remove" style="flex: 2; background-color: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); color: #ef4444;">
              🚪 Remove Friend
            </button>
          ` : `
            <button class="btn btn-primary btn-modal-friend-action" data-action="add" style="flex: 2; background: linear-gradient(135deg, var(--primary), var(--secondary));">
              ✨ Add Study Friend
            </button>
          `}
        </div>
      </div>
    `;

    LeveledApp.openModal(modalHTML);

    const actionBtn = document.querySelector('.btn-modal-friend-action');
    if (actionBtn) {
      actionBtn.onclick = () => {
        const action = actionBtn.getAttribute('data-action');
        state.friends = state.friends || [];
        if (action === 'add') {
          state.friends.push(peer.id);
          LeveledApp.addXP(40, `Connected with study partner "${peer.name}"`);
          LeveledApp.showToast(`✨ Connected with ${peer.name}!`);
        } else {
          state.friends = state.friends.filter(fid => fid !== peer.id);
          LeveledApp.showToast(`🚪 Removed friend: ${peer.name}`);
        }
        LeveledApp.saveState();
        LeveledApp.closeModal();
        this.render();
      };
    }
  }
};
