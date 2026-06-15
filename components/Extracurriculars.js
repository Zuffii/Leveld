import { AISimulator } from '../data/ai_simulator.js';
import { OPPORTUNITIES } from '../data/mock_data.js';
import { Mentor } from './Mentor.js';

export const Extracurriculars = {
  activeTab: 'passion', // 'passion' | 'research' | 'critique' | 'active'
  activeCategory: 'all',
  searchQuery: '',
  liveOpps: null,
  isScouring: false,

  passionIdeas: [],
  researchIdeas: [],
  activeCritique: null,
  critiqueText: '',
  selectedProjectId: null, // Holds ID of active project being worked on in workspace
  activeStepIndex: null, // Step index selected for AI guidance

  render() {
    const container = document.getElementById('view-extracurriculars');
    const state = LeveledApp.state;
    const user = state.user;

    if (!user) return;

    // Load initial ideas if not loaded yet
    if (this.passionIdeas.length === 0) {
      this.passionIdeas = AISimulator.generateProjectIdeas({
        interests: user.interests.slice(0, 3).join(', '),
        skills: user.skills.slice(0, 3).join(', '),
        goals: user.careerGoals,
        time: '5'
      });
    }
    if (this.researchIdeas.length === 0) {
      this.researchIdeas = AISimulator.generateResearchSuggestions(
        user.interests[0] || 'STEM',
        user.careerGoals
      );
    }

    // Default tab check
    state.projects = state.projects || [];
    
    container.innerHTML = `
      ${Mentor.getIvyBirdHTML('extracurriculars')}
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Tab Navigation Header -->
        <div class="glass-card" style="padding: 16px; position: relative; overflow: visible !important; margin-top: 20px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; padding-left: 8px;">Extracurricular &amp; Research Track</div>
          <div class="tag-selector" id="project-incubator-tabs" style="gap: 10px; margin-bottom: 0;">
            <div class="tag-chip ${this.activeTab === 'passion' ? 'selected' : ''}" data-tab="passion">💡 Passion Projects</div>
            <div class="tag-chip ${this.activeTab === 'research' ? 'selected' : ''}" data-tab="research">🔬 Research Papers</div>
            <div class="tag-chip ${this.activeTab === 'critique' ? 'selected' : ''}" data-tab="critique">🗣️ AI Idea Critique</div>
            <div class="tag-chip ${this.activeTab === 'opportunities' ? 'selected' : ''}" data-tab="opportunities">🔍 Discover Opportunities</div>
            <div class="tag-chip ${this.activeTab === 'active' ? 'selected' : ''}" data-tab="active">⚡ Active Tracker (${state.projects.length})</div>
          </div>
        </div>

        <!-- Render active tab panel -->
        <div class="incubator-content">
          ${this.activeTab === 'passion' ? this.renderPassionTab(user) : ''}
          ${this.activeTab === 'research' ? this.renderResearchTab(user) : ''}
          ${this.activeTab === 'critique' ? this.renderCritiqueTab(user) : ''}
          ${this.activeTab === 'opportunities' ? this.renderOpportunitiesTab(state) : ''}
          ${this.activeTab === 'active' ? this.renderActiveProjectsTab(state) : ''}
        </div>
      </div>
    `;

    this.bindEvents();
  },

  renderPassionTab(user) {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="glass-card" style="border-left: 4px solid var(--primary);">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>🤖</span> Extracurricular Idea Blueprints
          </h3>
          <p style="color: var(--text-secondary); font-size: 13.5px;">These high-impact extracurricular milestones are customized based on your skills in **${user.skills.slice(0, 2).join(', ')}** and interest in **${user.interests.slice(0, 2).join(', ')}**.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${this.passionIdeas.map((idea, index) => `
            <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--secondary);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                <span style="font-size: 11px; font-weight: 800; background-color: var(--primary-glow); color: var(--primary); padding: 3px 8px; border-radius: var(--border-radius-sm); text-transform: uppercase;">
                  Blueprint #${index + 1} • ${idea.difficulty} Difficulty
                </span>
                <span style="font-size: 12px; font-weight: 700; color: var(--color-level);">⏳ ${idea.timeEstimate}</span>
              </div>

              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">${idea.title}</h4>
              <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 16px;">${idea.overview}</p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;" class="fit-grid">
                <div>
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Learning Outcomes:</h5>
                  <ul style="padding-left: 20px; font-size: 12.5px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                    ${idea.learningOutcomes.map(o => `<li>${o}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Admissions Portfolio Value:</h5>
                  <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45;">${idea.portfolioValue}</p>
                </div>
              </div>

              <!-- Implementation roadmap preview -->
              <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 16px; margin-bottom: 20px;">
                <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Roadmap Sprints:</h5>
                <ol style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                  ${idea.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
              </div>

              <div style="display: flex; gap: 12px;">
                ${(() => {
                  const alreadyAdded = (LeveledApp.state.projects || []).some(p => p.title === idea.title);
                  return alreadyAdded
                    ? '<button class="btn btn-secondary" disabled style="font-size: 12px; padding: 8px 16px; opacity: 0.6; color: #10b981; background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.2);">✓ Already Added</button>'
                    : '<button class="btn btn-primary btn-project-add-tracker" data-title="' + idea.title + '" data-type="passion" data-desc="' + (idea.description || '').replace(/'/g, "&#39;") + '" style="font-size: 12px; padding: 8px 16px;">⚡ Add to Active Tracker</button>';
                })()}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderResearchTab(user) {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="glass-card" style="border-left: 4px solid var(--secondary);">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>🔬</span> Academic Research Suggestions
          </h3>
          <p style="color: var(--text-secondary); font-size: 13.5px;">These research topic ideas align with your target major in **${user.careerGoals || 'general STEM'}** and academic focus area.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${this.researchIdeas.map((idea, index) => `
            <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--color-xp);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                <span style="font-size: 11px; font-weight: 800; background-color: var(--primary-glow); color: var(--primary); padding: 3px 8px; border-radius: var(--border-radius-sm); text-transform: uppercase;">
                  ${idea.field} • ${idea.difficulty}
                </span>
                <span style="font-size: 12px; font-weight: 700; color: var(--color-level);">⏳ ${idea.timeEstimate}</span>
              </div>

              <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">${idea.title}</h4>
              
              <div style="font-size: 13px; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 14px; margin-bottom: 16px; line-height: 1.45;">
                <strong>🔬 Proposed Abstract:</strong><br>
                <span style="color: var(--text-secondary);">${idea.abstract}</span>
              </div>

              <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; margin-bottom: 20px;" class="fit-grid">
                <div>
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Methodology Outline:</h5>
                  <p style="font-size: 12.5px; color: var(--text-secondary); white-space: pre-wrap; line-height: 1.45;">${idea.methodology}</p>
                </div>
                <div>
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Target Peer Journals:</h5>
                  <ul style="padding-left: 20px; font-size: 12.5px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                    ${idea.journals.map(j => `<li>${j}</li>`).join('')}
                  </ul>
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-top: 12px; margin-bottom: 4px;">Portfolio Value:</h5>
                  <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${idea.portfolioValue}</p>
                </div>
              </div>

              <div style="display: flex; gap: 12px;">
                ${(() => {
                  const alreadyAdded = (LeveledApp.state.projects || []).some(p => p.title === idea.title);
                  return alreadyAdded
                    ? '<button class="btn btn-secondary" disabled style="font-size: 12px; padding: 8px 16px; opacity: 0.6; color: #10b981; background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.2);">✓ Already Added</button>'
                    : '<button class="btn btn-primary btn-project-add-tracker" data-title="' + idea.title + '" data-type="research" data-desc="' + (idea.abstract || '').replace(/'/g, "&#39;") + '" style="font-size: 12px; padding: 8px 16px;">⚡ Add to Active Tracker</button>';
                })()}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderCritiqueTab(user) {
    return `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        
        <!-- Critique Input Box -->
        <div class="glass-card">
          <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 6px;">🗣️ AI Idea Critique Board</h3>
          <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 20px;">Pitch your custom extracurricular project or research paper concept here. The AI mentor will analyze the concept's rigor, admissions appeal, and execution feasibility.</p>

          <form id="idea-critique-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="crit-text">Pitch your Concept</label>
              <textarea id="crit-text" class="form-control" placeholder="Describe what you want to build or research. What is the goal? What data/code will you use? Who will you serve?" style="min-height: 120px; font-size: 13.5px; line-height: 1.5;" required>${this.critiqueText}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="btn btn-primary" style="padding: 10px 24px;">🤖 Critique My Idea</button>
            </div>
          </form>
        </div>

        <!-- Critique Results -->
        ${this.activeCritique ? `
          <div id="critique-results-card">
            ${this.activeCritique.tooShort ? `
              <div class="glass-card" style="background-color: rgba(244, 63, 94, 0.1); border-left: 4px solid var(--accent); padding: 20px;">
                <p style="color: var(--text-primary); font-size: 14px; font-weight: 600;">${this.activeCritique.feedback}</p>
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 32px;" class="readiness-split">
                <!-- Scores -->
                <div class="glass-card" style="text-align: center; padding: 24px; display: flex; flex-direction: column; justify-content: center;">
                  <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin-bottom: 16px;">AI Idea Score</h4>
                  
                  <div style="width: 110px; height: 110px; border-radius: var(--border-radius-round); border: 8px solid var(--primary); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 0 16px var(--primary-glow);">
                    <span style="font-family: var(--font-heading); font-size: 34px; font-weight: 800; color: var(--text-primary); line-height: 1;">${this.activeCritique.scores.overall}</span>
                    <span style="font-size: 9px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Grade</span>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 12px; text-align: left; font-size: 12.5px; border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: 8px;">
                    <div>
                      <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 3px;">
                        <span>🔬 Scientific Rigor</span> <span>${this.activeCritique.scores.rigor}/10</span>
                      </div>
                      <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                        <div style="width: ${this.activeCritique.scores.rigor * 10}%; height: 100%; background-color: var(--secondary);"></div>
                      </div>
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 3px;">
                        <span>🏛️ Admissions Appeal</span> <span>${this.activeCritique.scores.appeal}/10</span>
                      </div>
                      <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                        <div style="width: ${this.activeCritique.scores.appeal * 10}%; height: 100%; background-color: var(--color-xp);"></div>
                      </div>
                    </div>

                    <div>
                      <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 3px;">
                        <span>⚡ Execution Feasibility</span> <span>${this.activeCritique.scores.feasibility}/10</span>
                      </div>
                      <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                        <div style="width: ${this.activeCritique.scores.feasibility * 10}%; height: 100%; background-color: #10b981;"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Critique lists -->
                <div style="display: flex; flex-direction: column; gap: 24px;">
                  <div class="glass-card" style="padding: 20px;">
                    <h5 style="font-size: 13px; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 8px;">Key Strengths:</h5>
                    <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                      ${this.activeCritique.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>

                    <h5 style="font-size: 13px; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-top: 16px; margin-bottom: 8px;">Critical Gaps:</h5>
                    <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                      ${this.activeCritique.weaknesses.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                  </div>

                  <div class="glass-card" style="padding: 20px;">
                    <h5 style="font-size: 13px; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 8px;">Improvement Guidelines:</h5>
                    <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px;">
                      ${this.activeCritique.suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>

                    <h5 style="font-size: 13px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Next Sprints Checklist:</h5>
                    <ul style="list-style: none; padding-left: 0; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                      ${this.activeCritique.nextSteps.map((step, i) => `
                        <li style="display: flex; gap: 6px; align-items: flex-start;">
                          <span style="color: var(--primary); font-weight: bold;">[${i+1}]</span> ${step}
                        </li>
                      `).join('')}
                    </ul>

                    <div style="margin-top: 20px; border-top: 1px solid var(--border-color); padding-top: 16px; display: flex; gap: 12px;">
                      <button class="btn btn-secondary btn-incubator-discuss" style="font-size: 12px; padding: 8px 16px;">Discuss Critique with AI Advisor</button>
                    </div>
                  </div>
                </div>
              </div>
            `}
          </div>
        ` : `
          <div class="glass-card" style="text-align: center; padding: 40px; border: 1px dashed var(--border-color);">
            <p style="color: var(--text-secondary); font-size: 14px;">No critique analysis loaded yet. Pitch your idea above to receive AI scoring!</p>
          </div>
        `}
      </div>
    `;
  },

  renderOpportunitiesTab(state) {
    const user = state.user;
    if (!user) return '';

    let oppsToRender = this.liveOpps || OPPORTUNITIES;

    // Filter opportunities
    const filteredOpps = oppsToRender.filter(opp => {
      const isCourseMatch = this.activeCategory === 'course' && (opp.category === 'course' || opp.category === 'certificate');
      const matchesCat = this.activeCategory === 'all' || opp.category === this.activeCategory || isCourseMatch;
      const matchesSearch = opp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            opp.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            (opp.matchingSkills && opp.matchingSkills.some(s => s.toLowerCase().includes(this.searchQuery.toLowerCase())));
      return matchesCat && matchesSearch;
    });

    // Sort by AI Profile Fit match & Career Goals alignment
    const sortedOpps = filteredOpps.map(opp => {
      const common = (opp.matchingSkills || []).filter(s => 
        (user.skills || []).includes(s) || (user.interests || []).includes(s)
      );

      // Check career goal alignment
      let alignsWithCareer = false;
      if (user.careerGoals) {
        const careerLower = user.careerGoals.toLowerCase();
        
        // 1. Direct keyword match (excluding common small/meaningless words)
        const ignoreWords = ['and', 'for', 'the', 'with', 'goals', 'goal', 'career', 'choices', 'choice', 'would', 'good', 'you', 'your', 'study', 'studies', 'field', 'fields'];
        const careerKeywords = careerLower
          .replace(/[^a-z0-9\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 2 && !ignoreWords.includes(w))
          .map(w => {
            // simple stemming to improve matches (e.g. engineering -> engineer)
            if (w.endsWith('engineering')) return 'engineer';
            if (w.endsWith('ing')) return w.slice(0, -3);
            if (w.endsWith('ers')) return w.slice(0, -3);
            if (w.endsWith('er')) return w.slice(0, -2);
            if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
            if (w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
            return w;
          });
        
        const searchText = (opp.name + ' ' + opp.description + ' ' + (opp.matchingSkills || []).join(' ')).toLowerCase()
          .replace(/[^a-z0-9\s]/g, ' ');
        const searchWords = searchText.split(/\s+/).filter(w => w.length > 2);
        
        alignsWithCareer = careerKeywords.some(kw => {
          return searchWords.some(sw => {
            let swStem = sw;
            if (sw.endsWith('engineering')) swStem = 'engineer';
            else if (sw.endsWith('ing')) swStem = sw.slice(0, -3);
            else if (sw.endsWith('ers')) swStem = sw.slice(0, -3);
            else if (sw.endsWith('er')) swStem = sw.slice(0, -2);
            else if (sw.endsWith('ies')) swStem = sw.slice(0, -3) + 'y';
            else if (sw.endsWith('s') && !sw.endsWith('ss')) swStem = sw.slice(0, -1);

            return swStem.includes(kw) || kw.includes(swStem);
          });
        });

        // 2. Map-based alignment (smart industry mapping for careers with indirect match)
        if (!alignsWithCareer) {
          const careerToSkillsMap = {
            'software': ['computer science', 'coding', 'programming', 'web development', 'software', 'python', 'machine learning', 'ai', 'deep learning', 'algorithms', 'react', 'javascript', 'html', 'css', 'cloud', 'aws', 'devops'],
            'computer': ['computer science', 'coding', 'programming', 'web development', 'software', 'python', 'machine learning', 'ai', 'deep learning', 'algorithms', 'react', 'javascript', 'html', 'css', 'cloud', 'aws', 'devops'],
            'developer': ['computer science', 'coding', 'programming', 'web development', 'software', 'python', 'machine learning', 'ai', 'deep learning', 'algorithms', 'react', 'javascript', 'html', 'css', 'cloud', 'aws', 'devops'],
            'mechanical': ['robotics', 'cad', 'engineering', 'mathematics', 'python', 'algorithms', 'physics', '3d', 'hardware', 'dynamics'],
            'aerospace': ['robotics', 'cad', 'engineering', 'mathematics', 'python', 'algorithms', 'physics', '3d', 'hardware', 'dynamics', 'space'],
            'robotics': ['robotics', 'cad', 'engineering', 'mathematics', 'python', 'algorithms', 'physics', '3d', 'hardware', 'dynamics'],
            'design': ['ux', 'ui', 'design', 'prototyping', 'figma', 'user research', 'creativity', 'branding', 'graphic design'],
            'ux': ['ux', 'ui', 'design', 'prototyping', 'figma', 'user research', 'creativity', 'branding', 'graphic design'],
            'ui': ['ux', 'ui', 'design', 'prototyping', 'figma', 'user research', 'creativity', 'branding', 'graphic design'],
            'product': ['ux', 'ui', 'design', 'prototyping', 'figma', 'user research', 'creativity', 'branding', 'graphic design', 'product management', 'agile'],
            'finance': ['finance', 'business', 'economics', 'accounting', 'marketing', 'wharton'],
            'business': ['finance', 'business', 'economics', 'accounting', 'marketing', 'wharton'],
            'economics': ['finance', 'business', 'economics', 'accounting', 'marketing', 'wharton', 'statistics'],
            'medicine': ['biology', 'health', 'public health', 'chemistry', 'science'],
            'medical': ['biology', 'health', 'public health', 'chemistry', 'science'],
            'biology': ['biology', 'health', 'public health', 'chemistry', 'science'],
            'psychology': ['psychology', 'cognitive science', 'science', 'well-being'],
            'cognitive': ['psychology', 'cognitive science', 'science', 'well-being']
          };
          
          const matchingMappedSkills = [];
          for (const [key, skills] of Object.entries(careerToSkillsMap)) {
            if (careerLower.includes(key)) {
              matchingMappedSkills.push(...skills);
            }
          }
          if (matchingMappedSkills.length > 0) {
            alignsWithCareer = (opp.matchingSkills || []).some(s => 
              matchingMappedSkills.some(ms => s.toLowerCase().includes(ms) || ms.includes(s.toLowerCase()))
            );
          }
        }
      }

      // Check interest alignment
      let alignsWithInterests = (opp.matchingSkills || []).some(s => 
        (user.interests || []).some(int => int.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(int.toLowerCase()))
      );

      const matchScore = Math.round((common.length / Math.max(1, (opp.matchingSkills || []).length)) * 100) || Math.floor(Math.random() * 30) + 70;
      
      // Recommendation badge text
      let recText = '';
      let recType = ''; // 'career', 'portfolio', 'interest'
      
      if (opp.category === 'course' || opp.category === 'certificate') {
        if (alignsWithCareer) {
          recText = `🌟 Aligns with your career choices in ${user.careerGoals}`;
          recType = 'career';
        } else if (alignsWithInterests) {
          recText = `🎯 Aligns with your interest in ${(user.interests || []).slice(0, 2).join(', ')}`;
          recType = 'interest';
        } else {
          recText = `💼 This would be good for your portfolio`;
          recType = 'portfolio';
        }
      }

      return { ...opp, matchScore, alignsWithCareer, alignsWithInterests, recText, recType };
    }).sort((a, b) => {
      // Prioritize career aligned courses first if viewing courses
      if (this.activeCategory === 'course') {
        if (a.alignsWithCareer && !b.alignsWithCareer) return -1;
        if (!a.alignsWithCareer && b.alignsWithCareer) return 1;
        if (a.alignsWithInterests && !b.alignsWithInterests) return -1;
        if (!a.alignsWithInterests && b.alignsWithInterests) return 1;
      }
      return b.matchScore - a.matchScore;
    });

    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- Live Scour Header -->
        <div class="glass-card" style="padding: 24px; text-align: center; background: linear-gradient(135deg, var(--bg-secondary), rgba(99, 102, 241, 0.05));">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px;">🌍 Live Opportunity Scour</h3>
          <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 20px; max-width: 600px; margin-left: auto; margin-right: auto;">Tap into the live internet to find highly personalized internships, olympiads, and extracurriculars near you (${user.country || 'Global'}).</p>
          
          ${this.isScouring ? `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px;">
              <div class="spinner" style="width: 32px; height: 32px; border: 3px solid rgba(37,99,235,0.2); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
              <div style="font-size: 14px; font-weight: 700; color: var(--primary); animation: pulse 1.5s infinite; text-transform: uppercase; letter-spacing: 1px;">Decrypting Global Networks & Fetching 40+ Opportunities...</div>
              <style>
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; text-shadow: 0 0 10px var(--primary); } 50% { opacity: 0.5; text-shadow: none; } }
              </style>
            </div>
          ` : `
            <button class="btn btn-primary" onclick="Extracurriculars.scourInternetForOpps()" style="font-size: 14px; padding: 12px 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
              🔍 Scour the Internet Now
            </button>
          `}
        </div>

        <!-- Search and Category Filters -->
        <div class="glass-card" style="display: flex; flex-direction: column; gap: 16px; padding: 20px;">
          <div style="display: flex; gap: 12px; width: 100%;">
            <input type="text" id="opps-tab-search" class="form-control" placeholder="Search opportunities or skills (e.g., Python, Writing, MIT)..." value="${this.searchQuery}" style="font-size: 13.5px; flex: 1;">
          </div>

          <div style="overflow-x: auto; display: flex; gap: 8px; padding-bottom: 6px;" class="horizontal-scroll-row" id="opps-tab-category-chips">
            <div class="tag-chip ${this.activeCategory === 'all' ? 'selected' : ''}" data-cat="all">All</div>
            <div class="tag-chip ${this.activeCategory === 'olympiad' ? 'selected' : ''}" data-cat="olympiad">🏆 Olympiads</div>
            <div class="tag-chip ${this.activeCategory === 'hackathon' ? 'selected' : ''}" data-cat="hackathon">💻 Hackathons</div>
            <div class="tag-chip ${this.activeCategory === 'competition' ? 'selected' : ''}" data-cat="competition">🌟 Competitions</div>
            <div class="tag-chip ${this.activeCategory === 'scholarship' ? 'selected' : ''}" data-cat="scholarship">💰 Scholarships</div>
            <div class="tag-chip ${this.activeCategory === 'internship' ? 'selected' : ''}" data-cat="internship">💼 Internships</div>
            <div class="tag-chip ${this.activeCategory === 'summer' ? 'selected' : ''}" data-cat="summer">☀️ Summer Programs</div>
            <div class="tag-chip ${this.activeCategory === 'research' ? 'selected' : ''}" data-cat="research">🔬 Research</div>
            <div class="tag-chip ${this.activeCategory === 'leadership' ? 'selected' : ''}" data-cat="leadership">🛡️ Leadership</div>
            <div class="tag-chip ${this.activeCategory === 'course' ? 'selected' : ''}" data-cat="course">🎓 Courses</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 24px;">
          ${sortedOpps.length > 0 ? sortedOpps.map((opp, index) => {
            const matchVal = opp.matchScore || Math.floor(Math.random() * 30) + 40;
            const steps = LeveledApp.getOpportunitySteps(opp.category);
            
            return `
              <div class="glass-card" style="padding: 24px; border-left: 4px solid var(--cat-${opp.category === 'certificate' ? 'course' : opp.category}); text-align: left;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                  <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span class="opp-cat-tag ${opp.category === 'certificate' ? 'course' : opp.category}" style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--cat-${opp.category === 'certificate' ? 'course' : opp.category});">${opp.category === 'certificate' ? 'course' : opp.category}</span>
                    <span style="font-size: 11px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); padding: 1px 6px; border-radius: var(--border-radius-sm); color: var(--text-secondary);">${opp.difficulty} Difficulty</span>
                    ${(() => {
                      const userCountry = LeveledApp.state?.user?.country || '';
                      if (opp.isGlobal) return '<span style="font-size: 10px; background-color: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.25); padding: 1px 6px; border-radius: var(--border-radius-sm); color: #06b6d4; font-weight: 700;">🌍 Global / Online</span>';
                      if (opp.country && opp.country.toLowerCase() === userCountry.toLowerCase()) return '<span style="font-size: 10px; background-color: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); padding: 1px 6px; border-radius: var(--border-radius-sm); color: #10b981; font-weight: 700;">📍 Local Match</span>';
                      if (opp.country) return `<span style="font-size: 10px; background-color: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); padding: 1px 6px; border-radius: var(--border-radius-sm); color: #f59e0b; font-weight: 700;">📍 ${opp.region || opp.country}</span>`;
                      return '';
                    })()}
                  </div>

                  <div style="display: flex; gap: 8px; align-items: center;">
                    <span style="font-size: 11px; font-weight: 700; background-color: ${matchVal >= 50 ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-tertiary)'}; color: ${matchVal >= 50 ? '#10b981' : 'var(--text-muted)'}; padding: 3px 8px; border-radius: var(--border-radius-xl);">
                      ${matchVal}% Profile Match
                    </span>
                    <span style="font-size: 12px; font-weight: 700; color: var(--accent);">📅 Deadline: ${opp.deadline}</span>
                  </div>
                </div>

                ${opp.recText ? `
                  <div class="course-rec-badge course-rec-badge-${opp.recType}">
                    ${opp.recText}
                  </div>
                ` : ''}
                <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">${opp.name}</h4>
                <p style="font-size: 13.5px; color: var(--text-secondary); line-height: 1.45; margin-bottom: 16px;">${opp.description}</p>

                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
                  ${(opp.matchingSkills || []).map(skill => `
                    <span style="font-size: 11.5px; background-color: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-muted); padding: 2px 8px; border-radius: var(--border-radius-sm);">${skill}</span>
                  `).join('')}
                </div>

                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                  ${(() => {
                    const isActive = state.projects && state.projects.some(p => p.title === opp.name || p.oppId === opp.id);
                    return `
                      <button class="btn btn-primary btn-add-opp-workspace" data-id="${opp.id}" style="font-size: 12px; padding: 8px 16px; ${isActive ? 'opacity: 0.6; background: rgba(16,185,129,0.15); border-color: rgba(16,185,129,0.3); color: #10b981;' : ''}" ${isActive ? 'disabled' : ''}>
                        ${isActive ? '✓ In Active Tracker' : '⚡ Add to Active Tracker'}
                      </button>
                      <button class="btn btn-secondary btn-add-opp-roadmap" data-id="${opp.id}" style="font-size: 12px; padding: 8px 16px; border-radius: 8px;">
                        🗺️ Add to Roadmap
                      </button>
                    `;
                  })()}
                  <a href="${opp.website}" target="_blank" class="btn btn-secondary" style="font-size: 12px; padding: 8px 16px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                    🔗 Website
                  </a>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="glass-card" style="text-align: center; padding: 40px; border: 1px dashed var(--border-color);">
              <p style="color: var(--text-secondary); font-size: 14px;">No matching opportunities found. Try adjusting your filters or search query!</p>
            </div>
          `}
        </div>
      </div>
    `;
  },

  async scourInternetForOpps() {
    this.isScouring = true;
    this.render(); // Show loading state

    const user = LeveledApp.state.user;
    
    const prompt = `You are an expert career and university admissions counselor scouring the internet. 
    Find 20 highly relevant real-world internships, olympiads, or research opportunities for a student with the following profile:
    Location: ${user.country}
    Grade: ${user.grade}
    Interests: ${user.interests.join(', ')}
    Skills: ${user.skills.join(', ')}

    Return ONLY a raw JSON array of objects. Do not include markdown formatting like \`\`\`json.
    Each object must exactly match this format:
    {
      "id": "live-opp-timestamp",
      "name": "Opportunity Name",
      "category": "internship" | "olympiad" | "research" | "competition" | "scholarship",
      "difficulty": "Medium" | "Hard",
      "deadline": "YYYY-MM-DD",
      "description": "2 sentence description.",
      "website": "https://url-to-apply",
      "matchingSkills": ["Skill 1", "Skill 2", "Skill 3"],
      "country": "${user.country}",
      "isGlobal": false
    }`;

    try {
      const response = await fetch('/api/scour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      let textResponse = data.choices[0].message.content.trim();
      
      // Clean up markdown block if present
      if (textResponse.startsWith('```json')) textResponse = textResponse.slice(7);
      if (textResponse.startsWith('```')) textResponse = textResponse.slice(3);
      if (textResponse.endsWith('```')) textResponse = textResponse.slice(0, -3);

      const fetchedOpps = JSON.parse(textResponse);
      
      // Inject unique IDs
      fetchedOpps.forEach((opp, i) => opp.id = `live-opp-${Date.now()}-${i}`);
      
      this.liveOpps = fetchedOpps;
    } catch (e) {
      console.error('Failed to scour internet:', e);
      LeveledApp.showToast('⚠️ Failed to scour live internet. Showing local databases.');
    } finally {
      this.isScouring = false;
      this.render();
    }
  },

  renderActiveProjectsTab(state) {
    const projects = state.projects || [];

    if (this.selectedProjectId) {
      const selectedProj = state.projects.find(p => p.id === this.selectedProjectId);
      if (selectedProj && selectedProj.type === 'research') {
        return this.renderDocumentWorkspace(state);
      }
      return this.renderIncubatorWorkspace(state);
    }

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800;">Your Extracurricular Workspace</h3>
          <button class="btn btn-secondary" onclick="Extracurriculars.activeTab = 'opportunities'; Extracurriculars.render();" style="font-size: 12px; padding: 6px 12px;">+ Discover Opportunities</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          ${projects.length > 0 ? projects.map(proj => {
            const completedSteps = proj.steps.filter(s => s.done).length;
            const totalSteps = proj.steps.length;
            const progressVal = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
            return `
              <div class="glass-card extracurricular-active-card" style="padding: 20px; border-top: 4px solid ${proj.status === 'completed' ? '#10b981' : 'var(--primary)'}; display: flex; flex-direction: column; justify-content: space-between; transition: all var(--transition-fast); text-align: left; position: relative;">
                <button class="btn-remove-project" data-id="${proj.id}" data-title="${proj.title}" data-progress="${progressVal}" style="position: absolute; top: 10px; right: 10px; background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2); color: #f43f5e; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.2s;" title="Remove from tracker">✕</button>
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; padding-right: 36px;">
                    <span style="font-weight: 800; color: var(--primary); text-transform: uppercase;">${proj.type || 'passion'} Project</span>
                    <span style="font-weight: 700; color: ${proj.status === 'completed' ? '#10b981' : 'var(--text-muted)'};">${proj.status.toUpperCase()}</span>
                  </div>
                  <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; padding-right: 36px;">${proj.title}</h4>
                  <p style="color: var(--text-secondary); font-size: 12.5px; line-height: 1.45; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; min-height: 54px; margin-bottom: 12px;">${proj.description}</p>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 12px;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--text-muted);">
                    <span>Milestones Completed</span> <span>${completedSteps}/${totalSteps} (${progressVal}%)</span>
                  </div>
                  <div style="width: 100%; height: 6px; background-color: var(--bg-tertiary); border-radius: 3px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${progressVal}%; height: 100%; background: ${proj.status === 'completed' ? '#10b981' : 'linear-gradient(90deg, var(--primary), var(--secondary))'}; border-radius: 3px;"></div>
                  </div>

                  <!-- Card action buttons -->
                  <div style="display: flex; gap: 10px; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px;">
                    <button class="btn btn-primary btn-open-project-workspace" data-id="${proj.id}" style="flex: 1.2; font-size: 11.5px; padding: 6px; text-align: center;">⚡ Workspace</button>
                    <button class="btn btn-secondary btn-log-evidence-modal" data-id="${proj.id}" style="flex: 1; font-size: 11.5px; padding: 6px; background-color: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.2); color: var(--secondary); display: flex; align-items: center; justify-content: center; gap: 4px;">📎 Evidence</button>
                  </div>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 40px 0; width: 100%;">
              <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">You don't have any active extracurriculars yet.</p>
              <button class="btn btn-primary" onclick="window.LeveledApp.state.user ? (Extracurriculars.activeTab = 'opportunities', Extracurriculars.render()) : (document.getElementById('btn-landing-signup').click())" style="font-size: 12px; padding: 8px 16px;">Browse Extracurricular Opportunities</button>
            </div>
          `}
        </div>
      </div>
    `;
  },

  renderIncubatorWorkspace(state) {
    const proj = state.projects.find(p => p.id === this.selectedProjectId);
    if (!proj) return '';

    const completedSteps = proj.steps.filter(s => s.done).length;
    const progressVal = proj.steps.length > 0 ? Math.round((completedSteps / proj.steps.length) * 100) : 0;
    const allStepsFinished = proj.steps.every(s => s.done);

    if (this.activeStepIndex === null && !allStepsFinished) {
      const firstIncomplete = proj.steps.findIndex(s => !s.done);
      this.activeStepIndex = firstIncomplete !== -1 ? firstIncomplete : 0;
    }

    return `
      <div style="animation: view-enter 0.4s ease; display: flex; flex-direction: column; gap: 24px;">
        <!-- Workspace Header -->
        <div class="glass-card" style="padding: 24px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
            <button class="btn btn-secondary" id="btn-back-to-active-list" style="font-size: 12px; padding: 6px 12px;">&larr; Back to Active Tracker</button>
            <span style="font-size: 11px; font-weight: 800; background-color: var(--primary-glow); color: var(--primary); padding: 3px 8px; border-radius: var(--border-radius-sm); text-transform: uppercase;">
              ${proj.type} Track
            </span>
          </div>

          <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">${proj.title}</h3>
          <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.45;">${proj.description}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px;" class="readiness-split">
          <!-- Left side: checklist -->
          <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
            <div>
              <span style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Sprint Checklist</span>
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-top: 4px; margin-bottom: 8px;">
                <span>Completed Tasks</span>
                <span>${completedSteps}/${proj.steps.length} (${progressVal}%)</span>
              </div>
              <div style="width: 100%; height: 6px; background-color: var(--bg-tertiary); border-radius: 3px; overflow: hidden; border: 1px solid var(--border-color);">
                <div style="width: ${progressVal}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 3px;"></div>
              </div>
            </div>

            <!-- Steps List -->
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
              ${proj.steps.map((step, idx) => {
                const isActive = idx === this.activeStepIndex;
                return `
                  <div class="step-node ${isActive ? 'active' : ''}" data-step-idx="${idx}" style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; border-radius: var(--border-radius-md); border: 1px solid ${isActive ? 'var(--primary)' : 'var(--border-color)'}; background-color: ${isActive ? 'var(--primary-glow)' : 'transparent'}; cursor: pointer; transition: all var(--transition-fast);">
                    <div style="font-size: 16px; margin-top: 2px;">
                      ${step.done ? '✅' : '⏳'}
                    </div>
                    <div style="flex: 1;">
                      <div style="font-size: 13.5px; font-weight: 700; color: ${step.done ? 'var(--text-secondary)' : 'var(--text-primary)'}; ${step.done ? 'text-decoration: line-through;' : ''}">
                        Sprint ${idx + 1}: ${step.text}
                      </div>
                      ${step.evidence ? `
                        <div style="font-size: 11.5px; color: var(--secondary); margin-top: 4px; font-style: italic;">
                          Evidence: "${step.evidence}"
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Right side: AI Co-pilot Chat Workspace -->
          <div class="glass-card" style="padding: 24px; display: flex; flex-direction: column; height: 500px; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
              <span style="font-size: 18px;">🤖</span>
              <div style="text-align: left;">
                <h4 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700;">AI Mentor Co-pilot</h4>
                <p style="font-size: 11px; color: var(--text-muted);">Assisting with: ${proj.title}</p>
              </div>
            </div>

            <!-- Chat History -->
            <div id="project-chat-log" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 8px; margin-bottom: 16px; font-size: 13px;">
              ${(proj.chatLog || []).map(msg => `
                <div style="display: flex; justify-content: ${msg.sender === 'user' ? 'flex-end' : 'flex-start'};">
                  <div style="max-width: 85%; padding: 10px 14px; border-radius: var(--border-radius-md); background-color: ${msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-tertiary)'}; border: 1px solid ${msg.sender === 'user' ? 'var(--primary)' : 'var(--border-color)'}; color: var(--text-primary); line-height: 1.45; text-align: left;">
                    ${msg.text}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Action Area -->
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Current Step Context and Evidence Form -->
              ${this.activeStepIndex !== null && !allStepsFinished ? `
                <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: left;">
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Active Sprint: S${this.activeStepIndex + 1}</h5>
                  <p style="font-size: 13px; color: var(--text-primary); margin-bottom: 8px;">${proj.steps[this.activeStepIndex].text}</p>
                  
                  <form id="evidence-log-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 8px;">
                    <textarea id="step-evidence" class="form-control" placeholder="Describe your completion evidence (what did you accomplish?)" style="min-height: 54px; font-size: 13px;" required></textarea>
                    <button type="submit" class="btn btn-primary" style="font-size: 13px; padding: 8px;">🤖 Log Step Evidence</button>
                  </form>
                </div>
              ` : ''}

              <!-- Finalize Form -->
              ${allStepsFinished && proj.status !== 'completed' ? `
                <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: left;">
                  <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">🎉 All Sprints Complete!</h5>
                  <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">Provide your key learnings & outcomes to document this project in your Portfolio.</p>
                  <form id="finalize-project-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 8px;">
                    <textarea id="final-learnings" class="form-control" placeholder="E.g., I learned how to gather survey statistics, analyze data using Python, and present findings to school board..." style="min-height: 54px; font-size: 13px;" required></textarea>
                    <button type="submit" class="btn btn-primary" style="background: #10b981; font-size: 13px; padding: 8px;">🎉 Finalize &amp; Showcase in Portfolio</button>
                  </form>
                </div>
              ` : ''}

              <!-- View Portfolio capstone -->
              ${proj.status === 'completed' ? `
                <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px; text-align: center;">
                  <p style="font-size: 13px; color: #10b981; margin-bottom: 8px; font-weight: 600;">✓ Project Completed and Published!</p>
                  <a href="#portfolio" class="btn btn-primary" style="width: 100%; text-decoration: none; font-size: 13px; padding: 8px; background: #10b981; text-align: center; display: block; border-radius: var(--border-radius-md);">💼 View Live Personal Portfolio Website</a>
                </div>
              ` : ''}

              <!-- Chat Input Box -->
              <form id="project-chat-form" onsubmit="event.preventDefault();" style="display: flex; gap: 8px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
                <input type="text" id="project-chat-input" class="form-control" placeholder="💬 Ask AI Mentor a question..." style="font-size: 12.5px; height: 32px; flex: 1;" required>
                <button type="submit" class="btn btn-secondary" style="font-size: 12px; padding: 0 12px; height: 32px; flex-shrink: 0; background: var(--bg-tertiary); border: 1px solid var(--border-color);">Ask AI</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderDocumentWorkspace(state) {
    const proj = state.projects.find(p => p.id === this.selectedProjectId);
    if (!proj) return '';

    // Ensure pages array exists — each page stores its own HTML
    if (!proj.pages || !Array.isArray(proj.pages)) {
      proj.pages = [''];
      proj.documentHTML = '';
    }

    const pagesHTML = proj.pages.map((pageContent, i) => `
      <div class="doc-page" data-page="${i}" style="
        width: 100%; max-width: 816px; height: 1056px;
        background: var(--bg-primary); border: 1px solid var(--border-color);
        border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        position: relative; overflow: hidden; flex-shrink: 0;
      ">
        <div class="doc-page-canvas" contenteditable="true" spellcheck="true" data-page-index="${i}" style="
          padding: 72px; outline: none; height: 100%; overflow: hidden;
          font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6;
          color: var(--text-primary); cursor: text;
        ">${pageContent}</div>
        <div style="position: absolute; bottom: 8px; right: 14px; font-size: 9px; color: var(--text-muted); opacity: 0.5; pointer-events: none;">Page ${i + 1}</div>
      </div>
    `).join('');

    return `
      <div style="animation: view-enter 0.4s ease; display: flex; flex-direction: column; gap: 0; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary" id="btn-doc-back" style="font-size: 12px; padding: 5px 10px;">&larr;</button>
            <div>
              <div style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--text-primary);">${proj.title}</div>
              <div style="font-size: 10px; color: var(--text-muted);">📄 Auto-saved</div>
            </div>
          </div>
          <button class="btn btn-primary" id="btn-doc-publish" style="font-size: 11px; padding: 5px 14px; background: linear-gradient(135deg, var(--primary), var(--secondary));">📤 Publish to Portfolio</button>
        </div>

        <!-- Google Docs-style Toolbar -->
        <div id="doc-toolbar" style="display: flex; align-items: center; gap: 4px; padding: 6px 12px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-top: none; flex-wrap: wrap;">
          <button class="doc-tb" data-cmd="undo" title="Undo">↩</button>
          <button class="doc-tb" data-cmd="redo" title="Redo">↪</button>
          <div class="doc-tb-sep"></div>

          <select id="doc-font-family" class="doc-select" title="Font" style="width: 120px;">
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
            <option value="Garamond, serif">Garamond</option>
          </select>

          <button class="doc-tb" id="btn-font-size-down" title="Decrease size" style="font-size: 10px; padding: 0 4px;">−</button>
          <input type="number" id="doc-font-size" class="doc-select" value="11" min="6" max="96" title="Font size" style="width: 42px; text-align: center;">
          <button class="doc-tb" id="btn-font-size-up" title="Increase size" style="font-size: 10px; padding: 0 4px;">+</button>
          <div class="doc-tb-sep"></div>

          <button class="doc-tb" data-cmd="bold" title="Bold" style="font-weight: 800;">B</button>
          <button class="doc-tb" data-cmd="italic" title="Italic" style="font-style: italic;">I</button>
          <button class="doc-tb" data-cmd="underline" title="Underline" style="text-decoration: underline;">U</button>
          <div class="doc-tb-sep"></div>

          <div style="position: relative; display: flex; align-items: center;">
            <button class="doc-tb" id="btn-text-color-label" title="Text color" style="font-weight: 800; border-bottom: 3px solid #e74c3c;">A</button>
            <input type="color" id="doc-text-color" value="#e74c3c" style="position: absolute; opacity: 0; width: 30px; height: 28px; cursor: pointer;">
          </div>
          <div style="position: relative; display: flex; align-items: center;">
            <button class="doc-tb" id="btn-highlight-label" title="Highlight" style="background: #fdff32; color: #222; border-radius: 3px; font-size: 10px;">ab</button>
            <input type="color" id="doc-highlight-color" value="#fdff32" style="position: absolute; opacity: 0; width: 30px; height: 28px; cursor: pointer;">
          </div>
          <div class="doc-tb-sep"></div>

          <select id="doc-block-type" class="doc-select" title="Style" style="width: 105px;">
            <option value="P">Normal text</option>
            <option value="H1">Heading 1</option>
            <option value="H2">Heading 2</option>
            <option value="H3">Heading 3</option>
          </select>
          <div class="doc-tb-sep"></div>

          <button class="doc-tb" data-cmd="insertUnorderedList" title="Bullets">•≡</button>
          <button class="doc-tb" data-cmd="insertOrderedList" title="Numbers">1.</button>
          <button class="doc-tb" data-cmd="justifyLeft" title="Left">☰</button>
          <button class="doc-tb" data-cmd="justifyCenter" title="Center">≡</button>
          <div class="doc-tb-sep"></div>

          <button class="doc-tb" id="btn-doc-insert-link" title="Link">🔗</button>
          <button class="doc-tb" id="btn-doc-insert-image" title="Image">🖼️</button>
          <button class="doc-tb" data-cmd="insertHorizontalRule" title="Line">─</button>

          <div style="flex: 1;"></div>
          <span id="doc-page-count" style="font-size: 10px; color: var(--text-muted); font-weight: 600; margin-right: 8px;">Page 1 of ${proj.pages.length}</span>
          <span id="doc-word-count" style="font-size: 10px; color: var(--text-muted); font-weight: 600;">0 words</span>
        </div>

        <!-- Pages -->
        <div id="doc-pages-container" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-top: none; border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg); padding: 32px; display: flex; flex-direction: column; align-items: center; gap: 24px; min-height: 700px;">
          ${pagesHTML}
        </div>

        <!-- Floating AI Button -->
        <button id="btn-ai-mentor-toggle" style="position: fixed; bottom: 24px; right: 24px; z-index: 100; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(99,102,241,0.4); font-size: 24px; transition: all 0.3s ease;" title="AI Research Mentor">🤖</button>

        <!-- Floating AI Panel -->
        <div id="doc-ai-panel" style="position: fixed; bottom: 90px; right: 24px; z-index: 99; width: 380px; max-height: 520px; border-radius: var(--border-radius-lg); background: var(--bg-secondary); border: 1px solid var(--border-color); box-shadow: 0 8px 40px rgba(0,0,0,0.3); display: none; flex-direction: column; overflow: hidden;">
          <div style="padding: 14px 16px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 800; margin: 0;">🤖 AI Mentor</h4>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary" id="btn-doc-critique" style="font-size: 10px; padding: 4px 10px;">Critique</button>
              <button id="btn-ai-panel-close" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 16px;">✕</button>
            </div>
          </div>
          <div id="doc-critique-results" style="flex: 1; overflow-y: auto; padding: 14px; max-height: 360px;">
            <div style="text-align: center; padding: 24px 12px; color: var(--text-muted);"><p style="font-size: 12px;">Click <strong>Critique</strong> for feedback, or ask below.</p></div>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding: 10px 12px;">
            <form id="doc-chat-form" style="display: flex; gap: 6px;">
              <input type="text" id="doc-chat-input" class="form-control" placeholder="Ask about methodology, sources..." style="font-size: 12px; height: 32px; flex: 1;" required>
              <button type="submit" class="btn btn-secondary" style="font-size: 11px; padding: 0 10px; height: 32px;">Ask</button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  bindDocumentWorkspaceEvents(state) {
    const proj = state.projects.find(p => p.id === this.selectedProjectId);
    if (!proj) return;

    const self = this;
    const allCanvases = () => document.querySelectorAll('.doc-page-canvas');
    const getActiveCanvas = () => document.querySelector('.doc-page-canvas:focus') || document.querySelector('.doc-page-canvas');

    // Helper: save all pages
    const saveAllPages = () => {
      const canvases = allCanvases();
      proj.pages = Array.from(canvases).map(c => c.innerHTML);
      LeveledApp.saveState();
    };

    // Helper: update word count
    const updateWordCount = () => {
      const canvases = allCanvases();
      let totalWords = 0;
      canvases.forEach(c => {
        const text = c.innerText.trim();
        if (text) totalWords += text.split(/\s+/).length;
      });
      const wcEl = document.getElementById('doc-word-count');
      if (wcEl) wcEl.textContent = totalWords + ' words';
      const pcEl = document.getElementById('doc-page-count');
      if (pcEl) pcEl.textContent = `Page 1 of ${canvases.length}`;
    };

    // Helper: add a new blank page
    const addNewPage = () => {
      proj.pages.push('');
      const container = document.getElementById('doc-pages-container');
      if (!container) return;
      const idx = proj.pages.length - 1;
      const pageDiv = document.createElement('div');
      pageDiv.className = 'doc-page';
      pageDiv.dataset.page = idx;
      pageDiv.style.cssText = 'width:100%;max-width:816px;height:1056px;background:var(--bg-primary);border:1px solid var(--border-color);border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,0.15);position:relative;overflow:hidden;flex-shrink:0;';
      pageDiv.innerHTML = `
        <div class="doc-page-canvas" contenteditable="true" spellcheck="true" data-page-index="${idx}" style="padding:72px;outline:none;height:100%;overflow:hidden;font-family:Arial,sans-serif;font-size:11pt;line-height:1.6;color:var(--text-primary);cursor:text;"></div>
        <div style="position:absolute;bottom:8px;right:14px;font-size:9px;color:var(--text-muted);opacity:0.5;pointer-events:none;">Page ${idx + 1}</div>
      `;
      container.appendChild(pageDiv);
      // Bind overflow check on new canvas
      const newCanvas = pageDiv.querySelector('.doc-page-canvas');
      bindPageOverflowCheck(newCanvas);
      // Focus the new page
      newCanvas.focus();
      newCanvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
      updateWordCount();
    };

    // Overflow check: when a page's content exceeds its height, create next page
    const bindPageOverflowCheck = (canvas) => {
      canvas.addEventListener('input', () => {
        // Debounce save
        clearTimeout(self._docSaveTimer);
        self._docSaveTimer = setTimeout(saveAllPages, 1500);
        updateWordCount();
      });

      // Check if content overflows the page
      const checkOverflow = () => {
        if (canvas.scrollHeight > canvas.clientHeight + 20) {
          const pageIdx = parseInt(canvas.dataset.pageIndex);
          const nextPageIdx = pageIdx + 1;
          if (nextPageIdx >= proj.pages.length) {
            addNewPage();
          }
        }
      };
      canvas.addEventListener('input', () => {
        setTimeout(checkOverflow, 50);
      });

      // Auto-delete empty pages (never delete the first page)
      const cleanupEmptyPage = () => {
        const pageIdx = parseInt(canvas.dataset.pageIndex);
        if (pageIdx === 0) return; // Never delete page 1
        const text = canvas.innerText.trim();
        if (text.length === 0 && proj.pages.length > 1) {
          // Remove this page from data
          proj.pages.splice(pageIdx, 1);
          // Remove the DOM element
          const pageEl = canvas.closest('.doc-page');
          if (pageEl) pageEl.remove();
          // Re-index remaining pages
          document.querySelectorAll('.doc-page').forEach((p, i) => {
            p.dataset.page = i;
            const c = p.querySelector('.doc-page-canvas');
            if (c) c.dataset.pageIndex = i;
            const label = p.querySelector('div[style*="position:absolute"]');
            if (label) label.textContent = 'Page ' + (i + 1);
          });
          // Focus the previous page
          const prevCanvas = document.querySelector(`.doc-page-canvas[data-page-index="${pageIdx - 1}"]`);
          if (prevCanvas) prevCanvas.focus();
          updateWordCount();
          saveAllPages();
        }
      };
      canvas.addEventListener('blur', () => {
        setTimeout(cleanupEmptyPage, 300);
      });
    };

    // Bind overflow check on all existing canvases
    allCanvases().forEach(c => bindPageOverflowCheck(c));

    // Back button
    const backBtn = document.getElementById('btn-doc-back');
    if (backBtn) {
      backBtn.onclick = () => {
        saveAllPages();
        this.selectedProjectId = null;
        this.render();
      };
    }

    // Floating AI panel toggle
    const aiToggle = document.getElementById('btn-ai-mentor-toggle');
    const aiPanel = document.getElementById('doc-ai-panel');
    const aiPanelClose = document.getElementById('btn-ai-panel-close');
    if (aiToggle && aiPanel) {
      aiToggle.onclick = () => {
        const isVisible = aiPanel.style.display === 'flex';
        aiPanel.style.display = isVisible ? 'none' : 'flex';
      };
    }
    if (aiPanelClose && aiPanel) {
      aiPanelClose.onclick = () => { aiPanel.style.display = 'none'; };
    }

    // --- Google Docs Toolbar ---

    // Toolbar buttons (execCommand)
    document.querySelectorAll('.doc-tb[data-cmd]').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const cmd = btn.dataset.cmd;
        const val = btn.dataset.val || null;
        document.execCommand(cmd, false, val);
        getActiveCanvas()?.focus();
      };
    });

    // Font family selector
    const fontFamilySelect = document.getElementById('doc-font-family');
    if (fontFamilySelect) {
      fontFamilySelect.onchange = () => {
        document.execCommand('fontName', false, fontFamilySelect.value);
        getActiveCanvas()?.focus();
      };
    }

    // Font size controls
    const fontSizeInput = document.getElementById('doc-font-size');
    const applyFontSize = (size) => {
      size = Math.max(6, Math.min(96, size));
      if (fontSizeInput) fontSizeInput.value = size;
      // execCommand fontSize only supports 1-7, so use CSS instead
      const sel = window.getSelection();
      if (sel.rangeCount > 0 && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = size + 'pt';
        range.surroundContents(span);
      }
      getActiveCanvas()?.focus();
    };
    const btnSizeDown = document.getElementById('btn-font-size-down');
    const btnSizeUp = document.getElementById('btn-font-size-up');
    if (btnSizeDown) btnSizeDown.onclick = () => applyFontSize(parseInt(fontSizeInput?.value || 11) - 1);
    if (btnSizeUp) btnSizeUp.onclick = () => applyFontSize(parseInt(fontSizeInput?.value || 11) + 1);
    if (fontSizeInput) fontSizeInput.onchange = () => applyFontSize(parseInt(fontSizeInput.value));

    // Text color
    const textColorInput = document.getElementById('doc-text-color');
    const textColorLabel = document.getElementById('btn-text-color-label');
    if (textColorInput) {
      textColorInput.oninput = () => {
        document.execCommand('foreColor', false, textColorInput.value);
        if (textColorLabel) textColorLabel.style.borderBottomColor = textColorInput.value;
        getActiveCanvas()?.focus();
      };
    }

    // Highlight color
    const highlightInput = document.getElementById('doc-highlight-color');
    const highlightLabel = document.getElementById('btn-highlight-label');
    if (highlightInput) {
      highlightInput.oninput = () => {
        document.execCommand('hiliteColor', false, highlightInput.value);
        if (highlightLabel) highlightLabel.style.background = highlightInput.value;
        getActiveCanvas()?.focus();
      };
    }

    // Block type dropdown (heading/normal)
    const blockType = document.getElementById('doc-block-type');
    if (blockType) {
      blockType.onchange = () => {
        document.execCommand('formatBlock', false, blockType.value);
        getActiveCanvas()?.focus();
      };
    }

    // Insert link
    const linkBtn = document.getElementById('btn-doc-insert-link');
    if (linkBtn) {
      linkBtn.onclick = () => {
        const url = prompt('Enter URL:');
        if (url) document.execCommand('createLink', false, url);
        getActiveCanvas()?.focus();
      };
    }

    // Insert image
    const imgBtn = document.getElementById('btn-doc-insert-image');
    if (imgBtn) {
      imgBtn.onclick = () => {
        const url = prompt('Enter image URL:');
        if (url) {
          document.execCommand('insertImage', false, url);
          setTimeout(() => {
            allCanvases().forEach(c => {
              c.querySelectorAll('img').forEach(img => {
                img.style.maxWidth = '100%';
                img.style.borderRadius = '8px';
                img.style.margin = '12px 0';
              });
            });
          }, 100);
          getActiveCanvas()?.focus();
        }
      };
    }

    // --- Publish to Portfolio ---
    const publishBtn = document.getElementById('btn-doc-publish');
    if (publishBtn) {
      publishBtn.onclick = () => {
        saveAllPages();
        proj.status = 'completed';
        if (proj.milestoneId && !state.completedMilestones.includes(proj.milestoneId)) {
          state.completedMilestones.push(proj.milestoneId);
        }
        if (!state.portfolioAchievements) state.portfolioAchievements = [];
        state.portfolioAchievements.push({
          id: 'portfolio-' + Date.now(),
          title: '📄 Research Paper: ' + proj.title,
          category: 'Research Paper',
          date: new Date().toISOString().split('T')[0],
          detail: 'Published research paper from the Leveled Document Workspace.',
          media: []
        });
        LeveledApp.addXP(300, 'Published research paper: ' + proj.title);
        LeveledApp.saveState();
        LeveledApp.showToast('📤 Published to portfolio! +300 XP');
        setTimeout(() => { window.location.hash = '#portfolio'; }, 1000);
      };
    }

    // --- AI Critique ---
    const critiqueBtn = document.getElementById('btn-doc-critique');
    if (critiqueBtn) {
      critiqueBtn.onclick = () => {
        // Gather text from all pages
        let allText = '';
        allCanvases().forEach(c => { allText += c.innerText + '\n'; });
        if (allText.trim().length < 30) {
          LeveledApp.showToast('✏️ Write at least a paragraph before requesting critique.');
          return;
        }
        const resultsArea = document.getElementById('doc-critique-results');
        if (!resultsArea) return;
        resultsArea.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);"><div class="spinner"></div><p style="font-size:12px;margin-top:8px;">Analyzing...</p></div>';

        setTimeout(() => {
          const critique = AISimulator.critiqueEssay(allText, { type: 'research paper' });
          const scoreColor = (s) => s >= 8 ? '#10b981' : s >= 6 ? '#f59e0b' : '#ef4444';
          resultsArea.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="text-align:center;padding:10px;background:var(--bg-tertiary);border-radius:var(--border-radius-md);border:1px solid var(--border-color);">
                <div style="font-size:24px;font-weight:900;color:var(--primary-light);">${critique.scores.overall}%</div>
                <div style="font-size:9px;color:var(--text-muted);text-transform:uppercase;font-weight:700;">Overall</div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                ${['structure','story','grammar','impact'].map(k => `
                  <div style="padding:8px;background:var(--bg-tertiary);border-radius:var(--border-radius-md);border:1px solid var(--border-color);text-align:center;">
                    <div style="font-size:16px;font-weight:800;color:${scoreColor(critique.scores[k])};">${critique.scores[k]}/10</div>
                    <div style="font-size:8px;color:var(--text-muted);text-transform:uppercase;font-weight:700;">${k}</div>
                  </div>
                `).join('')}
              </div>
              <div><h5 style="font-size:11px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">💡 Suggestions</h5>
                <ul style="padding-left:14px;display:flex;flex-direction:column;gap:4px;">
                  ${critique.suggestions.map(s => `<li style="font-size:11px;color:var(--text-secondary);line-height:1.3;">${s}</li>`).join('')}
                </ul>
              </div>
              <div><h5 style="font-size:11px;font-weight:800;color:var(--text-primary);margin-bottom:6px;">✅ Strengths</h5>
                <ul style="padding-left:14px;display:flex;flex-direction:column;gap:4px;">
                  ${critique.strengths.map(s => `<li style="font-size:11px;color:#10b981;line-height:1.3;">${s}</li>`).join('')}
                </ul>
              </div>
            </div>
          `;
        }, 800);
      };
    }

    // Chat form
    const chatForm = document.getElementById('doc-chat-form');
    if (chatForm) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('doc-chat-input');
        if (!input?.value.trim()) return;
        const resultsArea = document.getElementById('doc-critique-results');
        if (!resultsArea) return;
        const question = input.value.trim();
        const response = AISimulator.getTopicAdvice(question, state.user?.interests);
        const chatBubble = document.createElement('div');
        chatBubble.style.cssText = 'margin-top:8px;';
        chatBubble.innerHTML = `
          <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:var(--border-radius-md);padding:8px;margin-bottom:6px;">
            <div style="font-size:9px;font-weight:700;color:var(--primary-light);margin-bottom:3px;">You</div>
            <div style="font-size:11px;color:var(--text-primary);">${question}</div>
          </div>
          <div style="background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:var(--border-radius-md);padding:8px;">
            <div style="font-size:9px;font-weight:700;color:var(--secondary);margin-bottom:3px;">🤖 AI Mentor</div>
            <div style="font-size:11px;color:var(--text-secondary);line-height:1.4;">${response}</div>
          </div>
        `;
        resultsArea.appendChild(chatBubble);
        resultsArea.scrollTop = resultsArea.scrollHeight;
        input.value = '';
      };
    }

    // Initial counts
    updateWordCount();
  },
  getStepGuidance(stepText) {
    if (!stepText) return 'Work on this step to make progress on your project.';
    const text = (typeof stepText === 'string' ? stepText : String(stepText)).toLowerCase();
    
    if (text.includes('github') || text.includes('repo') || text.includes('setup') || text.includes('repository')) {
      return `Make sure your GitHub repository is public and contains a well-structured **README.md**. Include a brief overview of the project, a "Tech Stack" section, and instructions on how to install and run the code. This provides robust proof of your coding discipline.`;
    }
    if (text.includes('survey') || text.includes('interview') || text.includes('peers') || text.includes('users')) {
      return `Design a clear Google Form or Typeform. Limit questions to 8-10 to increase response rates. Focus questions on testing your core hypotheses. Aim for at least 15-20 responses from your target demographic to show meaningful statistics.`;
    }
    if (text.includes('research') || text.includes('papers') || text.includes('citations') || text.includes('scholar')) {
      return `Navigate to Google Scholar. Look for papers published in the last 5 years to ensure recent context. Save relevant papers in a citation manager like Zotero. Aim to gather at least 10 high-quality references to form your background framework.`;
    }
    if (text.includes('abstract') || text.includes('introduction') || text.includes('draft') || text.includes('writing')) {
      return `Write a clear abstract detailing: 1) context/problem, 2) your methodology, 3) key data results, and 4) final conclusions (1 sentence). Ensure a highly objective tone.`;
    }
    if (text.includes('pitch') || text.includes('proposal') || text.includes('advisor') || text.includes('principal')) {
      return `Prepare a clean 3-slide deck: 1) What is the problem? 2) What is your proposed solution chapter? 3) What are your timeline milestones and target resources? Be respectful of their time and end with a clear ask for signature approval.`;
    }
    if (text.includes('deploy') || text.includes('live') || text.includes('launch') || text.includes('testing')) {
      return `Use free serverless web hosting platforms like **Vercel**, **Netlify**, or **GitHub Pages** for the frontend. Make sure to test your layout responsiveness across mobile and desktop. Share the live URL with 5 peers to gather initial feedback logs.`;
    }
    
    // Default motivating advice
    return `For this sprint step, concentrate on collecting primary notes and writing down your parameters. Document what resources you need, schedule a 2-hour focused study slot in your Leveled Calendar, and outline your target deliverables.`;
  },

  bindEvents() {
    const state = LeveledApp.state;

    // Bind document workspace events if active
    if (this.selectedProjectId) {
      const selectedProj = state.projects?.find(p => p.id === this.selectedProjectId);
      if (selectedProj && selectedProj.type === 'research') {
        this.bindDocumentWorkspaceEvents(state);
        return; // Document workspace has its own event system
      }
    }

    // Tab switcher click
    const tabs = document.querySelectorAll('#project-incubator-tabs .tag-chip');
    tabs.forEach(tab => {
      tab.onclick = () => {
        this.activeTab = tab.getAttribute('data-tab');
        this.selectedProjectId = null; // Clear workspace selected
        this.activeStepIndex = null;
        this.render();
      };
    });

    // Add suggestions project to portfolio (sends to Active tab)
    const addBtns = document.querySelectorAll('.btn-add-project');
    addBtns.forEach(btn => {
      btn.onclick = () => {
        const type = btn.getAttribute('data-type');
        const index = parseInt(btn.getAttribute('data-index'));
        
        let idea = null;
        if (type === 'passion') idea = this.passionIdeas[index];
        else if (type === 'research') idea = this.researchIdeas[index];
        else if (type === 'custom') idea = {
          title: `Custom Project: ${this.critiqueText.split(' ').slice(0, 4).join(' ')}...`,
          overview: this.critiqueText,
          steps: this.activeCritique.nextSteps
        };

        if (idea) {
          const alreadyExists = state.projects.some(p => p.title === idea.title);
          if (alreadyExists) {
            alert('This activity is already active in your tracker!');
            return;
          }

          // Parse steps array into step objects
          const rawSteps = idea.steps || [
            'Conduct literature search and collect primary materials.',
            'Outline project architecture or research hypothesis.',
            'Execute coding implementation, lab experiment, or writing.',
            'Compile feedback and finalize project outcomes.'
          ];
          const stepsObj = rawSteps.map(stepText => ({
            text: stepText,
            done: false,
            evidence: '',
            dateLogged: ''
          }));

          state.projects.push({
            id: `proj-${Date.now()}`,
            title: idea.title,
            description: idea.abstract || idea.overview,
            type: type,
            status: 'in_progress',
            steps: stepsObj,
            learnings: '',
            evidenceList: [], 
            chatLog: [],      
            dateAdded: new Date().toISOString().split('T')[0]
          });

          LeveledApp.addXP(150, `Started active Extracurricular: "${idea.title}"`);
          LeveledApp.showToast('🚀 Added to active Extracurricular Tracker!');
          this.activeTab = 'active';
          this.selectedProjectId = null;
          this.activeStepIndex = null;
          this.render();
        }
      };
    });

    const openWorkspaceBtns = document.querySelectorAll('.btn-open-project-workspace');
    openWorkspaceBtns.forEach(btn => {
      btn.onclick = () => {
        this.selectedProjectId = btn.getAttribute('data-id');
        this.activeStepIndex = null; 
        
        const proj = state.projects.find(p => p.id === this.selectedProjectId);
        if (proj) {
          proj.chatLog = proj.chatLog || [];
          if (proj.chatLog.length === 0) {
            const firstStep = proj.steps.find(s => !s.done);
            let idx = proj.steps.indexOf(firstStep);
            if (firstStep) {
              this.activeStepIndex = idx;
              const advice = this.getStepGuidance(firstStep.text);
              proj.chatLog.push({
                sender: 'ai',
                text: `<strong>Active Step S${idx + 1}: ${firstStep.text}</strong><br><br>${advice}<br><br>Please provide your completion evidence below so I can verify.`
              });
            } else {
              proj.chatLog.push({
                sender: 'ai',
                text: `🎉 <strong>All Sprints Complete!</strong><br><br>Fantastic job! We have completed all checklist sprints. To finalize the activity and publish it as a Capstone on your portfolio website, tell me: <strong>What are your key learnings and project outcomes?</strong>`
              });
            }
          }
        }
        this.render();
      };
    });

    // Remove from Active Tracker
    const removeBtns = document.querySelectorAll('.btn-remove-project');
    removeBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const projId = btn.dataset.id;
        const title = btn.dataset.title;
        const progress = parseInt(btn.dataset.progress || '0');
        
        if (progress > 0 && progress < 100) {
          // Show warning modal
          LeveledApp.openModal(`
            <div style="text-align: center; padding: 20px 10px;">
              <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin-bottom: 8px;">Remove "${title}"?</h3>
              <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; margin-bottom: 24px;">This project is <strong style="color: var(--accent);">${progress}% complete</strong>. Removing it will delete all progress and evidence. This cannot be undone.</p>
              <div style="display: flex; gap: 12px; justify-content: center;">
                <button class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="padding: 10px 20px; font-size: 13px;">Cancel</button>
                <button class="btn btn-primary" id="btn-confirm-remove" style="padding: 10px 20px; font-size: 13px; background: linear-gradient(135deg, #f43f5e, #dc2626); border: none;">Remove Project</button>
              </div>
            </div>
          `);
          const confirmBtn = document.getElementById('btn-confirm-remove');
          if (confirmBtn) {
            confirmBtn.onclick = () => {
              const state = LeveledApp.state;
              state.projects = state.projects.filter(p => p.id !== projId);
              LeveledApp.saveState();
              LeveledApp.closeModal();
              LeveledApp.showToast('🗑️ "' + title + '" removed from Active Tracker.');
              Extracurriculars.render();
            };
          }
        } else {
          // No progress or fully complete - remove directly
          const state = LeveledApp.state;
          state.projects = state.projects.filter(p => p.id !== projId);
          LeveledApp.saveState();
          LeveledApp.showToast('🗑️ "' + title + '" removed from Active Tracker.');
          this.render();
        }
      };
    });

    const evidenceModalBtns = document.querySelectorAll('.btn-log-evidence-modal');
    evidenceModalBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation(); 
        const projId = btn.getAttribute('data-id');
        this.showAddEvidenceModal(projId);
      };
    });

    const backToListBtn = document.getElementById('btn-back-to-active-list');
    if (backToListBtn) {
      backToListBtn.onclick = () => {
        this.selectedProjectId = null;
        this.activeStepIndex = null;
        this.render();
      };
    }

    const stepNodes = document.querySelectorAll('.step-node');
    stepNodes.forEach(node => {
      node.onclick = () => {
        this.activeStepIndex = parseInt(node.getAttribute('data-step-idx'));
        this.render();
      };
    });

    const projectChatForm = document.getElementById('project-chat-form');
    if (projectChatForm) {
      projectChatForm.onsubmit = (e) => {
        e.preventDefault();
        const proj = state.projects.find(p => p.id === this.selectedProjectId);
        const inputField = document.getElementById('project-chat-input');
        if (proj && inputField) {
          const query = inputField.value.trim();
          if (!query) return;

          proj.chatLog = proj.chatLog || [];
          proj.chatLog.push({ sender: 'user', text: query });

          import('../data/ai_simulator.js').then(module => {
            const reply = module.AISimulator.simulateExtracurricularAdvice(proj.title, query);
            proj.chatLog.push({ sender: 'ai', text: reply });

            inputField.value = '';
            LeveledApp.saveState();
            this.render();

            setTimeout(() => {
              const chatLogDiv = document.getElementById('project-chat-log');
              if (chatLogDiv) chatLogDiv.scrollTop = chatLogDiv.scrollHeight;
            }, 50);
          });
        }
      };
    }

    const evidenceForm = document.getElementById('evidence-log-form');
    if (evidenceForm) {
      evidenceForm.onsubmit = () => {
        const proj = state.projects.find(p => p.id === this.selectedProjectId);
        if (proj && this.activeStepIndex !== null) {
          const step = proj.steps[this.activeStepIndex];
          const evidence = document.getElementById('step-evidence').value.trim();

          step.done = true;
          step.evidence = evidence;
          step.dateLogged = new Date().toISOString().split('T')[0];

          proj.chatLog = proj.chatLog || [];
          proj.chatLog.push({
            sender: 'user',
            text: `Here is my completion evidence for step <strong>"${step.text}"</strong>:<br><em>"${evidence}"</em>`
          });
          proj.chatLog.push({
            sender: 'ai',
            text: `✓ Verified! Excellent outcome. I've updated your Portfolio timeline with this achievement.`
          });

          state.portfolioAchievements = state.portfolioAchievements || [];
          state.portfolioAchievements.push({
            id: `ach-${Date.now()}`,
            title: `Sprint Done: ${step.text.split(' ').slice(0, 5).join(' ')}...`,
            category: 'Extracurricular Sprint',
            date: step.dateLogged,
            detail: `Activity: "${proj.title}". Completed sprint step with evidence: "${evidence}"`
          });

          LeveledApp.addXP(60, `Completed Sprint Step S${this.activeStepIndex + 1}!`);
          LeveledApp.showToast('✓ Step evidence logged in Portfolio!');
          
          const nextIncompleteIdx = proj.steps.findIndex((s, i) => !s.done && i > this.activeStepIndex);
          const anyIncompleteIdx = proj.steps.findIndex(s => !s.done);
          let nextStepIdx = null;
          if (nextIncompleteIdx !== -1) nextStepIdx = nextIncompleteIdx;
          else if (anyIncompleteIdx !== -1) nextStepIdx = anyIncompleteIdx;

          if (nextStepIdx !== null) {
            this.activeStepIndex = nextStepIdx;
            import('../data/ai_simulator.js').then(module => {
              const nextStep = proj.steps[nextStepIdx];
              const nextAdvice = this.getStepGuidance(nextStep.text);
              proj.chatLog.push({
                sender: 'ai',
                text: `<strong>Active Step S${nextStepIdx + 1}: ${nextStep.text}</strong><br><br>${nextAdvice}<br><br>Please provide your completion evidence below so I can verify.`
              });
              this.render();
            });
          } else {
            this.activeStepIndex = null; 
            proj.chatLog.push({
              sender: 'ai',
              text: `🎉 <strong>All Sprints Complete!</strong><br><br>Fantastic job! We have completed all checklist sprints. To finalize the activity and publish it as a Capstone on your portfolio website, tell me: <strong>What are your key learnings and project outcomes?</strong>`
            });
            this.render();
          }
          LeveledApp.saveState();
        }
      };
    }

    const finalizeForm = document.getElementById('finalize-project-form');
    if (finalizeForm) {
      finalizeForm.onsubmit = () => {
        const proj = state.projects.find(p => p.id === this.selectedProjectId);
        if (proj) {
          const learnings = document.getElementById('final-learnings').value.trim();

          proj.status = 'completed';
          if (proj.milestoneId && !state.completedMilestones.includes(proj.milestoneId)) {
            state.completedMilestones.push(proj.milestoneId);
          }
          proj.learnings = learnings;

          proj.chatLog = proj.chatLog || [];
          proj.chatLog.push({
            sender: 'user',
            text: `Key Learnings & Outcomes:<br><em>"${learnings}"</em>`
          });
          proj.chatLog.push({
            sender: 'ai',
            text: `✓ <strong>Extracurricular Activity Fully Documented & Published!</strong><br><br>Congratulations! This capstone project is now complete and showcased on your personal Portfolio homepage.`
          });

          state.portfolioAchievements = state.portfolioAchievements || [];
          state.portfolioAchievements.push({
            id: `ach-${Date.now()}`,
            title: `🏆 Capstone Documented: ${proj.title}`,
            category: 'Portfolio Capstone',
            date: new Date().toISOString().split('T')[0],
            detail: `Completed all sprints. Key Learnings & Outcomes: "${learnings}"`
          });

          LeveledApp.addXP(250, `Completed Capstone Activity: "${proj.title}"!`);
          LeveledApp.showToast('🎉 Activity fully showcased in Portfolio website!');
          
          this.render();
          LeveledApp.saveState();
        }
      };
    }

    // Add to Active Tracker buttons (passion projects & research papers)
    const addTrackerBtns = document.querySelectorAll('.btn-project-add-tracker');
    addTrackerBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const title = btn.getAttribute('data-title');
        const type = btn.getAttribute('data-type') || 'passion';
        const desc = btn.getAttribute('data-desc') || '';
        
        const state = LeveledApp.state;
        if (!state.projects) state.projects = [];
        
        // Check if already added
        if (state.projects.some(p => p.title === title)) {
          LeveledApp.showToast('Already in your Active Tracker!');
          return;
        }
        
        const newProject = {
          id: 'proj-' + Date.now(),
          title: title,
          type: type,
          category: type === 'research' ? 'Research' : 'Passion Project',
          status: 'active',
          description: desc,
          steps: (type === 'research' 
            ? ['Literature Review', 'Define Methodology', 'Collect Data', 'Analyze Results', 'Write Paper', 'Submit for Review']
            : ['Research & Plan', 'Setup & Begin', 'Build & Iterate', 'Test & Refine', 'Document & Share']
          ).map((s, i) => ({
            id: 'step-' + i,
            title: s,
            done: false
          })),
          evidence: [],
          createdAt: new Date().toISOString()
        };
        
        state.projects.push(newProject);
        LeveledApp.saveState();
        LeveledApp.showToast(`🚀 "${title}" added to Active Tracker! Complete steps to earn XP.`);
        
        // Update button
        btn.disabled = true;
        btn.innerHTML = '✓ In Active Tracker';
        btn.style.opacity = '0.6';
        btn.style.background = 'rgba(16,185,129,0.15)';
        btn.style.borderColor = 'rgba(16,185,129,0.3)';
        btn.style.color = '#10b981';
      };
    });

    const discussIncubatorBtn = document.querySelector('.btn-incubator-discuss');
    if (discussIncubatorBtn) {
      discussIncubatorBtn.onclick = () => {
        const panel = document.getElementById('ai-mentor-panel');
        if (panel && !panel.classList.contains('open')) {
          window.LeveledApp.toggleMentorPanel();
        }
        const chatInput = document.getElementById('ai-mentor-input-field');
        if (chatInput) {
          chatInput.value = `I pitched my concept: "${this.critiqueText}". It received an overall grade of ${this.activeCritique.scores.overall}. How can I improve the Scientific Rigor score?`;
          chatInput.focus();
        }
      };
    }
    const critiqueForm = document.getElementById('idea-critique-form');
    if (critiqueForm) {
      critiqueForm.onsubmit = () => {
        const text = document.getElementById('crit-text').value;
        this.critiqueText = text;
        this.activeCritique = AISimulator.critiqueIdea(text, 'project');
        
        this.render();
        
        const results = document.getElementById('critique-results-card');
        if (results) {
          results.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Anti-spam checks
        this._critiquedIdeas = this._critiquedIdeas || new Set();
        const normalizedText = text.trim().toLowerCase();
        if (text.trim().length >= 30 && !this._critiquedIdeas.has(normalizedText)) {
          this._critiquedIdeas.add(normalizedText);
          LeveledApp.addXP(60, 'Submitted concept for AI critique');
        }
      };
    }

    // Opportunities Tab: Search input
    const oppsSearch = document.getElementById('opps-tab-search');
    if (oppsSearch) {
      oppsSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const input = document.getElementById('opps-tab-search');
        if (input) {
          input.focus();
          // Put cursor at end of input text
          const val = input.value;
          input.value = '';
          input.value = val;
        }
      });
    }

    // Opportunities Tab: Category chips click
    const oppsChips = document.querySelectorAll('#opps-tab-category-chips .tag-chip');
    oppsChips.forEach(chip => {
      chip.onclick = () => {
        this.activeCategory = chip.getAttribute('data-cat');
        this.render();
      };
    });

    // Opportunities Tab: Add to Active Tracker
    const addOppProjBtns = document.querySelectorAll('.btn-add-opp-project');
    addOppProjBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const opp = OPPORTUNITIES.find(o => o.id === id);
        if (opp) {
          const alreadyExists = state.projects.some(p => p.oppId === id || p.title === opp.name);
          if (alreadyExists) {
            alert('This opportunity is already active in your tracker!');
            return;
          }
          LeveledApp.openOpportunityWorkspace(opp);
          this.activeTab = 'active';
          this.render();
        }
      };
    });

    // Opportunities Tab: Add to Roadmap
    const addOppRoadmapBtns = document.querySelectorAll('.btn-add-opp-roadmap');
    addOppRoadmapBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const opp = OPPORTUNITIES.find(o => o.id === id) || (this.liveOpps || []).find(o => o.id === id);
        if (opp) {
          state.customRoadmapMilestones = state.customRoadmapMilestones || [];
          const alreadyExists = state.customRoadmapMilestones.some(m => m.oppId === id);
          if (alreadyExists) {
            LeveledApp.showToast('✅ Already on your Roadmap!');
            setTimeout(() => { window.location.hash = '#roadmap'; }, 500);
            return;
          }

          state.customRoadmapMilestones.push({
            id: `mile-opp-${opp.id}`,
            oppId: opp.id,
            title: opp.name,
            category: opp.category.charAt(0).toUpperCase() + opp.category.slice(1),
            description: opp.description,
            difficulty: opp.difficulty,
            timeCommitment: '4-6 hours/week',
            xpReward: opp.rewardsXP || 500,
            resources: [`Official website: ${opp.website}`],
            steps: LeveledApp.getOpportunitySteps(opp.category),
            isOpportunity: true
          });
          LeveledApp.addXP(100, `Added opportunity to Roadmap: "${opp.name}"`);
          LeveledApp.saveState();

          // Update button immediately
          btn.textContent = '✓ On Roadmap';
          btn.style.opacity = '0.6';
          btn.disabled = true;

          LeveledApp.showToast(`🗺️ "${opp.name}" added to your Roadmap! +100 XP`);
          setTimeout(() => { window.location.hash = '#roadmap'; }, 1200);
        }
      };
    });

    // Add to Active Tracker (Workspace) buttons
    const addWorkspaceBtns = document.querySelectorAll('.btn-add-opp-workspace');
    addWorkspaceBtns.forEach(btn => {
      btn.onclick = () => {
        const oppId = btn.getAttribute('data-id');
        const opp = OPPORTUNITIES.find(o => o.id === oppId) || (this.liveOpps || []).find(o => o.id === oppId);
        if (!opp) return;
        
        const state = LeveledApp.state;
        if (!state.projects) state.projects = [];
        
        // Check if already added
        if (state.projects.some(p => p.title === opp.name || p.oppId === opp.id)) {
          LeveledApp.showToast('Already in your Active Tracker!');
          return;
        }
        
        const newProject = {
          id: 'proj-' + Date.now(),
          oppId: opp.id,
          title: opp.name,
          type: opp.category === 'research' ? 'research' : 'passion',
          category: opp.category || 'Research',
          status: 'active',
          description: opp.description || '',
          steps: ['Research & Plan', 'Begin Work', 'Build & Iterate', 'Document Results', 'Present & Share'].map((s, i) => ({
            id: 'step-' + i,
            title: s,
            done: false
          })),
          evidence: [],
          createdAt: new Date().toISOString()
        };
        
        state.projects.push(newProject);
        
        // Auto-add to roadmap if opportunity has a deadline
        if (opp.deadline) {
          state.customRoadmapMilestones = state.customRoadmapMilestones || [];
          const alreadyOnRoadmap = state.customRoadmapMilestones.some(m => m.oppId === opp.id);
          if (!alreadyOnRoadmap) {
            state.customRoadmapMilestones.push({
              id: `mile-opp-${opp.id}`,
              oppId: opp.id,
              title: opp.name,
              category: opp.category.charAt(0).toUpperCase() + opp.category.slice(1),
              description: opp.description,
              difficulty: opp.difficulty,
              timeCommitment: '4-6 hours/week',
              xpReward: opp.rewardsXP || 500,
              resources: [`Official website: ${opp.website}`],
              steps: LeveledApp.getOpportunitySteps(opp.category),
              isOpportunity: true
            });
          }
        }
        
        LeveledApp.saveState();
        LeveledApp.showToast(`🚀 "${opp.name}" added to Active Tracker${opp.deadline ? ' & Roadmap' : ''}! Complete steps to earn XP.`);
        btn.disabled = true;
        btn.innerHTML = '✓ In Active Tracker';
        btn.style.opacity = '0.6';
        btn.style.background = 'rgba(16,185,129,0.15)';
        btn.style.borderColor = 'rgba(16,185,129,0.3)';
        btn.style.color = '#10b981';
      };
    });
  },
  showAddEvidenceModal(projId) {
    const state = LeveledApp.state;
    const proj = state.projects.find(p => p.id === projId);
    if (!proj) return;

    LeveledApp.openModal(`
      <div style="padding: 16px 8px; text-align: left;" id="evidence-modal-container" data-proj-id="${proj.id}">
        <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px; color: var(--text-primary);">📎 Add Completion Evidence</h3>
        <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 20px; line-height: 1.45;">Upload proof of execution for your extracurricular: <strong>"${proj.title}"</strong>. It will be synced directly to your Portfolio page.</p>

        <form id="modal-evidence-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="evidence-type" style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Evidence Type</label>
            <select id="evidence-type" class="form-control" style="font-size: 13.5px; padding: 6px; height: 34px;">
              <option value="photo">🖼️ Photo / Image Link</option>
              <option value="pdf">📄 PDF Document / Manuscript</option>
              <option value="link">🔗 External Link (GitHub, website, video)</option>
              <option value="log">📝 Text Log / Learning Outcome</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="evidence-title" style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Evidence Name / Title</label>
            <input type="text" id="evidence-title" class="form-control" placeholder="E.g., System Architecture Diagram, Project PDF, Git Repo Link" required style="font-size: 13.5px;">
          </div>

          <div class="form-group" id="evidence-url-group">
            <label class="form-label" for="evidence-url" id="lbl-evidence-url" style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Resource URL / Link</label>
            <input type="text" id="evidence-url" class="form-control" placeholder="E.g., https://github.com/username/project" required style="font-size: 13.5px;">
          </div>

          <div class="form-group">
            <label class="form-label" for="evidence-description" style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Description / Notes</label>
            <textarea id="evidence-description" class="form-control" placeholder="Provide context, learnings, or summary of this artifact..." style="min-height: 70px; font-size: 13px;" required></textarea>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 16px;">
            <button type="button" class="btn btn-secondary" onclick="LeveledApp.closeModal();" style="flex: 1;">Cancel</button>
            <button type="submit" class="btn btn-primary" style="flex: 2; padding: 10px; background: linear-gradient(135deg, var(--primary), var(--secondary));">💾 Save &amp; Publish to Portfolio</button>
          </div>
        </form>
      </div>
    `);

    const typeSelect = document.getElementById('evidence-type');
    const urlGroup = document.getElementById('evidence-url-group');
    const urlLabel = document.getElementById('lbl-evidence-url');
    const urlInput = document.getElementById('evidence-url');

    if (typeSelect && urlGroup && urlLabel && urlInput) {
      typeSelect.onchange = () => {
        const val = typeSelect.value;
        if (val === 'log') {
          urlGroup.style.display = 'none';
          urlInput.removeAttribute('required');
        } else {
          urlGroup.style.display = 'block';
          urlInput.setAttribute('required', 'true');
          if (val === 'photo') {
            urlLabel.textContent = 'Photo Image URL / Link';
            urlInput.placeholder = 'E.g., https://images.unsplash.com/photo-...';
          } else if (val === 'pdf') {
            urlLabel.textContent = 'PDF Document Path / URL';
            urlInput.placeholder = 'E.g., docs/research_draft.pdf';
          } else if (val === 'link') {
            urlLabel.textContent = 'Resource URL / Link';
            urlInput.placeholder = 'E.g., https://github.com/username/project';
          }
        }
      };
    }

    const modalForm = document.getElementById('modal-evidence-form');
    if (modalForm) {
      modalForm.onsubmit = () => {
        const type = typeSelect.value;
        const title = document.getElementById('evidence-title').value.trim();
        const url = type === 'log' ? '' : urlInput.value.trim();
        const description = document.getElementById('evidence-description').value.trim();

        proj.evidenceList = proj.evidenceList || [];
        proj.evidenceList.push({
          id: 'ev-' + Date.now(),
          type,
          title,
          url,
          description,
          date: new Date().toISOString().split('T')[0]
        });

        state.portfolioAchievements = state.portfolioAchievements || [];
        let categoryLabel = 'Evidence File';
        if (type === 'photo') categoryLabel = '🖼️ Photo Showcase';
        else if (type === 'pdf') categoryLabel = '📄 PDF Document';
        else if (type === 'link') categoryLabel = '🔗 Reference Link';
        else if (type === 'log') categoryLabel = '📝 Learning Log';

        state.portfolioAchievements.push({
          id: `ach-${Date.now()}`,
          title: `Logged Evidence: ${title}`,
          category: categoryLabel,
          date: new Date().toISOString().split('T')[0],
          detail: `Uploaded outcome: "${description}" ${url ? `(${url})` : ''}`
        });

        LeveledApp.addXP(40, `Uploaded evidence artifact: "${title}"`);
        LeveledApp.saveState();
        LeveledApp.closeModal();
        this.render();
        LeveledApp.showToast('✓ Evidence published to Portfolio website!');
      };
    }
  }
};

window.Extracurriculars = Extracurriculars;

