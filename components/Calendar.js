import { OPPORTUNITIES } from '../data/mock_data.js';
import { AISimulator } from '../data/ai_simulator.js';

export const Calendar = {
  viewMode: 'month', // 'month' | 'week' | 'timeline'
  currentMonth: 5, // June (0-indexed: 5)
  currentYear: 2026,

  render() {
    const container = document.getElementById('view-calendar');
    const state = LeveledApp.state;

    // Load custom events if not present
    state.calendarEvents = state.calendarEvents || [];

    // Compile all calendar events:
    // 1. Opportunity Deadlines
    // 1. Opportunity Deadlines (All Active Projects + Roadmap Milestones + globally saved)
    const activeOppIds = new Set(state.savedOpportunities || []);
    
    // Add all project opportunities
    if (state.projects) {
      state.projects.forEach(p => {
        if (p.oppId) activeOppIds.add(p.oppId);
      });
    }
    
    // Add all roadmap opportunities
    if (state.customRoadmapMilestones) {
      state.customRoadmapMilestones.forEach(m => {
        if (m.oppId) activeOppIds.add(m.oppId);
      });
    }

    const oppDeadlines = OPPORTUNITIES.filter(o => 
      activeOppIds.has(o.id) && o.deadline && o.deadline.match(/^\d{4}-\d{2}-\d{2}$/)
    ).map(o => ({
      title: `⚠️ Due: ${o.name}`,
      date: o.deadline,
      type: 'opportunity',
      color: `var(--cat-${o.category || 'Extracurricular'})`
    }));

    // 2. Roadmap Milestones
    const roadmapMilestones = AISimulator.generateRoadmap(state.user).map((m, idx) => {
      // Space them out starting June 10th
      const date = new Date(this.currentYear, this.currentMonth, 10 + (idx * 5));
      const dateStr = date.toISOString().split('T')[0];
      return {
        title: `🗺️ Milestone: ${m.title}`,
        date: dateStr,
        type: 'milestone',
        color: 'var(--color-xp)',
        completed: state.completedMilestones.includes(m.id)
      };
    });

    // Combine all
    const allEvents = [...oppDeadlines, ...roadmapMilestones, ...state.calendarEvents];

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        
        <!-- Calendar Controls & View Toggles -->
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; flex-wrap: wrap; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800;" id="calendar-month-year">June 2026</h4>
            
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" id="btn-cal-prev">&larr;</button>
              <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" id="btn-cal-next">&rarr;</button>
            </div>
          </div>

          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="tag-selector" style="margin-bottom: 0;">
              <div class="tag-chip ${this.viewMode === 'month' ? 'selected' : ''}" data-view="month">Month</div>
              <div class="tag-chip ${this.viewMode === 'week' ? 'selected' : ''}" data-view="week">Week</div>
              <div class="tag-chip ${this.viewMode === 'timeline' ? 'selected' : ''}" data-view="timeline">Timeline</div>
            </div>
            
            <button class="btn btn-primary" id="btn-add-event" style="padding: 8px 16px; font-size: 12px;">+ Study Event</button>
          </div>
        </div>

        <!-- Main Calendar Panels -->
        <div class="glass-card" style="padding: 24px;">
          ${this.viewMode === 'month' ? this.renderMonthView(allEvents) : ''}
          ${this.viewMode === 'week' ? this.renderWeekView(allEvents) : ''}
          ${this.viewMode === 'timeline' ? this.renderTimelineView(allEvents) : ''}
        </div>
        
      </div>
    `;

    this.bindEvents(allEvents);
  },

  renderMonthView(events) {
    // June 2026 starts on Monday (index 1 if Monday-start, or index 2 for Sun-start).
    // Let's use Monday start (standard for calendars).
    // June has 30 days.
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const daysInMonth = 30;
    
    // We start June 1 on Mon, so no leading empty offset slots! Perfect.
    let html = `
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background-color: var(--border-color); border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color);">
        <!-- Day Names Headers -->
        ${dayNames.map(name => `
          <div style="background-color: var(--bg-tertiary); padding: 10px; font-size: 12px; font-weight: 700; text-align: center; color: var(--text-secondary);">${name}</div>
        `).join('')}
        
        <!-- Days Grid -->
        ${(() => {
          let daysHtml = '';
          for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);

            daysHtml += `
              <div class="calendar-day" data-date="${dateStr}" style="
                background-color: var(--bg-secondary); min-height: 100px; padding: 8px;
                display: flex; flex-direction: column; gap: 6px;
                position: relative; transition: background-color var(--transition-fast);
              ">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">${day}</span>
                
                <div style="display: flex; flex-direction: column; gap: 4px; overflow-y: auto; flex: 1;">
                  ${dayEvents.map(e => `
                    <div style="
                      font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: var(--border-radius-sm);
                      background-color: ${e.color || 'var(--primary)'}; color: white;
                      text-overflow: ellipsis; white-space: nowrap; overflow: hidden;
                      text-decoration: ${e.completed ? 'line-through' : 'none'};
                      opacity: ${e.completed ? 0.6 : 1};
                    " title="${e.title}">
                      ${e.title}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
          return daysHtml;
        })()}
      </div>
    `;
    return html;
  },

  renderWeekView(events) {
    // Renders the first week of June 2026 (Mon June 1 to Sun June 7)
    const days = [
      { name: 'Monday', date: '2026-06-01' },
      { name: 'Tuesday', date: '2026-06-02' },
      { name: 'Wednesday', date: '2026-06-03' },
      { name: 'Thursday', date: '2026-06-04' },
      { name: 'Friday', date: '2026-06-05' },
      { name: 'Saturday', date: '2026-06-06' },
      { name: 'Sunday', date: '2026-06-07' }
    ];

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${days.map(day => {
          const dayEvents = events.filter(e => e.date === day.date);
          return `
            <div style="display: grid; grid-template-columns: 150px 1fr; gap: 16px; align-items: center; padding: 16px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md);">
              <div>
                <h5 style="font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--text-primary);">${day.name}</h5>
                <span style="font-size: 12px; color: var(--text-muted);">${day.date}</span>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${dayEvents.length > 0 ? dayEvents.map(e => `
                  <div style="background-color: ${e.color || 'var(--primary)'}; color: white; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: var(--border-radius-xl); text-decoration: ${e.completed ? 'line-through' : 'none'}; opacity: ${e.completed ? 0.65 : 1};">
                    ${e.title}
                  </div>
                `).join('') : `
                  <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">No activities planned</span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTimelineView(events) {
    // Sort all events chronologically
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 8px;">Chronological Plan</h4>
        ${sorted.length > 0 ? sorted.map(e => `
          <div style="display: flex; gap: 16px; align-items: center; padding: 12px 16px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md);">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); width: 100px; flex-shrink: 0;">${e.date}</div>
            <div style="width: 12px; height: 12px; border-radius: var(--border-radius-round); background-color: ${e.color || 'var(--primary)'}; flex-shrink: 0;"></div>
            <div style="font-size: 13.5px; font-weight: 600; color: var(--text-primary); text-decoration: ${e.completed ? 'line-through' : 'none'}; opacity: ${e.completed ? 0.65 : 1}; flex: 1;">
              ${e.title}
            </div>
            <span style="font-size: 10px; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">${e.type}</span>
          </div>
        `).join('') : `
          <p style="color: var(--text-secondary); text-align: center; padding: 20px 0;">No calendar events yet.</p>
        `}
      </div>
    `;
  },

  bindEvents(events) {
    const state = LeveledApp.state;

    // View toggler chips click
    const viewChips = document.querySelectorAll('.tag-selector .tag-chip');
    viewChips.forEach(chip => {
      chip.onclick = () => {
        this.viewMode = chip.getAttribute('data-view');
        this.render();
      };
    });

    // Add Event Click
    const addBtn = document.getElementById('btn-add-event');
    if (addBtn) {
      addBtn.onclick = () => {
        this.openAddEventModal();
      };
    }

    // Prev/Next month button alerts (simple prototype limits to June 2026)
    const prevBtn = document.getElementById('btn-cal-prev');
    const nextBtn = document.getElementById('btn-cal-next');
    if (prevBtn) {
      prevBtn.onclick = () => {
        alert('This simulated calendar is locked to June 2026 for demonstration.');
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        alert('This simulated calendar is locked to June 2026 for demonstration.');
      };
    }

    // Clicking a calendar day allows quick event adding
    const dayCells = document.querySelectorAll('.calendar-day');
    dayCells.forEach(cell => {
      cell.ondblclick = () => {
        const date = cell.getAttribute('data-date');
        this.openAddEventModal(date);
      };
    });
  },

  openAddEventModal(defaultDate = '2026-06-01') {
    const modalHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-primary);">Add Study Planner Event</h3>
        
        <form id="add-event-form" onsubmit="event.preventDefault();">
          <div class="form-group">
            <label class="form-label" for="ev-title">Event Title</label>
            <input type="text" id="ev-title" class="form-control" placeholder="Math Olympiad Prep, Study Biology Ch 4" required>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="ev-date">Date</label>
            <input type="date" id="ev-date" class="form-control" value="${defaultDate}" min="2026-06-01" max="2026-06-30" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="ev-type">Event Niche / Category</label>
            <select id="ev-type" class="form-control">
              <option value="study">📝 Personal Study Plan</option>
              <option value="exam">✏️ Exam / Test Date</option>
              <option value="milestone">🗺️ Milestone Deadline</option>
            </select>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 24px;">
            <button type="button" class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="flex: 1;">Cancel</button>
            <button type="submit" class="btn btn-primary" style="flex: 2;">Save Event</button>
          </div>
        </form>
      </div>
    `;

    LeveledApp.openModal(modalHTML);

    const form = document.getElementById('add-event-form');
    form.onsubmit = () => {
      const title = document.getElementById('ev-title').value;
      const date = document.getElementById('ev-date').value;
      const type = document.getElementById('ev-type').value;

      let color = 'var(--primary)';
      if (type === 'exam') color = 'var(--accent)';
      if (type === 'milestone') color = 'var(--color-xp)';

      LeveledApp.state.calendarEvents.push({
        title,
        date,
        type,
        color
      });

      if (title && title.trim().length >= 5) {
        LeveledApp.addXP(30, 'Scheduled study event');
      }
      LeveledApp.closeModal();
      this.render();
    };
  }
};
