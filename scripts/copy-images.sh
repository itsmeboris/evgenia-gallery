#!/bin/bash

# Script to copy artwork images to public folder
# This is a temporary solution until we have proper image hosting

echo "📦 Setting up artwork images..."

# Create directories
mkdir -p public/artwork/images/artwork/{birds,flowers,towns,animals,abstract,portraits}

# Check if source images exist
if [ -d "../../images/artwork" ]; then
  echo "✅ Found source artwork images"
  cp -r ../../images/artwork/* public/artwork/images/artwork/
  echo "✅ Images copied successfully"
else
  echo "⚠️  Source images not found at ../../images/artwork"
  echo "   Creating placeholder structure..."

  # Create placeholder files for development
  touch public/artwork/images/artwork/placeholder.jpg
  echo "✅ Placeholder structure created"
fi

echo "🎉 Image setup complete!"