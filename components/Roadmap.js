import { AISimulator } from '../data/ai_simulator.js';
import { Mentor } from './Mentor.js';

export const Roadmap = {
  render() {
    const container = document.getElementById('view-roadmap');
    const state = LeveledApp.state;
    const user = state.user;
    
    if (!user) return;

    const milestones = AISimulator.generateRoadmap(user);
    const hasActiveMilestone = milestones.some((m, index) => {
      const isCompleted = state.completedMilestones.includes(m.id);
      const isActive = index === 0 || state.completedMilestones.includes(milestones[index - 1]?.id);
      return isActive && !isCompleted;
    });

    container.innerHTML = `
      ${hasActiveMilestone ? Mentor.getIvyBirdHTML('roadmap') : ''}
      <div style="max-width: 800px; margin: 0 auto;">
        
        <div style="text-align: center; margin-bottom: 40px;">
          <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; margin-bottom: 8px;">Your Personalized Growth Journey</h3>
          <p style="color: var(--text-secondary); font-size: 14px;">Complete these strategic milestones to optimize your university application profile.</p>
        </div>

        <!-- Timeline Pathway -->
        <div class="roadmap-timeline" style="position: relative; padding: 20px 0 40px 0;">
          <!-- Vertical center line -->
          <div style="position: absolute; left: 40px; top: 0; bottom: 0; width: 4px; background-color: var(--border-color); z-index: 1;"></div>
          
          <div style="display: flex; flex-direction: column; gap: 32px; position: relative; z-index: 2;">
            ${milestones.map((m, index) => {
              const isCompleted = state.completedMilestones.includes(m.id);
              const isActive = index === 0 || state.completedMilestones.includes(milestones[index - 1]?.id);

              return `
                <div class="roadmap-node" style="display: flex; gap: 24px;">
                  <!-- Timeline indicator dot -->
                  <div class="timeline-dot" data-id="${m.id}" style="
                    width: 32px; height: 32px; border-radius: var(--border-radius-round);
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 14px; flex-shrink: 0;
                    margin-left: 26px; border: 3px solid var(--bg-primary);
                    background-color: ${isCompleted ? 'var(--color-level)' : isActive ? 'var(--primary)' : 'var(--bg-tertiary)'};
                    color: ${isCompleted || isActive ? 'white' : 'var(--text-muted)'};
                    cursor: pointer;
                    box-shadow: ${isActive ? '0 0 12px var(--primary-glow)' : 'none'};
                    transition: all var(--transition-fast);
                  ">
                    ${isCompleted ? '✓' : index + 1}
                  </div>

                  <!-- Milestone Card content -->
                  <div class="glass-card milestone-card" data-id="${m.id}" style="
                    position: relative; overflow: visible !important;
                    flex: 1; cursor: pointer; padding: 20px;
                    border-left: 4px solid ${isCompleted ? 'var(--color-level)' : isActive ? 'var(--primary)' : 'var(--border-color)'};
                    opacity: ${isCompleted ? 0.9 : isActive ? 1 : 0.65};
                    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
                  ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                      <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted);">${m.category}</span>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 11px; background-color: var(--bg-primary); border: 1px solid var(--border-color); padding: 2px 6px; border-radius: var(--border-radius-sm); font-weight: 600;">${m.difficulty}</span>
                        <span style="font-size: 12px; font-weight: 700; color: var(--color-xp);">+${m.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${m.title}</h4>
                    <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.4;">${m.description}</p>
                    
                    <div style="display: flex; align-items: center; gap: 16px; font-size: 12px; color: var(--text-muted); margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 12px;">
                      <span>⏳ ${m.timeCommitment}</span>
                      ${m.teammates ? '<span style="color: var(--secondary);">👥 Teammates Recommended</span>' : ''}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;

    this.bindEvents(milestones);

    if (state.activeMilestoneId) {
      const targetMilestone = milestones.find(m => m.id === state.activeMilestoneId);
      if (targetMilestone) {
        delete state.activeMilestoneId;
        setTimeout(() => {
          window.LeveledApp.openMilestoneWorkspace(targetMilestone);
        }, 50);
      }
    }
  },

  bindEvents(milestones) {
    const cards = document.querySelectorAll('.milestone-card, .timeline-dot');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const milestone = milestones.find(m => m.id === id);
        if (milestone) {
          window.LeveledApp.openRoadmapEventModal(milestone.id, milestone.title, milestone.category);
        }
      });
    });
  }
};
