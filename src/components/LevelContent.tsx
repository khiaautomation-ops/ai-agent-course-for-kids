import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, ChevronRight, Check } from 'lucide-react';
import { InteractiveActivity } from './activities/InteractiveActivity';

interface LevelContentProps {
  level: number;
}

export function LevelContent({ level }: LevelContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const [showActivity, setShowActivity] = useState(false);
  const [activityCompleted, setActivityCompleted] = useState(false);

  const activity = activities[level as keyof typeof activities];
  const slides = levelSlides[level as keyof typeof levelSlides] || [];
  const totalSlides = slides.length;

  const handleNext = () => {
    setCompletedSlides(new Set([...completedSlides, currentSlide]));
    
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (activity && !activityCompleted) {
      setShowActivity(true);
    }
  };

  const handleActivityComplete = () => {
    setActivityCompleted(true);
    setShowActivity(false);
  };

  if (showActivity && activity) {
    return (
      <InteractiveActivity
        level={level}
        activityData={activity}
        onComplete={handleActivityComplete}
      />
    );
  }

  const slide = slides[currentSlide];

  return (
    <div>
      {/* Progress Dots */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-6 sm:w-8 bg-yellow-400 shadow-lg shadow-yellow-500/50'
                : index < currentSlide || completedSlides.has(index)
                ? 'w-2 bg-green-400'
                : 'w-2 bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
        {activity && (
          <motion.div
            className={`h-2 rounded-full transition-all duration-300 ${
              activityCompleted ? 'w-2 bg-green-400' : 'w-2 bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              className="text-6xl sm:text-7xl md:text-8xl mb-3 sm:mb-4 inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {slide.emoji}
            </motion.div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 text-2xl sm:text-3xl md:text-4xl px-4">{slide.title}</h2>
          </div>

          {/* Content Card */}
          <Card className="bg-gray-800/80 border-gray-700 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            {slide.interactive ? (
              <SlideContent slide={slide} />
            ) : (
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-center px-2">
                {slide.content}
              </p>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="text-gray-400 text-sm sm:text-base">
              Slide {currentSlide + 1} of {totalSlides}
            </div>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-6 py-3 shadow-lg shadow-yellow-500/30 w-full sm:w-auto"
            >
              {currentSlide < totalSlides - 1 ? (
                <>
                  Next <ChevronRight className="w-5 h-5 ml-1" />
                </>
              ) : activity && !activityCompleted ? (
                <>
                  Try Activity! <Sparkles className="w-5 h-5 ml-1" />
                </>
              ) : (
                <>
                  Complete! <Check className="w-5 h-5 ml-1" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Activity Completed Banner */}
      {activityCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-center"
        >
          <Check className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-white" />
          <p className="text-white text-lg sm:text-xl">🎉 Activity Completed!</p>
        </motion.div>
      )}
    </div>
  );
}

function SlideContent({ slide }: { slide: any }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  if (slide.type === 'reveal') {
    return (
      <div className="space-y-4">
        <p className="text-gray-200 text-xl mb-6 text-center">{slide.question}</p>
        <div className="grid grid-cols-1 gap-4">
          {slide.items.map((item: any, index: number) => (
            <motion.button
              key={index}
              onClick={() =>
                setRevealed(new Set([...revealed, index]))
              }
              className={`p-6 rounded-xl transition-all duration-300 ${
                revealed.has(index)
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/30'
                  : 'bg-gray-700/50 hover:bg-gray-600/50 border-2 border-gray-600'
              } text-white`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1 text-left">
                  <p className="text-xl mb-2">{item.title}</p>
                  <AnimatePresence>
                    {revealed.has(index) && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-black/90"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

const levelSlides = {
  1: [
    {
      emoji: '🤖',
      title: 'What is an AI Agent?',
      content: "Welcome! Ever used Siri, Alexa, or ChatGPT? Those are AI Agents! Let's learn how they work and how you can build your own! 🌟",
    },
    {
      emoji: '💼',
      title: 'Think About It...',
      content: 'An AI Agent is like a smart digital assistant that can think, make decisions, and complete tasks for you - whether it\'s answering questions, managing your calendar, or automating workflows!',
    },
    {
      emoji: '✨',
      title: 'AI Agent Superpowers',
      type: 'reveal',
      question: 'Click each power to discover what AI Agents can do!',
      interactive: true,
      items: [
        { icon: '💬', title: 'Understand & Respond', description: 'Process natural language and provide intelligent answers to complex questions!' },
        { icon: '🔧', title: 'Use Digital Tools', description: 'Access APIs, databases, search engines, and other services to get things done!' },
        { icon: '🧠', title: 'Remember Context', description: 'Maintain conversation history and user preferences across interactions!' },
        { icon: '🎯', title: 'Make Decisions', description: 'Analyze situations and choose the best course of action autonomously!' },
      ],
    },
    {
      emoji: '💡',
      title: 'See It In Action!',
      content: 'Example: "Schedule a meeting with the team next Tuesday and send everyone the agenda" - The AI Agent checks calendars, finds availability, creates the meeting, AND emails the agenda! 🎉',
    },
  ],
  2: [
    {
      emoji: '🔧',
      title: 'Tools & Actions',
      content: 'Just like you use different apps for different tasks, AI Agents have a toolbox of capabilities they can access! Let\'s explore! 🛠️',
    },
    {
      emoji: '🎒',
      title: 'The AI Agent Toolbox',
      type: 'reveal',
      question: 'Click each tool to see what it does!',
      interactive: true,
      items: [
        { icon: '🔍', title: 'Web Search', description: 'Query search engines to find up-to-date information from the internet!' },
        { icon: '📧', title: 'Email Integration', description: 'Send, read, and manage emails automatically!' },
        { icon: '🧮', title: 'Calculator & Math', description: 'Perform calculations, data analysis, and mathematical operations!' },
        { icon: '📅', title: 'Calendar API', description: 'Check availability, schedule events, and manage appointments!' },
      ],
    },
    {
      emoji: '🎯',
      title: 'Smart Tool Selection',
      type: 'click-example',
      prompt: 'Click the examples to see if the AI picks the right tool!',
      interactive: true,
      examples: [
        { icon: '📧', text: 'Send a follow-up email to the client', correct: true, feedback: '✓ Correct! Uses Email Tool!' },
        { icon: '🧮', text: 'Calculate the ROI on this investment', correct: true, feedback: '✓ Correct! Uses Calculator!' },
        { icon: '🔍', text: 'Find the latest industry trends', correct: true, feedback: '✓ Correct! Uses Web Search!' },
        { icon: '📅', text: 'When is my next dentist appointment?', correct: true, feedback: '✓ Correct! Uses Calendar!' },
      ],
    },
  ],
  3: [
    {
      emoji: '🧠',
      title: 'Memory & Learning',
      content: 'Imagine if your assistant forgot everything after each conversation! AI Agents need memory to provide personalized, context-aware assistance! 💭',
    },
    {
      emoji: '💾',
      title: 'Two Types of Memory',
      type: 'reveal',
      question: 'Discover the two memory types!',
      interactive: true,
      items: [
        { icon: '💭', title: 'Short-term Memory', description: 'Remembers the current conversation context - what you just discussed!' },
        { icon: '📚', title: 'Long-term Memory', description: 'Stores user preferences, past interactions, and learned patterns over time!' },
      ],
    },
    {
      emoji: '🎨',
      title: 'Try It Out!',
      content: 'If you tell an AI Agent "I prefer meetings before noon" on Monday, it can remember that preference when scheduling all your future meetings! Convenient, right? 🌟',
    },
  ],
  4: [
    {
      emoji: '💬',
      title: 'Prompt Engineering',
      content: 'A prompt is how you communicate with an AI Agent. Better prompts = better results! It\'s the key skill for working with AI! ✨',
    },
    {
      emoji: '🎯',
      title: 'Good vs Bad Prompts',
      type: 'click-example',
      prompt: 'Click to see which prompts work better!',
      interactive: true,
      examples: [
        { icon: '❌', text: 'Write something about marketing', correct: false, feedback: 'Too vague! The AI doesn\'t know what aspect or format you want.' },
        { icon: '✅', text: 'Write a 500-word blog post about email marketing best practices for small businesses', correct: true, feedback: 'Perfect! Clear topic, length, and target audience!' },
        { icon: '❌', text: 'Help with data', correct: false, feedback: 'What data? What kind of help? Be specific!' },
        { icon: '✅', text: 'Analyze this sales data CSV and identify the top 3 trends', correct: true, feedback: 'Excellent! Clear task with specific deliverable!' },
      ],
    },
    {
      emoji: '🌟',
      title: 'The Secret Recipe',
      content: 'Great prompts are: Clear (state your goal) ✓ Specific (provide context & details) ✓ Structured (format your request) ✓',
    },
  ],
  5: [
    {
      emoji: '📋',
      title: 'Agent Planning',
      content: 'When you have a complex task, you break it into steps, right? AI Agents do the same! This is called agentic planning! 🎯',
    },
    {
      emoji: '🎂',
      title: 'Planning a Market Research Project',
      type: 'reveal',
      question: 'Click each step to see the agent\'s plan!',
      interactive: true,
      items: [
        { icon: '1️⃣', title: 'Understand the Goal', description: 'What\'s the objective? → Conduct market research on competitors!' },
        { icon: '2️⃣', title: 'Break into Steps', description: 'List competitors, gather data, analyze strengths/weaknesses, create report!' },
        { icon: '3️⃣', title: 'Choose Tools', description: 'Use Web Search for data, Calculator for metrics, Email for final report!' },
        { icon: '4️⃣', title: 'Execute!', description: 'Complete each step systematically!' },
        { icon: '5️⃣', title: 'Verify Success', description: 'Is the research complete and accurate? Done! 🎉' },
      ],
    },
  ],
  6: [
    {
      emoji: '👥',
      title: 'Multi-Agent Systems',
      content: 'What\'s better than one AI Agent? A TEAM of specialized AI Agents working together! Like a well-coordinated workforce! 🦸',
    },
    {
      emoji: '🦸‍♀️',
      title: 'Meet the Team',
      type: 'reveal',
      question: 'Click each agent to meet the team!',
      interactive: true,
      items: [
        { icon: '📚', title: 'Research Agent', description: 'Specializes in gathering and analyzing information from multiple sources!' },
        { icon: '✍️', title: 'Writing Agent', description: 'Expert at creating compelling content, reports, and documentation!' },
        { icon: '🎨', title: 'Design Agent', description: 'Focuses on creating visual content, layouts, and presentations!' },
        { icon: '✅', title: 'QA Agent', description: 'Reviews work for accuracy, consistency, and quality!' },
      ],
    },
    {
      emoji: '🌟',
      title: 'Teamwork Magic',
      content: 'Together they can tackle complex projects! Research → Write → Design → Review = Professional Results! 🎉',
    },
  ],
  7: [
    {
      emoji: '🧪',
      title: 'Testing Your Agent',
      content: 'Testing ensures your AI Agent works correctly and safely! It\'s quality assurance for AI systems! 🛡️',
    },
    {
      emoji: '✅',
      title: 'What to Test',
      type: 'reveal',
      question: 'Click to discover what to check!',
      interactive: true,
      items: [
        { icon: '❓', title: 'Response Quality', description: 'Ask various questions - are answers accurate and helpful?' },
        { icon: '🎭', title: 'Edge Cases', description: 'Test with unusual inputs - how does it handle unexpected situations?' },
        { icon: '🔧', title: 'Tool Usage', description: 'Does it select and use the correct tools for each task?' },
        { icon: '🧠', title: 'Memory Check', description: 'Does it correctly remember and recall information?' },
        { icon: '🛡️', title: 'Safety & Ethics', description: 'Ensure it follows guidelines and handles sensitive data properly!' },
      ],
    },
  ],
  8: [
    {
      emoji: '🏆',
      title: 'Final Challenge',
      content: 'You\'ve mastered the fundamentals! You\'re ready to build real AI Agents! 🌟',
    },
    {
      emoji: '🎓',
      title: 'Everything You Learned',
      type: 'reveal',
      question: 'Review your skills!',
      interactive: true,
      items: [
        { icon: '🤖', title: 'AI Agents', description: 'What they are and how they process information!' },
        { icon: '🔧', title: 'Tools', description: 'How agents access APIs and external services!' },
        { icon: '🧠', title: 'Memory', description: 'Short-term and long-term context management!' },
        { icon: '💬', title: 'Prompts', description: 'How to write effective prompts for best results!' },
        { icon: '📋', title: 'Planning', description: 'How agents decompose and solve complex tasks!' },
        { icon: '👥', title: 'Multi-Agent Systems', description: 'How multiple agents collaborate!' },
        { icon: '🧪', title: 'Testing', description: 'How to validate and improve agent performance!' },
      ],
    },
    {
      emoji: '💪',
      title: 'You\'re Ready!',
      content: 'Time to prove you\'re an AI Agent Builder! Apply your knowledge to the final challenge! 🚀',
    },
  ],
};

const activities = {
  1: {
    type: 'matching',
    title: 'Match the AI Agent Ability!',
    description: 'Drag each task to the correct AI Agent ability!',
    items: [
      { id: 1, text: 'Checking the weather', type: 'left', matchId: 'tools' },
      { id: 2, text: 'Remembering your name', type: 'left', matchId: 'memory' },
      { id: 3, text: 'Answering questions', type: 'left', matchId: 'think' },
      { id: 4, text: 'Using a calculator', type: 'left', matchId: 'tools' },
    ],
    targets: [
      { id: 'think', label: '💬 Answer Questions', color: 'from-blue-400 to-blue-600' },
      { id: 'tools', label: '🔧 Use Tools', color: 'from-green-400 to-green-600' },
      { id: 'memory', label: '🧠 Remember Things', color: 'from-purple-400 to-purple-600' },
    ],
  },
  2: {
    type: 'tool-picker',
    title: 'Pick the Right Tool!',
    description: 'Read each request and select which tool the AI Agent should use!',
  },
  3: {
    type: 'memory-game',
    title: 'Memory Challenge!',
    description: 'Test your memory like an AI Agent!',
  },
  4: {
    type: 'prompt-builder',
    title: 'Build a Great Prompt!',
    description: 'Drag the pieces to create an awesome prompt!',
  },
  5: {
    type: 'planning-sequence',
    title: 'Put the Steps in Order!',
    description: 'Arrange the planning steps in the correct order!',
  },
  6: {
    type: 'team-builder',
    title: 'Build Your Agent Team!',
    description: 'Choose the right agents for the job!',
  },
  7: {
    type: 'test-lab',
    title: 'Test Lab!',
    description: 'Test an AI Agent and find any problems!',
  },
  8: {
    type: 'final-challenge',
    title: 'Build Your Own Agent!',
    description: 'Use everything you learned to build an AI Agent!',
  },
};