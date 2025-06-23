import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const questions = [
  // Typing
  { question: "Which finger is used to press the spacebar?", options: ['Thumb', 'Index finger', 'Little finger', 'Ring finger'], answer: 0 },
  { question: "What is the correct posture for typing?", options: ['Slouching', 'Sitting upright', 'Lying down', 'Standing'], answer: 1 },
  { question: "Which key is used to start a new line in typing?", options: ['Spacebar', 'Enter', 'Shift', 'Tab'], answer: 1 },
  { question: "What is the function of the Caps Lock key?", options: ['Deletes text', 'Types in capital letters', 'Moves cursor', 'Saves file'], answer: 1 },
  { question: "Which hand is used for the letter 'A' on a QWERTY keyboard?", options: ['Left', 'Right', 'Both', 'None'], answer: 0 },
  { question: "What does WPM stand for in typing?", options: ['Words Per Minute', 'Windows Per Monitor', 'Write Per Month', 'Words Per Memory'], answer: 0 },
  { question: "Which key is used to erase the character to the left of the cursor?", options: ['Delete', 'Backspace', 'Tab', 'Shift'], answer: 1 },
  { question: "Which key is used to insert a tab space?", options: ['Tab', 'Shift', 'Ctrl', 'Alt'], answer: 0 },
  { question: "Which finger is used for the letter 'J' in touch typing?", options: ['Left index', 'Right index', 'Left pinky', 'Right pinky'], answer: 1 },
  { question: "What is the home row in typing?", options: ['Top row', 'Middle row', 'Bottom row', 'Number row'], answer: 1 },
  // Notepad
  { question: "Notepad is mainly used for:", options: ['Editing images', 'Writing and editing plain text', 'Creating presentations', 'Calculating numbers'], answer: 1 },
  { question: "Which menu is used to save a file in Notepad?", options: ['Edit', 'File', 'Format', 'View'], answer: 1 },
  { question: "What is the default file extension for Notepad?", options: ['.docx', '.txt', '.pptx', '.xlsx'], answer: 1 },
  { question: "Which shortcut saves a file in Notepad?", options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+N', 'Ctrl+O'], answer: 0 },
  { question: "Which menu is used to change the font in Notepad?", options: ['File', 'Edit', 'Format', 'Help'], answer: 2 },
  // Word
  { question: "Which tab in MS Word is used to change the font style?", options: ['Home', 'Insert', 'Design', 'View'], answer: 0 },
  { question: "To insert a picture in Word, you use the:", options: ['Home tab', 'Insert tab', 'Design tab', 'Layout tab'], answer: 1 },
  { question: "The 'Themes' option is found under which tab in Word?", options: ['Home', 'Insert', 'Design', 'References'], answer: 2 },
  { question: "Which shortcut is used to copy text in Word?", options: ['Ctrl+V', 'Ctrl+C', 'Ctrl+X', 'Ctrl+Z'], answer: 1 },
  { question: "Which shortcut is used to paste text in Word?", options: ['Ctrl+V', 'Ctrl+C', 'Ctrl+X', 'Ctrl+Z'], answer: 0 },
  { question: "Which tab is used to add a table in Word?", options: ['Home', 'Insert', 'Design', 'Layout'], answer: 1 },
  { question: "Which tab is used to add page numbers in Word?", options: ['Insert', 'Design', 'Layout', 'References'], answer: 0 },
  { question: "Which tab is used to change document margins in Word?", options: ['Layout', 'Insert', 'Design', 'Home'], answer: 0 },
  { question: "Which tab is used to add a header or footer in Word?", options: ['Insert', 'Design', 'Layout', 'References'], answer: 0 },
  { question: "Which tab is used to apply a watermark in Word?", options: ['Design', 'Insert', 'Layout', 'References'], answer: 0 },
  { question: "Which shortcut is used to undo in Word?", options: ['Ctrl+Y', 'Ctrl+Z', 'Ctrl+U', 'Ctrl+X'], answer: 1 },
  // Excel
  { question: "Which formula is used to add numbers in Excel?", options: ['=SUM()', '=MIN()', '=MAX()', '=AVG()'], answer: 0 },
  { question: "To find the smallest value in a range, use:", options: ['=SUM()', '=MIN()', '=MAX()', '=CONCATENATE()'], answer: 1 },
  { question: "Which function combines text from multiple cells?", options: ['=SUM()', '=MIN()', '=CONCATENATE()', '=MAX()'], answer: 2 },
  { question: "The 'Insert' tab in Excel is used to:", options: ['Change font', 'Insert charts and tables', 'Calculate formulas', 'Sort data'], answer: 1 },
  { question: "Which tab is used to sort and filter data in Excel?", options: ['Data', 'Insert', 'Home', 'Formulas'], answer: 0 },
  { question: "Which formula finds the average in Excel?", options: ['=SUM()', '=MIN()', '=MAX()', '=AVERAGE()'], answer: 3 },
  { question: "Which formula finds the largest value in Excel?", options: ['=SUM()', '=MIN()', '=MAX()', '=CONCATENATE()'], answer: 2 },
  { question: "Which tab is used to format cells in Excel?", options: ['Home', 'Insert', 'Data', 'Review'], answer: 0 },
  { question: "Which tab is used to insert a chart in Excel?", options: ['Insert', 'Home', 'Data', 'Formulas'], answer: 0 },
  { question: "Which tab is used to freeze panes in Excel?", options: ['View', 'Insert', 'Data', 'Home'], answer: 0 },
  { question: "Which shortcut saves a file in Excel?", options: ['Ctrl+S', 'Ctrl+P', 'Ctrl+N', 'Ctrl+O'], answer: 0 },
  { question: "Which shortcut is used to cut in Excel?", options: ['Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+Z'], answer: 0 },
  { question: "Which shortcut is used to copy in Excel?", options: ['Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+Z'], answer: 1 },
  { question: "Which shortcut is used to paste in Excel?", options: ['Ctrl+X', 'Ctrl+C', 'Ctrl+V', 'Ctrl+Z'], answer: 2 },
  // PowerPoint
  { question: "Which tab is used to add new slides in PowerPoint?", options: ['Home', 'Insert', 'Design', 'Animations'], answer: 0 },
  { question: "To apply a design template, use the:", options: ['Home tab', 'Insert tab', 'Design tab', 'Transitions tab'], answer: 2 },
  { question: "Which tab is used to add animations to objects?", options: ['Home', 'Insert', 'Design', 'Animations'], answer: 3 },
  { question: "The 'Transitions' tab is used for:", options: ['Adding effects between slides', 'Editing text', 'Inserting images', 'Changing font'], answer: 0 },
  { question: "Which tab is used to insert pictures in PowerPoint?", options: ['Insert', 'Home', 'Design', 'Animations'], answer: 0 },
  { question: "Which tab is used to add SmartArt in PowerPoint?", options: ['Insert', 'Home', 'Design', 'Animations'], answer: 0 },
  { question: "Which tab is used to add a chart in PowerPoint?", options: ['Insert', 'Home', 'Design', 'Animations'], answer: 0 },
  { question: "Which tab is used to change slide layout in PowerPoint?", options: ['Home', 'Insert', 'Design', 'Animations'], answer: 0 },
  { question: "Which shortcut starts a slideshow from the beginning?", options: ['F5', 'F2', 'F7', 'F9'], answer: 0 },
  { question: "Which shortcut moves to the next slide in slideshow?", options: ['Spacebar', 'Enter', 'Right Arrow', 'All of these'], answer: 3 },
  // Email
  { question: "To send an email, you need:", options: ["Only the recipient's address", "Recipient's address and subject", "Recipient's address, subject, and message", 'Only the subject'], answer: 2 },
  { question: "Which field is used to send a copy of an email to someone else?", options: ['To', 'CC', 'BCC', 'Subject'], answer: 1 },
  { question: "Which field hides the recipient's email address from others?", options: ['To', 'CC', 'BCC', 'Subject'], answer: 2 },
  { question: "What is the purpose of the Subject field in an email?", options: ['Recipient address', 'Message content', 'Title of the email', 'Attachment'], answer: 2 },
  { question: "Which button is used to send the email?", options: ['Send', 'Reply', 'Forward', 'Delete'], answer: 0 },
  { question: "Which button is used to reply to an email?", options: ['Send', 'Reply', 'Forward', 'Delete'], answer: 1 },
  { question: "Which button is used to forward an email?", options: ['Send', 'Reply', 'Forward', 'Delete'], answer: 2 },
  { question: "Which button is used to remove an email?", options: ['Send', 'Reply', 'Forward', 'Delete'], answer: 3 },
  { question: "What is an attachment in an email?", options: ['A file sent with the email', 'A reply', 'A subject', 'A recipient'], answer: 0 },
  { question: "Which symbol is used for email addresses?", options: ['#', '@', '$', '%'], answer: 1 },
  // General Computer
  { question: "What does CPU stand for?", options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Print Unit', 'Control Processing Unit'], answer: 0 },
  { question: "What does RAM stand for?", options: ['Read Access Memory', 'Random Access Memory', 'Run Access Memory', 'Read And Memory'], answer: 1 },
  { question: "What is the main function of a mouse?", options: ['Typing', 'Pointing and clicking', 'Printing', 'Scanning'], answer: 1 },
  { question: "What is the main function of a keyboard?", options: ['Typing', 'Printing', 'Scanning', 'Drawing'], answer: 0 },
  { question: "Which device is used to print documents?", options: ['Monitor', 'Printer', 'Scanner', 'Keyboard'], answer: 1 },
  { question: "Which device is used to scan documents?", options: ['Monitor', 'Printer', 'Scanner', 'Keyboard'], answer: 2 },
  { question: "Which device displays the output?", options: ['Monitor', 'Printer', 'Scanner', 'Keyboard'], answer: 0 },
  { question: "Which device is used to store data permanently?", options: ['RAM', 'Hard Disk', 'CPU', 'Monitor'], answer: 1 },
  { question: "Which device is used to store data temporarily?", options: ['RAM', 'Hard Disk', 'CPU', 'Monitor'], answer: 0 },
  { question: "Which is an example of an input device?", options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], answer: 2 },
  { question: "Which is an example of an output device?", options: ['Monitor', 'Keyboard', 'Mouse', 'Scanner'], answer: 0 },
  { question: "Which software is used to browse the internet?", options: ['MS Word', 'MS Excel', 'Web Browser', 'MS PowerPoint'], answer: 2 },
  { question: "Which is an example of an operating system?", options: ['Windows', 'MS Word', 'MS Excel', 'Printer'], answer: 0 },
  { question: "Which is an example of application software?", options: ['Windows', 'MS Word', 'CPU', 'RAM'], answer: 1 },
  { question: "What is the full form of USB?", options: ['Universal Serial Bus', 'United Serial Bus', 'Universal System Bus', 'United System Bus'], answer: 0 },
  { question: "What is the full form of WWW?", options: ['World Wide Web', 'World Web Wide', 'Web World Wide', 'Wide World Web'], answer: 0 },
  { question: "What is the full form of URL?", options: ['Uniform Resource Locator', 'Uniform Resource Link', 'Universal Resource Locator', 'Universal Resource Link'], answer: 0 },
  { question: "Which key is used to refresh a webpage?", options: ['F5', 'F2', 'F7', 'F9'], answer: 0 },
  { question: "Which key is used to select all text?", options: ['Ctrl+A', 'Ctrl+C', 'Ctrl+V', 'Ctrl+S'], answer: 0 },
  { question: "Which key is used to print a document?", options: ['Ctrl+P', 'Ctrl+S', 'Ctrl+V', 'Ctrl+X'], answer: 0 },
  { question: "Which key is used to open a new window in a browser?", options: ['Ctrl+N', 'Ctrl+O', 'Ctrl+S', 'Ctrl+P'], answer: 0 },
].slice(0, 50);

function getRandomQuestions(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function App() {
  const [step, setStep] = useState('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [answers, setAnswers] = useState([]);
  const [assignment, setAssignment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [quizPaused, setQuizPaused] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

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

  const getGreeting = (score, total) => {
    const percent = (score / total) * 100;
    if (percent === 100) return 'Outstanding! You got a perfect score! 🌟';
    if (percent >= 90) return 'Excellent work! You really know your stuff! 🎉';
    if (percent >= 75) return 'Great job! Keep it up! 👍';
    if (percent >= 50) return 'Good effort! Keep practicing and you will improve! 💪';
    return "Don't give up! Review the material and try again! 😊";
  };

  const handlePhoneChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
    if (value.length > 10) {
      setPhoneError('Phone number must be exactly 10 digits');
    } else {
      setPhoneError('');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    setPhoneError('');
    if (name.trim() && phone.trim()) {
      const selected = getRandomQuestions(questions, 15);
      setQuizQuestions(selected);
      setAnswers(Array(15).fill(null));
      setStep('quiz');
      setCurrentQ(0);
      setAssignment('');
      setSubmitted(false);
    }
  };

  const handleOptionChange = (optIdx) => {
    if (quizPaused) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = optIdx;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) setCurrentQ(currentQ + 1);
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
    quizQuestions[idx] && ans === quizQuestions[idx].answer ? acc + 1 : acc, 0
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
              <input type="tel" value={phone} onChange={handlePhoneChange} maxLength={10} style={{ width: '100%', padding: 8, borderRadius: 4, border: phoneError ? '1px solid #e53935' : '1px solid #ccc' }} required />
              {phoneError && <div style={{ color: '#e53935', fontSize: 13, marginTop: 4 }}>{phoneError}</div>}
            </div>
            <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold' }}>Login</button>
          </form>
        )}
        {step === 'quiz' && quizQuestions.length > 0 && (
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
                <div className="question">{currentQ + 1}. {quizQuestions[currentQ].question}</div>
                <div className="option-cards">
                  {quizQuestions[currentQ].options.map((opt, oidx) => (
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
                {currentQ < quizQuestions.length - 1 ? (
                  <button type="button" onClick={handleNext} disabled={answers[currentQ] === null} style={{ padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', cursor: answers[currentQ] === null ? 'not-allowed' : 'pointer' }}>Next</button>
                ) : null}
              </div>
              {currentQ === quizQuestions.length - 1 && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 500, marginBottom: 6 }}> Write the steps to send an email using any email service.</div>
                  <textarea
                    value={assignment}
                    onChange={e => setAssignment(e.target.value)}
                    rows={3}
                    style={{ width: '100%', borderRadius: 4, border: '1px solid #ccc', padding: 8 }}
                    required
                  />
                </div>
              )}
              {currentQ === quizQuestions.length - 1 && (
                <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#388e3c', color: '#fff', border: 'none', fontWeight: 'bold' }}>Submit</button>
              )}
            </form>
          </>
        )}
        {step === 'result' && !showReview && (
          <div>
            <h2 style={{ marginBottom: 16 }}>Thank you, {name}!</h2>
            <p>Your responses have been submitted.</p>
            <p style={{ fontWeight: 500, margin: '16px 0' }}>Your Score: {score} / {quizQuestions.length}</p>
            <div style={{
              background: '#f4f6fb',
              color: '#1976d2',
              fontWeight: 'bold',
              borderRadius: 8,
              padding: '12px 16px',
              margin: '12px 0',
              textAlign: 'center',
              fontSize: 17
            }}>{getGreeting(score, quizQuestions.length)}</div>
            <button onClick={() => setShowReview(true)} style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 'bold', marginTop: 12 }}>View Questions</button>
          </div>
        )}
        {step === 'result' && showReview && (
          <div>
            <h2 style={{ marginBottom: 16 }}>Review Answers</h2>
            <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 16 }}>
              {quizQuestions.map((q, idx) => (
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
              <div style={{ fontWeight: 500, marginBottom: 6 }}> Your answer for the assignment:</div>
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
