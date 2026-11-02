
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const quickButtons = document.querySelectorAll(".quick-btn");

const responses = [
    {
        keywords: ["track", "tracking", "order status", "where is my order"],
        answer:
            "You can track your order using the tracking link sent to your registered email or phone. Please check your order confirmation for details."
    },
    {
        keywords: ["return", "refund", "exchange"],
        answer:
            "Items can generally be returned within 7 days of delivery if they meet the return conditions. Please keep your order ID ready when contacting support."
    },
    {
        keywords: ["delivery", "shipping", "arrive", "when will"],
        answer:
            "Standard delivery usually takes 3–5 business days. Delivery time may vary depending on your location and the product."
    },
    {
        keywords: ["payment", "pay", "upi", "card", "cash"],
        answer:
            "We support common payment options such as UPI, debit cards, credit cards, and cash on delivery where available."
    },
    {
        keywords: ["hello", "hi", "hey"],
        answer:
            "Hello! 👋 I can help with order tracking, returns, delivery, and payment questions."
    },
    {
        keywords: ["thank", "thanks"],
        answer:
            "You're welcome! 😊 Is there anything else I can help you with?"
    }
];

function addMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("bot-message");
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    messageElement.appendChild(paragraph);
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    for (const item of responses) {
        const matched = item.keywords.some(keyword =>
            message.includes(keyword)
        );

        if (matched) {
            return item.answer;
        }
    }

    return "Sorry, I don't have an answer for that yet. Please ask about order tracking, returns, delivery, or payments.";
}

function sendMessage(message) {
    const cleanMessage = message.trim();

    if (cleanMessage === "") {
        return;
    }

    addMessage(cleanMessage, "user");

    const botResponse = getBotResponse(cleanMessage);

    setTimeout(() => {
        addMessage(botResponse, "bot");
    }, 400);
}

chatForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const message = userInput.value;
    sendMessage(message);

    userInput.value = "";
    userInput.focus();
});

quickButtons.forEach(button => {
    button.addEventListener("click", function () {
        const question = button.dataset.question;
        sendMessage(question);
    });
});
