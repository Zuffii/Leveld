import { AISimulator } from '../data/ai_simulator.js';

export const Mentor = {
  getIvyBirdHTML(context = 'general') {
    const darkHumorQuotes = {
      'dashboard': "Just touch me already... my therapist said I need attention 💔",
      'portfolio': "Touch me... I know what you did last summer 👁️",
      'admissions': "Click me if you want to get into Harvard (or prison, whatever) ⚖️",
      'profile': "Touch me already... I promise it's not a phishing link 🎣",
      'extracurriculars': "Touch me... or go touch some grass instead 🌿",
      'roadmap': "Touch me... I promise your future isn't as bleak as mine 🔮",
      'general': "Just touch me already... I don't bite (much) 💀"
    };
    const quote = darkHumorQuotes[context] || darkHumorQuotes['general'];

    let positionClass = '';
    if (context === 'extracurriculars' || context === 'roadmap') {
      positionClass = 'ivy-fixed-bottom-right';
    }

    const birdClass = positionClass ? `ivy-mentor-bird ${positionClass}` : 'ivy-mentor-bird';
    const bubbleClass = positionClass ? `ivy-chat-bubble ivy-bubble-${positionClass.replace('ivy-fixed-', '')}` : 'ivy-chat-bubble';

    return `
      <!-- AI Mentor Bird (Ivy) -->
      <div id="ivy-mentor-bird" class="${birdClass}" onclick="document.getElementById('ai-mentor-panel').classList.add('open'); this.classList.add('happy'); setTimeout(() => this.classList.remove('happy'), 2000);" aria-label="Toggle AI Mentor Panel" title="Ask Ivy!">
        <img src="assets/ivy_orange_transparent.png" alt="Ivy the Mentor" class="ivy-body">
        <div class="ivy-eyes-container">
          <div class="ivy-eye left-eye"><div class="ivy-pupil"></div></div>
          <div class="ivy-eye right-eye"><div class="ivy-pupil"></div></div>
        </div>
      </div>
      <!-- Chat Bubble -->
      <div class="${bubbleClass}">
        ${quote}
      </div>
    `;
  },
  
  init() {
    const state = LeveledApp.state;
    state.mentorHistory = state.mentorHistory || [
      { sender: 'mentor', text: `Hi ${state.user?.name || 'Student'}! I'm Ivy, your personal AI advisor. Let me help you optimize your profile for top universities, scholarships, and careers. What should we work on next?` }
    ];
    
    this.renderPanel();
    
    // Bind global hook for external scripts
    window.sendMessageToMentor = (text) => {
      this.handleUserSend(text);
    };
  },

  onOpen() {
    this.scrollToBottom();
    const input = document.getElementById('mentor-chat-input');
    if (input) input.focus();
  },

  renderPanel() {
    const panel = document.getElementById('ai-mentor-panel');
    const state = LeveledApp.state;

    panel.innerHTML = `
      <div class="mentor-header">
        <div class="mentor-title">
          <img src="assets/ivy_orange_transparent.png" style="width: 26px; height: 26px; object-fit: contain; flex-shrink: 0;" alt="Ivy">
          <div>
            <div style="font-family: var(--font-heading); font-weight: 700; font-size: 15px;">Ivy — AI Advisor</div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 500;">Ready to assist</div>
          </div>
        </div>
        <button class="mentor-close-btn" id="mentor-close-btn-panel" aria-label="Close panel">&times;</button>
      </div>

      <!-- Messages Stream -->
      <div class="mentor-messages" id="mentor-messages-container">
        ${state.mentorHistory.map(msg => `
          <div class="chat-msg ${msg.sender}">
            ${this.formatText(msg.text)}
          </div>
        `).join('')}
        <div id="mentor-typing-indicator" style="display: none; align-self: flex-start;" class="chat-msg mentor">
          <span style="display: inline-flex; gap: 4px; padding: 2px 0;">
            <span style="width: 6px; height: 6px; border-radius: var(--border-radius-round); background-color: var(--text-secondary); animation: bounce 0.6s infinite alternate;"></span>
            <span style="width: 6px; height: 6px; border-radius: var(--border-radius-round); background-color: var(--text-secondary); animation: bounce 0.6s infinite alternate 0.2s;"></span>
            <span style="width: 6px; height: 6px; border-radius: var(--border-radius-round); background-color: var(--text-secondary); animation: bounce 0.6s infinite alternate 0.4s;"></span>
          </span>
        </div>
      </div>

      <!-- Suggestion Action Chips -->
      <div class="mentor-chips">
        <div class="mentor-chip" data-cmd="/roadmap">🗺️ Next Action</div>
        <div class="mentor-chip" data-cmd="/universities">🏛️ College Chances</div>
        <div class="mentor-chip" data-cmd="/strengthen">🛡️ Identify Gaps</div>
        <div class="mentor-chip" data-cmd="/essay">✍️ Review Essays</div>
      </div>

      <!-- Chat Input Area -->
      <form id="mentor-chat-form" class="mentor-input-area" onsubmit="event.preventDefault();">
        <input type="text" id="mentor-chat-input" class="form-control" placeholder="Ask your AI mentor..." autocomplete="off" style="font-size: 13px; padding: 10px 14px;">
        <button type="submit" class="btn btn-primary" style="padding: 10px 16px; font-size: 13px;">Send</button>
      </form>
    `;

    this.bindEvents();
    this.scrollToBottom();
  },

  bindEvents() {
    const state = LeveledApp.state;

    // Close Button click
    document.getElementById('mentor-close-btn-panel').onclick = () => {
      document.getElementById('ai-mentor-panel').classList.remove('open');
    };

    // Chat form submit
    const form = document.getElementById('mentor-chat-form');
    form.addEventListener('submit', () => {
      const input = document.getElementById('mentor-chat-input');
      const text = input.value.trim();
      if (text) {
        input.value = '';
        this.handleUserSend(text);
      }
    });

    // Chips clicks
    const chips = document.querySelectorAll('.mentor-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        const cmd = chip.getAttribute('data-cmd');
        let text = '';
        if (cmd === '/roadmap') text = 'What should I do next on my roadmap?';
        else if (cmd === '/universities') text = 'How can I get into my dream universities?';
        else if (cmd === '/strengthen') text = 'What is the biggest weakness in my portfolio and how do I improve my score?';
        else if (cmd === '/essay') text = 'I want to get a critique on my college application essay.';
        
        if (text) this.handleUserSend(text);
      };
    });
  },

  handleUserSend(text) {
    const state = LeveledApp.state;
    
    // Add user message
    state.mentorHistory.push({ sender: 'user', text });
    this.appendMessage('user', text);
    this.scrollToBottom();
    LeveledApp.saveState();

    // Show typing indicator
    const typing = document.getElementById('mentor-typing-indicator');
    if (typing) typing.style.display = 'block';
    this.scrollToBottom();

    // Attempt to call the Claude API route on the server
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text,
        history: state.mentorHistory.slice(0, -1), // exclude the user message we just pushed
        user: state.user
      })
    })
    .then(res => res.json())
    .then(data => {
      // Hide typing indicator
      if (typing) typing.style.display = 'none';

      let response = '';
      if (data && data.reply) {
        response = data.reply;
      } else {
        // Fallback to offline simulator
        response = AISimulator.getMentorResponse(text, state.user, state.mentorHistory);
        // Append a helpful tip/error details to the response
        if (data && data.error) {
          if (data.error.includes("Key not set") || data.error.includes("not set")) {
            response += `\n\n*(💡 Running in offline simulator mode. Set \`export ANTHROPIC_API_KEY=your_key\` in your terminal and restart the server to enable live Claude 3.5 Sonnet responses.)*`;
          } else {
            response += `\n\n*(⚠️ AI connection error: ${data.error})*`;
          }
        }
      }

      // Add mentor response
      state.mentorHistory.push({ sender: 'mentor', text: response });
      this.appendMessage('mentor', response);
      this.scrollToBottom();
      LeveledApp.saveState();

      // Award minor helper XP for asking AI mentor questions (cap at once a day or minor amounts)
      if (text && text.trim().length >= 15) {
        LeveledApp.addXP(20, 'Consulted Ivy');
      }

      // Make Ivy happy!
      const ivy = document.getElementById('ivy-mentor-bird');
      if (ivy) {
        ivy.classList.add('happy');
        setTimeout(() => ivy.classList.remove('happy'), 2000);
      }
    })
    .catch(err => {
      console.warn("API error, falling back to local simulator:", err);
      // Hide typing indicator
      if (typing) typing.style.display = 'none';

      let response = AISimulator.getMentorResponse(text, state.user, state.mentorHistory);
      response += `\n\n*(⚠️ Network connection failed: ${err.message || err})*`;

      // Add mentor response
      state.mentorHistory.push({ sender: 'mentor', text: response });
      this.appendMessage('mentor', response);
      this.scrollToBottom();
      LeveledApp.saveState();

      if (text && text.trim().length >= 15) {
        LeveledApp.addXP(20, 'Consulted Ivy');
      }

      const ivy = document.getElementById('ivy-mentor-bird');
      if (ivy) {
        ivy.classList.add('happy');
        setTimeout(() => ivy.classList.remove('happy'), 2000);
      }
    });
  },

  appendMessage(sender, text) {
    const container = document.getElementById('mentor-messages-container');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.innerHTML = this.formatText(text);
    
    // Insert before typing indicator
    const typing = document.getElementById('mentor-typing-indicator');
    container.insertBefore(msg, typing);
  },

  formatText(text) {
    // Basic Markdown formatting helper for UI chat bubbles
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--primary); font-weight: 600; text-decoration: underline;">$1</a>');
    
    // List support
    formatted = formatted.replace(/(?:^|<br>)-\s(.*?)(?=<br>|$)/g, '$&'); // Bullet lists
    return formatted;
  },

  scrollToBottom() {
    const container = document.getElementById('mentor-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
};
