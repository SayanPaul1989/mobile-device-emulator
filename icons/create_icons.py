#!/usr/bin/env python3
"""
Simple script to create basic SVG icons for the Mobile Device Emulator extension
"""

import os

def create_svg_icon(size, output_path):
    """Create an SVG icon with the specified size"""
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#007bff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0056b3;stop-opacity:1" />
        </linearGradient>
    </defs>
    
    <!-- Phone outline -->
    <rect x="{size * 0.2}" y="{size * 0.1}" width="{size * 0.6}" height="{size * 0.8}" 
          rx="{size * 0.08}" ry="{size * 0.08}" 
          fill="url(#grad1)" stroke="#003d7a" stroke-width="2"/>
    
    <!-- Screen -->
    <rect x="{size * 0.25}" y="{size * 0.2}" width="{size * 0.5}" height="{size * 0.6}" 
          rx="{size * 0.02}" ry="{size * 0.02}" 
          fill="#ffffff" stroke="#e0e0e0" stroke-width="1"/>
    
    <!-- Home button -->
    <circle cx="{size * 0.5}" cy="{size * 0.85}" r="{size * 0.03}" 
            fill="#ffffff" stroke="#003d7a" stroke-width="1"/>
    
    <!-- Screen content lines -->
    <line x1="{size * 0.3}" y1="{size * 0.3}" x2="{size * 0.7}" y2="{size * 0.3}" 
          stroke="#007bff" stroke-width="2" stroke-linecap="round"/>
    <line x1="{size * 0.3}" y1="{size * 0.4}" x2="{size * 0.65}" y2="{size * 0.4}" 
          stroke="#007bff" stroke-width="2" stroke-linecap="round"/>
    <line x1="{size * 0.3}" y1="{size * 0.5}" x2="{size * 0.6}" y2="{size * 0.5}" 
          stroke="#007bff" stroke-width="2" stroke-linecap="round"/>
    <line x1="{size * 0.3}" y1="{size * 0.6}" x2="{size * 0.7}" y2="{size * 0.6}" 
          stroke="#007bff" stroke-width="2" stroke-linecap="round"/>
    <line x1="{size * 0.3}" y1="{size * 0.7}" x2="{size * 0.55}" y2="{size * 0.7}" 
          stroke="#007bff" stroke-width="2" stroke-linecap="round"/>
</svg>'''
    
    with open(output_path, 'w') as f:
        f.write(svg_content)
    print(f"Created {output_path}")

def main():
    # Create icons directory if it doesn't exist
    icons_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create SVG icons
    create_svg_icon(16, os.path.join(icons_dir, 'icon16.svg'))
    create_svg_icon(48, os.path.join(icons_dir, 'icon48.svg'))
    create_svg_icon(128, os.path.join(icons_dir, 'icon128.svg'))
    
    print("\\nSVG icons created successfully!")
    print("Note: You may want to convert these to PNG format for better browser compatibility.")
    print("You can use online converters or tools like Inkscape, GIMP, or ImageMagick.")

if __name__ == "__main__":
    main()