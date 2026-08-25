import React, { useState, useRef, useEffect } from 'react';

const TEAL = '#0F6E56';
const TEAL_DARK = '#085041';
const TEAL_LIGHT = '#E1F5EE';

const flows = {
  'Before Treatment': [
    "Great! For pre-authorization I'll need a few things from you.",
    "Step 1 — Do you have your health insurance policy document ready?",
    "Step 2 — What is the treatment or surgery planned? Share the diagnosis or procedure name.",
    "Step 3 — Which hospital are you planning to visit? Is it a network hospital?",
    "Once ready, click 'Start a Claim' and select 'Before Treatment'. I'll guide you through every upload! 🏥"
  ],
  'After Treatment': [
    "Got it! For reimbursement, here's what you'll need.",
    "Step 1 — Final hospital bill (itemised if possible)",
    "Step 2 — Discharge summary from the hospital",
    "Step 3 — All payment receipts, prescriptions, and lab reports",
    "Step 4 — Your policy document and a filled claim form",
    "Click 'Start a Claim' and select 'After Treatment' — our AI will analyse everything instantly! 💊"
  ],
  'Denied Claim': [
    "Sorry to hear your claim was denied. Let's fight it together! 💪",
    "Step 1 — Upload the denial letter or Explanation of Benefits (EOB) from your insurer.",
    "Step 2 — Share your original policy document.",
    "Step 3 — Any supporting medical documents related to the treatment.",
    "Our AI will generate a strong appeal letter for you. Click 'Start a Claim' and select 'Denied Claim Appeal'!"
  ],
  'Documents needed?': [
    "Great question! Documents depend on your claim type:",
    "📋 Before Treatment: Policy doc, doctor's prescription, diagnosis report, hospital estimate.",
    "🧾 After Treatment: Final bill, discharge summary, receipts, prescriptions, lab reports, claim form.",
    "❌ Denied Claim: Denial letter, EOB, policy doc, medical records.",
    "Which type of claim are you filing?"
  ]
};

const defaultChips = ['Before Treatment', 'After Treatment', 'Denied Claim', 'Documents needed?'];

export default function ClaraBot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([{ type: 'bot', text: '👋 Hi! I\'m Clara, your ClearClaim assistant.\n\nI can guide you through your claim step by step or answer any insurance question. What do you need help with?' }]);
  const [chips, setChips] = useState(defaultChips);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const addBotMessage = (text) => setMessages(prev => [...prev, { type: 'bot', text }]);

  const runFlow = (steps, idx = 0) => {
    if (idx >= steps.length) { setChips(defaultChips); return; }
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addBotMessage(steps[idx]);
      setTimeout(() => runFlow(steps, idx + 1), idx < steps.length - 1 ? 700 : 0);
    }, 900);
  };

  const handleChip = (text) => {
    setChips([]);
    setMessages(prev => [...prev, { type: 'user', text }]);
    if (flows[text]) runFlow(flows[text]);
  };

  const sendMsg = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setChips([]);
    setMessages(prev => [...prev, { type: 'user', text }]);
    const lower = text.toLowerCase();
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      if (lower.includes('before') || lower.includes('pre') || lower.includes('surgery')) { handleChip('Before Treatment'); return; }
      if (lower.includes('after') || lower.includes('reimburse') || lower.includes('bill')) { handleChip('After Treatment'); return; }
      if (lower.includes('denied') || lower.includes('rejected') || lower.includes('appeal')) { handleChip('Denied Claim'); return; }
      if (lower.includes('document') || lower.includes('upload')) { handleChip('Documents needed?'); return; }
      addBotMessage("That's a great question! For the most accurate answer, start your claim above and our AI will analyse your specific policy and situation. 🤝");
      setChips(defaultChips);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
      {open && (
        <div style={{ width: 300, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(15,110,86,0.15)' }}>
          {/* Header */}
          <div style={{ background: TEAL, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: TEAL_LIGHT, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className="ti ti-robot" style={{ fontSize: 16, color: TEAL }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#E1F5EE' }}>Clara — ClearClaim Assistant</div>
              <div style={{ fontSize: 10, color: '#9FE1CB', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, background: '#9FE1CB', borderRadius: '50%' }} /> Online · Always here
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9FE1CB', fontSize: 16 }}>
              <i className="ti ti-x" />
            </button>
          </div>

          {/* Messages */}
          <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 240, overflowY: 'auto' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ background: m.type === 'bot' ? TEAL_LIGHT : TEAL, borderRadius: m.type === 'bot' ? '10px 10px 10px 2px' : '10px 10px 2px 10px', padding: '8px 10px', fontSize: 11, color: m.type === 'bot' ? TEAL_DARK : '#E1F5EE', maxWidth: 220, alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div style={{ background: TEAL_LIGHT, borderRadius: '10px 10px 10px 2px', padding: '10px 14px', display: 'flex', gap: 4 }}>
                {[0, 0.15, 0.3].map((d, i) => (
                  <div key={i} style={{ width: 6, height: 6, background: TEAL, borderRadius: '50%', animation: `bounce 1s ${d}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chips */}
          {chips.length > 0 && (
            <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {chips.map(c => (
                <button key={c} onClick={() => handleChip(c)} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 20, padding: '5px 10px', fontSize: 10, color: TEAL, cursor: 'pointer' }}>{c}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: 6 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Ask anything about your claim..." style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 8, padding: '7px 10px', fontSize: 11, outline: 'none' }} />
            <button onClick={sendMsg} style={{ background: TEAL, border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <i className="ti ti-send" style={{ fontSize: 14, color: '#E1F5EE' }} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle bubble */}
      <button onClick={() => setOpen(o => !o)} style={{ width: 52, height: 52, background: TEAL, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(15,110,86,0.35)' }}>
        <i className={`ti ${open ? 'ti-x' : 'ti-robot'}`} style={{ fontSize: 22, color: '#E1F5EE' }} />
      </button>

      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
