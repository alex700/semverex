The library is a tool to find greater, lesser or equal [semver](https://semver.org/) formatted versions. Comparing with the semver the library extended with following updates:

* Accept Chromium version [format](https://www.chromium.org/developers/version-numbers/) (e.g. 10.20.30.40).
* Accepts two digits versioning (e.g. 1.2).
* Ignores leading letter, like v1.0.0.

## Methods

* `max(string[])`
* `min(string[])`
* `eq(string[])`
* `validate(string)`

## Syntax

```
compare.eq(["1.1.0", "1.1.0", "1.1"]); // true
compare.eq(["v1.1", "1.1"]); // true
compare.min(["0.1.0", "1.0.0"]); // 0.1.0
compare.max(["1.1.5", "1.0.1"]); // 1.1.5
```

## Exceptions
* [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Examples and edge cases
The library accepts extended [semver](https://semver.org/) extended with additional use cases. Please see the tests for more information.

## Contribution

Every contribution is welcome and appreciated. **Please note:** make sure your code covered with test before contributing.
