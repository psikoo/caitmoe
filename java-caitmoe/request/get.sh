#!/bin/bash

#* Get cameraId
curl -s -k --location 'https://nest-caitmoe:8443/api/dgt/cameras' > ./request/cams.json
