// Random Quote Generator using ZenQuotes API + Async/Await + Error Handling

const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const statusEl = document.getElementById("status");

// Fetch a random quote from ZenQuotes API via AllOrigins proxy
async function newQuote() {
  quoteText.textContent = "Fetching a new quote...";
  authorText.textContent = "";
  statusEl.textContent = "Loading...";

  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(
      "https://zenquotes.io/api/random?timestamp=" + new Date().getTime()
    );

    const response = await fetch(proxyUrl + targetUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Network response was not ok");

    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);

    const quote = data[0].q;
    const author = data[0].a;

    quoteText.textContent = quote;
    authorText.textContent = "— " + author;
    statusEl.textContent = "Quote loaded successfully.";
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Oops! Could not fetch a new quote.";
    authorText.textContent = "";
    statusEl.textContent = "An error occurred while fetching the quote.";
  }
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
window.addEventListener("load", newQuote);
