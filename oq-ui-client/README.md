# mapping apps

A web based mapping tools for use within the GEM Sandbox mapping framework. Please note that this repository is home to many web mapping tools each with it's respective index_projectname.html file. The index.html needs to be replaced with the contents of the index-projectname.html for each application.

## Setup
curl -L https://github.com/opengeo/readygxp/raw/master/readygxp.sh | sh -s myapp
Enhancements to come later. For now, an application can be run as follows:

## Debug Mode
Loads all scripts uncompressed.

    ant init
    ant debug
This will give you an application available at http://localhost:8080/ by default. You only need to run ant init once (or any time dependencies change).

## Prepare App for Deployment
To create a servlet run the following:

    ant
The servlet will be assembled in the build directory.