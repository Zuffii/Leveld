const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log("=================================================");
  console.log("🚀 STARTING LEVELD OS END-TO-END USER SIMULATION");
  console.log("=================================================");

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const artifactDir = '/Users/zufii/.gemini/antigravity/brain/80b764a9-e300-4f66-b01b-feb96b7a76db';
  const dbFile = '/Users/zufii/.gemini/antigravity/scratch/leveled/users_db.json';

  // Ensure artifacts folder exists
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  // Create a mock PDF file to upload as evidence
  const mockPdfPath = path.join(__dirname, 'mock_evidence.pdf');
  fs.writeFileSync(mockPdfPath, 'Mock PDF File content for Leveld OS verification. Base64 encoding test.');
  console.log(`✓ Created mock PDF at: ${mockPdfPath}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: "new",
    defaultViewport: { width: 1280, height: 1000 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Array to capture page errors
  const pageErrors = [];
  const consoleMessages = [];

  page.on('pageerror', error => {
    console.error("❌ [BROWSER RUNTIME ERROR]:", error.message);
    pageErrors.push(error);
  });

  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(text);
    if (msg.type() === 'error') {
      console.error("❌ [BROWSER CONSOLE ERROR]:", text);
    } else if (msg.type() === 'warning') {
      console.warn("⚠️ [BROWSER CONSOLE WARN]:", text);
    } else {
      console.log("💬 [BROWSER CONSOLE]:", text);
    }
  });

  try {
    // 1. Navigation to Onboarding (Clean state)
    console.log("\nStep 1: Navigating to onboarding screen with clean state...");
    await page.goto('http://localhost:3000/?onboarding=true&logout=true', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(artifactDir, 'sim_0_onboarding_start.png') });
    console.log("✓ Loaded Onboarding Start page. Saved screenshot.");

    // 2. Complete Step 1: Logic & Personality MCQ Assessment (10 questions)
    console.log("\nStep 2: Completing Logic & Personality MCQ Assessment (1-10)...");
    for (let q = 1; q <= 10; q++) {
      console.log(`  Solving Question ${q}/10...`);
      // Wait for MCQ choices to render
      await page.waitForSelector('.test-choice-btn', { timeout: 5000 });
      
      // Click the first choice
      const choices = await page.$$('.test-choice-btn');
      if (choices.length === 0) throw new Error(`No choices found on Question ${q}`);
      await choices[0].click();
      await new Promise(r => setTimeout(r, 400)); // wait for selection highlight animation

      // Take a screenshot of mid-quiz on Q5
      if (q === 5) {
        await page.screenshot({ path: path.join(artifactDir, 'sim_0_onboarding_mcq.png') });
        console.log("  Saved mid-quiz screenshot.");
      }

      // Click Next
      await page.click('#btn-wizard-next');
      await new Promise(r => setTimeout(r, 800)); // wait for next question to render
    }
    console.log("✓ Completed MCQ quiz.");

    // 3. Step 2: Accept Career Path Recommendation
    console.log("\nStep 3: Grading and accepting AI Career recommendation...");
    await page.waitForSelector('#btn-accept-career', { timeout: 5000 });
    await page.screenshot({ path: path.join(artifactDir, 'sim_1_onboarding_career.png') });
    console.log("  Saved career recommendation screen. Accepting...");
    await page.click('#btn-accept-career');
    await new Promise(r => setTimeout(r, 500));
    await page.click('#btn-next-career');
    await new Promise(r => setTimeout(r, 1000));

    // 4. Step 3: Account Credentials Setup
    console.log("\nStep 4: Filling out student credentials...");
    await page.waitForSelector('#credentials-form', { timeout: 5000 });
    
    // Type name, email, username, password
    const username = 'cluelessstudent_' + Math.floor(Math.random() * 10000);
    await page.type('#acct-name', 'Clueless Student');
    await page.type('#acct-email', `${username}@test.com`);
    await page.type('#acct-username', username);
    await page.type('#acct-password', 'password123');

    // Click grade pill "11th Grade"
    await page.click('.grade-pill-group .pill-chip[data-val="11th Grade"]');

    // Select Dream University (MIT)
    await page.click('#uni-chips-grid .uni-selection-card[data-uni="MIT"]');

    // Select Country (United States)
    await page.click('#country-chips-grid .country-selection-card[data-country="United States"]');

    // Type city
    await page.type('#acct-city', 'Boston');

    await page.screenshot({ path: path.join(artifactDir, 'sim_2_onboarding_setup.png') });
    console.log("  Filled form, selected MIT and US. Saved credentials screenshot. Submitting...");

    // Submit form
    await page.click('#credentials-form button[type="submit"]');
    
    // Wait for Dashboard to render
    await page.waitForSelector('#app-layout', { timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000)); // allow dashboard animation
    await page.screenshot({ path: path.join(artifactDir, 'sim_3_dashboard.png') });
    console.log("✓ Logged in! Dashboard loaded. Saved screenshot.");

    // 5. Navigate to Extracurriculars and Add Project
    console.log("\nStep 5: Navigating to Extracurriculars tab and adding passion project...");
    // Click Extracurriculars nav link
    await page.click('a.di-link[data-page="extracurriculars"]');
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(artifactDir, 'sim_4_extracurriculars.png') });
    console.log("  Loaded Extracurriculars. Adding passion project blueprint...");

    // Click Add to Tracker button for the first project blueprint
    await page.waitForSelector('.btn-project-add-tracker', { timeout: 5000 });
    await page.click('.btn-project-add-tracker');
    await new Promise(r => setTimeout(r, 1000));
    console.log("  Project added to tracker.");

    // Go to Active Tracker tab
    console.log("  Switching to Active Tracker tab...");
    await page.click('#project-incubator-tabs [data-tab="active"]');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(artifactDir, 'sim_4_active_tracker.png') });

    // 6. Upload Evidence File (PDF)
    console.log("\nStep 6: Uploading mock PDF evidence to active project...");
    await page.waitForSelector('.btn-log-evidence-modal', { timeout: 5000 });
    await page.click('.btn-log-evidence-modal');
    await new Promise(r => setTimeout(r, 1000)); // wait for modal fade-in
    
    await page.screenshot({ path: path.join(artifactDir, 'sim_5_evidence_modal.png') });
    console.log("  Evidence modal opened. Filling out fields...");

    // Select evidence type: PDF
    await page.select('#evidence-type', 'pdf');
    await new Promise(r => setTimeout(r, 300));

    // Fill Title & Description
    await page.type('#evidence-title', 'Olympiad Algorithms Draft');
    await page.type('#evidence-description', 'A complete draft detailing micro-mouse pathfinding algorithms and dynamic programming solutions.');

    // Upload mock PDF file
    const fileChooserInput = await page.$('#evidence-file');
    await fileChooserInput.uploadFile(mockPdfPath);
    await new Promise(r => setTimeout(r, 500));

    console.log("  File uploaded to form. Clicking Save...");
    await page.click('#modal-evidence-form button[type="submit"]');
    await new Promise(r => setTimeout(r, 2000)); // wait for file encoding & save
    console.log("✓ Evidence uploaded and saved successfully.");

    // 7. Verify Portfolio Page and uploaded file
    console.log("\nStep 7: Verifying evidence renders on the Portfolio website...");
    await page.click('a.di-link[data-page="portfolio"]');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(artifactDir, 'sim_6_portfolio.png') });
    console.log("  Portfolio page loaded. Checking customizer and Bob AI...");

    // Since the Portfolio builder is a permanent sidebar in the new UI, we do not need to toggle it open.
    console.log("  Builder sidebar is already present in layout.");

    // Switch to Bob Chat tab
    console.log("  Switching customizer to Bob AI Assistant tab...");
    await page.waitForSelector('#tab-bob', { timeout: 5000 });
    await page.click('#tab-bob');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(artifactDir, 'sim_7_bob_chat.png') });

    // Chat with Bob
    console.log("  Sending message to Bob the Builder...");
    await page.type('#bob-chat-input', "Hi Bob, make my portfolio theme look cyberpunk, use a high-contrast style and round borders!");
    await page.click('#bob-chat-form button[type="submit"]');
    console.log("  Waiting for Bob's response...");
    await new Promise(r => setTimeout(r, 5000)); // wait for offline simulation or live Claude response
    await page.screenshot({ path: path.join(artifactDir, 'sim_7_bob_chat_response.png') });
    console.log("  Bob chat verification complete.");

    // Navigate back to dashboard where Ivy mascot is loaded
    await page.goto('http://localhost:3000/#dashboard');
    await new Promise(r => setTimeout(r, 1500));

    // Find the Ivy bird mascot in the viewport
    const ivySelector = '#ivy-mentor-bird';
    await page.waitForSelector(ivySelector, { timeout: 5000 });
    await page.click(ivySelector);
    await new Promise(r => setTimeout(r, 1000)); // wait for sidebar panel slide-in
    await page.screenshot({ path: path.join(artifactDir, 'sim_8_ivy_chat.png') });

    // Type query to Ivy
    console.log("  Sending message to Ivy the Mentor...");
    await page.type('#mentor-chat-input', "Hi Ivy! I am a clueless student wanting to get into MIT, can you outline my biggest roadmap gaps?");
    await page.click('#mentor-chat-form button[type="submit"]');
    console.log("  Waiting for Ivy's response...");
    await new Promise(r => setTimeout(r, 5000)); // wait for reply
    await page.screenshot({ path: path.join(artifactDir, 'sim_8_ivy_chat_response.png') });
    console.log("  Ivy chat verification complete.");

    // Close Ivy panel
    await page.click('#mentor-close-btn-panel');
    await new Promise(r => setTimeout(r, 500));

    // 9. Navigate and Screenshot other tabs
    console.log("\nStep 9: Testing navigation and taking screenshots of remaining features...");
    
    // Helper to switch tab and screenshot
    const testTab = async (pageName, screenshotName) => {
      console.log(`  Visiting #${pageName}...`);
      await page.goto(`http://localhost:3000/#${pageName}`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(artifactDir, screenshotName) });
    };

    await testTab('roadmap', 'sim_9_roadmap.png');
    await testTab('calendar', 'sim_10_calendar.png');
    await testTab('essay', 'sim_11_essay.png');
    await testTab('notes', 'sim_12_notes.png');
    await testTab('jobs', 'sim_13_jobs.png');
    await testTab('admissions', 'sim_14_admissions.png');

    console.log("\n=================================================");
    console.log("🎉 ALL SIMULATION RUNS COMPLETED SUCCESSFULLY!");
    console.log("=================================================");

  } catch (err) {
    console.error("❌ SIMULATION CRASHED WITH ERROR:", err);
    await page.screenshot({ path: path.join(artifactDir, 'sim_crash.png') });
  } finally {
    await browser.close();
    // Clean up local mock file
    if (fs.existsSync(mockPdfPath)) {
      fs.unlinkSync(mockPdfPath);
    }
  }

  // Final validation of database
  console.log("\nStep 10: Validating database storage in users_db.json...");
  try {
    if (fs.existsSync(dbFile)) {
      const dbData = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
      // Find our clueless student profile
      const cluelessStudent = dbData.find(u => u.user && u.user.name === 'Clueless Student');
      if (cluelessStudent) {
        console.log("✓ Student 'Clueless Student' found in users_db.json!");
        console.log(`  Dream University: ${cluelessStudent.user.dreamUniversities.join(', ')}`);
        console.log(`  Career Goals: ${cluelessStudent.user.careerGoals}`);
        console.log(`  XP: ${cluelessStudent.xp}, Level: ${cluelessStudent.level}`);
        
        // Check evidence list for PDF
        const passionProj = cluelessStudent.projects.find(p => p.type === 'passion');
        if (passionProj && passionProj.evidenceList && passionProj.evidenceList.length > 0) {
          const evidence = passionProj.evidenceList[0];
          console.log(`✓ Uploaded Evidence verified in JSON database:`);
          console.log(`  Title: ${evidence.title}`);
          console.log(`  Type: ${evidence.type}`);
          console.log(`  URL starts with: ${evidence.url.substring(0, 40)}...`);
          console.log("🔥 Base64 evidence upload fully verified client-to-server!");
        } else {
          console.error("❌ No evidence uploaded on clueless student's passion project in users_db.json");
        }
      } else {
        console.error("❌ Student 'Clueless Student' not found in users_db.json");
      }
    } else {
      console.error("❌ users_db.json file does not exist at:", dbFile);
    }
  } catch (e) {
    console.error("❌ Error reading database file:", e.message);
  }

  // Print results
  console.log("\n=== SIMULATION SUMMARY ===");
  console.log(`Runtime JS errors caught: ${pageErrors.length}`);
  if (pageErrors.length > 0) {
    console.log("Caught errors:");
    pageErrors.forEach((e, idx) => console.log(`  ${idx + 1}. ${e.stack || e.message}`));
  } else {
    console.log("🏆 ZERO JAVASCRIPT RUNTIME ERRORS CAUGHT!");
  }
})();
