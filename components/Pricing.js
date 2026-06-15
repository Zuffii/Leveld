export const Pricing = {
  render() {
    const container = document.getElementById('view-pricing');
    if (!container) return;
    const state = LeveledApp.state;
    const currentPlan = state.user?.plan || 'free';

    const freeFeatures = [
      { text: 'Limited AI Mentor (10 messages/day)', included: true },
      { text: 'Basic Notes access', included: true },
      { text: '5 Mock Papers per month', included: true },
      { text: 'Dashboard & Roadmap', included: true },
      { text: '3 Active Projects', included: true },
      { text: 'Portfolio Builder', included: true },
      { text: 'Document Workspace', included: false },
      { text: 'AI Essay Critique', included: false },
      { text: 'Portfolio Website Export', included: false },
      { text: 'Priority Support', included: false },
    ];

    const proFeatures = [
      { text: 'Unlimited AI Mentor', included: true },
      { text: 'Full Notes access', included: true },
      { text: '20 Mock Papers per month', included: true },
      { text: 'Document Workspace (Notion-style editor)', included: true },
      { text: 'AI Essay Critique', included: true },
      { text: 'Portfolio Website Export', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Everything in Free', included: true },
    ];

    const faqs = [
      {
        q: 'Can I switch plans at any time?',
        a: 'Absolutely. You can upgrade or downgrade your plan at any time. If you upgrade mid-cycle, you\'ll be charged a prorated amount. Downgrades take effect at the end of your current billing period.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards through Stripe, including Visa, Mastercard, and American Express. All transactions are secured with bank-level encryption.'
      },
      {
        q: 'Is there a student discount?',
        a: 'Yes! We offer a 20% discount for students who verify their .edu email address. Reach out to our support team after subscribing and we\'ll apply the discount to your account.'
      },
      {
        q: 'What happens when my free tier limits are reached?',
        a: 'When you hit a free-tier limit (e.g. 10 AI Mentor messages/day), you\'ll see a friendly prompt to upgrade. Your existing data and progress are never lost — limits simply pause new usage until the next reset cycle.'
      }
    ];

    const renderFeatureRow = (feature) => `
      <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 13.5px; color: ${feature.included ? 'var(--text-primary)' : 'var(--text-muted)'};">
        <span style="font-size: 15px; flex-shrink: 0; width: 20px; text-align: center;">${feature.included ? '✅' : '❌'}</span>
        <span style="${!feature.included ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${feature.text}</span>
      </div>
    `;

    container.innerHTML = `
      <style>
        @keyframes pricing-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pricing-badge-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pricing-card-free:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
        }
        .pricing-card-pro:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3) !important;
        }
        .pricing-faq-item:hover {
          background-color: var(--bg-tertiary) !important;
        }
        .pricing-faq-item[open] summary {
          color: var(--primary) !important;
        }
        .pricing-faq-item[open] summary::after {
          transform: rotate(180deg) !important;
        }
      </style>

      <div style="display: flex; flex-direction: column; gap: 40px; max-width: 960px; margin: 0 auto; text-align: center;">

        <!-- Header -->
        <div style="padding: 8px 0;">
          <h2 style="font-family: var(--font-heading); font-size: 32px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
            Choose Your Plan
          </h2>
          <p style="color: var(--text-secondary); font-size: 15px; max-width: 520px; margin: 0 auto 16px auto; line-height: 1.5;">
            Unlock the full power of Leveld. Start free, upgrade when you're ready.
          </p>
          <div style="display: inline-flex; align-items: center; gap: 8px; background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--border-radius-round); padding: 6px 16px; font-size: 12.5px; color: var(--text-secondary);">
            <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${currentPlan === 'pro' ? 'var(--primary)' : '#10b981'}; display: inline-block;"></span>
            Current plan: <strong style="color: var(--text-primary); text-transform: capitalize;">${currentPlan}</strong>
          </div>
        </div>

        <!-- Pricing Cards -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; text-align: left;" class="fit-grid">

          <!-- Free Plan Card -->
          <div class="glass-card pricing-card-free" style="
            padding: 32px 28px;
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
          ">
            <!-- Subtle top accent -->
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--border-color), var(--text-muted), var(--border-color));"></div>

            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Free</span>
                ${currentPlan === 'free' ? `
                  <span style="font-size: 10px; font-weight: 700; color: #10b981; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 3px 10px; border-radius: var(--border-radius-round); text-transform: uppercase; letter-spacing: 0.5px;">Current Plan</span>
                ` : ''}
              </div>

              <div style="margin-bottom: 24px;">
                <span style="font-family: var(--font-heading); font-size: 48px; font-weight: 800; color: var(--text-primary); line-height: 1;">$0</span>
                <span style="font-size: 14px; color: var(--text-muted); margin-left: 4px;">/ month</span>
              </div>

              <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.5; margin-bottom: 28px;">
                Everything you need to get started on your admissions journey. No credit card required.
              </p>

              <div style="border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; flex-direction: column; gap: 2px;">
                ${freeFeatures.map(f => renderFeatureRow(f)).join('')}
              </div>
            </div>

            <div style="margin-top: 28px;">
              ${currentPlan === 'free' ? `
                <div style="
                  width: 100%;
                  padding: 12px;
                  text-align: center;
                  font-size: 13.5px;
                  font-weight: 700;
                  color: var(--text-muted);
                  border: 1px solid var(--border-color);
                  border-radius: var(--border-radius-md);
                  background-color: var(--bg-tertiary);
                ">
                  ✓ Your Active Plan
                </div>
              ` : `
                <div style="
                  width: 100%;
                  padding: 12px;
                  text-align: center;
                  font-size: 13.5px;
                  font-weight: 600;
                  color: var(--text-secondary);
                  border: 1px solid var(--border-color);
                  border-radius: var(--border-radius-md);
                  cursor: default;
                ">
                  Downgrade
                </div>
              `}
            </div>
          </div>

          <!-- Pro Plan Card -->
          <div style="
            position: relative;
            padding: 2px;
            border-radius: calc(var(--border-radius-lg, 16px) + 2px);
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #6366f1);
            background-size: 300% 300%;
            animation: pricing-gradient-shift 6s ease infinite;
          ">
            <div class="glass-card pricing-card-pro" style="
              padding: 32px 28px;
              border: none;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              position: relative;
              overflow: hidden;
              border-radius: var(--border-radius-lg, 16px);
              background-color: var(--bg-secondary);
            ">
              <!-- Glow overlay -->
              <div style="position: absolute; top: -60px; right: -60px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%); pointer-events: none;"></div>
              <div style="position: absolute; bottom: -40px; left: -40px; width: 140px; height: 140px; background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%); pointer-events: none;"></div>

              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                  <span style="font-size: 11px; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 1.5px;">Pro</span>
                  <span style="
                    font-size: 10px;
                    font-weight: 800;
                    color: white;
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    padding: 4px 12px;
                    border-radius: var(--border-radius-round);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    animation: pricing-badge-pulse 2s ease-in-out infinite;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
                  ">⭐ Most Popular</span>
                </div>

                <div style="margin-bottom: 24px;">
                  <span style="font-family: var(--font-heading); font-size: 48px; font-weight: 800; background: linear-gradient(135deg, var(--primary), #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;">$15</span>
                  <span style="font-size: 14px; color: var(--text-muted); margin-left: 4px;">/ month</span>
                </div>

                <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.5; margin-bottom: 28px;">
                  Supercharge your preparation with unlimited AI mentoring, advanced tools, and priority support.
                </p>

                <div style="border-top: 1px solid var(--border-color); padding-top: 20px; display: flex; flex-direction: column; gap: 2px;">
                  ${proFeatures.map(f => renderFeatureRow(f)).join('')}
                </div>
              </div>

              <div style="margin-top: 28px;">
                ${currentPlan === 'pro' ? `
                  <div style="
                    width: 100%;
                    padding: 12px;
                    text-align: center;
                    font-size: 13.5px;
                    font-weight: 700;
                    color: white;
                    border: none;
                    border-radius: var(--border-radius-md);
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
                  ">
                    ✓ Your Active Plan
                  </div>
                ` : `
                  <button id="btn-subscribe-pro" class="btn btn-primary" style="
                    width: 100%;
                    padding: 14px;
                    font-size: 14px;
                    font-weight: 700;
                    border: none;
                    border-radius: var(--border-radius-md);
                    background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
                    background-size: 200% 200%;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
                    letter-spacing: 0.3px;
                  ">
                    🚀 Subscribe with Stripe
                  </button>
                `}
              </div>
            </div>
          </div>

        </div>

        <!-- Comparison Highlight -->
        <div class="glass-card" style="padding: 20px 28px; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <span style="font-size: 24px;">🔒</span>
          <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.5; text-align: left; max-width: 600px;">
            <strong style="color: var(--text-primary);">Secure payments powered by Stripe.</strong>
            Cancel anytime with no questions asked. Your data stays safe and your progress is never lost, even if you downgrade.
          </p>
        </div>

        <!-- FAQ Section -->
        <div style="text-align: left;">
          <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; text-align: center;">
            Frequently Asked Questions
          </h3>
          <p style="color: var(--text-secondary); font-size: 13.5px; margin-bottom: 24px; text-align: center;">
            Got questions? We've got answers.
          </p>

          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 720px; margin: 0 auto;">
            ${faqs.map((faq, i) => `
              <details class="pricing-faq-item" style="
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius-md);
                padding: 0;
                transition: background-color 0.2s ease;
                overflow: hidden;
              ">
                <summary style="
                  padding: 16px 20px;
                  font-size: 14px;
                  font-weight: 700;
                  color: var(--text-primary);
                  cursor: pointer;
                  list-style: none;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 12px;
                  user-select: none;
                  transition: color 0.2s ease;
                ">
                  <span>${faq.q}</span>
                  <span style="font-size: 18px; color: var(--text-muted); transition: transform 0.2s ease; flex-shrink: 0;">▾</span>
                </summary>
                <div style="padding: 0 20px 16px 20px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
                  ${faq.a}
                </div>
              </details>
            `).join('')}
          </div>
        </div>

        <!-- Bottom CTA -->
        <div style="padding: 16px 0 8px 0;">
          <p style="color: var(--text-muted); font-size: 12px;">
            Questions about pricing? <a href="#mentor" style="color: var(--primary); text-decoration: underline; cursor: pointer;">Ask your AI Mentor</a> or reach out to support.
          </p>
        </div>

      </div>
    `;

    this.bindEvents(currentPlan);
  },

  bindEvents(currentPlan) {
    const subBtn = document.getElementById('btn-subscribe-pro');
    if (subBtn) {
      // Hover animation
      subBtn.addEventListener('mouseenter', () => {
        subBtn.style.backgroundPosition = '100% 0';
        subBtn.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.45)';
        subBtn.style.transform = 'translateY(-1px)';
      });
      subBtn.addEventListener('mouseleave', () => {
        subBtn.style.backgroundPosition = '0 0';
        subBtn.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.35)';
        subBtn.style.transform = 'translateY(0)';
      });

      subBtn.onclick = () => {
        // Demo mode: show toast
        LeveledApp.showToast('🔒 Stripe Checkout coming soon! This is a demo of the Pro upgrade flow.');

        // In production, redirect to Stripe Checkout:
        // window.location.href = 'https://checkout.stripe.com/pay/...';
      };
    }
  }
};
