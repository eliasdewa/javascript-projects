const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton= document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading Spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get quote from API
async function getQuote() {
  loading();
  const apiUrl = 'http://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Reduce font size for long quote
    if (data.content.length > 100) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.content;
    // If the Author is blank, add 'Unknown'
    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.author;
    }
    // Stop Loader, Show quote
    complete();
  } catch (error) {
    console.log('Sorry, no quote was found', error);
  }
}
// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
// On load
getQuote();
