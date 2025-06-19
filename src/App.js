import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const questions = [
  {
    question: 'Which finger is used to press the spacebar?',
    options: ['Thumb', 'Index finger', 'Little finger', 'Ring finger'],
    answer: 0,
  },
  {
    question: 'What is the correct posture for typing?',
    options: ['Slouching', 'Sitting upright', 'Lying down', 'Standing'],
    answer: 1,
  },
  {
    question: 'Notepad is mainly used for:',
    options: ['Editing images', 'Writing and editing plain text', 'Creating presentations', 'Calculating numbers'],
    answer: 1,
  },
  {
    question: 'Which tab in MS Word is used to change the font style?',
    options: ['Home', 'Insert', 'Design', 'View'],
    answer: 0,
  },
  {
    question: 'To insert a picture in Word, you use the:',
    options: ['Home tab', 'Insert tab', 'Design tab', 'Layout tab'],
    answer: 1,
  },
  {
    question: "The 'Themes' option is found under which tab in Word?",
    options: ['Home', 'Insert', 'Design', 'References'],
    answer: 2,
  },
  {
    question: 'Which formula is used to add numbers in Excel?',
    options: ['=SUM()', '=MIN()', '=MAX()', '=AVG()'],
    answer: 0,
  },
  {
    question: 'To find the smallest value in a range, use:',
    options: ['=SUM()', '=MIN()', '=MAX()', '=CONCATENATE()'],
    answer: 1,
  },
  {
    question: 'Which function combines text from multiple cells?',
    options: ['=SUM()', '=MIN()', '=CONCATENATE()', '=MAX()'],
    answer: 2,
  },
  {
    question: "The 'Insert' tab in Excel is used to:",
    options: ['Change font', 'Insert charts and tables', 'Calculate formulas', 'Sort data'],
    answer: 1,
  },
  {
    question: 'Which tab is used to add new slides in PowerPoint?',
    options: ['Home', 'Insert', 'Design', 'Animations'],
    answer: 0,
  },
  {
    question: 'To apply a design template, use the:',
    options: ['Home tab', 'Insert tab', 'Design tab', 'Transitions tab'],
    answer: 2,
  },
  {
    question: 'Which tab is used to add animations to objects?',
    options: ['Home', 'Insert', 'Design', 'Animations'],
    answer: 3,
  },
  {
    question: "The 'Transitions' tab is used for:",
    options: ['Adding effects between slides', 'Editing text', 'Inserting images', 'Changing font'],
    answer: 0,
  },
  {
    question: 'To send an email, you need:',
    options: ["Only the recipient's address", "Recipient's address and subject", "Recipient's address, subject, and message", 'Only the subject'],
    answer: 2,
  },
];

function App() {
  const [step, setStep] = useState('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [assignment, setAssignment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [quizPaused, setQuizPaused] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Camera access on quiz start
  useEffect(() => {
    if (step === 'quiz' && !cameraActive) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setCameraActive(true);
        })
        .catch(() => {
          setCameraActive(false);
        });
    }
    if (step !== 'quiz' && streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  }, [step, cameraActive]);

  // Tab focus/visibility warning
  useEffect(() => {
    const handleVisibility = () => {
      if (step === 'quiz') {
        if (document.hidden) {
          setShowWarning(true);
          setQuizPaused(true);
        } else {
          setShowWarning(false);
          setQuizPaused(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [step]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setStep('quiz');
    }
  };

  const handleOptionChange = (optIdx) => {
    if (quizPaused) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIdx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setStep('result');
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  const score = answers.reduce((acc, ans, idx) =>
    ans === questions[idx].answer ? acc + 1 : acc, 0
  );

  return (
    <div className="App" style={{ minHeight: '100vh', background: '#f4f6fb', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: 400, maxWidth: '95%' }}>
        {step === 'login' && (
          <form onSubmit={handleLogin}>
            <h2 style={{ marginBottom: 24 }}>Basic Computer Course Login</h2>
            <div style={{ marginBottom: 16 }}>
              <label>Name:</label><br />
              <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} required />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label>Phone Number:</label><br />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} required />
            </div>
            <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold' }}>Login</button>
          </form>
        )}
        {step === 'quiz' && (
          <>
            <div className="camera-box">
              <video ref={videoRef} autoPlay playsInline width={120} height={90} style={{ borderRadius: 8, background: '#000' }} />
              <div className="camera-label">Camera Active</div>
            </div>
            {showWarning && (
              <div className="warning-overlay">
                <div className="warning-content">
                  <h3>Warning</h3>
                  <p>You have moved away from the quiz window. Please return to continue.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ opacity: quizPaused ? 0.3 : 1, pointerEvents: quizPaused ? 'none' : 'auto' }}>
              <h2 style={{ marginBottom: 16 }}>MCQ Assignment</h2>
              <div className="question-block">
                <div className="question">{currentQ + 1}. {questions[currentQ].question}</div>
                <div className="option-cards">
                  {questions[currentQ].options.map((opt, oidx) => (
                    <div
                      key={oidx}
                      className={`option-card${answers[currentQ] === oidx ? ' selected' : ''}`}
                      onClick={() => handleOptionChange(oidx)}
                    >
                      <input
                        type="radio"
                        name={`q${currentQ}`}
                        value={oidx}
                        checked={answers[currentQ] === oidx}
                        onChange={() => handleOptionChange(oidx)}
                        style={{ display: 'none' }}
                        required={answers[currentQ] === null}
                      />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                <button type="button" onClick={handlePrev} disabled={currentQ === 0} style={{ padding: '8px 16px', borderRadius: 4, background: '#eee', border: 'none', color: '#333', fontWeight: 'bold', cursor: currentQ === 0 ? 'not-allowed' : 'pointer' }}>Previous</button>
                {currentQ < questions.length - 1 ? (
                  <button type="button" onClick={handleNext} disabled={answers[currentQ] === null} style={{ padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', cursor: answers[currentQ] === null ? 'not-allowed' : 'pointer' }}>Next</button>
                ) : null}
              </div>
              {currentQ === questions.length - 1 && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 500, marginBottom: 6 }}>16. Write the steps to send an email using any email service.</div>
                  <textarea
                    value={assignment}
                    onChange={e => setAssignment(e.target.value)}
                    rows={3}
                    style={{ width: '100%', borderRadius: 4, border: '1px solid #ccc', padding: 8 }}
                    required
                  />
                </div>
              )}
              {currentQ === questions.length - 1 && (
                <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#388e3c', color: '#fff', border: 'none', fontWeight: 'bold' }}>Submit</button>
              )}
            </form>
          </>
        )}
        {step === 'result' && !showReview && (
          <div>
            <h2 style={{ marginBottom: 16 }}>Thank you, {name}!</h2>
            <p>Your responses have been submitted.</p>
            <p style={{ fontWeight: 500, margin: '16px 0' }}>Your Score: {score} / {questions.length}</p>
            <button onClick={() => setShowReview(true)} style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', marginTop: 12 }}>View Questions</button>
          </div>
        )}
        {step === 'result' && showReview && (
          <div>
            <h2 style={{ marginBottom: 16 }}>Review Answers</h2>
            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}>
              {questions.map((q, idx) => (
                <div key={idx} style={{ marginBottom: 14, padding: 10, borderRadius: 6, background: '#f7f7fa' }}>
                  <div style={{ fontWeight: 500 }}>{idx + 1}. {q.question}</div>
                  {q.options.map((opt, oidx) => {
                    const isUser = answers[idx] === oidx;
                    const isCorrect = q.answer === oidx;
                    return (
                      <div key={oidx} style={{
                        padding: '2px 0 2px 8px',
                        borderRadius: 3,
                        background: isCorrect ? '#d0f5e8' : isUser ? '#ffe0e0' : 'transparent',
                        fontWeight: isCorrect ? 'bold' : isUser ? 'bold' : 'normal',
                        color: isCorrect ? '#1b5e20' : isUser ? '#b71c1c' : '#333',
                        display: 'flex', alignItems: 'center',
                      }}>
                        {isUser && <span style={{ marginRight: 6 }}>Your answer</span>}
                        {isCorrect && <span style={{ marginRight: 6 }}>Correct</span>}
                        {opt}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>16. Your answer for the assignment:</div>
              <div style={{ background: '#f7f7fa', padding: 10, borderRadius: 6 }}>{assignment}</div>
            </div>
            <button onClick={() => setShowReview(false)} style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold' }}>Back to Score</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
