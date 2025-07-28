#!/bin/bash

# FlairAi Production Deployment Script
# Deploys FlairAi to Google Cloud Run

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-""}
REGION=${GOOGLE_CLOUD_REGION:-"us-central1"}
SERVICE_NAME="flaire-ai-backend"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."
    
    command -v gcloud >/dev/null 2>&1 || { print_error "gcloud CLI is required but not installed."; exit 1; }
    command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed."; exit 1; }
    
    if [ -z "$PROJECT_ID" ]; then
        print_error "GOOGLE_CLOUD_PROJECT environment variable is required"
        exit 1
    fi
    
    print_status "Prerequisites check passed ✅"
}

# Authenticate with Google Cloud
authenticate() {
    print_step "Authenticating with Google Cloud..."
    
    gcloud auth list --filter="status:ACTIVE" --format="value(account)" | head -n1 > /dev/null
    if [ $? -ne 0 ]; then
        print_warning "Not authenticated. Running gcloud auth login..."
        gcloud auth login
    fi
    
    gcloud config set project $PROJECT_ID
    gcloud auth configure-docker
    
    print_status "Authentication completed ✅"
}

# Build and push Docker image
build_and_push() {
    print_step "Building and pushing Docker image..."
    
    # Get commit SHA for tagging
    COMMIT_SHA=$(git rev-parse --short HEAD)
    
    # Build Docker image
    print_status "Building Docker image..."
    docker build -t ${IMAGE_NAME}:${COMMIT_SHA} -t ${IMAGE_NAME}:latest -f backend/Dockerfile .
    
    # Push to Google Container Registry
    print_status "Pushing to Google Container Registry..."
    docker push ${IMAGE_NAME}:${COMMIT_SHA}
    docker push ${IMAGE_NAME}:latest
    
    print_status "Docker image built and pushed ✅"
}

# Deploy to Cloud Run
deploy_to_cloud_run() {
    print_step "Deploying to Google Cloud Run..."
    
    COMMIT_SHA=$(git rev-parse --short HEAD)
    
    gcloud run deploy ${SERVICE_NAME} \
        --image ${IMAGE_NAME}:${COMMIT_SHA} \
        --region ${REGION} \
        --platform managed \
        --allow-unauthenticated \
        --memory 1Gi \
        --cpu 1 \
        --max-instances 10 \
        --set-env-vars NODE_ENV=production \
        --set-secrets JWT_SECRET=jwt-secret:latest \
        --set-secrets SUPABASE_SERVICE_ROLE_KEY=supabase-service-key:latest \
        --set-secrets GEMINI_API_KEY=gemini-api-key:latest \
        --timeout 300 \
        --concurrency 80 \
        --port 8080
    
    print_status "Deployment to Cloud Run completed ✅"
}

# Get service URL
get_service_url() {
    print_step "Getting service URL..."
    
    SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
        --region ${REGION} \
        --format 'value(status.url)')
    
    print_status "Service deployed at: ${SERVICE_URL}"
}

# Run health check
health_check() {
    print_step "Running health check..."
    
    if [ -n "$SERVICE_URL" ]; then
        HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" "${SERVICE_URL}/health")
        
        if [ "$HTTP_STATUS" = "200" ]; then
            print_status "Health check passed ✅"
        else
            print_warning "Health check returned status: $HTTP_STATUS"
        fi
    else
        print_warning "Service URL not available for health check"
    fi
}

# Main deployment function
main() {
    echo "FlairAi Production Deployment"
    echo "============================="
    echo "Project ID: $PROJECT_ID"
    echo "Region: $REGION"
    echo "Service: $SERVICE_NAME"
    echo ""
    
    check_prerequisites
    authenticate
    build_and_push
    deploy_to_cloud_run
    get_service_url
    health_check
    
    echo ""
    print_status "🎉 FlairAi deployment completed successfully!"
    echo ""
    print_status "Service URL: $SERVICE_URL"
    print_status "Health Check: $SERVICE_URL/health"
    print_status "API Documentation: $SERVICE_URL/api-docs"
    echo ""
    print_status "Next steps:"
    echo "  1. Update frontend environment variables with new backend URL"
    echo "  2. Run frontend deployment"
    echo "  3. Update DNS records if using custom domain"
    echo "  4. Monitor logs: gcloud logs tail --service=${SERVICE_NAME}"
    echo ""
}

# Show help
show_help() {
    echo "FlairAi Production Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Environment Variables:"
    echo "  GOOGLE_CLOUD_PROJECT    Google Cloud Project ID (required)"
    echo "  GOOGLE_CLOUD_REGION     Deployment region (default: us-central1)"
    echo ""
    echo "Options:"
    echo "  --help, -h              Show this help message"
    echo "  --dry-run               Show what would be deployed without deploying"
    echo ""
    echo "Examples:"
    echo "  export GOOGLE_CLOUD_PROJECT=my-project"
    echo "  $0"
    echo ""
    echo "  GOOGLE_CLOUD_PROJECT=my-project $0"
}

# Parse command line arguments
case $1 in
    --help|-h)
        show_help
        exit 0
        ;;
    --dry-run)
        print_status "DRY RUN MODE - No actual deployment will occur"
        check_prerequisites
        print_status "Would deploy:"
        print_status "  Project: $PROJECT_ID"
        print_status "  Region: $REGION"
        print_status "  Service: $SERVICE_NAME"
        print_status "  Image: $IMAGE_NAME:$(git rev-parse --short HEAD)"
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac