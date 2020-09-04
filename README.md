# Haskell Runner

![GitHub](https://img.shields.io/github/license/meowcolm024/has-go)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Meowcolm024.has-go)

A simple extension to run *Haskell*.

## Requirements

You need to install `ghc` and `stack`.

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
> If it is an empty string, ghci without any args will be started.
> If you are using `stack repl` or `cabal` make sure they're arguments for stack or cabal!

### `GHC args`

Arguments passed to `ghc`

### `Reuse Terminal`

Reload Haskell file to current GHCi terminal.

## Source

View source and report issues on [Github](https://github.com/Meowcolm024/has-go)
