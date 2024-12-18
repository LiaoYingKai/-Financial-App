type CalculateSemiAnnualCompoundAssets = (
  currentAge: number,
  retirementAge: number,
  monthlySavings: number,
  monthlyInvestment: number,
  annualReturnRate: number
) => {
  month: number;
  totalAssets: number;
  totalSavings: number;
  totalInvestments: number;
}[];

export const calculateSemiAnnualCompoundAssets: CalculateSemiAnnualCompoundAssets =
  (
    currentAge,
    retirementAge,
    monthlySavings,
    monthlyInvestment,
    annualReturnRate
  ) => {
    const yearsToRetire = retirementAge - currentAge;
    const monthsToRetire = yearsToRetire * 12;
    const semiAnnualReturnRate = annualReturnRate / 2 / 100;

    const monthlyData = [];
    let totalSavings = 0; // 累計儲蓄金額
    let totalInvestments = 0; // 累計投資金額

    for (let month = 1; month <= monthsToRetire; month++) {
      // 累加儲蓄金額
      totalSavings += monthlySavings;

      // 累加投資金額
      totalInvestments += monthlyInvestment;

      // 每年 8 月和 12 月應用投資複利增長
      const currentMonth = month % 12; // 取得當前年份的月份（1 到 12）
      if (currentMonth === 8 || currentMonth === 12) {
        totalInvestments *= 1 + semiAnnualReturnRate;
      }

      // 計算當月總資產
      const totalAssets = totalSavings + totalInvestments;

      // 儲存每月數據
      monthlyData.push({
        month,
        totalAssets,
        totalSavings,
        totalInvestments,
      });
    }

    return monthlyData;
  };
