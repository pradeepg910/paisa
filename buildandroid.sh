#!/bin/bash

echo "Building Ionic android release apk "

ionic build android --release

echo "Copying to apk to /d/Pradeep/app/"

cp /d/java/projects/paisa/platforms/android/build/outputs/apk/android-release-unsigned.apk /d/Pradeep/app/paisa.apk

echo "Clearing old files"

rm -rf /d/Pradeep/app/paisa-prod.apk

echo "Signing apk using JDK keytool"

cd /c/Program\ Files/Java/jdk1.8.0_05/bin/

echo 'paisa17' | ./jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /d/Pradeep/app/paisa-key.keystore /d/Pradeep/app/paisa.apk paisa 

echo "Zip Aligning apk"

cd /c/Users/Pradeep/AppData/Local/Android/sdk/build-tools/25.0.2

./zipalign -v 4 /d/Pradeep/app/paisa.apk /d/Pradeep/app/paisa-prod.apk

echo "Build Successful"

echo "Copy production apk '/d/Pradeep/app/paisa-prod.apk' to mobile"