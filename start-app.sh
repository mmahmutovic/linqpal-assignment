#!/bin/bash

# Linq development server

echo "\n \t ============================ |- Welcome to Linq Development Server -| ========================== \n"
echo "\t Kindly choose the package manager below to start the application locally(type the option number)..."
echo "  1) npm"
echo "  2) yarn"

read n

case $n in
  1) echo "You have selected npm as your package manager";;
  2) echo "You have selected yarn as your package manager";;
  *) echo "Default option 'npm' is selected";;
esac

# Package Manager Variable
packageManager="npm"

# Checking if Selected package manager is npm
if [ "$n" == 1 ]

then
    packageManager="npm"

# Else package manager is yarn
else
    packageManager="yarn"

fi
    # Assign Current workdir
    mainDir=$PWD
    
    # Go to services directory
    cd node-server

    # Starting node server
    echo -e "\n \t Starting Node Service..."

    # Start the process and push it to background
    pm2 start "$packageManager run dev"  --name "node-server"

    cd -

    cd react-app
    pm2 start "$packageManager start" --name "react-app"

