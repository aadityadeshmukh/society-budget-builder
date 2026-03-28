import React, { useState } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { Plus, Trash2, Edit2, Check, X, Info, LayoutGrid, Scaling, Users, Droplets, MapPin, Building2 } from 'lucide-react';

const Configurator = () => {
  const { 
    societyName, setSocietyName, 
    societyLocation, setSocietyLocation, 
    wings, setWings 
  } = useMaintenance();
  
  const [editingKey, setEditingKey] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newWing, setNewWing] = useState({ 
    name: '', 
    series: '', 
    units: 20,
    area: 1000, 
    taps: 2, 
    costPerSqFt: 1500 
  });

  const startEdit = (key, wing) => {
    setEditingKey(key);
    setEditForm({ ...wing, key });
  };

  const saveEdit = () => {
    const { key, ...data } = editForm;
    setWings(prev => {
        const next = { ...prev };
        delete next[editingKey];
        return { ...next, [key]: data };
    });
    setEditingKey(null);
  };

  const deleteWing = (key) => {
    if (window.confirm(`Are you sure you want to delete Wing ${key}?`)) {
      setWings(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const addWing = () => {
    if (!newWing.name) return;
    setWings(prev => ({
      ...prev,
      [newWing.name]: {
        series: newWing.series,
        units: newWing.units,
        area: newWing.area,
        taps: newWing.taps,
        costPerSqFt: newWing.costPerSqFt
      }
    }));
    setNewWing({ name: '', series: '', units: 20, area: 1000, taps: 2, costPerSqFt: 1500 });
    setIsAdding(false);
  };

  return (
    <div className="space-y-12 max-w-7xl animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-4xl font-manrope font-black text-slate-900 tracking-tighter italic">Society Structure</h2>
          <p className="text-slate-500 font-bold text-sm mt-1 uppercase tracking-widest">Define wings, configurations, and identity</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
          >
            <Plus size={20} className="text-teal-400" />
            Add Configuration
          </button>
        )}
      </div>

      <section className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/5 border border-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-4">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                    <Building2 size={24} />
                </div>
                <h3 className="text-xl font-manrope font-black text-slate-900 italic">Society Identity</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">This identity reflects on all financial reports, the civic ledger, and the resident portal headers.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 block">Society Name</label>
                    <div className="relative">
                        <input 
                            type="text"
                            className="w-full bg-slate-50 border-0 rounded-2xl px-12 py-4 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            value={societyName}
                            onChange={e => setSocietyName(e.target.value)}
                            placeholder="e.g. Emerald Residency"
                        />
                        <Building2 size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 block">Geographic Location</label>
                    <div className="relative">
                        <input 
                            type="text"
                            className="w-full bg-slate-50 border-0 rounded-2xl px-12 py-4 text-sm font-black text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            value={societyLocation}
                            onChange={e => setSocietyLocation(e.target.value)}
                            placeholder="e.g. Mumbai South"
                        />
                        <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {isAdding && (
        <div className="card p-10 bg-teal-50 border-teal-100 animate-in fade-in slide-in-from-top-4 rounded-[2.5rem]">
          <h3 className="text-xl font-manrope font-black mb-8 flex items-center gap-3 text-teal-900 italic">
            <Plus size={24} className="text-teal-600" />
            Configure New Wing Group
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 items-end">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Wing Name</label>
              <input 
                type="text"
                placeholder="e.g. A"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-black outline-none border border-teal-100"
                value={newWing.name}
                onChange={e => setNewWing({...newWing, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Series</label>
              <input 
                type="text"
                placeholder="01,02"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-black outline-none border border-teal-100"
                value={newWing.series}
                onChange={e => setNewWing({...newWing, series: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Total Units</label>
              <input 
                type="number"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-black outline-none border border-teal-100"
                value={newWing.units}
                onChange={e => setNewWing({...newWing, units: parseInt(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Area / Unit</label>
              <input 
                type="number"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-black outline-none border border-teal-100"
                value={newWing.area}
                onChange={e => setNewWing({...newWing, area: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Taps / Unit</label>
              <input 
                type="number"
                className="w-full bg-white rounded-xl px-4 py-3 text-sm font-black outline-none border border-teal-100"
                value={newWing.taps}
                onChange={e => setNewWing({...newWing, taps: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={addWing}
                className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-black text-sm hover:bg-teal-700 shadow-xl shadow-teal-900/10 transition-all"
              >
                Save
              </button>
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-white text-slate-500 py-3 rounded-xl font-black text-sm border border-teal-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-white">
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">Wing / Series</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Units</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Area (sqft)</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-center">Taps</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Cost/sqft</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 bg-white">
            {Object.entries(wings).map(([key, wing]) => (
              <tr key={key} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-10 py-6">
                  {editingKey === key ? (
                    <input 
                      className="bg-slate-50 border-0 rounded-lg px-4 py-2 w-32 text-sm font-black outline-none ring-2 ring-teal-500"
                      value={editForm.key}
                      onChange={e => setEditForm({...editForm, key: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-teal-500 group-hover:text-white transition-all">
                            <LayoutGrid size={20} />
                        </div>
                        <div>
                            <span className="font-black text-slate-900 block text-lg tracking-tight italic">Wing {key}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{wing.series || 'All'} Series</span>
                        </div>
                    </div>
                  )}
                </td>
                <td className="px-10 py-6 text-center font-black text-slate-900">
                   {editingKey === key ? (
                    <input 
                      type="number"
                      className="bg-slate-50 border-0 rounded-lg px-2 py-2 w-20 text-center text-sm font-black outline-none ring-2 ring-teal-500"
                      value={editForm.units}
                      onChange={e => setEditForm({...editForm, units: parseInt(e.target.value)})}
                    />
                  ) : wing.units}
                </td>
                <td className="px-10 py-6 text-right text-sm font-black text-slate-900">
                   {editingKey === key ? (
                    <input 
                      type="number"
                      className="bg-slate-50 border-0 rounded-lg px-4 py-2 w-32 text-right text-sm font-black outline-none ring-2 ring-teal-500"
                      value={editForm.area}
                      onChange={e => setEditForm({...editForm, area: parseFloat(e.target.value)})}
                    />
                  ) : `${wing.area.toLocaleString()}`}
                </td>
                <td className="px-10 py-6 text-center text-sm font-black text-slate-900">
                   {editingKey === key ? (
                    <input 
                      type="number"
                      className="bg-slate-50 border-0 rounded-lg px-2 py-2 w-20 text-center text-sm font-black outline-none ring-2 ring-teal-500"
                      value={editForm.taps}
                      onChange={e => setEditForm({...editForm, taps: parseInt(e.target.value)})}
                    />
                  ) : wing.taps}
                </td>
                <td className="px-10 py-6 text-right text-sm font-mono font-black text-slate-400">
                   {editingKey === key ? (
                    <input 
                      type="number"
                      className="bg-slate-50 border-0 rounded-lg px-4 py-2 w-32 text-right text-sm font-black outline-none ring-2 ring-teal-500"
                      value={editForm.costPerSqFt}
                      onChange={e => setEditForm({...editForm, costPerSqFt: parseFloat(e.target.value)})}
                    />
                  ) : `₹${wing.costPerSqFt}`}
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center justify-end gap-3 text-slate-300">
                    {editingKey === key ? (
                      <>
                        <button onClick={saveEdit} className="text-teal-600 hover:text-teal-700 bg-teal-50 p-2 rounded-xl">
                          <Check size={20} />
                        </button>
                        <button onClick={() => setEditingKey(null)} className="text-rose-500 hover:text-rose-600 bg-rose-50 p-2 rounded-xl">
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(key, wing)} className="hover:text-teal-600 hover:bg-teal-50 p-2 rounded-xl transition-all">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deleteWing(key)} className="hover:text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-all">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-950 p-10 rounded-[2.5rem] text-white flex gap-6 shadow-2xl shadow-slate-900/40">
        <Info className="text-teal-400 shrink-0 mt-1" size={28} />
        <div className="space-y-4">
          <p className="text-xl font-manrope font-black italic tracking-tight">Technical Note: Denominator Calibration</p>
          <p className="text-slate-400 leading-relaxed font-bold text-sm">
            The society structure defines the <span className="text-teal-500">Fixed Cost Denominators</span>. 
            Modifying "Flat Count" or "Area" will trigger an immediate recalibration across the entire Civic Ledger. 
            All past budget projections (LY) remain static as they were calculated using historical wing configurations.
          </p>
          <div className="flex gap-4 pt-4">
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
                 <Scaling size={16} className="text-teal-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Auto-Calibration Active</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
