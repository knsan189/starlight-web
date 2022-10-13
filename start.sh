#!/bin/bash


npm run build &&
rm build/static/**/*.map &&
rm -rf ../starlight-server/public/* &&
cp -r build/* ../starlight-server/public


exit 0