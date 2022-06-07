#!/bin/bash


npm run build &&
rm -rf ../cafe24/client/build/* &&
cp -r build/* ../cafe24/client/build


exit 0