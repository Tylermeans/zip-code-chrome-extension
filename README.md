# US Zip Code Finder - Chrome Extension

A fast and easy-to-use Chrome extension for searching US zip codes. Search by city/state to find zip codes, or search by zip code to find cities. Supports all 41,000+ US zip codes.

## Features

- **Bidirectional Search**: Search by city/state to find zip codes, or by zip code to find cities
- **Fast & Offline**: All data is stored locally for instant results without internet connection
- **Clean Interface**: Simple, intuitive UI with tabbed navigation
- **Comprehensive Data**: Includes city, state, county, and zip code information
- **No Permissions Required**: Works entirely offline with no data collection

## Installation

### Install from Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the extension directory
6. The extension icon will appear in your Chrome toolbar

## Usage

### Search by City and State

1. Click the extension icon in your Chrome toolbar
2. Make sure you're on the "City → Zip" tab
3. Enter a city name (e.g., "New York")
4. Enter a state name or abbreviation (e.g., "NY" or "New York")
5. Click "Search" or press Enter
6. View all matching zip codes with their details

### Search by Zip Code

1. Click the extension icon in your Chrome toolbar
2. Switch to the "Zip → City" tab
3. Enter a 5-digit zip code (e.g., "10001")
4. Click "Search" or press Enter
5. View the city, state, and county for that zip code

## Data Source

The extension includes a sample dataset for demonstration purposes. For production use with the complete database of 41,000+ zip codes:

### Option 1: Download Complete Database

Download a complete US zip code database from:
- [SimpleMaps US Zip Codes](https://simplemaps.com/data/us-zips) (Free basic version available)
- [United States Zip Codes](https://www.unitedstateszipcodes.org/)
- USPS Official Database

### Option 2: Format Your Own Data

Replace `zipcodes.json` with your data in this format:

```json
[
  {
    "zip": "10001",
    "city": "New York",
    "state": "New York",
    "state_abbr": "NY",
    "county": "New York"
  },
  {
    "zip": "90001",
    "city": "Los Angeles",
    "state": "California",
    "state_abbr": "CA",
    "county": "Los Angeles"
  }
]
```

### Regenerate Sample Data

To regenerate the sample data:

```bash
python3 generate_zipcode_data.py
```

## Project Structure

```
zip-code-chrome-extension/
├── manifest.json              # Chrome extension configuration
├── popup.html                 # Extension popup UI
├── popup.js                   # Search logic and functionality
├── styles.css                 # Styling for the popup
├── zipcodes.json             # Zip code database
├── generate_zipcode_data.py  # Script to generate sample data
├── icons/                     # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md                  # This file
```

## Development

### Modifying the Extension

1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Customization

- **Styling**: Edit `styles.css` to change colors, fonts, and layout
- **Functionality**: Edit `popup.js` to modify search behavior
- **UI**: Edit `popup.html` to change the interface structure
- **Data**: Replace `zipcodes.json` with your own dataset

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: None required (fully offline)
- **Size**: ~100KB with sample data, ~2-3MB with complete dataset
- **Performance**: Instant search results (all data in memory)

## Browser Compatibility

- Chrome 88+
- Edge 88+ (Chromium-based)
- Opera 74+
- Brave
- Any Chromium-based browser

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT require internet connection
- Does NOT track searches
- Does NOT use analytics
- Works entirely offline

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Ideas for Improvement

- Add autocomplete for city/state names
- Include ZIP+4 extended codes
- Add geographic coordinates
- Show nearby zip codes
- Export search results
- Dark mode support
- Keyboard shortcuts

## License

MIT License - Feel free to use and modify as needed.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Changelog

### Version 1.0.0 (Initial Release)
- Bidirectional zip code search (city ↔ zip)
- Support for all 50 US states
- Clean, modern UI
- Offline functionality
- No permissions required
