import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { Difficulty } from '../App';

interface QuizChallengeProps {
  level: number;
  difficulty: Difficulty;
  onComplete: (correctAnswers: number, totalQuestions: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
}

const quizData: Record<number, Question[]> = {
  1: [
    {
      question: "What is an AI Agent?",
      options: [
        "A robot toy you play with",
        "A smart helper like Siri or Alexa that can think and do tasks",
        "A video game character that just stands there",
        "A regular computer program"
      ],
      correctAnswer: 1,
      explanation: "An AI Agent is a smart digital helper that can think, make decisions, and help you - like Siri, Alexa, or smart NPCs in games!"
    },
    {
      question: "Which of these can an AI Agent do?",
      options: [
        "Only play music",
        "Help with homework, search the web, and remember things",
        "Nothing useful",
        "Only tell jokes"
      ],
      correctAnswer: 1,
      explanation: "AI Agents are super helpful! They can help with homework, search for info, remember stuff, and do lots of useful tasks!"
    },
    {
      question: "If you ask an AI 'Help me with 7 times 8 and tell me if it's more than 50', what does it do?",
      options: [
        "Just says a random number",
        "Solves 7×8 AND compares it to 50 to answer both parts",
        "Says it can't help",
        "Only does the math part"
      ],
      correctAnswer: 1,
      explanation: "The AI Agent can do the math (7×8=56) AND compare it (56 is more than 50) to give you a complete answer!"
    }
  ],
  2: [
    {
      question: "What are tools for AI Agents?",
      options: [
        "Hammers and screwdrivers",
        "Digital helpers like search, calculator, and messaging",
        "Toys",
        "Nothing important"
      ],
      correctAnswer: 1,
      explanation: "AI Agent tools are like apps - search engines, calculators, calendars, and messaging that help them do different jobs!"
    },
    {
      question: "If you ask an AI 'Find cool Minecraft building ideas', which tool would it use?",
      options: [
        "Calculator",
        "Messaging",
        "Search Tool to look on the internet",
        "Calendar"
      ],
      correctAnswer: 2,
      explanation: "The Search Tool lets the AI look up stuff on the internet - perfect for finding Minecraft building ideas!"
    },
    {
      question: "Why do AI Agents need different tools?",
      options: [
        "To look fancy",
        "Each tool does a different job - like math, search, or messages",
        "They don't need tools",
        "Just for fun"
      ],
      correctAnswer: 1,
      explanation: "Different tools do different jobs! Just like you use a pencil for writing and scissors for cutting, AI uses different digital tools!"
    }
  ],
  3: [
    {
      question: "What is short-term memory for an AI Agent?",
      options: [
        "Memories from last year",
        "Remembering what you're talking about RIGHT NOW",
        "Forgetting everything",
        "Only remembering numbers"
      ],
      correctAnswer: 1,
      explanation: "Short-term memory helps the AI remember your current conversation - like what game you were just talking about!"
    },
    {
      question: "Why is memory important for AI Agents?",
      options: [
        "It's not important",
        "So they can remember your favorite things and give better help",
        "Only to slow them down",
        "To confuse people"
      ],
      correctAnswer: 1,
      explanation: "Memory helps AI remember your favorite games, pets' names, and what you like - making them way more helpful!"
    },
    {
      question: "If you tell an AI 'My favorite game is Minecraft' on Monday, and ask 'What's my favorite game?' on Wednesday, what should it do?",
      options: [
        "Say it doesn't know",
        "Remember and say 'Minecraft'",
        "Make up a different game",
        "Ask you to repeat everything"
      ],
      correctAnswer: 1,
      explanation: "With long-term memory, the AI remembers info from earlier conversations - just like a good friend!"
    }
  ],
  4: [
    {
      question: "What makes a good prompt?",
      options: [
        "Being confusing and unclear",
        "Being clear, specific, and friendly",
        "Using only one word",
        "Being rude"
      ],
      correctAnswer: 1,
      explanation: "Good prompts are like clear game instructions - say exactly what you want, give details, and be friendly!"
    },
    {
      question: "Which is a better prompt?",
      options: [
        "Tell me things",
        "Explain how to build a treehouse in Minecraft with simple steps",
        "Stuff",
        "Whatever"
      ],
      correctAnswer: 1,
      explanation: "The second one is specific (Minecraft treehouse), gives details (simple steps), and clear (explain how to build)!"
    },
    {
      question: "Why should you be clear when talking to AI?",
      options: [
        "It doesn't matter",
        "Clear requests help the AI understand and give you better answers",
        "To waste time",
        "AI doesn't need clear instructions"
      ],
      correctAnswer: 1,
      explanation: "Clear, specific prompts help AI understand exactly what you need - like telling your teammate the plan in a game!"
    }
  ],
  5: [
    {
      question: "What is the first step in AI Agent planning?",
      options: [
        "Do random things",
        "Understand what the goal is",
        "Give up",
        "Use every tool at once"
      ],
      correctAnswer: 1,
      explanation: "First, figure out what you want to do! Like planning a Minecraft build - know what you want to make first!"
    },
    {
      question: "If planning a school project about space, what should an AI Agent do?",
      options: [
        "Start writing random facts",
        "Break it into steps: research planets, make outline, write report, add pictures",
        "Only do one tiny part",
        "Ignore the deadline"
      ],
      correctAnswer: 1,
      explanation: "Good planning means breaking big tasks into smaller steps you can do one at a time!"
    },
    {
      question: "Why is planning important for AI Agents?",
      options: [
        "It wastes time",
        "It helps them complete big tasks successfully by breaking them into steps",
        "It's not important",
        "Only easy stuff needs planning"
      ],
      correctAnswer: 1,
      explanation: "Planning helps with big tasks! Like beating a hard video game - you need a strategy and steps to follow!"
    }
  ],
  6: [
    {
      question: "What is a multi-agent system?",
      options: [
        "One agent doing everything alone",
        "Multiple AI Agents working together like a team",
        "Agents fighting each other",
        "No agents at all"
      ],
      correctAnswer: 1,
      explanation: "Multi-agent systems are like a gaming squad - different AI Agents with special skills working together!"
    },
    {
      question: "Why use multiple agents instead of just one?",
      options: [
        "It's always worse",
        "Different agents can be experts at different things, like a sports team",
        "To make things confusing",
        "One agent is always better"
      ],
      correctAnswer: 1,
      explanation: "Like in Fortnite or Among Us, having a team where everyone has special skills is way better than going solo!"
    },
    {
      question: "For creating a YouTube video about gaming, which agents might work together?",
      options: [
        "Only one agent does everything",
        "Script Writer, Video Editor, Thumbnail Designer, and Quality Checker agents",
        "No agents needed",
        "Agents that don't talk to each other"
      ],
      correctAnswer: 1,
      explanation: "Different agents can handle writing, editing, design, and checking - teamwork makes the video better!"
    }
  ],
  7: [
    {
      question: "Why do we test AI Agents?",
      options: [
        "Testing is not important",
        "To make sure they work correctly and give good answers",
        "To break them on purpose",
        "Just for fun"
      ],
      correctAnswer: 1,
      explanation: "Testing makes sure your AI Agent works great! Like testing a game before you share it with friends!"
    },
    {
      question: "What should you check when testing an AI Agent?",
      options: [
        "Nothing at all",
        "Does it answer questions right? Use correct tools? Remember stuff?",
        "Only the color",
        "How loud it is"
      ],
      correctAnswer: 1,
      explanation: "Test if it gives good answers, picks the right tools, and remembers things - like making sure everything works!"
    },
    {
      question: "If an AI gives a wrong answer during testing, what should you do?",
      options: [
        "Ignore it and hope it fixes itself",
        "Write down the problem and improve the AI Agent",
        "Delete everything forever",
        "Never test again"
      ],
      correctAnswer: 1,
      explanation: "Finding bugs is good! Write them down and fix them to make your AI Agent better - just like game developers do!"
    }
  ],
  8: [
    {
      question: "What do AI Agents use to complete different tasks?",
      options: [
        "Magic powers",
        "Tools (search, calculator) and smart planning",
        "Random guessing",
        "Nothing special"
      ],
      correctAnswer: 1,
      explanation: "AI Agents use digital tools and smart planning - like having the right items and a good strategy in a game!"
    },
    {
      question: "Which helps AI Agents get better over time?",
      options: [
        "Forgetting everything",
        "Memory so they remember and learn from past conversations",
        "Being slower",
        "Ignoring users"
      ],
      correctAnswer: 1,
      explanation: "Memory helps AI remember what works and what you like - making them more helpful every time you talk to them!"
    },
    {
      question: "What makes you a good AI Agent Builder?",
      options: [
        "Never testing anything",
        "Understanding prompts, tools, memory, planning, teams, and testing",
        "Only knowing one thing",
        "Not learning anything new"
      ],
      correctAnswer: 1,
      explanation: "Great AI builders understand all the pieces: how to talk to AI, give it tools, help it remember, plan, work in teams, and test!"
    },
    {
      question: "How can a team of agents work better than one agent alone?",
      options: [
        "They can't work better",
        "Each agent has special skills, like players on a sports team",
        "By fighting each other",
        "Teams always work worse"
      ],
      correctAnswer: 1,
      explanation: "Agent teams are powerful! Each one does what they're best at - like having a goalie, defenders, and strikers in soccer!"
    }
  ]
};

export function QuizChallenge({ level, difficulty, onComplete }: QuizChallengeProps) {
  // Select questions based on difficulty
  const allQuestions = quizData[level] || [];
  let numQuestions = 3; // Medium default
  
  if (difficulty === 'easy') {
    numQuestions = 2;
  } else if (difficulty === 'hard') {
    numQuestions = allQuestions.length; // All questions for hard mode
  }
  
  const questions = allQuestions.slice(0, numQuestions);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Timer for hard mode
  const [showHint, setShowHint] = useState(false);
  
  // Timer for hard mode
  useEffect(() => {
    if (difficulty === 'hard' && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (difficulty === 'hard' && timeLeft === 0 && !showFeedback) {
      // Auto-submit when time runs out
      handleSubmitAnswer();
    }
  }, [timeLeft, showFeedback, difficulty]);
  
  // Reset timer for next question
  useEffect(() => {
    if (difficulty === 'hard') {
      setTimeLeft(30);
    }
  }, [currentQuestion, difficulty]);

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      // If time ran out and no answer selected, mark as incorrect
      setSelectedAnswer(-1);
    }
    
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
    } else {
      const finalCorrect = correctAnswers + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      onComplete(finalCorrect, questions.length);
    }
  };

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-yellow-400 text-2xl">Question {currentQuestion + 1} of {questions.length}</h3>
          <div className="flex gap-3 items-center">
            {difficulty === 'hard' && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeLeft <= 10 ? 'bg-red-500/30 animate-pulse border-2 border-red-500' : 'bg-gray-800/80 border border-gray-700'
              }`}>
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className={timeLeft <= 10 ? 'text-red-300' : 'text-yellow-400'}>{timeLeft}s</span>
              </div>
            )}
            <div className="text-yellow-400 bg-gray-800/80 px-4 py-2 rounded-lg border border-gray-700">
              Score: {correctAnswers}/{questions.length}
            </div>
          </div>
        </div>
        
        {/* Difficulty Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-sm ${
            difficulty === 'easy' ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50' :
            difficulty === 'medium' ? 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/50' :
            'bg-orange-500/30 text-orange-200 border border-orange-500/50'
          }`}>
            {difficulty === 'easy' && '⭐ Easy Mode'}
            {difficulty === 'medium' && '🎯 Medium Mode'}
            {difficulty === 'hard' && '🔥 Hard Mode'}
          </div>
          {difficulty === 'easy' && !showFeedback && (
            <Button
              onClick={() => setShowHint(!showHint)}
              className="bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 px-3 py-1 text-sm border border-yellow-500/50"
            >
              {showHint ? '🔒 Hide Hint' : '💡 Show Hint'}
            </Button>
          )}
        </div>
        
        <div className="w-full bg-gray-800 rounded-full h-2 border border-gray-700">
          <div
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 h-full rounded-full transition-all duration-300 shadow-lg shadow-yellow-500/30"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Easy Mode Hint */}
      {difficulty === 'easy' && showHint && !showFeedback && (
        <Card className="bg-yellow-500/20 border-yellow-400/30 p-4 mb-4">
          <div className="flex items-center gap-2 text-yellow-200">
            <Zap className="w-5 h-5" />
            <p>💡 Hint: Look for the answer that talks about AI helping and thinking!</p>
          </div>
        </Card>
      )}

      <Card className="bg-gray-800/80 border-gray-700 p-8 mb-6">
        <h4 className="text-gray-200 text-2xl mb-6">{question.question}</h4>
        
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                selectedAnswer === index
                  ? showFeedback
                    ? isCorrect
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-400'
                      : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-2 border-red-400'
                    : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-2 border-yellow-300'
                  : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 border-2 border-gray-600'
              } ${showFeedback && index === question.correctAnswer ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-400' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{option}</span>
                {showFeedback && index === question.correctAnswer && (
                  <CheckCircle className="w-6 h-6" />
                )}
                {showFeedback && selectedAnswer === index && !isCorrect && (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {showFeedback && (
        <Card className={`${isCorrect ? 'bg-green-500/20 border-green-500/50' : 'bg-orange-500/20 border-orange-500/50'} p-6 mb-6`}>
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-8 h-8 text-orange-400 flex-shrink-0" />
            )}
            <div>
              <p className="text-white text-xl mb-2">
                {isCorrect ? '🎉 Correct! Great job!' : selectedAnswer === -1 ? '⏰ Time ran out!' : '💡 Not quite right, but keep learning!'}
              </p>
              <p className="text-gray-200">{question.explanation}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="text-center">
        {!showFeedback ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl rounded-xl shadow-lg shadow-yellow-500/30"
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 py-6 text-xl rounded-xl shadow-lg shadow-yellow-500/30"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results! 🎉'}
          </Button>
        )}
      </div>
    </div>
  );
}