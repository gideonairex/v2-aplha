#!/bin/bash

# Check if the --setup flag is passed
if [[ "$1" == "--setup" ]]; then
    echo "Running pnpm dev:setup..."
    pnpm dev:setup
fi

source .env

echo "Running dev server..."
tsx --watch src/server.ts
