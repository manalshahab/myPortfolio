class Chatbot {
    constructor() {
        this.messages = [];
        this.responses = {
            "hello": "Hi! I'm Manal's portfolio assistant. I can tell you about her projects, skills, experience, and how to get in touch. What would you like to know?",
            "projects": "Manal has worked on several exciting projects including:\n- ESP32 Wireless Controller System\n- University Social Media App\n- FPGA Whack-A-Mole Game\nWhich project would you like to know more about?",
            "esp32": "The ESP32 Wireless Controller System is a sophisticated IoT project that features OTA firmware updates and complex network configurations. It was built using C++ and demonstrates Manal's embedded systems expertise.",
            "social": "The University Social Media App is a LinkedIn-like platform built with React.js, PHP, and MySQL. It helps university students showcase their academic achievements and connect with peers.",
            "fpga": "The FPGA Whack-A-Mole Game is an interactive hardware implementation on a DE10 board using Verilog, showcasing Manal's hardware programming capabilities.",
            "skills": "Manal's key technical skills include:\n- Programming: Python, Java, C/C++, JavaScript, React.js, Node.js\n- Tools: Power BI, Docker, Django, Git\n- Hardware: STM, ESP32, FPGA, Nvidia Jetson Nano\nWhich area would you like to know more about?",
            "experience": "Manal has valuable industry experience including:\n- Data Engineering & Analytics Coop at University of Manitoba\n- API Integration Engineer Intern at Vosyn AI\n- Student Advancement Services Analyst\nWhich role would you like to learn more about?",
            "contact": "You can reach Manal through:\n- Email: manalshahab7@gmail.com\n- LinkedIn: linkedin.com/in/manal-shahab-b9974a23a\n- Or check out her GitHub profile!",
            "education": "Manal is a final year Computer Engineering student at the University of Manitoba. She also holds certifications in Machine Learning from Stanford University and Data Science from the University of Michigan.",
            "default": "I'm not sure about that. You can ask me about Manal's projects, skills, experience, education, or how to get in contact!"
        };
    }

    addMessage(message, isUser = true) {
        this.messages.push({
            content: message,
            isUser: isUser,
            timestamp: new Date()
        });
    }

    generateResponse(userInput) {
        const input = userInput.toLowerCase();
        let response = this.responses.default;

        // Check for keywords in user input
        for (const [key, value] of Object.entries(this.responses)) {
            if (input.includes(key)) {
                response = value;
                break;
            }
        }

        this.addMessage(userInput, true);
        this.addMessage(response, false);
        return response;
    }
}

// Initialize chatbot UI
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new Chatbot();
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    
    // Create chatbot toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'chatbot-toggle';
    toggleButton.innerHTML = '<i class="fas fa-comments"></i>';
    
    // Create chat interface
    const chatInterface = document.createElement('div');
    chatInterface.className = 'chatbot-interface';
    chatInterface.innerHTML = `
        <div class="chatbot-header">
            <h3>Portfolio Assistant</h3>
            <button class="chatbot-close">&times;</button>
        </div>
        <div class="chatbot-messages"></div>
        <div class="chatbot-input">
            <input type="text" placeholder="Type your message...">
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    
    chatbotContainer.appendChild(toggleButton);
    chatbotContainer.appendChild(chatInterface);
    document.body.appendChild(chatbotContainer);
    
    // Event listeners
    toggleButton.addEventListener('click', () => {
        chatInterface.classList.toggle('active');
        if (chatInterface.classList.contains('active')) {
            chatInterface.querySelector('input').focus();
        }
    });
    
    chatInterface.querySelector('.chatbot-close').addEventListener('click', () => {
        chatInterface.classList.remove('active');
    });
    
    const messageContainer = chatInterface.querySelector('.chatbot-messages');
    const inputField = chatInterface.querySelector('input');
    const submitButton = chatInterface.querySelector('button[type="submit"]');
    
    function addMessageToUI(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    function handleSubmit() {
        const message = inputField.value.trim();
        if (message) {
            addMessageToUI(message, true);
            const response = chatbot.generateResponse(message);
            addMessageToUI(response, false);
            inputField.value = '';
        }
    }
    
    submitButton.addEventListener('click', handleSubmit);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });
    
    // Add initial greeting
    setTimeout(() => {
        addMessageToUI(chatbot.responses.hello, false);
    }, 500);
}); 
