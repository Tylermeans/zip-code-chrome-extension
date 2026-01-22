#!/usr/bin/env python3
"""
Convert the free_zipcode_data CSV files to our extension's JSON format.
"""

import csv
import json

def load_state_mapping(states_csv_path):
    """Load state abbreviation to full name mapping."""
    state_map = {}
    with open(states_csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            state_map[row['abbr']] = row['name']
    return state_map

def convert_zipcodes(zipcodes_csv_path, states_csv_path, output_json_path):
    """Convert zip code CSV to JSON format for the extension."""
    # Load state mapping
    print("Loading state mappings...")
    state_map = load_state_mapping(states_csv_path)

    # Convert zip codes
    print("Converting zip codes...")
    zipcode_data = []

    with open(zipcodes_csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Get state abbreviation
            state_abbr = row['state']

            # Get full state name from mapping
            state_name = state_map.get(state_abbr, state_abbr)

            # Convert county to title case and remove "COUNTY" suffix if present
            county = row['county'].title() if row['county'] else ""

            # Create entry in our format
            entry = {
                "zip": row['code'],
                "city": row['city'],
                "state": state_name,
                "state_abbr": state_abbr,
                "county": county
            }

            zipcode_data.append(entry)

    # Write to JSON file
    print(f"Writing {len(zipcode_data)} zip codes to {output_json_path}...")
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(zipcode_data, f, indent=2, ensure_ascii=False)

    print(f"✓ Successfully converted {len(zipcode_data)} zip codes!")

    # Print some statistics
    unique_zips = len(set(entry['zip'] for entry in zipcode_data))
    unique_cities = len(set(entry['city'] for entry in zipcode_data))
    unique_states = len(set(entry['state_abbr'] for entry in zipcode_data))

    print(f"\nStatistics:")
    print(f"  Total entries: {len(zipcode_data)}")
    print(f"  Unique ZIP codes: {unique_zips}")
    print(f"  Unique cities: {unique_cities}")
    print(f"  States covered: {unique_states}")

    # Show sample entry
    print(f"\nSample entry:")
    print(json.dumps(zipcode_data[0], indent=2))

if __name__ == "__main__":
    # File paths
    zipcodes_csv = "/tmp/free_zipcode_data/all_us_zipcodes.csv"
    states_csv = "/tmp/free_zipcode_data/all_us_states.csv"
    output_json = "zipcodes.json"

    convert_zipcodes(zipcodes_csv, states_csv, output_json)
