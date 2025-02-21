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
    // Ensure the loading screen exists
    let loadingScreen = document.getElementById("loading");

    if (!loadingScreen) {
        console.error("Loading screen element not found.");
        window.location.href = destination; // Fallback redirect
        return;
    }

    // Hide the main content and show the loading screen
    document.getElementById("main-content").style.display = "none";
    document.getElementById("footer").style.display = "none";
    loadingScreen.style.display = "flex";

    // Redirect after 1 seconds to the specified page
    setTimeout(() => {
        window.location.href = destination;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const chatroomItems = document.querySelectorAll(".chatroom-item");
    const messageInput = document.getElementById("messageInput");

    chatroomItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove active class from all items
            chatroomItems.forEach(el => el.classList.remove("active"));
            
            // Add active class to the clicked item
            this.classList.add("active");

            // Open the selected chatroom
            openChat(this.innerText.trim());
        });
    });

    // Listen for Enter key to send message
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent new line in input field
            sendMessage();
        }
    });
});

// Editable list of random responses (Change as needed)
const responses = [
    "Whatever...",
    "I miss goobi (my cat)",
    "Allo!",
    "mmm matcha sounds so good rn.",
    "I want hotpot",
    "AAAAAAAAAAHHHHHHHHHHH",
    "I AM TRAPPED IN THIS CHATROOM HELP ME.",
    "GORB",
    "She splinggin on my dorf call her splinggindorf",
    "i dislike mangoe"
];

// Store chat messages separately for each chatroom
const chats = {
    "User_1": [],
    "User_2": [],
    "User_3": [],
    "User_4": [],
    "User_5": [],
    "User_6": [],
    "User_7": [],
    "User_8": []
};

let currentChat = null;

function openChat(user) {
    // Hide the welcome screen
    document.getElementById("welcomeScreen").style.display = "none";

    // Show chat messages and input field
    document.getElementById("chat-messages").style.display = "block";
    document.getElementById("chatInput").style.display = "flex";

    // Update chatroom title
    document.getElementById("chatroom-title").innerText = user;

    // Set the current chat user
    currentChat = user;

    // Load previous messages
    const chatMessagesDiv = document.getElementById("chat-messages");
    chatMessagesDiv.innerHTML = ""; // Clear the chat window

    if (chats[user].length === 0) {
        chatMessagesDiv.innerHTML = "<p>No messages yet. Start chatting!</p>";
    } else {
        chats[user].forEach(msg => {
            let messageBubble = document.createElement("div");
            messageBubble.classList.add("message", msg.sender === "You" ? "right" : "left");
            messageBubble.innerText = msg.text;
            chatMessagesDiv.appendChild(messageBubble);
        });
    }
}

function sendMessage() {
    if (!currentChat) {
        alert("Select a chatroom first!");
        return;
    }

    let input = document.getElementById("messageInput");
    let messageText = input.value.trim();

    if (messageText === "") return; // Don't send empty messages

    let chatMessagesDiv = document.getElementById("chat-messages");

    // Remove "No messages yet" placeholder if present
    let placeholder = chatMessagesDiv.querySelector("p");
    if (placeholder && placeholder.innerText.includes("No messages yet")) {
        placeholder.remove();
    }

    // Create a wrapper div to ensure proper alignment
    let userMessageWrapper = document.createElement("div");
    userMessageWrapper.classList.add("message-wrapper", "right-wrapper");

    let userMessageBubble = document.createElement("div");
    userMessageBubble.classList.add("message", "right");
    userMessageBubble.innerText = messageText;
    
    userMessageWrapper.appendChild(userMessageBubble);
    chatMessagesDiv.appendChild(userMessageWrapper);

    chats[currentChat].push({ sender: "You", text: messageText });

    input.value = ""; // Clear input field

    // Generate and send a single random bot response
    let randomResponse = getRandomResponses(1)[0];

    setTimeout(() => {
        let botMessageWrapper = document.createElement("div");
        botMessageWrapper.classList.add("message-wrapper", "left-wrapper");

        let botMessageBubble = document.createElement("div");
        botMessageBubble.classList.add("message", "left");
        botMessageBubble.innerText = randomResponse;

        botMessageWrapper.appendChild(botMessageBubble);
        chatMessagesDiv.appendChild(botMessageWrapper);

        chats[currentChat].push({ sender: "Bot", text: randomResponse });
    }, 500); // Delay bot response by 500ms
}



// Function to get N random responses from the list
function getRandomResponses(count) {
    let shuffled = [...responses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

