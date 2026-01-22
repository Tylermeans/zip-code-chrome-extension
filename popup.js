// State management
let zipCodeData = [];
let isDataLoaded = false;
let searchTimeout = null;
const SEARCH_DELAY = 300; // milliseconds to wait after user stops typing

// Load zip code data when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  await loadZipCodeData();
  initializeEventListeners();
});

// Load zip code data from JSON file
async function loadZipCodeData() {
  try {
    const response = await fetch('zipcodes.json');
    zipCodeData = await response.json();
    isDataLoaded = true;
    console.log(`Loaded ${zipCodeData.length} zip codes`);
  } catch (error) {
    console.error('Error loading zip code data:', error);
    showError('Failed to load zip code database');
  }
}

// Initialize all event listeners
function initializeEventListeners() {
  const searchInput = document.getElementById('search-input');

  // Auto-search as user types with debouncing
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // If input is empty, show initial state
    if (!query) {
      showInitialState();
      updateHint('Type to search...');
      return;
    }

    // Show loading state immediately for better UX
    if (query.length >= 2) {
      showLoading();
    }

    // Debounce the search
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, SEARCH_DELAY);
  });

  // Clear on escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      showInitialState();
      updateHint('Type to search...');
    }
  });
}

// Perform search based on input
function performSearch(query) {
  if (!isDataLoaded) {
    showError('Data is still loading, please wait...');
    return;
  }

  // Detect search type and perform appropriate search
  const searchType = detectSearchType(query);

  if (searchType === 'zip') {
    searchByZip(query);
  } else if (searchType === 'city-state') {
    searchByCityState(query);
  } else {
    // Try partial matches
    searchPartial(query);
  }
}

// Detect what type of search the user is performing
function detectSearchType(query) {
  // Check if it's a zip code (5 digits or partial)
  if (/^\d{5}$/.test(query)) {
    return 'zip';
  }

  // Check if it contains a comma (city, state format)
  if (query.includes(',')) {
    return 'city-state';
  }

  // Check if it's only digits (partial zip)
  if (/^\d+$/.test(query)) {
    return 'partial-zip';
  }

  // Default to city search
  return 'partial';
}

// Search by zip code
function searchByZip(zip) {
  updateHint('Searching by zip code...');

  const results = zipCodeData.filter(entry => entry.zip === zip);

  if (results.length > 0) {
    updateHint(`Found ${results.length} result${results.length > 1 ? 's' : ''}`);
  }

  displayResults(results);
}

// Search by city and state
function searchByCityState(query) {
  updateHint('Searching by city and state...');

  // Split by comma
  const parts = query.split(',').map(p => p.trim());

  if (parts.length !== 2) {
    showError('Format: City, State (e.g., New York, NY)');
    return;
  }

  const [city, state] = parts;

  if (!city || !state) {
    showError('Please enter both city and state');
    return;
  }

  // Normalize inputs
  const cityLower = city.toLowerCase();
  const stateLower = state.toLowerCase();

  // Search for matching zip codes
  const results = zipCodeData.filter(entry => {
    const entryCity = entry.city.toLowerCase();
    const entryState = entry.state.toLowerCase();
    const entryStateAbbr = entry.state_abbr.toLowerCase();

    return entryCity === cityLower &&
           (entryState === stateLower || entryStateAbbr === stateLower);
  });

  if (results.length > 0) {
    updateHint(`Found ${results.length} zip code${results.length > 1 ? 's' : ''}`);
  }

  displayResults(results);
}

// Search with partial matches
function searchPartial(query) {
  const queryLower = query.toLowerCase();

  // If it's digits, search zip codes starting with those digits
  if (/^\d+$/.test(query)) {
    updateHint('Searching zip codes...');

    const results = zipCodeData.filter(entry =>
      entry.zip.startsWith(query)
    );

    // Limit partial zip results to prevent overwhelming the UI
    const limitedResults = results.slice(0, 50);

    if (limitedResults.length > 0) {
      updateHint(`Found ${results.length} zip code${results.length > 1 ? 's' : ''}${results.length > 50 ? ' (showing first 50)' : ''}`);
    }

    displayResults(limitedResults);
    return;
  }

  // Otherwise search cities starting with the query
  updateHint('Searching cities...');

  const results = zipCodeData.filter(entry =>
    entry.city.toLowerCase().startsWith(queryLower) ||
    entry.state.toLowerCase().startsWith(queryLower) ||
    entry.state_abbr.toLowerCase().startsWith(queryLower)
  );

  // Limit results to prevent overwhelming the UI
  const limitedResults = results.slice(0, 50);

  if (limitedResults.length > 0) {
    updateHint(`Found ${results.length} result${results.length > 1 ? 's' : ''}${results.length > 50 ? ' (showing first 50)' : ''}`);
  }

  displayResults(limitedResults);
}

// Display search results
function displayResults(results) {
  hideLoading();
  hideInitialState();

  const resultsContainer = document.getElementById('results');
  const noResults = document.getElementById('no-results');

  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    noResults.classList.remove('hidden');
    updateHint('No results found');
    return;
  }

  noResults.classList.add('hidden');

  results.forEach((result, index) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';

    resultItem.innerHTML = `
      <div class="result-zip">${result.zip}</div>
      <div class="result-city">${result.city}</div>
      <div class="result-state">${result.state} (${result.state_abbr})</div>
      ${result.county ? `<div class="result-county">${result.county} County</div>` : ''}
    `;

    // Add click to copy functionality
    resultItem.addEventListener('click', () => {
      copyToClipboard(result.zip);
      showCopyFeedback(resultItem);
    });

    resultsContainer.appendChild(resultItem);
  });
}

// Copy zip code to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard:', text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Show visual feedback when copying
function showCopyFeedback(element) {
  const originalHTML = element.innerHTML;
  const zipCode = element.querySelector('.result-zip').textContent;

  element.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  element.style.color = 'white';
  element.innerHTML = `
    <div style="text-align: center; padding: 10px;">
      <div style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">✓ Copied!</div>
      <div style="font-size: 14px; opacity: 0.9;">${zipCode}</div>
    </div>
  `;

  setTimeout(() => {
    element.style.background = '';
    element.style.color = '';
    element.innerHTML = originalHTML;
  }, 1000);
}

// Update hint text
function updateHint(text) {
  const hintText = document.getElementById('hint-text');
  hintText.textContent = text;
}

// Show loading indicator
function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('results').innerHTML = '';
  document.getElementById('no-results').classList.add('hidden');
  document.getElementById('initial-state').classList.add('hidden');
}

// Hide loading indicator
function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

// Show initial state
function showInitialState() {
  document.getElementById('initial-state').classList.remove('hidden');
  document.getElementById('results').innerHTML = '';
  document.getElementById('no-results').classList.add('hidden');
  hideLoading();
}

// Hide initial state
function hideInitialState() {
  document.getElementById('initial-state').classList.add('hidden');
}

// Show error message
function showError(message) {
  hideLoading();
  hideInitialState();

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = `
    <div class="result-item" style="border-left-color: #dc3545;">
      <div class="result-city" style="color: #dc3545;">${message}</div>
    </div>
  `;

  updateHint('Error occurred');
}
