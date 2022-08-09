import Big from 'big.js';

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

export const priceToUSDConverter = ({
  nftPrice = 0,
  originalPrice = 0,
  toFixed = 2,
}: {
  nftPrice: number;
  originalPrice: number;
  toFixed?: number;
}) => {
  return (nftPrice * originalPrice)?.toFixed(toFixed);
};

export const priceWithEConverter = (price: number) => {
  if (price <= 1e-6) {
    const b = parseInt(price?.toString().split('e-')[1]);
    if (b) {
      const pricePow = price * Math.pow(10, b - 1);
      return '0.' + new Array(b)?.join('0') + pricePow.toString().substring(2);
    }
  }
  return price;
};

export const roundingNumber = (amount: string, currency?: string, isAfter = true, decimal = 4) => {
  try {
    if (Number(amount) > 0) {
      const value = toFormat(Big(amount), decimal, true);
      if (!currency) return value;
      return isAfter ? `${value}${currency}` : `${currency}${value}`;
    }
  } catch (err) {
    return '';
  }
};

export const toFormat = (big: Big, dp?: number, isExponential?: boolean, ts = ',', ds = '.') => {
  if (big.gt(Big(0)) && dp !== undefined && dp > 0 && big.lt(Big(`1e-${dp}`))) {
    return `${Big(`1e-${dp}`).toFixed()}`;
  }
  const temp = !isExponential || Big(1e21).gt(big) ? big.toFixed(dp, 0) : big.toExponential(dp, 0);
  const arr = temp.replace(/\.0+(?=$|e)/, '').split('.');
  if (arr[1]) {
    arr[1] = arr[1].replace(/0+($|e)/, '');
  }
  arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ts);
  return arr.join(ds);
};

const afterDot = (amount: any, count: any, hasAfterDot = false) => {
  const amounts = amount.split('.');
  const afterDot = amount.split('.')[1];

  if (amounts.length == 1 || (amounts[0] > 999 && !hasAfterDot)) {
    return beforeDot(amounts[0]);
  }

  return addComma(amounts[0]) + '.' + (count == 0 ? afterDot : afterDot.slice(0, count));
};

const beforeDot = (amount: any) => {
  return amount > 999 ? addComma(amount) : amount;
};

const addComma = (str: any) => {
  // str = reverse(str);
  const array = str.split('');
  let text = '';
  array.map((item: any, i: any) => {
    if (i % 3 == 0 && i < array.length - 1 && i > 0) {
      text += ',';
    }
    text += item;
  });

  return text;
};

export const convertNumber = (amount: any, count: any) => {
  if (amount < 100000) {
    return afterDot(amount.toString(), count);
  }
  const k = 1000;
  const sizes = ['', 'K', 'M', 'B', 'T', 'Q', 'S'];
  const i = Math.floor(Math.log(amount) / Math.log(k));
  const roundNum = parseFloat(String(amount / Math.pow(k, i))).toFixed();

  return roundNum + '' + sizes[i];
};

export const timeByUnitConverter = (date: string) => {
  if (!date) return '';
  const currentDate = Date.now();
  const fixedDate = new Date(date).getTime();
  const diffTime = (currentDate - fixedDate) / 1000;
  if (diffTime < 60 * 60) {
    const showTime = Math.round(diffTime / 60);
    return `${showTime < 1 ? showTime + ' minute ago' : showTime + ' minutes ago'}`;
  } else if (diffTime < 60 * 60 * 24) {
    const showTime = Math.round(diffTime / (60 * 60));
    return `${showTime < 1 ? showTime + ' hour ago' : showTime + ' hours ago'}`;
  } else if (diffTime < 60 * 60 * 24 * 30) {
    const showTime = Math.round(diffTime / (60 * 60 * 24));
    return `${showTime < 1 ? showTime + ' day ago' : showTime + ' days ago'}`;
  } else if (diffTime < 60 * 60 * 24 * 30 * 12) {
    const showTime = Math.round(diffTime / (60 * 60 * 24 * 30));
    return `${showTime < 1 ? showTime + ' month ago' : showTime + ' months ago'}`;
  } else {
    const showTime = Math.round(diffTime / (60 * 60 * 24 * 30 * 12));
    return `${showTime < 1 ? showTime + ' year ago' : showTime + ' years ago'}`;
  }
};
