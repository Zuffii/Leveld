import { AISimulator } from '../data/ai_simulator.js';
import { Mentor } from './Mentor.js';

export const Portfolio = {
  render() {
    const container = document.getElementById('view-portfolio');
    const state = LeveledApp.state;
    const user = state.user;

    if (!user) return;

    // Load initial achievements list if not present
    state.portfolioAchievements = state.portfolioAchievements || [];

    // Load initial bio, customizer status, and styles if not present
    state.portfolioBio = state.portfolioBio || `Add your bio here — tell the world who you are, what drives you, and where you're headed.`;
    state.customizerOpen = state.customizerOpen !== undefined ? state.customizerOpen : false;
    
    // Load initial custom styling values
    state.portfolioStyles = state.portfolioStyles || {};
    const defaultStyles = {
      bgStart: '#fde047',
      bgEnd: '#fef08a',
      webBgStart: '#fffbeb',
      webBgEnd: '#fef3c7',
      textColor: '#1e1b4b',
      borderRadius: '20',
      glassOpacity: '0.75',
      emoji: '🎓',
      coverImage: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=1200&q=80',
      fontFamily: 'Outfit',
      darkMode: true,
      themePreset: 'warm-yellow',
      bgPattern: 'none',
      avatarShape: 'circle',
      avatarBorder: 'solid',
      cardStyle: 'glass',
      cardHover: 'lift',
      buttonShape: 'rounded',
      buttonStyle: 'gradient',
      socialGithub: '',
      socialLinkedin: '',
      socialTwitter: '',
      socialEmail: ''
    };
    for (const key in defaultStyles) {
      if (state.portfolioStyles[key] === undefined) {
        state.portfolioStyles[key] = defaultStyles[key];
      }
    }

    state.portfolioSections = state.portfolioSections || [
      { id: 'competency', title: 'Competency Talents', visible: true, order: 0 },
      { id: 'skills', title: 'Skills & Strengths', visible: true, order: 1 },
      { id: 'capstones', title: 'Featured Capstones', visible: true, order: 2 },
      { id: 'evidence', title: 'Artifacts & Evidence', visible: true, order: 3 },
      { id: 'achievements', title: 'My Achievements', visible: true, order: 4 },
      { id: 'timeline', title: 'Journey Timeline', visible: true, order: 5 }
    ];
    state.portfolioSections.sort((a, b) => a.order - b.order);

    const styles = state.portfolioStyles;

    // Combine manual achievements + active projects + completed milestones
    const timelineEvents = [];

    // Manual ones
    state.portfolioAchievements.forEach(a => {
      timelineEvents.push({
        title: a.title,
        desc: a.detail,
        category: a.category,
        date: a.date,
        type: 'achievement'
      });
    });

    // Active/completed projects
    state.projects.forEach(p => {
      timelineEvents.push({
        title: `💡 Capstone: ${p.title}`,
        desc: p.learnings ? `Learnings & Outcomes: "${p.learnings}"` : `${p.description} (${p.status === 'completed' ? 'Completed' : 'Active building phase'})`,
        category: 'Extracurricular',
        date: p.dateAdded || '2026-06-01',
        type: 'project',
        completed: p.status === 'completed'
      });
    });

    // Completed Milestones
    const milestonesList = AISimulator.generateRoadmap(user);
    state.completedMilestones.forEach(mId => {
      const milestone = milestonesList.find(m => m.id === mId);
      if (milestone) {
        timelineEvents.push({
          title: `🗺️ Milestone: ${milestone.title}`,
          desc: milestone.description,
          category: milestone.category,
          date: '2026-06-05',
          type: 'milestone'
        });
      }
    });

    // Sort chronologically (newest first)
    timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Profile Scores
    const profileScores = AISimulator.calculateProfileScores(user, state.completedMilestones);

    // Compute font family CSS rule
    let fontCSS = 'var(--font-heading)';
    if (styles.fontFamily === 'Inter') fontCSS = 'var(--font-body)';
    else if (styles.fontFamily === 'Georgia') fontCSS = 'Georgia, serif';
    else if (styles.fontFamily === 'Courier New') fontCSS = '"Courier New", Courier, monospace';

    // Compute hero container and badge styles dynamically based on custom styling properties
    const heroStyles = `background: linear-gradient(135deg, ${styles.bgStart} 0%, ${styles.bgEnd} 100%); color: ${styles.textColor}; border: 1px solid rgba(0, 0, 0, 0.05); border-radius: ${styles.borderRadius}px; font-family: ${fontCSS}; transition: all var(--transition-fast);`;
    const themeBadgeStyles = `background-color: ${styles.textColor}; color: ${styles.bgStart === '#09090b' ? '#f43f5e' : 'white'};`;

    // Automatically determine dark mode based on background color luma
    styles.darkMode = this.isColorDark(styles.webBgStart || '#0f172a');
    
    // Compute card style overrides dynamically based on customizer border-radius, cardStyle, and glass opacity
    const isPreviewDark = styles.darkMode;
    const previewBgPrimary = isPreviewDark ? 'rgba(30, 41, 59, 0.45)' : 'rgba(255, 255, 255, 0.55)';
    const previewBgSecondary = isPreviewDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.35)';
    const previewBgTertiary = isPreviewDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)';
    const previewBorderColor = isPreviewDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const cardMutedText = isPreviewDark ? '#94a3b8' : '#64748b';

    const glassBg = isPreviewDark ? 'rgba(30, 41, 59, 0.55)' : 'rgba(255, 255, 255, 0.65)';
    const glassBorder = isPreviewDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
    
    let cardBaseStyle = '';
    if (styles.cardStyle === 'glass') {
      cardBaseStyle = `background-color: ${glassBg}; border: 1px solid ${glassBorder}; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);`;
    } else if (styles.cardStyle === 'flat') {
      cardBaseStyle = `background-color: ${isPreviewDark ? '#1e293b' : '#ffffff'}; border: 1px solid ${isPreviewDark ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.08)'}; box-shadow: none;`;
    } else if (styles.cardStyle === 'metal') {
      cardBaseStyle = `background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); box-shadow: inset 0 1px 1px rgba(255,255,255,0.05); color: #fff;`;
    } else if (styles.cardStyle === 'shadow') {
      cardBaseStyle = `background-color: ${isPreviewDark ? '#0f172a' : '#ffffff'}; border: none; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);`;
    }

    const customCardStyle = `border-radius: ${styles.borderRadius}px; color: ${isPreviewDark ? '#fff' : (styles.textColor || '#1e293b')}; transition: all var(--transition-normal); ${cardBaseStyle}`;

    // Compute avatar shape and border styling
    let avatarShapeCSS = '';
    if (styles.avatarShape === 'circle') {
      avatarShapeCSS = 'border-radius: 50%;';
    } else if (styles.avatarShape === 'squircle') {
      avatarShapeCSS = 'border-radius: 24%;';
    } else if (styles.avatarShape === 'hexagon') {
      avatarShapeCSS = 'clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);';
    } else if (styles.avatarShape === 'diamond') {
      avatarShapeCSS = 'clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);';
    }

    let avatarBorderCSS = '';
    if (styles.avatarBorder === 'none') {
      avatarBorderCSS = 'border: none;';
    } else if (styles.avatarBorder === 'solid') {
      avatarBorderCSS = `border: 4px solid ${styles.darkMode ? '#1e293b' : 'white'};`;
    } else if (styles.avatarBorder === 'double') {
      avatarBorderCSS = `border: 6px double ${styles.darkMode ? '#334155' : '#e2e8f0'}; padding: 2px;`;
    } else if (styles.avatarBorder === 'neon') {
      avatarBorderCSS = `border: 3px solid ${styles.textColor}; box-shadow: 0 0 15px ${styles.textColor}, inset 0 0 10px ${styles.textColor};`;
    }

    // Apply special hex/diamond drop shadow borders as clip-path chops standard borders
    if (styles.avatarShape === 'hexagon' || styles.avatarShape === 'diamond') {
      if (styles.avatarBorder === 'neon') {
        avatarBorderCSS = `filter: drop-shadow(0 0 8px ${styles.textColor}); border: none;`;
      } else if (styles.avatarBorder !== 'none') {
        avatarBorderCSS = `filter: drop-shadow(0 0 4px ${styles.darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.2)'}); border: none;`;
      }
    }

    const avatarElementStyles = `width: 140px; height: 140px; background: linear-gradient(135deg, #a855f7, #6366f1); color: white; display: flex; align-items: center; justify-content: center; font-size: 64px; font-weight: 800; box-shadow: var(--shadow-lg); z-index: 2; ${avatarShapeCSS} ${avatarBorderCSS}`;

    // Compute background pattern CSS overlay
    let patternCSS = '';
    let patternBgSize = '';
    const patternColor = styles.darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
    if (styles.bgPattern === 'dots') {
      patternCSS = `, radial-gradient(circle, ${patternColor} 1.5px, transparent 1.5px)`;
      patternBgSize = 'background-size: auto, 20px 20px;';
    } else if (styles.bgPattern === 'grid') {
      patternCSS = `, linear-gradient(to right, ${patternColor} 1px, transparent 1px), linear-gradient(to bottom, ${patternColor} 1px, transparent 1px)`;
      patternBgSize = 'background-size: auto, 20px 20px, 20px 20px;';
    } else if (styles.bgPattern === 'mesh') {
      const meshColor1 = styles.darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)';
      const meshColor2 = styles.darkMode ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.05)';
      const meshColor3 = styles.darkMode ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.05)';
      patternCSS = `, radial-gradient(at 10% 20%, ${meshColor1} 0px, transparent 50%), radial-gradient(at 90% 10%, ${meshColor2} 0px, transparent 50%), radial-gradient(at 50% 80%, ${meshColor3} 0px, transparent 50%)`;
      patternBgSize = 'background-size: auto, 100% 100%, 100% 100%, 100% 100%;';
    } else if (styles.bgPattern === 'stripes') {
      patternCSS = `, linear-gradient(135deg, ${patternColor} 25%, transparent 25%, transparent 50%, ${patternColor} 50%, ${patternColor} 75%, transparent 75%, transparent)`;
      patternBgSize = 'background-size: auto, 40px 40px;';
    }

    const liveContainerBackground = `background: linear-gradient(135deg, ${styles.webBgStart || '#0f172a'}, ${styles.webBgEnd || '#020617'})${patternCSS}; ${patternBgSize}`;

    // Construct social links markup
    let socialLinksHTML = '';
    const socialLinks = [];

    if (styles.socialGithub) {
      let url = styles.socialGithub;
      if (!url.startsWith('http')) url = `https://github.com/${url.replace('@', '')}`;
      socialLinks.push(`
        <a href="${url}" target="_blank" class="social-icon-btn" title="GitHub" style="color: inherit; opacity: 0.85; display: inline-flex; align-items: center; justify-content: center;">
          <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      `);
    }
    if (styles.socialLinkedin) {
      let url = styles.socialLinkedin;
      if (!url.startsWith('http')) url = `https://linkedin.com/in/${url}`;
      socialLinks.push(`
        <a href="${url}" target="_blank" class="social-icon-btn" title="LinkedIn" style="color: inherit; opacity: 0.85; display: inline-flex; align-items: center; justify-content: center;">
          <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
      `);
    }
    if (styles.socialTwitter) {
      let url = styles.socialTwitter;
      if (!url.startsWith('http')) url = `https://x.com/${url.replace('@', '')}`;
      socialLinks.push(`
        <a href="${url}" target="_blank" class="social-icon-btn" title="Twitter / X" style="color: inherit; opacity: 0.85; display: inline-flex; align-items: center; justify-content: center;">
          <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      `);
    }
    if (styles.socialEmail) {
      let email = styles.socialEmail;
      let url = email.startsWith('mailto:') ? email : `mailto:${email}`;
      socialLinks.push(`
        <a href="${url}" class="social-icon-btn" title="Email" style="color: inherit; opacity: 0.85; display: inline-flex; align-items: center; justify-content: center;">
          <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.037l-9.517 7.713-9.52-7.713zm5.612 6.726l1.306 1.058c.28.228.626.339.97.339.344 0 .69-.111.97-.339l1.306-1.058 5.49 6.784h-15.532l5.49-6.784zm10.283-.797l4.623-3.746v9.458l-4.623-5.712z"/></svg>
        </a>
      `);
    }

    if (socialLinks.length > 0) {
      socialLinksHTML = `
        <div style="display: flex; gap: 16px; align-items: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid ${styles.darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'};" id="social-links-preview-container">
          ${socialLinks.join('')}
        </div>
      `;
    }

    // Set button styling CSS rules
    let btnRadius = '8px';
    if (styles.buttonShape === 'pill') btnRadius = '9999px';
    else if (styles.buttonShape === 'sharp') btnRadius = '0px';

    let btnStyleCSS = '';
    if (styles.buttonStyle === 'gradient') {
      btnStyleCSS = `
        background: linear-gradient(135deg, ${styles.bgStart}, ${styles.bgEnd}) !important;
        color: ${styles.textColor} !important;
        border: 1px solid rgba(0,0,0,0.1) !important;
        font-weight: 700;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      `;
    } else if (styles.buttonStyle === 'glass') {
      btnStyleCSS = `
        background: ${styles.darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)'} !important;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: ${styles.darkMode ? '#fff' : 'inherit'} !important;
        border: 1px solid ${styles.darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} !important;
        font-weight: 600;
      `;
    } else if (styles.buttonStyle === 'outline') {
      btnStyleCSS = `
        background: transparent !important;
        color: ${styles.textColor} !important;
        border: 2px solid ${styles.textColor} !important;
        font-weight: 700;
      `;
    }

    // Hover effect classes
    let hoverCSS = '';
    if (styles.cardHover === 'lift') {
      hoverCSS = `
        #portfolio-live-container .portfolio-card-hoverable:hover,
        .portfolio-card-hoverable:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 20px -8px rgba(0,0,0,0.15) !important;
        }
      `;
    } else if (styles.cardHover === 'zoom') {
      hoverCSS = `
        #portfolio-live-container .portfolio-card-hoverable:hover,
        .portfolio-card-hoverable:hover {
          transform: scale(1.025);
        }
      `;
    } else if (styles.cardHover === 'glow') {
      hoverCSS = `
        #portfolio-live-container .portfolio-card-hoverable:hover,
        .portfolio-card-hoverable:hover {
          box-shadow: 0 0 20px ${styles.textColor}40 !important;
          border-color: ${styles.textColor}80 !important;
        }
      `;
    }

    const dynamicBtnCSS = `
      #portfolio-live-container .preview-btn,
      .preview-btn {
        border-radius: ${btnRadius} !important;
        padding: 8px 16px;
        font-size: 12px;
        cursor: pointer;
        transition: all var(--transition-fast);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        text-decoration: none;
        box-sizing: border-box;
        ${btnStyleCSS}
      }
      #portfolio-live-container .preview-btn:hover,
      .preview-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
    `;

    const completedCapstones = state.projects.filter(p => p.status === 'completed');

    // Gather all evidence artifacts from all projects
    const allEvidence = [];
    state.projects.forEach(p => {
      if (p.evidenceList) {
        p.evidenceList.forEach(e => {
          allEvidence.push({
            ...e,
            projectId: p.id,
            projectTitle: p.title
          });
        });
      }
    });

    container.innerHTML = `
      <div style="display: flex; gap: 24px; max-width: 1400px; margin: 0 auto; align-items: flex-start;">
        
        <!-- LEFT SIDEBAR: CONTROLS -->
        <div style="width: 300px; flex-shrink: 0; position: sticky; top: 20px; display: flex; flex-direction: column; height: calc(100vh - 100px); border-radius: 16px; border: 1px solid var(--border-color); background: var(--bg-primary); box-shadow: var(--shadow-lg); overflow: hidden;">
          
          <!-- Sidebar Header -->
          <div style="padding: 14px 16px 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color); flex-shrink: 0;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <div style="width: 28px; height: 28px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0;">🌐</div>
              <div>
                <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: var(--text-primary);">Portfolio Builder</div>
                <div style="font-size: 10px; color: var(--text-muted);">Design · Customize · Publish</div>
              </div>
              <button class="btn btn-primary" id="btn-export-website" style="font-size: 10px; padding: 5px 10px; margin-left: auto; white-space: nowrap; border-radius: 8px;">🌐 Publish</button>
            </div>
            <!-- Tabs -->
            <div style="display: flex; gap: 2px; background: var(--bg-tertiary); border-radius: 8px; padding: 3px;">
              <button id="tab-builder" onclick="
                document.getElementById('tab-builder').setAttribute('data-active','1');
                document.getElementById('tab-bob').removeAttribute('data-active');
                document.getElementById('panel-builder').style.display='flex';
                document.getElementById('panel-bob').style.display='none';
                this.style.background='var(--bg-primary)'; this.style.color='var(--text-primary)'; this.style.boxShadow='var(--shadow-sm)';
                document.getElementById('tab-bob').style.background='transparent'; document.getElementById('tab-bob').style.color='var(--text-muted)'; document.getElementById('tab-bob').style.boxShadow='none';
              " style="flex:1; font-size:11px; font-weight:700; padding:5px 8px; border:none; border-radius:6px; cursor:pointer; background:var(--bg-primary); color:var(--text-primary); box-shadow:var(--shadow-sm); transition:all 0.15s;">🎨 Design</button>
              <button id="tab-bob" onclick="
                document.getElementById('tab-bob').setAttribute('data-active','1');
                document.getElementById('tab-builder').removeAttribute('data-active');
                document.getElementById('panel-bob').style.display='flex';
                document.getElementById('panel-builder').style.display='none';
                this.style.background='var(--bg-primary)'; this.style.color='var(--text-primary)'; this.style.boxShadow='var(--shadow-sm)';
                document.getElementById('tab-builder').style.background='transparent'; document.getElementById('tab-builder').style.color='var(--text-muted)'; document.getElementById('tab-builder').style.boxShadow='none';
                setTimeout(()=>{ const c=document.getElementById('bob-messages'); if(c) c.scrollTop=c.scrollHeight; },100);
              " style="flex:1; font-size:11px; font-weight:700; padding:5px 8px; border:none; border-radius:6px; cursor:pointer; background:transparent; color:var(--text-muted); box-shadow:none; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:5px;">🔨 Bob <span style="font-size:9px; background:var(--primary); color:white; border-radius:4px; padding:1px 5px;">AI</span></button>
            </div>
          </div>

          <!-- PANEL: Builder Tools (scrollable) -->
          <div id="panel-builder" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:0; padding-bottom:12px;" class="custom-scrollbar">

            <!-- Section: Theme Presets -->
            <div style="padding:16px 16px 0;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">🎨 Theme Presets</div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                <button class="btn btn-secondary btn-preset-theme" data-theme="warm-yellow" style="font-size:10.5px; padding:6px 4px;">☀️ Warm Yellow</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="electric-indigo" style="font-size:10.5px; padding:6px 4px;">⚡ Electric Indigo</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="emerald-sunset" style="font-size:10.5px; padding:6px 4px;">🌅 Emerald Sunset</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="cyberpunk-dark" style="font-size:10.5px; padding:6px 4px;">🤖 Cyberpunk Neon</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="sakura-blossom" style="font-size:10.5px; padding:6px 4px;">🌸 Sakura Blossom</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="ocean-breeze" style="font-size:10.5px; padding:6px 4px;">🌊 Ocean Breeze</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="royal-obsidian" style="font-size:10.5px; padding:6px 4px;">👑 Royal Obsidian</button>
                <button class="btn btn-secondary btn-preset-theme" data-theme="neon-mint" style="font-size:10.5px; padding:6px 4px;">🌿 Neon Mint</button>
                <button class="btn btn-primary btn-preset-theme" data-theme="midnight-dark" style="font-size:10.5px; padding:6px 4px; grid-column:1/-1; background:#0f172a; color:white;">🌙 Dark Mode</button>
              </div>
            </div>

            <div style="height:1px; background:var(--border-color); margin:14px 16px;"></div>

            <!-- Section: Colors -->
            <div style="padding:0 16px;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">🎨 Custom Colors</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${[
                  ['Hero Start', 'picker-bg-start', styles.bgStart],
                  ['Hero End', 'picker-bg-end', styles.bgEnd],
                  ['Page BG Start', 'picker-web-bg-start', styles.webBgStart],
                  ['Page BG End', 'picker-web-bg-end', styles.webBgEnd],
                  ['Text / Accent', 'picker-text', styles.textColor]
                ].map(([label, id, val]) => `
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">${label}</span>
                    <input type="color" id="${id}" value="${val}" style="width:36px; height:24px; padding:1px; border:none; border-radius:6px; cursor:pointer; background:none;">
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="height:1px; background:var(--border-color); margin:14px 16px;"></div>

            <!-- Section: Layout -->
            <div style="padding:0 16px;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">📐 Layout</div>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <div style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">
                  <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>Corner Roundness</span><strong id="lbl-radius">${styles.borderRadius}px</strong></div>
                  <input type="range" id="slider-radius" min="0" max="32" value="${styles.borderRadius}" style="accent-color:var(--primary); width:100%; cursor:pointer;">
                </div>
                <div style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">
                  <div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>Card Opacity</span><strong id="lbl-opacity">${Math.round(styles.glassOpacity * 100)}%</strong></div>
                  <input type="range" id="slider-opacity" min="10" max="100" value="${Math.round(styles.glassOpacity * 100)}" style="accent-color:var(--primary); width:100%; cursor:pointer;">
                </div>
                ${[
                  ['Layout Style', 'select-layout', [['grid','Classic Grid'],['column','Minimal Column']], styles.layout || 'grid'],
                  ['BG Pattern', 'select-pattern', [['none','Solid Gradient'],['dots','Polka Dots'],['grid','Grid Lines'],['mesh','Mesh Gradient'],['stripes','Diagonal Stripes']], styles.bgPattern],
                  ['Card Style', 'select-card-style', [['glass','Modern Glass'],['flat','Solid Flat'],['metal','Dark Metal'],['shadow','Floating Shadow']], styles.cardStyle],
                  ['Card Hover', 'select-card-hover', [['none','Static'],['lift','Lift Up'],['zoom','Zoom In'],['glow','Neon Glow']], styles.cardHover],
                ].map(([label, id, opts, cur]) => `
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <span style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">${label}</span>
                    <select id="${id}" class="form-control" style="width:100%; padding:5px 8px; font-size:11px; height:30px;">
                      ${opts.map(([v,l]) => `<option value="${v}" ${cur===v?'selected':''}>${l}</option>`).join('')}
                    </select>
                  </div>
                `).join('')}
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">Dark Preview</span>
                  <label style="position:relative; display:inline-block; width:36px; height:20px;">
                    <input type="checkbox" id="toggle-dark-mode" ${styles.darkMode ? 'checked' : ''} style="opacity:0; width:0; height:0;">
                    <span class="slider" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:var(--border-color); transition:.3s; border-radius:20px;"></span>
                  </label>
                  <style>#toggle-dark-mode:checked + .slider{background-color:var(--primary);}.slider:before{position:absolute;content:"";height:14px;width:14px;left:3px;bottom:3px;background-color:white;transition:.3s;border-radius:50%;}#toggle-dark-mode:checked + .slider:before{transform:translateX(16px);}</style>
                </div>
              </div>
            </div>

            <div style="height:1px; background:var(--border-color); margin:14px 16px;"></div>

            <!-- Section: Personalization -->
            <div style="padding:0 16px;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">✨ Personalization</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${[
                  ['Font Style', 'select-font', [['Outfit','Outfit'],['Inter','Inter'],['Georgia','Georgia (Serif)'],['Courier New','Courier (Mono)']], styles.fontFamily],
                  ['Greeting Emoji', 'select-emoji', [['👋','Wave 👋'],['🚀','Rocket 🚀'],['💻','Coding 💻'],['🔬','Science 🔬'],['🎓','Grad 🎓'],['🎨','Art 🎨'],['⚡','Spark ⚡'],['🌟','Star 🌟']], styles.emoji],
                  ['Cover Image', 'select-cover', [
                    ['https://images.unsplash.com/photo-1518655048521-f130df041f66?w=1200&q=80','Minimalist Art'],
                    ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80','Space / Tech'],
                    ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80','Ocean Wave'],
                    ['https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80','Cyberpunk City'],
                    ['none','None (Gradient Only)']
                  ], styles.coverImage],
                  ['Avatar Shape', 'select-avatar-shape', [['circle','Circle'],['squircle','Squircle'],['hexagon','Hexagon'],['diamond','Diamond']], styles.avatarShape],
                  ['Avatar Border', 'select-avatar-border', [['none','None'],['solid','Sleek Solid'],['double','Double Ring'],['neon','Neon Glow']], styles.avatarBorder],
                  ['Button Shape', 'select-button-shape', [['pill','Pill'],['rounded','Rounded'],['sharp','Sharp']], styles.buttonShape],
                  ['Button Style', 'select-button-style', [['gradient','Gradient'],['glass','Glassmorphic'],['outline','Outline']], styles.buttonStyle],
                ].map(([label, id, opts, cur]) => `
                  <div style="display:flex; flex-direction:column; gap:4px;">
                    <span style="font-size:11.5px; font-weight:600; color:var(--text-secondary);">${label}</span>
                    <select id="${id}" class="form-control" style="width:100%; padding:5px 8px; font-size:11px; height:30px;">
                      ${opts.map(([v,l]) => `<option value="${v}" ${cur===v?'selected':''}>${l}</option>`).join('')}
                    </select>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="height:1px; background:var(--border-color); margin:14px 16px;"></div>

            <!-- Section: Social Profiles -->
            <div style="padding:0 16px;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">🔗 Social Links</div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${[
                  ['input-social-github', 'GitHub username or URL', styles.socialGithub || '', 'text'],
                  ['input-social-linkedin', 'LinkedIn username or URL', styles.socialLinkedin || '', 'text'],
                  ['input-social-twitter', 'Twitter / X @username', styles.socialTwitter || '', 'text'],
                  ['input-social-email', 'Contact email address', styles.socialEmail || '', 'email'],
                ].map(([id, ph, val, type]) => `
                  <input type="${type}" id="${id}" class="form-control" placeholder="${ph}" value="${val}" style="font-size:11px; height:30px; padding:5px 8px;">
                `).join('')}
              </div>
            </div>

            <div style="height:1px; background:var(--border-color); margin:14px 16px;"></div>

            <!-- Section: Section Manager -->
            <div style="padding:0 16px 16px;">
              <div style="font-size:10px; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">🗂️ Section Manager</div>
              <div id="section-manager-list" style="display:flex; flex-direction:column; gap:6px;">
                ${state.portfolioSections.map((sec) => `
                  <div class="section-manager-item" data-id="${sec.id}" style="display:flex; align-items:center; gap:8px; background:var(--bg-secondary); padding:8px 10px; border-radius:10px; border:1px solid var(--border-color);">
                    <input type="checkbox" class="sec-toggle" data-id="${sec.id}" ${sec.visible ? 'checked' : ''} style="cursor:pointer; accent-color:var(--primary); flex-shrink:0;">
                    <input type="text" class="sec-title-input" data-id="${sec.id}" value="${sec.title}" style="font-size:11.5px; font-weight:600; border:none; background:transparent; width:100%; color:var(--text-primary); min-width:0;">
                    <div style="display:flex; flex-direction:column; gap:1px; flex-shrink:0;">
                      <button class="btn-sec-up" data-id="${sec.id}" style="border:none; background:none; cursor:pointer; font-size:9px; color:var(--text-muted); padding:0; line-height:1;">▲</button>
                      <button class="btn-sec-down" data-id="${sec.id}" style="border:none; background:none; cursor:pointer; font-size:9px; color:var(--text-muted); padding:0; line-height:1;">▼</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- PANEL: Bob the Builder AI -->
          <div id="panel-bob" style="flex:1; overflow:hidden; display:none; flex-direction:column;">
            <!-- Bob Header -->
            <div style="padding:12px 16px; border-bottom:1px solid var(--border-color); display:flex; align-items:center; gap:10px; flex-shrink:0; background:var(--bg-primary);">
              <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,#f59e0b,#ef4444); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">🔨</div>
              <div style="flex:1; min-width:0;">
                <div style="font-family:var(--font-heading); font-size:13px; font-weight:800; color:var(--text-primary);">Bob the Builder</div>
                <div style="font-size:10px; color:var(--text-muted);">AI Portfolio Design Assistant</div>
              </div>
              <div style="width:7px; height:7px; border-radius:50%; background:#10b981; box-shadow:0 0 6px #10b981; flex-shrink:0;" title="Online"></div>
            </div>

            <!-- Bob Messages -->
            <div id="bob-messages" style="flex:1; overflow-y:auto; padding:14px 12px; display:flex; flex-direction:column; gap:10px;" class="custom-scrollbar">
              ${(state.bobHistory || [{ sender:'bob', text:`Hey ${user.name}! I'm **Bob** 🔨 — your portfolio design assistant. I can help you:\n\n• Write a compelling bio\n• Choose the right theme & colors\n• Suggest what sections to showcase\n• Make your portfolio stand out to colleges\n\nWhat do you want to build today?` }]).map(msg => `
                <div style="display:flex; flex-direction:column; gap:4px; align-items:${msg.sender==='bob'?'flex-start':'flex-end'};">
                  ${msg.sender==='bob' ? `<div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
                    <div style="width:18px; height:18px; border-radius:5px; background:linear-gradient(135deg,#f59e0b,#ef4444); display:flex; align-items:center; justify-content:center; font-size:10px;">🔨</div>
                    <span style="font-size:10px; font-weight:700; color:var(--text-muted);">Bob</span>
                  </div>` : ''}
                  <div style="max-width:85%; padding:9px 12px; border-radius:${msg.sender==='bob'?'4px 12px 12px 12px':'12px 4px 12px 12px'}; font-size:12px; line-height:1.55; font-weight:500; background:${msg.sender==='bob'?'var(--bg-secondary)':'linear-gradient(135deg, var(--primary), var(--secondary))'}; color:${msg.sender==='bob'?'var(--text-primary)':'white'}; border:${msg.sender==='bob'?'1px solid var(--border-color)':'none'};">
                    ${msg.text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>')}
                  </div>
                </div>
              `).join('')}
              <div id="bob-typing" style="display:none; align-items:center; gap:4px; padding:8px 10px; background:var(--bg-secondary); border-radius:4px 12px 12px 12px; width:fit-content; border:1px solid var(--border-color);">
                <span style="width:5px;height:5px;border-radius:50%;background:var(--text-muted);animation:bounce 0.6s infinite alternate;display:inline-block;"></span>
                <span style="width:5px;height:5px;border-radius:50%;background:var(--text-muted);animation:bounce 0.6s 0.2s infinite alternate;display:inline-block;"></span>
                <span style="width:5px;height:5px;border-radius:50%;background:var(--text-muted);animation:bounce 0.6s 0.4s infinite alternate;display:inline-block;"></span>
              </div>
            </div>

            <!-- Bob Quick Chips -->
            <div style="padding:8px 12px; display:flex; gap:6px; flex-wrap:wrap; border-top:1px solid var(--border-color); flex-shrink:0;">
              <button class="bob-chip" data-msg="Write me a professional bio for my portfolio" style="font-size:10px; font-weight:700; padding:4px 8px; border-radius:100px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-secondary); cursor:pointer;">✍️ Bio help</button>
              <button class="bob-chip" data-msg="What theme and colors would suit my profile best?" style="font-size:10px; font-weight:700; padding:4px 8px; border-radius:100px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-secondary); cursor:pointer;">🎨 Best theme</button>
              <button class="bob-chip" data-msg="What sections should I highlight to impress admissions?" style="font-size:10px; font-weight:700; padding:4px 8px; border-radius:100px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-secondary); cursor:pointer;">📋 What to show</button>
              <button class="bob-chip" data-msg="How do I make my portfolio stand out?" style="font-size:10px; font-weight:700; padding:4px 8px; border-radius:100px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-secondary); cursor:pointer;">⭐ Stand out</button>
            </div>

            <!-- Bob Input -->
            <form id="bob-chat-form" style="padding:10px 12px; display:flex; gap:8px; flex-shrink:0; border-top:1px solid var(--border-color);" onsubmit="event.preventDefault();">
              <input type="text" id="bob-chat-input" placeholder="Ask Bob to help design..." style="flex:1; padding:8px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary); font-size:11.5px; outline:none; font-family:inherit;">
              <button type="submit" style="padding:8px 14px; border-radius:10px; border:none; background:linear-gradient(135deg,#f59e0b,#ef4444); color:white; font-size:12px; font-weight:700; cursor:pointer;">↑</button>
            </form>
          </div>

        </div>



        <!-- RIGHT CONTENT: LIVE PAGE PREVIEW -->
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 16px;">
          
          <div style="display: flex; justify-content: flex-end; margin-bottom: 4px;">
            <button class="btn btn-secondary" id="btn-upload-achievement" style="font-size: 12px; padding: 8px 16px;">+ Add Award / Cert</button>
          </div>

          <div class="glass-card" style="height: calc(100vh - 120px); display: flex; flex-direction: column; padding: 0; overflow: hidden; border: 1px solid var(--border-color); background-color: var(--bg-secondary); box-shadow: var(--shadow-lg);">
            <!-- Mock Browser Address Bar -->
            <div style="background-color: var(--bg-tertiary); border-bottom: 1px solid var(--border-color); padding: 12px 16px; display: flex; align-items: center; gap: 12px; flex-shrink: 0;">
              <div style="display: flex; gap: 6px;">
                <span style="width: 12px; height: 12px; border-radius: var(--border-radius-round); background-color: #ef4444; display: inline-block;"></span>
                <span style="width: 12px; height: 12px; border-radius: var(--border-radius-round); background-color: #f59e0b; display: inline-block;"></span>
                <span style="width: 12px; height: 12px; border-radius: var(--border-radius-round); background-color: #10b981; display: inline-block;"></span>
              </div>
              <div style="background-color: var(--input-bg); flex: 1; border-radius: 6px; border: 1px solid var(--border-color); text-align: center; font-size: 12px; font-family: monospace; color: var(--text-muted); padding: 6px;">
                leveld.me/showcase/${user.name.toLowerCase().replace(/\s+/g, '-')}
              </div>
            </div>

            <!-- Live Page Container -->
          ${styles.layout === 'column' ? '<style>#portfolio-live-container .grid-layout-block { grid-template-columns: 1fr !important; }</style>' : ''}
          <div id="portfolio-live-container" class="custom-scrollbar" style="flex: 1; overflow-y: auto; padding: 40px; display: flex; flex-direction: column; gap: 40px; ${liveContainerBackground} color: ${styles.darkMode ? '#f8fafc' : (styles.textColor || '#1e293b')}; transition: background 0.3s, color 0.3s; position: relative;">
            
            <!-- Dynamic Customizer Styles Injection -->
            <style id="portfolio-customizer-injected-styles">
              ${hoverCSS}
              ${dynamicBtnCSS}
              #portfolio-live-container .social-icon-btn:hover,
              .social-icon-btn:hover {
                opacity: 1 !important;
                transform: scale(1.15) !important;
              }
              #portfolio-live-container .social-icon-btn,
              .social-icon-btn {
                transition: opacity 0.2s, transform 0.2s !important;
              }
              #portfolio-live-container .scroll-reveal-item,
              .scroll-reveal-item {
                opacity: 0;
                transform: translateY(24px);
                transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
                will-change: transform, opacity;
              }
              #portfolio-live-container .scroll-reveal-item.reveal-in-view,
              .scroll-reveal-item.reveal-in-view {
                opacity: 1 !important;
                transform: translateY(0) !important;
              }
            </style>
            
            <!-- Hero Personal Greeting Block -->
            <div style="padding: 48px 40px; display: flex; justify-content: space-between; align-items: center; position: relative; min-height: 270px; ${heroStyles}" id="portfolio-hero-block"
              onmouseenter="document.getElementById('hero-edit-toolbar').style.opacity='1'; document.getElementById('hero-edit-toolbar').style.pointerEvents='auto';"
              onmouseleave="document.getElementById('hero-edit-toolbar').style.opacity='0'; document.getElementById('hero-edit-toolbar').style.pointerEvents='none';">
              
              <!-- Overflow wrapper for the dot pattern (keeps overflow hidden scoped) -->
              <div style="position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none;">
                <div style="position: absolute; inset: 0; opacity: 0.08; background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 16px 16px;"></div>
              </div>

              <!-- Floating web-builder-style Edit Toolbar -->
              <div id="hero-edit-toolbar" style="position: absolute; top: -18px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; background: #1e293b; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 5px 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.35); z-index: 30; opacity: 0; pointer-events: none; transition: opacity 0.2s; white-space: nowrap;">
                <span style="font-size: 10px; font-weight: 700; color: #64748b; display: flex; align-items: center; gap: 5px; padding-right: 6px; border-right: 1px solid rgba(255,255,255,0.08);">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; display:inline-block;"></span> Hero
                </span>
                <button id="btn-edit-portfolio-bio" style="font-size: 10px; font-weight: 700; color: #e2e8f0; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); padding: 3px 10px; border-radius: 6px; cursor: pointer;">✏️ Edit Bio</button>
                <button onclick="
                  const cur = document.getElementById('span-welcome-emoji').textContent.trim();
                  const emojis = ['👋','🚀','💻','🔬','🎓','🎨','⚡','🌟'];
                  const next = emojis[(emojis.indexOf(cur)+1) % emojis.length];
                  document.getElementById('span-welcome-emoji').textContent = next;
                  LeveledApp.state.portfolioStyles.emoji = next;
                  LeveledApp.saveState();
                  if(document.getElementById('select-emoji')) document.getElementById('select-emoji').value = next;
                " style="font-size: 10px; font-weight: 700; color: #e2e8f0; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); padding: 3px 10px; border-radius: 6px; cursor: pointer;">😀 Cycle Emoji</button>
              </div>

              <div style="flex: 1; z-index: 2; display: flex; flex-direction: column; gap: 14px; text-align: left;" class="scroll-reveal-item">
                <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; padding: 5px 14px; border-radius: 100px; width: max-content; ${themeBadgeStyles} display: inline-flex; align-items: center; gap: 6px;">
                  <span style="width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.5; flex-shrink: 0;"></span>
                  Student Spotlight
                </span>
                
                <h1 style="font-family: inherit; font-size: 38px; font-weight: 800; line-height: 1.1; margin: 0; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                  Hi! <span id="span-welcome-emoji">${styles.emoji}</span> I'm ${user.name}
                </h1>
                
                <!-- Click-to-edit bio (Webflow/Squarespace inline editing style) -->
                <div id="bio-display-wrap" style="max-width: 520px;">
                  <p id="bio-display-text" style="font-size: 14.5px; font-weight: 500; line-height: 1.6; opacity: 0.9; margin: 0; padding: 6px 8px; border-radius: 8px; border: 1.5px dashed transparent; cursor: text; transition: border-color 0.2s, background 0.2s;" title="Click to edit"
                    onmouseover="this.style.borderColor='rgba(255,255,255,0.45)'; this.style.background='rgba(0,0,0,0.07)';"
                    onmouseout="this.style.borderColor='transparent'; this.style.background='transparent';"
                    onclick="document.getElementById('bio-display-wrap').style.display='none'; const w=document.getElementById('bio-editor-wrap'); w.style.display='flex'; w.querySelector('textarea').focus();">
                    ${state.portfolioBio}
                  </p>
                </div>
                <div id="bio-editor-wrap" style="display: none; flex-direction: column; gap: 8px; max-width: 520px;">
                  <textarea id="bio-inline-textarea" rows="3" style="font-size: 14px; line-height: 1.6; font-family: inherit; font-weight: 500; width: 100%; padding: 10px 12px; border-radius: 10px; border: 2px solid rgba(255,255,255,0.5); background: rgba(0,0,0,0.18); color: inherit; resize: vertical; outline: none; box-sizing: border-box;">${state.portfolioBio}</textarea>
                  <div style="display: flex; gap: 8px;">
                    <button id="btn-save-bio-inline" style="font-size: 11px; font-weight: 700; padding: 6px 16px; border-radius: 8px; border: none; background: rgba(255,255,255,0.92); color: #1e293b; cursor: pointer;">✓ Save</button>
                    <button onclick="document.getElementById('bio-editor-wrap').style.display='none'; document.getElementById('bio-display-wrap').style.display='block';" style="font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.15); color: inherit; cursor: pointer;">✕ Cancel</button>
                  </div>
                </div>

                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <span style="font-size: 12px; background-color: rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; gap: 6px;">
                    🏫 ${user.school}
                  </span>
                  <span style="font-size: 12px; background-color: rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; gap: 6px;">
                    🎓 Grade ${user.grade}
                  </span>
                  <span style="font-size: 12px; background-color: rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; gap: 6px;">
                    📍 ${user.country}
                  </span>
                </div>

                ${socialLinksHTML}
              </div>

              <!-- Large Avatar / Face Emblem -->
              <div style="${avatarElementStyles}; margin-left: 32px; flex-shrink: 0;" class="scroll-reveal-item">
                ${user.name.charAt(0).toUpperCase()}
              </div>

            </div>

            <!-- Profile Dashboard: Talents & Skill classification -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; align-items: start;" class="fit-grid grid-layout-block">
              
              <!-- Competency Scores & Profile Strength -->
              <div class="portfolio-card-hoverable scroll-reveal-item" style="padding: 24px; ${customCardStyle}">
                <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; color: inherit;">
                  <span>📊</span> Competency Talents
                </h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; text-align: center;">
                  <div style="background-color: ${previewBgPrimary}; padding: 12px; border-radius: ${styles.borderRadius / 1.5}px; border: 1px solid ${previewBorderColor};">
                    <div style="font-size: 20px; font-weight: 800; color: var(--primary);">${profileScores.overall}/100</div>
                    <div style="font-size: 11px; font-weight: 700; color: ${cardMutedText}; text-transform: uppercase; margin-top: 4px;">Overall Score</div>
                  </div>
                  <div style="background-color: ${previewBgPrimary}; padding: 12px; border-radius: ${styles.borderRadius / 1.5}px; border: 1px solid ${previewBorderColor};">
                    <div style="font-size: 20px; font-weight: 800; color: var(--secondary);">${profileScores.technical}/100</div>
                    <div style="font-size: 11px; font-weight: 700; color: ${cardMutedText}; text-transform: uppercase; margin-top: 4px;">Tech &amp; Build</div>
                  </div>
                  <div style="background-color: ${previewBgPrimary}; padding: 12px; border-radius: ${styles.borderRadius / 1.5}px; border: 1px solid ${previewBorderColor};">
                    <div style="font-size: 20px; font-weight: 800; color: var(--color-xp);">${profileScores.research}/100</div>
                    <div style="font-size: 11px; font-weight: 700; color: ${cardMutedText}; text-transform: uppercase; margin-top: 4px;">Academic Res.</div>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px; border-top: 1px solid ${previewBorderColor}; padding-top: 16px;">
                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 600; margin-bottom: 4px; color: inherit;">
                      <span>🏛️ Leadership &amp; Impact</span> <span>${profileScores.leadership}/100</span>
                    </div>
                    <div style="width: 100%; height: 6px; background-color: ${previewBgPrimary}; border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${profileScores.leadership}%; height: 100%; background: var(--primary); border-radius: var(--border-radius-sm);"></div>
                    </div>
                  </div>

                  <div>
                    <div style="display: flex; justify-content: space-between; font-size: 11.5px; font-weight: 600; margin-bottom: 4px; color: inherit;">
                      <span>✨ Extracurricular Engagement</span> <span>${profileScores.impact}/100</span>
                    </div>
                    <div style="width: 100%; height: 6px; background-color: ${previewBgPrimary}; border-radius: var(--border-radius-sm); overflow: hidden;">
                      <div style="width: ${profileScores.impact}%; height: 100%; background: var(--secondary); border-radius: var(--border-radius-sm);"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Core Skills classification -->
              <div class="portfolio-card-hoverable scroll-reveal-item" style="padding: 24px; ${customCardStyle}">
                <h4 style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; color: inherit;">
                  <span>🛡️</span> Skills &amp; Competencies
                </h4>
                
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${user.skills.map(skill => `
                    <div style="background-color: ${previewBgPrimary}; border: 1px solid ${previewBorderColor}; padding: 8px 16px; border-radius: var(--border-radius-xl); font-size: 12.5px; font-weight: 600; display: flex; align-items: center; gap: 8px; color: inherit;">
                      <span style="width: 8px; height: 8px; border-radius: var(--border-radius-round); background-color: var(--secondary);"></span>
                      ${skill}
                    </div>
                  `).join('')}
                  ${user.academicStrengths.map(subject => `
                    <div style="background-color: ${previewBgPrimary}; border: 1px solid ${previewBorderColor}; padding: 8px 16px; border-radius: var(--border-radius-xl); font-size: 12.5px; font-weight: 600; display: flex; align-items: center; gap: 8px; color: inherit;">
                      <span style="width: 8px; height: 8px; border-radius: var(--border-radius-round); background-color: var(--primary);"></span>
                      ${subject} (Academic)
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- Featured Capstone Showcase Gallery -->
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;" class="scroll-reveal-item">
                <span>💡</span> Featured Capstone Showcase
              </h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;" class="grid-layout-block">
                ${completedCapstones.length > 0 ? completedCapstones.map(proj => `
                  <div class="portfolio-card-hoverable scroll-reveal-item" style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; ${customCardStyle}">
                    <div>
                      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px;">
                        <span style="font-weight: 800; color: var(--secondary); text-transform: uppercase;">${proj.type} Project</span>
                        <span style="font-weight: 700; color: #10b981; text-transform: uppercase;">✓ Completed</span>
                      </div>
                      <h5 style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: inherit; margin-bottom: 8px;">${proj.title}</h5>
                      <p style="font-size: 12.5px; color: ${cardMutedText}; line-height: 1.45; margin-bottom: 16px;">${proj.description}</p>
                    </div>

                    <div style="background-color: ${previewBgPrimary}; border: 1px solid ${previewBorderColor}; border-radius: ${styles.borderRadius / 2}px; padding: 12px; font-size: 12px;">
                      <strong style="color: var(--primary); display: block; margin-bottom: 4px;">Key Outcomes &amp; Learnings:</strong>
                      <span style="color: ${cardMutedText}; font-style: italic;">"${proj.learnings}"</span>
                    </div>
                  </div>
                `).join('') : `
                  <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: ${previewBgSecondary}; border-radius: 6px; border: 1px solid ${previewBorderColor};">
                    <p style="color: ${cardMutedText}; font-size: 13.5px; margin-bottom: 12px;">No completed Capstone activities showcased yet.</p>
                    <a href="#extracurriculars" class="btn btn-primary" style="font-size: 11.5px;">Complete Extracurricular Activities</a>
                  </div>
                `}
              </div>
            </div>

            <!-- Artifacts & Evidence Gallery -->
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;" class="scroll-reveal-item">
                <span>📎</span> Artifacts &amp; Evidence Gallery
              </h4>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;" class="grid-layout-block">
                ${allEvidence.length > 0 ? allEvidence.map(e => {
                  let previewHTML = '';
                  let icon = '📎';
                  let typeLabel = 'Evidence';
                  if (e.type === 'photo') {
                    icon = '🖼️';
                    typeLabel = 'Photo Showcase';
                    previewHTML = `
                      <div style="width: 100%; height: 140px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background-color: ${previewBgTertiary};">
                        <img src="${e.url}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/600x400/171b38/ffffff?text=Image+Not+Found'">
                      </div>
                    `;
                  } else if (e.type === 'pdf') {
                    icon = '📄';
                    typeLabel = 'PDF Document';
                    previewHTML = `
                      <div style="width: 100%; height: 140px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #ef4444;">
                        <span style="font-size: 48px;">📄</span>
                        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase;">PDF Document</span>
                      </div>
                    `;
                  } else if (e.type === 'link') {
                    icon = '🔗';
                    typeLabel = 'Reference Link';
                    previewHTML = `
                      <div style="width: 100%; height: 140px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.2)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #818cf8;">
                        <span style="font-size: 48px;">🔗</span>
                        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase;">External Resource</span>
                      </div>
                    `;
                  } else if (e.type === 'log') {
                    icon = '📝';
                    typeLabel = 'Learning Log';
                    previewHTML = `
                      <div style="width: 100%; height: 140px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.2)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #f59e0b;">
                        <span style="font-size: 48px;">📝</span>
                        <span style="font-size: 11px; font-weight: 700; text-transform: uppercase;">Learning Log</span>
                      </div>
                    `;
                  }

                  return `
                    <div class="portfolio-card-hoverable scroll-reveal-item" style="display: flex; flex-direction: column; justify-content: space-between; padding: 16px; ${customCardStyle}">
                      <div>
                        ${previewHTML}
                        <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 6px; color: ${cardMutedText};">
                          <span style="font-weight: 800; text-transform: uppercase; color: var(--primary);">${icon} ${typeLabel}</span>
                          <span>${e.date}</span>
                        </div>
                        <h5 style="font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: inherit; margin-bottom: 6px;">${e.title}</h5>
                        <p style="font-size: 12px; color: ${cardMutedText}; line-height: 1.4; margin-bottom: 12px;">${e.description}</p>
                      </div>
                      
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="font-size: 11px; color: ${cardMutedText};">
                          Project: <strong style="color: inherit;">${e.projectTitle}</strong>
                        </div>
                        <div style="display: flex; gap: 8px;">
                          <a href="${e.url}" target="_blank" class="btn btn-secondary preview-btn" style="font-size: 10px; padding: 4px 10px; text-decoration: none;">View ↗</a>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('') : `
                  <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: ${previewBgSecondary}; border-radius: 6px; border: 1px solid ${previewBorderColor};">
                    <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 12px;">No artifacts or evidence uploaded yet.</p>
                    <a href="#extracurriculars" class="btn btn-primary" style="font-size: 11.5px;">Add Evidence to Extracurriculars</a>
                  </div>
                `}
              </div>
            </div>

            <!-- Personal Achievement Media Gallery -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
                <h3 style="font-family: inherit; font-size: 24px; font-weight: 700; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 16px; margin-top: 40px; display: flex; align-items: center; gap: 8px;" class="scroll-reveal-item">
                  <span>🏅</span> My Achievements & Media
                </h4>
                <button class="btn preview-btn" id="btn-add-media-achievement" style="font-size: 11px; padding: 8px 16px; background: linear-gradient(135deg, var(--primary), var(--secondary));">+ Add Achievement</button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;" class="grid-layout-block">
                ${(state.portfolioAchievements || []).filter(a => a.media && a.media.length > 0).length > 0 ? 
                  state.portfolioAchievements.filter(a => a.media && a.media.length > 0).map(ach => {
                    const mediaItems = ach.media || [];
                    const firstMedia = mediaItems[0];
                    let previewBlock = '';
                    if (firstMedia && firstMedia.type === 'image') {
                      previewBlock = `
                        <div style="width: 100%; height: 160px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background-color: ${previewBgTertiary};">
                          <img src="${firstMedia.url}" alt="${ach.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/600x400/171b38/ffffff?text=Image'">
                        </div>
                      `;
                    } else if (firstMedia && firstMedia.type === 'pdf') {
                      previewBlock = `
                        <div style="width: 100%; height: 160px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.15)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #ef4444;">
                          <span style="font-size: 40px;">📄</span>
                          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase;">${firstMedia.name || 'PDF Document'}</span>
                        </div>
                      `;
                    } else if (firstMedia && firstMedia.type === 'link') {
                      previewBlock = `
                        <div style="width: 100%; height: 160px; border-radius: ${styles.borderRadius / 2}px; overflow: hidden; margin-bottom: 12px; border: 1px solid ${previewBorderColor}; background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.15)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--primary-light);">
                          <span style="font-size: 40px;">🔗</span>
                          <span style="font-size: 10px; font-weight: 700; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${firstMedia.url}</span>
                        </div>
                      `;
                    }

                    const categoryColors = {
                      'Award': '#f59e0b', 'Certificate': '#3b82f6', 'Volunteer': '#10b981',
                      'Leadership': '#8b5cf6', 'Sports': '#ef4444', 'Music': '#ec4899',
                      'Arts': '#f97316', 'STEM': '#06b6d4', 'Other': '#6b7280'
                    };
                    const catColor = categoryColors[ach.category] || 'var(--primary)';

                    return `
                      <div class="portfolio-card-hoverable ach-media-card scroll-reveal-item" style="display: flex; flex-direction: column; justify-content: space-between; padding: 16px; ${customCardStyle}">
                        ${previewBlock}
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px; margin-bottom: 6px;">
                          <span style="font-weight: 800; text-transform: uppercase; color: ${catColor}; display: flex; align-items: center; gap: 4px;">
                            <span style="width: 6px; height: 6px; border-radius: 50%; background: ${catColor}; display: inline-block;"></span>
                            ${ach.category}
                          </span>
                          <span style="color: ${cardMutedText};">${ach.date}</span>
                        </div>
                        <h5 style="font-family: var(--font-heading); font-size: 14px; font-weight: 700; color: inherit; margin-bottom: 6px;">${ach.title}</h5>
                        <p style="font-size: 12px; color: ${cardMutedText}; line-height: 1.4; margin-bottom: 10px;">${ach.detail}</p>
                        ${mediaItems.length > 1 ? `<span style="font-size: 10px; color: ${cardMutedText}; font-weight: 600;">+${mediaItems.length - 1} more attachment${mediaItems.length > 2 ? 's' : ''}</span>` : ''}
                        <div style="display: flex; gap: 8px; margin-top: 8px;">
                          ${mediaItems.filter(m => m.type === 'link' || m.type === 'image').slice(0, 1).map(m => `
                            <a href="${m.url}" target="_blank" class="btn btn-secondary preview-btn" style="font-size: 10px; padding: 4px 10px; text-decoration: none; display: flex; align-items: center; gap: 4px;">View ↗</a>
                          `).join('')}
                          <button class="btn btn-secondary btn-delete-ach" data-ach-id="${ach.id}" style="font-size: 10px; padding: 4px 10px; color: #ef4444; border-color: rgba(239,68,68,0.25);">🗑️</button>
                        </div>
                      </div>
                    `;
                  }).join('')
                : `
                  <div class="scroll-reveal-item" style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; ${customCardStyle}">
                    <div style="font-size: 40px; margin-bottom: 12px;">🏅</div>
                    <p style="color: inherit; font-size: 14px; margin-bottom: 4px; font-weight: 600;">No achievement media yet</p>
                    <p style="color: ${cardMutedText}; font-size: 12px; margin-bottom: 20px;">Add your sports wins, music recitals, art pieces, certificates, and more!</p>
                    <button class="btn btn-primary btn-add-media-achievement-empty preview-btn" style="font-size: 12px; padding: 10px 24px; background: linear-gradient(135deg, var(--primary), var(--secondary));">+ Add Your First Achievement</button>
                  </div>
                `}
              </div>
            </div>

            <!-- Journey & Achievements Timeline -->
            <div>
              <h4 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin-bottom: 24px; display: flex; align-items: center; gap: 8px;" class="scroll-reveal-item">
                <span>🗺️</span> Experience &amp; Journey Timeline
              </h4>

              <div class="portfolio-timeline" style="position: relative; padding-left: 24px; display: flex; flex-direction: column; gap: 20px;">
                <!-- Timeline vertical line -->
                <div style="position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background-color: ${previewBorderColor};"></div>

                ${timelineEvents.length > 0 ? timelineEvents.map(event => `
                  <div style="position: relative;">
                    <!-- Dot -->
                    <div style="position: absolute; left: -20px; top: 6px; width: 10px; height: 10px; border-radius: var(--border-radius-round); background-color: var(--primary); border: 2px solid ${previewBgSecondary};"></div>
                    
                    <div class="portfolio-card-hoverable scroll-reveal-item" style="padding: 16px; margin-left: 10px; ${customCardStyle}">
                      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                        <span style="font-weight: 800; color: var(--primary); text-transform: uppercase;">${event.category}</span>
                        <span style="color: ${cardMutedText};">${event.date}</span>
                      </div>
                      <h5 style="font-size: 14.5px; font-weight: 700; color: inherit;">${event.title}</h5>
                      <p style="font-size: 12.5px; color: ${cardMutedText}; margin-top: 4px; line-height: 1.4;">${event.desc}</p>
                    </div>
                  </div>
                `).join('') : `
                  <p style="color: ${cardMutedText}; font-size: 13.5px; padding: 20px 0;">No journey timeline entries listed. Start working on your milestones to populate your timeline!</p>
                `}
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
    const styles = state.portfolioStyles;

    const exportBtn = document.getElementById('btn-export-website');
    if (exportBtn) exportBtn.onclick = () => this.exportWebsite();

    document.querySelectorAll('.sec-toggle').forEach(chk => {
      chk.onchange = (e) => {
        const id = e.target.dataset.id;
        const sec = state.portfolioSections.find(s => s.id === id);
        if (sec) sec.visible = e.target.checked;
        LeveledApp.saveState();
        this.render();
      };
    });

    document.querySelectorAll('.sec-title-input').forEach(inp => {
      inp.onchange = (e) => {
        const id = e.target.dataset.id;
        const sec = state.portfolioSections.find(s => s.id === id);
        if (sec) sec.title = e.target.value;
        LeveledApp.saveState();
        this.render(); // Need render to update the preview titles
      };
    });

    document.querySelectorAll('.btn-sec-up').forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.dataset.id;
        const idx = state.portfolioSections.findIndex(s => s.id === id);
        if (idx > 0) {
          const temp = state.portfolioSections[idx].order;
          state.portfolioSections[idx].order = state.portfolioSections[idx-1].order;
          state.portfolioSections[idx-1].order = temp;
          state.portfolioSections.sort((a, b) => a.order - b.order);
          LeveledApp.saveState();
          this.render();
        }
      };
    });

    document.querySelectorAll('.btn-sec-down').forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.dataset.id;
        const idx = state.portfolioSections.findIndex(s => s.id === id);
        if (idx < state.portfolioSections.length - 1) {
          const temp = state.portfolioSections[idx].order;
          state.portfolioSections[idx].order = state.portfolioSections[idx+1].order;
          state.portfolioSections[idx+1].order = temp;
          state.portfolioSections.sort((a, b) => a.order - b.order);
          LeveledApp.saveState();
          this.render();
        }
      };
    });

    // (state and styles defined at the top of bindEvents)

    // Toggle customizer
    const toggleBtn = document.getElementById('btn-toggle-customizer');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        state.customizerOpen = !state.customizerOpen;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Presets
    const presets = document.querySelectorAll('.btn-preset-theme');
    presets.forEach(btn => {
      btn.onclick = () => {
        const theme = btn.getAttribute('data-theme');
        this.applyThemePreset(theme, styles);
        LeveledApp.saveState();
        this.render();
      };
    });

    // Color Pickers
    const startPicker = document.getElementById('picker-bg-start');
    if (startPicker) {
      startPicker.oninput = (e) => {
        styles.bgStart = e.target.value;
        styles.themePreset = 'custom';
        LeveledApp.saveState();
        this.renderBackgroundOnly();
      };
      startPicker.onchange = () => {
        LeveledApp.saveState();
      };
    }

    const endPicker = document.getElementById('picker-bg-end');
    if (endPicker) {
      endPicker.oninput = (e) => {
        styles.bgEnd = e.target.value;
        styles.themePreset = 'custom';
        LeveledApp.saveState();
        this.renderBackgroundOnly();
      };
      endPicker.onchange = () => {
        LeveledApp.saveState();
      };
    }

    const webStartPicker = document.getElementById('picker-web-bg-start');
    if (webStartPicker) {
      webStartPicker.oninput = (e) => {
        const newColor = e.target.value;
        styles.webBgStart = newColor;
        styles.themePreset = 'custom';
        const wasDark = styles.darkMode;
        const isDark = this.isColorDark(newColor);
        styles.darkMode = isDark;
        
        // Sync toggle state in UI
        const toggleDarkMode = document.getElementById('toggle-dark-mode');
        if (toggleDarkMode) {
          toggleDarkMode.checked = isDark;
        }

        LeveledApp.saveState();
        
        if (isDark !== wasDark) {
          this.render();
        } else {
          this.renderBackgroundOnly();
        }
      };
      webStartPicker.onchange = () => {
        LeveledApp.saveState();
        this.render();
      };
    }

    const webEndPicker = document.getElementById('picker-web-bg-end');
    if (webEndPicker) {
      webEndPicker.oninput = (e) => {
        const newColor = e.target.value;
        styles.webBgEnd = newColor;
        styles.themePreset = 'custom';
        const wasDark = styles.darkMode;
        const isDark = this.isColorDark(styles.webBgStart || '#0f172a');
        styles.darkMode = isDark;

        const toggleDarkMode = document.getElementById('toggle-dark-mode');
        if (toggleDarkMode) {
          toggleDarkMode.checked = isDark;
        }

        LeveledApp.saveState();

        if (isDark !== wasDark) {
          this.render();
        } else {
          this.renderBackgroundOnly();
        }
      };
      webEndPicker.onchange = () => {
        LeveledApp.saveState();
        this.render();
      };
    }

    const textPicker = document.getElementById('picker-text');
    if (textPicker) {
      textPicker.oninput = (e) => {
        styles.textColor = e.target.value;
        styles.themePreset = 'custom';
        LeveledApp.saveState();
        this.renderBackgroundOnly();
      };
      textPicker.onchange = () => {
        LeveledApp.saveState();
        this.render();
      };
    }

    // Toggle Dark Mode Preview (allows forcing dark/light and updates background to matching default shade)
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    if (toggleDarkMode) {
      toggleDarkMode.onchange = (e) => {
        styles.darkMode = e.target.checked;
        if (styles.darkMode) {
          styles.webBgStart = '#0f172a';
          styles.webBgEnd = '#020617';
        } else {
          styles.webBgStart = '#fffbeb';
          styles.webBgEnd = '#fef3c7';
        }
        styles.themePreset = 'custom';
        LeveledApp.saveState();
        this.render();
      };
    }

    // Sliders
    const radiusSlider = document.getElementById('slider-radius');
    if (radiusSlider) {
      radiusSlider.oninput = (e) => {
        styles.borderRadius = e.target.value;
        document.getElementById('lbl-radius').textContent = `${e.target.value}px`;
        this.render(); // Need complete render to update border-radius on cards
      };
      radiusSlider.onchange = () => {
        LeveledApp.saveState();
      };
    }

    const opacitySlider = document.getElementById('slider-opacity');
    if (opacitySlider) {
      opacitySlider.oninput = (e) => {
        styles.glassOpacity = e.target.value / 100;
        document.getElementById('lbl-opacity').textContent = `${e.target.value}%`;
        this.render(); // Need complete render to update opacity on cards
      };
      opacitySlider.onchange = () => {
        LeveledApp.saveState();
      };
    }

    // Select dropdowns
    const layoutSelect = document.getElementById('select-layout');
    if (layoutSelect) {
      layoutSelect.onchange = (e) => {
        styles.layout = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select dropdowns
    const fontSelect = document.getElementById('select-font');
    if (fontSelect) {
      fontSelect.onchange = (e) => {
        styles.fontFamily = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    const emojiSelect = document.getElementById('select-emoji');
    if (emojiSelect) {
      emojiSelect.onchange = (e) => {
        styles.emoji = e.target.value;
        document.getElementById('span-welcome-emoji').textContent = e.target.value;
        LeveledApp.saveState();
      };
    }

    // Select background pattern
    const patternSelect = document.getElementById('select-pattern');
    if (patternSelect) {
      patternSelect.onchange = (e) => {
        styles.bgPattern = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select card style
    const cardStyleSelect = document.getElementById('select-card-style');
    if (cardStyleSelect) {
      cardStyleSelect.onchange = (e) => {
        styles.cardStyle = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select card hover
    const cardHoverSelect = document.getElementById('select-card-hover');
    if (cardHoverSelect) {
      cardHoverSelect.onchange = (e) => {
        styles.cardHover = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select avatar shape
    const avatarShapeSelect = document.getElementById('select-avatar-shape');
    if (avatarShapeSelect) {
      avatarShapeSelect.onchange = (e) => {
        styles.avatarShape = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select avatar border
    const avatarBorderSelect = document.getElementById('select-avatar-border');
    if (avatarBorderSelect) {
      avatarBorderSelect.onchange = (e) => {
        styles.avatarBorder = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select button shape
    const buttonShapeSelect = document.getElementById('select-button-shape');
    if (buttonShapeSelect) {
      buttonShapeSelect.onchange = (e) => {
        styles.buttonShape = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Select button style
    const buttonStyleSelect = document.getElementById('select-button-style');
    if (buttonStyleSelect) {
      buttonStyleSelect.onchange = (e) => {
        styles.buttonStyle = e.target.value;
        LeveledApp.saveState();
        this.render();
      };
    }

    // Bind Social link inputs
    const socialGithubInput = document.getElementById('input-social-github');
    if (socialGithubInput) {
      socialGithubInput.onchange = (e) => {
        styles.socialGithub = e.target.value.trim();
        LeveledApp.saveState();
        this.render();
      };
    }

    const socialLinkedinInput = document.getElementById('input-social-linkedin');
    if (socialLinkedinInput) {
      socialLinkedinInput.onchange = (e) => {
        styles.socialLinkedin = e.target.value.trim();
        LeveledApp.saveState();
        this.render();
      };
    }

    const socialTwitterInput = document.getElementById('input-social-twitter');
    if (socialTwitterInput) {
      socialTwitterInput.onchange = (e) => {
        styles.socialTwitter = e.target.value.trim();
        LeveledApp.saveState();
        this.render();
      };
    }

    const socialEmailInput = document.getElementById('input-social-email');
    if (socialEmailInput) {
      socialEmailInput.onchange = (e) => {
        styles.socialEmail = e.target.value.trim();
        LeveledApp.saveState();
        this.render();
      };
    }

    // Bio Edit Button (toolbar) → opens inline editor
    const editBioBtn = document.getElementById('btn-edit-portfolio-bio');
    if (editBioBtn) {
      editBioBtn.onclick = () => {
        const displayWrap = document.getElementById('bio-display-wrap');
        const editorWrap = document.getElementById('bio-editor-wrap');
        if (displayWrap && editorWrap) {
          displayWrap.style.display = 'none';
          editorWrap.style.display = 'flex';
          editorWrap.querySelector('textarea')?.focus();
        } else {
          this.openEditBioModal();
        }
      };
    }

    // Inline bio save button
    const saveBioInline = document.getElementById('btn-save-bio-inline');
    if (saveBioInline) {
      saveBioInline.onclick = () => {
        const textarea = document.getElementById('bio-inline-textarea');
        const newBio = textarea?.value?.trim();
        if (newBio) {
          LeveledApp.state.portfolioBio = newBio;
          LeveledApp.saveState();
          const displayText = document.getElementById('bio-display-text');
          if (displayText) displayText.textContent = newBio;
        }
        document.getElementById('bio-editor-wrap').style.display = 'none';
        document.getElementById('bio-display-wrap').style.display = 'block';
        LeveledApp.showToast('✅ Bio updated!');
      };
    }

    // Add manual award button click
    const addBtn = document.getElementById('btn-upload-achievement');
    if (addBtn) {
      addBtn.onclick = () => {
        this.openAddAchievementModal();
      };
    }

    // Add Media Achievement buttons (gallery section)
    const addMediaBtn = document.getElementById('btn-add-media-achievement');
    if (addMediaBtn) {
      addMediaBtn.onclick = () => this.openAddAchievementModal();
    }
    const addMediaBtnEmpty = document.querySelector('.btn-add-media-achievement-empty');
    if (addMediaBtnEmpty) {
      addMediaBtnEmpty.onclick = () => this.openAddAchievementModal();
    }

    // Delete achievement buttons
    const deleteBtns = document.querySelectorAll('.btn-delete-ach');
    deleteBtns.forEach(btn => {
      btn.onclick = () => {
        const achId = btn.getAttribute('data-ach-id');
        const state = LeveledApp.state;
        state.portfolioAchievements = state.portfolioAchievements.filter(a => a.id !== achId);
        LeveledApp.saveState();
        this.render();
        LeveledApp.showToast('🗑️ Achievement removed.');
      };
    });

    // Bob chat form submission
    const bobForm = document.getElementById('bob-chat-form');
    if (bobForm) {
      bobForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById('bob-chat-input');
        const text = input?.value?.trim();
        if (text) {
          input.value = '';
          this.handleBobSend(text);
        }
      };
    }

    // Bob quick chips click
    const bobChips = document.querySelectorAll('.bob-chip');
    bobChips.forEach(chip => {
      chip.onclick = () => {
        const msg = chip.getAttribute('data-msg');
        if (msg) {
          this.handleBobSend(msg);
        }
      };
    });

    this.setupScrollReveal();
  },

  appendBobMessage(sender, text) {
    const container = document.getElementById('bob-messages');
    if (!container) return;
    const msgDiv = document.createElement('div');
    msgDiv.style.display = 'flex';
    msgDiv.style.flexDirection = 'column';
    msgDiv.style.gap = '4px';
    msgDiv.style.alignItems = sender === 'bob' ? 'flex-start' : 'flex-end';

    const header = sender === 'bob' ? `<div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
      <div style="width:18px; height:18px; border-radius:5px; background:linear-gradient(135deg,#f59e0b,#ef4444); display:flex; align-items:center; justify-content:center; font-size:10px;">🔨</div>
      <span style="font-size:10px; font-weight:700; color:var(--text-muted);">Bob</span>
    </div>` : '';

    const formattedText = text.replace(/\\n/g, '\n').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');

    const styles = LeveledApp.state.portfolioStyles;
    const msgBg = sender === 'bob' ? 'var(--bg-secondary)' : 'linear-gradient(135deg, var(--primary), var(--secondary))';
    const msgColor = sender === 'bob' ? 'var(--text-primary)' : 'white';
    const msgBorder = sender === 'bob' ? '1px solid var(--border-color)' : 'none';
    const borderRadius = sender === 'bob' ? '4px 12px 12px 12px' : '12px 4px 12px 12px';

    msgDiv.innerHTML = `
      ${header}
      <div style="max-width:85%; padding:9px 12px; border-radius:${borderRadius}; font-size:12px; line-height:1.55; font-weight:500; background:${msgBg}; color:${msgColor}; border:${msgBorder};">
        ${formattedText}
      </div>
    `;

    // Insert before typing indicator
    const typing = document.getElementById('bob-typing');
    if (typing) {
      container.insertBefore(msgDiv, typing);
    } else {
      container.appendChild(msgDiv);
    }
  },

  handleBobSend(text) {
    const state = LeveledApp.state;
    state.bobHistory = state.bobHistory || [
      { sender:'bob', text:`Hey ${state.user?.name || 'Student'}! I'm **Bob** 🔨 — your portfolio design assistant. I can help you:\n\n• Write a compelling bio\n• Choose the right theme & colors\n• Suggest what sections to showcase\n• Make your portfolio stand out to colleges\n\nWhat do you want to build today?` }
    ];

    // Add user message
    state.bobHistory.push({ sender: 'user', text });
    this.appendBobMessage('user', text);
    
    const container = document.getElementById('bob-messages');
    if (container) container.scrollTop = container.scrollHeight;
    LeveledApp.saveState();

    // Show typing indicator
    const typing = document.getElementById('bob-typing');
    if (typing) typing.style.display = 'flex';
    if (container) container.scrollTop = container.scrollHeight;

    // Fetch from AI endpoint
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistant: 'bob',
        message: text,
        history: state.bobHistory.slice(0, -1),
        user: state.user
      })
    })
    .then(res => res.json())
    .then(data => {
      if (typing) typing.style.display = 'none';

      let response = '';
      if (data && data.reply) {
        response = data.reply;
      } else {
        // Fallback to offline simulator
        response = AISimulator.getBobResponse(text, state.user, state.bobHistory);
        if (data && data.error) {
          if (data.error.includes("Key not set") || data.error.includes("not set")) {
            response += `\n\n*(💡 Running in offline simulator mode. Set \`export ANTHROPIC_API_KEY=your_key\` in your terminal and restart the server to enable live Claude responses.)*`;
          } else {
            response += `\n\n*(⚠️ AI connection error: ${data.error})*`;
          }
        }
      }

      // Process and apply commands (this saves state and re-renders if needed)
      const cleanResponse = this.processBobCommand(response, state);

      state.bobHistory.push({ sender: 'bob', text: cleanResponse });
      this.appendBobMessage('bob', cleanResponse);
      if (container) container.scrollTop = container.scrollHeight;
      LeveledApp.saveState();
    })
    .catch(err => {
      console.warn("API error, falling back to local simulator:", err);
      if (typing) typing.style.display = 'none';

      let response = AISimulator.getBobResponse(text, state.user, state.bobHistory);
      response += `\n\n*(⚠️ Network connection failed: ${err.message || err})*`;

      // Process and apply commands (this saves state and re-renders if needed)
      const cleanResponse = this.processBobCommand(response, state);

      state.bobHistory.push({ sender: 'bob', text: cleanResponse });
      this.appendBobMessage('bob', cleanResponse);
      if (container) container.scrollTop = container.scrollHeight;
      LeveledApp.saveState();
    });
  },

  applyThemePreset(theme, styles) {
    styles.themePreset = theme;
    if (theme === 'warm-yellow') {
      styles.bgStart = '#fde047';
      styles.bgEnd = '#fef08a';
      styles.webBgStart = '#fffbeb';
      styles.webBgEnd = '#fef3c7';
      styles.textColor = '#1e1b4b';
      styles.borderRadius = '20';
      styles.fontFamily = 'Outfit';
      styles.bgPattern = 'none';
      styles.avatarShape = 'circle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'glass';
      styles.cardHover = 'lift';
      styles.buttonShape = 'rounded';
      styles.buttonStyle = 'gradient';
      styles.darkMode = false;
    } else if (theme === 'electric-indigo') {
      styles.bgStart = '#4f46e5';
      styles.bgEnd = '#818cf8';
      styles.webBgStart = '#0f172a';
      styles.webBgEnd = '#020617';
      styles.textColor = '#ffffff';
      styles.borderRadius = '20';
      styles.fontFamily = 'Outfit';
      styles.bgPattern = 'mesh';
      styles.avatarShape = 'squircle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'glass';
      styles.cardHover = 'lift';
      styles.buttonShape = 'pill';
      styles.buttonStyle = 'gradient';
      styles.darkMode = true;
    } else if (theme === 'emerald-sunset') {
      styles.bgStart = '#10b981';
      styles.bgEnd = '#06b6d4';
      styles.webBgStart = '#064e3b';
      styles.webBgEnd = '#022c22';
      styles.textColor = '#ffffff';
      styles.borderRadius = '20';
      styles.fontFamily = 'Outfit';
      styles.bgPattern = 'stripes';
      styles.avatarShape = 'circle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'glass';
      styles.cardHover = 'lift';
      styles.buttonShape = 'rounded';
      styles.buttonStyle = 'glass';
      styles.darkMode = true;
    } else if (theme === 'cyberpunk-dark') {
      styles.bgStart = '#09090b';
      styles.bgEnd = '#18181b';
      styles.webBgStart = '#09090b';
      styles.webBgEnd = '#020204';
      styles.textColor = '#f8fafc';
      styles.borderRadius = '8';
      styles.fontFamily = 'Courier New';
      styles.bgPattern = 'grid';
      styles.avatarShape = 'hexagon';
      styles.avatarBorder = 'neon';
      styles.cardStyle = 'metal';
      styles.cardHover = 'glow';
      styles.buttonShape = 'sharp';
      styles.buttonStyle = 'outline';
      styles.darkMode = true;
    } else if (theme === 'sakura-blossom') {
      styles.bgStart = '#fbcfe8';
      styles.bgEnd = '#fce7f3';
      styles.webBgStart = '#fff5f7';
      styles.webBgEnd = '#fce7f3';
      styles.textColor = '#831843';
      styles.borderRadius = '32';
      styles.fontFamily = 'Outfit';
      styles.bgPattern = 'dots';
      styles.avatarShape = 'circle';
      styles.avatarBorder = 'double';
      styles.cardStyle = 'glass';
      styles.cardHover = 'zoom';
      styles.buttonShape = 'pill';
      styles.buttonStyle = 'gradient';
      styles.darkMode = false;
    } else if (theme === 'ocean-breeze') {
      styles.bgStart = '#7dd3fc';
      styles.bgEnd = '#e0f2fe';
      styles.webBgStart = '#f0f9ff';
      styles.webBgEnd = '#e0f2fe';
      styles.textColor = '#0c4a6e';
      styles.borderRadius = '24';
      styles.fontFamily = 'Inter';
      styles.bgPattern = 'none';
      styles.avatarShape = 'circle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'shadow';
      styles.cardHover = 'lift';
      styles.buttonShape = 'rounded';
      styles.buttonStyle = 'gradient';
      styles.darkMode = false;
    } else if (theme === 'royal-obsidian') {
      styles.bgStart = '#1e1b4b';
      styles.bgEnd = '#312e81';
      styles.webBgStart = '#0f0f24';
      styles.webBgEnd = '#02020a';
      styles.textColor = '#e0e7ff';
      styles.borderRadius = '16';
      styles.fontFamily = 'Georgia';
      styles.bgPattern = 'none';
      styles.avatarShape = 'squircle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'glass';
      styles.cardHover = 'lift';
      styles.buttonShape = 'rounded';
      styles.buttonStyle = 'gradient';
      styles.darkMode = true;
    } else if (theme === 'midnight-dark') {
      styles.bgStart = '#020617';
      styles.bgEnd = '#0f172a';
      styles.webBgStart = '#020617';
      styles.webBgEnd = '#0b0f19';
      styles.textColor = '#f8fafc';
      styles.borderRadius = '24';
      styles.fontFamily = 'Outfit';
      styles.bgPattern = 'none';
      styles.avatarShape = 'circle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'metal';
      styles.cardHover = 'lift';
      styles.buttonShape = 'rounded';
      styles.buttonStyle = 'gradient';
      styles.darkMode = true;
    } else if (theme === 'neon-mint') {
      styles.bgStart = '#6ee7b7';
      styles.bgEnd = '#a7f3d0';
      styles.webBgStart = '#f0fdf4';
      styles.webBgEnd = '#dcfce7';
      styles.textColor = '#064e3b';
      styles.borderRadius = '12';
      styles.fontFamily = 'Courier New';
      styles.bgPattern = 'dots';
      styles.avatarShape = 'squircle';
      styles.avatarBorder = 'solid';
      styles.cardStyle = 'flat';
      styles.cardHover = 'lift';
      styles.buttonShape = 'sharp';
      styles.buttonStyle = 'gradient';
      styles.darkMode = false;
    }
  },
  
  processBobCommand(response, state) {
    let updatedStyles = false;
    let updatedBio = false;
    let updatedSections = false;

    // 1. Update style command: [[UPDATE_STYLE: {...}]]
    const styleRegex = /\[\[UPDATE_STYLE:\s*(\{.*?\})\s*\]\]/g;
    let match;
    let cleanText = response;

    while ((match = styleRegex.exec(response)) !== null) {
      try {
        const styleData = JSON.parse(match[1]);
        for (const key in styleData) {
          if (key === 'themePreset') {
            this.applyThemePreset(styleData[key], state.portfolioStyles);
          } else {
            state.portfolioStyles[key] = styleData[key];
          }
        }
        updatedStyles = true;
      } catch (e) {
        console.error("Failed to parse style update from Bob:", e);
      }
    }

    // 2. Update bio command: [[UPDATE_BIO: "..." ]]
    const bioRegex = /\[\[UPDATE_BIO:\s*"(.*?)"\s*\]\]/g;
    while ((match = bioRegex.exec(response)) !== null) {
      state.portfolioBio = match[1];
      updatedBio = true;
    }

    // 3. Toggle section command: [[TOGGLE_SECTION: {...}]]
    const sectionRegex = /\[\[TOGGLE_SECTION:\s*(\{.*?\})\s*\]\]/g;
    while ((match = sectionRegex.exec(response)) !== null) {
      try {
        const secData = JSON.parse(match[1]);
        const sec = state.portfolioSections.find(s => s.id === secData.sectionId);
        if (sec) {
          sec.visible = !!secData.visible;
          updatedSections = true;
        }
      } catch (e) {
        console.error("Failed to parse section toggle from Bob:", e);
      }
    }

    // Clean all commands out of response text
    cleanText = cleanText
      .replace(/\[\[UPDATE_STYLE:\s*(\{.*?\})\s*\]\]/g, '')
      .replace(/\[\[UPDATE_BIO:\s*"(.*?)"\s*\]\]/g, '')
      .replace(/\[\[TOGGLE_SECTION:\s*(\{.*?\})\s*\]\]/g, '')
      .trim();

    if (updatedStyles || updatedBio || updatedSections) {
      LeveledApp.saveState();
      this.render();
    }

    return cleanText;
  },

  isColorDark(hex) {
    if (!hex) return true;
    let color = hex.trim();
    if (color.startsWith('rgb')) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0], 10);
        const g = parseInt(matches[1], 10);
        const b = parseInt(matches[2], 10);
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        return luma < 140;
      }
    }
    if (color.charAt(0) !== '#') return true;
    const c = color.substring(1);
    let r, g, b;
    if (c.length === 3) {
      r = parseInt(c.charAt(0) + c.charAt(0), 16);
      g = parseInt(c.charAt(1) + c.charAt(1), 16);
      b = parseInt(c.charAt(2) + c.charAt(2), 16);
    } else {
      const rgb = parseInt(c, 16);
      if (isNaN(rgb)) return true;
      r = (rgb >> 16) & 0xff;
      g = (rgb >> 8) & 0xff;
      b = (rgb >> 0) & 0xff;
    }
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    return luma < 140; // True if dark, false if light
  },

  // Optimized render to only update colors/backgrounds instantly on color input without full page refresh
  renderBackgroundOnly() {
    const state = LeveledApp.state;
    const styles = state.portfolioStyles;
    
    // Find preview elements
    const heroCard = document.querySelector('#portfolio-live-container > div:first-child');
    if (heroCard) {
      heroCard.style.background = `linear-gradient(135deg, ${styles.bgStart} 0%, ${styles.bgEnd} 100%)`;
      heroCard.style.color = styles.textColor;
      
      const spotlightBadge = heroCard.querySelector('span:first-child');
      if (spotlightBadge) {
        spotlightBadge.style.backgroundColor = styles.textColor;
        spotlightBadge.style.color = styles.bgStart === '#09090b' ? '#f43f5e' : 'white';
      }
    }

    const liveContainer = document.getElementById('portfolio-live-container');
    if (liveContainer) {
      const pattern = styles.bgPattern || 'none';
      const patternColor = styles.darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
      
      let patternCSS = '';
      let patternBgSize = '';
      if (pattern === 'dots') {
        patternCSS = `, radial-gradient(${patternColor} 15%, transparent 16%)`;
        patternBgSize = '100% 100%, 16px 16px';
      } else if (pattern === 'grid') {
        patternCSS = `, linear-gradient(${patternColor} 1px, transparent 1px), linear-gradient(90deg, ${patternColor} 1px, transparent 1px)`;
        patternBgSize = '100% 100%, 20px 20px, 20px 20px';
      } else if (pattern === 'stripes') {
        patternCSS = `, repeating-linear-gradient(45deg, ${patternColor}, ${patternColor} 10px, transparent 10px, transparent 20px)`;
        patternBgSize = '100% 100%, 100% 100%';
      } else if (pattern === 'mesh') {
        const meshColor1 = styles.darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.05)';
        const meshColor2 = styles.darkMode ? 'rgba(236, 72, 153, 0.08)' : 'rgba(236, 72, 153, 0.05)';
        const meshColor3 = styles.darkMode ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.05)';
        patternCSS = `, radial-gradient(at 10% 20%, ${meshColor1} 0px, transparent 50%), radial-gradient(at 90% 10%, ${meshColor2} 0px, transparent 50%), radial-gradient(at 50% 80%, ${meshColor3} 0px, transparent 50%)`;
        patternBgSize = 'auto, 100% 100%, 100% 100%, 100% 100%';
      }

      liveContainer.style.background = `linear-gradient(135deg, ${styles.webBgStart || '#0f172a'}, ${styles.webBgEnd || '#020617'})${patternCSS}`;
      if (patternBgSize) {
        liveContainer.style.backgroundSize = patternBgSize;
      } else {
        liveContainer.style.backgroundSize = '';
      }
    }
  },

  openEditBioModal() {
    const state = LeveledApp.state;
    const modalHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-primary);">Customize Your Portfolio Bio</h3>
        
        <form id="edit-bio-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="bio-text">Greeting & Biography</label>
            <textarea id="bio-text" class="form-control" placeholder="Write a short summary about yourself..." style="min-height: 120px;" required>${state.portfolioBio}</textarea>
          </div>

          <div style="display: flex; gap: 16px; margin-top: 16px;">
            <button type="button" class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="flex: 1;">Cancel</button>
            <button type="submit" class="btn btn-primary" style="flex: 2;">Save Biography</button>
          </div>
        </form>
      </div>
    `;

    LeveledApp.openModal(modalHTML);

    const form = document.getElementById('edit-bio-form');
    form.onsubmit = () => {
      const bioText = document.getElementById('bio-text').value.trim();
      state.portfolioBio = bioText;
      LeveledApp.saveState();
      LeveledApp.closeModal();
      this.render();
      LeveledApp.showToast('✓ Portfolio biography updated!');
    };
  },

  openAddAchievementModal() {
    const modalHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px; max-height: 80vh; overflow-y: auto;">
        <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--text-primary);">Add Achievement & Media</h3>
        <p style="color: var(--text-secondary); font-size: 12px; margin-top: -12px;">Add awards, sports wins, music recitals, certificates — with images, links, or documents.</p>
        
        <form id="add-achievement-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="form-group">
            <label class="form-label" for="ach-title">Title</label>
            <input type="text" id="ach-title" class="form-control" placeholder="E.g., 1st Place 100m Sprint, Piano Recital Gold" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label" for="ach-cat">Category</label>
              <select id="ach-cat" class="form-control">
                <option value="Award">🏆 Award / Competition</option>
                <option value="Sports">⚽ Sports & Athletics</option>
                <option value="Music">🎵 Music & Performance</option>
                <option value="Arts">🎨 Visual Arts & Design</option>
                <option value="STEM">🔬 STEM & Academics</option>
                <option value="Certificate">📜 Certificate / Course</option>
                <option value="Volunteer">🤝 Volunteer / Community</option>
                <option value="Leadership">👑 Leadership Role</option>
                <option value="Other">📌 Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="ach-date">Date</label>
              <input type="date" id="ach-date" class="form-control" value="2026-06-01" required>
            </div>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label class="form-label" for="ach-detail" style="margin: 0;">Description</label>
              <button type="button" id="btn-ai-generate-desc" style="background: none; border: none; color: var(--primary); font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                ✨ Auto-generate
              </button>
            </div>
            <textarea id="ach-detail" class="form-control" placeholder="E.g., Won gold medal in the state championship 100m dash with a time of 11.2s" required style="min-height: 60px;"></textarea>
          </div>

          <!-- Media Attachments Section -->
          <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div style="font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              📎 Attach Media <span style="font-weight: 500; text-transform: none; letter-spacing: 0;">(optional)</span>
            </div>

            <div id="media-attachments-list" style="display: flex; flex-direction: column; gap: 10px;">
              <!-- First attachment row -->
              <div class="media-row" style="display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: start; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px;">
                <select class="form-control media-type-select" style="font-size: 12px; padding: 6px; height: 32px; width: 110px;">
                  <option value="image">🖼️ Image URL</option>
                  <option value="link">🔗 Link / URL</option>
                  <option value="pdf">📄 PDF Name</option>
                </select>
                <input type="text" class="form-control media-url-input" placeholder="Paste image URL or link..." style="font-size: 12px; height: 32px;">
              </div>
            </div>

            <button type="button" id="btn-add-more-media" style="margin-top: 8px; background: none; border: 1px dashed var(--border-color); color: var(--text-muted); padding: 8px; border-radius: var(--border-radius-md); font-size: 11px; font-weight: 700; cursor: pointer; width: 100%; transition: all var(--transition-fast);">
              + Add another attachment
            </button>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 12px;">
            <button type="button" class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="flex: 1;">Cancel</button>
            <button type="submit" class="btn btn-primary" style="flex: 2; background: linear-gradient(135deg, var(--primary), var(--secondary));">🏅 Save Achievement</button>
          </div>
        </form>
      </div>
    `;

    LeveledApp.openModal(modalHTML);

    // Add More Media button
    const addMoreBtn = document.getElementById('btn-add-more-media');
    if (addMoreBtn) {
      addMoreBtn.onclick = () => {
        const list = document.getElementById('media-attachments-list');
        const newRow = document.createElement('div');
        newRow.className = 'media-row';
        newRow.style.cssText = 'display: grid; grid-template-columns: auto 1fr auto; gap: 8px; align-items: start; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--border-radius-md); padding: 12px;';
        newRow.innerHTML = `
          <select class="form-control media-type-select" style="font-size: 12px; padding: 6px; height: 32px; width: 110px;">
            <option value="image">🖼️ Image URL</option>
            <option value="link">🔗 Link / URL</option>
            <option value="pdf">📄 PDF Name</option>
          </select>
          <input type="text" class="form-control media-url-input" placeholder="Paste image URL or link..." style="font-size: 12px; height: 32px;">
          <button type="button" class="btn-remove-media" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; padding: 4px 6px;">✕</button>
        `;
        list.appendChild(newRow);
        newRow.querySelector('.btn-remove-media').onclick = () => newRow.remove();
      };
    }

    // AI Auto-Generate Button
    const aiGenBtn = document.getElementById('btn-ai-generate-desc');
    if (aiGenBtn) {
      aiGenBtn.onclick = () => {
        const title = document.getElementById('ach-title').value;
        const category = document.getElementById('ach-cat').value;
        if (!title) {
          LeveledApp.showToast('⚠️ Please enter a Title first!');
          return;
        }
        
        aiGenBtn.innerHTML = '⏳ Generating...';
        aiGenBtn.style.opacity = '0.7';
        
        // Simulate a slight network delay for effect
        setTimeout(() => {
          const generatedDesc = AISimulator.generateAchievementDescription(title, category);
          document.getElementById('ach-detail').value = generatedDesc;
          aiGenBtn.innerHTML = '✨ Auto-generate';
          aiGenBtn.style.opacity = '1';
          LeveledApp.showToast('✨ Description generated!');
        }, 500);
      };
    }

    const form = document.getElementById('add-achievement-form');
    form.onsubmit = () => {
      const state = LeveledApp.state;
      const title = document.getElementById('ach-title').value;
      const category = document.getElementById('ach-cat').value;
      const date = document.getElementById('ach-date').value;
      const detail = document.getElementById('ach-detail').value;

      // Collect media attachments
      const mediaRows = document.querySelectorAll('.media-row');
      const media = [];
      mediaRows.forEach(row => {
        const type = row.querySelector('.media-type-select').value;
        const urlOrName = row.querySelector('.media-url-input').value.trim();
        if (urlOrName) {
          media.push({
            type: type,
            url: type !== 'pdf' ? urlOrName : '',
            name: type === 'pdf' ? urlOrName : '',
            addedDate: date
          });
        }
      });

      state.portfolioAchievements.push({
        id: `ach-${Date.now()}`,
        title,
        category,
        date,
        detail,
        media: media
      });

      if (detail && detail.trim().length >= 20) {
        LeveledApp.addXP(60, `Uploaded Achievement: "${title}"`);
      }
      LeveledApp.closeModal();
      this.render();
    };
  },

  
  exportWebsite() {
    const state = LeveledApp.state;
    const user = state.user;
    const styles = state.portfolioStyles;
    
    // We just take the innerHTML of the live page container and wrap it in a proper HTML boilerplate.
    const previewContainer = document.getElementById('portfolio-live-container');
    if (!previewContainer) return;
    
    let htmlContent = previewContainer.innerHTML;
    // Clean up buttons from export
    htmlContent = htmlContent.replace(/<button[^>]*>.*?<\/button>/g, '');
    
    let fontUrl = '';
    if (styles.fontFamily === 'Outfit') fontUrl = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800&display=swap';
    else if (styles.fontFamily === 'Inter') fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap';
    
    const pageHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${user.name} - Portfolio</title>
  ${fontUrl ? `<link href="${fontUrl}" rel="stylesheet">` : ''}
  <style>
    :root {
      --primary: #2563eb;
      --secondary: #10b981;
      --text-primary: #111827;
      --text-secondary: #4b5563;
      --text-muted: #9ca3af;
      --bg-primary: #f9fafb;
      --bg-secondary: #ffffff;
      --bg-tertiary: #f3f4f6;
      --border-color: #e5e7eb;
      --border-radius-sm: 8px;
      --border-radius-md: 12px;
      --border-radius-lg: 16px;
      --border-radius-xl: 20px;
      --border-radius-round: 9999px;
      --font-heading: '${styles.fontFamily}', sans-serif;
      --font-body: '${styles.fontFamily}', sans-serif;
      --color-xp: #3b82f6;
    }
    body {
      font-family: var(--font-body);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      margin: 0;
      padding: 40px;
      line-height: 1.5;
    }
    .glass-card {
      border-radius: ${styles.borderRadius}px;
      background-color: rgba(255, 255, 255, ${styles.glassOpacity});
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    /* Dynamic Injected Customizer Styles */
    ${hoverCSS}
    ${dynamicBtnCSS}
    .social-icon-btn:hover {
      opacity: 1 !important;
      transform: scale(1.15) !important;
    }
    .social-icon-btn {
      transition: opacity 0.2s, transform 0.2s !important;
    }
    .scroll-reveal-item {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform, opacity;
    }
    .scroll-reveal-item.reveal-in-view {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    a { color: var(--primary); text-decoration: none; }
    h1, h2, h3, h4, h5 { font-family: var(--font-heading); margin-top: 0; }
    .fit-grid { gap: 32px; }
    @media (max-width: 768px) {
      body { padding: 16px; }
      .fit-grid { grid-template-columns: 1fr !important; }
    }
  </style>
</head>
<body>
  <div style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
    ${htmlContent}
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

      document.querySelectorAll('.scroll-reveal-item').forEach(el => {
        observer.observe(el);
      });
    });
  </script>
</body>
</html>`;

    const blob = new Blob([pageHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${user.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    LeveledApp.addXP(100, 'Exported Live Portfolio Website');
  },


  exportResumeCV() {
    const state = LeveledApp.state;
    const user = state.user;
    const profileScores = AISimulator.calculateProfileScores(user, state.completedMilestones);

    const printWindow = window.open('', '_blank');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${user.name}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; line-height: 1.5; font-size: 14px; }
          .header { text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; }
          .name { font-size: 28px; font-weight: 800; text-transform: uppercase; color: #1e1b4b; letter-spacing: -0.5px; }
          .sub { color: #666; margin-top: 5px; font-size: 13px; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 16px; font-weight: 700; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; color: #4f46e5; text-transform: uppercase; }
          .grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .item { margin-bottom: 15px; }
          .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
          .item-desc { color: #555; margin-top: 4px; font-size: 13px; }
          .skills-row { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill-tag { background-color: #f3f4f6; border: 1px solid #e5e7eb; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
          .stats-pill { border: 1px solid #4f46e5; padding: 8px 12px; border-radius: 6px; display: inline-block; font-size: 12px; }
          @media print {
            body { padding: 0; }
            .btn-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="text-align: right; margin-bottom: 20px;">
          <button class="btn-print" onclick="window.print()" style="padding: 8px 16px; font-size: 13px; background-color: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">Print PDF</button>
        </div>

        <div class="header">
          <div class="name">${user.name}</div>
          <div class="sub">${user.school} • Grade ${user.grade} • ${user.country}</div>
          <div class="sub" style="margin-top: 10px;">
            <span class="stats-pill">Verified Leveld Profile Score: <strong>${profileScores.overall}/100</strong></span>
            <span class="stats-pill">Rank: <strong>Level ${state.level} Candidate</strong></span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Academic & Goals</div>
          <div class="grid-two">
            <div>
              <strong>Target career path:</strong> ${user.careerGoals || 'Undecided'}<br>
              <strong>Weekly study availability:</strong> ${user.availableHours}
            </div>
            <div>
              <strong>Academic Strengths:</strong> ${user.academicStrengths.join(', ')}<br>
              <strong>Target Universities:</strong> ${user.dreamUniversities.join(', ')}
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Portfolio Timeline & Qualifications</div>
          ${state.portfolioAchievements.map(a => `
            <div class="item">
              <div class="item-header">
                <span>${a.title} [${a.category}]</span>
                <span style="font-weight: normal; color: #666;">${a.date}</span>
              </div>
              <div class="item-desc">${a.detail}</div>
            </div>
          `).join('')}
          ${state.projects.map(p => `
            <div class="item">
              <div class="item-header">
                <span>💡 Capstone: ${p.title}</span>
                <span style="font-weight: normal; color: #666;">${p.dateAdded}</span>
              </div>
              <div class="item-desc">${p.description} (${p.status})</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Core Skills</div>
          <div class="skills-row">
            ${user.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    
    LeveledApp.addXP(50, 'Exported high school CV');
  },

  setupScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('#portfolio-live-container .scroll-reveal-item').forEach(el => {
      revealObserver.observe(el);
    });
  }
};
