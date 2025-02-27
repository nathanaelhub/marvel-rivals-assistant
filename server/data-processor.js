const fs = require('fs').promises;
const path = require('path');

// Data file paths
const DATA_DIR = path.join(__dirname, '../data');
const CHARACTER_STATS_FILE = path.join(DATA_DIR, 'character_stats.json');
const TEAM_SYNERGIES_FILE = path.join(DATA_DIR, 'team_synergies.json');
const CHARACTER_ABILITIES_FILE = path.join(DATA_DIR, 'character_abilities.json');
const CHARACTER_DESCRIPTIONS_FILE = path.join(DATA_DIR, 'character_descriptions.json');
const GAME_MODES_FILE = path.join(DATA_DIR, 'game_modes.json');

// Cache for loaded data
const dataCache = {
    characterStats: null,
    teamSynergies: null,
    characterAbilities: null,
    characterDescriptions: null,
    gameModes: null,
    lastLoaded: null
};

/**
 * Load all game data from files
 */
async function loadAllData() {
    try {
        const now = Date.now();
        // Reload data if cache is more than 1 hour old
        if (!dataCache.lastLoaded || now - dataCache.lastLoaded > 3600000) {
            console.log('Loading game data from files...');
            
            dataCache.characterStats = JSON.parse(await fs.readFile(CHARACTER_STATS_FILE, 'utf8'));
            dataCache.teamSynergies = JSON.parse(await fs.readFile(TEAM_SYNERGIES_FILE, 'utf8'));
            dataCache.characterAbilities = JSON.parse(await fs.readFile(CHARACTER_ABILITIES_FILE, 'utf8'));
            dataCache.characterDescriptions = JSON.parse(await fs.readFile(CHARACTER_DESCRIPTIONS_FILE, 'utf8'));
            dataCache.gameModes = JSON.parse(await fs.readFile(GAME_MODES_FILE, 'utf8'));
            
            dataCache.lastLoaded = now;
            console.log('Game data loaded successfully');
        }
    } catch (error) {
        console.error('Error loading game data:', error);
        throw new Error('Failed to load game data');
    }
}

/**
 * Get character data by name
 * @param {string} name - Character name
 */
function getCharacterData(name) {
    const normalizedName = name.toLowerCase();
    const character = dataCache.characterStats.find(
        char => char.Character.toLowerCase() === normalizedName
    );
    
    if (!character) return null;
    
    // Find abilities
    const abilities = dataCache.characterAbilities[character.Character] || {};
    
    // Find description
    const description = dataCache.characterDescriptions.find(
        desc => desc.Character.toLowerCase().includes(normalizedName)
    );
    
    // Find team synergies
    const synergies = dataCache.teamSynergies.filter(
        synergy => 
            synergy.PrimaryHero.toLowerCase() === normalizedName ||
            synergy.SecondaryHeroes.some(hero => hero.toLowerCase() === normalizedName)
    );
    
    return {
        ...character,
        abilities,
        description: description?.Description || '',
        synergies
    };
}

/**
 * Extract relevant character names from a question
 * @param {string} question - The player's question
 * @returns {string[]} - Array of character names found in the question
 */
function extractCharacterNames(question) {
    const allCharacters = dataCache.characterStats.map(char => char.Character);
    
    return allCharacters.filter(character => 
        question.toLowerCase().includes(character.toLowerCase())
    );
}

/**
 * Get data relevant to the question
 * @param {string} question - The player's question
 */
async function getRelevantData(question) {
    // Load data if not already cached
    if (!dataCache.lastLoaded) {
        await loadAllData();
    }
    
    const lowercaseQuestion = question.toLowerCase();
    const result = {};
    
    // Extract mentioned characters
    const mentionedCharacters = extractCharacterNames(question);
    
    if (mentionedCharacters.length > 0) {
        result.characters = mentionedCharacters.map(name => getCharacterData(name));
    }
    
    // Check for team composition questions
    if (lowercaseQuestion.includes('team') || lowercaseQuestion.includes('composition') || lowercaseQuestion.includes('comp')) {
        // Add top 10 characters by win rate
        result.topCharacters = dataCache.characterStats
            .sort((a, b) => b.WinRate - a.WinRate)
            .slice(0, 10);
            
        // Add role distribution
        result.roleCounts = {
            Duelist: dataCache.characterStats.filter(char => char.Type === 'Duelist').length,
            Strategist: dataCache.characterStats.filter(char => char.Type === 'Strategist').length,
            Vanguard: dataCache.characterStats.filter(char => char.Type === 'Vanguard').length
        };
    }
    
    // Check for synergy questions
    if (lowercaseQuestion.includes('synergy') || lowercaseQuestion.includes('team-up') || lowercaseQuestion.includes('teamup')) {
        result.teamSynergies = dataCache.teamSynergies;
    }
    
    // Check for game mode questions
    if (lowercaseQuestion.includes('mode') || lowercaseQuestion.includes('rank') || lowercaseQuestion.includes('ranked')) {
        result.gameModes = dataCache.gameModes;
    }
    
    // If no specific data found, include some basic stats
    if (Object.keys(result).length === 0) {
        result.basicStats = {
            totalCharacters: dataCache.characterStats.length,
            roleDistribution: {
                Duelist: dataCache.characterStats.filter(char => char.Type === 'Duelist').length,
                Strategist: dataCache.characterStats.filter(char => char.Type === 'Strategist').length,
                Vanguard: dataCache.characterStats.filter(char => char.Type === 'Vanguard').length
            },
            topCharacters: dataCache.characterStats
                .sort((a, b) => b.WinRate - a.WinRate)
                .slice(0, 5)
        };
    }
    
    return result;
}

module.exports = {
    loadAllData,
    getRelevantData,
    getCharacterData
};