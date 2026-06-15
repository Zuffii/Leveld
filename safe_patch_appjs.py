import re

with open('app.js', 'r') as f:
    appjs = f.read()

# Add the setupInteractivity method to the LeveledApp class
interactivity_method = """
  setupInteractivity() {
    // 1. Scroll Reveal Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    // 2. 3D Tilt & Flashlight Hover Effects
    const cards = document.querySelectorAll('.blitzit-bento');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });

    // 3. Mockup Tabs Interactivity
    const tabBtns = document.querySelectorAll('.mockup-tab-btn');
    const tabPanels = document.querySelectorAll('.mockup-content-panel');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }
"""

if "setupInteractivity" not in appjs:
    # Insert before handleRouting
    appjs = appjs.replace("  handleRouting() {", interactivity_method + "\n  handleRouting() {")
    
    # Update renderPage
    render_page_target = "    document.getElementById('main-content').innerHTML = pageContent;"
    render_page_replacement = """    document.getElementById('main-content').innerHTML = pageContent;
    
    // Add brief delay to ensure DOM is fully painted before attaching observers
    setTimeout(() => {
      this.setupInteractivity();
    }, 100);"""
    
    appjs = appjs.replace(render_page_target, render_page_replacement)

    with open('app.js', 'w') as f:
        f.write(appjs)
    print("Safely patched app.js!")
else:
    print("app.js already patched!")
