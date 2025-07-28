#!/bin/bash

# FlairAi Local Development Setup Script
# This script sets up the complete development environment

set -e

echo "🚀 Setting up FlairAi local development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "\n${BLUE}[STEP]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_step "Checking dependencies..."
    
    command -v node >/dev/null 2>&1 || { print_error "Node.js is required but not installed. Please install Node.js 18 or higher."; exit 1; }
    command -v npm >/dev/null 2>&1 || { print_error "npm is required but not installed."; exit 1; }
    command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed."; exit 1; }
    command -v docker-compose >/dev/null 2>&1 || { print_error "Docker Compose is required but not installed."; exit 1; }
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_status "All dependencies are installed ✅"
}

# Setup environment files
setup_env_files() {
    print_step "Setting up environment files..."
    
    if [ ! -f .env ]; then
        print_status "Creating .env file from template..."
        cp .env.example .env
        print_warning "Please edit .env file with your actual values"
    else
        print_status ".env file already exists"
    fi
    
    if [ ! -f backend/.env ]; then
        print_status "Creating backend/.env file..."
        ln -s ../.env backend/.env
    fi
}

# Install frontend dependencies
install_frontend_deps() {
    print_step "Installing frontend dependencies..."
    npm ci
    print_status "Frontend dependencies installed ✅"
}

# Install backend dependencies
install_backend_deps() {
    print_step "Installing backend dependencies..."
    cd backend
    npm ci
    cd ..
    print_status "Backend dependencies installed ✅"
}

# Build frontend
build_frontend() {
    print_step "Building frontend..."
    npm run build
    print_status "Frontend built ✅"
}

# Build backend
build_backend() {
    print_step "Building backend..."
    cd backend
    npm run build
    cd ..
    print_status "Backend built ✅"
}

# Setup database
setup_database() {
    print_step "Setting up database..."
    
    if [ "$1" = "--with-docker" ]; then
        print_status "Starting PostgreSQL with Docker..."
        docker-compose up -d postgres
        
        # Wait for PostgreSQL to be ready
        print_status "Waiting for PostgreSQL to be ready..."
        sleep 10
        
        # Run migrations
        print_status "Running database migrations..."
        cd backend
        npm run migrate
        cd ..
        
        print_status "Database setup completed ✅"
    else
        print_warning "Skipping database setup. Use --with-docker flag to setup with Docker."
    fi
}

# Create necessary directories
create_directories() {
    print_step "Creating necessary directories..."
    
    mkdir -p uploads
    mkdir -p logs
    mkdir -p backend/logs
    
    print_status "Directories created ✅"
}

# Setup Git hooks
setup_git_hooks() {
    print_step "Setting up Git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
set -e

echo "Running pre-commit checks..."

# Run frontend linter
echo "Running frontend linter..."
npm run lint

# Run backend linter
echo "Running backend linter..."
cd backend
npm run lint
cd ..

# Run tests
echo "Running tests..."
npm run test

echo "Pre-commit checks passed ✅"
EOF

    chmod +x .git/hooks/pre-commit
    print_status "Git hooks setup ✅"
}

# Start development servers
start_dev_servers() {
    print_step "Starting development servers..."
    
    if [ "$1" = "--with-docker" ]; then
        print_status "Starting all services with Docker Compose..."
        docker-compose up -d
        
        print_status "Services started ✅"
        print_status "Frontend: http://localhost:5173"
        print_status "Backend API: http://localhost:3000"
        print_status "PostgreSQL: localhost:5432"
        print_status "Redis: localhost:6379"
    else
        print_status "To start development servers:"
        echo "  Frontend: npm run dev"
        echo "  Backend:  cd backend && npm run dev"
    fi
}

# Main setup function
main() {
    echo "FlairAi Local Development Setup"
    echo "==============================="
    
    check_dependencies
    create_directories
    setup_env_files
    install_frontend_deps
    install_backend_deps
    
    # Check for flags
    WITH_DOCKER=false
    BUILD=false
    
    for arg in "$@"; do
        case $arg in
            --with-docker)
                WITH_DOCKER=true
                shift
                ;;
            --build)
                BUILD=true
                shift
                ;;
        esac
    done
    
    if [ "$BUILD" = true ]; then
        build_frontend
        build_backend
    fi
    
    if [ "$WITH_DOCKER" = true ]; then
        setup_database --with-docker
        start_dev_servers --with-docker
    else
        print_warning "Skipping Docker setup. Use --with-docker flag for full setup."
    fi
    
    setup_git_hooks
    
    echo ""
    print_status "🎉 FlairAi development environment setup completed!"
    echo ""
    print_status "Next steps:"
    echo "  1. Edit .env file with your actual values"
    echo "  2. Run 'npm run dev' to start the frontend"
    echo "  3. Run 'cd backend && npm run dev' to start the backend"
    echo ""
    print_status "For Docker setup, run: $0 --with-docker"
    print_status "For building, run: $0 --build"
}

# Show help
show_help() {
    echo "FlairAi Local Development Setup Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help          Show this help message"
    echo "  --with-docker   Setup with Docker containers"
    echo "  --build         Build frontend and backend"
    echo ""
    echo "Examples:"
    echo "  $0                    # Basic setup"
    echo "  $0 --with-docker      # Full Docker setup"
    echo "  $0 --build            # Setup and build"
}

# Parse command line arguments
case $1 in
    --help|-h)
        show_help
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac