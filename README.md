Port CRSD-ANT to android

# Quick start
## Prerequisits
1. [Android sdk](http://developer.android.com/sdk/index.html)
2. Latest Build-tools (install it via Android sdk)
3. Android 4.4.2 API 19 [Kit-Kat] (install it via Android sdk)
3. Some unix system (ubuntu/osx/etc)

## Initialization

### Install cordova
```bash
brew install npm # Or perhaps apt-get
npm install -g cordova
cd ant-on-mobile
cordova platform add android browser
cordova run browser
```

You may see some error saying 'sdk.dir is missing'. In that case, run
```bash
android update project --path ./
```
at
1. ant-on-mobile/platforms/android/CordovaLib/
2. ant-on-mobile/platforms/android/

### Install Elm
All future work will be implemented in [Elm-Lang](http://elm-lang.org).

You can install it using the provider installer, or do it my way:

1. Install Haskell then Cabal with brew
2. Run these 4 lines to get elm setup locally.

cabal update
cabal install cabal-install
cabal install -j elm-compiler-0.14 elm-package-0.2 elm-make-0.1
cabal install -j elm-repl-0.4 elm-reactor-0.2.0.1

# Dev cycle
TODO: get grunt or something to automate this

You will be working under ant-on-mobile/www most of the time.
Run this to build and run the latest version in a browser:
```bash
elm-make elm/app.elm && cordova run browser
```
