#!/bin/bash

# Stop development server

echo "Stoping all the node services..."

# Stops and kills the node server
pm2 stop node-server
pm2 delete node-server

# Stops and kills react app

pm2 stop react-app
pm2 delete react-app