#!/bin/bash

#https://github.com/danielgtaylor/aglio

#sudo npm install -g aglio

pwd=$(pwd)
cd $pwd/api_docs
exec aglio -i api.apib -o api.html