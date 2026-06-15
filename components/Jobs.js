// Jobs.js - College Job & Internship Search Center

export function getJobsDatabase(country) {
  const baseJobs = [
    {
      id: 'job-un-remote',
      title: 'Policy Strategy & Social Impact Intern',
      company: 'United Nations Youth Envoy',
      location: 'Geneva, Switzerland (Remote)',
      type: 'Internship',
      salary: 'Unpaid (Stipend Provided)',
      skillsRequired: ['Policy Writing', 'Event Strategy', 'Public Speaking'],
      description: 'Help coordinate international youth summits, draft policy recommendations on digital literacy, and outline social impact advocacy briefs.',
      link: 'https://un.org/youthenvoy'
    }
  ];

  if (country === 'India') {
    return [
      {
        id: 'job-in-1',
        title: 'Software Engineer Intern',
        company: 'Google India',
        location: 'Bangalore, India (Hybrid)',
        type: 'Internship',
        salary: '₹60,000 - ₹80,000 / month',
        skillsRequired: ['Web Development', 'Python', 'Computer Science'],
        description: 'Join the Google Core engineering team in Bangalore to build scalable web products, write unit tests, and integrate AI APIs.',
        link: 'https://careers.google.com'
      },
      {
        id: 'job-in-2',
        title: 'Product Strategy & Innovation Intern',
        company: 'Flipkart',
        location: 'Bangalore, India',
        type: 'Internship',
        salary: '₹40,000 - ₹50,000 / month',
        skillsRequired: ['UI Design', 'Public Speaking', 'Event Strategy'],
        description: 'Work alongside Flipkart Product Managers to design customer journey flows, prepare strategy slide decks, and coordinate launch schedules.',
        link: 'https://careers.flipkart.com'
      },
      {
        id: 'job-in-3',
        title: 'AI Research Assistant',
        company: 'IIT Bombay AI Lab',
        location: 'Mumbai, India',
        type: 'Research Assistantship',
        salary: '₹30,000 - ₹35,000 / month',
        skillsRequired: ['Research', 'Python', 'Mathematics'],
        description: 'Help develop and train transformer architectures, analyze reinforcement learning reward functions, and draft research publication preprints.',
        link: 'https://iitb.ac.in'
      },
      {
        id: 'job-in-4',
        title: 'Business & Consulting Intern',
        company: 'Tata Consultancy Services',
        location: 'New Delhi, India',
        type: 'Internship',
        salary: '₹25,000 - ₹30,000 / month',
        skillsRequired: ['Economics', 'Public Speaking', 'Policy Writing'],
        description: 'Analyze market entry barriers, clean spreadsheet databases, synthesize qualitative interviews, and draft policy recommendations for client briefings.',
        link: 'https://tcs.com'
      },
      ...baseJobs
    ];
  } else if (country === 'United Kingdom') {
    return [
      {
        id: 'job-uk-1',
        title: 'Software Engineer Intern',
        company: 'Google DeepMind',
        location: 'London, UK (Hybrid)',
        type: 'Internship',
        salary: '£3,000 - £4,000 / month',
        skillsRequired: ['Web Development', 'Python', 'Computer Science'],
        description: 'Join the DeepMind engineering team in London to build scalable AI research infrastructure and integrate model APIs.',
        link: 'https://deepmind.google'
      },
      {
        id: 'job-uk-2',
        title: 'Silicon Architecture Engineering Intern',
        company: 'ARM',
        location: 'Cambridge, UK',
        type: 'Internship',
        salary: '£2,500 - £3,200 / month',
        skillsRequired: ['Computer Science', 'Python', 'Mathematics'],
        description: 'Analyze CPU instruction sets, build simulation tools in Python, and verify logic designs for next-generation mobile chips.',
        link: 'https://arm.com/careers'
      },
      {
        id: 'job-uk-3',
        title: 'AI & Healthcare Research Assistant',
        company: 'University of Cambridge Medicine Lab',
        location: 'Cambridge, UK',
        type: 'Research Assistantship',
        salary: '£18 - £25 / hour',
        skillsRequired: ['Research', 'Python', 'Mathematics'],
        description: 'Apply deep learning architectures to medical image datasets, clean model weights, and write scientific draft reports.',
        link: 'https://cam.ac.uk'
      },
      ...baseJobs
    ];
  } else {
    // Default US / Global
    return [
      {
        id: 'job-us-1',
        title: 'Software Engineer Intern',
        company: 'Google',
        location: 'Mountain View, CA (Hybrid)',
        type: 'Internship',
        salary: '$45 - $55 / hour',
        skillsRequired: ['Web Development', 'Python', 'Computer Science'],
        description: 'Join the Core engineering team to build scalable tools, write unit tests, and integrate AI APIs into internal developer portals.',
        link: 'https://careers.google.com'
      },
      {
        id: 'job-us-2',
        title: 'Product Strategy & Innovation Intern',
        company: 'Apple',
        location: 'Cupertino, CA',
        type: 'Internship',
        salary: '$40 - $50 / hour',
        skillsRequired: ['UI Design', 'Public Speaking', 'Event Strategy'],
        description: 'Work alongside Product Managers to design customer journey flows, prepare strategy slide decks, and coordinate product launch schedules.',
        link: 'https://careers.apple.com'
      },
      {
        id: 'job-us-3',
        title: 'AI Research Assistant',
        company: 'MIT Computer Science & AI Lab (CSAIL)',
        location: 'Cambridge, MA',
        type: 'Research Assistantship',
        salary: '$28 - $35 / hour',
        skillsRequired: ['Research', 'Python', 'Mathematics'],
        description: 'Help develop and train transformer architectures, analyze reinforcement learning reward functions, and draft research publication preprints.',
        link: 'https://csail.mit.edu'
      },
      {
        id: 'job-us-4',
        title: 'Business & Management Consulting Intern',
        company: 'McKinsey & Company',
        location: 'New York, NY',
        type: 'Internship',
        salary: '$50 - $60 / hour',
        skillsRequired: ['Economics', 'Public Speaking', 'Policy Writing'],
        description: 'Analyze market entry barriers, clean spreadsheet databases, synthesize qualitative interviews, and draft policy recommendations for client briefings.',
        link: 'https://mckinsey.com'
      },
      {
        id: 'job-us-5',
        title: 'Robotics Software Developer Intern',
        company: 'Tesla',
        location: 'Palo Alto, CA',
        type: 'Internship',
        salary: '$42 - $52 / hour',
        skillsRequired: ['Python', 'Web Development', 'Robotics Club'],
        description: 'Design and deploy system logic for autonomous systems, coordinate pathfinding math, and test camera sensor interface software.',
        link: 'https://tesla.com/careers'
      },
      ...(country !== 'United States' && country !== 'Global' ? [
        {
          id: 'job-local-custom',
          title: 'Technology Development Intern',
          company: `${country} Innovation Hub`,
          location: `Capital City, ${country} (Hybrid)`,
          type: 'Internship',
          salary: 'Local Competitive Stipend',
          skillsRequired: ['Web Development', 'Computer Science'],
          description: `Work with engineers and analysts in ${country} to build public utility tools, write automation scripts, and coordinate project cycles.`,
          link: '#'
        }
      ] : []),
      ...baseJobs
    ];
  }
}

export const Jobs = {
  activeJobId: null,

  render() {
    const container = document.getElementById('view-jobs');
    if (!container) return;

    const state = LeveledApp.state;
    const user = state.user || {};
    const studentSkills = user.skills || [];
    const country = user.country || 'United States';
    const jobsList = getJobsDatabase(country);

    // Filter values
    const searchQuery = (document.getElementById('job-search-input')?.value || '').toLowerCase().trim();
    const typeFilter = document.getElementById('job-type-filter')?.value || '';

    // Filter the jobs list
    const filteredJobs = jobsList.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery) ||
        job.description.toLowerCase().includes(searchQuery) ||
        job.skillsRequired.some(s => s.toLowerCase().includes(searchQuery));

      const matchesType = !typeFilter || job.type === typeFilter;

      return matchesSearch && matchesType;
    });

    // Generate jobs cards HTML
    let jobsListHTML = '';
    if (filteredJobs.length === 0) {
      jobsListHTML = `
        <div class="empty-state" style="padding: 48px;">
          <span class="empty-icon">📂</span>
          <p>No matching positions found. Try expanding your search terms!</p>
        </div>
      `;
    } else {
      filteredJobs.forEach(job => {
        // Calculate Match Score
        const matchingSkills = job.skillsRequired.filter(s => 
          studentSkills.some(ss => ss.toLowerCase() === s.toLowerCase())
        );
        const matchPercent = job.skillsRequired.length > 0 
          ? Math.round((matchingSkills.length / job.skillsRequired.length) * 100) 
          : 0;

        let matchColor = '#ef4444'; // Red
        if (matchPercent >= 66) matchColor = '#10b981'; // Green
        else if (matchPercent >= 33) matchColor = '#f59e0b'; // Amber

        const missingSkills = job.skillsRequired.filter(s => !matchingSkills.includes(s));

        jobsListHTML += `
          <div class="glass-card job-card" style="padding: 24px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 16px; position: relative;" data-id="${job.id}">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
              <div>
                <h4 style="font-family: var(--font-heading); font-size: 17px; font-weight: 700; margin: 0; color: var(--text-primary);">${job.title}</h4>
                <div style="font-size: 13.5px; font-weight: 600; color: var(--primary-light); margin-top: 4px;">${job.company} • <span style="color: var(--text-muted); font-weight: 500;">${job.location}</span></div>
              </div>
              
              <!-- Match score gauge -->
              <div style="text-align: center; flex-shrink: 0;" title="Skills match score">
                <div style="background: rgba(255,255,255,0.03); border: 1.5px solid ${matchColor}; color: ${matchColor}; font-weight: 800; font-size: 14px; width: 48px; height: 48px; border-radius: var(--border-radius-sm); display: flex; align-items: center; justify-content: center;">
                  ${matchPercent}%
                </div>
                <span style="font-size: 8px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-top: 4px; display: block;">Match</span>
              </div>
            </div>

            <!-- Description -->
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin: 0;">${job.description}</p>

            <!-- Skills Analysis -->
            <div style="background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 12px;">
              <div style="margin-bottom: 6px; font-weight: 600; color: var(--text-muted);">SKILLS PROFILE:</div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${matchingSkills.map(s => `<span style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #34d399; padding: 2px 6px; border-radius: 4px; font-weight: 600;">✓ ${s}</span>`).join('')}
                ${missingSkills.map(s => `<span style="background: rgba(239,68,68,0.06); border: 1px dashed rgba(239,68,68,0.2); color: #f87171; padding: 2px 6px; border-radius: 4px; font-weight: 500;">Missing: ${s}</span>`).join('')}
              </div>
            </div>

            <!-- Footers / Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; gap: 12px; flex-wrap: wrap;">
              <span style="font-size: 13px; font-weight: 700; color: var(--color-xp);">${job.salary}</span>
              
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-secondary btn-outreach" data-job-id="${job.id}" style="padding: 6px 12px; font-size: 11px;">✉ Outreach Writer</button>
                <button class="btn btn-primary btn-track-job" data-job-id="${job.id}" style="padding: 6px 12px; font-size: 11px;">🎯 Track Role</button>
              </div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto;">
        
        <!-- Header banner -->
        <div class="glass-card" style="padding: 24px; border-top: 4px solid var(--primary); text-align: left;">
          <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; margin: 0 0 6px 0; display: flex; align-items: center; gap: 8px;">
            <span>💼</span> College &amp; Internship Search Center
          </h3>
          <p style="color: var(--text-secondary); font-size: 13.5px; margin: 0;">Match your current skills profile with high-value internships, on-campus research jobs, and professional roles.</p>
        </div>

        <!-- Controls Row -->
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; width: 100%;">
          <div style="position: relative; flex: 1; min-width: 250px;">
            <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 14px;">🔍</span>
            <input type="text" id="job-search-input" class="form-control" placeholder="Search internships by role, company, or required skill..." style="padding-left: 36px; height: 38px; font-size: 13px;" value="${searchQuery}">
          </div>
          
          <select id="job-type-filter" class="form-control" style="width: 180px; height: 38px; font-size: 13px; cursor: pointer;">
            <option value="">All Job Types</option>
            <option value="Internship" ${typeFilter === 'Internship' ? 'selected' : ''}>Internship</option>
            <option value="Research Assistantship" ${typeFilter === 'Research Assistantship' ? 'selected' : ''}>Research Assistantship</option>
          </select>
        </div>

        <!-- Jobs Grid List -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
          ${jobsListHTML}
        </div>

      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById('job-search-input');
    const typeFilter = document.getElementById('job-type-filter');

    if (searchInput) {
      searchInput.oninput = () => this.render();
    }
    if (typeFilter) {
      typeFilter.onchange = () => this.render();
    }

    const state = LeveledApp.state;
    const user = state.user || {};
    const country = user.country || 'United States';
    const jobsList = getJobsDatabase(country);

    // Outreach Writer Buttons
    document.querySelectorAll('.btn-outreach').forEach(btn => {
      btn.onclick = () => {
        const jobId = btn.dataset.jobId;
        const job = jobsList.find(j => j.id === jobId);
        if (job) {
          this.openOutreachModal(job);
        }
      };
    });

    // Track Role Buttons
    document.querySelectorAll('.btn-track-job').forEach(btn => {
      btn.onclick = () => {
        const jobId = btn.dataset.jobId;
        const job = jobsList.find(j => j.id === jobId);
        if (job) {
          this.trackJobRole(job);
        }
      };
    });
  },

  openOutreachModal(job) {
    const state = LeveledApp.state;
    const user = state.user || {};
    const studentName = user.name || 'Student';
    const major = user.careerGoals || 'Field of Study';
    const skillsList = (user.skills || []).join(', ');

    // Generate cold outreach draft text
    const emailDraft = `Subject: Inquiry regarding ${job.title} opportunities at ${job.company} - ${studentName}

Dear Recruiter,

I hope this message finds you well. 

My name is ${studentName}, and I am currently a college student majoring in ${major}. I came across the ${job.title} role at ${job.company} and felt compelled to reach out as the responsibilities align perfectly with my skills and active development.

I have spent the past year building hands-on experience in ${skillsList || 'project development'}. I have recently completed portfolio capstone works showcasing these strengths, which you can view live on my customizable Leveld Portfolio: http://localhost:3000/#portfolio.

I would love to learn more about the team's engineering challenges and discuss how my background in ${user.skills?.[0] || 'project execution'} can contribute to ${job.company}. Are you available for a brief 10-minute chat next week?

Thank you for your time and consideration.

Warm regards,
${studentName}
Leveld Portfolio: http://localhost:3000/#portfolio
Email: ${user.email || 'student@university.edu'}`;

    LeveledApp.openModal(`
      <div style="text-align: left; padding: 10px 4px;">
        <span style="font-size: 11px; font-weight: 800; background: rgba(99,102,241,0.1); color: var(--primary-light); padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">AI Outreach Writer</span>
        <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin: 12px 0 6px 0;">Recruiter Cold Email Generator</h3>
        <p style="color: var(--text-secondary); font-size: 12px; margin-bottom: 16px;">This personalized pitch template is designed for ${job.company}'s ${job.title} opening, integrating your skills and active portfolio link.</p>
        
        <textarea id="jobs-email-draft-area" class="form-control" rows="12" style="font-family: monospace; font-size: 12px; line-height: 1.5; padding: 14px; background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 8px; width: 100%; resize: vertical;">${emailDraft}</textarea>
        
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal()">Close</button>
          <button class="btn btn-primary" id="btn-copy-outreach-email" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); border: none; padding: 8px 20px;">📋 Copy Draft</button>
        </div>
      </div>
    `);

    // Copy to clipboard handler
    const copyBtn = document.getElementById('btn-copy-outreach-email');
    if (copyBtn) {
      copyBtn.onclick = () => {
        const text = document.getElementById('jobs-email-draft-area').value;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.textContent = '✓ Copied!';
          LeveledApp.showToast('📋 Email template copied to clipboard!');
          setTimeout(() => {
            copyBtn.textContent = '📋 Copy Draft';
          }, 2000);
        }).catch(err => {
          console.error('Copy failed:', err);
        });
      };
    }
  },

  trackJobRole(job) {
    const state = LeveledApp.state;
    state.savedOpportunities = state.savedOpportunities || [];
    state.opportunityApplications = state.opportunityApplications || {};

    if (state.savedOpportunities.includes(job.id)) {
      LeveledApp.showToast(`Already tracking the ${job.title} position at ${job.company}.`);
      return;
    }

    // Save and track
    state.savedOpportunities.push(job.id);
    state.opportunityApplications[job.id] = 'in_progress';

    // Mock an opportunity for detail mapping
    const hasMockOpp = OPPORTUNITIES.some(o => o.id === job.id);
    if (!hasMockOpp) {
      OPPORTUNITIES.push({
        id: job.id,
        name: `${job.title} (${job.company})`,
        category: 'internship',
        difficulty: 'Medium',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days out
        description: job.description,
        location: job.location,
        url: job.link
      });
    }

    // Add calendar event
    state.calendarEvents = state.calendarEvents || [];
    state.calendarEvents.push({
      id: `evt-${Date.now()}`,
      title: `Apply: ${job.title} at ${job.company}`,
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'opportunity',
      oppId: job.id,
      notes: `Target internship: ${job.salary}. Location: ${job.location}`
    });

    // Award XP
    LeveledApp.addXP(40, `Tracked ${job.title} internship application`);
    LeveledApp.showToast(`🎯 Saved ${job.title} to tracked roles and calendar!`);
    
    this.render();
  }
};
