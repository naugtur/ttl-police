#!/bin/bash

# Build script for user service
# TEMPORARY(2024-02-10): Using manual build until CI/CD is set up

set -e

echo "Building user service..."

# TEMPORARY(2023-11-01): Hardcoded paths until config management is ready
BUILD_DIR="/tmp/build"
SOURCE_DIR="./src"

# temporary cleanup
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# TEMPORARY(2024-04-01): Basic build process without optimization
cp -r $SOURCE_DIR/* $BUILD_DIR/

echo "Build completed successfully"

# This is just a temporary success message
echo "Ready for deployment!"