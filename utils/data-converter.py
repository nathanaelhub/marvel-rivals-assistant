import json
import os
import sys

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def convert_character_stats():
    """Convert character stats to JSON"""
    # Sample data - you'll replace this with your complete dataset
    data = [
        {"Rank": 1, "Character": "Storm", "Type": "Duelist", "PickRate": 3.73, "WinRate": 58.11},
        {"Rank": 2, "Character": "Mantis", "Type": "Strategist", "PickRate": 10.24, "WinRate": 55.65},
        {"Rank": 3, "Character": "Rocket Raccoon", "Type": "Strategist", "PickRate": 13.99, "WinRate": 55.23},
        # Add more characters here
    ]
    
    # Save to JSON file
    output_file = os.path.join(DATA_DIR, 'character_stats.json')
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Character stats saved to {output_file}")

def convert_team_synergies():
    """Convert team synergies to JSON"""
    # Sample data - you'll replace this with your complete dataset
    data = [
        {
            "TeamUpName": "Ragnarok Rebirth",
            "PrimaryHero": "Hela",
            "SecondaryHeroes": ["Loki", "Thor"],
            "Effect": "Hela gains a passive ability that allows her to resurrect one of her brothers."
        },
        # Add more team synergies here
    ]
    
    # Save to JSON file
    output_file = os.path.join(DATA_DIR, 'team_synergies.json')
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Team synergies saved to {output_file}")

def convert_character_abilities():
    """Convert character abilities to JSON"""
    # Sample data - you'll replace this with your complete dataset
    data = {
        "Adam Warlock": {
            "Normal": "Launch quantum energy to deal damage.",
            "Q": "Awaken the karma of allies to revive them.",
            "Left Shift": "Forge a soul bond with allies that grants healing.",
            "E": "Target an ally to send a bouncing stream of healing energy.",
            "Right Click": "Gather quantum energy into a cluster and launch it.",
            "Passive": "Upon death, move as a soul and reforge your body.",
            "Team-Up": "Enhance the rebirth power of Star‑Lord and Mantis."
        },
        # Add more character abilities here
    }
    
    # Save to JSON file
    output_file = os.path.join(DATA_DIR, 'character_abilities.json')
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Character abilities saved to {output_file}")

def convert_character_descriptions():
    """Convert character descriptions to JSON"""
    # Sample data - you'll replace this with your complete dataset
    data = [
        {
            "Character": "Bruce Banner (Hulk)",
            "Description": "A transforming tank who's able to leverage massive health bars and multiple lives to stay in the battle.",
            "Type": "Vanguard"
        },
        # Add more character descriptions here
    ]
    
    # Save to JSON file
    output_file = os.path.join(DATA_DIR, 'character_descriptions.json')
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Character descriptions saved to {output_file}")

def convert_game_modes():
    """Convert game modes to JSON"""
    # Sample data - you'll replace this with your complete dataset
    data = {
        "GameModes": [
            {
                "Name": "Quickplay",
                "Description": "Casual match mode for relaxed gameplay"
            },
            {
                "Name": "Ranked Competition",
                "Description": "Competitive ladder with multiple tiers",
                "Tiers": [
                    "Bronze", "Silver", "Gold", "Platinum", "Diamond", 
                    "Grandmaster", "Celestial", "Eternity", "Top 500"
                ]
            },
            # Add more game modes here
        ]
    }
    
    # Save to JSON file
    output_file = os.path.join(DATA_DIR, 'game_modes.json')
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Game modes saved to {output_file}")

def convert_all():
    """Convert all data types"""
    convert_character_stats()
    convert_team_synergies()
    convert_character_abilities()
    convert_character_descriptions()
    convert_game_modes()
    print("\nAll data conversion complete!")

if __name__ == "__main__":
    print("Marvel Rivals Data Converter")
    print("===========================")
    print("1. Convert character stats")
    print("2. Convert team synergies")
    print("3. Convert character abilities")
    print("4. Convert character descriptions")
    print("5. Convert game modes")
    print("6. Convert all data")
    print("0. Exit")
    
    choice = input("\nEnter your choice (0-6): ")
    
    if choice == '1':
        convert_character_stats()
    elif choice == '2':
        convert_team_synergies()
    elif choice == '3':
        convert_character_abilities()
    elif choice == '4':
        convert_character_descriptions()
    elif choice == '5':
        convert_game_modes()
    elif choice == '6':
        convert_all()
    else:
        print("Exiting...")
        sys.exit(0)