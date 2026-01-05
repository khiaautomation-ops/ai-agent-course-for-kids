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
      content: "Hey! Ever played with a smart NPC in a game or talked to Siri or Alexa? Those are AI Agents! Let's learn how they work! 🌟",
    },
    {
      emoji: '🎮',
      title: 'Think About It...',
      content: 'An AI Agent is like a smart game character that helps you! It can answer questions, do tasks, and even learn from you - like a helpful sidekick in your favorite video game!',
    },
    {
      emoji: '✨',
      title: 'AI Agent Superpowers',
      type: 'reveal',
      question: 'Click each power to discover what AI Agents can do!',
      interactive: true,
      items: [
        { icon: '💬', title: 'Chat & Help You', description: 'Like talking to a smart friend who helps with homework or finding cool stuff!' },
        { icon: '🔧', title: 'Use Digital Tools', description: 'Search Google, do math, check calendars - all the helpful apps!' },
        { icon: '🧠', title: 'Remember You', description: 'Knows your favorite game, what you talked about last time!' },
        { icon: '🎯', title: 'Make Smart Choices', description: 'Figures out the best way to help you, like a good teammate!' },
      ],
    },
    {
      emoji: '🎮',
      title: 'See It In Action!',
      content: 'Example: "Can you help me with my 5x7 math homework AND explain how it works?" - The AI does the math AND teaches you! Cool, right? 🎉',
    },
  ],
  2: [
    {
      emoji: '🔧',
      title: 'Tools & Actions',
      content: 'In Minecraft you need different tools for different jobs! AI Agents are the same - they have digital tools! Let\'s check them out! 🛠️',
    },
    {
      emoji: '🎒',
      title: 'The AI Agent Toolbox',
      type: 'reveal',
      question: 'Click each tool to see what it does!',
      interactive: true,
      items: [
        { icon: '🔍', title: 'Search Tool', description: 'Finds anything on the internet - game guides, videos, cool facts!' },
        { icon: '📧', title: 'Message Tool', description: 'Sends emails or messages to friends and family!' },
        { icon: '🧮', title: 'Calculator', description: 'Solves math problems instantly - great for homework!' },
        { icon: '📅', title: 'Calendar', description: 'Checks when your soccer practice is or when games come out!' },
      ],
    },
    {
      emoji: '🎯',
      title: 'Smart Tool Selection',
      type: 'click-example',
      prompt: 'Click the examples to see if the AI picks the right tool!',
      interactive: true,
      examples: [
        { icon: '📧', text: 'Text my friend I can\'t play Roblox today', correct: true, feedback: '✓ Correct! Uses Message Tool!' },
        { icon: '🧮', text: 'If I have 50 Robux and buy 3 items for 12 each, how much left?', correct: true, feedback: '✓ Correct! Uses Calculator!' },
        { icon: '🔍', text: 'Find the best Minecraft building tutorials', correct: true, feedback: '✓ Correct! Uses Search Tool!' },
        { icon: '📅', text: 'When is my basketball game this week?', correct: true, feedback: '✓ Correct! Uses Calendar!' },
      ],
    },
  ],
  3: [
    {
      emoji: '🧠',
      title: 'Memory & Learning',
      content: 'Imagine playing a game where NPCs forget you every time you talk to them! Annoying, right? AI Agents have memory so they remember you! 💭',
    },
    {
      emoji: '💾',
      title: 'Two Types of Memory',
      type: 'reveal',
      question: 'Discover the two memory types!',
      interactive: true,
      items: [
        { icon: '💭', title: 'Short-term Memory', description: 'Remembers what you\'re talking about RIGHT NOW - like your current game level!' },
        { icon: '📚', title: 'Long-term Memory', description: 'Saves stuff forever - like your favorite games, pets\' names, or what you learned!' },
      ],
    },
    {
      emoji: '🐶',
      title: 'Try It Out!',
      content: 'Tell an AI "My dog\'s name is Max and he loves tennis balls" on Monday. On Friday, ask "What does Max like?" and it remembers! Just like a real friend! 🌟',
    },
  ],
  4: [
    {
      emoji: '💬',
      title: 'Prompt Engineering',
      content: 'A prompt is how you talk to AI! Think of it like giving your teammate clear instructions in a multiplayer game. Better instructions = better results! ✨',
    },
    {
      emoji: '🎯',
      title: 'Good vs Bad Prompts',
      type: 'click-example',
      prompt: 'Click to see which prompts work better!',
      interactive: true,
      examples: [
        { icon: '❌', text: 'Tell me stuff about games', correct: false, feedback: 'Too vague! WHICH games? What about them?' },
        { icon: '✅', text: 'Explain how to build a Minecraft house with easy steps', correct: true, feedback: 'Perfect! Clear and specific!' },
        { icon: '❌', text: 'Help with homework', correct: false, feedback: 'What subject? What problem? Be specific!' },
        { icon: '✅', text: 'Explain fractions using pizza slices for a 5th grader', correct: true, feedback: 'Awesome! Says exactly what you need!' },
      ],
    },
    {
      emoji: '🌟',
      title: 'The Secret Recipe',
      content: 'Good prompts are: Clear (say what you want!) ✓ Specific (give details!) ✓ Friendly (say please!) ✓',
    },
  ],
  5: [
    {
      emoji: '📋',
      title: 'Agent Planning',
      content: 'Planning a big Minecraft build? You break it into steps, right? AI Agents do the same for any big task! Let\'s see how! 🎯',
    },
    {
      emoji: '🎂',
      title: 'Planning Your Gaming Tournament',
      type: 'reveal',
      question: 'Click each step to see the agent\'s plan!',
      interactive: true,
      items: [
        { icon: '1️⃣', title: 'Understand the Goal', description: 'What do I need? → Organize a gaming tournament with friends!' },
        { icon: '2️⃣', title: 'Break into Steps', description: 'Pick games, invite friends, set time, prepare snacks!' },
        { icon: '3️⃣', title: 'Choose Tools', description: 'Use Message app, Calendar, and Search for game rules!' },
        { icon: '4️⃣', title: 'Execute!', description: 'Do each step - message sent, calendar updated!' },
        { icon: '5️⃣', title: 'Check Success', description: 'Everyone confirmed? Snacks ready? Let\'s game! 🎮' },
      ],
    },
  ],
  6: [
    {
      emoji: '👥',
      title: 'Multi-Agent Systems',
      content: 'Playing solo is fun, but a TEAM is stronger! AI Agents can work together too - like your squad in Fortnite or Among Us! 🦸',
    },
    {
      emoji: '🦸‍♀️',
      title: 'Meet the Team',
      type: 'reveal',
      question: 'Click each agent to meet the team!',
      interactive: true,
      items: [
        { icon: '📚', title: 'Research Agent', description: 'The Scout! Finds info super fast - game guides, facts, videos!' },
        { icon: '✍️', title: 'Writing Agent', description: 'The Communicator! Writes stories, emails, and messages!' },
        { icon: '🎨', title: 'Creative Agent', description: 'The Artist! Makes cool designs and creative ideas!' },
        { icon: '✅', title: 'Quality Agent', description: 'The Checker! Makes sure everything is perfect before you see it!' },
      ],
    },
    {
      emoji: '🌟',
      title: 'Teamwork Magic',
      content: 'Together they\'re UNSTOPPABLE! Like your best gaming squad - everyone has a role and they work together! Research → Write → Design → Check = Epic Win! 🎉',
    },
  ],
  7: [
    {
      emoji: '🧪',
      title: 'Testing Your Agent',
      content: 'Testing is like practicing before a big game! You check if your AI Agent works right before using it for real stuff! 🛡️',
    },
    {
      emoji: '✅',
      title: 'What to Test',
      type: 'reveal',
      question: 'Click to discover what to check!',
      interactive: true,
      items: [
        { icon: '❓', title: 'Try Different Questions', description: 'Ask it about games, homework, pets - see if it helps correctly!' },
        { icon: '🎭', title: 'Tricky Situations', description: 'Give it hard problems - does it still work or get confused?' },
        { icon: '🔧', title: 'Check Tool Use', description: 'Does it pick the calculator for math and search for facts?' },
        { icon: '🧠', title: 'Test Memory', description: 'Tell it your favorite game, then ask later - did it remember?' },
        { icon: '🛡️', title: 'Safety Check', description: 'Make sure it only does helpful, safe things!' },
      ],
    },
  ],
  8: [
    {
      emoji: '🏆',
      title: 'Final Challenge',
      content: 'You\'ve leveled up SO MUCH! You\'re ready to become a real AI Agent Builder! Time for the final boss! 🌟',
    },
    {
      emoji: '🎓',
      title: 'Everything You Learned',
      type: 'reveal',
      question: 'Review your amazing skills!',
      interactive: true,
      items: [
        { icon: '🤖', title: 'AI Agents', description: 'What they are - like smart game NPCs that help in real life!' },
        { icon: '🔧', title: 'Tools', description: 'How agents use tools - search, calculate, message!' },
        { icon: '🧠', title: 'Memory', description: 'How they remember you - short and long term!' },
        { icon: '💬', title: 'Prompts', description: 'How to write clear requests - be specific!' },
        { icon: '📋', title: 'Planning', description: 'How agents break big tasks into steps!' },
        { icon: '👥', title: 'Teamwork', description: 'How multiple agents work as a squad!' },
        { icon: '🧪', title: 'Testing', description: 'How to make sure agents work great!' },
      ],
    },
    {
      emoji: '💪',
      title: 'You\'re Ready!',
      content: 'Time to prove you\'re a true AI Agent Builder! Show what you\'ve learned! You got this! 🚀',
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