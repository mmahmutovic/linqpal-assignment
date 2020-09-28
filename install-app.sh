#!/bin/bash


echo "\n \t ============================ |- Welcome to Development Server -| ========================== \n"
echo "\t Choose the package manager below to start installing the app locally(type the option number)..."
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

# Checking if Selected package manager is yarn
if [ "$n" == 2 ]

then
    packageManager="yarn"

# Else package manager is npm
else
    packageManager="npm"

fi

    # Installing pm2 globally
    if [ "$packageManager" == "npm" ]

    then    
        sudo $packageManager -g install pm2

    else
        sudo $packageManager global add pm2

    fi

    # Assign Current workdir
    mainDir=$PWD
    
    # Go to node server directory
    cd node-server

    echo "\n \t Installing packages in Node App..."
    $packageManager install


    cd -

    cd react-app


    echo "\n \t Installing packages in React App..."
    $packageManager install

    echo "\n \t All packages installed successfully :)"
    echo "\n \t Seeding the db..."  
    
    cd -
    cd node-server
    $packageManager run seed
