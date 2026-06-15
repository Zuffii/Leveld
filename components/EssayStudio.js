import { AISimulator } from '../data/ai_simulator.js';

export const EssayStudio = {
  activeCritique: null,

  render() {
    const container = document.getElementById('view-essay');
    const state = LeveledApp.state;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Instruction Banner & Input Form -->
        <div class="glass-card">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span>✍️</span> College Essay Critique Studio
          </h3>
          
          <!-- Warning against AI ghostwriting -->
          <div style="background-color: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--cat-scholarship); border-radius: var(--border-radius-md); padding: 12px 16px; margin: 16px 0; font-size: 13px; color: var(--text-primary); line-height: 1.4;">
            <strong>⚠️ Integrity Policy:</strong> Leveld AI will <strong>NOT</strong> draft, write, or write sections of your university or scholarship essays. Ghostwriting violates academic integrity rules and diminishes authenticity. Instead, we analyze your original drafts and provide structural critique to help you tell your own story.
          </div>

          <form id="essay-critique-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label class="form-label" for="essay-prompt">Essay Prompt / Application context</label>
              <input type="text" id="essay-prompt" class="form-control" placeholder="MIT Essay: Describe a time you built something complex, or Harvard: Describe a meaningful community volunteer role..." required>
            </div>

            <div class="form-group">
              <label class="form-label" for="essay-text">Paste Draft Content</label>
              <textarea id="essay-text" class="form-control" placeholder="Write or paste your essay draft here (Min 100 words)..." style="min-height: 250px; font-size: 13.5px; line-height: 1.5;" required></textarea>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <span id="essay-word-count-badge" style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Words: 0</span>
              <button type="submit" class="btn btn-primary" style="padding: 10px 24px;">🤖 Critique My Draft</button>
            </div>
          </form>
        </div>

        <!-- Evaluation Outputs -->
        <div id="essay-results-panel" style="display: ${this.activeCritique ? 'block' : 'none'};">
          <div style="display: grid; grid-template-columns: 1fr 2.2fr; gap: 32px;" class="essay-split">
            
            <!-- Column 1: Scores Rubric breakdown -->
            <div style="display: flex; flex-direction: column; gap: 32px;">
              <div class="glass-card" style="text-align: center; padding: 24px;">
                <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 20px;">Overall Grading</h4>
                
                <!-- Big Score Gauge -->
                <div style="width: 120px; height: 120px; border-radius: var(--border-radius-round); border: 8px solid var(--secondary); display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto 16px auto; box-shadow: 0 0 16px rgba(6, 182, 212, 0.15);">
                  <span style="font-family: var(--font-heading); font-size: 36px; font-weight: 800; color: var(--text-primary); line-height: 1;">
                    ${this.activeCritique?.scores.overall || 0}
                  </span>
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Grade</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12.5px; text-align: left; margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px;">
                      <span>📐 Narrative Structure</span>
                      <span>${this.activeCritique?.scores.structure || 0}/10</span>
                    </div>
                    <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${(this.activeCritique?.scores.structure || 0) * 10}%; height: 100%; background-color: var(--primary);"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px;">
                      <span>📖 Authenticity & Story</span>
                      <span>${this.activeCritique?.scores.story || 0}/10</span>
                    </div>
                    <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${(this.activeCritique?.scores.story || 0) * 10}%; height: 100%; background-color: var(--color-xp);"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px;">
                      <span>🌍 Impact & Leadership</span>
                      <span>${this.activeCritique?.scores.impact || 0}/10</span>
                    </div>
                    <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${(this.activeCritique?.scores.impact || 0) * 10}%; height: 100%; background-color: #10b981;"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px;">
                      <span>✍️ Grammar & Pacing</span>
                      <span>${this.activeCritique?.scores.grammar || 0}/10</span>
                    </div>
                    <div style="width: 100%; height: 4px; background-color: var(--bg-tertiary); border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${(this.activeCritique?.scores.grammar || 0) * 10}%; height: 100%; background-color: var(--secondary);"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Column 2: Analysis feedback categories -->
            <div style="display: flex; flex-direction: column; gap: 32px;">
              <!-- Strengths & Weaknesses cards -->
              <div class="glass-card">
                <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 16px;">Admissions Feedback</h4>
                
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div>
                    <h5 style="font-size: 12px; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 8px;">Key Strengths:</h5>
                    <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                      ${this.activeCritique?.strengths.map(s => `<li>${s}</li>`).join('') || ''}
                    </ul>
                  </div>

                  <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
                    <h5 style="font-size: 12px; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-bottom: 8px;">Identified Pitfalls:</h5>
                    <ul style="padding-left: 20px; font-size: 13px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 6px;">
                      ${this.activeCritique?.weaknesses.map(w => `<li>${w}</li>`).join('') || ''}
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Actionable suggestions & revision checklists -->
              <div class="glass-card">
                <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 16px;">Revision Recommendations</h4>
                <ul style="padding-left: 20px; font-size: 13.5px; color: var(--text-secondary); display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
                  ${this.activeCritique?.suggestions.map(s => `<li>${s}</li>`).join('') || ''}
                </ul>

                <h5 style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px;">Draft Checklist:</h5>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${this.activeCritique?.checklist.map((item, idx) => `
                    <label style="display: flex; gap: 8px; font-size: 13px; color: var(--text-secondary); align-items: center;">
                      <input type="checkbox" ${item.done ? 'checked' : ''} style="accent-color: var(--primary);">
                      <span>${item.text}</span>
                    </label>
                  `).join('') || ''}
                </div>

                <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; gap: 12px;">
                  <button class="btn btn-primary btn-discuss-critique-mentor" style="font-size: 12px; padding: 8px 16px;">Discuss Critique with AI Mentor</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const state = LeveledApp.state;

    // Word Count counter on input
    const textInput = document.getElementById('essay-text');
    if (textInput) {
      textInput.addEventListener('input', (e) => {
        const words = e.target.value.split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById('essay-word-count-badge').textContent = `Words: ${words}`;
      });
    }

    // Submit form
    const form = document.getElementById('essay-critique-form');
    if (form) {
      form.onsubmit = () => {
        const text = document.getElementById('essay-text').value;
        const prompt = document.getElementById('essay-prompt').value;

        if (text.split(/\s+/).filter(w => w.length > 0).length < 100) {
          alert('Please write at least 100 words so that the AI can formulate a quality structural critique.');
          return;
        }

        this.activeCritique = AISimulator.critiqueEssay(text, prompt);
        
        if (!LeveledApp.state.essayCritiques) {
          LeveledApp.state.essayCritiques = [];
        }
        LeveledApp.state.essayCritiques.push({
          id: `essay-${Date.now()}`,
          prompt: prompt,
          draft: text,
          critique: this.activeCritique,
          date: new Date().toISOString().split('T')[0]
        });
        LeveledApp.saveState();

        this.render();

        const results = document.getElementById('essay-results-panel');
        results.scrollIntoView({ behavior: 'smooth' });

        // Anti-spam checks
        this._critiquedEssays = this._critiquedEssays || new Set();
        const normalizedText = text.trim().toLowerCase();
        if (text.length >= 150 && !this._critiquedEssays.has(normalizedText)) {
          this._critiquedEssays.add(normalizedText);
          LeveledApp.addXP(80, 'Submitted essay draft for structural critique');
        }
      };
    }

    // Discuss critique button
    const discussBtn = document.querySelector('.btn-discuss-critique-mentor');
    if (discussBtn) {
      discussBtn.onclick = () => {
        const prompt = document.getElementById('essay-prompt').value;
        const panel = document.getElementById('ai-mentor-panel');
        panel.classList.add('open');
        window.sendMessageToMentor(`I submitted my essay draft for "${prompt}" and got a score of ${this.activeCritique?.scores.overall || 0}. How can I improve my Storytelling score?`);
      };
    }
  }
};
