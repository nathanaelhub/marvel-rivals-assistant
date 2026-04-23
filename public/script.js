document.addEventListener('DOMContentLoaded', function() {
    const chatHistory = document.getElementById('chat-history');
    const userInput = document.getElementById('user-input');
    const submitBtn = document.getElementById('submit-btn');
    
    // Handle Enter key press
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitBtn.click();
        }
    });
    
    submitBtn.addEventListener('click', async function() {
        const question = userInput.value.trim();
        if (!question) return;
        
        // Add user question to chat
        addMessageToChat('user', question);
        userInput.value = '';
        
        // Show loading indicator
        const loadingId = addMessageToChat('assistant', 'Analyzing your question...');
        
        try {
            // Make API call to your backend
            const response = await fetch('/api/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
            
            if (!response.ok) {
                throw new Error('Server error');
            }
            
            const data = await response.json();
            
            // Replace loading message with actual response
            updateMessage(loadingId, data.response);
            
        } catch (error) {
            console.error('Error:', error);
            updateMessage(loadingId, 'Sorry, there was an error processing your request. Please try again later.');
        }
    });
    
    function addMessageToChat(role, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role);
        const id = 'msg-' + Date.now();
        messageDiv.id = id;
        
        // Format message based on XML tags if from assistant
        if (role === 'assistant' && message.includes('<response>')) {
            // Parse and format XML response
            const formatted = formatResponse(message);
            messageDiv.innerHTML = formatted;
        } else {
            messageDiv.textContent = message;
        }
        
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return id;
    }
    
    function updateMessage(id, message) {
        const messageDiv = document.getElementById(id);
        if (!messageDiv) return;
        
        if (message.includes('<response>')) {
            // Parse and format XML response
            const formatted = formatResponse(message);
            messageDiv.innerHTML = formatted;
        } else {
            messageDiv.textContent = message;
        }
        
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatResponse(response) {
        // Extract parts from XML response, escaping before we build HTML
        const questionAnalysis = escapeHtml(extractTag(response, 'question_analysis') || '');
        const mainResponse = escapeHtml(extractTag(response, 'main_response') || response);
        const additionalTips = escapeHtml(extractTag(response, 'additional_tips') || '');
        
        let html = '<div class="response-container">';
        
        if (questionAnalysis) {
            html += `<div class="response-analysis">${questionAnalysis}</div>`;
        }
        
        html += `<div class="response-main">${mainResponse.replace(/\n/g, '<br>')}</div>`;
        
        if (additionalTips) {
            html += `
                <div class="response-tips">
                    <h4>Additional Tips:</h4>
                    ${additionalTips.replace(/\n/g, '<br>')}
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    function extractTag(text, tagName) {
        const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 's');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
    }
});