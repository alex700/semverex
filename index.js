exports.validate = (versionName) => {
  const versionRegExp = /^([a-zA-Z])?(0|[1-9]\d*)(\.(0|[1-9]\d*))?\.(0|[1-9]\d*)(\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)?$/g;
  return versionRegExp.test(versionName);
}

const versionSummary = (versionName) => {
  let versionMultipliers = [1000000000, 1000000, 1000, 1];
  versionName = versionName.replace(/^[a-zA-Z]/, '');
  let vArray = versionName.split('.');
  if (!this.validate(versionName)) {
    throw new Error(`Error: Invalid version name: ${versionName}. Expects the version follows semver.org format.`);
  }
  let sum = 0;
  versionMultipliers.forEach((multiplier, i) => {
    sum += multiplier * (vArray[i] || 0);
  });
  return sum;
}

exports.max = (versions) => {
  return versions.reduce((prev, next) => {
    return (versionSummary(prev) > versionSummary(next)) ? prev : next;
  });
}

exports.min = (versions) => {
  return versions.reduce((prev, next) => {
    return (versionSummary(prev) < versionSummary(next)) ? prev : next;
  });
}

exports.eq = (versions) => {
  let matchesCounter = 0;
  versions.reduce((prev, next) => {
    if (versionSummary(prev) === versionSummary(next)) {
      matchesCounter++;
      return prev;
    } else {
      return next;
    }
  });
  return matchesCounter === versions.length - 1;
}
