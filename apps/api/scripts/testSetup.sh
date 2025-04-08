#!/bin/bash
# This script is used to reset, setup, and seed the test database
# It is used by the test scripts in the package.json file

# Exit immediately if a command exits with a non-zero status
set -e

# Remove the test-db container if it exists
docker compose rm -s -f -v test-db

# Start the test-db container in detached mode
docker compose up -d test-db

# Wait for the test-db container to be ready
echo "Waiting for the test-db container to be ready..."
sleep 5 # You may need to adjust this delay based on your environment

# Export environment variables from the .env.test file
export $(grep -v '^#' .env.test | xargs)

# Reset
npx dotenv -e .env.test -- prisma migrate reset --force

echo "Test database is ready."
