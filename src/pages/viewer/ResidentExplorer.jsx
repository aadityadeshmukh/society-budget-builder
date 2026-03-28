import React, { useState } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { useCalculation } from '../../hooks/useCalculation';
import { Search, MapPin, ChevronRight, IndianRupee, Info, TrendingUp, TrendingDown } from 'lucide-react';

const ResidentExplorer = () => {
  const { wings } = useMaintenance();
  const { calculateForWing } = useCalculation();
  const [selectedWing, setSelectedWing] = useState('');
  
  const calculation = selectedWing ? calculateForWing(selectedWing) : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Mobile-style Header */}
      <div className="bg-teal-700 text-white p-6 pt-12 rounded-b-[2rem] shadow-lg">
        <h1 className="text-2xl font-manrope font-extrabold mb-1 italic">The Ledger</h1>
        <p className="text-teal-100 text-xs opacity-80 uppercase tracking-widest font-bold">Resident Maintenance Portal</p>
      </div>

      <div className="px-6 -mt-8">
        <div className="card p-6 shadow-xl border-0">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Find My Flat</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-300" size={18} />
            <select 
              className="w-full bg-slate-50 border-0 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-teal-500 appearance-none font-medium"
              value={selectedWing}
              onChange={(e) => setSelectedWing(e.target.value)}
            >
              <option value="">Select Wing / Unit Type</option>
              {Object.keys(wings).map(key => (
                <option key={key} value={key}>Wing {key} - {wings[key].series} Series</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {calculation ? (
        <div className="px-6 mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Total Card */}
          <div className="card bg-slate-900 text-white p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <h2 className="text-4xl font-manrope font-extrabold tracking-tight">₹{calculation.total.toLocaleString()}</h2>
                   <p className="text-teal-400 text-xs font-bold uppercase tracking-wider mt-1">Monthly Maintenance (TY)</p>
                 </div>
                 <div className="text-right">
                    <p className="text-slate-500 text-[10px] uppercase font-bold">Last Year</p>
                    <p className="text-slate-400 font-bold line-through">₹{calculation.totalLY.toLocaleString()}</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-2 py-3 border-t border-slate-800">
                 <MapPin size={14} className="text-teal-500" />
                 <span className="text-sm font-medium">Wing {selectedWing} • {calculation.wingInfo.area} sqft</span>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Breakdown & History</h3>
          
          <div className="space-y-3">
            {calculation.breakdown.map((item, idx) => {
              const lyItem = calculation.breakdownLY.find(ly => ly.id === item.id);
              const variance = lyItem?.amount ? ((item.amount / lyItem.amount) - 1) * 100 : 0;

              return (
                <div key={item.name} className="card p-4 flex justify-between items-center hover:scale-[1.02] transition-transform">
                  <div>
                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
                        {item.logic}
                      </span>
                      {variance !== 0 && (
                        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${variance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {variance > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {Math.abs(variance).toFixed(0)}% vs LY
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-slate-900">₹{item.amount.toLocaleString()}</span>
                    <p className="text-[10px] text-slate-400">₹{(item.amount / (calculation.wingInfo.area || 1)).toFixed(2)} /sqft</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card p-4 bg-cream-50 border-cream-100">
             <div className="flex gap-3">
               <Info className="text-teal-600 shrink-0" size={20} />
               <p className="text-[11px] leading-relaxed text-slate-600 italic">
                 Calculations governed by Society Bye-laws. R&M and Sinking Fund collected at 0.75% and 0.25% of construction cost per annum as per statutory requirements.
               </p>
             </div>
          </div>
        </div>
      ) : (
        <div className="px-6 mt-12 text-center space-y-4 opacity-40">
           <IndianRupee className="mx-auto" size={48} />
           <p className="text-sm font-medium italic">Select your flat series to view your breakdown</p>
        </div>
      )}
    </div>
  );
};

export default ResidentExplorer;
