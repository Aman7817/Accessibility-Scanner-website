#!/bin/bash
# Backend/render-build.sh

set -e  # Exit on error

echo "========================================="
echo "Starting Render build process..."
echo "========================================="

# Install Chrome
echo "Installing Google Chrome..."
apt-get update
apt-get install -y wget gnupg curl

# Add Chrome repository
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Chrome
apt-get update
apt-get install -y google-chrome-stable

# Verify Chrome installation
echo "Chrome installed at: $(which google-chrome-stable)"
google-chrome-stable --version

# Install Node dependencies
echo "Installing npm dependencies..."
npm install

echo "========================================="
echo "Build completed successfully!"
echo "========================================="