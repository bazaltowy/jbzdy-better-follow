export class Storage {
  static Set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static Get<
    T extends Record<PropertyKey, unknown> | unknown[] | string | number
  >(key: string, defaultValue: T) {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return JSON.parse(item) as T;
  }
}
