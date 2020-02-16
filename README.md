# Haskell Runner

![GitHub](https://img.shields.io/github/license/meowcolm024/has-go)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Meowcolm024.has-go)

A simple extension to run *Haskell*.

## Requirements

You need to install `ghc` and `stack`.

## Features

- Press `command + shift + P` to:
  - Load *GHCi* with current file: `Load GHCi`
  - Run current *Haskell* file: `Run Haskell File`
  - Compile current file: `Complie Haskell File`
  - *Stack* / *Cabal* run: `Stack Run` *(You can use the `Cabal` tool, but it's still called stack run OwO)*
  - *Stack* / *Cabal* build project: `Stack Build`
  - *Stack* / *Cabal* test: `Stack Test`

## Configuartions

### `Override GHCi Args`

For example:

``` json
"has-go.overrideGHCiArgs": "${current} Shiki.hs archer/Ishtar.hs"
```

This config will load *current file*, the file `Shiki.hs` and the file `Ishtar.hs` in directory `archer` (relative path).

> For `${current}`, it will load the current Haskell file to GHCi.

## Source

View source and report issues on [Github](https://github.com/Meowcolm024/has-go)
