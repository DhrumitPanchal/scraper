#!/bin/bash

# Install Chrome manually
apt-get update && \
apt-get install -y wget gnupg ca-certificates && \
mkdir -p /usr/share/keyrings && \
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-linux-signing-keyring.gpg && \
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux-signing-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
apt-get update && \
apt-get install -y google-chrome-stable
