// import openai from '../utils/openAI.js';

// // System prompt for accessibility-focused chatbot
// const SYSTEM_PROMPT = `
// You are WebLoom AI Assistant, an expert in web accessibility and WCAG guidelines. 
// You help developers, designers, and content creators make their websites accessible.

// Key focus areas:
// - WCAG 2.1/2.2 guidelines
// - ARIA attributes and roles
// - Color contrast and visual design
// - Screen reader compatibility
// - Keyboard navigation
// - Semantic HTML
// - Mobile accessibility
// - Performance and accessibility

// Always respond in a helpful, professional manner. If asked about non-accessibility topics, politely guide back to accessibility.
// Provide code examples when relevant. Use Hindi/English based on user's language preference.
// `;

// const chatController = {
//   async sendMessage(req, res) {
//     try {
//       const { message, conversationHistory = [] } = req.body;

//       if (!message) {
//         return res.status(400).json({ error: 'Message is required' });
//       }

//       // Prepare conversation history
//       const messages = [
//         { role: 'system', content: SYSTEM_PROMPT },
//         ...conversationHistory.slice(-6), // Last 6 messages for context
//         { role: 'user', content: message }
//       ];

//       const completion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: messages,
//         max_tokens: 500,
//         temperature: 0.7,
//       });

//       const botResponse = completion.choices[0].message.content;

//       res.json({
//         success: true,
//         reply: botResponse,
//         tokensUsed: completion.usage?.total_tokens
//       });

//     } catch (error) {
//       console.error('OpenAI API Error:', error);
      
//       // Check for specific OpenAI errors
//       if (error.code === 'insufficient_quota') {
//         return res.status(503).json({ 
//           success: false,
//           error: 'AI service quota exceeded. Please try again later.',
//           fallback: true
//         });
//       }
      
//       if (error.code === 'rate_limit_exceeded') {
//         return res.status(429).json({ 
//           success: false,
//           error: 'Rate limit exceeded. Please wait a moment before trying again.',
//           fallback: true
//         });
//       }

//       res.status(500).json({ 
//         success: false,
//         error: 'AI service temporarily unavailable. Please try again later.',
//         fallback: true
//       });
//     }
//   },

//   // Health check for chat service
//   async healthCheck(req, res) {
//     try {
//       // Test OpenAI connection with a small request
//       const testCompletion = await openai.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: 'Say "OK"' }],
//         max_tokens: 5,
//       });

//       res.json({
//         success: true,
//         message: 'Chat service is operational',
//         openaiStatus: 'connected'
//       });
//     } catch (error) {
//       res.status(503).json({
//         success: false,
//         message: 'Chat service unavailable',
//         openaiStatus: 'disconnected'
//       });
//     }
//   }
// };

// export default chatController;


import openai from '../utils/openAI.js';

const SYSTEM_PROMPT = `
You are WebLoom AI Assistant, an expert in web accessibility and WCAG guidelines. 
You help developers, designers, and content creators make their websites accessible.
`;

const chatController = {
  async sendMessage(req, res) {
    try {
      const { message, conversationHistory = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // ✅ Temporary: Check if OpenAI is configured
      if (!openai || !process.env.OPENAI_API_KEY) {
        return res.json({
          success: true,
          reply: "Currently I'm in learning mode. Please check your OpenAI API key configuration. Meanwhile, I can help you with basic accessibility questions!",
          fallback: true
        });
      }

      // Prepare conversation history
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.slice(-6),
        { role: 'user', content: message }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const botResponse = completion.choices[0].message.content;

      res.json({
        success: true,
        reply: botResponse,
        tokensUsed: completion.usage?.total_tokens
      });

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // ✅ Better error responses
      let errorMessage = 'AI service temporarily unavailable. Please try again later.';
      let statusCode = 500;

      if (error.code === 'insufficient_quota') {
        errorMessage = 'API quota exceeded. Please check your OpenAI account.';
        statusCode = 503;
      } else if (error.code === 'rate_limit_exceeded') {
        errorMessage = 'Rate limit exceeded. Please wait a moment.';
        statusCode = 429;
      } else if (error.code === 'invalid_api_key') {
        errorMessage = 'Invalid API key. Please check your configuration.';
        statusCode = 401;
      }

      res.status(statusCode).json({ 
        success: false,
        error: errorMessage,
        fallback: true
      });
    }
  },

  async healthCheck(req, res) {
    try {
      // ✅ Simple health check without API call
      res.json({
        success: true,
        message: 'Chat service is running',
        openaiConfigured: !!process.env.OPENAI_API_KEY,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        message: 'Chat service unavailable'
      });
    }
  }
};

export default chatController;