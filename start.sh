#!/bin/bash


npm run build &&
rm -rf ../starlight-server/public/* &&
cp -r build/* ../starlight-server/public

echo "deploy finished"

exit 0