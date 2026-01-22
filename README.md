# US Zip Code Finder - Chrome Extension

A fast and easy-to-use Chrome extension for searching US zip codes. Search by city/state to find zip codes, or search by zip code to find cities. Includes complete database of all 42,366 US zip codes.

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

This extension includes the **complete US zip code database** with all **42,366 zip codes** from the open source [midwire/free_zipcode_data](https://github.com/midwire/free_zipcode_data) repository.

The data is sourced from GeoNames and is licensed under Creative Commons, making it free to use for any purpose.

### Database Statistics

- **Total zip codes**: 42,366
- **Unique cities**: 18,909
- **States covered**: All 51 (50 states + DC)
- **Data includes**: City, state, state abbreviation, county

### Updating the Database

To update the database with the latest data from the source:

```bash
# Clone the free_zipcode_data repository
cd /tmp
git clone https://github.com/midwire/free_zipcode_data.git

# Run the conversion script
cd /path/to/zip-code-chrome-extension
python3 convert_zipcode_data.py
```

### Data Format

The `zipcodes.json` file uses this format:

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

## Project Structure

```
zip-code-chrome-extension/
├── manifest.json              # Chrome extension configuration
├── popup.html                 # Extension popup UI
├── popup.js                   # Search logic and functionality
├── styles.css                 # Styling for the popup
├── zipcodes.json              # Complete zip code database (42,366 entries)
├── convert_zipcode_data.py    # Script to convert midwire data to JSON
├── generate_zipcode_data.py   # Script to generate sample data (legacy)
├── generate_icons.py          # Script to generate extension icons
├── icons/                     # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon.svg
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
- **Database Size**: 5.2MB (complete dataset with 42,366 zip codes)
- **Performance**: Instant search results (all data loaded in memory)
- **Data Source**: [midwire/free_zipcode_data](https://github.com/midwire/free_zipcode_data) (GeoNames, Creative Commons)

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

### Version 1.1.0 (Complete Database Update)
- Integrated complete US zip code database (42,366 zip codes)
- Data sourced from open source midwire/free_zipcode_data repository
- All 51 states/territories covered (50 states + DC)
- 18,909 unique cities included
- Added conversion script for easy database updates

### Version 1.0.0 (Initial Release)
- Bidirectional zip code search (city ↔ zip)
- Support for all 50 US states
- Clean, modern UI
- Offline functionality
- No permissions required
