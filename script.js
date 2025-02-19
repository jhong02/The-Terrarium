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
    // Hide the main content and show the loading screen
    document.getElementById("main-content").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("loading").style.display = "flex";

    // Redirect after 1 second
    setTimeout(() => {
        window.location.href = destination;
    }, 1000);
}