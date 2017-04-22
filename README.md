# paisa
Expense Tracker


Todo:
Tab for past activities
User details
Greet based on time
Display last month total
beautify
use local storage to store email id
email id authentication



Build Apk:
cd /c/Program\ Files/Java/jdk1.8.0_05/bin/
./jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /d/Pradeep/app/paisa-key.keystore /d/Pradeep/app/paisa.apk paisa
cd /c/Users/Pradeep/AppData/Local/Android/sdk/build-tools/25.0.2
./zipalign -v 4 /d/Pradeep/app/paisa.apk /d/Pradeep/app/paisa-key-prod.apk


issues:
mylist: alignment -     /* margin: 0.4rem 0.2rem; button-md
create item - shopping list - item padding

