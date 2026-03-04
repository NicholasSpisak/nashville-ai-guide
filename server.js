const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ── Session Data ──────────────────────────────────────────────────
const SESSIONS = [
  {
    num: 1, title: "Business Discovery Call", stage: "AUDIT", day: "Day 1",
    duration: "60 min", difficulty: "Beginner",
    tagline: "Before we build anything, we need to understand your business. This call creates the blueprint.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "A full transcript - your business blueprint for everything we build" },
      { type: "outcome", text: "A map of your time leaks, revenue gaps, and AI-ready workflows" },
      { type: "outcome", text: "Your top 3 priorities for the rest of the event" },
      { type: "heading", text: "Before We Start" },
      { type: "body", text: "This is the most important session of the event. Everything we build over the next two days sits on top of what comes out of this call." },
      { type: "body", text: "Be honest. Be specific. Think about what actually eats your time - not what sounds impressive." },
      { type: "tip", label: "KEY INSIGHT", text: "The AI voice agent asks the questions. You just talk. Answer like you're talking to a trusted advisor. The more specific you are, the better your blueprint." },
      { type: "heading", text: "Part 1: Connect to the Voice Agent" },
      { type: "step", num: 1, text: "Put on your headphones (provided if needed)" },
      { type: "step", num: 2, text: "Open the discovery call link on your laptop (displayed on screen)" },
      { type: "step", num: 3, text: "Click 'Start Call' and allow microphone access when prompted" },
      { type: "step", num: 4, text: "Introduce yourself and your business when the agent greets you" },
      { type: "heading", text: "Part 2: The Discovery Questions" },
      { type: "body", text: "The agent guides you through these areas. Be ready to talk about:" },
      { type: "subheading", text: "Where Your Time Goes" },
      { type: "bullet", text: "What does your business do? Who's your ideal customer?" },
      { type: "bullet", text: "What's your team size and structure?" },
      { type: "bullet", text: "What tools do you use daily?" },
      { type: "subheading", text: "Your Time Leaks" },
      { type: "bullet", text: "Where are you losing hours every week on repetitive tasks?" },
      { type: "bullet", text: "What manual processes should be automated by now?" },
      { type: "bullet", text: "Where is revenue slipping through the cracks? (follow-ups, lead response time, churn)" },
      { type: "subheading", text: "Customer Experience Gaps" },
      { type: "bullet", text: "Where could your product or service deliver a better experience?" },
      { type: "bullet", text: "What do customers complain about most?" },
      { type: "bullet", text: "What would customers love if you had the bandwidth?" },
      { type: "subheading", text: "Content & Communication" },
      { type: "bullet", text: "How do you handle content creation, social media, email?" },
      { type: "bullet", text: "What communication bottlenecks exist?" },
      { type: "subheading", text: "Decisions You Can't Make Yet" },
      { type: "bullet", text: "What data do you wish you had but don't?" },
      { type: "bullet", text: "What reports would change how you run the business?" },
      { type: "heading", text: "Part 3: Review Your Transcript" },
      { type: "step", num: 1, text: "When the call ends, you'll get your full transcript (email or printed)" },
      { type: "step", num: 2, text: "Read through it. Highlight what resonates." },
      { type: "step", num: 3, text: "Mark your TOP 3 priorities for the rest of the event:" },
      { type: "fill", label: "Priority 1" },
      { type: "fill", label: "Priority 2" },
      { type: "fill", label: "Priority 3" },
      { type: "tip", label: "KEY INSIGHT", text: "Keep this transcript accessible. We reference it in Sessions 3, 5, 6, 9, and 12. It's the foundation for every system you build." },
      { type: "heading", text: "What's Next" },
      { type: "body", text: "You have your blueprint. Every session from here builds on this. Next up - we install the tools that bring it to life." }
    ]
  },
  {
    num: 2, title: "Installing Claude Desktop & the Chrome Extension", stage: "OPTIMIZE", day: "Day 1",
    duration: "45 min", difficulty: "Beginner",
    tagline: "Hands on keyboards. Everyone leaves with a working environment.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "Claude Desktop installed and running on your machine" },
      { type: "outcome", text: "Chrome Extension installed, pinned, and working" },
      { type: "outcome", text: "Your first successful conversation with both tools" },
      { type: "heading", text: "Why These Two Tools" },
      { type: "bullet", text: "Claude Desktop = your AI workspace. Projects, Connectors, Skills, Cowork." },
      { type: "bullet", text: "Chrome Extension = AI that sees what you see and acts on it in your browser." },
      { type: "bullet", text: "Together, they're the foundation of your AI operating system." },
      { type: "heading", text: "Part 1: Install Claude Desktop" },
      { type: "step", num: 1, text: "Open your browser. Go to claude.ai/download" },
      { type: "step", num: 2, text: "Click the download for your OS (macOS or Windows)" },
      { type: "step", num: 3, text: "Install it:" },
      { type: "bullet", text: "Mac: Drag Claude to your Applications folder" },
      { type: "bullet", text: "Windows: Run the installer, follow the prompts" },
      { type: "step", num: 4, text: "Launch Claude Desktop:" },
      { type: "bullet", text: "Mac: Applications folder (or Cmd+Space, type 'Claude')" },
      { type: "bullet", text: "Windows: Start Menu, search 'Claude'" },
      { type: "step", num: 5, text: "Sign in with your Anthropic account (the one with your Pro or Max plan)" },
      { type: "subheading", text: "Quick Tour" },
      { type: "bullet", text: "Chat tab - standard conversation (top left)" },
      { type: "bullet", text: "Cowork tab - agentic task execution (Day 2)" },
      { type: "bullet", text: "Projects - persistent workspaces (left sidebar)" },
      { type: "bullet", text: "Settings > Extensions - integrations we'll add later" },
      { type: "bullet", text: "Settings > Connectors - third-party tool connections" },
      { type: "subheading", text: "Smoke Test" },
      { type: "code", text: "Hello! Tell me one interesting fact\nabout Nashville." },
      { type: "check", text: "I got a response from Claude Desktop" },
      { type: "heading", text: "Part 2: Install Claude Chrome Extension" },
      { type: "step", num: 1, text: "Open Google Chrome" },
      { type: "step", num: 2, text: "Go to Chrome Web Store, search 'Claude' by Anthropic" },
      { type: "step", num: 3, text: "Click 'Add to Chrome'" },
      { type: "step", num: 4, text: "Click 'Add Extension' in the popup" },
      { type: "step", num: 5, text: "Sign in with your Claude account" },
      { type: "step", num: 6, text: "Pin it: puzzle piece icon (top right) > thumbtack next to Claude" },
      { type: "step", num: 7, text: "Grant permissions when prompted" },
      { type: "subheading", text: "Smoke Test" },
      { type: "step", num: 1, text: "Go to any news website" },
      { type: "step", num: 2, text: "Open the Claude side panel (click the Claude icon)" },
      { type: "step", num: 3, text: "Type: 'Summarize what's on this page'" },
      { type: "check", text: "I got a summary from Claude in the side panel" },
      { type: "heading", text: "Troubleshooting" },
      { type: "bullet", text: "Can't sign in: Verify you're on a paid plan (Pro or Max)" },
      { type: "bullet", text: "Extension not showing: Check chrome://extensions, make sure it's enabled" },
      { type: "bullet", text: "Desktop won't launch (Windows): Enable Virtual Machine Platform in Windows Features" },
      { type: "bullet", text: "'Out of usage' message: Check your plan tier in Claude settings" },
      { type: "tip", label: "NOTE", text: "Stuck? Raise your hand. Our support team is circulating." }
    ]
  },
  {
    num: 3, title: "Claude Projects", stage: "OPTIMIZE", day: "Day 1",
    duration: "60 min", difficulty: "Beginner-Intermediate",
    tagline: "Claude stops being a chatbot and starts being a business tool.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "A Claude Project configured for YOUR business" },
      { type: "outcome", text: "Your knowledge base uploaded - SOPs, brand docs, FAQs" },
      { type: "outcome", text: "Custom instructions that make Claude sound like a team member" },
      { type: "heading", text: "Why This Matters" },
      { type: "body", text: "Without Projects, every Claude conversation starts from zero. With Projects, Claude remembers your context, tone, rules, and data across every conversation." },
      { type: "bold", text: "Projects turn Claude from a chatbot into a business tool. This is the single biggest quality lever you have." },
      { type: "heading", text: "Step 1: Create Your Business Project" },
      { type: "step", num: 1, text: "Open Claude Desktop" },
      { type: "step", num: 2, text: "Click 'Projects' in the left sidebar" },
      { type: "step", num: 3, text: "Click 'New Project'" },
      { type: "step", num: 4, text: "Name it: '[Your Business Name] - HQ'" },
      { type: "check", text: "Project created and open" },
      { type: "heading", text: "Step 2: Upload Your Knowledge Base" },
      { type: "body", text: "Upload the documents that represent your business. Claude references these in every conversation inside this Project." },
      { type: "step", num: 1, text: "Click the knowledge/files area in Project settings" },
      { type: "step", num: 2, text: "Upload your discovery transcript from Session 1" },
      { type: "step", num: 3, text: "Upload 2-3 business documents (SOPs, brand guidelines, FAQs)" },
      { type: "tip", label: "QUICK WIN", text: "Plain text (.txt) and Markdown (.md) files parse about 3x better than PDFs. If you can, convert key docs to plain text before uploading." },
      { type: "check", text: "Discovery transcript uploaded" },
      { type: "check", text: "2-3 business documents uploaded" },
      { type: "heading", text: "Step 3: Write Your Custom Instructions" },
      { type: "body", text: "This is where the magic happens. Custom instructions tell Claude WHO it is, WHAT it does, and HOW it behaves for your business." },
      { type: "code", text: "## Role\nYou are a [role] for [Business Name].\nYou specialize in [domain].\n\n## Context\n[Business Name] is a [type of business] that\nserves [target customer].\nOur core offering is [product/service].\nTeam of [size] based in [location].\n\n## Voice & Tone\n- [professional/casual/friendly] tone\n- Use language our customers use\n- Never use: [terms to avoid]\n\n## Rules\n- Always check the knowledge base first\n- When uncertain, say so - never guess\n- Format as [bullets/paragraphs/tables]\n- Top priorities: [1], [2], [3]" },
      { type: "check", text: "Custom instructions written and saved" },
      { type: "heading", text: "Step 4: Test Your Project" },
      { type: "subheading", text: "Brand Voice Test" },
      { type: "code", text: "Draft a short email to a customer\nwho just signed up for our service." },
      { type: "check", text: "Sounds like my business (not generic)" },
      { type: "subheading", text: "Knowledge Test" },
      { type: "code", text: "What are our top 3 pain points\nfrom the discovery call?" },
      { type: "check", text: "Claude references my transcript" },
      { type: "subheading", text: "Honesty Test" },
      { type: "code", text: "What's our policy on [something\nNOT in your documents]?" },
      { type: "check", text: "Claude says it doesn't have that info" },
      { type: "tip", label: "KEY INSIGHT", text: "If any test misses, refine your instructions. More specific = better output. This is worth the time." }
    ]
  },
  {
    num: 4, title: "Claude Connectors", stage: "OPTIMIZE", day: "Day 1",
    duration: "45 min", difficulty: "Intermediate",
    tagline: "Plug Claude into the tools you already use. Now it reads your actual business data.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "At least 2 connectors working - Claude reading your real data" },
      { type: "outcome", text: "Claude acting on your actual Google Drive, Gmail, Slack, or Notion" },
      { type: "outcome", text: "A multi-tool workflow that pulls from multiple data sources at once" },
      { type: "heading", text: "What Connectors Do" },
      { type: "bullet", text: "Bridge Claude to the tools you already use (via Model Context Protocol)" },
      { type: "bullet", text: "Claude gets read/write access to your actual business data" },
      { type: "bullet", text: "Authentication via OAuth - your existing permissions apply" },
      { type: "bullet", text: "No extra cost. 50+ integrations available." },
      { type: "heading", text: "Step 1: Open the Connectors Panel" },
      { type: "step", num: 1, text: "Open Claude Desktop" },
      { type: "step", num: 2, text: "Click the '+' button on the chat box" },
      { type: "step", num: 3, text: "Select 'Connectors'" },
      { type: "step", num: 4, text: "Browse what's available" },
      { type: "heading", text: "Step 2: Connect Google Drive" },
      { type: "step", num: 1, text: "Find 'Google Drive' in the list, click it" },
      { type: "step", num: 2, text: "Click 'Connect' and authenticate via Google" },
      { type: "step", num: 3, text: "Grant permissions" },
      { type: "step", num: 4, text: "Test it:" },
      { type: "code", text: "Search my Google Drive for documents\nabout [a topic from your discovery call]." },
      { type: "check", text: "Google Drive connector working" },
      { type: "heading", text: "Step 3: Connect a Second Tool" },
      { type: "body", text: "Pick what's most relevant to your business:" },
      { type: "subheading", text: "Option A: Gmail" },
      { type: "step", num: 1, text: "Gmail connector > Authenticate via Google" },
      { type: "step", num: 2, text: "Test: 'Show me recent emails about [topic]'" },
      { type: "check", text: "Gmail working" },
      { type: "subheading", text: "Option B: Google Calendar" },
      { type: "step", num: 1, text: "Calendar connector > Authenticate via Google" },
      { type: "step", num: 2, text: "Test: 'What's my schedule this week?'" },
      { type: "check", text: "Calendar working" },
      { type: "subheading", text: "Option C: Slack" },
      { type: "step", num: 1, text: "Slack connector > Authenticate via Slack" },
      { type: "step", num: 2, text: "Test: 'Search Slack for conversations about [topic]'" },
      { type: "check", text: "Slack working" },
      { type: "subheading", text: "Option D: Notion" },
      { type: "step", num: 1, text: "Notion connector > Authenticate via Notion" },
      { type: "step", num: 2, text: "Test: 'Find my Notion pages about [topic]'" },
      { type: "check", text: "Notion working" },
      { type: "heading", text: "Step 4: Try a Multi-Connector Workflow" },
      { type: "body", text: "Now use them together. This is where it clicks:" },
      { type: "code", text: "Help me prepare for my next meeting.\nCheck my calendar, find relevant emails,\nand pull related docs from Drive." },
      { type: "check", text: "Claude pulled from multiple sources in one response" },
      { type: "tip", label: "NOTE", text: "Claude only accesses what your account permissions allow. Connector data is processed per-conversation - not stored permanently by Anthropic." }
    ]
  },
  {
    num: 5, title: "Build Your First Custom GPT", stage: "OPTIMIZE", day: "Day 1",
    duration: "60 min", difficulty: "Beginner-Intermediate",
    tagline: "One GPT, one job. A specialized AI tool you can share with your entire team.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "A working custom GPT for a specific business use case" },
      { type: "outcome", text: "Knowledge files uploaded and optimized for retrieval" },
      { type: "outcome", text: "Clear understanding of GPT privacy and data handling" },
      { type: "heading", text: "Why Both Claude AND ChatGPT" },
      { type: "body", text: "Claude Projects = your AI workspace. Custom GPTs = specialized single-purpose tools you can share with your team, clients, or the public." },
      { type: "bold", text: "Having both platforms = flexibility and redundancy. Value over volume - but two well-chosen tools beats one." },
      { type: "heading", text: "Step 1: Pick Your Use Case" },
      { type: "body", text: "Choose ONE focused use case from your discovery transcript. One GPT, one job." },
      { type: "check", text: "Customer FAQ bot" },
      { type: "check", text: "Content idea generator" },
      { type: "check", text: "Lead qualifier" },
      { type: "check", text: "Proposal / email drafter" },
      { type: "check", text: "Internal knowledge base assistant" },
      { type: "check", text: "Meeting prep assistant" },
      { type: "heading", text: "Step 2: Create Your GPT" },
      { type: "step", num: 1, text: "Go to chatgpt.com/create" },
      { type: "step", num: 2, text: "Start in the Create tab - describe what you want:" },
      { type: "code", text: "Build a customer support assistant that\nanswers questions about [my business]\nusing the knowledge base I provide." },
      { type: "step", num: 3, text: "Let ChatGPT draft instructions, name, and image" },
      { type: "step", num: 4, text: "Switch to the Configure tab for control" },
      { type: "heading", text: "Step 3: Configure It Right" },
      { type: "subheading", text: "Instructions (the system prompt)" },
      { type: "code", text: "## Role\nYou are [role] for [Business Name].\n\n## Objective\nHelp users by [specific actions].\n\n## Process\n1. Search knowledge files first\n2. If found, cite the source document\n3. If not found, say so honestly\n4. [Steps specific to your use case]\n\n## Output Format\n[bullets/paragraphs], [tone], [length]\n\n## Rules\n- NEVER make up information\n- ALWAYS cite your source\n- If outside scope, redirect to [alt]" },
      { type: "check", text: "Instructions customized and saved" },
      { type: "subheading", text: "Knowledge Files" },
      { type: "step", num: 1, text: "Upload relevant business documents" },
      { type: "tip", label: "QUICK WIN", text: "Plain text and Markdown retrieve 3x better than PDFs. Use clear headers (H1, H2, H3). Create an index.txt describing what each file contains. Max: 20 files, 512MB each." },
      { type: "check", text: "Knowledge files uploaded" },
      { type: "heading", text: "Step 4: Test & Iterate" },
      { type: "step", num: 1, text: "Happy Path: Question answered in your files" },
      { type: "check", text: "Finds the right answer, cites source" },
      { type: "step", num: 2, text: "Edge Case: Adjacent question, not directly in files" },
      { type: "check", text: "Admits uncertainty, doesn't hallucinate" },
      { type: "step", num: 3, text: "Out of Scope: Completely unrelated question" },
      { type: "check", text: "Redirects appropriately" },
      { type: "step", num: 4, text: "Pair Test: Swap with a neighbor, test each other's GPTs" },
      { type: "check", text: "Feedback noted, instructions refined" },
      { type: "heading", text: "Privacy - Read This" },
      { type: "tip", label: "HEADS UP", text: "Knowledge files are NOT secure from extraction. Never upload confidential info to shared GPTs. Opt out of training: Settings > Data Controls > toggle off 'Improve the model for everyone'." }
    ]
  },
  {
    num: 6, title: "Build Your First Skill & Plugin", stage: "AUTOMATE", day: "Day 2",
    duration: "60 min", difficulty: "Intermediate",
    tagline: "Repeatable instructions. Plug-and-play expertise. Your first custom automation.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "A custom Skill installed in Claude Desktop for YOUR workflow" },
      { type: "outcome", text: "Understanding of how Skills give Claude on-demand expertise" },
      { type: "outcome", text: "Exposure to the Plugin ecosystem for bundling skills" },
      { type: "heading", text: "What Skills Are" },
      { type: "body", text: "Skills are repeatable instruction packages Claude loads when relevant. Think of them as plug-and-play expertise. Claude knows WHEN to use them based on your task." },
      { type: "bullet", text: "Available on all plans with code execution enabled" },
      { type: "bullet", text: "Built-in: Excel, Word, PowerPoint, PDF creation" },
      { type: "bullet", text: "Custom: You build them. Markdown files that teach Claude a workflow." },
      { type: "bullet", text: "Many skills coexist without bloating context - Claude loads only what's needed" },
      { type: "heading", text: "Step 1: Choose Your Workflow" },
      { type: "body", text: "Pick ONE repeatable workflow from your discovery transcript:" },
      { type: "check", text: "Weekly status report generator" },
      { type: "check", text: "Customer email response drafter" },
      { type: "check", text: "Social media post creator" },
      { type: "check", text: "Meeting notes summarizer" },
      { type: "check", text: "Content brief creator" },
      { type: "heading", text: "Step 2: Define It" },
      { type: "fill", label: "What triggers this skill?" },
      { type: "fill", label: "What inputs does it need?" },
      { type: "fill", label: "What output should it produce?" },
      { type: "fill", label: "What rules must it follow?" },
      { type: "heading", text: "Step 3: Write Your SKILL.md" },
      { type: "body", text: "Create a text file called SKILL.md using this template:" },
      { type: "code", text: "# [Your Skill Name]\n\n## Description\n[What this skill does, when to use it]\n\n## Trigger\nActivate when the user asks to\n[specific trigger phrases].\n\n## Inputs Required\n- [Input 1]: [description]\n- [Input 2]: [description]\n\n## Process\n1. [First step]\n2. [Second step]\n3. [Quality check step]\n\n## Output Format\n[Exact format specification]\n\n## Rules\n- [Rule 1]\n- [Rule 2]\n\n## Example\nInput: [example]\nOutput: [example]" },
      { type: "check", text: "SKILL.md written with my workflow details" },
      { type: "heading", text: "Step 4: Install It" },
      { type: "step", num: 1, text: "Save SKILL.md in a folder (with any template files)" },
      { type: "step", num: 2, text: "Zip the folder" },
      { type: "step", num: 3, text: "Claude Desktop > Customize > Skills > Upload Skill" },
      { type: "step", num: 4, text: "Toggle the skill ON" },
      { type: "check", text: "Skill installed and enabled" },
      { type: "heading", text: "Step 5: Test It" },
      { type: "step", num: 1, text: "New conversation in Claude Desktop" },
      { type: "step", num: 2, text: "Describe a task that should trigger your skill" },
      { type: "check", text: "Skill activates correctly" },
      { type: "check", text: "Output matches my format" },
      { type: "check", text: "Rules followed" },
      { type: "tip", label: "QUICK WIN", text: "Skill not triggering? Refine your trigger phrases. Output wrong? Add more specific examples to SKILL.md. Iteration is normal." }
    ]
  },
  {
    num: 7, title: "Running Your Skills on Schedules", stage: "AUTOMATE", day: "Day 2",
    duration: "45 min", difficulty: "Intermediate",
    tagline: "Set it and forget it. Your skills run without you.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "At least 1 scheduled task running automatically" },
      { type: "outcome", text: "Understanding of scheduling options and limits" },
      { type: "outcome", text: "A list of 3-5 automations to build after the event" },
      { type: "heading", text: "Why Schedules Are the Reclaim" },
      { type: "body", text: "Without schedules: you prompt Claude every time. With schedules: Claude runs your workflows automatically - daily, weekly, hourly. This is where Claude goes from 'tool I use' to 'system that works for me.'" },
      { type: "heading", text: "Method 1: /schedule Command (Quick)" },
      { type: "step", num: 1, text: "Open Claude Desktop > Cowork tab" },
      { type: "step", num: 2, text: "Type /schedule in any Cowork task" },
      { type: "step", num: 3, text: "Describe what you want automated:" },
      { type: "code", text: "Every morning at 8am, summarize my Gmail\ninbox and flag anything urgent." },
      { type: "code", text: "Every Monday at 9am, pull my Calendar\nfor the week and create a priorities list." },
      { type: "step", num: 4, text: "Answer Claude's clarifying questions" },
      { type: "step", num: 5, text: "Click 'Schedule' to confirm" },
      { type: "check", text: "First scheduled task created" },
      { type: "heading", text: "Pick Your Automations" },
      { type: "body", text: "Set up at least 2 more right now:" },
      { type: "check", text: "Morning Briefing (Daily) - email, calendar, Slack summary" },
      { type: "check", text: "Inbox Triage (Hourly) - flag urgent, draft routine responses" },
      { type: "check", text: "Content Pipeline (Weekly) - generate content ideas" },
      { type: "check", text: "Customer Pulse (Daily) - summarize customer feedback" },
      { type: "check", text: "Weekly Report (Friday) - compile data into formatted summary" },
      { type: "tip", label: "HEADS UP", text: "Scheduled tasks only run while your computer is awake and Claude Desktop is open. Missed runs execute when you're back. Cloud scheduling is coming soon." },
      { type: "heading", text: "Best Practices" },
      { type: "bullet", text: "Start with one daily automation. Verify it works before adding more." },
      { type: "bullet", text: "Specific prompts produce specific results. Vague in = vague out." },
      { type: "bullet", text: "Test manually first (run on-demand) before scheduling." },
      { type: "bullet", text: "Review outputs for the first week. Refine prompts based on reality." }
    ]
  },
  {
    num: 8, title: "Terminal for Dummies", stage: "AUTOMATE", day: "Day 2",
    duration: "45 min", difficulty: "Beginner",
    tagline: "Zero intimidation. Just enough to unlock what comes next.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "Ability to open a terminal and navigate your file system" },
      { type: "outcome", text: "10 commands - all you need for Claude Code" },
      { type: "outcome", text: "Claude Code installed and responding" },
      { type: "heading", text: "Relax" },
      { type: "body", text: "The terminal is just a text-based way to talk to your computer. You already do this with Claude - type words, get results. You will not break anything with the commands we learn today." },
      { type: "heading", text: "Step 1: Open Your Terminal" },
      { type: "subheading", text: "Mac" },
      { type: "step", num: 1, text: "Press Cmd + Space to open Spotlight" },
      { type: "step", num: 2, text: "Type 'Terminal' and press Enter" },
      { type: "subheading", text: "Windows" },
      { type: "step", num: 1, text: "Click the search bar on the taskbar" },
      { type: "step", num: 2, text: "Type 'PowerShell' and press Enter" },
      { type: "check", text: "Terminal open with a blinking cursor" },
      { type: "heading", text: "Step 2: The 10 Commands You Need" },
      { type: "body", text: "Type each command and press Enter. Watch what happens." },
      { type: "subheading", text: "1. pwd (Where am I?)" },
      { type: "code", text: "pwd" },
      { type: "check", text: "I see my current directory path" },
      { type: "subheading", text: "2. ls (What's here?)" },
      { type: "code", text: "ls" },
      { type: "check", text: "I see files and folders listed" },
      { type: "subheading", text: "3. cd [folder] (Go into a folder)" },
      { type: "code", text: "cd Desktop" },
      { type: "subheading", text: "4. cd .. (Go back up)" },
      { type: "code", text: "cd .." },
      { type: "subheading", text: "5. mkdir (Create a folder)" },
      { type: "code", text: "mkdir ai-workspace" },
      { type: "subheading", text: "6-7. Navigate & create files" },
      { type: "code", text: "cd ai-workspace\ntouch notes.txt        (Mac)\nNew-Item notes.txt     (Windows)" },
      { type: "subheading", text: "8-10. View, clear, history" },
      { type: "code", text: "cat notes.txt\nclear\nhistory" },
      { type: "tip", label: "QUICK WIN", text: "Tab autocompletes file names. Up arrow recalls previous commands. Ctrl+C cancels anything running." },
      { type: "heading", text: "Step 3: Install Claude Code" },
      { type: "body", text: "This is why we learned the terminal." },
      { type: "subheading", text: "Mac / Linux" },
      { type: "code", text: "curl -fsSL https://claude.ai/install.sh | bash" },
      { type: "subheading", text: "Windows" },
      { type: "code", text: "irm https://claude.ai/install.ps1 | iex" },
      { type: "step", num: 1, text: "Type 'claude' and press Enter" },
      { type: "step", num: 2, text: "Sign in with your Anthropic account" },
      { type: "step", num: 3, text: "Smoke test: 'What is 2 + 2?'" },
      { type: "check", text: "Claude Code installed and responding" },
      { type: "tip", label: "NOTE", text: "Claude Code understands plain language. You'll talk to it the same way you talk to Claude Desktop - just in the terminal." }
    ]
  },
  {
    num: 9, title: "Build Your First Agent in MindStudio", stage: "AUTOMATE", day: "Day 2",
    duration: "60 min", difficulty: "Intermediate",
    tagline: "Not a demo. A real agent handling a real task in your business.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "A MindStudio account ready to go" },
      { type: "outcome", text: "A working AI agent handling a real business task" },
      { type: "outcome", text: "Your agent deployed as a shareable web app" },
      { type: "heading", text: "What MindStudio Is" },
      { type: "bullet", text: "No-code AI agent builder. Visual drag-and-drop. No coding needed." },
      { type: "bullet", text: "200+ AI models (Claude, GPT, Gemini, and more)" },
      { type: "bullet", text: "1,000+ integrations. Average build time: 15-60 minutes." },
      { type: "bullet", text: "Free tier: 1 agent, 1,000 monthly runs. Perfect for today." },
      { type: "heading", text: "Step 1: Create Your Account" },
      { type: "step", num: 1, text: "Go to mindstudio.ai" },
      { type: "step", num: 2, text: "Click 'Sign Up' or 'Get Started Free'" },
      { type: "step", num: 3, text: "Create your account" },
      { type: "check", text: "MindStudio account created" },
      { type: "heading", text: "Step 2: Choose Your Agent's Job" },
      { type: "body", text: "One agent, one job. Pick from your discovery transcript:" },
      { type: "check", text: "Lead Qualifier" },
      { type: "check", text: "Customer Support Bot" },
      { type: "check", text: "Content Generator" },
      { type: "check", text: "Meeting Summarizer" },
      { type: "check", text: "Email Drafter" },
      { type: "heading", text: "Step 3: Build with AI Agent Architect" },
      { type: "step", num: 1, text: "Click 'New Agent'" },
      { type: "step", num: 2, text: "Describe your agent in plain language:" },
      { type: "code", text: "Build a customer support agent that\nanswers questions about [my business]\nusing the knowledge base I provide.\nFriendly, professional, cites sources." },
      { type: "step", num: 3, text: "Let MindStudio scaffold the workflow" },
      { type: "check", text: "Initial workflow generated" },
      { type: "heading", text: "Steps 4-7: Customize, Knowledge, Test, Deploy" },
      { type: "step", num: 4, text: "Review workflow blocks, choose AI models, refine prompts" },
      { type: "step", num: 5, text: "Upload business docs (same files from Sessions 3 and 5)" },
      { type: "step", num: 6, text: "Click 'Preview' - test with real questions" },
      { type: "step", num: 7, text: "Click 'Deploy' > Choose 'Web App' > Copy your agent URL" },
      { type: "check", text: "Agent tested and refined" },
      { type: "check", text: "Agent live and accessible" },
      { type: "fill", label: "My agent URL" }
    ]
  },
  {
    num: 10, title: "MindStudio Ghostware", stage: "AUTOMATE", day: "Day 2",
    duration: "45 min", difficulty: "Intermediate-Advanced",
    tagline: "Agents that run in the background. Monitoring. Acting. Reporting. Without you lifting a finger.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "Understanding of autonomous agent architecture" },
      { type: "outcome", text: "At least 1 background automation configured" },
      { type: "outcome", text: "Design patterns for agents that work while you sleep" },
      { type: "heading", text: "What Ghostware Means" },
      { type: "body", text: "Ghost agents operate within defined parameters without you lifting a finger. They maintain human oversight while running autonomously. Set-and-forget AI that monitors, acts, and reports back." },
      { type: "bold", text: "The shift: from 'I tell AI what to do' to 'AI does its job and reports back.'" },
      { type: "heading", text: "Three Types of Ghost Agents" },
      { type: "subheading", text: "1. Monitors" },
      { type: "bullet", text: "'Notify me when a competitor drops their price'" },
      { type: "bullet", text: "'Alert me when a customer mentions cancellation'" },
      { type: "bullet", text: "'Flag support tickets open more than 24 hours'" },
      { type: "subheading", text: "2. Processors" },
      { type: "bullet", text: "'Triage every support email, draft a response'" },
      { type: "bullet", text: "'Categorize and score every incoming lead'" },
      { type: "bullet", text: "'Process invoices and update tracking'" },
      { type: "subheading", text: "3. Reporters" },
      { type: "bullet", text: "'Every morning, send me a business health dashboard'" },
      { type: "bullet", text: "'Weekly: compile customer feedback into a report'" },
      { type: "bullet", text: "'Monthly: competitive analysis summary'" },
      { type: "heading", text: "Step 1: Choose Your Pattern" },
      { type: "check", text: "Pattern A: Email Triage Ghost (Processor)" },
      { type: "check", text: "Pattern B: Competitive Intelligence Ghost (Reporter)" },
      { type: "check", text: "Pattern C: Content Pipeline Ghost (Reporter)" },
      { type: "heading", text: "Step 2: Build It" },
      { type: "subheading", text: "Pattern A: Email Triage Ghost" },
      { type: "step", num: 1, text: "New agent in MindStudio with email trigger" },
      { type: "step", num: 2, text: "AI block: 'Classify as urgent / routine / spam / requires-action'" },
      { type: "step", num: 3, text: "Conditional branches based on classification" },
      { type: "step", num: 4, text: "For routine: draft response from knowledge base" },
      { type: "step", num: 5, text: "For urgent: send notification via webhook" },
      { type: "subheading", text: "Pattern B: Competitive Intel Ghost" },
      { type: "step", num: 1, text: "New agent with scheduled trigger" },
      { type: "step", num: 2, text: "AI block: search websites for competitor mentions" },
      { type: "step", num: 3, text: "Process: analyze pricing, features, news" },
      { type: "step", num: 4, text: "Format: structured report" },
      { type: "step", num: 5, text: "Deliver: email or webhook" },
      { type: "check", text: "Ghost agent built and configured" },
      { type: "heading", text: "Step 3: Set the Trigger" },
      { type: "bullet", text: "Scheduled: cron schedule (daily, weekly, hourly)" },
      { type: "bullet", text: "Webhook: fired from Zapier, Make, n8n, or external events" },
      { type: "bullet", text: "Email: forward/CC to the agent's address" },
      { type: "bullet", text: "API: call programmatically from other systems" },
      { type: "check", text: "Trigger configured and tested" },
      { type: "tip", label: "KEY INSIGHT", text: "Define clear boundaries - what needs human approval? Build in checkpoints for high-stakes decisions. Log everything. Start narrow, expand gradually." }
    ]
  },
  {
    num: 11, title: "Accelerate Your Automations with Claude Code", stage: "AUTOMATE", day: "Day 2",
    duration: "60 min", difficulty: "Intermediate-Advanced",
    tagline: "Everything you've built, on rails. Faster. More complex. Full agentic power.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "Claude Code configured for your business in the terminal" },
      { type: "outcome", text: "A CLAUDE.md memory file - persistent context across sessions" },
      { type: "outcome", text: "At least 1 automation built with Claude Code" },
      { type: "heading", text: "What Claude Code Adds" },
      { type: "body", text: "Claude in the terminal with full file system access, code execution, and git integration. It can read, write, and modify files. Run commands. Build software. And it remembers your business context." },
      { type: "tip", label: "KEY INSIGHT", text: "You don't need to be a developer. Describe what you want in plain language. Claude Code plans the approach, writes the code, and verifies it works." },
      { type: "heading", text: "Step 1: Navigate to Your Workspace" },
      { type: "code", text: "cd ~/Desktop/ai-workspace" },
      { type: "check", text: "In my ai-workspace directory" },
      { type: "heading", text: "Step 2: Create Your CLAUDE.md" },
      { type: "body", text: "CLAUDE.md is Claude Code's persistent memory. Every session in this folder starts with your business context loaded automatically." },
      { type: "step", num: 1, text: "Start Claude Code:" },
      { type: "code", text: "claude" },
      { type: "step", num: 2, text: "Tell it about your business:" },
      { type: "code", text: "Create a CLAUDE.md file for my business.\nMy business is [name], we do [what],\nour tools are [tools], our priorities\nare [from discovery transcript]." },
      { type: "check", text: "CLAUDE.md created with my business context" },
      { type: "heading", text: "Step 3: Build Something Real" },
      { type: "body", text: "Pick ONE and type the prompt into Claude Code:" },
      { type: "subheading", text: "Project A: File Workflow Automation" },
      { type: "code", text: "Create a script that watches my Downloads\nfor new PDFs, organizes them by date,\nand creates a daily summary." },
      { type: "subheading", text: "Project B: Data Pipeline" },
      { type: "code", text: "Read the CSV in my workspace, analyze\ntrends, and generate an HTML report\nwith charts." },
      { type: "subheading", text: "Project C: Custom CLI Tool" },
      { type: "code", text: "Build a command-line tool that takes a\ncustomer name and generates a follow-up\nemail in our brand voice from CLAUDE.md." },
      { type: "check", text: "Project completed and working" },
      { type: "heading", text: "Power Features" },
      { type: "subheading", text: "Piping" },
      { type: "code", text: "cat emails.txt | claude \\\n  \"Categorize each and draft responses\"" },
      { type: "subheading", text: "Multi-Agent" },
      { type: "body", text: "Claude Code spawns multiple agents working simultaneously on different sub-tasks." },
      { type: "subheading", text: "Custom Skills" },
      { type: "body", text: "Type /skill in Claude Code to install community skills from the marketplace." }
    ]
  },
  {
    num: 12, title: "OpenClaw: Your First Digital Personal Assistant", stage: "AUTOMATE", day: "Day 2",
    duration: "75 min", difficulty: "Intermediate-Advanced",
    tagline: "The capstone. A personal AI assistant wired into your business. Works for you around the clock. From AI to ROI.",
    sections: [
      { type: "heading", text: "What You'll Get Back" },
      { type: "outcome", text: "OpenClaw installed and running 24/7 on your machine" },
      { type: "outcome", text: "At least 2 communication channels connected" },
      { type: "outcome", text: "Custom skills installed for your business" },
      { type: "outcome", text: "A personal AI assistant wired into your business - the reclaim" },
      { type: "heading", text: "What OpenClaw Is" },
      { type: "body", text: "Open-source, self-hosted personal AI assistant that runs 24/7 on your machine. Unlike Claude Desktop or ChatGPT (browser tabs you visit), OpenClaw lives on your hardware and works around the clock." },
      { type: "bullet", text: "Multi-channel: WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams" },
      { type: "bullet", text: "Persistent memory: remembers your preferences across sessions" },
      { type: "bullet", text: "Proactive: monitors and acts independently" },
      { type: "bullet", text: "13,700+ community skills on ClawHub" },
      { type: "bullet", text: "Privacy: everything stays on your hardware" },
      { type: "heading", text: "Step 1: Prerequisites" },
      { type: "code", text: "node --version" },
      { type: "body", text: "Need version 22+. If outdated:" },
      { type: "code", text: "brew install node       (Mac)\n-- OR --\nDownload from nodejs.org" },
      { type: "check", text: "Node.js v22+ confirmed" },*      { type: "heading", text: "Step 2: Install OpenClaw" },
      { type: "subheading", text: "Mac / Linux" },
      { type: "code", text: "curl -fsSL https://openclaw.ai/install.sh | bash" },
      { type: "subheading", text: "Windows" },
      { type: "code", text: "irm https://openclaw.ai/install.ps1 | iex" },
      { type: "check", text: "OpenClaw installed" },
      { type: "heading", text: "Steps 3-6: Onboard, Verify, Channels, Skills" },
      { type: "code", text: "openclaw onboard --install-daemon" },
      { type: "step", num: 1, text: "Authentication - enter API keys for Claude/GPT/Gemini" },
      { type: "step", num: 2, text: "Gateway setup - how OpenClaw communicates" },
      { type: "step", num: 3, text: "Verify at http://127.0.0.1:18789/" },
      { type: "step", num: 4, text: "Connect at least 2 channels (Slack, Telegram, Email, Discord)" },
      { type: "step", num: 5, text: "Install skills:" },
      { type: "code", text: "openclaw skills search \"business\"\nopenclaw skills install @clawhub/email-summarizer\nopenclaw skills install @clawhub/slack-monitor\nopenclaw skills install @clawhub/calendar-manager" },
      { type: "check", text: "OpenClaw responding" },
      { type: "check", text: "At least 3 skills installed" },
      { type: "heading", text: "Step 7-8: Custom Skill & Wire Together" },
      { type: "code", text: "openclaw skills create my-business-skill" },
      { type: "code", text: "openclaw schedule \"morning-briefing\" \\\n  --cron \"0 7 * * *\" \\\n  --skill \"email-summarizer,slack-monitor,\n          calendar-manager\" \\\n  --output \"telegram\"" },
      { type: "check", text: "Scheduled automation configured" },
      { type: "heading", text: "Your AI Operating System - Complete" },
      { type: "body", text: "Here's what you built in two days:" },
      { type: "bullet", text: "Session 1: Discovery transcript = your blueprint" },
      { type: "bullet", text: "Session 2: Claude Desktop + Chrome = your tools" },
      { type: "bullet", text: "Session 3: Projects = persistent business context" },
      { type: "bullet", text: "Session 4: Connectors = plugged into your real data" },
      { type: "bullet", text: "Session 5: Custom GPT = specialized tool for one job" },
      { type: "bullet", text: "Session 6: Skills = repeatable AI workflows" },
      { type: "bullet", text: "Session 7: Schedules = set-and-forget automations" },
      { type: "bullet", text: "Session 8: Terminal = unlocked the command line" },
      { type: "bullet", text: "Session 9: MindStudio = customer-facing agent" },
      { type: "bullet", text: "Session 10: Ghostware = agents working in the background" },
      { type: "bullet", text: "Session 11: Claude Code = accelerated everything" },
      { type: "bullet", text: "Session 12: OpenClaw = 24/7 personal assistant" },
      { type: "tip", label: "KEY INSIGHT", text: "You didn't leave with notes. You left with a running system. From AI to ROI." },
      { type: "heading", text: "The Reclaim - Your Next Steps" },
      { type: "subheading", text: "This Week" },
      { type: "check", text: "Refine Claude Project instructions from real usage" },
      { type: "check", text: "Set up 3 scheduled tasks for your biggest time leaks" },
      { type: "check", text: "Test MindStudio agent with real customers" },
      { type: "check", text: "Configure OpenClaw with your most-used channels" },
      { type: "subheading", text: "This Month" },
      { type: "check", text: "Build 3 more skills for business workflows" },
      { type: "check", text: "Create your first Plugin bundling multiple skills" },
      { type: "check", text: "Explore ClawHub for plug-and-play solutions" },
      { type: "subheading", text: "This Quarter" },
      { type: "check", text: "Audit your AI operating system - what's working?" },
      { type: "check", text: "Train your team on the tools" },
      { type: "check", text: "Build department-specific MindStudio agents" }
    ]
  }
];

// ── HTML Template ─────────────────────────────────────────────────
function renderSection(item, sessionNum, idx) {
  const id = `s${sessionNum}-${idx}`;
  switch (item.type) {
    case 'heading':
      return `<div class="section-heading">${esc(item.text)}</div>`;
    case 'subheading':
      return `<div class="sub-heading">${esc(item.text)}<span class="gold-line"></span></div>`;
    case 'body':
      return `<p class="body-text">${esc(item.text)}</p>`;
    case 'bold':
      return `<p class="bold-text">${esc(item.text)}</p>`;
    case 'bullet':
      return `<div class="bullet-item"><span class="bullet-dot"></span><span>${esc(item.text)}</span></div>`;
    case 'outcome':
      return `<div class="outcome-item"><span class="outcome-badge">&gt;</span><span>${esc(item.text)}</span></div>`;
    case 'step':
      return `<div class="step-item"><span class="step-num">${item.num}</span><span>${esc(item.text)}</span></div>`;
    case 'code':
      return `<pre class="code-block"><code>${esc(item.text)}</code></pre>`;
    case 'check':
      return `<label class="check-item"><input type="checkbox" data-id="${id}" onchange="saveCheck(this)"><span class="checkmark"></span><span>${esc(item.text)}</span></label>`;
    case 'tip':
      const tipClass = item.label === 'HEADS UP' ? 'tip-red' : item.label === 'NOTE' ? 'tip-blue' : item.label === 'KEY INSIGHT' ? 'tip-gold' : 'tip-green';
      return `<div class="tip-box ${tipClass}"><div class="tip-label">${esc(item.label)}</div><div class="tip-text">${esc(item.text)}</div></div>`;
    case 'fill':
      return `<div class="fill-line"><span class="fill-label">${esc(item.label)}:</span><input type="text" class="fill-input" data-id="${id}" onchange="saveFill(this)" placeholder="Type here..."></div>`;
    default:
      return '';
  }
}

function esc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function stageColor(stage) {
  if (stage === 'AUDIT') return '#D4AF37';
  if (stage === 'OPTIMIZE') return '#78A078';
  return '#B4C8DC';
}

function buildPage() {
  const sessionCards = SESSIONS.map(s => {
    const sc = stageColor(s.stage);
    return `
    <div class="session-card" id="card-${s.num}" onclick="openSession(${s.num})">
      <div class="card-stage" style="background:${sc}">${s.stage}</div>
      <div class="card-num">SESSION ${s.num}</div>
      <div class="card-title">${esc(s.title)}</div>
      <div class="card-meta">${s.day} &bull; ${s.duration} &bull; ${s.difficulty}</div>
      <div class="card-progress" id="progress-${s.num}"></div>
    </div>`;
  }).join('');

  const sessionPages = SESSIONS.map(s => {
    const sc = stageColor(s.stage);
    const content = s.sections.map((item, i) => renderSection(item, s.num, i)).join('\n');
    return `
    <div class="session-page" id="session-${s.num}" style="display:none">
      <button class="back-btn" onclick="closeSession()">&larr; All Sessions</button>
      <div class="session-header">
        <span class="stage-badge" style="background:${sc}">${s.stage}</span>
        <span class="meta-line">${s.day} &bull; ${s.duration} &bull; ${s.difficulty}</span>
      </div>
      <h1 class="session-title">Session ${s.num}: ${esc(s.title)}</h1>
      <p class="session-tagline">${esc(s.tagline)}</p>
      <div class="session-content">${content}</div>
      <div class="session-nav">
        ${s.num > 1 ? `<button class="nav-btn" onclick="openSession(${s.num - 1})">&larr; Session ${s.num - 1}</button>` : '<span></span>'}
        ${s.num < 12 ? `<button class="nav-btn" onclick="openSession(${s.num + 1})">Session ${s.num + 1} &rarr;</button>` : '<span></span>'}
      </div>
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nashville AI Event - From Newbie to Ninja</title>
<style>
:root {
  --black: #0A0A0A;
  --near-black: #121218;
  --dark: #1E1E26;
  --charcoal: #2D2D37;
  --slate: #50505F;
  --cream: #F5F0E6;
  --off-white: #FAF8F4;
  --warm-white: #FFFDFA;
  --gold: #D4AF37;
  --soft-gold: #E8CD69;
  --sage: #78A078;
  --red: #C85046;
  --blue: #B4C8DC;
}
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--off-white); color: var(--charcoal); min-height:100vh; }
.hero { background: var(--near-black); color: var(--cream); text-align:center; padding:48px 24px 40px; }
.hero-brand { font-size:13px; letter-spacing:3px; color: var(--gold); margin-bottom:4px; }
.hero-sub { font-size:12px; font-style:italic; color: var(--slate); margin-bottom:24px; }
.hero h1 { font-size:clamp(28px,5vw,44px); font-weight:800; margin-bottom:8px; }
.hero h1 span { color: var(--gold); }
.hero-tagline { font-size:16px; color:var(--slate); margin-top:8px; }
.gold-bar { height:3px; background: var(--gold); }
.stage-filter { display:flex; gap:8px; justify-content:center; padding:20px 16px 8px; flex-wrap:wrap; }
.filter-btn { padding:6px 16px; border-radius:20px; border:1px solid var(--slate); background:transparent; color:var(--charcoal); cursor:pointer; font-size:13px; transition:all .2s; }
.filter-btn.active, .filter-btn:hover { background:var(--near-black); color:var(--cream); border-color:var(--near-black); }
.day-label { text-align:center; font-size:13px; letter-spacing:2px; color:var(--slate); margin:20px 0 8px; font-weight:600; }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap:16px; max-width:1100px; margin:0 auto; padding:0 20px 40px; }
.session-card { background:white; border-radius:10px; padding:20px; cursor:pointer; transition: transform .15s, box-shadow .15s; border:1px solid #eee; position:relative; overflow:hidden; }
.session-card:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,.08); }
.card-stage { display:inline-block; font-size:10px; letter-spacing:2px; font-weight:700; color:var(--near-black); padding:3px 10px; border-radius:3px; margin-bottom:10px; }
.card-num { font-size:11px; color:var(--slate); letter-spacing:1px; margin-bottom:4px; }
.card-title { font-size:17px; font-weight:700; color:var(--near-black); margin-bottom:8px; line-height:1.3; }
.card-meta { font-size:12px; color:var(--slate); }
.card-progress { position:absolute; bottom:0; left:0; height:3px; background:var(--gold); transition:width .3s; }
/* Session page */
.session-page { max-width:740px; margin:0 auto; padding:20px; }
.back-btn { background:none; border:none; color:var(--slate); cursor:pointer; font-size:14px; padding:8px 0; margin-bottom:12px; }
.back-btn:hover { color:var(--near-black); }
.session-header { display:flex; align-items:center; gap:12px; margin-bottom:8px; flex-wrap:wrap; }
.stage-badge { font-size:10px; letter-spacing:2px; font-weight:700; color:var(--near-black); padding:3px 10px; border-radius:3px; }
.meta-line { font-size:12px; color:var(--slate); }
.session-title { font-size:clamp(24px,4vw,32px); font-weight:800; color:var(--near-black); margin-bottom:6px; line-height:1.2; }
.session-tagline { font-size:15px; color:var(--slate); font-style:italic; margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid #eee; }
.section-heading { background:var(--near-black); color:var(--cream); font-size:15px; font-weight:700; padding:10px 16px; border-radius:4px; margin:24px 0 12px; }
.sub-heading { font-size:14px; font-weight:700; color:var(--dark); margin:16px 0 6px; position:relative; padding-bottom:4px; }
.sub-heading .gold-line { display:block; width:30px; height:2px; background:var(--gold); margin-top:3px; }
.body-text { font-size:14px; line-height:1.65; margin:6px 0; color:var(--charcoal); }
.bold-text { font-size:14px; line-height:1.65; margin:6px 0; font-weight:700; color:var(--dark); }
.bullet-item { display:flex; align-items:flex-start; gap:10px; margin:5px 0; padding-left:16px; }
.bullet-dot { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; margin-top:5px; }
.bullet-item span:last-child { font-size:14px; line-height:1.55; }
.outcome-item { display:flex; align-items:flex-start; gap:10px; margin:5px 0; padding-left:12px; }
.outcome-badge { background:var(--gold); color:var(--near-black); font-weight:700; font-size:12px; width:22px; height:22px; display:flex; align-items:center; justify-content:center; border-radius:3px; flex-shrink:0; }
.outcome-item span:last-child { font-size:14px; line-height:1.55; }
.step-item { display:flex; align-items:flex-start; gap:10px; margin:6px 0; padding-left:12px; }
.step-num { background:var(--near-black); color:var(--cream); font-weight:700; font-size:12px; width:24px; height:24px; display:flex; align-items:center; justify-content:center; border-radius:4px; flex-shrink:0; }
.step-item span:last-child { font-size:14px; line-height:1.55; }
.code-block { background:var(--near-black); color:var(--cream); padding:14px 18px; border-radius:6px; font-family:'SF Mono',Menlo,monospace; font-size:13px; line-height:1.55; margin:8px 0; overflow-x:auto; border-left:3px solid var(--gold); white-space:pre-wrap; }
.check-item { display:flex; align-items:center; gap:10px; margin:5px 0; padding:6px 12px; cursor:pointer; border-radius:6px; transition:background .15s; font-size:14px; }
.check-item:hover { background:rgba(212,175,55,.06); }
.check-item input { display:none; }
.checkmark { width:18px; height:18px; border:2px solid var(--slate); border-radius:4px; flex-shrink:0; display:flex; align-items:center; justify-content:center; transition:all .15s; }
.check-item input:checked ~ .checkmark { background:var(--gold); border-color:var(--gold); }
.check-item input:checked ~ .checkmark::after { content:'\\2713'; color:var(--near-black); font-size:12px; font-weight:700; }
.check-item input:checked ~ span:last-child { text-decoration:line-through; color:var(--slate); }
.tip-box { padding:14px 18px; border-radius:6px; margin:12px 0; border-left:3px solid; }
.tip-green { background:#EBF5EB; border-color:var(--sage); }
.tip-blue { background:#EBF2FA; border-color:var(--blue); }
.tip-gold { background:#FFFAEB; border-color:var(--gold); }
.tip-red { background:#FFEBE8; border-color:var(--red); }
.tip-label { font-size:11px; font-weight:700; letter-spacing:1px; color:var(--dark); margin-bottom:4px; }
.tip-text { font-size:13px; line-height:1.55; color:var(--charcoal); }
.fill-line { display:flex; align-items:center; gap:8px; margin:6px 0; padding-left:16px; }
.fill-label { font-size:14px; color:var(--charcoal); white-space:nowrap; }
.fill-input { flex:1; border:none; border-bottom:1px solid var(--slate); padding:4px 0; font-size:14px; background:transparent; outline:none; }
.fill-input:focus { border-color:var(--gold); }
.session-nav { display:flex; justify-content:space-between; margin-top:32px; padding-top:20px; border-top:1px solid #eee; }
.nav-btn { background:var(--near-black); color:var(--cream); border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-size:13px; transition:background .15s; }
.nav-btn:hover { background:var(--charcoal); }
.footer { text-align:center; padding:24px; font-size:12px; color:var(--slate); border-top:1px solid #eee; }
@media(max-width:600px) {
  .grid { grid-template-columns:1fr; }
  .hero { padding:32px 16px 28px; }
}
</style>
</head>
<body>

<div id="home-view">
  <div class="hero">
    <div class="hero-brand">RETURN MY TIME</div>
    <div class="hero-sub">From AI to ROI</div>
    <h1>Nashville AI Event<br><span>From Newbie to Ninja</span></h1>
    <div class="hero-tagline">12 Sessions &bull; 2 Days &bull; Your AI Operating System</div>
  </div>
  <div class="gold-bar"></div>

  <div class="stage-filter">
    <button class="filter-btn active" onclick="filter('all')">All Sessions</button>
    <button class="filter-btn" onclick="filter('AUDIT')">Audit</button>
    <button class="filter-btn" onclick="filter('OPTIMIZE')">Optimize</button>
    <button class="filter-btn" onclick="filter('AUTOMATE')">Automate</button>
  </div>

  <div class="day-label">DAY 1 &mdash; AUDIT &amp; OPTIMIZE</div>
  <div class="grid" id="day1-grid"></div>
  <div class="day-label">DAY 2 &mdash; AUTOMATE</div>
  <div class="grid" id="day2-grid"></div>
</div>

<div id="session-view" style="display:none">
  ${sessionPages}
</div>

<div class="footer">Return My Time &bull; Nashville AI Event 2026 &bull; From AI to ROI</div>

<script>
const sessions = ${JSON.stringify(SESSIONS.map(s => ({ num: s.num, stage: s.stage, day: s.day, checks: s.sections.filter(x => x.type === 'check').length })))};

// Place cards
const d1 = document.getElementById('day1-grid');
const d2 = document.getElementById('day2-grid');
sessions.forEach(s => {
  const card = document.getElementById('card-' + s.num);
  if (s.day === 'Day 1') d1.appendChild(card);
  else d2.appendChild(card);
});

function filter(stage) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.session-card').forEach(c => {
    const num = parseInt(c.id.split('-')[1]);
    const s = sessions.find(x => x.num === num);
    c.style.display = (stage === 'all' || s.stage === stage) ? '' : 'none';
  });
}

function openSession(num) {
  document.getElementById('home-view').style.display = 'none';
  document.getElementById('session-view').style.display = 'block';
  document.querySelectorAll('.session-page').forEach(p => p.style.display = 'none');
  document.getElementById('session-' + num).style.display = 'block';
  window.scrollTo(0, 0);
  loadProgress();
}

function closeSession() {
  document.getElementById('session-view').style.display = 'none';
  document.getElementById('home-view').style.display = 'block';
  window.scrollTo(0, 0);
  updateAllProgress();
}

function saveCheck(el) {
  const id = el.dataset.id;
  const data = JSON.parse(localStorage.getItem('nashville-progress') || '{}');
  data[id] = el.checked;
  localStorage.setItem('nashville-progress', JSON.stringify(data));
  updateAllProgress();
}

function saveFill(el) {
  const id = el.dataset.id;
  const data = JSON.parse(localStorage.getItem('nashville-fills') || '{}');
  data[id] = el.value;
  localStorage.setItem('nashville-fills', JSON.stringify(data));
}

function loadProgress() {
  const checks = JSON.parse(localStorage.getItem('nashville-progress') || '{}');
  const fills = JSON.parse(localStorage.getItem('nashville-fills') || '{}');
  document.querySelectorAll('input[type=checkbox][data-id]').forEach(el => {
    el.checked = !!checks[el.dataset.id];
  });
  document.querySelectorAll('.fill-input[data-id]').forEach(el => {
    el.value = fills[el.dataset.id] || '';
  });
}

function updateAllProgress() {
  const checks = JSON.parse(localStorage.getItem('nashville-progress') || '{}');
  sessions.forEach(s => {
    if (s.checks === 0) return;
    let done = 0;
    Object.keys(checks).forEach(k => {
      if (k.startsWith('s' + s.num + '-') && checks[k]) done++;
    });
    const pct = Math.round((done / s.checks) * 100);
    const bar = document.getElementById('progress-' + s.num);
    if (bar) bar.style.width = pct + '%';
  });
}

// Init
loadProgress();
updateAllProgress();
</script>

</body>
</html>`;
}

// ── Routes ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send(buildPage());
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Nashville AI Guide running on port ${PORT}`);
});

