#!/bin/bash
# This script is used to reset, setup, and seed the dev database

# Exit immediately if a command exits with a non-zero status
set -e

# Remove the dev-db container if it exists
docker compose rm -s -f -v dev-db

# Start the dev-db container in detached mode
docker compose up -d dev-db

# Wait for the dev-db container to be ready
echo "Waiting for the dev-db container to be ready..."
sleep 5 # You may need to adjust this delay based on your environment

# TODO: Checks if the .env file has the same environment variables as the .env.example file

# Export environment variables from the .env file
export $(grep -v '^#' .env | xargs)

# Reset
npx dotenv -e .env -- prisma migrate reset --force

echo "Dev database is ready."
