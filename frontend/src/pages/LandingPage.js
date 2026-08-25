import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaraBot from '../components/bot/ClaraBot';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';
const TEAL_LIGHT = '#E1F5EE';

function AnimatedStat({ target, suffix, label }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return (
    <div style={{ background: TEAL_LIGHT, borderRadius: 12, padding: 16, textAlign: 'center' }}>
      <div style={{ fontSize: 26, fontWeight: 600, color: TEAL_DARK }}>{val.toLocaleString('en-IN')}{suffix}</div>
      <div style={{ fontSize: 11, color: TEAL, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
      {/* Navbar */}
      <nav style={{ borderBottom: '1px solid #e5e7eb', padding: '0 40px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: TEAL, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-shield-check" style={{ fontSize: 18, color: '#E1F5EE' }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: TEAL_DARK }}>ClearClaim</div>
            <div style={{ fontSize: 9, color: '#1D9E75', letterSpacing: '0.05em' }}>AI CLAIM ASSISTANT</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Dashboard', 'Pricing', 'Blog', 'About'].map(item => (
            <span key={item} style={{ fontSize: 13, color: '#6b7280', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: `1.5px solid ${TEAL}`, borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 500, color: TEAL, cursor: 'pointer' }}>Log in</button>
          <button onClick={() => navigate('/register')} style={{ background: TEAL, border: 'none', borderRadius: 8, padding: '8px 20px', fontSize: 13, fontWeight: 500, color: '#E1F5EE', cursor: 'pointer' }}>Get Started Free →</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '72px 40px 56px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'inline-block', background: TEAL_LIGHT, color: TEAL_DARK, fontSize: 11, fontWeight: 500, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>Powered by Gemini AI</div>
        <h1 style={{ fontSize: 40, fontWeight: 600, color: TEAL_DARK, lineHeight: 1.2, marginBottom: 16, maxWidth: 580, margin: '0 auto 16px' }}>Health insurance claims,<br />handled with intelligence</h1>
        <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>ClearClaim AI analyses your policy, validates your documents, and tells you exactly what you'll get — before or after treatment. No confusion, no rejections.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <button onClick={() => navigate('/register')} style={{ background: TEAL, border: 'none', borderRadius: 8, padding: '13px 30px', fontSize: 14, fontWeight: 500, color: '#E1F5EE', cursor: 'pointer' }}>Start a Claim →</button>
          <button style={{ background: 'transparent', border: `1.5px solid ${TEAL}`, borderRadius: 8, padding: '13px 24px', fontSize: 14, fontWeight: 500, color: TEAL, cursor: 'pointer' }}>Watch Demo</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, maxWidth: 680, margin: '0 auto' }}>
          <AnimatedStat target={12400} suffix="+" label="Claims Processed" />
          <AnimatedStat target={94} suffix="%" label="Success Rate" />
          <AnimatedStat target={28} suffix="s" label="Avg Analysis Time" />
          <AnimatedStat target={47} suffix="Cr+" label="Amount Recovered" />
        </div>
      </section>

      {/* Modes */}
      <section style={{ padding: '56px 40px', background: '#f9fafb', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-block', background: TEAL_LIGHT, color: TEAL_DARK, fontSize: 11, fontWeight: 500, padding: '4px 14px', borderRadius: 20, marginBottom: 10 }}>Three Claim Modes</div>
          <h2 style={{ fontSize: 26, fontWeight: 600, color: TEAL_DARK, marginBottom: 8 }}>Every stage of your claim, covered</h2>
          <p style={{ fontSize: 13, color: '#6b7280' }}>From pre-approval to appeal — ClearClaim handles it all</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 860, margin: '0 auto' }}>
          {[
            { icon: 'ti-calendar-check', title: 'Before Treatment', desc: 'Upload your policy and doctor\'s note. We check coverage and generate your pre-authorization request.', items: ['Coverage eligibility check', 'Pre-auth letter generation', 'Cost estimation'], color: TEAL },
            { icon: 'ti-receipt', title: 'After Treatment', desc: 'Upload bills and discharge summary. We validate documents and prepare your full claim packet.', items: ['Document validation', 'Bill line-item analysis', 'Reimbursement packet'], color: '#1D9E75' },
            { icon: 'ti-shield-x', title: 'Denied Claim Appeal', desc: 'Claim rejected? Upload the denial letter. We generate a strong appeal to fight back.', items: ['Denial reason analysis', 'AI appeal letter', 'Submission guidance'], color: '#5DCAA5' },
          ].map((mode) => (
            <div key={mode.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 22, borderTop: `3px solid ${mode.color}` }}>
              <div style={{ width: 42, height: 42, background: TEAL_LIGHT, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <i className={`ti ${mode.icon}`} style={{ fontSize: 20, color: mode.color }} />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: TEAL_DARK, marginBottom: 8 }}>{mode.title}</h3>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginBottom: 14 }}>{mode.desc}</p>
              {mode.items.map(item => (
                <div key={item} style={{ fontSize: 11, color: TEAL, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <i className="ti ti-check" /> {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section style={{ padding: '40px', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 20 }}>TRUSTED BY LEADING HEALTHCARE & INSURANCE PARTNERS</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          {['Apollo Hospitals', 'Star Health', 'HDFC ERGO', 'Max Healthcare', 'Niva Bupa'].map(p => (
            <div key={p} style={{ padding: '10px 18px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12, fontWeight: 500, color: '#6b7280' }}>{p}</div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '56px 40px', background: '#f9fafb', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-block', background: TEAL_LIGHT, color: TEAL_DARK, fontSize: 11, fontWeight: 500, padding: '4px 14px', borderRadius: 20, marginBottom: 10 }}>Testimonials</div>
          <h2 style={{ fontSize: 26, fontWeight: 600, color: TEAL_DARK }}>What our users say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 860, margin: '0 auto' }}>
          {[
            { name: 'Rajesh Kumar', city: 'Mumbai', initials: 'RK', text: 'My claim was denied twice. ClearClaim generated an appeal that got me ₹3.2 lakhs approved in 10 days.' },
            { name: 'Priya Sharma', city: 'Bangalore', initials: 'PS', text: 'Before my mother\'s surgery, ClearClaim told us exactly what was covered and which documents to carry. Zero surprises.' },
            { name: 'Ankit Mehta', city: 'Support Agent, Delhi', initials: 'AM', text: 'As a support agent, the dashboard makes reviewing claims effortless. Our team resolution time dropped by 60%.' },
          ].map(t => (
            <div key={t.name} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {[...Array(5)].map((_, i) => <i key={i} className="ti ti-star-filled" style={{ fontSize: 13, color: '#EF9F27' }} />)}
              </div>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, background: TEAL_LIGHT, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: TEAL_DARK }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 40px 24px', background: '#04342C' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, background: TEAL, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ti ti-shield-check" style={{ fontSize: 15, color: '#E1F5EE' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#E1F5EE' }}>ClearClaim AI</span>
            </div>
            <p style={{ fontSize: 11, color: '#5DCAA5', lineHeight: 1.7, maxWidth: 200 }}>Intelligent health insurance claim processing for individuals and enterprises across India.</p>
          </div>
          {[
            { title: 'PRODUCT', links: ['Features', 'Pricing', 'Services', 'Integrations'] },
            { title: 'COMPANY', links: ['About Us', 'Careers', 'Media', 'Blog'] },
            { title: 'SUPPORT', links: ['Help Center', 'Contact Us', 'Archives', 'Status'] },
            { title: 'LEGAL', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Compliance'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#E1F5EE', marginBottom: 14, letterSpacing: '0.06em' }}>{col.title}</div>
              {col.links.map(link => <div key={link} style={{ fontSize: 11, color: '#5DCAA5', marginBottom: 8, cursor: 'pointer' }}>{link}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #085041', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#5DCAA5' }}>© 2026 ClearClaim AI. All rights reserved.</span>
          <span style={{ fontSize: 11, color: '#5DCAA5' }}>Made with ♥ for Indian healthcare</span>
        </div>
      </footer>

      <ClaraBot />
    </div>
  );
}
