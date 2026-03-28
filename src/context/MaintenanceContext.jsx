import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const MaintenanceContext = createContext();

const DEFAULT_WINGS = {
  "A": { series: "All", area: 1714.82, taps: 4, costPerSqFt: 1500, units: 40 },
  "B": { series: "01,02", area: 1371.25, taps: 3, costPerSqFt: 1500, units: 20 },
  "B.1": { series: "03,04", area: 923.96, taps: 3, costPerSqFt: 1500, units: 20 },
  "C": { series: "01,02", area: 1354.9, taps: 3, costPerSqFt: 1500, units: 20 },
  "C.1": { series: "03,04", area: 864.67, taps: 2, costPerSqFt: 1500, units: 20 },
  "D": { series: "01,02", area: 1160.79, taps: 3, costPerSqFt: 1500, units: 20 },
  "D.1": { series: "03,04", area: 753.31, taps: 2, costPerSqFt: 1500, units: 20 },
  "E": { series: "1,6", area: 1046.95, taps: 3, costPerSqFt: 1500, units: 20 },
  "E.1": { series: "2,3,4,5", area: 735.98, taps: 2, costPerSqFt: 1500, units: 40 },
};

const DEFAULT_CATEGORIES = [
  { id: 'rm', name: 'Repairs & Maintenance', logic: 'Construction-Based', rate: 0.75 },
  { id: 'sf', name: 'Sinking Fund', logic: 'Construction-Based', rate: 0.25 },
  { id: 'water', name: 'Water Charges', logic: 'Tap-Based' },
  { id: 'service', name: 'Service Charges', logic: 'Equal' },
];

const DEFAULT_EXPENSES = [
  { id: 101, name: 'Security Services', lastYearAmount: 11000, thisYearAmount: 12500, categoryId: 'service' },
  { id: 102, name: 'Water Tankers', lastYearAmount: 4500, thisYearAmount: 5200, categoryId: 'water' },
  { id: 103, name: 'Lift AMC', lastYearAmount: 7500, thisYearAmount: 8000, categoryId: 'service' },
];

export const MaintenanceProvider = ({ children }) => {
  const [societyName, setSocietyName] = useState(() => {
    return localStorage.getItem('theledger_name') || 'Emerald Residency';
  });

  const [societyLocation, setSocietyLocation] = useState(() => {
    return localStorage.getItem('theledger_location') || 'Mumbai South';
  });

  const [wings, setWings] = useState(() => {
    const saved = localStorage.getItem('theledger_wings');
    return saved ? JSON.parse(saved) : DEFAULT_WINGS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('theledger_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('theledger_expenses');
    return saved ? JSON.parse(saved) : DEFAULT_EXPENSES;
  });

  useEffect(() => localStorage.setItem('theledger_wings', JSON.stringify(wings)), [wings]);
  useEffect(() => localStorage.setItem('theledger_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('theledger_expenses', JSON.stringify(expenses)), [expenses]);
  useEffect(() => localStorage.setItem('theledger_name', societyName), [societyName]);
  useEffect(() => localStorage.setItem('theledger_location', societyLocation), [societyLocation]);

  const totalFlats = useMemo(() => Object.values(wings).reduce((sum, w) => sum + (w.units || 1), 0), [wings]);
  const totalTaps = useMemo(() => Object.values(wings).reduce((sum, w) => sum + (w.taps * (w.units || 1)), 0), [wings]);
  const totalArea = useMemo(() => Object.values(wings).reduce((sum, w) => sum + (w.area * (w.units || 1)), 0), [wings]);

  const value = {
    societyName,
    setSocietyName,
    societyLocation,
    setSocietyLocation,
    wings,
    setWings,
    categories,
    setCategories,
    expenses,
    setExpenses,
    totalFlats,
    totalTaps,
    totalArea
  };

  return (
    <MaintenanceContext.Provider value={value}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) throw new Error('useMaintenance must be used within MaintenanceProvider');
  return context;
};
