export const Landing = {
  render() {
    const container = document.getElementById('landing-layout');
    if (!container) return;
    // Get list of saved local users
    const users = this.getSavedUsers();
    container.innerHTML = `
      <div class="landing-universe">
        <!-- Global Animated Background Mesh Blobs -->
        <div class="mesh-blob blob-1"></div>
        <div class="mesh-blob blob-2"></div>
        <div class="mesh-blob blob-3"></div>
        <div class="mesh-blob blob-4"></div>
        <div class="mesh-blob blob-5"></div>
        <div class="mesh-blob blob-6"></div>

        <!-- Side Glow Anchors -->
        <div class="side-glow side-glow-left-1"></div>
        <div class="side-glow side-glow-right-1"></div>
        <div class="side-glow side-glow-left-2"></div>
        <div class="side-glow side-glow-right-2"></div>
        <div class="side-glow side-glow-left-3"></div>

        <!-- Abstract Technical Watermarks (Option 2 - Colored, Spaced Out & Science/Maths Themed) -->
        <div class="floating-side-element tech-watermark wm-left wm-blue delay-1" style="top: 400px;">
          <!-- Maths: Trajectory Graph -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <line x1="10" y1="90" x2="95" y2="90" stroke-dasharray="3,3" />
            <line x1="10" y1="10" x2="10" y2="95" stroke-dasharray="3,3" />
            <path d="M 10 90 Q 30 75 50 40 T 90 10" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" />
            <circle cx="50" cy="40" r="3" fill="currentColor" />
            <circle cx="90" cy="10" r="3" fill="currentColor" />
            <text x="15" y="20" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">y = f(x)</text>
            <text x="70" y="85" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">growth</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-purple delay-2" style="top: 1100px;">
          <!-- Physics: Precision Radar Reticle -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="20" stroke-dasharray="4,4" />
            <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.8" />
            <line x1="50" y1="5" x2="50" y2="95" />
            <line x1="5" y1="50" x2="95" y2="50" />
            <path d="M 50 50 L 78 22" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" />
            <text x="82" y="25" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">r = 0.94</text>
            <path d="M 60 50 A 10 10 0 0 0 57 43" stroke="currentColor" />
            <text x="62" y="42" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">45°</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-emerald delay-3" style="top: 1800px;">
          <!-- Maths: Score Column Vectors Matrix -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M 20 10 L 10 10 L 10 90 L 20 90" stroke-width="1.5" />
            <path d="M 80 10 L 90 10 L 90 90 L 80 90" stroke-width="1.5" />
            <text x="23" y="33" font-size="9" fill="currentColor" opacity="0.8" font-family="monospace" font-weight="bold">EC</text>
            <text x="23" y="53" font-size="9" fill="currentColor" opacity="0.8" font-family="monospace" font-weight="bold">GPA</text>
            <text x="23" y="73" font-size="9" fill="currentColor" opacity="0.8" font-family="monospace" font-weight="bold">SAT</text>
            <text x="53" y="33" font-size="9" fill="currentColor" fill-opacity="0.85" font-family="monospace" font-weight="bold">0.92</text>
            <text x="53" y="53" font-size="9" fill="currentColor" fill-opacity="0.85" font-family="monospace" font-weight="bold">4.00</text>
            <text x="53" y="73" font-size="9" fill="currentColor" fill-opacity="0.85" font-family="monospace" font-weight="bold">1580</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-amber delay-1" style="top: 2500px;">
          <!-- Chemistry: Benzene Ring C6H6 -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke-width="1.5" />
            <line x1="50" y1="22" x2="74" y2="36" stroke-width="1" />
            <line x1="74" y1="64" x2="50" y2="78" stroke-width="1" />
            <line x1="26" y1="64" x2="26" y2="36" stroke-width="1" />
            <text x="45" y="10" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="84" y="32" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="84" y="73" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="45" y="93" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="8" y="73" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="8" y="32" font-size="7" fill="currentColor" opacity="0.8">CH</text>
            <text x="35" y="52" font-size="6" fill="currentColor" opacity="0.6" font-family="monospace">C6H6</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-pink delay-2" style="top: 3200px;">
          <!-- Maths: Gaussian Admissions Bell Curve -->
          <svg viewBox="0 0 100 70" fill="none" stroke="currentColor">
            <line x1="5" y1="60" x2="95" y2="60" />
            <path d="M 5 60 C 25 60, 35 15, 50 15 C 65 15, 75 60, 95 60" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" />
            <line x1="50" y1="15" x2="50" y2="60" stroke-dasharray="2,2" />
            <text x="53" y="25" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">μ = Admit</text>
            <text x="70" y="45" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">+1σ</text>
            <text x="20" y="45" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">-1σ</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-cyan delay-3" style="top: 3900px;">
          <!-- Physics: Atom Orbits -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="40" ry="14" transform="rotate(30 50 50)" stroke-width="1" />
            <ellipse cx="50" cy="50" rx="40" ry="14" transform="rotate(-30 50 50)" stroke-width="1" />
            <ellipse cx="50" cy="50" rx="40" ry="14" transform="rotate(90 50 50)" stroke-dasharray="2,2" stroke-width="1" />
            <circle cx="20" cy="33" r="3" fill="currentColor" />
            <circle cx="80" cy="67" r="3" fill="currentColor" />
            <circle cx="50" cy="10" r="2.5" fill="currentColor" />
            <text x="15" y="15" font-size="7" fill="currentColor" opacity="0.6" font-family="monospace">Atom</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-indigo delay-1" style="top: 4600px;">
          <!-- Maths: Potential Columns -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <line x1="10" y1="90" x2="90" y2="90" />
            <rect x="20" y="70" width="10" height="20" fill="currentColor" fill-opacity="0.05" stroke="currentColor" />
            <rect x="40" y="50" width="10" height="40" fill="currentColor" fill-opacity="0.05" stroke="currentColor" />
            <rect x="60" y="30" width="10" height="60" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.6" />
            <rect x="80" y="15" width="10" height="75" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-opacity="0.8" />
            <line x1="15" y1="15" x2="95" y2="15" stroke-dasharray="2,2" />
            <text x="40" y="10" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">MAX_POTENTIAL</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-orange delay-2" style="top: 5300px;">
          <!-- Physics: Pendulum Vector Diagram -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <line x1="20" y1="10" x2="80" y2="10" stroke-width="2" />
            <line x1="50" y1="10" x2="70" y2="60" stroke-width="1" />
            <circle cx="70" cy="60" r="5" fill="currentColor" opacity="0.6" />
            <path d="M 70 60 L 70 85" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.2" />
            <path d="M 70 60 L 50 70" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.2" />
            <text x="73" y="80" font-size="6" fill="currentColor" opacity="0.7">Fg = mg</text>
            <text x="45" y="65" font-size="6" fill="currentColor" opacity="0.7">Ft</text>
            <path d="M 50 10 L 50 70" stroke-dasharray="2,2" stroke-width="0.5" />
            <path d="M 50 30 A 20 20 0 0 1 57 28" stroke="currentColor" />
            <text x="52" y="25" font-size="6" fill="currentColor" opacity="0.7">θ</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-teal delay-3" style="top: 6000px;">
          <!-- Maths: Network Nodes Graph -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="20" cy="50" r="4" fill="currentColor" />
            <circle cx="50" cy="20" r="4" fill="currentColor" />
            <circle cx="50" cy="80" r="4" fill="currentColor" />
            <circle cx="80" cy="50" r="4" fill="currentColor" />
            <circle cx="50" cy="50" r="6" fill="currentColor" fill-opacity="0.3" />
            <line x1="20" y1="50" x2="50" y2="20" stroke-width="1" />
            <line x1="20" y1="50" x2="50" y2="80" stroke-width="1" />
            <line x1="50" y1="20" x2="80" y2="50" stroke-width="1" />
            <line x1="50" y1="80" x2="80" y2="50" stroke-width="1" />
            <line x1="20" y1="50" x2="50" y2="50" stroke-width="1" stroke-dasharray="2,2" />
            <line x1="50" y1="20" x2="50" y2="50" stroke-width="1" stroke-dasharray="2,2" />
            <line x1="50" y1="80" x2="50" y2="50" stroke-width="1" stroke-dasharray="2,2" />
            <line x1="80" y1="50" x2="50" y2="50" stroke-width="1" stroke-dasharray="2,2" />
            <text x="15" y="15" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">Network</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-fuchsia delay-1" style="top: 6700px;">
          <!-- Chemistry: Beaker & Reaction -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M 35 15 L 35 25 L 15 80 L 85 80 L 65 25 L 65 15" stroke-width="1.5" />
            <line x1="30" y1="15" x2="70" y2="15" stroke-width="2" />
            <path d="M 20 65 Q 50 63 80 65" stroke-dasharray="2,2" />
            <circle cx="40" cy="50" r="3" />
            <circle cx="60" cy="40" r="2.5" />
            <circle cx="48" cy="35" r="2" />
            <circle cx="55" cy="58" r="3.5" />
            <text x="22" y="92" font-size="7" fill="currentColor" opacity="0.6" font-family="monospace">2H2+O2->2H2O</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-rose delay-2" style="top: 7400px;">
          <!-- Maths: Summation, Integration, Pi -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <text x="15" y="45" font-size="28" fill="currentColor" opacity="0.6" font-family="Outfit, sans-serif" font-weight="200">∑</text>
            <text x="45" y="75" font-size="28" fill="currentColor" opacity="0.6" font-family="Outfit, sans-serif" font-weight="200">∫</text>
            <text x="68" y="40" font-size="24" fill="currentColor" opacity="0.6" font-family="Outfit, sans-serif" font-weight="200">π</text>
            <line x1="10" y1="85" x2="90" y2="85" stroke-width="1" />
            <text x="15" y="95" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">Math Formulas</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-lime delay-3" style="top: 8100px;">
          <!-- Physics: Einstein Relativity -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <rect x="10" y="10" width="80" height="80" stroke-dasharray="3,3" />
            <line x1="50" y1="10" x2="50" y2="90" stroke-dasharray="3,3" />
            <line x1="10" y1="50" x2="90" y2="50" stroke-dasharray="3,3" />
            <path d="M 10 80 C 40 80, 70 65, 90 20" stroke-width="1.5" stroke="currentColor" stroke-opacity="0.5" />
            <text x="25" y="35" font-size="12" fill="currentColor" font-family="Outfit, sans-serif" font-weight="600">E = mc²</text>
            <text x="15" y="88" font-size="6" fill="currentColor" opacity="0.6" font-family="monospace">Relativity</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-red delay-1" style="top: 8800px;">
          <!-- Physics/Biology: DNA Double Helix -->
          <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
            <path d="M 10 60 Q 30 20, 50 60 T 90 60 T 110 60" stroke-width="1.5" stroke-dasharray="2,2" />
            <path d="M 10 60 Q 30 100, 50 60 T 90 60 T 110 60" stroke-width="1.5" />
            <line x1="20" y1="45" x2="20" y2="75" stroke-width="0.5" />
            <line x1="30" y1="35" x2="30" y2="85" stroke-width="0.5" />
            <line x1="40" y1="45" x2="40" y2="75" stroke-width="0.5" />
            <line x1="60" y1="45" x2="60" y2="75" stroke-width="0.5" />
            <line x1="70" y1="35" x2="70" y2="85" stroke-width="0.5" />
            <line x1="80" y1="45" x2="80" y2="75" stroke-width="0.5" />
            <circle cx="30" cy="35" r="1.5" fill="currentColor" />
            <circle cx="30" cy="85" r="1.5" fill="currentColor" />
            <circle cx="70" cy="35" r="1.5" fill="currentColor" />
            <circle cx="70" cy="85" r="1.5" fill="currentColor" />
            <text x="15" y="15" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">DNA Helix</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-blue delay-2" style="top: 9500px;">
          <!-- Maths: Trigonometric Triangle -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <polygon points="20,20 20,80 80,80" stroke-width="1.5" />
            <rect x="20" y="75" width="5" height="5" />
            <text x="48" y="43" font-size="7" fill="currentColor" opacity="0.7" font-family="monospace">c = hyp</text>
            <text x="45" y="88" font-size="7" fill="currentColor" opacity="0.7" font-family="monospace">a = adj</text>
            <text x="5" y="55" font-size="7" fill="currentColor" opacity="0.7" transform="rotate(-90 5 55)" font-family="monospace">b = opp</text>
            <path d="M 70 80 A 10 10 0 0 0 73 73" stroke="currentColor" />
            <text x="66" y="77" font-size="6" fill="currentColor" opacity="0.6">θ</text>
            <text x="35" y="15" font-size="6" fill="currentColor" opacity="0.5" font-family="monospace">sin²θ+cos²θ=1</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-purple delay-3" style="top: 10200px;">
          <!-- Physics: Target Sweep Polar Radar -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="45" stroke-dasharray="2,2" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" stroke-dasharray="2,2" />
            <line x1="50" y1="5" x2="50" y2="95" stroke-width="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke-width="0.5" />
            <path d="M 50 50 L 85 70" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" />
            <path d="M 50 50 L 92 35" stroke-width="0.5" />
            <text x="55" y="45" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">Target: Ivy</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-emerald delay-1" style="top: 10900px;">
          <!-- Maths: 3D Wireframe Cube -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <rect x="20" y="35" width="45" height="45" stroke-width="1" />
            <rect x="35" y="20" width="45" height="45" stroke-width="1" stroke-dasharray="3,3" />
            <line x1="20" y1="35" x2="35" y2="20" stroke-width="1" />
            <line x1="65" y1="35" x2="80" y2="20" stroke-width="1" />
            <line x1="20" y1="80" x2="35" y2="65" stroke-width="1" stroke-dasharray="3,3" />
            <line x1="65" y1="80" x2="80" y2="65" stroke-width="1" />
            <text x="20" y="15" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">Dimensions</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-amber delay-2" style="top: 11600px;">
          <!-- Chemistry: Crystalline Lattice -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <circle cx="50" cy="20" r="3" fill="currentColor" />
            <circle cx="80" cy="20" r="3" fill="currentColor" />
            <circle cx="20" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="80" cy="50" r="3" fill="currentColor" />
            <circle cx="20" cy="80" r="3" fill="currentColor" />
            <circle cx="50" cy="80" r="3" fill="currentColor" />
            <circle cx="80" cy="80" r="3" fill="currentColor" />
            <line x1="20" y1="20" x2="80" y2="20" stroke-width="0.8" />
            <line x1="20" y1="50" x2="80" y2="50" stroke-width="0.8" />
            <line x1="20" y1="80" x2="80" y2="80" stroke-width="0.8" />
            <line x1="20" y1="20" x2="20" y2="80" stroke-width="0.8" />
            <line x1="50" y1="20" x2="50" y2="80" stroke-width="0.8" />
            <line x1="80" y1="20" x2="80" y2="80" stroke-width="0.8" />
            <text x="25" y="95" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">NaCl Crystal</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-pink delay-3" style="top: 12300px;">
          <!-- Physics: Electromagnetic Field Lines -->
          <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
            <rect x="25" y="55" width="10" height="10" fill="currentColor" opacity="0.5" />
            <rect x="85" y="55" width="10" height="10" fill="currentColor" opacity="0.5" />
            <text x="28" y="63" font-size="7" fill="currentColor" font-weight="bold">N</text>
            <text x="88" y="63" font-size="7" fill="currentColor" font-weight="bold">S</text>
            <path d="M 35 60 C 35 20, 85 20, 85 60" stroke-width="1" />
            <path d="M 35 60 C 35 10, 85 10, 85 60" stroke-width="1" stroke-dasharray="2,2" />
            <path d="M 35 60 C 35 100, 85 100, 85 60" stroke-width="1" />
            <path d="M 35 60 C 35 110, 85 110, 85 60" stroke-width="1" stroke-dasharray="2,2" />
            <text x="45" y="15" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">B-Field</text>
          </svg>
        </div>

        <!-- NEW WATERMARKS ADDED FOR MORE SPACING & STEM DIVERSITY -->

        <div class="floating-side-element tech-watermark wm-left wm-emerald delay-1" style="top: 10300px;">
          <!-- Chemistry: Flask with Bubbles -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M 42 20 L 58 20 M 45 20 L 45 35 L 25 75 A 8 8 0 0 0 32 85 L 68 85 A 8 8 0 0 0 75 75 L 55 35 L 55 20" stroke-width="1.5" />
            <path d="M 30 68 H 70" stroke-dasharray="2,2" stroke-opacity="0.6" />
            <circle cx="50" cy="55" r="3" fill="currentColor" fill-opacity="0.3" />
            <circle cx="43" cy="45" r="2" fill="currentColor" fill-opacity="0.3" />
            <circle cx="56" cy="38" r="1.5" fill="currentColor" fill-opacity="0.3" />
            <text x="32" y="95" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">Chemistry</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-purple delay-2" style="top: 10850px;">
          <!-- Maths: Fibonacci Golden Spiral -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M 50 50 A 5 5 0 0 1 45 50 A 10 10 0 0 1 55 50 A 20 20 0 0 1 35 50 A 35 35 0 0 1 70 50 A 55 55 0 0 1 15 50" stroke-width="1.2" stroke-opacity="0.8" />
            <rect x="15" y="15" width="70" height="70" stroke-dasharray="3,3" stroke-opacity="0.4" />
            <line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3,3" stroke-opacity="0.4" />
            <text x="54" y="47" font-size="6" fill="currentColor" opacity="0.8" font-family="monospace">φ = 1.618</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-cyan delay-3" style="top: 11400px;">
          <!-- Physics: Electromagnetic Wave / Sine Wave -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <line x1="5" y1="50" x2="95" y2="50" stroke-dasharray="2,2" stroke-opacity="0.6" />
            <line x1="10" y1="10" x2="10" y2="90" stroke-dasharray="2,2" stroke-opacity="0.6" />
            <path d="M 10 50 Q 25 20 40 50 T 70 50 T 100 50" stroke-width="1.5" />
            <path d="M 10 20 Q 25 50 40 80 T 70 50 T 100 20" stroke-dasharray="3,3" stroke-width="1" stroke-opacity="0.7" />
            <text x="15" y="15" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">λ = h / p</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-amber delay-1" style="top: 11950px;">
          <!-- Chemistry: Periodic Table Element Card for "Lv" (Leveld) -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <rect x="15" y="15" width="70" height="70" rx="6" stroke-width="1.5" />
            <text x="22" y="30" font-size="8" fill="currentColor" opacity="0.8" font-family="monospace">116</text>
            <text x="35" y="58" font-size="24" fill="currentColor" font-weight="bold" font-family="Outfit, sans-serif">Lv</text>
            <text x="32" y="74" font-size="7" fill="currentColor" opacity="0.7" font-family="monospace">Leveld</text>
            <text x="25" y="81" font-size="5" fill="currentColor" opacity="0.5" font-family="monospace">[Rn] 5f¹⁴ 6d¹0 7s² 7p⁴</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-left wm-pink delay-2" style="top: 12500px;">
          <!-- Maths: Venn Diagram of Metrics -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="40" cy="45" r="24" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <circle cx="60" cy="45" r="24" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <circle cx="50" cy="62" r="24" stroke-width="1.2" fill="currentColor" fill-opacity="0.04" />
            <text x="26" y="38" font-size="6" fill="currentColor" opacity="0.7" font-family="monospace">GPA</text>
            <text x="62" y="38" font-size="6" fill="currentColor" opacity="0.7" font-family="monospace">SAT</text>
            <text x="46" y="74" font-size="6" fill="currentColor" opacity="0.7" font-family="monospace">ECs</text>
            <text x="44" y="52" font-size="6" fill="currentColor" font-weight="bold">IVY</text>
          </svg>
        </div>

        <div class="floating-side-element tech-watermark wm-right wm-blue delay-3" style="top: 13050px;">
          <!-- Physics: Prism Light Refraction -->
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <polygon points="50,20 20,75 80,75" stroke-width="1.5" fill="currentColor" fill-opacity="0.03" />
            <line x1="5" y1="58" x2="35" y2="48" stroke-width="1.5" />
            <path d="M 35 48 L 50 45 L 85 30" stroke-width="1.2" stroke-opacity="0.8" />
            <path d="M 35 48 L 51 51 L 90 44" stroke-width="1" stroke-opacity="0.7" />
            <path d="M 35 48 L 52 57 L 92 60" stroke-dasharray="2,2" stroke-width="0.8" stroke-opacity="0.6" />
            <text x="15" y="42" font-size="7" fill="currentColor" opacity="0.8" font-family="monospace">Refraction</text>
          </svg>
        </div>
        
        <!-- Premium Floating Navigation Header (Dynamic Island) -->
        <nav class="premium-island">
          <div class="premium-island-brand">
            <div class="premium-island-logo">
              <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; padding: 2px; box-sizing: border-box;">
                <!-- Wide flat mortarboard cap board -->
                <polygon points="4,33 45,17 88,29 45,43" fill="currentColor"/>
                <!-- Cap quadrant ridge lines -->
                <line x1="4" y1="33" x2="88" y2="29" stroke="rgba(255,255,255,0.7)" stroke-width="2.5"/>
                <line x1="45" y1="17" x2="45" y2="43" stroke="rgba(255,255,255,0.7)" stroke-width="2.5"/>
                <!-- Cap top button/knob -->
                <polygon points="45,10 51,15 45,20 39,15" fill="currentColor"/>
                <!-- Cap collar connecting to L stem -->
                <rect x="38" y="41" width="14" height="9" fill="currentColor"/>
                <!-- L vertical stem (thick, filled) -->
                <rect x="34" y="38" width="20" height="65" fill="currentColor"/>
                <!-- L horizontal foot -->
                <rect x="34" y="89" width="46" height="14" fill="currentColor"/>
                <!-- Tassel cord from right corner of cap -->
                <line x1="84" y1="29" x2="84" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <!-- Tassel bead/knot -->
                <circle cx="84" cy="53" r="4" fill="currentColor"/>
                <!-- Tassel fan/bunch -->
                <polygon points="78,58 90,58 87,70 81,70" fill="currentColor"/>
              </svg>
            </div>
            <span class="premium-island-name">Leveld</span>
          </div>
          
          <div class="premium-island-links landing-nav-links">
            <a href="#features">Features</a>
            <a href="#calculator">Calculator</a>
            <a href="#why-leveld">Universities</a>
            <a href="#landing-testimonials">Testimonials</a>
            <a href="#landing-pricing">Pricing</a>
          </div>
          <div class="premium-island-actions">
            <button class="btn-ghost" id="btn-landing-login">Log In</button>
            <button class="btn-solid" id="btn-landing-signup">Get Started</button>
          </div>
        </nav>
        
        <!-- Breathtaking Hero Section -->
        <header class="premium-hero landing-hero" style="position: relative; overflow: hidden; background: transparent;">
          <!-- 3D Floating Elements -->
          <div class="float-3d f3d-1">📚</div>
          <div class="float-3d f3d-2">🎓</div>
          <div class="float-3d f3d-3">💡</div>
          <div class="float-3d f3d-4">🌟</div>
          
          <!-- Floating University Cards -->
          <div class="float-uni funi-mit apple-reveal">
            <img src="assets/mit_campus.png" alt="MIT Campus">
            <span class="uni-name-tag">MIT</span>
          </div>
          <div class="float-uni funi-harvard apple-reveal">
            <img src="assets/harvard_campus.png" alt="Harvard Campus">
            <span class="uni-name-tag">Harvard</span>
          </div>
          <div class="float-uni funi-stanford apple-reveal">
            <img src="assets/stanford_campus.png" alt="Stanford Campus">
            <span class="uni-name-tag">Stanford</span>
          </div>
          
          <div class="hero-content-wrapper" style="animation: view-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
            <div class="hero-badge">
              <span class="pulse-dot"></span> v3.1.0 Native macOS & iOS Integration
            </div>
            
            <h1 class="hero-headline">
              When student life gets overwhelming, just <span class="animated-colored-text">level it.</span>
            </h1>
            
            <p class="hero-subline">
              Prioritize what matters. Remove distraction, and get your applications, essays, and research done in flow state.
            </p>
            
            <button class="hero-cta-btn" id="btn-hero-start">
              Try Leveld now 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <!-- Floating Glassmorphic App Mockup Window -->
          <div class="hero-mockup-wrapper hero-mockup">
             <div class="hero-mockup-window">
                <div class="window-header">
                   <div class="window-dots">
                      <span style="background: #ef4444; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
                      <span style="background: #eab308; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-left: 6px;"></span>
                      <span style="background: #22c55e; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-left: 6px;"></span>
                   </div>
                   <div style="margin-left: 20px; font-family: var(--font-heading); font-weight: 800; font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                     <span>🗺️</span> Leveld OS — Upcoming Roadmap Track
                   </div>
                </div>
                <div class="window-body" style="display: flex; flex-direction: column; padding: 24px; background: var(--bg-secondary); height: auto; min-height: 280px;">
                  <!-- Roadmap Track visual nodes simulation -->
                  <div style="display: flex; justify-content: space-between; position: relative; margin: 12px 0 28px 0; padding: 10px 0;">
                    <div style="position: absolute; top: 20px; left: 10px; right: 10px; height: 3px; background-color: var(--border-color); z-index: 1;"></div>
                    
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; position: relative; flex: 1;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background-color: var(--bg-primary); border: 2.5px solid var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: var(--shadow-sm);">📝</div>
                      <span style="font-size: 10px; font-weight: 800; color: var(--text-primary); margin-top: 8px; text-align: center;">AP CS Exam</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; position: relative; flex: 1;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background-color: var(--bg-primary); border: 2.5px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: var(--shadow-sm);">💡</div>
                      <span style="font-size: 10px; font-weight: 800; color: var(--text-primary); margin-top: 8px; text-align: center;">Research Sprint</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center; z-index: 2; position: relative; flex: 1;">
                      <div style="width: 36px; height: 36px; border-radius: 50%; background-color: var(--bg-primary); border: 2.5px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: var(--shadow-sm);">🎯</div>
                      <span style="font-size: 10px; font-weight: 800; color: var(--text-primary); margin-top: 8px; text-align: center;">MIT App Deadline</span>
                    </div>
                  </div>
                  <!-- Assistant Recommendation Card -->
                  <div class="mockup-card" style="padding: 16px; display: flex; flex-direction: column; gap: 10px; background: var(--bg-primary); border-radius: 12px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); text-align: left;">
                    <div style="display: flex; gap: 8px; align-items: center;">
                       <span style="font-size: 18px;">🤖</span>
                       <strong style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Ivy's Recommendations</strong>
                    </div>
                    <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">
                       "Your candidate narrative is strong, but your AP Computer Science test date is in 4 days. Let's start the AP mock review roadmap to secure your level 5 score."
                    </div>
                    <div style="display: flex; gap: 6px; margin-top: 4px;">
                       <span style="font-size: 9px; font-weight: 800; background: rgba(37, 99, 235, 0.1); color: var(--primary); padding: 2px 6px; border-radius: 4px;">AP PREP</span>
                       <span style="font-size: 9px; font-weight: 800; background: rgba(168, 85, 247, 0.1); color: var(--color-xp); padding: 2px 6px; border-radius: 4px;">+500 XP</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </header>

        <!-- Stats Bar Section (Bento Overhaul) -->
        <section class="premium-stats-section" style="position: relative; overflow: hidden; padding: 48px 24px; background: transparent;">
          <div class="stats-grid apple-reveal" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto;">
            
            <!-- Card 1: Students Onboarded -->
            <div class="dense-glass-card" style="padding: 24px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; min-height: 160px;">
              <div>
                <div class="stat-number" style="margin: 0; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">12K+</div>
                <div class="stat-label" style="margin-top: 4px;">Students Onboarded</div>
              </div>
              <div class="bento-facepile">
                <div class="facepile-img" style="background: #3b82f6; color: white;">A</div>
                <div class="facepile-img" style="background: #10b981; color: white;">S</div>
                <div class="facepile-img" style="background: #ec4899; color: white;">Y</div>
                <div class="facepile-img" style="background: #f59e0b; color: white;">J</div>
                <div class="facepile-img more-tag">+99</div>
              </div>
            </div>

            <!-- Card 2: Acceptance Boost -->
            <div class="dense-glass-card" style="padding: 24px; text-align: left; display: flex; align-items: center; justify-content: space-between; min-height: 160px;">
              <div style="flex: 1;">
                <div class="stat-number" style="margin: 0; background: linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0ea5e9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">94%</div>
                <div class="stat-label" style="margin-top: 4px;">Acceptance Boost</div>
              </div>
              <div class="bento-dial-container">
                <svg class="bento-dial-svg" viewBox="0 0 80 80">
                  <circle class="bento-dial-bg" cx="40" cy="40" r="32" />
                  <circle class="bento-dial-fill" cx="40" cy="40" r="32" />
                </svg>
                <div class="bento-dial-text">94%</div>
              </div>
            </div>

            <!-- Card 3: Universities Targeted -->
            <div class="dense-glass-card" style="padding: 24px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; min-height: 160px;">
              <div>
                <div class="stat-number" style="margin: 0; background: linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">500+</div>
                <div class="stat-label" style="margin-top: 4px;">Target Universities</div>
              </div>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 10px;">
                <span style="font-size: 9px; font-weight: 800; background: rgba(37,99,235,0.08); color: #2563eb; padding: 2px 6px; border-radius: 4px;">MIT</span>
                <span style="font-size: 9px; font-weight: 800; background: rgba(236,72,153,0.08); color: #ec4899; padding: 2px 6px; border-radius: 4px;">Harvard</span>
                <span style="font-size: 9px; font-weight: 800; background: rgba(139,92,246,0.08); color: #8b5cf6; padding: 2px 6px; border-radius: 4px;">Stanford</span>
              </div>
            </div>

            <!-- Card 4: Student Rating -->
            <div class="dense-glass-card" style="padding: 24px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; min-height: 160px;">
              <div>
                <div class="stat-number" style="margin: 0; background: linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #854d0e 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">4.9★</div>
                <div class="stat-label" style="margin-top: 4px;">Student Rating</div>
              </div>
              <div style="color: #eab308; font-size: 14px; letter-spacing: 2px; margin-top: 8px;">★★★★★</div>
            </div>

          </div>
        </section>

        <!-- Admissions Chance Calculator Section -->
        <section id="calculator" class="calculator-section" style="padding: 80px 24px; background: transparent; border-top: 1px solid rgba(255,255,255,0.3); border-bottom: 1px solid rgba(255,255,255,0.3);">
          <div style="max-width: 1200px; margin: 0 auto;" class="apple-reveal">
            <div style="text-align: center; margin-bottom: 48px;">
              <div class="hero-badge" style="margin-bottom: 12px; background: rgba(6, 182, 212, 0.08); color: #06b6d4; margin-left: auto; margin-right: auto;">
                <span>📊</span> Real-Time Gap Analysis
              </div>
              <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">Calculate your <span class="text-highlight-emerald">admissions chances.</span></h2>
              <p style="color: #475569; font-size: 15px; max-width: 550px; margin: 0 auto;">Select your target school and drag your metrics to see your mock acceptance probability instantly.</p>
            </div>

            <div class="calculator-card dense-glass-card" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; padding: 40px !important;">
              <!-- Inputs Column -->
              <div style="display: flex; flex-direction: column; gap: 24px; text-align: left;">
                
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Target University</label>
                  <select id="calc-uni" class="calculator-select" style="max-width: 100%;">
                    <option value="MIT">MIT (Massachusetts Institute of Technology)</option>
                    <option value="Stanford">Stanford University</option>
                    <option value="Harvard">Harvard University</option>
                    <option value="Yale">Yale University</option>
                    <option value="Princeton">Princeton University</option>
                    <option value="Columbia">Columbia University</option>
                    <option value="Caltech">Caltech</option>
                    <option value="UChicago">University of Chicago</option>
                    <option value="Oxford">Oxford University</option>
                    <option value="Cambridge">Cambridge University</option>
                  </select>
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Unweighted GPA</label>
                    <span id="lbl-calc-gpa" style="font-size: 14px; font-weight: 800; color: var(--primary);">4.00</span>
                  </div>
                  <input type="range" id="slider-calc-gpa" class="calculator-slider" min="2.0" max="4.0" step="0.05" value="3.85">
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">SAT Score</label>
                    <span id="lbl-calc-sat" style="font-size: 14px; font-weight: 800; color: var(--primary);">1500</span>
                  </div>
                  <input type="range" id="slider-calc-sat" class="calculator-slider" min="1000" max="1600" step="10" value="1450">
                </div>

                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label style="font-size: 12px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Extracurricular Tier</label>
                    <span id="lbl-calc-ec" style="font-size: 14px; font-weight: 800; color: var(--primary);">Level 3</span>
                  </div>
                  <input type="range" id="slider-calc-ec" class="calculator-slider" min="1" max="7" step="1" value="3">
                  <div style="display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; font-weight: 700; padding: 0 2px;">
                    <span>Lvl 1 (School Club)</span>
                    <span>Lvl 7 (National Spikes)</span>
                  </div>
                </div>

              </div>

              <!-- Result Column -->
              <div class="calculator-result-box" style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 32px !important; border-radius: 20px; border: 1px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.5); backdrop-filter: blur(8px);">
                <span style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Admissions Probability</span>
                <div id="calc-result-percent" class="calculator-percent">45%</div>
                
                <div style="width: 100%; height: 8px; background: rgba(226, 232, 240, 0.8); border-radius: 4px; overflow: hidden; margin: 16px 0;">
                  <div id="calc-result-bar" class="calculator-bar-fill"></div>
                </div>
                
                <p id="calc-result-advice" style="font-size: 12.5px; color: #475569; line-height: 1.5; margin: 0; min-height: 60px;">
                  Your extracurricular tier is the main gap for MIT. Execute projects in Leveld to level up to 5+ and increase your chances!
                </p>
              </div>

            </div>
          </div>
        </section>

        <!-- App Combine Animation Section -->
        <section id="app-combine" class="app-combine-section" style="padding: 80px 24px; position: relative; background: transparent;">
          <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
            
            <!-- Left Column: Merging Stage -->
            <div class="apple-reveal" style="text-align: left;">
              <div class="hero-badge" style="margin-bottom: 12px; background: rgba(139, 92, 246, 0.08); color: #8b5cf6; width: max-content;">
                <span>🔮</span> The Ultimate Consolidation
              </div>
              <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; text-align: left; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">One Tool to <span class="text-highlight-blue">Replace Them All</span></h2>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
                Watch your fragmented workflow converge into a single, seamless, AI-powered system designed specifically for college prep.
              </p>
              <div class="combine-animation-container" style="margin: 0;">
                <div class="combine-stage" style="transform: scale(0.95);">
                  <div class="leveld-core">
                    <span class="core-logo" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 12px; box-sizing: border-box;">
                      <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                        <!-- Wide flat mortarboard cap board -->
                        <polygon points="4,33 45,17 88,29 45,43" fill="currentColor"/>
                        <!-- Cap quadrant ridge lines -->
                        <line x1="4" y1="33" x2="88" y2="29" stroke="rgba(255,255,255,0.7)" stroke-width="2.5"/>
                        <line x1="45" y1="17" x2="45" y2="43" stroke="rgba(255,255,255,0.7)" stroke-width="2.5"/>
                        <!-- Cap top button/knob -->
                        <polygon points="45,10 51,15 45,20 39,15" fill="currentColor"/>
                        <!-- Cap collar connecting to L stem -->
                        <rect x="38" y="41" width="14" height="9" fill="currentColor"/>
                        <!-- L vertical stem (thick, filled) -->
                        <rect x="34" y="38" width="20" height="65" fill="currentColor"/>
                        <!-- L horizontal foot -->
                        <rect x="34" y="89" width="46" height="14" fill="currentColor"/>
                        <!-- Tassel cord from right corner of cap -->
                        <line x1="84" y1="29" x2="84" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                        <!-- Tassel bead/knot -->
                        <circle cx="84" cy="53" r="4" fill="currentColor"/>
                        <!-- Tassel fan/bunch -->
                        <polygon points="78,58 90,58 87,70 81,70" fill="currentColor"/>
                      </svg>
                    </span>
                    <span class="core-glow"></span>
                  </div>
                  <div class="orbiting-app app-claude">
                    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://anthropic.com&size=128" alt="Claude" style="width: 32px; height: 32px; border-radius: 6px;">
                  </div>
                  <div class="orbiting-app app-chatgpt">
                    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://chatgpt.com&size=128" alt="ChatGPT" style="width: 32px; height: 32px; border-radius: 6px;">
                  </div>
                  <div class="orbiting-app app-notebooklm">
                    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://notebooklm.google.com&size=128" alt="NotebookLM" style="width: 32px; height: 32px; border-radius: 6px;">
                  </div>
                  <div class="orbiting-app app-notion">
                    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://notion.so&size=128" alt="Notion" style="width: 32px; height: 32px; border-radius: 6px;">
                  </div>
                  <div class="orbiting-app app-sme">
                    <img src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://savemyexams.com&size=128" alt="Save My Exams" style="width: 32px; height: 32px; border-radius: 6px;">
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Replacement Bento Cards -->
            <div class="apple-reveal" style="display: grid; grid-template-columns: 1fr; gap: 16px;">
              <div class="dense-glass-card" style="padding: 20px 24px; text-align: left; display: flex; gap: 16px; align-items: flex-start;">
                <div style="font-size: 24px; padding: 10px; background: rgba(139, 92, 246, 0.1); border-radius: 12px; color: #8b5cf6;">🤖</div>
                <div>
                  <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Replaces Claude &amp; ChatGPT limits</h4>
                  <p style="font-size: 12.5px; color: #64748b; line-height: 1.5;">Get unlimited, admissions-tuned suggestions from Ivy without message limits or context window cutoffs.</p>
                </div>
              </div>
              <div class="dense-glass-card" style="padding: 20px 24px; text-align: left; display: flex; gap: 16px; align-items: flex-start;">
                <div style="font-size: 24px; padding: 10px; background: rgba(59, 130, 246, 0.1); border-radius: 12px; color: #3b82f6;">🗺️</div>
                <div>
                  <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Replaces Notion's raw text pages</h4>
                  <p style="font-size: 12.5px; color: #64748b; line-height: 1.5;">Structured, gamified extracurricular roadmap trackers, calendar syncing, and notes are natively integrated.</p>
                </div>
              </div>
              <div class="dense-glass-card" style="padding: 20px 24px; text-align: left; display: flex; gap: 16px; align-items: flex-start;">
                <div style="font-size: 24px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 12px; color: #10b981;">✍️</div>
                <div>
                  <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">Replaces isolated Google Docs</h4>
                  <p style="font-size: 12.5px; color: #64748b; line-height: 1.5;">Write essays directly in Leveld. Receive live grading checksheets and tone/authenticity ratings side-by-side.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Interactive Ivy Mentor Section -->
        <section id="ivy-mentor-section" class="ivy-mentor-section" style="padding: 80px 24px; position: relative; background: transparent; border-top: 1px solid rgba(255,255,255,0.3); border-bottom: 1px solid rgba(255,255,255,0.3);">
          <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 40px; align-items: stretch;">
            
            <!-- Left Column: Ivy Mascot Parallax Box -->
            <div class="dense-glass-card apple-reveal" style="padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: visible !important;">
              <div class="hero-badge" style="margin-bottom: 12px; background: rgba(249, 115, 22, 0.08); color: #f97316; width: max-content;">
                <span>🦉</span> Meet Ivy
              </div>
              <h3 style="font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 8px; text-align: center; font-family: var(--font-heading);">Your AI Admissions Coach</h3>
              <p style="font-size: 13px; color: #64748b; text-align: center; max-width: 280px; line-height: 1.5; margin: 0 auto 16px auto;">
                Powered by <strong>Anthropic's Claude</strong>, Ivy provides highly reliable, context-aware profile audits and essay guidance.
              </p>
              
              <div class="ivy-interactive-container" id="ivy-interactive-container" style="width: 100%; max-width: 320px; height: 320px; margin: 0 auto; position: relative;">
                <div class="ivy-parallax-wrapper" id="ivy-parallax-wrapper" style="width: 100%; height: 100%; position: relative;">
                  <img src="assets/ivy_orange_transparent.png" alt="Ivy Mascot" class="ivy-mascot-img" id="ivy-mascot-img" style="width: 100%; height: 100%; object-fit: contain;">
                  
                  <!-- Eye tracking for Landing Ivy -->
                  <div class="landing-ivy-eyes-container">
                    <div class="landing-ivy-eye">
                      <div class="landing-ivy-pupil" id="landing-ivy-pupil-left"></div>
                      <div class="landing-ivy-eyelid"></div>
                    </div>
                    <div class="landing-ivy-eye">
                      <div class="landing-ivy-pupil" id="landing-ivy-pupil-right"></div>
                      <div class="landing-ivy-eyelid"></div>
                    </div>
                  </div>
                  
                  <!-- Floating tooltips around Ivy -->
                  <div class="ivy-tooltip tooltip-left" style="transform: scale(0.85); z-index: 10;">
                    <div class="tooltip-icon">💡</div>
                    <div class="tooltip-text">"+100 XP!"</div>
                  </div>
                  <div class="ivy-tooltip tooltip-right" style="transform: scale(0.85); z-index: 10;">
                    <div class="tooltip-icon">🎯</div>
                    <div class="tooltip-text">"Add depth!"</div>
                  </div>
                </div>
                
                <div class="ivy-cursor-glow" id="ivy-cursor-glow"></div>
              </div>
            </div>

            <!-- Right Column: Ivy Intelligence Console & Chat -->
            <div class="apple-reveal" style="display: flex; flex-direction: column; gap: 16px; height: 100%;">
              
              <!-- Ivy Intelligence Dashboard Widget -->
              <div class="dense-glass-card" style="padding: 24px; text-align: left;">
                <div style="font-weight: 800; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
                  <span>📊 Candidate Narrative Audit</span>
                  <span style="font-size: 11px; background: rgba(34, 197, 94, 0.1); color: #16a34a; padding: 2px 8px; border-radius: 4px;">ACTIVE AUDIT</span>
                </div>
                
                <!-- Progress bar for narrative -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <span style="font-size: 12.5px; font-weight: 700; color: #0f172a;">Extracurricular Spike Score</span>
                  <span style="font-size: 12.5px; font-weight: 800; color: #2563eb;">Tier 4 (Advanced)</span>
                </div>
                <div style="height: 6px; background: rgba(226, 232, 240, 0.6); border-radius: 3px; overflow: hidden; margin-bottom: 16px;">
                  <div style="width: 70%; height: 100%; background: linear-gradient(90deg, #3b82f6, #06b6d4); border-radius: 3px;"></div>
                </div>
                
                <!-- Advice Tags -->
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  <div style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3);">
                    <span style="font-size: 16px;">🚨</span>
                    <div style="font-size: 12px; color: #334155; line-height: 1.4;">
                      <strong>Profile Gap Alert:</strong> Leadership spike missing in candidate narrative. Add a capstone community proposal.
                    </div>
                  </div>
                  <div style="display: flex; gap: 12px; align-items: center; background: rgba(255,255,255,0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3);">
                    <span style="font-size: 16px;">💡</span>
                    <div style="font-size: 12px; color: #334155; line-height: 1.4;">
                      <strong>Admissions Tip:</strong> Stanford prefers a single, high-vitality passion project over six random high-school clubs.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Ivy Interactive Chat Window -->
              <div class="dense-glass-card" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; flex: 1; min-height: 240px;">
                <div class="ivy-chat-history" id="ivy-chat-history" style="flex: 1; overflow-y: auto; min-height: 100px; max-height: 150px; font-size: 13.5px; text-align: left;">
                  <div class="ivy-chat-message ivy">Hi! I'm Ivy. Ask me anything about Leveld! Try asking about "pricing" or "features".</div>
                </div>
                <form class="ivy-chat-form" id="ivy-chat-form" style="border: 1px solid rgba(0, 0, 0, 0.08); background: rgba(255, 255, 255, 0.85); border-radius: 100px; padding: 4px 6px; display: flex; align-items: center; margin-top: auto;">
                  <input type="text" id="ivy-chat-input" class="ivy-chat-input" placeholder="Ask Ivy a question..." required style="border: none; background: transparent; padding: 8px 16px; font-size: 13.5px; flex: 1; outline: none; color: #0f172a;">
                  <button type="submit" class="ivy-chat-submit" style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 100px; font-weight: 700; cursor: pointer; font-size: 12px; transition: transform 0.2s;">Ask Ivy</button>
                </form>
              </div>

            </div>

          </div>
        </section>

        <!-- Bento Grid Features Section -->
        <section id="features" style="position: relative; overflow: hidden; padding: 80px 24px; background: transparent;">
          <div style="text-align: center; margin-bottom: 48px;" class="apple-reveal">
            <div class="hero-badge" style="margin-bottom: 12px; background: rgba(59, 130, 246, 0.08); color: #2563eb; margin-left: auto; margin-right: auto;">
              <span>🧠</span> Features Bento
            </div>
            <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">Designed for <span class="text-highlight-pink">admissions success.</span></h2>
            <p style="color: #475569; font-size: 15px; max-width: 550px; margin: 0 auto;">An integrated workspace containing everything ambitious high schoolers need to build competitive portfolios.</p>
          </div>
          
          <div class="bento-features-grid apple-reveal" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto;">
            
            <!-- Bento 1: Dynamic Roadmaps (Span 2 columns) -->
            <div class="dense-glass-card" style="grid-column: span 2; padding: 36px; text-align: left; display: flex; gap: 32px; align-items: center;">
              <div style="flex: 1.2;">
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(37,99,235,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #2563eb;">🗺️</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Dynamic Roadmap Track</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Visualize upcoming standardized tests, AP exams, extracurricular milestones, and target application deadlines chronologically on a connected progress path.</p>
              </div>
              <div style="flex: 0.8; background: rgba(255,255,255,0.5); padding: 20px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.4);">
                <div class="bento-timeline">
                  <div class="bento-timeline-node completed">
                    <div class="bento-timeline-dot"></div>
                    <div class="bento-timeline-title">SAT Prep Setup</div>
                    <div class="bento-timeline-desc">Completed • May 14</div>
                  </div>
                  <div class="bento-timeline-node active">
                    <div class="bento-timeline-dot"></div>
                    <div class="bento-timeline-title">Research Proposal</div>
                    <div class="bento-timeline-desc">In Progress • AP CS Spike</div>
                  </div>
                  <div class="bento-timeline-node">
                    <div class="bento-timeline-dot"></div>
                    <div class="bento-timeline-title">MIT Deadline Track</div>
                    <div class="bento-timeline-desc">Upcoming • Nov 1</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bento 2: Active Workroom -->
            <div class="dense-glass-card" style="padding: 36px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(249,115,22,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #f97316;">⚡</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Active Workroom</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Enlist project ideas or research proposals, receive grades, execute milestone sprints, and track progress with Ivy.</p>
              </div>
              <div style="margin-top: 20px; background: rgba(255,255,255,0.5); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.3); font-size: 11px; color: #475569; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                <span style="color: #f97316;">●</span> Active sprint: "Quantum Simulation"
              </div>
            </div>

            <!-- Bento 3: Essay Studio -->
            <div class="dense-glass-card" style="padding: 36px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(236,72,153,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #ec4899;">✍️</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Essay Studio</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Submit application statements to get instant ratings across authenticity, pacing, and flow with actionable revisions checksheets.</p>
              </div>
              <div style="margin-top: 20px; background: rgba(255,255,255,0.5); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 12px; font-weight: 800; color: #0f172a;">Tone Rating:</span>
                <span style="font-size: 12px; font-weight: 900; color: #ec4899; background: rgba(236,72,153,0.1); padding: 2px 8px; border-radius: 6px;">9.2/10 (High)</span>
              </div>
            </div>

            <!-- Bento 4: Website Portfolio (Span 2 columns) -->
            <div class="dense-glass-card" style="grid-column: span 2; padding: 36px; text-align: left; display: flex; gap: 32px; align-items: center;">
              <div style="flex: 1.2;">
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(168,85,247,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #a855f7;">💼</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Portfolio Builder</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Ditch raw text resumes. Custom-build an interactive website portfolio showcase complete with theme customizers, competency gauges, and capstone galleries. Shareable directly with admissions.</p>
              </div>
              <div style="flex: 0.8; background: rgba(255,255,255,0.5); padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; gap: 8px;">
                <div style="font-size: 11px; font-weight: 800; color: #475569;">SELECT THEME PRESET</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <span style="font-size: 10px; font-weight: 800; background: #0f172a; color: white; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);">Midnight Dark</span>
                  <span style="font-size: 10px; font-weight: 800; background: white; color: #0f172a; padding: 4px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">Notion Clean</span>
                  <span style="font-size: 10px; font-weight: 800; background: linear-gradient(135deg, #4f46e5, #ec4899); color: white; padding: 4px 10px; border-radius: 6px;">Spiced Cyber</span>
                </div>
              </div>
            </div>

            <!-- Bento 5: Admissions Gap Analyzer -->
            <div class="dense-glass-card" style="padding: 36px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(6,182,212,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #06b6d4;">🏛️</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Admissions Gap Analyzer</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Compare your current candidate statistics against target university weightings and extract action suggestions.</p>
              </div>
              <div style="margin-top: 20px; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 11px; font-weight: 800; color: #475569;">Target Match:</span>
                <span style="font-size: 11px; font-weight: 900; color: #06b6d4; background: rgba(6,182,212,0.1); padding: 3px 8px; border-radius: 4px;">Stanford (84%)</span>
              </div>
            </div>

            <!-- Bento 6: Gamification (Span 2 columns) -->
            <div class="dense-glass-card" style="grid-column: span 2; padding: 36px; text-align: left; display: flex; gap: 32px; align-items: center;">
              <div style="flex: 1.2;">
                <div style="font-size: 32px; margin-bottom: 16px; width: 60px; height: 60px; background: rgba(16,185,129,0.08); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #10b981;">🏆</div>
                <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 10px;">Level Progression &amp; Gamification</h3>
                <p style="color: #64748b; font-size: 13.5px; line-height: 1.5; margin: 0;">Level up, claim streak highlights, and unlock rank titles (Scholar, Leader, Builder, Visionary) as you execute goals and focus blocks.</p>
              </div>
              <div style="flex: 0.8; background: rgba(255,255,255,0.5); padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.4); display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: #0f172a;">
                  <span>Current Rank: Scholar</span>
                  <span>Level 5</span>
                </div>
                <div style="height: 8px; background: rgba(226, 232, 240, 0.8); border-radius: 4px; overflow: hidden;">
                  <div style="width: 72%; height: 100%; background: #10b981; border-radius: 4px;"></div>
                </div>
                <div style="text-align: right; font-size: 10px; font-weight: 700; color: #10b981;">72% of Lvl Up</div>
              </div>
            </div>

          </div>
        </section>

        <!-- Why Choose Leveld Section -->
        <section id="why-leveld" style="position: relative; overflow: hidden; padding: 80px 24px; background: transparent;">
          <div style="text-align: center; margin-bottom: 48px;" class="apple-reveal">
            <div class="hero-badge" style="margin-bottom: 12px; background: rgba(16, 185, 129, 0.08); color: #10b981; margin-left: auto; margin-right: auto;">
              <span>🎓</span> Elite Targets
            </div>
            <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">Why choose <span class="text-highlight-sunset">Leveld?</span></h2>
            <p style="color: #475569; font-size: 15px; max-width: 550px; margin: 0 auto; margin-bottom: 48px;">Traditional counseling is expensive, disjointed, and slow. Leveld gives you a 24/7 AI-powered ecosystem to build your candidate profile systematically.</p>
          </div>
          
          <!-- University target postcards -->
          <div class="uni-postcards-grid apple-reveal">
            <!-- Postcard 1: MIT -->
            <div class="uni-postcard-card" data-uni="mit">
              <div class="uni-postcard-img-wrapper">
                <img src="assets/mit_campus.png" alt="MIT Campus" class="uni-postcard-img">
              </div>
              <div class="uni-postcard-content" style="padding: 24px; text-align: left;">
                <div class="uni-postcard-badge" style="background: rgba(37,99,235,0.08); color: #2563eb; font-size: 9px; font-weight: 800; padding: 4px 10px; border-radius: 100px; display: inline-block; text-transform: uppercase;">Top Target STEM</div>
                <h3 class="uni-postcard-title" style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 8px 0;">MIT</h3>
                <p class="uni-postcard-metric" style="font-size: 13px; color: #475569;">Avg Scholar Admittance Lift: <strong>+42%</strong></p>
                <button class="uni-postcard-expand-btn" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 100px; font-weight: 700; cursor: pointer; margin-top: 16px; font-size: 12px;">Admissions Checklist</button>
                <div class="uni-postcard-detail-box" style="margin-top: 16px; padding: 16px; border-radius: 12px; display: none;">
                  <strong>Requirements &amp; spike highlights:</strong>
                  <ul style="margin: 8px 0 0 16px; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: #475569;">
                    <li>Level 6+ Extracurricular (National STEM contest / hardware prototype)</li>
                    <li>Perfect math GPA &amp; SAT recommendations</li>
                    <li>Research abstract proposal in Physics or CS</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Postcard 2: Harvard -->
            <div class="uni-postcard-card" data-uni="harvard">
              <div class="uni-postcard-img-wrapper">
                <img src="assets/harvard_campus.png" alt="Harvard Campus" class="uni-postcard-img">
              </div>
              <div class="uni-postcard-content" style="padding: 24px; text-align: left;">
                <div class="uni-postcard-badge" style="background: rgba(168,85,247,0.08); color: #a855f7; font-size: 9px; font-weight: 800; padding: 4px 10px; border-radius: 100px; display: inline-block; text-transform: uppercase;">Top Target Ivy</div>
                <h3 class="uni-postcard-title" style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 8px 0;">Harvard University</h3>
                <p class="uni-postcard-metric" style="font-size: 13px; color: #475569;">Avg Scholar Admittance Lift: <strong>+38%</strong></p>
                <button class="uni-postcard-expand-btn" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 100px; font-weight: 700; cursor: pointer; margin-top: 16px; font-size: 12px;">Admissions Checklist</button>
                <div class="uni-postcard-detail-box" style="margin-top: 16px; padding: 16px; border-radius: 12px; display: none;">
                  <strong>Requirements &amp; spike highlights:</strong>
                  <ul style="margin: 8px 0 0 16px; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: #475569;">
                    <li>Level 5+ Extracurricular (Community impact / publication)</li>
                    <li>Cohesive student narrative showing high intellectual vitality</li>
                    <li>College essay showing authentic self-reflection</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Postcard 3: Stanford -->
            <div class="uni-postcard-card" data-uni="stanford">
              <div class="uni-postcard-img-wrapper">
                <img src="assets/stanford_campus.png" alt="Stanford Campus" class="uni-postcard-img">
              </div>
              <div class="uni-postcard-content" style="padding: 24px; text-align: left;">
                <div class="uni-postcard-badge" style="background: rgba(236,72,153,0.08); color: #ec4899; font-size: 9px; font-weight: 800; padding: 4px 10px; border-radius: 100px; display: inline-block; text-transform: uppercase;">Top Target STEM/HASS</div>
                <h3 class="uni-postcard-title" style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: #0f172a; margin: 12px 0 8px 0;">Stanford University</h3>
                <p class="uni-postcard-metric" style="font-size: 13px; color: #475569;">Avg Scholar Admittance Lift: <strong>+45%</strong></p>
                <button class="uni-postcard-expand-btn" style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 100px; font-weight: 700; cursor: pointer; margin-top: 16px; font-size: 12px;">Admissions Checklist</button>
                <div class="uni-postcard-detail-box" style="margin-top: 16px; padding: 16px; border-radius: 12px; display: none;">
                  <strong>Requirements &amp; spike highlights:</strong>
                  <ul style="margin: 8px 0 0 16px; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: #475569;">
                    <li>Level 6+ Extracurricular (Founder / active passion product launch)</li>
                    <li>Interdisciplinary research showing high self-direction</li>
                    <li>Strong letters of recommendation from research advisors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Leaderboard Section -->
        <section id="landing-leaderboard" style="position: relative; overflow: hidden; padding: 80px 24px; max-width: 1000px; margin: 0 auto; scroll-margin-top: 100px; background: transparent;">
          <div style="text-align: center; margin-bottom: 48px;" class="apple-reveal">
            <div class="hero-badge" style="margin-bottom: 12px; background: rgba(16, 185, 129, 0.08); color: #10b981; margin-left: auto; margin-right: auto;">
              <span>🏆</span> Community Rankings
            </div>
            <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">Global <span class="text-highlight-emerald">leaderboard</span> of achievers.</h2>
            <p style="color: #475569; font-size: 15px; max-width: 550px; margin: 0 auto;">See how top high school students worldwide use Leveld to organize extracurriculars, prepare for exams, and build college spikes.</p>
          </div>

          <div class="glass-card apple-reveal" style="padding: 24px; position: relative; border-left: 4px solid var(--primary); max-width: 800px; margin: 0 auto; background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(20px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0, 0, 0, 0.08); padding-bottom: 12px; margin-bottom: 16px;">
              <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px; color: #0f172a;">
                <span>🏆</span> Global Leaderboard
              </h3>
              <span class="badge badge-success" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block;"></span> Live
              </span>
            </div>
            <div id="landing-leaderboard-list" style="display: flex; flex-direction: column; gap: 8px;">
              <div style="text-align: center; color: var(--text-secondary); font-size: 13.5px; padding: 24px 0;">Loading leaderboard rankings...</div>
            </div>
          </div>
        </section>

        <!-- Testimonials Section -->
        <section id="landing-testimonials" style="position: relative; overflow: hidden; padding: 80px 24px; max-width: 1200px; margin: 0 auto; scroll-margin-top: 100px; background: transparent;">
          <div style="text-align: center; margin-bottom: 48px;" class="apple-reveal">
            <div class="hero-badge" style="margin-bottom: 12px; background: rgba(37, 99, 235, 0.08); color: #2563eb; margin-left: auto; margin-right: auto;">
              <span>💬</span> Student Success
            </div>
            <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">What <span class="text-highlight-purple">students</span> are saying.</h2>
            <p style="color: #475569; font-size: 15px; max-width: 550px; margin: 0 auto;">Thousands of ambitious students use Leveld OS to navigate high school and secure Ivy League entries.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;" class="apple-reveal">
            <div class="testimonial-card-premium" style="border-top: 4px solid var(--primary) !important; position: relative;">
              <div class="testimonial-quote-icon">“</div>
              <p style="font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-style: italic; font-weight: 500;">"Leveld's AI advisor Ivy helped me structure my research paper on quantum computing. I went from zero publications to presenting at a state science fair — and got into MIT Early Action."</p>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 14px; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.25);">AK</div>
                <div>
                  <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary);">Arjun K.</div>
                  <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">Admitted to MIT '30 • Grade 12</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card-premium" style="border-top: 4px solid var(--secondary) !important; position: relative;">
              <div class="testimonial-quote-icon">“</div>
              <p style="font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-style: italic; font-weight: 500;">"The portfolio builder is insane. My counselor thought I hired a professional web designer. The drag-and-drop themes made my extracurriculars look 10x more impressive."</p>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #ec4899, #f97316); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 14px; box-shadow: 0 4px 10px rgba(236, 72, 153, 0.25);">SP</div>
                <div>
                  <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary);">Sofia P.</div>
                  <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">Admitted to Stanford '30 • Grade 11</div>
                </div>
              </div>
            </div>
            <div class="testimonial-card-premium" style="border-top: 4px solid var(--color-level) !important;">
              <div class="testimonial-quote-icon">“</div>
              <p style="font-size: 14.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-style: italic; font-weight: 500;">"I used to feel lost juggling SAT prep, extracurriculars, and essays. Leveld organized everything into one dashboard with actual deadlines. Game changer for my stress levels."</p>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #06b6d4); display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 14px; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);">JL</div>
                <div>
                  <div style="font-weight: 700; font-size: 13.5px; color: var(--text-primary);">James L.</div>
                  <div style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">Admitted to UChicago '30 • Grade 12</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Pricing Section -->
        <section id="landing-pricing" class="landing-pricing-section" style="position: relative; overflow: hidden; padding: 80px 24px; max-width: 1000px; margin: 0 auto; border-top: none; scroll-margin-top: 100px; text-align: center; background: transparent;">
          <div style="text-align: center; margin-bottom: 40px;" class="apple-reveal">
            <div class="hero-badge" style="margin-bottom: 12px; background: rgba(139, 92, 246, 0.08); color: #8b5cf6; margin-left: auto; margin-right: auto;">
              <span>⭐</span> Simple Plans
            </div>
            <h2 class="section-headline" style="margin-bottom: 16px; color: #0f172a; font-size: 36px; font-weight: 800; font-family: var(--font-heading);">Pricing designed for <span class="text-highlight-emerald">students.</span></h2>
            <p style="color: var(--text-secondary); font-size: 15px; max-width: 550px; margin: 0 auto; margin-bottom: 32px;">Build your profile for free, or upgrade to unlock unlimited AI feedback reviews and cloud sync.</p>
          </div>
          <!-- Billing Period Interactive Switcher -->
          <div class="pricing-toggle-wrapper" style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 48px;" class="apple-reveal">
            <span class="toggle-label active" id="toggle-label-monthly" style="font-size: 13px; font-weight: 700;">Monthly Billing</span>
            <button class="pricing-toggle-btn" id="pricing-toggle" aria-label="Toggle billing cycle">
              <span class="toggle-circle"></span>
            </button>
            <span class="toggle-label" id="toggle-label-yearly" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: #64748b;">
              Annual Billing
              <span style="font-size: 9.5px; font-weight: 900; background: rgba(34, 197, 94, 0.15); color: #16a34a; padding: 2px 8px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.5px;">Save 20%</span>
            </span>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 800px; margin: 0 auto;" class="apple-reveal">
            <!-- Starter -->
            <div class="pricing-card-premium" style="min-height: 480px; display: flex; flex-direction: column; justify-content: space-between; padding: 32px 28px; border-radius: var(--border-radius-lg, 16px);">
              <div>
                <span style="font-size: 11px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">Starter</span>
                <div style="font-size: 36px; font-weight: 900; color: #0f172a; margin: 12px 0 20px 0; font-family: var(--font-heading);">$0 <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ forever</span></div>
                <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.45; margin-bottom: 24px;">Essential features for students starting their college preparation journey.</p>
                <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: var(--text-primary);">
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 🗺️ Basic Chronological Roadmap</li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 💡 Extracurricular Project Tracker</li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 🏆 Gamified Milestones (Level 1-3)</li>
                  <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 💾 Local Profile Switcher Sessions</li>
                </ul>
              </div>
              <button class="btn btn-pricing-action" style="width: 100%; padding: 12px; border-radius: 100px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.7); color: #0f172a; cursor: pointer; font-weight: 700; transition: all 0.2s;">Get Started for Free</button>
            </div>
            
            <!-- Scholar -->
            <div class="pricing-card-premium scholar-border-glow" style="min-height: 480px; position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 32px 28px; border-radius: var(--border-radius-lg, 16px);">
              <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #2563eb, #a855f7); color: #ffffff; padding: 4px 12px; border-radius: 100px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); z-index: 10;">Most Popular</div>
              <div style="position: relative; z-index: 10; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <div>
                  <span style="font-size: 11px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">Leveld Scholar</span>
                  <div style="font-size: 36px; font-weight: 900; color: #ffffff; margin: 12px 0 20px 0; font-family: var(--font-heading);"><span id="scholar-price-val" style="color: #ffffff;">$19</span> <span style="font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.7);" id="scholar-price-period">/ month</span></div>
                  <p style="color: rgba(255,255,255,0.85); font-size: 13px; line-height: 1.45; margin-bottom: 24px;">A complete candidate builder toolkit for students seeking top-tier admittances.</p>
                  <ul style="list-style: none; padding: 0; margin: 0 0 32px 0; display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: #ffffff; text-align: left;">
                    <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 🤖 24/7 Conversational AI Advisor — Ivy</li>
                    <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> ⚡ Active Tracker Workspace &amp; Q&amp;A</li>
                    <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> ✍️ College Essay Studio Review (10/mo)</li>
                    <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> 💼 Custom Squarespace-style Portfolio</li>
                    <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #22c55e; font-weight: bold;">✓</span> ☁️ Backend Cloud Server Database</li>
                  </ul>
                </div>
                <button class="btn btn-pricing-action" style="width: 100%; padding: 12px; border-radius: 100px; border: none; background: #2563eb; color: white; cursor: pointer; font-weight: 700; transition: all 0.2s; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25); margin-top: 20px;">Go Scholar Now</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="landing-footer" style="padding: 64px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.3); font-size: 13.5px; color: var(--text-secondary); background: transparent;">
          <div style="margin-bottom: 16px; font-weight: 500;">&copy; 2026 Leveld OS. Designed for high school success.</div>
          <div class="landing-footer-links" style="display: flex; justify-content: center; gap: 24px;">
            <a href="#dashboard" style="color: var(--text-secondary); text-decoration: none; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'" onclick="event.preventDefault(); alert('Leveld is a client-side system connected to a WEBrick JSON backend.');">Privacy Policy</a>
            <a href="#dashboard" style="color: var(--text-secondary); text-decoration: none; font-weight: 600; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-secondary)'" onclick="event.preventDefault(); alert('Leveld is a client-side system connected to a WEBrick JSON backend.');">Terms of Service</a>
          </div>
        </footer>
      </div>
    `;
    this.bindEvents();
  },
  getSavedUsers() {
    const raw = localStorage.getItem('leveled_users');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return [];
      }
    }
    return [];
  },
  cachedLeaderboardUsers: null,
  leaderboardFetchPromise: null,
  fetchAndRenderLeaderboard() {
    const listEl = document.getElementById('landing-leaderboard-list');
    if (!listEl) return;

    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        const AVATAR_COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
        const serverUsers = data.leaderboard || [];
        this.cachedLeaderboardUsers = serverUsers.map((u, i) => ({
          id: u.id || `peer-${i}`,
          name: u.name || 'Anonymous',
          username: u.username || '',
          uni: u.dreamUniversities && u.dreamUniversities[0] ? u.dreamUniversities[0] : (u.school || 'Explorer'),
          major: u.careerGoals || 'Undecided',
          xp: u.xp || 0,
          streak: u.streak || 0,
          level: u.level || 1,
          school: u.school || '',
          country: u.country || '',
          city: u.city || '',
          skills: u.skills || [],
          interests: u.interests || [],
          dreamUniversities: u.dreamUniversities || [],
          grade: u.grade || '',
          avatar: (u.name || 'Anonymous').charAt(0).toUpperCase() + ((u.name || '').split(' ')[1]?.charAt(0) || '').toUpperCase(),
          color: AVATAR_COLORS[i % AVATAR_COLORS.length]
        }));
        this.renderLeaderboardRows();
      })
      .catch(err => {
        console.error('Error loading leaderboard:', err);
        listEl.innerHTML = '<div style="text-align: center; color: #ef4444; font-size: 13.5px; padding: 24px 0;">Failed to load leaderboard.</div>';
      });
  },
  renderLeaderboardRows() {
    const listEl = document.getElementById('landing-leaderboard-list');
    if (!listEl || !this.cachedLeaderboardUsers) return;

    const LEAGUE_NAMES = [
      'Bronze League',  // Level 1
      'Silver League',  // Level 2
      'Gold League',    // Level 3
      'Sapphire League', // Level 4
      'Emerald League',  // Level 5
      'Ruby League',     // Level 6
      'Obsidian League'  // Level 7+
    ];

    const COUNTRY_FLAGS = {
      'India': '🇮🇳',
      'Mexico': '🇲🇽',
      'South Korea': '🇰🇷',
      'United States': '🇺🇸',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'Singapore': '🇸🇬',
      'Australia': '🇦🇺'
    };

    let activeUsername = '';
    const activeStateRaw = localStorage.getItem('leveled_state');
    if (activeStateRaw) {
      try {
        const activeState = JSON.parse(activeStateRaw);
        activeUsername = activeState?.user?.username || '';
      } catch(e) {}
    }

    let html = '';
    this.cachedLeaderboardUsers.forEach((u, idx) => {
      const rank = idx + 1;
      const isSelf = u.username && activeUsername && u.username.toLowerCase() === activeUsername.toLowerCase();
      const league = LEAGUE_NAMES[u.level - 1] || 'Obsidian League';
      
      let rankDisplay = rank.toString();
      if (rank === 1) rankDisplay = '🥇';
      else if (rank === 2) rankDisplay = '🥈';
      else if (rank === 3) rankDisplay = '🥉';

      const flag = COUNTRY_FLAGS[u.country] || '🌐';

      html += `
        <div class="landing-leaderboard-row" data-id="${u.id}" style="
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; background: ${isSelf ? 'rgba(37, 99, 235, 0.08)' : 'rgba(255, 255, 255, 0.7)'};
          border: 1px solid ${isSelf ? 'rgba(37, 99, 235, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
          border-radius: 12px; margin-bottom: 4px;
          cursor: pointer; transition: all 0.2s;
        " onmouseover="this.style.backgroundColor='rgba(255, 255, 255, 0.9)'; this.style.transform='translateX(4px)';" onmouseout="this.style.backgroundColor='${isSelf ? 'rgba(37, 99, 235, 0.08)' : 'rgba(255, 255, 255, 0.7)'}'; this.style.transform='none';">
          <!-- Left: Rank, Avatar, Name Details -->
          <div style="display: flex; align-items: center; gap: 12px; min-width: 0; pointer-events: none;">
            <div style="width: 24px; text-align: center; font-size: 15px; font-weight: 800; color: #0f172a; flex-shrink: 0;">
              ${rankDisplay}
            </div>
            <div style="width: 36px; height: 36px; border-radius: 50%; background: ${u.color || 'var(--primary)'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; border: 1.5px solid rgba(0, 0, 0, 0.08); flex-shrink: 0; box-shadow: var(--shadow-sm);">
              ${u.avatar}
            </div>
            <div style="text-align: left; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              <div style="font-weight: 700; font-size: 13.5px; color: #0f172a; display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <span>${u.name}</span>
                ${flag ? `<span style="font-size: 14px;" title="${u.country || 'Global'}">${flag}</span>` : ''}
                ${isSelf ? '<span style="font-size: 8px; background-color: var(--primary); color: white; padding: 2px 4px; border-radius: 4px; font-weight: 850; text-transform: uppercase; flex-shrink: 0; letter-spacing: 0.5px;">You</span>' : ''}
              </div>
              <div style="font-size: 11px; color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;">
                ${league} • ${u.uni || u.major || 'Explorer'}
              </div>
            </div>
          </div>

          <!-- Right: XP and Streak -->
          <div style="display: flex; align-items: center; gap: 16px; pointer-events: none;">
            <div style="text-align: right;">
              <div style="font-weight: 800; font-size: 14px; color: #0f172a;">${(u.xp || 0).toLocaleString()} XP</div>
              <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Lvl ${u.level}</div>
            </div>
            ${u.streak > 0 ? `
              <div style="display: flex; align-items: center; gap: 4px; background: rgba(249, 115, 22, 0.08); border: 1px solid rgba(249, 115, 22, 0.2); padding: 4px 8px; border-radius: 8px; color: #ea580c; font-size: 12px; font-weight: 800;" title="${u.streak} Days active streak">
                🔥 ${u.streak}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html;

    // Attach click listeners to rows to open peer modals
    listEl.querySelectorAll('.landing-leaderboard-row').forEach(row => {
      row.onclick = () => {
        const id = row.getAttribute('data-id');
        const peer = this.cachedLeaderboardUsers.find(u => u.id === id);
        if (peer) {
          this.openLandingPeerProfileModal(peer);
        }
      };
    });
  },
  openLandingPeerProfileModal(peer) {
    const LEVEL_TITLES = [
      'Scholar Explorer',
      'Scholar Candidate',
      'Spike Builder',
      'Portfolio Architect',
      'Milestone Master',
      'Admissions Competitor',
      'Elite Scholar Elite'
    ];

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

    const modalHTML = `
      <div style="text-align: left; padding: 10px 4px; color: #0f172a;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px; border-bottom: 1px solid rgba(0, 0, 0, 0.08); padding-bottom: 16px;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: ${peer.color || 'var(--primary)'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; border: 2px solid rgba(0, 0, 0, 0.08); flex-shrink: 0;">
            ${peer.avatar}
          </div>
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">${peer.name}</h3>
            <p style="font-size: 12px; color: #64748b; margin: 2px 0 0 0;">${profileDetails.school}${profileDetails.grade ? ' • Grade ' + profileDetails.grade.replace(' Grade','') : ''}</p>
            ${profileDetails.country ? `<p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">📍 ${profileDetails.city ? profileDetails.city + ', ' : ''}${profileDetails.country}</p>` : ''}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="background-color: rgba(0, 0, 0, 0.02); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 12px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">Current Level</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--primary); margin-top: 4px;">Lvl ${profileDetails.level}</div>
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">${profileDetails.title}</div>
          </div>
          <div style="background-color: rgba(0, 0, 0, 0.02); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 12px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase;">Daily Streak</div>
            <div style="font-size: 18px; font-weight: 800; color: #f97316; margin-top: 4px;">🔥 ${peer.streak} Days</div>
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">Active learner</div>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Biography & Goals</h4>
          <p style="font-size: 13.5px; color: #334155; line-height: 1.5; margin: 0;">"${profileDetails.bio}"</p>
        </div>

        <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Interests</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${profileDetails.interests.map(i => `<span style="font-size: 10px; background-color: rgba(0, 0, 0, 0.04); border: 1px solid rgba(0, 0, 0, 0.08); padding: 2px 8px; border-radius: 20px; color: #334155;">${i}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4 style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Top Skills</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${profileDetails.skills.map(s => `<span style="font-size: 10px; background-color: rgba(0, 0, 0, 0.04); border: 1px solid rgba(0, 0, 0, 0.08); padding: 2px 8px; border-radius: 20px; color: var(--primary);">${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(0, 0, 0, 0.08); padding-top: 20px; display: flex; gap: 12px; margin-top: 20px;">
          <button class="btn btn-secondary" onclick="LeveledApp.closeModal()" style="flex: 1;">Close</button>
          <button class="btn btn-primary" onclick="LeveledApp.closeModal(); document.getElementById('landing-leaderboard')?.scrollIntoView({behavior: 'smooth'});" style="flex: 2; background: linear-gradient(135deg, var(--primary), var(--secondary));">
            🚀 Join Leveld to Connect
          </button>
        </div>
      </div>
    `;

    LeveledApp.openModal(modalHTML);
  },
  runConvergenceAnimation() {
    const icons = document.querySelectorAll('.converge-icon');
    const center = document.getElementById('convergence-center');
    const stage = document.getElementById('convergence-stage');
    const canvas = document.getElementById('particle-canvas');
    if (!icons.length || !center || !stage || !canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 500, H = 500;
    const cx = W / 2, cy = H / 2;
    let particles = [];
    // Particle class for smoke/dust
    function spawnSmoke(x, y, count, burst) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? (Math.random() * 4 + 2) : (Math.random() * 1.5 + 0.3);
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: burst ? (0.015 + Math.random() * 0.01) : (0.02 + Math.random() * 0.015),
          size: burst ? (Math.random() * 6 + 3) : (Math.random() * 4 + 1),
        });
      }
    }
    // Render loop
    let animating = true;
    function renderParticles() {
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) return;
        const r = Math.max(0, p.size * p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        const isDark = (window.scrollY || document.documentElement.scrollTop) > 300;
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${Math.max(0, p.life * 0.35)})` : `rgba(0, 0, 0, ${Math.max(0, p.life * 0.15)})`;
        ctx.fill();
      });
      if (animating || particles.length > 0) requestAnimationFrame(renderParticles);
    }
    renderParticles();
    const stageRect = stage.getBoundingClientRect();
    const R = 200; // initial radius roughly
    
    // Assign an angle to each icon for circular math
    const angles = [];
    icons.forEach((icon, i) => {
      angles.push((i / icons.length) * Math.PI * 2);
      icon.style.transition = 'none';
      icon.style.opacity = '1';
    });
    let startTime = Date.now();
    let currentRadius = R;
    let orbitSpeed = 0;
    
    // Animation loop for icons
    function animateIcons() {
      if (!animating) return;
      const elapsed = Date.now() - startTime;
      
      // Phase 1: Slow pull (0 to 3000ms)
      if (elapsed < 3000) {
        currentRadius = R - (R * 0.5 * (elapsed / 3000)); // pulls in to half radius
        orbitSpeed = (elapsed / 3000) * 0.02; // slowly start rotating
      } 
      // Phase 2: Rapid spin and suck in (3000 to 4500ms)
      else if (elapsed < 4500) {
        const phase2Elapsed = elapsed - 3000;
        const progress = phase2Elapsed / 1500;
        currentRadius = (R * 0.5) * (1 - Math.pow(progress, 3)); // suck into center rapidly
        orbitSpeed = 0.02 + progress * 0.15; // spin very fast
        
        // Spawn sparks during rapid spin
        if (Math.random() > 0.5) {
          spawnSmoke(cx + Math.cos(angles[0])*currentRadius, cy + Math.sin(angles[0])*currentRadius, 2, false);
        }
      } 
      // Phase 3: Hidden
      else {
        currentRadius = 0;
      }
      icons.forEach((icon, i) => {
        angles[i] += orbitSpeed;
        const x = cx + Math.cos(angles[i]) * currentRadius;
        const y = cy + Math.sin(angles[i]) * currentRadius;
        
        if (elapsed < 4500) {
          icon.style.left = `${x}px`;
          icon.style.top = `${y}px`;
          icon.style.transform = `translate(-50%, -50%) scale(${currentRadius / R * 0.5 + 0.5})`;
          
          if (elapsed % 100 < 20 && elapsed < 3000) {
            spawnSmoke(x, y, 1, false);
          }
        } else {
          icon.style.opacity = '0';
        }
      });
      
      if (elapsed < 4600) {
        requestAnimationFrame(animateIcons);
      }
    }
    animateIcons();
    // Phase 3: Big burst and reveal center logo
    setTimeout(() => {
      // Massive particle burst
      spawnSmoke(cx, cy, 100, true);
      // Logo pops in
      center.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      center.style.opacity = '1';
      center.style.transform = 'translate(-50%, -50%) scale(1.2)';
      center.style.boxShadow = '0 0 100px rgba(0,0,0,0.15), 0 0 200px rgba(0,0,0,0.08)';
      // Settle back to normal size
      setTimeout(() => {
        center.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        center.style.transform = 'translate(-50%, -50%) scale(1)';
        center.style.boxShadow = '0 0 40px rgba(0,0,0,0.1)';
        setTimeout(() => animating = false, 1500);
      }, 500);
    }, 4500);
  },
  resetConvergenceAnimation() {
    const icons = document.querySelectorAll('.converge-icon');
    const center = document.getElementById('convergence-center');
    const canvas = document.getElementById('particle-canvas');
    if (!icons.length || !center || !canvas) return;
    // Reset center logo
    center.style.transition = 'none';
    center.style.opacity = '0';
    center.style.transform = 'translate(-50%, -50%) scale(0)';
    center.style.boxShadow = 'none';
    // Reset icons to their initial positions
    icons.forEach(icon => {
      icon.style.transition = 'none';
      icon.style.transform = ''; 
      icon.style.opacity = '1';
    });
    // Clear canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  showLoginModal() {
    const users = this.getSavedUsers();
    // Render local user switcher items
    const userListHTML = users.length > 0 ? users.map(u => `
      <div class="user-switcher-item" data-username="${u.user.username || u.user.name}">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar" style="width: 30px; height: 30px; font-size: 12px; background-color: var(--primary);">${(u.user.name || '').charAt(0).toUpperCase()}</div>
          <div>
            <div style="font-weight: 700; font-size: 13.5px; color: #0f172a;">${u.user.name}</div>
            <div style="font-size: 11px; color: var(--text-secondary);">@${u.user.username || 'user'} • Grade ${u.user.grade} • XP ${u.xp}</div>
          </div>
        </div>
        <span style="font-size: 11px; font-weight: 700; color: var(--primary);">Quick Switch &rarr;</span>
      </div>
    `).join('') : `
      <div style="text-align: center; color: var(--text-secondary); font-size: 12.5px; padding: 12px 0;">No local profiles cached. Sign up or log in below!</div>
    `;
    LeveledApp.openModal(`
      <div style="padding: 16px 8px;" class="login-container-card">
        <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 8px;">Log In to Leveld OS</h3>
        <p style="color: var(--text-secondary); font-size: 13px; text-align: center; margin-bottom: 24px;">Enter your username/email to log in, or load a preset developer sandbox below.</p>
        <form id="landing-login-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
            <label class="form-label" for="login-username" style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Username or Email</label>
            <input type="text" id="login-username" class="form-control" placeholder="E.g., kantwon" required style="font-size: 14px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; width: 100%;">
          </div>
          <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
            <label class="form-label" for="login-password" style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required style="font-size: 14px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; width: 100%;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 14px; border-radius: 100px; border: none; background: var(--primary); color: white; font-weight: 700; cursor: pointer; margin-top: 10px;">Enter Leveld Workspace</button>
        </form>
        <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 20px;">
          <h4 style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px;">Switch Saved Profiles</h4>
          <div class="user-switcher-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto;">
            ${userListHTML}
          </div>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <button class="btn btn-secondary" id="btn-load-mock-sandbox" style="width: 100%; background-color: rgba(37, 99, 235, 0.1); border: 1px solid rgba(37, 99, 235, 0.2); color: var(--primary); padding: 10px; border-radius: 100px; cursor: pointer; font-weight: 600;">🚀 Load Mock Developer Profile (Kantwon)</button>
        </div>
      </div>
    `);
    // Bind login modal events
    const loginForm = document.getElementById('landing-login-form');
    if (loginForm) {
      loginForm.onsubmit = () => {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        if (username) {
          this.handleLogin(username, password);
        }
      };
    }
    // Switcher list items click
    const switcherItems = document.querySelectorAll('.user-switcher-item');
    switcherItems.forEach(item => {
      item.onclick = () => {
        const username = item.getAttribute('data-username');
        const userField = document.getElementById('login-username');
        const passwordField = document.getElementById('login-password');
        if (userField && passwordField) {
          userField.value = username;
          passwordField.focus();
          LeveledApp.showToast(`Selected profile: @${username}. Enter password.`);
        }
      };
    });
    // Load mock developer sandbox button
    const mockBtn = document.getElementById('btn-load-mock-sandbox');
    if (mockBtn) {
      mockBtn.onclick = () => {
        window.location.search = '?mock=true';
      };
    }
  },
  handleLogin(username, password) {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.error || 'Login failed'); });
      }
      return res.json();
    })
    .then(data => {
      LeveledApp.state = data.state;
      localStorage.setItem('leveled_state', JSON.stringify(data.state));
      LeveledApp.updateHeaderStats();
      LeveledApp.closeModal();
      LeveledApp.renderShell();
      LeveledApp.showToast(`🚪 Logged in as ${data.state.user.name}!`);
    })
    .catch(err => {
      console.warn('Backend login error, attempting local fallback...', err);
      const users = this.getSavedUsers();
      const match = users.find(u => 
        (u.user.username && u.user.username.toLowerCase() === username.toLowerCase()) || 
        (u.user.name && u.user.name.toLowerCase() === username.toLowerCase()) ||
        (u.user.email && u.user.email.toLowerCase() === username.toLowerCase())
      );
      if (match) {
        if (match.user.password && match.user.password !== password) {
          alert('Incorrect password! Please try again.');
          return;
        }
        LeveledApp.state = match;
        LeveledApp.saveState();
        LeveledApp.closeModal();
        LeveledApp.renderShell();
        LeveledApp.showToast(`🚪 Logged in locally as ${match.user.name}!`);
      } else {
        alert('Incorrect credentials or user not found.');
      }
    });
  },
  bindEvents() {
    // Fetch and render global leaderboard
    this.fetchAndRenderLeaderboard();

    // Ivy Interactive Logic
    const ivyContainer = document.getElementById('ivy-interactive-container');
    const ivyParallax = document.getElementById('ivy-parallax-wrapper');
    const ivyGlow = document.getElementById('ivy-cursor-glow');
    
    if (ivyContainer && ivyParallax && ivyGlow) {
      ivyContainer.addEventListener('mousemove', (e) => {
        const rect = ivyContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPct = (x / rect.width) * 2 - 1;
        const yPct = (y / rect.height) * 2 - 1;
        
        ivyParallax.style.transform = `rotateX(${yPct * -15}deg) rotateY(${xPct * 15}deg) translateZ(20px)`;
        ivyGlow.style.opacity = '1';
        ivyGlow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
        // Eye tracking for Landing Ivy
        const pupilL = document.getElementById('landing-ivy-pupil-left');
        const pupilR = document.getElementById('landing-ivy-pupil-right');
        if (pupilL && pupilR) {
          const eyeMoveX = xPct * 5;
          const eyeMoveY = yPct * 5;
          pupilL.style.transform = `translate(calc(-50% + ${eyeMoveX}px), calc(-50% + ${eyeMoveY}px))`;
          pupilR.style.transform = `translate(calc(-50% + ${eyeMoveX}px), calc(-50% + ${eyeMoveY}px))`;
        }
      });
      
      ivyContainer.addEventListener('mouseleave', () => {
        ivyParallax.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        ivyGlow.style.opacity = '0';
        const pupilL = document.getElementById('landing-ivy-pupil-left');
        const pupilR = document.getElementById('landing-ivy-pupil-right');
        if (pupilL && pupilR) {
          pupilL.style.transform = `translate(-50%, -50%)`;
          pupilR.style.transform = `translate(-50%, -50%)`;
        }
      });
    }
    // Ivy Chat Logic
    const chatForm = document.getElementById('ivy-chat-form');
    const chatInput = document.getElementById('ivy-chat-input');
    const chatHistory = document.getElementById('ivy-chat-history');
    if (chatForm && chatInput && chatHistory) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;
        // Append user message
        const userMsg = document.createElement('div');
        userMsg.className = 'ivy-chat-message user';
        userMsg.textContent = userText;
        chatHistory.appendChild(userMsg);
        
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;
        // Simulate Ivy thinking
        setTimeout(() => {
          const ivyMsg = document.createElement('div');
          ivyMsg.className = 'ivy-chat-message ivy';
          
          const lowercaseText = userText.toLowerCase();
          if (lowercaseText.includes('price') || lowercaseText.includes('cost') || lowercaseText.includes('pay') || lowercaseText.includes('money')) {
            ivyMsg.textContent = "Leveld is 100% free while we're in early access! Once we launch fully, we'll have a generous free tier and a premium plan with advanced AI limits.";
          } else if (lowercaseText.includes('feature') || lowercaseText.includes('what can you do') || lowercaseText.includes('help')) {
            ivyMsg.textContent = "I can analyze your extracurriculars, track your application deadlines, brainstorm essay ideas, and calculate your admissions probabilities! All in one dashboard.";
          } else if (lowercaseText.includes('hello') || lowercaseText.includes('hi')) {
            ivyMsg.textContent = "Hello there! Ready to level up your college applications?";
          } else {
            ivyMsg.textContent = "That's a great question! Once you sign up and access the dashboard, I can give you a much more detailed, personalized answer based on your specific profile.";
          }
          
          chatHistory.appendChild(ivyMsg);
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 600);
      });
    }
    // Smooth scroll for landing nav links
    document.querySelectorAll('.landing-nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    // Reverted scroll handler: static dark backgrounds, only updating Dynamic Island border contrast on scroll.
    const handleScroll = () => {
      const calcSec = document.getElementById('calculator');
      const whySec = document.getElementById('why-leveld');
      
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      let isOverDarkSection = false;
      [calcSec, whySec].forEach(section => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        const rectTop = sectionTop - scrollY;
        const rectBottom = rectTop + sectionHeight;
        
        // Check if premium-island is currently sitting on top of this section
        if (rectTop <= 80 && rectBottom >= 0) {
          isOverDarkSection = true;
        }
      });
      const island = document.querySelector('.premium-island');
      if (island) {
        island.style.borderColor = isOverDarkSection ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    setTimeout(handleScroll, 50);
    // 3D Parallax Tilt Effect
    const hero = document.querySelector('.landing-hero');
    const mockup = document.querySelector('.hero-mockup');
    if (hero && mockup) {
      hero.onmousemove = (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / (rect.height / 2)) * 15;
        const rotateY = (x / (rect.width / 2)) * 15;
        mockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      };
      
      hero.onmouseleave = () => {
        mockup.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      };
    }
    // Convergence Scroll Animation
    const convSection = document.getElementById('convergence-section');
    if (convSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.runConvergenceAnimation();
          } else {
            this.resetConvergenceAnimation();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(convSection);
    }
    // Apple-style entrance transitions
    const appleReveals = document.querySelectorAll('.apple-reveal');
    if (appleReveals.length > 0) {
      if (window.location.search.includes('scroll=')) {
        appleReveals.forEach(el => el.classList.add('in-view'));
      } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        }, {
          threshold: 0.05,
          rootMargin: '0px 0px -50px 0px'
        });
        appleReveals.forEach(el => revealObserver.observe(el));
      }
    }
    // Top-header Actions
    const loginBtn = document.getElementById('btn-landing-login');
    const signupBtn = document.getElementById('btn-landing-signup');
    
    if (loginBtn) {
      loginBtn.onclick = () => this.showLoginModal();
    }
    if (signupBtn) {
      signupBtn.onclick = () => {
        LeveledApp.state.user = null;
        LeveledApp.saveState();
        document.getElementById('landing-layout').style.display = 'none';
        document.getElementById('onboarding-layout').style.display = 'flex';
        import('./Onboarding.js').then(module => module.Onboarding.init());
      };
    }
    // Hero Section CTAs
    const heroStartBtn = document.getElementById('btn-hero-start');
    if (heroStartBtn) {
      heroStartBtn.onclick = () => signupBtn.click();
    }
    // Pricing tier triggers onboarding signup
    const pricingBtns = document.querySelectorAll('.btn-pricing-action');
    pricingBtns.forEach(btn => {
      btn.onclick = () => {
        signupBtn.click();
      };
    });
    // Pricing Billing Period Toggle Switcher
    const pricingToggle = document.getElementById('pricing-toggle');
    const labelMonthly = document.getElementById('toggle-label-monthly');
    const labelYearly = document.getElementById('toggle-label-yearly');
    const scholarPriceVal = document.getElementById('scholar-price-val');
    const scholarPricePeriod = document.getElementById('scholar-price-period');
    if (pricingToggle && labelMonthly && labelYearly && scholarPriceVal && scholarPricePeriod) {
      const toggleBilling = () => {
        const isYearly = pricingToggle.classList.toggle('active');
        if (isYearly) {
          labelMonthly.classList.remove('active');
          labelYearly.classList.add('active');
          
          // Animate price change
          scholarPriceVal.style.transform = 'scale(0.8)';
          scholarPriceVal.style.opacity = '0';
          setTimeout(() => {
            scholarPriceVal.textContent = '$15';
            scholarPriceVal.style.transform = 'scale(1)';
            scholarPriceVal.style.opacity = '1';
          }, 150);
          scholarPricePeriod.textContent = '/ month, billed annually';
        } else {
          labelMonthly.classList.add('active');
          labelYearly.classList.remove('active');
          
          // Animate price change
          scholarPriceVal.style.transform = 'scale(0.8)';
          scholarPriceVal.style.opacity = '0';
          setTimeout(() => {
            scholarPriceVal.textContent = '$19';
            scholarPriceVal.style.transform = 'scale(1)';
            scholarPriceVal.style.opacity = '1';
          }, 150);
          scholarPricePeriod.textContent = '/ month';
        }
      };
      pricingToggle.onclick = toggleBilling;
      labelMonthly.onclick = () => {
        if (pricingToggle.classList.contains('active')) toggleBilling();
      };
      labelYearly.onclick = () => {
        if (!pricingToggle.classList.contains('active')) toggleBilling();
      };
      
      // Add smooth transition style inline to the price element for scale effect
      scholarPriceVal.style.transition = 'transform 0.15s, opacity 0.15s';
      scholarPriceVal.style.display = 'inline-block';
    }
    // Auto open login modal if ?login=true query parameter is present
    if (window.location.search.includes('login=true')) {
      setTimeout(() => this.showLoginModal(), 50);
    }
    // Auto scroll if ?scroll=XXX query parameter is present (helpful for scroll testing and screenshots!)
    const scrollMatch = window.location.search.match(/[?&]scroll=(\d+)/);
    if (scrollMatch) {
      const scrollY = parseInt(scrollMatch[1]);
      const debugStartMsg = `START: scrollY=${window.scrollY}, bodyScrollHeight=${document.body.scrollHeight}, docScrollHeight=${document.documentElement.scrollHeight}, innerHeight=${window.innerHeight}`;
      fetch(`/api/debug_log?msg=${encodeURIComponent(debugStartMsg)}`);
      window.scrollTo(0, scrollY);
      document.documentElement.scrollTop = scrollY;
      document.body.scrollTop = scrollY;
      window.dispatchEvent(new Event('scroll'));
      setTimeout(() => {
        window.scrollTo(0, scrollY);
        document.documentElement.scrollTop = scrollY;
        document.body.scrollTop = scrollY;
        window.dispatchEvent(new Event('scroll'));
        const debugTimeoutMsg = `TIMEOUT: scrollY=${window.scrollY}, bodyScrollHeight=${document.body.scrollHeight}, docScrollHeight=${document.documentElement.scrollHeight}, innerHeight=${window.innerHeight}`;
        fetch(`/api/debug_log?msg=${encodeURIComponent(debugTimeoutMsg)}`);
      }, 50);
    }
    // Interactive Admissions Calculator Logic
    const calcUni = document.getElementById('calc-uni');
    const calcGpa = document.getElementById('slider-calc-gpa');
    const calcSat = document.getElementById('slider-calc-sat');
    const calcEc = document.getElementById('slider-calc-ec');
    const updateCalculator = () => {
      if (!calcUni || !calcGpa || !calcSat || !calcEc) return;
      const uni = calcUni.value;
      const gpa = parseFloat(calcGpa.value);
      const sat = parseInt(calcSat.value);
      const ec = parseInt(calcEc.value);
      // Update UI labels
      document.getElementById('lbl-calc-gpa').textContent = gpa.toFixed(2);
      document.getElementById('lbl-calc-sat').textContent = sat;
      document.getElementById('lbl-calc-ec').textContent = `Level ${ec}`;
      // Calculate admissions probability
      let base = 5; // Base probability for elite schools
      if (uni === 'MIT') base = 3;
      else if (uni === 'Stanford') base = 4;
      else if (uni === 'Harvard') base = 3.5;
      else if (uni === 'Oxford') base = 6;
      else if (uni === 'Cambridge') base = 5.5;
      else if (uni === 'Yale') base = 4;
      else if (uni === 'Princeton') base = 3.5;
      else if (uni === 'Columbia') base = 5;
      else if (uni === 'Caltech') base = 3;
      else if (uni === 'UChicago') base = 5;
      else if (uni === 'Duke') base = 6;
      else if (uni === 'UPenn') base = 5.5;
      else if (uni === 'GeorgiaTech') base = 8;
      else if (uni === 'Berkeley') base = 7;
      else if (uni === 'UCLA') base = 7.5;
      else if (uni === 'NYU') base = 10;
      else if (uni === 'CMU') base = 5;
      else if (uni === 'Brown') base = 5;
      else if (uni === 'Northwestern') base = 6;
      else if (uni === 'UToronto') base = 12;
      // GPA Factor
      let gpaFactor = 0;
      if (gpa >= 3.9) gpaFactor = 20;
      else if (gpa >= 3.7) gpaFactor = 12;
      else if (gpa >= 3.5) gpaFactor = 5;
      else gpaFactor = -15;
      // SAT Factor
      let satFactor = 0;
      if (sat >= 1550) satFactor = 20;
      else if (sat >= 1480) satFactor = 12;
      else if (sat >= 1400) satFactor = 6;
      else if (sat >= 1200) satFactor = -10;
      else satFactor = -30;
      // EC Factor
      let ecFactor = 0;
      if (ec === 7) ecFactor = 50;
      else if (ec === 6) ecFactor = 35;
      else if (ec === 5) ecFactor = 22;
      else if (ec === 4) ecFactor = 12;
      else if (ec === 3) ecFactor = 5;
      else if (ec === 2) ecFactor = 1;
      else ecFactor = 0;
      let total = base + gpaFactor + satFactor + ecFactor;
      if (total < 1) total = 1;
      if (total > 98) total = 98;
      // Display
      const resultText = document.getElementById('calc-result-percent');
      const resultBar = document.getElementById('calc-result-bar');
      const resultAdvice = document.getElementById('calc-result-advice');
      if (resultText && resultBar && resultAdvice) {
        resultText.textContent = `${Math.round(total)}%`;
        resultBar.style.width = `${total}%`;
        // Contextual advice
        let advice = "";
        if (ec < 5) {
          advice = `Your extracurricular tier is the main gap for ${uni}. Execute projects in Leveld to level up to 5+ and increase your chances!`;
        } else if (sat < 1500) {
          advice = `Strong extracurriculars! However, your standardized test score is below average for ${uni}. Focus on test-prep roadmaps next.`;
        } else if (gpa < 3.8) {
          advice = `You have high scores and initiatives, but a GPA below ${uni} averages. Build an exceptional capstone portfolio to stand out.`;
        } else {
          advice = `Excellent profile fit! Your chances are significantly above average. Complete your personal portfolio site to lock in your application.`;
        }
        resultAdvice.textContent = advice;
      }
    };
    if (calcUni) calcUni.onchange = updateCalculator;
    if (calcGpa) calcGpa.oninput = updateCalculator;
    if (calcSat) calcSat.oninput = updateCalculator;
    if (calcEc) calcEc.oninput = updateCalculator;
    // Run initial calculation
    setTimeout(updateCalculator, 100);
    // ==========================================
    // 1. Focus Planner & Task Board Logic
    // ==========================================
    let focusTasks = [];
    try {
      const savedTasks = localStorage.getItem('leveled_focus_tasks');
      if (savedTasks) {
        focusTasks = JSON.parse(savedTasks);
      }
    } catch (e) {
      console.error(e);
    }
    
    if (focusTasks.length === 0) {
      focusTasks = [
        { id: 1, text: "Draft Stanford Essay", completed: false },
        { id: 2, text: "Study SAT Math", completed: false },
        { id: 3, text: "AP Chemistry Lab Prep", completed: false }
      ];
    }
    const saveFocusTasks = () => {
      localStorage.setItem('leveled_focus_tasks', JSON.stringify(focusTasks));
    };
    const triggerMiniConfetti = (el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      for (let i = 0; i < 15; i++) {
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = cx + 'px';
        p.style.top = cy + 'px';
        p.style.width = (Math.random() * 6 + 4) + 'px';
        p.style.height = (Math.random() * 6 + 4) + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = '50%';
        p.style.zIndex = '9999';
        p.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 4 + 2;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity - 2;
        
        document.body.appendChild(p);
        
        let start = Date.now();
        const update = () => {
          const elapsed = Date.now() - start;
          if (elapsed > 800) {
            p.remove();
          } else {
            vy += 0.3;
            const top = parseFloat(p.style.top) + vy;
            const left = parseFloat(p.style.left) + vx;
            p.style.top = top + 'px';
            p.style.left = left + 'px';
            p.style.opacity = (1 - elapsed / 800);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
      }
    };
    const triggerConfettiCelebration = () => {
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
      const interval = setInterval(() => {
        if (Date.now() > animationEnd) {
          return clearInterval(interval);
        }
        
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = (Math.random() * window.innerWidth) + 'px';
        p.style.top = '-20px';
        p.style.width = (Math.random() * 8 + 6) + 'px';
        p.style.height = (Math.random() * 8 + 6) + 'px';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = '50%';
        p.style.zIndex = '9999';
        p.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 5;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity + 5;
        
        document.body.appendChild(p);
        
        let start = Date.now();
        const update = () => {
          const elapsed = Date.now() - start;
          if (elapsed > 1500) {
            p.remove();
          } else {
            vy += 0.4;
            const top = parseFloat(p.style.top) + vy;
            const left = parseFloat(p.style.left) + vx;
            p.style.top = top + 'px';
            p.style.left = left + 'px';
            p.style.opacity = (1 - elapsed / 1500);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
      }, 50);
    };
    let userXP = 1850;
    try {
      const savedXP = localStorage.getItem('leveled_focus_xp');
      if (savedXP) userXP = parseInt(savedXP);
    } catch (e) {
      console.error(e);
    }
    let userLevel = 3;
    try {
      const savedLevel = localStorage.getItem('leveled_focus_level');
      if (savedLevel) userLevel = parseInt(savedLevel);
    } catch (e) {
      console.error(e);
    }
    const updateXPUI = () => {
      const xpThreshold = 2500;
      while (userXP >= xpThreshold) {
        userXP -= xpThreshold;
        userLevel += 1;
        LeveledApp.showToast(`🎉 Level Up! You reached Level ${userLevel}!`);
      }
      if (userXP < 0) {
        userXP = 0;
      }
      
      localStorage.setItem('leveled_focus_xp', userXP.toString());
      localStorage.setItem('leveled_focus_level', userLevel.toString());
      
      let rank = "Novice";
      if (userLevel >= 7) rank = "Visionary";
      else if (userLevel >= 5) rank = "Scholar";
      else if (userLevel >= 3) rank = "Builder";
      
      const rankTitle = document.getElementById('focus-level-title');
      const xpText = document.getElementById('focus-xp-text');
      const xpFill = document.getElementById('focus-xp-fill');
      
      if (rankTitle) rankTitle.textContent = `Rank: ${rank} (Lvl ${userLevel})`;
      if (xpText) xpText.textContent = `${userXP} / ${xpThreshold} XP`;
      if (xpFill) {
        const pct = Math.min(100, Math.max(0, (userXP / xpThreshold) * 100));
        xpFill.style.width = pct + '%';
      }
    };
    const addXP = (amount) => {
      userXP += amount;
      updateXPUI();
    };
    const renderFocusTasks = () => {
      const listContainer = document.getElementById('focus-task-list');
      if (!listContainer) return;
      listContainer.innerHTML = '';
      
      focusTasks.forEach(task => {
        const item = document.createElement('div');
        item.className = `focus-task-item${task.completed ? ' completed' : ''}`;
        
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'focus-task-checkbox';
        cb.checked = task.completed;
        cb.onchange = (e) => {
          task.completed = e.target.checked;
          if (task.completed) {
            addXP(100);
            triggerMiniConfetti(e.target);
          } else {
            addXP(-100);
          }
          saveFocusTasks();
          renderFocusTasks();
        };
        
        const txt = document.createElement('span');
        txt.className = 'focus-task-text';
        txt.textContent = task.text;
        
        const del = document.createElement('button');
        del.className = 'focus-task-delete';
        del.innerHTML = '×';
        del.onclick = () => {
          focusTasks = focusTasks.filter(t => t.id !== task.id);
          saveFocusTasks();
          renderFocusTasks();
        };
        
        item.appendChild(cb);
        item.appendChild(txt);
        item.appendChild(del);
        
        listContainer.appendChild(item);
      });
    };
    const addTaskForm = document.getElementById('focus-add-task-form');
    const inputTask = document.getElementById('focus-input-task');
    if (addTaskForm && inputTask) {
      addTaskForm.onsubmit = (e) => {
        e.preventDefault();
        const text = inputTask.value.trim();
        if (text) {
          const newTask = {
            id: Date.now(),
            text: text,
            completed: false
          };
          focusTasks.push(newTask);
          saveFocusTasks();
          renderFocusTasks();
          inputTask.value = '';
        }
      };
    }
    // Initialize Tasks and XP UI
    renderFocusTasks();
    updateXPUI();
    // Pomodoro Focus Timer Logic
    let timerInterval = null;
    let timeRemaining = 25 * 60; 
    let isTimerRunning = false;
    const totalTimerTime = 25 * 60;
    
    const timeDisplay = document.getElementById('focus-time-display');
    const timerRingActive = document.getElementById('focus-timer-ring-active');
    const btnStart = document.getElementById('btn-focus-start');
    const btnReset = document.getElementById('btn-focus-reset');
    const btnFast = document.getElementById('btn-focus-fast');
    const timerLabel = document.getElementById('focus-timer-label');
    
    const formatTime = (secs) => {
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return m + ':' + s;
    };
    
    const updateTimerUI = () => {
      if (timeDisplay) timeDisplay.textContent = formatTime(timeRemaining);
      if (timerRingActive) {
        const circ = 502.4;
        const offset = circ - (timeRemaining / totalTimerTime) * circ;
        timerRingActive.style.strokeDashoffset = offset;
      }
    };
    
    const startTimer = () => {
      if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        if (btnStart) btnStart.textContent = 'Resume Focus';
        if (timerLabel) timerLabel.textContent = 'Paused';
      } else {
        isTimerRunning = true;
        if (btnStart) btnStart.textContent = 'Pause';
        if (timerLabel) timerLabel.textContent = '⚡ In Flow State';
        timerInterval = setInterval(() => {
          timeRemaining--;
          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            timeRemaining = totalTimerTime;
            if (btnStart) btnStart.textContent = 'Start Focus';
            if (timerLabel) timerLabel.textContent = 'Pomodoro';
            addXP(250);
            triggerConfettiCelebration();
            LeveledApp.showToast("🏆 Focus block completed! +250 XP earned!");
          }
          updateTimerUI();
        }, 1000);
      }
    };
    
    const resetTimer = () => {
      clearInterval(timerInterval);
      isTimerRunning = false;
      timeRemaining = totalTimerTime;
      if (btnStart) btnStart.textContent = 'Start Focus';
      if (timerLabel) timerLabel.textContent = 'Pomodoro';
      updateTimerUI();
    };
    
    const fastForwardTimer = () => {
      clearInterval(timerInterval);
      isTimerRunning = false;
      timeRemaining = totalTimerTime;
      if (btnStart) btnStart.textContent = 'Start Focus';
      if (timerLabel) timerLabel.textContent = 'Pomodoro';
      updateTimerUI();
      addXP(100);
      triggerConfettiCelebration();
      LeveledApp.showToast("⚡ Focus sprint fast-tracked! +100 XP!");
    };
    
    if (btnStart) btnStart.onclick = startTimer;
    if (btnReset) btnReset.onclick = resetTimer;
    if (btnFast) btnFast.onclick = fastForwardTimer;
    
    updateTimerUI();
    // ==========================================
    // 2. Weekly Sprint Blocker Filters Logic
    // ==========================================
    const weeklyFilters = document.querySelectorAll('.weekly-filter-btn');
    const weeklyBlocks = document.querySelectorAll('.weekly-sprint-task-block');
    if (weeklyFilters.length > 0 && weeklyBlocks.length > 0) {
      weeklyFilters.forEach(btn => {
        btn.onclick = () => {
          weeklyFilters.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const category = btn.dataset.filter;
          
          weeklyBlocks.forEach(block => {
            if (category === 'all' || block.dataset.category === category) {
              block.classList.remove('dimmed');
            } else {
              block.classList.add('dimmed');
            }
          });
        };
      });
    }
    // ==========================================
    // 3. Target Postcards Click Expansion Logic
    // ==========================================
    const postcardCards = document.querySelectorAll('.uni-postcard-card');
    postcardCards.forEach(card => {
      card.onclick = (e) => {
        card.classList.toggle('expanded');
      };
      const btn = card.querySelector('.uni-postcard-expand-btn');
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          card.classList.toggle('expanded');
        };
      }
    });
  }
};
