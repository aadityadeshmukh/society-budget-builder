import { useMemo } from 'react';
import { useMaintenance } from '../context/MaintenanceContext';

export const useCalculation = () => {
  const { wings, categories, expenses, totalFlats, totalTaps, totalArea } = useMaintenance();

  const calculateForWing = (wingKey) => {
    const wing = wings[wingKey];
    if (!wing) return null;

    const calculateBreakdown = (yearType) => { // 'thisYear' or 'lastYear'
      return categories.map(cat => {
        let amount = 0;
        const constructionCost = wing.area * wing.costPerSqFt;
        
        const categoryTotalAmount = expenses
          .filter(e => e.categoryId === cat.id)
          .reduce((sum, e) => sum + (e[`${yearType}Amount`] || 0), 0);

        switch (cat.logic) {
          case 'Equal':
            amount = categoryTotalAmount / totalFlats;
            break;
          case 'Area-Based':
            amount = (categoryTotalAmount / totalArea) * wing.area;
            break;
          case 'Tap-Based':
            amount = (categoryTotalAmount / totalTaps) * wing.taps;
            break;
          case 'Construction-Based':
            amount = (constructionCost * (cat.rate / 100)) / 12;
            break;
          default:
            amount = 0;
        }

        return {
          id: cat.id,
          name: cat.name,
          amount: Math.round(amount * 100) / 100,
          logic: cat.logic
        };
      });
    };

    const breakdownTY = calculateBreakdown('thisYear');
    const breakdownLY = calculateBreakdown('lastYear');

    const totalTY = breakdownTY.reduce((sum, item) => sum + item.amount, 0);
    const totalLY = breakdownLY.reduce((sum, item) => sum + item.amount, 0);

    return {
      breakdown: breakdownTY,
      breakdownLY,
      total: Math.round(totalTY * 100) / 100,
      totalLY: Math.round(totalLY * 100) / 100,
      wingInfo: wing
    };
  };

  const allWingsCalculations = useMemo(() => {
    const results = {};
    Object.keys(wings).forEach(key => {
      results[key] = calculateForWing(key);
    });
    return results;
  }, [wings, categories, expenses, totalFlats, totalTaps, totalArea]);

  return {
    calculateForWing,
    allWingsCalculations
  };
};
