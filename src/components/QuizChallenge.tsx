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
        "A simple chatbot that follows a script",
        "An intelligent system that can think, make decisions, and complete tasks autonomously",
        "A basic automation tool",
        "Just a search engine"
      ],
      correctAnswer: 1,
      explanation: "An AI Agent is an intelligent system that can understand context, make decisions, use tools, and complete complex tasks - like Siri, Alexa, or advanced AI assistants!"
    },
    {
      question: "Which of these can an AI Agent do?",
      options: [
        "Only answer pre-programmed questions",
        "Understand requests, use multiple tools, and complete multi-step tasks",
        "Nothing without constant human supervision",
        "Only perform one fixed function"
      ],
      correctAnswer: 1,
      explanation: "AI Agents can understand natural language, decide which tools to use, complete complex multi-step tasks, and adapt to different situations!"
    },
    {
      question: "If you ask an AI 'Schedule a team meeting next week and send invites', what does it do?",
      options: [
        "Just creates a calendar event",
        "Checks calendars for availability, schedules the meeting, AND sends email invites to all participants",
        "Asks you to do it manually",
        "Only checks the calendar"
      ],
      correctAnswer: 1,
      explanation: "The AI Agent can perform multiple actions: check availability, create the event, and send invites - completing the entire workflow!"
    }
  ],
  2: [
    {
      question: "What are tools for AI Agents?",
      options: [
        "Physical hardware components",
        "APIs, databases, and digital services the agent can access to complete tasks",
        "Just decorative features",
        "Nothing important"
      ],
      correctAnswer: 1,
      explanation: "AI Agent tools are APIs and services like web search, email, calculators, databases, and calendars that extend the agent's capabilities!"
    },
    {
      question: "If you ask an AI 'Find the latest competitor pricing data', which tool would it use?",
      options: [
        "Calculator",
        "Email sender",
        "Web Search API to query the internet",
        "Calendar"
      ],
      correctAnswer: 2,
      explanation: "The Web Search tool allows the AI to query search engines and find current information from the internet!"
    },
    {
      question: "Why do AI Agents need different tools?",
      options: [
        "To make them look more complex",
        "Each tool provides specific capabilities - search for data, calculate for math, email for communication",
        "They don't actually need tools",
        "Just for demonstration purposes"
      ],
      correctAnswer: 1,
      explanation: "Different tools serve different purposes! Just like apps on your phone, each tool gives the agent specific capabilities to complete various tasks!"
    }
  ],
  3: [
    {
      question: "What is short-term memory for an AI Agent?",
      options: [
        "Permanent data storage",
        "Remembering the current conversation context and recent interactions",
        "Forgetting everything immediately",
        "Only numerical data"
      ],
      correctAnswer: 1,
      explanation: "Short-term memory helps the AI remember the current conversation context - what you're discussing right now and recent messages!"
    },
    {
      question: "Why is memory important for AI Agents?",
      options: [
        "It's not really important",
        "So they can provide personalized, context-aware responses and remember user preferences",
        "Only to slow down processing",
        "To confuse users"
      ],
      correctAnswer: 1,
      explanation: "Memory enables personalization! The AI can remember your preferences, past conversations, and provide more relevant, contextual assistance!"
    },
    {
      question: "If you tell an AI 'I prefer morning meetings' on Monday, and ask 'Schedule a team sync' on Wednesday, what should it do?",
      options: [
        "Ask for your preference again",
        "Remember your preference and suggest morning time slots",
        "Schedule at a random time",
        "Refuse to schedule"
      ],
      correctAnswer: 1,
      explanation: "With long-term memory, the AI remembers preferences from earlier conversations and applies them to future requests!"
    }
  ],
  4: [
    {
      question: "What makes a good prompt?",
      options: [
        "Being vague and open-ended",
        "Being clear, specific, and providing context",
        "Using as few words as possible",
        "Being ambiguous"
      ],
      correctAnswer: 1,
      explanation: "Good prompts are clear, specific, and provide context - telling the AI exactly what you want, who it's for, and any constraints!"
    },
    {
      question: "Which is a better prompt?",
      options: [
        "Write about marketing",
        "Write a 500-word blog post about email marketing best practices for small businesses",
        "Marketing stuff",
        "Content"
      ],
      correctAnswer: 1,
      explanation: "The second prompt is specific (email marketing), defines length (500 words), format (blog post), and audience (small businesses)!"
    },
    {
      question: "Why should you be clear when prompting AI?",
      options: [
        "It doesn't matter",
        "Clear prompts help the AI understand exactly what you need and produce better results",
        "To waste time",
        "AI can read your mind anyway"
      ],
      correctAnswer: 1,
      explanation: "Clear, specific prompts eliminate ambiguity and help AI understand your exact requirements, leading to much better outputs!"
    }
  ],
  5: [
    {
      question: "What is the first step in AI Agent planning?",
      options: [
        "Execute immediately",
        "Understand and clarify the goal or task",
        "Give up if it's complex",
        "Use random tools"
      ],
      correctAnswer: 1,
      explanation: "First, the agent must understand what you're trying to accomplish - define the goal clearly before planning steps!"
    },
    {
      question: "If planning a market research report, what should an AI Agent do?",
      options: [
        "Write random information",
        "Break it down: identify competitors, gather data, analyze findings, create structured report",
        "Only do one small part",
        "Skip the planning phase"
      ],
      correctAnswer: 1,
      explanation: "Good planning means decomposing the large task into manageable steps that can be completed sequentially!"
    },
    {
      question: "Why is planning important for AI Agents?",
      options: [
        "It wastes processing time",
        "It enables agents to handle complex, multi-step tasks systematically and reliably",
        "It's not actually important",
        "Only simple tasks need planning"
      ],
      correctAnswer: 1,
      explanation: "Planning allows agents to tackle complex tasks by breaking them into manageable steps with clear objectives and tool usage!"
    }
  ],
  6: [
    {
      question: "What is a multi-agent system?",
      options: [
        "One agent doing everything",
        "Multiple specialized AI Agents working together collaboratively",
        "Agents competing against each other",
        "No coordination between agents"
      ],
      correctAnswer: 1,
      explanation: "Multi-agent systems are teams of specialized AI agents that collaborate, each handling tasks they're optimized for!"
    },
    {
      question: "Why use multiple agents instead of just one?",
      options: [
        "It's always less efficient",
        "Different agents can specialize in specific tasks, like a professional team",
        "To make things unnecessarily complicated",
        "One generalist agent is always better"
      ],
      correctAnswer: 1,
      explanation: "Specialization improves performance! Like a company with departments, each agent excels at specific tasks - research, writing, analysis, etc."
    },
    {
      question: "For creating a comprehensive business report, which agents might work together?",
      options: [
        "Only one agent does everything",
        "Research Agent (data gathering), Analysis Agent (insights), Writing Agent (report), QA Agent (review)",
        "No agents needed",
        "Agents that don't communicate"
      ],
      correctAnswer: 1,
      explanation: "Different specialized agents handle their expertise areas - research, analysis, writing, and quality assurance - producing higher quality results!"
    }
  ],
  7: [
    {
      question: "Why do we test AI Agents?",
      options: [
        "Testing is unnecessary",
        "To ensure accuracy, reliability, safety, and proper functionality",
        "To intentionally break them",
        "Just for show"
      ],
      correctAnswer: 1,
      explanation: "Testing ensures your AI Agent works correctly, handles edge cases, and produces accurate, safe results before deployment!"
    },
    {
      question: "What should you check when testing an AI Agent?",
      options: [
        "Nothing specific",
        "Response accuracy, tool selection, memory retention, error handling, and safety",
        "Only the visual interface",
        "Just run it once"
      ],
      correctAnswer: 1,
      explanation: "Comprehensive testing covers accuracy, appropriate tool usage, memory functionality, edge case handling, and safety protocols!"
    },
    {
      question: "If an AI gives incorrect results during testing, what should you do?",
      options: [
        "Ignore it and hope it improves",
        "Document the issue, analyze the root cause, and refine the agent",
        "Delete everything immediately",
        "Stop testing entirely"
      ],
      correctAnswer: 1,
      explanation: "Finding issues during testing is valuable! Document problems, understand why they occurred, and iteratively improve the agent!"
    }
  ],
  8: [
    {
      question: "What do AI Agents use to complete different tasks?",
      options: [
        "Magic or undefined processes",
        "Combination of tools (APIs, services), planning algorithms, and decision-making logic",
        "Random guessing",
        "Nothing systematic"
      ],
      correctAnswer: 1,
      explanation: "AI Agents combine tool access, planning capabilities, and decision-making logic to systematically complete complex tasks!"
    },
    {
      question: "Which helps AI Agents improve over time?",
      options: [
        "Forgetting all past interactions",
        "Memory systems that store context, preferences, and learned patterns",
        "Operating slower",
        "Ignoring feedback"
      ],
      correctAnswer: 1,
      explanation: "Memory allows agents to learn from interactions, remember preferences, and continuously improve their assistance quality!"
    },
    {
      question: "What makes you a proficient AI Agent Builder?",
      options: [
        "Never testing or iterating",
        "Understanding prompting, tool integration, memory systems, planning, multi-agent architectures, and testing",
        "Only knowing one concept",
        "Avoiding learning new techniques"
      ],
      correctAnswer: 1,
      explanation: "Expert AI builders understand the full stack: prompt engineering, tool integration, memory management, planning, collaboration, and quality assurance!"
    },
    {
      question: "How can multiple specialized agents outperform a single generalist agent?",
      options: [
        "They can't - one is always better",
        "Each agent optimizes for specific tasks, enabling better quality through specialization",
        "By competing and blocking each other",
        "Multiple agents always perform worse"
      ],
      correctAnswer: 1,
      explanation: "Specialization is powerful! Like expert teams, each agent excels at their domain, producing higher quality results than a generalist!"
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
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
          <h3 className="text-yellow-400 text-lg sm:text-xl md:text-2xl">Question {currentQuestion + 1} of {questions.length}</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            {difficulty === 'hard' && (
              <div className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg ${
                timeLeft <= 10 ? 'bg-red-500/30 animate-pulse border-2 border-red-500' : 'bg-gray-800/80 border border-gray-700'
              }`}>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <span className={`text-sm sm:text-base ${timeLeft <= 10 ? 'text-red-300' : 'text-yellow-400'}`}>{timeLeft}s</span>
              </div>
            )}
            <div className="text-yellow-400 bg-gray-800/80 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-700 text-sm sm:text-base">
              Score: {correctAnswers}/{questions.length}
            </div>
          </div>
        </div>
        
        {/* Difficulty Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
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
              className="bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 px-3 py-1 text-xs sm:text-sm border border-yellow-500/50"
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