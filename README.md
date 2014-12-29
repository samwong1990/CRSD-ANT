Port CRSD-ANT to android

# Quick start
## Prerequisits
1. [Android sdk](http://developer.android.com/sdk/index.html)
2. Latest Build-tools (install it via Android sdk)
3. Android 4.4.2 API 19 [Kit-Kat] (install it via Android sdk)

## Initialization
```bash
brew install npm # Or perhaps apt-get
npm install -g cordova
cd ant-on-mobile
cordova emulate android
```

You may see some error saying 'sdk.dir is missing'. In that case, run
```bash
android update project --path ./
```
at
1. ant-on-mobile/platforms/android/CordovaLib/
2. ant-on-mobile/platforms/android/
