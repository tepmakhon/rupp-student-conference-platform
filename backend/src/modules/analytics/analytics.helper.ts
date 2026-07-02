export const getDateRange = (month?: number, year?: number) => {
  if (!month || !year) {
    return undefined;
  }

  const start = new Date(year, month - 1, 1);

  const end = new Date(year, month, 1);

  return {
    gte: start,
    lt: end,
  };
};

export const getPreviousMonth = (month: number, year: number) => {
  if (month === 1) {
    return {
      month: 12,
      year: year - 1,
    };
  }

  return {
    month: month - 1,

    year,
  };
};

export const calculateGrowth = (current: number, previous: number) => {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    return 100;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
};
