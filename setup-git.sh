#!/bin/bash

# Git Configuration Script for HIFLIX Project
# Run this before your first commit

echo "🔧 Configuring Git for HIFLIX..."
echo ""

# Prompt for user name
read -p "Enter your name (e.g., 'John Doe'): " GIT_NAME

# Prompt for user email
read -p "Enter your email (e.g., 'john@example.com'): " GIT_EMAIL

# Configure git
git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

echo ""
echo "✅ Git configured successfully!"
echo "   Name: $GIT_NAME"
echo "   Email: $GIT_EMAIL"
echo ""
echo "You can now commit and push to GitHub."
