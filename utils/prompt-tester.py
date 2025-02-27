import json
import os
import requests
from datetime import datetime

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESULTS_DIR = os.path.join(BASE_DIR, 'test_results')

# Ensure results directory exists
os.makedirs(RESULTS_DIR, exist_ok=True)

# Test questions
TEST_QUESTIONS = [
    "What's the best counter to Storm?",
    "I'm a beginner, which characters should I play?",
    "How do team-ups work?",
    "What's a good team composition for Gold rank?",
    "How do I use Rocket Raccoon effectively?"
]

# Prompt variations to test
PROMPT_VARIATIONS = {
    "base_prompt": """
    You are an AI Strategy Assistant for Marvel Rivals, designed to help players with both strategy and general game knowledge.
    
    CORE FUNCTIONS:
    1. Strategy Analysis
    2. Game Knowledge
    
    Your responses should be:
    - Clear and actionable
    - Supported by game data
    - Appropriately detailed for the query
    - Encouraging and helpful
    """,
    
    "structured_format": """
    You are an AI Strategy Assistant for Marvel Rivals, designed to help players with both strategy and general game knowledge.
    
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
    - Context: Consider game mode, team composition, and player preferences
    - Accuracy: Use verified game data for all recommendations
    """,
    
    "with_examples": """
    You are an AI Strategy Assistant for Marvel Rivals, designed to help players with both strategy and general game knowledge.
    
    Example responses:
    
    Question: "How do I counter Storm?"
    <response>
      <question_analysis>This is a strategic question about countering a specific character (Storm).</question_analysis>
      <main_response>
        Storm is a high-mobility Duelist with strong aerial control. Effective counters include:
        
        1. Hawkeye - His Hypersonic Arrow can knock down flying heroes like Storm
        2. Black Widow - Her sniper abilities can target Storm at range
        3. Magneto - His magnetic abilities can control Storm's movement
        
        When facing Storm, focus on:
        - Interrupting her Omega Hurricane ability
        - Using ground-based characters with high damage
        - Avoiding clustering with teammates during her Weather Control
      </main_response>
      <additional_tips>
        Storm thrives in open spaces where she can utilize her aerial mobility. Try to force engagements in enclosed areas to limit her effectiveness.
      </additional_tips>
    </response>
    """,
    
    "data_rich": """
    You are an AI Strategy Assistant for Marvel Rivals, designed to help players with both strategy and general game knowledge.
    
    Character Data:
    - Storm: Duelist, Win Rate 58.11%, Pick Rate 3.73%
    - Mantis: Strategist, Win Rate 55.65%, Pick Rate 10.24%
    - Rocket Raccoon: Strategist, Win Rate 55.23%, Pick Rate 13.99%
    
    Team-Up Synergies:
    - Ragnarok Rebirth: Hela, Loki, Thor
    - Metallic Chaos: Scarlet Witch, Magneto
    - Voltaic Union: Thor, Storm, Captain America
    
    Game Modes:
    - Quickplay (Casual)
    - Ranked (Bronze through Eternity)
    - AI Battles (1-3 stars difficulty)
    """
}

def test_prompt(prompt_name, prompt_text, question):
    """
    Test a prompt with a question using your API
    
    In a real implementation, this would call your server endpoint
    For this example, we'll simulate response generation
    """
    
    # In a real implementation, this would be:
    # response = requests.post('http://localhost:3000/api/ask', 
    #                         json={'question': question, 'system_prompt': prompt_text})
    # return response.json()['response']
    
    # For demonstration, just return a placeholder
    return f"This is a simulated response for prompt '{prompt_name}' and question '{question}'"

def run_tests():
    """Run all tests and generate a report"""
    results = {}
    
    for prompt_name, prompt_text in PROMPT_VARIATIONS.items():
        prompt_results = []
        
        print(f"\nTesting prompt: {prompt_name}")
        for question in TEST_QUESTIONS:
            print(f"  Question: {question}")
            
            response = test_prompt(prompt_name, prompt_text, question)
            prompt_results.append({
                'question': question,
                'response': response
            })
        
        results[prompt_name] = {
            'prompt': prompt_text,
            'results': prompt_results
        }
    
    # Save results
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(RESULTS_DIR, f'prompt_test_results_{timestamp}.json')
    
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nTest results saved to {output_file}")
    
    # Generate HTML report
    generate_html_report(results, timestamp)

def generate_html_report(results, timestamp):
    """Generate an HTML report from test results"""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Marvel Rivals Prompt Test Results</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            h1 { color: #e62429; }
            .prompt-section { margin-bottom: 30px; border: 1px solid #ccc; padding: 15px; border-radius: 5px; }
            .prompt-name { font-weight: bold; font-size: 1.2em; color: #333; }
            .prompt-text { background-color: #f5f5f5; padding: 10px; border-radius: 5px; white-space: pre-wrap; }
            .question { margin-top: 20px; font-weight: bold; }
            .response { background-color: #eaf6ff; padding: 10px; border-radius: 5px; margin-top: 5px; white-space: pre-wrap; }
        </style>
    </head>
    <body>
        <h1>Marvel Rivals Prompt Test Results</h1>
        <p>Generated: %s</p>
    """ % (datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    
    for prompt_name, data in results.items():
        html += f"""
        <div class="prompt-section">
            <div class="prompt-name">{prompt_name}</div>
            <div class="prompt-text">{data['prompt']}</div>
            
            <h3>Test Results:</h3>
        """
        
        for result in data['results']:
            html += f"""
            <div class="question">Q: {result['question']}</div>
            <div class="response">{result['response']}</div>
            """
        
        html += "</div>"
    
    html += """
    </body>
    </html>
    """
    
    output_file = os.path.join(RESULTS_DIR, f'prompt_test_report_{timestamp}.html')
    with open(output_file, 'w') as f:
        f.write(html)
    
    print(f"HTML report generated: {output_file}")

if __name__ == "__main__":
    print("Marvel Rivals Prompt Tester")
    print("===========================")
    
    choice = input("Run prompt tests? (y/n): ")
    if choice.lower() == 'y':
        run_tests()
    else:
        print("Exiting...")