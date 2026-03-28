import React, { useState } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { useCalculation } from '../../hooks/useCalculation';
import { FileText, Download, Printer, ArrowUpRight, ArrowDownRight, X, Info, Search } from 'lucide-react';

const DetailModal = ({ wingKey, calculation, onClose }) => {
  if (!calculation) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-900 text-white p-8 flex justify-between items-start">
          <div>
            <span className="text-teal-400 text-xs font-black uppercase tracking-widest mb-2 block">Monthly Breakdown</span>
            <h2 className="text-4xl font-manrope font-bold italic">Wing {wingKey}</h2>
            <p className="text-slate-400 text-sm mt-1">{calculation.wingInfo.series} Series • {calculation.wingInfo.units} Units</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 space-y-6">
           <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                 <p className="text-[10px] text-teal-600 font-black uppercase tracking-wider mb-1">Current Maintenance (TY)</p>
                 <p className="text-3xl font-mono font-black text-teal-900">₹{calculation.total.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-1">Last Year Actuals (LY)</p>
                 <p className="text-3xl font-mono font-black text-slate-400">₹{calculation.totalLY.toLocaleString()}</p>
              </div>
           </div>

           <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Ledger Items</h3>
              {calculation.breakdown.map((item, idx) => {
                const lyItem = calculation.breakdownLY.find(ly => ly.id === item.id);
                const variance = lyItem?.amount ? ((item.amount / lyItem.amount) - 1) * 100 : 0;
                return (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-slate-50 hover:border-teal-200 hover:shadow-sm transition-all group">
                    <div>
                      <span className="font-bold text-slate-800 block text-sm">{item.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black">{item.logic}</span>
                    </div>
                    <div className="text-right">
                       <span className="font-mono font-bold block text-sm">₹{item.amount.toLocaleString()}</span>
                       {variance !== 0 && (
                         <span className={`text-[10px] font-bold ${variance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                           {variance > 0 ? '+' : ''}{variance.toFixed(0)}% vs LY
                         </span>
                       )}
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
        <div className="bg-slate-50 p-6 flex justify-end">
           <button onClick={onClose} className="btn btn-primary px-8">Close Details</button>
        </div>
      </div>
    </div>
  );
};

const Ledger = () => {
  const { wings } = useMaintenance();
  const { allWingsCalculations } = useCalculation();
  const [selectedWing, setSelectedWing] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-manrope font-extrabold text-slate-900 mb-1">Civic Ledger</h2>
          <p className="text-slate-500 text-sm font-medium">Full society audit with LY vs TY maintenance comparative</p>
        </div>
        <div className="flex gap-3">
           <button className="btn bg-white border-slate-200 text-slate-700 hover:border-slate-300 gap-2 font-bold text-sm">
             <Printer size={18} />
             Print All
           </button>
           <button className="btn btn-primary gap-2 shadow-lg shadow-teal-900/10">
             <Download size={18} />
             Export PDF
           </button>
        </div>
      </div>

      <div className="card shadow-xl border-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-manrope">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Wing / Type</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Structure</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">LY Monthly</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-teal-400 text-right">TY Monthly</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Variance</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {Object.entries(allWingsCalculations).map(([key, calc]) => {
              const variance = calc.totalLY ? ((calc.total / calc.totalLY) - 1) * 100 : 0;
              return (
                <tr key={key} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedWing(key)}>
                  <td className="px-8 py-5">
                    <span className="font-manrope font-black text-xl text-slate-900 group-hover:text-teal-700 transition-colors">Wing {key}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-400 block mb-1">{calc.wingInfo.series} Series</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-black uppercase tracking-tighter">{calc.wingInfo.units} Units • {calc.wingInfo.area} sqft</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-mono font-black text-slate-400 text-right italic">₹{calc.totalLY.toLocaleString()}</td>
                  <td className="px-8 py-5 font-mono font-black text-slate-900 text-right text-lg">₹{calc.total.toLocaleString()}</td>
                  <td className="px-8 py-5 text-center">
                     <span className={`inline-flex items-center gap-0.5 px-3 py-1 rounded-full text-xs font-black tracking-tighter ${variance > 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                       {variance > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                       {Math.abs(variance).toFixed(1)}%
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <button className="bg-slate-100 text-slate-700 hover:bg-teal-600 hover:text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                       Breakdown
                     </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-teal-50 border-2 border-dashed border-teal-100 rounded-3xl flex gap-4 text-teal-800 items-start">
        <Info className="shrink-0 mt-1" size={24} />
        <div className="text-sm">
          <p className="font-black uppercase tracking-widest text-[10px] mb-1">Financial Integrity Disclaimer</p>
          <p className="leading-relaxed opacity-80">
            Repairs & Maintenance (R&M) and Sinking Fund amounts are statutory collections calculated at 0.75% and 0.25% of construction cost per annum. These are mandatory items that populate based on society structure even without individual expense records.
          </p>
        </div>
      </div>

      {selectedWing && (
        <DetailModal 
          wingKey={selectedWing} 
          calculation={allWingsCalculations[selectedWing]} 
          onClose={() => setSelectedWing(null)} 
        />
      )}
    </div>
  );
};

export default Ledger;
