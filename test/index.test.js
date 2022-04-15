let compare = require('../');

const fixture = [
  {
    versions: ["1.1", "1.2"],
    maxVersion: "1.2",
    minVersion: "1.1"
  },
  {
    versions: ["0.19", "1.8"],
    maxVersion: "1.8",
    minVersion: "0.19"
  },
  {
    versions: ["1.11", "2.1"],
    maxVersion: "2.1",
    minVersion: "1.11"
  },
  {
    versions: ["0.0.99", "0.1.0"],
    maxVersion: "0.1.0",
    minVersion: "0.0.99"
  },
  {
    versions: ["2.0", "0.99.99"],
    maxVersion: "2.0",
    minVersion: "0.99.99"
  },
  {
    versions: ["1.1", "1.1.5"],
    maxVersion: "1.1.5",
    minVersion: "1.1"
  },
  {
    versions: ["0.99.98", "0.99.99"],
    maxVersion: "0.99.99",
    minVersion: "0.99.98"
  },
  {
    versions: ["1.2", "0.99.98", "1.1.5", "0.1.0", "0.1.0"],
    maxVersion: "1.2",
    minVersion: "0.1.0"
  },
  {
    versions: ["1.2","1.2.0","1.2.0"],
    maxVersion: "1.2.0",
    minVersion: "1.2.0"
  }
];

const fixtureValidVersions = [
  '1.2',
  '0.0.4',
  '1.2.3',
  'v1.2.3',
  '10.20.30',
  '10.20.30.40',
  '1.1.2-prerelease+meta',
  '1.1.2+meta',
  '1.1.2+meta-valid',
  '1.0.0-alpha',
  '1.0.0-beta',
  '1.0.0-alpha.beta',
  '1.0.0-alpha.beta.1',
  '1.0.0-alpha.1',
  '1.0.0-alpha0.valid',
  '1.0.0-alpha.0valid',
  '1.0.0-alpha-a.b-c-somethinglong+build.1-aef.1-its-okay',
  '1.0.0-rc.1+build.1',
  '2.0.0-rc.1+build.123',
  '1.2.3-beta',
  '10.2.3-DEV-SNAPSHOT',
  '1.2.3-SNAPSHOT-123',
  '1.0.0',
  '2.0.0',
  '1.1.7',
  '2.0.0+build.1848',
  '2.0.1-alpha.1227',
  '1.0.0-alpha+beta',
  '1.2.3----RC-SNAPSHOT.12.9.1--.12+788',
  '1.2.3----R-S.12.9.1--.12+meta',
  '1.2.3----RC-SNAPSHOT.12.9.1--.12',
  '1.0.0+0.build.1-rc.10000aaa-kk-0.1',
  '99999999999999999999999.999999999999999999.99999999999999999',
  '1.0.0-0A.is.legal'
];

const fixtureInvalidVersions = [
  '1',
  '1.2.3-0123',
  '1.2.3-0123.0123',
  '1.1.2+.123',
  '+invalid',
  '-invalid',
  '-invalid+invalid',
  '-invalid.01',
  'alpha',
  'alpha.beta',
  'alpha.beta.1',
  'alpha.1',
  'alpha+beta',
  'alpha_beta',
  'alpha.',
  'alpha..',
  'beta',
  '1.0.0-alpha_beta',
  '-alpha.',
  '1.0.0-alpha..',
  '1.0.0-alpha..1',
  '1.0.0-alpha...1',
  '1.0.0-alpha....1',
  '1.0.0-alpha.....1',
  '1.0.0-alpha......1',
  '1.0.0-alpha.......1',
  '01.1.1',
  '1.01.1',
  '1.1.01',
  '1.2.3.DEV',
  '1.2-SNAPSHOT',
  '1.2.31.2.3----RC-SNAPSHOT.12.09.1--..12+788',
  '1.2-RC-SNAPSHOT',
  '-1.0.3-gamma+b7718',
  '+justmeta',
  '9.8.7+meta+meta',
  '9.8.7-whatever+meta+meta',
  '99999999999999999999999.999999999999999999.99999999999999999----RC-SNAPSHOT.12.09.1--------------------------------..12'
];
describe("Max version", () => {
  test.each(fixture)(
    '$versions to be $maxVersion', ({ versions, maxVersion }) => {
      expect(compare.max(versions)).toBe(maxVersion);
    },
  );
});

describe("Min version", () => {
  test.each(fixture)(
    '$versions to be $minVersion', ({ versions, minVersion }) => {
      expect(compare.min(versions)).toBe(minVersion);
    },
  );
});

describe("Equal versions", () => {
  test("1.1.0 vs 1.1.0 vs 1.1 to be equal", () => {
    expect(compare.eq(["1.1.0", "1.1.0", "1.1"])).toBe(true);
  });
  test("1.1.1 vs 1.1.1 vs 1.1 vs 1.1.0 should not be equal", () => {
    expect(compare.eq(["1.1.1", "1.1.1", "1.1", "1.1.0"])).toBe(false);
  });
  test("v1.1 vs 1.1 should be equal", () => {
    expect(compare.eq(["v1.1", "1.1"])).toBe(true);
  });
});

describe("Version Name Validation", () => {
  test.each(fixtureValidVersions)(
    'version name %s should be valid', (version) => {
      expect(compare.validate(version)).toBe(true);
    },
  );
  test.each(fixtureInvalidVersions)(
    'version name %s should not be valid', (version) => {
      expect(compare.validate(version)).toBe(false);
    },
  );
  test.each(fixtureInvalidVersions)(
    'version name %s should throw an error', (version) => {
      expect(() => {
        compare.eq([version, '0.0.1'])
      }).toThrowError();
    },
  );
});

describe.skip("Version Priority", () => {
  const versionNamePriority = [
    '1.0.0-alpha', // lowest version
    '1.0.0-alpha.1',
    '1.0.0-alpha.beta',
    '1.0.0-beta',
    '1.0.0-beta.2',
    '1.0.0-beta.11',
    '1.0.0-rc.1',
    '1.0.0',
    '1.1.0' // highest version
  ];
  for (let i = 0; i<versionNamePriority.length; i+=2) {
    test(`${versionNamePriority[i]} < ${versionNamePriority[i + 1]} to be true`, () => {
      expect(compare.max([versionNamePriority[i], versionNamePriority[i + 1]])).toBe(versionNamePriority[i + 1]);
    });
  }
});


