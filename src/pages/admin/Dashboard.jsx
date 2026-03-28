import React from 'react';
import { ArrowUpRight, ArrowDownRight, IndianRupee, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { useCalculation } from '../../hooks/useCalculation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetCard = ({ title, value, subValue, trend, trendValue, color, icon: Icon }) => (
  <div className="card p-8 flex flex-col justify-between border-slate-100 hover:border-teal-500/30 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-slate-900 shadow-sm border border-white`}>
        <Icon size={24} className="group-hover:scale-110 transition-transform" />
      </div>
      {trend && (
        <div className={`px-3 py-1 rounded-full text-xs font-black tracking-tighter flex items-center gap-1 ${trend === 'up' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
         <h3 className="text-3xl font-manrope font-black text-slate-900">{value}</h3>
         <span className="text-slate-300 font-mono text-sm">{subValue}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { expenses, totalFlats } = useMaintenance();
  const { allWingsCalculations } = useCalculation();
  
  // Calculate consolidated budget totals
  const totalMonthlyTY = Object.values(allWingsCalculations).reduce((sum, calc) => sum + (calc.total * (calc.wingInfo.units || 1)), 0);
  const totalMonthlyLY = Object.values(allWingsCalculations).reduce((sum, calc) => sum + (calc.totalLY * (calc.wingInfo.units || 1)), 0);
  const variance = totalMonthlyLY ? ((totalMonthlyTY / totalMonthlyLY) - 1) * 100 : 0;

  // Aggregate Category comparisons
  // We'll use Wing A as a proxy for the chart distribution or sum up everything
  const wingA = allWingsCalculations[Object.keys(allWingsCalculations)[0]] || { breakdown: [], breakdownLY: [] };

  const chartData = {
    labels: wingA.breakdown.map(b => b.name),
    datasets: [
      {
        label: 'Last Year (LY)',
        data: wingA.breakdownLY.map(b => b.amount),
        backgroundColor: '#e2e8f0', // Slate-200
        borderRadius: 8,
      },
      {
        label: 'This Year (TY)',
        data: wingA.breakdown.map(b => b.amount),
        backgroundColor: '#0d9488', // Teal-600
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        align: 'end',
        labels: { font: { weight: 'bold', size: 12 }, boxWidth: 10, usePointStyle: true }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f8fafc' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { weight: 'bold', size: 11 } }
      }
    }
  };

  return (
    <div className="space-y-10 max-w-7xl">
      <section>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-manrope font-black text-slate-900 tracking-tight italic">Budget Command Center</h2>
            <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">Live Calibration</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BudgetCard 
            title="Total Monthly Ledger" 
            value={`₹${Math.round(totalMonthlyTY).toLocaleString()}`} 
            subValue="/ mo"
            icon={IndianRupee}
            trend={variance > 0 ? 'up' : 'down'}
            trendValue={`${Math.abs(variance).toFixed(1)}%`}
            color="bg-teal-500"
          />
          <BudgetCard 
            title="Prior Year Actuals" 
            value={`₹${Math.round(totalMonthlyLY).toLocaleString()}`} 
            subValue="LY"
            icon={Calendar}
            color="bg-slate-200"
          />
          <BudgetCard 
            title="Annualized Outflow" 
            value={`₹${Math.round(totalMonthlyTY * 12).toLocaleString()}`} 
            subValue="/ yr"
            icon={TrendingUp}
            color="bg-indigo-500"
          />
          <BudgetCard 
            title="Critical Variance" 
            value={`${variance > 0 ? '+' : ''}${variance.toFixed(1)}%`} 
            subValue="Budgetary"
            icon={AlertCircle}
            trend={variance > 0 ? 'up' : 'down'}
            trendValue={variance > 0 ? 'Inflationary' : 'Reduced'}
            color="bg-rose-500"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 card p-10 bg-white">
          <div className="flex justify-between items-center mb-10">
            <div>
                <h3 className="text-2xl font-manrope font-black text-slate-900 tracking-tight">Comparative Analysis</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Budget Allocation LY vs TY</p>
            </div>
          </div>
          <div className="h-[350px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="card p-10 bg-slate-950 text-white shadow-2xl shadow-slate-900/40 border-0">
          <h3 className="text-xl font-manrope font-black mb-8 italic text-teal-400">Yield Breakdown</h3>
          <div className="space-y-8">
            {wingA.breakdown.sort((a, b) => b.amount - a.amount).map((item, i) => {
               const lyItem = wingA.breakdownLY.find(ly => ly.id === item.id);
               const itemVariance = lyItem?.amount ? ((item.amount / lyItem.amount) - 1) * 100 : 0;
               return (
                <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-black uppercase tracking-tight text-white">{item.name}</span>
                        <div className="text-right">
                            <span className="font-mono font-black text-teal-400 block">₹{item.amount.toLocaleString()}</span>
                            <span className={`text-[10px] font-bold ${itemVariance > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {itemVariance > 0 ? '+' : ''}{itemVariance.toFixed(0)}% vs LY
                            </span>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-teal-500 h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${(item.amount / wingA.total) * 100}%` }}
                        />
                    </div>
                </div>
               );
            })}
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800">
             <div className="p-4 bg-slate-900 rounded-2xl flex gap-3 text-slate-400 italic text-xs">
                <AlertCircle size={20} className="text-teal-600 shrink-0" />
                <p>This breakdown is based on the standard configuration (Wing A). Society-wide totals are reflected in the command cards.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
