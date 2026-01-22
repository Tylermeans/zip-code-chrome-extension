# US Zip Code Finder - Chrome Extension

A fast and easy-to-use Chrome extension for searching US zip codes. Search by city/state to find zip codes, or search by zip code to find cities. Includes complete database of all 42,366 US zip codes.

## Features

- **Smart Auto-Search**: Just start typing - searches automatically as you type (no button needed!)
- **Intelligent Detection**: Automatically detects if you're searching by zip code, city/state, or partial matches
- **Click to Copy**: Click any result to copy the zip code to your clipboard
- **Fast & Offline**: All data is stored locally for instant results without internet connection
- **Beautiful Animations**: US map outline animation while searching, smooth result transitions
- **Comprehensive Data**: Complete database with 42,366 zip codes, including city, state, and county
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

The extension features a smart, unified search field that automatically detects what you're searching for:

### Search by Zip Code
- Type a 5-digit zip code (e.g., `10001`)
- Results appear automatically - shows the city, state, and county

### Search by City and State
- Type city, state format (e.g., `New York, NY` or `Los Angeles, CA`)
- Results show all zip codes for that city

### Partial Searches
- Type partial zip codes (e.g., `100`) - shows all zips starting with those digits
- Type partial city names (e.g., `San`) - shows all cities starting with that text
- Partial results are limited to 50 entries for better performance

### Quick Copy
- Click any result to instantly copy the zip code to your clipboard
- Visual feedback confirms the copy action

### Keyboard Shortcuts
- Press `ESC` to clear your search and start over

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

### Version 2.0.1 (UX Fixes)
- Fixed text rendering issues with gradient colors (improved readability)
- Reduced font sizes for more compact display while maintaining ADA compliance
  - Zip codes: 18px (down from 22px)
  - City names: 15px (down from 17px)
  - State names: 13px (down from 14px)
  - County: 12px (ADA minimum)
- Reduced padding and spacing to show more results on screen
- Increased results area height to 340px
- All text now uses solid colors for better browser compatibility

### Version 2.0.0 (Major UI/UX Redesign)
- Complete redesign with smart unified search interface
- Auto-search as you type (300ms debounce, no button needed)
- Intelligent search detection (zip, city/state, partial matches)
- Beautiful US map outline loading animation
- Click-to-copy functionality with visual feedback
- Removed tabbed interface in favor of single smart search
- Staggered result animations
- Enhanced empty and error states
- ESC key to clear search
- Results limited to 50 for partial searches (performance)

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
