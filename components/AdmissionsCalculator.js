import { Mentor } from './Mentor.js';

const AdmissionsCalculator = {
  formData: {
    gpa: '',
    satScore: '',
    actScore: '',
    apCourses: '',
    ecTier: '3',
    essayStrength: '3',
    recLetters: '3',
    awards: '2',
    hooks: [],
    targetUni: ''
  },
  results: null,

  render() {
    const state = LeveledApp.state;
    const user = state.user;
    const container = document.getElementById('view-admissions');
    
    // Pre-fill from user profile if available
    if (user && !this.formData.gpa) {
      this.formData.gpa = user.gpa || '';
      this.formData.satScore = user.satScore || '';
      this.formData.targetUni = (user.dreamUniversities && user.dreamUniversities[0]) || '';
    }

    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto; padding: 32px 24px;">
        
        <!-- Header -->
        <div style="margin-bottom: 32px;">
          <div class="glass-card" style="position: relative; overflow: visible !important; display: flex; flex-direction: column; gap: 24px; padding: 24px; margin-top: 20px;">
          ${Mentor.getIvyBirdHTML('admissions')}
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px;">Admissions Probability Calculator</h3>
            <span style="font-size: 10px; font-weight: 800; color: var(--secondary); background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.25); padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Beta</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.5;">Estimate your admission probability for top universities based on academic profile, extracurriculars, and application strength. Results are simulated estimates — not guarantees.</p>
        </div>
        </div>

        <!-- Calculator Form -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          
          <!-- Left Column: Academic Profile -->
          <div class="glass-card" style="position: relative; overflow: visible !important; padding: 24px;">
            <h3 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
              📚 Academic Profile
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Unweighted GPA (out of 4.0)</label>
                <input type="number" id="calc-gpa" class="form-control" step="0.01" min="0" max="4.0" placeholder="e.g. 3.85" value="${this.formData.gpa}" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; width: 100%;" />
              </div>
              
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">SAT Score (400–1600)</label>
                <input type="number" id="calc-sat" class="form-control" min="400" max="1600" placeholder="e.g. 1520" value="${this.formData.satScore}" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; width: 100%;" />
              </div>
              
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">ACT Score (1–36) <span style="font-weight: 400; text-transform: none;">(optional)</span></label>
                <input type="number" id="calc-act" class="form-control" min="1" max="36" placeholder="e.g. 34" value="${this.formData.actScore}" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; width: 100%;" />
              </div>
              
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">AP/IB Courses Taken</label>
                <input type="number" id="calc-ap" class="form-control" min="0" max="20" placeholder="e.g. 8" value="${this.formData.apCourses}" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; width: 100%;" />
              </div>
            </div>
          </div>

          <!-- Right Column: Application Strength -->
          <div class="glass-card" style="position: relative; overflow: visible !important; padding: 24px;">
            <h3 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
              💪 Application Strength
            </h3>
            
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Extracurricular Tier</label>
                <select id="calc-ec" class="form-control" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; width: 100%; color: var(--text-primary);">
                  <option value="1" ${this.formData.ecTier === '1' ? 'selected' : ''}>Tier 1 — National/International recognition</option>
                  <option value="2" ${this.formData.ecTier === '2' ? 'selected' : ''}>Tier 2 — State-level leadership / significant impact</option>
                  <option value="3" ${this.formData.ecTier === '3' ? 'selected' : ''}>Tier 3 — Club officer / school-level achievement</option>
                  <option value="4" ${this.formData.ecTier === '4' ? 'selected' : ''}>Tier 4 — General participation / basic involvement</option>
                </select>
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Essay Quality</label>
                <select id="calc-essay" class="form-control" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; width: 100%; color: var(--text-primary);">
                  <option value="5" ${this.formData.essayStrength === '5' ? 'selected' : ''}>5 — Exceptional (unique, moving, memorable)</option>
                  <option value="4" ${this.formData.essayStrength === '4' ? 'selected' : ''}>4 — Strong (well-written, clear voice)</option>
                  <option value="3" ${this.formData.essayStrength === '3' ? 'selected' : ''}>3 — Good (solid but not standout)</option>
                  <option value="2" ${this.formData.essayStrength === '2' ? 'selected' : ''}>2 — Average (generic or unfocused)</option>
                  <option value="1" ${this.formData.essayStrength === '1' ? 'selected' : ''}>1 — Weak (not impactful)</option>
                </select>
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Recommendation Letters</label>
                <select id="calc-rec" class="form-control" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; width: 100%; color: var(--text-primary);">
                  <option value="5" ${this.formData.recLetters === '5' ? 'selected' : ''}>5 — Best they've ever written</option>
                  <option value="4" ${this.formData.recLetters === '4' ? 'selected' : ''}>4 — Very strong, specific examples</option>
                  <option value="3" ${this.formData.recLetters === '3' ? 'selected' : ''}>3 — Positive but generic</option>
                  <option value="2" ${this.formData.recLetters === '2' ? 'selected' : ''}>2 — Lukewarm</option>
                </select>
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Awards & Honors</label>
                <select id="calc-awards" class="form-control" style="padding: 10px 14px; background: var(--input-bg); border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; width: 100%; color: var(--text-primary);">
                  <option value="4" ${this.formData.awards === '4' ? 'selected' : ''}>National/International level awards</option>
                  <option value="3" ${this.formData.awards === '3' ? 'selected' : ''}>State/Regional awards</option>
                  <option value="2" ${this.formData.awards === '2' ? 'selected' : ''}>School-level honors</option>
                  <option value="1" ${this.formData.awards === '1' ? 'selected' : ''}>No significant awards</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculate Button -->
        <div style="margin-top: 24px; text-align: center;">
          <button class="btn btn-primary" id="btn-calc-admissions" style="padding: 14px 40px; font-size: 15px; font-weight: 700; border-radius: 980px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; letter-spacing: 0.02em;">
            🎯 Calculate My Chances
          </button>
        </div>

        <!-- Results Area -->
        <div id="calc-results-area" style="margin-top: 32px;">
          ${this.results ? this.renderResults() : ''}
        </div>
      </div>
    `;

    this.bindEvents();
  },

  renderResults() {
    if (!this.results) return '';
    
    return `
      <div class="glass-card" style="position: relative; overflow: visible !important; padding: 28px; border-top: 4px solid var(--primary);">
        <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
          📊 Your Admission Estimates
          <span style="font-size: 10px; font-weight: 800; color: var(--secondary); background: rgba(6,182,212,0.15); padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Beta</span>
        </h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
          ${this.results.map(r => {
            const color = r.chance >= 60 ? '#10b981' : r.chance >= 30 ? '#f59e0b' : '#f43f5e';
            const label = r.chance >= 60 ? 'Strong' : r.chance >= 30 ? 'Competitive' : 'Reach';
            return `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 14px; padding: 20px; text-align: center; transition: all 0.2s;">
                <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">${r.name}</div>
                <div style="font-size: 36px; font-weight: 800; color: ${color}; font-family: var(--font-heading); line-height: 1;">${r.chance}%</div>
                <div style="font-size: 11px; font-weight: 700; color: ${color}; margin-top: 4px; background: ${color}20; padding: 2px 10px; border-radius: 980px; display: inline-block;">${label}</div>
                <div style="margin-top: 12px; width: 100%; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;">
                  <div style="width: ${r.chance}%; height: 100%; background: ${color}; border-radius: 3px; transition: width 1s ease;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Ivy's Analysis -->
        <div style="background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.12); border-radius: 14px; padding: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <span style="font-size: 20px;">🤖</span>
            <h4 style="font-family: var(--font-heading); font-size: 14px; font-weight: 700;">Ivy's Analysis</h4>
          </div>
          <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px; line-height: 1.5;">
            ${this.getIvyAdvice().map(a => `<li>${a}</li>`).join('')}
          </ul>
          <button class="btn btn-secondary" id="btn-ask-ivy-calc" style="margin-top: 16px; padding: 8px 16px; font-size: 12px;">💬 Discuss with Ivy</button>
        </div>

        <p style="font-size: 11px; color: var(--text-muted); margin-top: 16px; text-align: center; font-style: italic;">
          ⚠️ These are simulated estimates based on historical averages and your input. Actual admission decisions involve holistic review and many factors not captured here. This tool is in beta.
        </p>
      </div>
    `;
  },

  calculate() {
    const gpa = parseFloat(document.getElementById('calc-gpa').value) || 0;
    const sat = parseInt(document.getElementById('calc-sat').value) || 0;
    const act = parseInt(document.getElementById('calc-act').value) || 0;
    const ap = parseInt(document.getElementById('calc-ap').value) || 0;
    const ec = parseInt(document.getElementById('calc-ec').value) || 3;
    const essay = parseInt(document.getElementById('calc-essay').value) || 3;
    const rec = parseInt(document.getElementById('calc-rec').value) || 3;
    const awards = parseInt(document.getElementById('calc-awards').value) || 2;

    // Save form data
    this.formData = { gpa: gpa.toString(), satScore: sat.toString(), actScore: act.toString(), apCourses: ap.toString(), ecTier: ec.toString(), essayStrength: essay.toString(), recLetters: rec.toString(), awards: awards.toString() };

    // University benchmarks
    const universities = [
      { name: 'MIT', baseRate: 4, gpaAvg: 3.96, satAvg: 1550, weight: { academic: 0.3, ec: 0.25, essay: 0.2, rec: 0.1, awards: 0.15 }},
      { name: 'Stanford', baseRate: 4, gpaAvg: 3.95, satAvg: 1540, weight: { academic: 0.25, ec: 0.25, essay: 0.25, rec: 0.1, awards: 0.15 }},
      { name: 'Harvard', baseRate: 3.5, gpaAvg: 3.97, satAvg: 1550, weight: { academic: 0.25, ec: 0.2, essay: 0.25, rec: 0.15, awards: 0.15 }},
      { name: 'Yale', baseRate: 5, gpaAvg: 3.95, satAvg: 1540, weight: { academic: 0.3, ec: 0.2, essay: 0.25, rec: 0.15, awards: 0.1 }},
      { name: 'Princeton', baseRate: 4, gpaAvg: 3.94, satAvg: 1540, weight: { academic: 0.3, ec: 0.2, essay: 0.2, rec: 0.15, awards: 0.15 }},
      { name: 'Columbia', baseRate: 4, gpaAvg: 3.93, satAvg: 1530, weight: { academic: 0.3, ec: 0.2, essay: 0.25, rec: 0.1, awards: 0.15 }},
      { name: 'UPenn', baseRate: 6, gpaAvg: 3.92, satAvg: 1530, weight: { academic: 0.3, ec: 0.25, essay: 0.2, rec: 0.1, awards: 0.15 }},
      { name: 'Caltech', baseRate: 3, gpaAvg: 3.97, satAvg: 1560, weight: { academic: 0.4, ec: 0.15, essay: 0.15, rec: 0.1, awards: 0.2 }},
    ];

    // Add user's dream universities if not already present
    const user = LeveledApp.state.user;
    if (user && user.dreamUniversities) {
      user.dreamUniversities.forEach(uni => {
        if (!universities.find(u => u.name.toLowerCase() === uni.toLowerCase())) {
          universities.push({
            name: uni,
            baseRate: 15,
            gpaAvg: 3.8,
            satAvg: 1450,
            weight: { academic: 0.3, ec: 0.2, essay: 0.2, rec: 0.15, awards: 0.15 }
          });
        }
      });
    }

    this.results = universities.map(uni => {
      // Academic score (0-100)
      let gpaScore = Math.min(100, (gpa / uni.gpaAvg) * 100);
      let testScore = sat > 0 ? Math.min(100, (sat / uni.satAvg) * 100) : (act > 0 ? Math.min(100, (act / 36) * 100) : 50);
      let apScore = Math.min(100, (ap / 10) * 100);
      let academicScore = (gpaScore * 0.4 + testScore * 0.4 + apScore * 0.2);

      // EC score
      let ecScore = (5 - ec) * 25; // Tier 1=100, Tier 2=75, Tier 3=50, Tier 4=25

      // Essay score
      let essayScore = essay * 20;

      // Rec score
      let recScore = rec * 20;

      // Awards score
      let awardsScore = awards * 25;

      // Weighted total
      let total = (
        academicScore * uni.weight.academic +
        ecScore * uni.weight.ec +
        essayScore * uni.weight.essay +
        recScore * uni.weight.rec +
        awardsScore * uni.weight.awards
      );

      // Apply base rate scaling — high total doesn't guarantee admission
      let chance = Math.round(Math.min(95, Math.max(2, (total / 100) * (uni.baseRate * 5) + (total - 70) * 1.2)));
      if (total < 50) chance = Math.max(2, Math.round(uni.baseRate * 0.5));
      if (total > 90) chance = Math.min(95, chance + 15);

      return { name: uni.name, chance, academicScore: Math.round(academicScore), ecScore, essayScore, total: Math.round(total) };
    }).sort((a, b) => b.chance - a.chance);
  },

  getIvyAdvice() {
    const advice = [];
    const gpa = parseFloat(this.formData.gpa) || 0;
    const sat = parseInt(this.formData.satScore) || 0;
    const ec = parseInt(this.formData.ecTier) || 3;
    const essay = parseInt(this.formData.essayStrength) || 3;

    if (gpa < 3.7) advice.push('<strong>GPA:</strong> Your GPA is below the average for top universities. Focus on maintaining strong grades this semester and consider grade trends (upward trajectory helps).');
    else if (gpa >= 3.9) advice.push('<strong>GPA:</strong> Excellent GPA! You\'re competitive for the most selective schools.');
    
    if (sat > 0 && sat < 1450) advice.push('<strong>SAT:</strong> Consider retaking the SAT — even 50+ points can significantly improve your chances. Use Leveld\'s roadmap to schedule focused prep.');
    else if (sat >= 1500) advice.push('<strong>SAT:</strong> Strong test score! This puts you in the competitive range for Ivy League schools.');
    
    if (ec >= 3) advice.push('<strong>Extracurriculars:</strong> This is your biggest opportunity for improvement. Use Leveld\'s Active Tracker to start a passion project or research paper to move into a higher tier.');
    else if (ec === 1) advice.push('<strong>Extracurriculars:</strong> Outstanding! National/International recognition is a significant differentiator.');
    
    if (essay <= 3) advice.push('<strong>Essays:</strong> Use the Essay Studio in Leveld to iterate on your personal statement. Specificity and authentic voice are key.');
    
    if (advice.length === 0) advice.push('Your profile looks strong across all categories. Focus on crafting authentic, compelling essays that tell YOUR unique story.');
    
    return advice;
  },

  bindEvents() {
    const calcBtn = document.getElementById('btn-calc-admissions');
    if (calcBtn) {
      calcBtn.onclick = () => {
        this.calculate();
        const area = document.getElementById('calc-results-area');
        area.innerHTML = this.renderResults();
        area.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Bind Ivy discuss button
        const ivyBtn = document.getElementById('btn-ask-ivy-calc');
        if (ivyBtn) {
          ivyBtn.onclick = () => {
            const panel = document.getElementById('ai-mentor-panel');
            if (panel && !panel.classList.contains('open')) {
              window.LeveledApp.toggleMentorPanel();
            }
            const bestUni = this.results[0];
            window.sendMessageToMentor(`I just ran the admissions calculator. My top chance is ${bestUni.chance}% for ${bestUni.name}. My GPA is ${this.formData.gpa}, SAT is ${this.formData.satScore}. What should I improve to boost my chances?`);
          };
        }
      };
    }
  }
};

export default AdmissionsCalculator;
