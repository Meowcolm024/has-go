# [Deprecated] Haskell Runner

## Haskell Runner is now deprecated!!!
## Please move to **[Haskell Runner 2](https://github.com/Meowcolm024/haskell-runner-2/)** 

Markerplace for [Haskell Runner 2](https://marketplace.visualstudio.com/items?itemName=Meowcolm024.runner2)

---

![GitHub](https://img.shields.io/github/license/meowcolm024/has-go)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Meowcolm024.has-go)

A simple extension to run *Haskell*.

## Requirements

You need to (at least) install `ghc`. For the extension to be fully functional, you need to install `cabal` and `stack`.

## Features

- Press `command + shift + P` to:
  - Load *GHCi*(or *Stack/Cabal repl*) with current file: `Load GHCi`
  - Run current *Haskell* file: `Run Haskell File`
  - *Stack* / *Cabal* run: `Stack Run` *(You can use the `Cabal` tool, but it's still called stack run OwO)*

## Configuartions

### `Stack Args`

Arguments that passed to `stack run` (or passed to your program...)

### `Override GHCi Args`

For example:

``` json
"has-go.overrideGHCiArgs": "${current} Shiki.hs -XLambdaCase"
```

This config will load *current file*, the file `Shiki.hs`  to GHCi and enable extension `-XLambdaCase`.

> For `${current}`, it will load the current Haskell file to GHCi.
>
> If it is an empty string, ghci without any args will be started.
>
> If you are using `stack repl` or `cabal` make sure they're arguments for stack or cabal!

### `GHC args`

Arguments passed to `ghc`

### `Reuse Terminal`

Reload Haskell file to current GHCi terminal.

## Note for `Run File`

To use `stack runghc`: Set `ghciInterpreter` to `Stack/Cabal` **and** `haskellTool` to `Stack`

Otherwise, `runhaskell` is called for the current file.

## Source

View source and report issues on [Github](https://github.com/Meowcolm024/has-go)
