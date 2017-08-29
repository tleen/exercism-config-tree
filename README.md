# exercism-config-tree

Output Exercism config file as a text tree.

```sh
GET https://raw.githubusercontent.com/exercism/lua/master/config.json | exercism-config-tree
```

```text
core
----
├── hello-world [1]
|
├── hamming [2]
|   ├── nucleotide-count [3]
|   ├── rna-transcription [3]
|   ├── protein-translation [3]
|   └── scrabble-score [3]
|
├── house [3]
|   ├── beer-song [3]
|   └── food-chain [3]
|
├── difference-of-squares [2]
|   ├── sum-of-multiples [2]
|   ├── perfect-numbers [3]
|   ├── pythagorean-triplet [3]
|   ├── triangle [3]
|   └── largest-series-product [5]
...

bonus
-----
...

...
```

## Install

```sh
> npm install -g exercism-config-tree
```

Then you can run it as

```sh
> exercism-config-tree < <path-to-your/>config.json
```


It takes an [Exercism](https://github.com/exercism) track config file and transforms it into a tree of the core exercises + unlocks, and another tree for the bonus exercises (unlocked after the initial exercise).
