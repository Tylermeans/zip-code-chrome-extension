// State management
let zipCodeData = [];
let isDataLoaded = false;

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
  } catch (error) {
    console.error('Error loading zip code data:', error);
    showError('Failed to load zip code database');
  }
}

// Initialize all event listeners
function initializeEventListeners() {
  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  // City to Zip search
  document.getElementById('city-search-btn').addEventListener('click', searchByCity);
  document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchByCity();
  });
  document.getElementById('state-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchByCity();
  });

  // Zip to City search
  document.getElementById('zip-search-btn').addEventListener('click', searchByZip);
  document.getElementById('zip-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchByZip();
  });

  // Only allow numbers in zip code input
  document.getElementById('zip-input').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  });
}

// Switch between tabs
function switchTab(tabId) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');

  // Clear results
  clearResults();
}

// Search by city and state
function searchByCity() {
  const city = document.getElementById('city-input').value.trim();
  const state = document.getElementById('state-input').value.trim();

  if (!city || !state) {
    showError('Please enter both city and state');
    return;
  }

  if (!isDataLoaded) {
    showError('Data is still loading, please wait...');
    return;
  }

  showLoading();

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

  displayResults(results);
}

// Search by zip code
function searchByZip() {
  const zip = document.getElementById('zip-input').value.trim();

  if (!zip) {
    showError('Please enter a zip code');
    return;
  }

  if (zip.length !== 5) {
    showError('Zip code must be 5 digits');
    return;
  }

  if (!isDataLoaded) {
    showError('Data is still loading, please wait...');
    return;
  }

  showLoading();

  // Search for matching cities
  const results = zipCodeData.filter(entry => entry.zip === zip);

  displayResults(results);
}

// Display search results
function displayResults(results) {
  hideLoading();

  const resultsContainer = document.getElementById('results');
  const noResults = document.getElementById('no-results');

  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';

    resultItem.innerHTML = `
      <div class="result-zip">${result.zip}</div>
      <div class="result-city">${result.city}</div>
      <div class="result-state">${result.state} (${result.state_abbr})</div>
      ${result.county ? `<div class="result-county">${result.county} County</div>` : ''}
    `;

    resultsContainer.appendChild(resultItem);
  });
}

// Show loading indicator
function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('results').innerHTML = '';
  document.getElementById('no-results').classList.add('hidden');
}

// Hide loading indicator
function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

// Clear results
function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('no-results').classList.add('hidden');
  hideLoading();
}

// Show error message
function showError(message) {
  hideLoading();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = `
    <div class="result-item" style="border-left-color: #dc3545;">
      <div class="result-city" style="color: #dc3545;">${message}</div>
    </div>
  `;
}
