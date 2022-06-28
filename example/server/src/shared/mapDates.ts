export function mapDatesFromZString(obj: any): any {
  if (typeof obj === 'string' && /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(obj)) {
    return new Date(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(e => mapDatesFromZString(e));  
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = mapDatesFromZString(obj[key]);
      return acc;
    }, { } as any);
  }

  return obj;
}

export function mapDatesToZString(obj: any): any {
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) {
    return obj.map(e => mapDatesToZString(e));  
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = mapDatesToZString(obj[key]);
      return acc;
    }, { } as any);
  }

  return obj;
}