const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton= document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'http://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Reduce font size for long quote
    (data.content.length > 100) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    quoteText.innerText = data.content;

    // If the Author is blank, add 'Unknown'
    (data.author === '') ? authorText.innerText = 'Unknown' : authorText.innerText = data.author;

    removeLoadingSpinner();
  } catch (error) {
    console.log('Sorry, no quote was found', error);
  }
}

// Event Listener
newQuoteButton.addEventListener('click', getQuote);

twitterButton.addEventListener('click', () => {
  const quote = quoteText.innerText
  const author = authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
});

// On load
getQuote();