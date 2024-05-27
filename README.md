# README.md

## Usecase

- start a gerrit ChangeList 
- get the CL url
- start a timer for 45 minutes (configurable) to remind user to check that

- check reminders manually
- check reminders once an hour? 

- wake with vscode
- intergrate with a vscode extension

## Architecture (Initial)

- start as a vscode extension (in future may live in the cloud)
- starting vscode will start a server (and stop with the vscode stop)
- that server will keep the notifications/reminders 
- service will allow other clients - like command line 
 - build the command line client for reminders 

 - build the vscode extension by using the @nx/js lib https://medium.com/@GrandSchtroumpf/vscode-extension-inside-a-nx-workspace-f9ad232a26e5 and maybe react or qwik (it won't have a server soooo that might be rough) 
 - all clients will probably need to use https://www.npmjs.com/package/sherlockjs?activeTab=code to get the "Push the code in 45 minutes"
