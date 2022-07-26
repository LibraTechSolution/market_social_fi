export const getFromSession = (key: string) => {
  const value = window.sessionStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const getFromLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const getWalletSupports = () => {
  const userAgentString = typeof window !== 'undefined' ? navigator.userAgent : '';
  if (/iPad|iPhone|iPod/i.test(userAgentString)) {
    return ['metamask', 'trust', 'coin98'];
  }

  return undefined;
};

export const dotsSensitive = ({
  originalString,
  startPosition,
  endPosition,
}: {
  originalString?: string;
  startPosition?: number;
  endPosition?: number;
}) => {
  if (isEmpty(originalString)) {
    return '';
  }
  return (
    originalString?.substring(0, Number(startPosition)) +
    '...' +
    originalString?.substring(Number(endPosition), Number(originalString?.length))
  );
};

export const isEmpty = (obj: any) => {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
};

export const omit = <Type extends object, Key extends keyof Type>(obj: Type, props: Key[]) => {
  obj = { ...obj };
  props.forEach((prop) => delete obj[prop]);
  return obj;
};

export const omitBy = (obj: { [key: string]: any }, check: (val: any) => boolean) => {
  obj = { ...obj };
  Object.entries(obj).forEach(([key, value]) => check(value) && delete obj[key]);
  return obj;
};

export const parseJSON = <T>(jsonString: string | null): T | undefined => {
  try {
    return jsonString === 'undefined' ? undefined : JSON.parse(jsonString ?? '');
  } catch (error) {
    console.log('Parsing error on ', { jsonString });
    return undefined;
  }
};

export const pixelToRem = (...values: number[]) => {
  return values.reduce((acc, current) => (acc += current / 16 + `rem `), '').trim();
};

export const reload = () => {
  window?.location?.reload?.();
};

export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const formatThousand = (price: string) => {
  price = price.replace(/,/g, '');
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return price;
};
