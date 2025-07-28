#!/bin/bash

# FlairAi Quick Build and Preview Script
# This script builds and runs the application for immediate preview

set -e

echo "🚀 FlairAi Quick Build and Preview"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_step "1. Building Frontend Application"
npm run build

print_step "2. Testing Backend Health"
cd backend
if ! curl -s http://localhost:8080/health > /dev/null; then
    print_status "Starting backend server..."
    npm run dev &
    BACKEND_PID=$!
    sleep 3
fi
cd ..

print_step "3. Starting Frontend Preview"
npm run preview &
PREVIEW_PID=$!
sleep 2

print_step "4. Application Ready!"
echo ""
echo "🌐 Application URLs:"
echo "   • Frontend Preview: http://localhost:4173"
echo "   • Backend API: http://localhost:8080"
echo "   • Health Check: http://localhost:8080/health"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interruption
trap 'kill $PREVIEW_PID $BACKEND_PID 2>/dev/null; exit 0' INT
wait
