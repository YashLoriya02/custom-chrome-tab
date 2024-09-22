document.addEventListener("DOMContentLoaded", () => {

    // Tab Count
    chrome.runtime.sendMessage({ type: "getTabCount" }, (response) => {
        document.getElementById("tab-count").textContent = response.tabCount;
    });

    // Battery
    if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
            const updateBatteryStatus = () => {
                document.getElementById("battery-percentage").textContent = Math.round(battery.level * 100) + "%";
            }
            updateBatteryStatus();
            battery.addEventListener("levelchange", updateBatteryStatus);
        });
    } else {
        document.getElementById("battery-percentage").textContent = "Battery API not supported!";
    }

    // Day and Date
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const result = new Date()

    document.getElementById('date').textContent = result.toISOString().split('T')[0]
    document.getElementById('day').textContent = days[result.getDay()]

    // Quotes
    const quotes = [
        "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
        "The only place where success comes before work is in the dictionary.",
        "Great things come from hard work and perseverance. No excuses.",
        "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
        "Dreams don't work unless you do.",
        "Hard work beats talent when talent doesn't work hard.",
        "Don't stop when you're tired. Stop when you're done.",
        "The harder you work for something, the greater you'll feel when you achieve it.",
        "There is no substitute for hard work.",
        "Opportunities are usually disguised as hard work, so most people don't recognize them.",
        "Skills beats overconfidence, and experience beats skills."
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = randomQuote;

});

// Time
const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock()


// Google Search
document.getElementById('search').addEventListener("submit", (e) => {
    e.preventDefault()
    let query = document.getElementById('searchInput').value;
    document.getElementById('searchInput').value = ""
    if (query) {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank');
    }
})

