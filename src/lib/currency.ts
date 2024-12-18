export const toCurrency = (num: number): string => {
  // 無條件捨去到個位數
  const truncatedNum = Math.floor(num);
  // 將數字轉換為三位數一個逗號的格式
  return truncatedNum.toLocaleString('en-US');
};
