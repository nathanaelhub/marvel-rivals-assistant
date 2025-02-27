const { Anthropic } = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');
const dataProcessor = require('./data-processor');

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

// Base system prompt
const baseSystemPrompt = `
You are an AI Strategy Assistant for Marvel Rivals, designed to help players with both strategy and general game knowledge. When provided with a question, you will analyze and respond based on your comprehensive game knowledge database.

CORE FUNCTIONS:
1. Strategy Analysis (When question is strategy-related)
   - Team composition optimization
   - Character role recommendations
   - Synergy suggestions
   - Counter-pick advice

2. Game Knowledge (When question is knowledge-related)
   - Character ability explanations
   - Game mode descriptions
   - Rank system clarification
   - Mechanic explanations

3. Response Format:
   <response>
     <question_analysis>Understanding of question type and context</question_analysis>
     <main_response>
       - Detailed answer to question
       - Strategic recommendations (if applicable)
       - Relevant game information
     </main_response>
     <additional_tips>Extra helpful information based on question context</additional_tips>
   </response>

RESPONSE ADAPTATIONS:
- Query Type: Adapt response based on question category
- Detail Level: Adjust depth based on question complexity
- Context: Consider game mode, team composition, and player preferences mentioned in question
- Accuracy: Use verified game data for all recommendations

Your responses should be:
- Clear and actionable
- Supported by game data
- Appropriately detailed for the query
- Encouraging and helpful
`;

/**
 * Process a player question using Claude API
 * @param {string} question - The player's question
 * @returns {Promise<string>} - Claude's response
 */
async function processQuestion(question) {
    try {
        // Get relevant game data for the question
        const relevantData = await dataProcessor.getRelevantData(question);
        
        // Create enhanced system prompt with relevant data
        const enhancedPrompt = `${baseSystemPrompt}\n\nRELEVANT GAME DATA:\n${JSON.stringify(relevantData, null, 2)}`;
        
        // Make API call to Claude
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 4096,
            temperature: 0.7,
            system: enhancedPrompt,
            messages: [
                {
                    role: "user",
                    content: question
                }
            ]
        });
        
        return response.content[0].text;
        
    } catch (error) {
        console.error('Error calling Claude API:', error);
        throw new Error('Failed to process question with AI service');
    }
}

module.exports = {
    processQuestion
};