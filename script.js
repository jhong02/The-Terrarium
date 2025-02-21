// ========== General Functions ==========
function handleAbout() {
    alert("Welcome to The Terrarium! This is a simple chat interface.");
}

function handleNewMessage() {
    alert("New message functionality coming soon!");
}

function handleLogoClick() {
    alert("You clicked the logo!");
}

function redirectToChat() {
    window.location.href = "index.html";
}

function showLoadingScreen(destination) {
    const loadingScreen = document.getElementById("loading");

    if (!loadingScreen) {
        console.error("Loading screen element not found.");
        window.location.href = destination; // Fallback redirect
        return;
    }

    document.getElementById("main-content").style.display = "none";
    document.getElementById("footer").style.display = "none";
    loadingScreen.style.display = "flex";

    setTimeout(() => {
        window.location.href = destination;
    }, 1000);
}

// ========== Username Handling ==========
function storeUsername() {
    const username = document.getElementById("usernameInput").value.trim();

    if (!username) {
        alert("Please enter your name before proceeding!");
        return;
    }

    localStorage.setItem("username", username);
    window.location.href = "index.html";
}

function updateUsernameOnPage() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        const displayUsername = document.getElementById("displayUsername");
        if (displayUsername) displayUsername.innerText = storedUsername;
    }
}

// ========== Chat Functionality ==========
const chats = {
    "User_1": [], "User_2": [], "User_3": [], "User_4": [],
    "User_5": [], "User_6": [], "User_7": [], "User_8": []
};

let currentChat = null;

function openChat(user) {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("chat-messages").style.display = "block";
    document.getElementById("chatInput").style.display = "flex";

    document.getElementById("chatroom-title").innerText = user;
    currentChat = user;

    const chatMessagesDiv = document.getElementById("chat-messages");
    chatMessagesDiv.innerHTML = "";

    if (chats[user].length === 0) {
        chatMessagesDiv.innerHTML = "<p>No messages yet. Start chatting!</p>";
    } else {
        chats[user].forEach(msg => {
            appendMessage(msg.text, msg.sender === "You" ? "right" : "left");
        });
    }
}

function sendMessage() {
    if (!currentChat) {
        alert("Select a chatroom first!");
        return;
    }

    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();
    if (!messageText) return;

    const chatMessagesDiv = document.getElementById("chat-messages");

    // Remove placeholder if present
    const placeholder = chatMessagesDiv.querySelector("p");
    if (placeholder && placeholder.innerText.includes("No messages yet")) {
        placeholder.remove();
    }

    appendMessage(messageText, "right");
    chats[currentChat].push({ sender: "You", text: messageText });

    input.value = "";

    // Generate and send a random bot response after a delay
    setTimeout(() => {
        const botResponse = getRandomResponses(1)[0];
        appendMessage(botResponse, "left");
        chats[currentChat].push({ sender: "Bot", text: botResponse });
    }, 500);
}

function appendMessage(text, alignment) {
    const chatMessagesDiv = document.getElementById("chat-messages");

    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("message-wrapper", `${alignment}-wrapper`);

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message", alignment);
    messageBubble.innerText = text;

    messageWrapper.appendChild(messageBubble);
    chatMessagesDiv.appendChild(messageWrapper);
}

// ========== Utility Functions ==========
function getRandomResponses(count) {
    const responses = [
        "Whatever...", "I miss goobi (my cat)", "Allo!", "mmm matcha sounds so good rn.",
        "I want hotpot", "AAAAAAAAAAHHHHHHHHHHH", "I AM TRAPPED IN THIS CHATROOM HELP ME.",
        "GORB", "She splinggin on my dorf call her splinggindorf", "i dislike mangoe"
    ];
    return responses.sort(() => 0.5 - Math.random()).slice(0, count);
}

// ========== Event Listeners ==========
document.addEventListener("DOMContentLoaded", function () {
    const chatroomItems = document.querySelectorAll(".chatroom-item");
    const messageInput = document.getElementById("messageInput");
    const usernameInput = document.getElementById("usernameInput");

    chatroomItems.forEach(item => {
        item.addEventListener("click", function () {
            chatroomItems.forEach(el => el.classList.remove("active"));
            this.classList.add("active");
            openChat(this.innerText.trim());
        });
    });

    if (messageInput) {
        messageInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    if (usernameInput) usernameInput.focus();
    updateUsernameOnPage();
});
