# Marvel Rivals Strategy Assistant

An AI-powered assistant that helps players optimize their gameplay in Marvel Rivals by providing character information, team composition suggestions, and strategic advice.

![logo](https://github.com/user-attachments/assets/075a38d1-6b24-44bd-b7de-f16296ee172e)


## Overview

This project creates an interactive web application that uses Claude AI to provide strategic advice and game knowledge for Marvel Rivals players. The assistant helps with:

- Character selection and counter-picks
- Team composition optimization
- Synergy recommendations
- Role-specific strategies
- Game mode guidance for all skill levels

## Features

- **Character Analysis**: Detailed information on abilities, strengths, and weaknesses
- **Team Composition**: Optimal team builds based on the current meta
- **Synergy Suggestions**: Recommendations for character combinations with special team-up abilities
- **Counter Strategies**: Advice on how to counter specific characters or team compositions
- **Skill-Level Adaptation**: Tailored advice for Bronze through Eternity ranks
- **XML-Structured Responses**: Clear, organized answers with analysis and additional tips

## Demo

![image](https://github.com/user-attachments/assets/aeda3e7c-9a35-4cc5-b4ff-ac5162fa6a1d)


## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **AI**: Anthropic Claude API (Claude 3.5 Sonnet)
- **Data Storage**: JSON

## Project Structure

```
marvel-rivals-assistant/
│
├── data/                        # Game data storage
│   ├── character_stats.json     # Character win rates and pick rates
│   ├── team_synergies.json      # Team-up abilities
│   ├── character_abilities.json # Detailed abilities for each character
│   ├── character_descriptions.json  # Character descriptions
│   └── game_modes.json          # Information about game modes
│
├── public/                      # Frontend files
│   ├── index.html               # Main HTML page
│   ├── styles.css               # CSS styling
│   ├── script.js                # Frontend JavaScript
│   └── images/                  # Image assets
│       └── logo.png             # Marvel Rivals logo
│
├── server/                      # Backend files
│   ├── server.js                # Express server setup
│   ├── claude-api.js            # Claude API integration
│   └── data-processor.js        # Functions to process game data
│
├── utils/                       # Utility scripts
│   ├── data-converter.py        # Convert raw data to JSON/CSV
│   └── prompt-tester.py         # Test different prompt variations
│
├── test_results/                # Storage for prompt test results
├── package.json                 # Node.js package configuration
├── .env                         # Environment variables (API keys)
└── README.md                    # Project documentation
```

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm
- Python 3.6+ (for utility scripts)
- Anthropic API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/marvel-rivals-assistant.git
   cd marvel-rivals-assistant
   ```

2. Install Node dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file to add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. Convert and prepare game data
   ```bash
   python utils/data-converter.py
   ```
   Select option 6 to convert all data types.

5. Start the server
   ```bash
   npm start
   ```

6. Open your browser to `http://localhost:3000`

## Development

To run the project in development mode with auto-restart:

```bash
npm run dev
```

## Adding Custom Marvel Rivals Data

You can update the game data when new patches or characters are released:

1. Edit the appropriate sections in the data conversion script:
   - `utils/data-converter.py`

2. Run the converter to update your JSON files:
   ```bash
   npm run convert-data
   ```

## Prompt Testing and Evaluation

To test different prompt strategies and evaluate response quality:

1. Define test questions and prompt variations in `utils/prompt-tester.py`

2. Run the tester:
   ```bash
   python utils/prompt-tester.py
   ```

3. Review the generated HTML report in the `test_results/` directory

## Response Format

The assistant provides responses in a structured XML format:

```xml
<response>
  <question_analysis>
    Understanding of the query type and context
  </question_analysis>
  <main_response>
    Detailed answer with strategic recommendations
    and relevant game information
  </main_response>
  <additional_tips>
    Extra helpful information based on question context
  </additional_tips>
</response>
```

## Example Queries

- "What's the best counter to Storm?"
- "I'm a beginner in Bronze rank, which characters should I play?"
- "How do team-ups work in Marvel Rivals?"
- "What's a good team composition for Gold rank?"
- "How do I use Rocket Raccoon effectively?"
- "What synergies work well with Thor?"
- "Which characters are good for handling aggressive Duelist teams?"

## Future Enhancements

- User accounts to save favorite characters and team compositions
- Integration with game stats APIs for real-time data
- Mobile app version
- Advanced data visualization for character statistics
- Expanded prompt testing framework for continuous improvement

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Marvel Rivals game data and statistics
- Anthropic for the Claude AI API
- Contributors and testers

## Disclaimer

This project is not affiliated with or endorsed by Marvel, the developers of Marvel Rivals, or Anthropic. All game data is used for educational and informational purposes only.
