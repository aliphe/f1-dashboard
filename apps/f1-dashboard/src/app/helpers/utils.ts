type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

export function sortByString<T extends SubType<T, string>>(
  entities: T[],
  key: AllowedNames<T, string>
): T[] {
  return entities.sort((a, b) => (a[key] as string).localeCompare(b[key])); // I tried
}

export function sortByNumber<T extends SubType<T, number>>(
  entities: T[],
  key: AllowedNames<T, number>
): T[] {
  return entities.slice().sort((a, b) => a[key] - b[key]);
}
