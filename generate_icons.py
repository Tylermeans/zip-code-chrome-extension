#!/usr/bin/env python3
"""
Generate simple placeholder icons for the Chrome extension.
For better icons, design custom ones or use the SVG file with a converter.
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("PIL/Pillow not installed. Creating empty icon files as placeholders.")
    print("Please replace with actual icon images.")
    # Create empty files as placeholders
    for size in [16, 32, 48, 128]:
        with open(f'icons/icon{size}.png', 'w') as f:
            pass
    exit(0)

def create_icon(size):
    """Create a simple gradient icon with ZIP text"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)

    # Draw gradient-like circles
    for i in range(0, size, 2):
        # Purple gradient
        r = int(102 + (118 - 102) * (i / size))
        g = int(126 + (75 - 126) * (i / size))
        b = int(234 + (162 - 234) * (i / size))

        draw.ellipse([i//2, i//2, size - i//2, size - i//2],
                     fill=(r, g, b))

    # Draw a location pin shape
    center_x = size // 2
    top_y = size // 4
    bottom_y = int(size * 0.7)
    width = size // 3

    # Pin shape
    pin_points = [
        (center_x, bottom_y),
        (center_x - width//2, top_y + width//2),
        (center_x - width//2, top_y + width//3),
    ]

    # Draw white pin
    draw.ellipse([center_x - width//2, top_y,
                  center_x + width//2, top_y + width],
                 fill='white', outline='#764ba2', width=max(1, size//64))

    draw.polygon([(center_x, bottom_y),
                  (center_x - width//3, top_y + width//2),
                  (center_x + width//3, top_y + width//2)],
                 fill='white', outline='#764ba2')

    # Add text if size is large enough
    if size >= 32:
        try:
            # Try to use a default font, fallback to default if not available
            font_size = max(8, size // 8)
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
            except:
                font = ImageFont.load_default()

            text = "ZIP" if size >= 48 else "Z"

            # Get text bounding box
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]

            # Draw text in center of pin
            text_x = center_x - text_width // 2
            text_y = top_y + width // 3

            draw.text((text_x, text_y), text, fill='#667eea', font=font)
        except:
            pass

    # Save the image
    img.save(f'icons/icon{size}.png', 'PNG')
    print(f"Created icon{size}.png")

# Generate all required sizes
for size in [16, 32, 48, 128]:
    create_icon(size)

print("\nIcons generated successfully!")
print("For production use, consider creating custom icons with a design tool.")
