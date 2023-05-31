#!/usr/bin/env bash
export PATH="$PATH:$(pwd)/node_modules/.bin"
read -p "Start running UI app? (y/n): " choice
if [[ $choice =~ ^[Yy]$ ]]; then
    quasar dev
elif [[ $choice =~ ^[Nn]$ ]]; then
    echo "You chose 'no'."
else
    echo "Invalid choice. Please enter 'y' for yes or 'n' for no."
fi
