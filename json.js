async function newQuote() {
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");

  quoteText.textContent = "Fetching quote...";
  authorText.textContent = "";

  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(
      "https://zenquotes.io/api/random?timestamp=" + new Date().getTime()
    );

    const response = await fetch(proxyUrl + targetUrl, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);

    quoteText.textContent = data[0].q;
    authorText.textContent = data[0].a;
  } catch (error) {
    quoteText.textContent = "Oops! Could not fetch a new quote.";
    authorText.textContent = "";
    console.error("Error fetching quote:", error);
  }
}
