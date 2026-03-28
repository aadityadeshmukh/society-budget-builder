import React, { useState } from 'react';
import { useMaintenance } from '../../context/MaintenanceContext';
import { IndianRupee, Layers, Users, Scaling, Droplets, Info, Plus, Trash2, Tag, ArrowUpRight, ArrowDownRight, LayoutGrid, Calculator } from 'lucide-react';

const LogicBadge = ({ logic }) => {
  const configs = {
    'Equal': { color: 'bg-indigo-100 text-indigo-700', icon: Users, label: 'Equal Split' },
    'Area-Based': { color: 'bg-amber-100 text-amber-700', icon: Scaling, label: 'Area Based' },
    'Tap-Based': { color: 'bg-cyan-100 text-cyan-700', icon: Droplets, label: 'Consumption' },
    'Construction-Based': { color: 'bg-purple-100 text-purple-700', icon: Layers, label: 'Statutory (%)' },
  };
  const config = configs[logic] || configs['Equal'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter ${config.color}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

const ExpenseMapper = () => {
  const { categories, setCategories, expenses, setExpenses } = useMaintenance();
  const [newExpense, setNewExpense] = useState({ 
    name: '', 
    lastYearAmount: '', 
    thisYearAmount: '', 
    categoryId: categories[0]?.id || 'service' 
  });
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', logic: 'Equal', rate: 0.75 });

  const addExpense = () => {
    if (!newExpense.name || !newExpense.thisYearAmount) return;
    setExpenses(prev => [...prev, { 
      ...newExpense, 
      id: Date.now(), 
      lastYearAmount: parseFloat(newExpense.lastYearAmount) || 0,
      thisYearAmount: parseFloat(newExpense.thisYearAmount) || 0 
    }]);
    setNewExpense({ ...newExpense, name: '', lastYearAmount: '', thisYearAmount: '' });
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addCategory = () => {
    if (!newCat.name) return;
    const id = newCat.name.toLowerCase().replace(/\s+/g, '-');
    if (categories.some(c => c.id === id)) return;
    setCategories(prev => [...prev, { ...newCat, id }]);
    setNewCat({ name: '', logic: 'Equal', rate: 0.75 });
    setIsAddingCat(false);
  };

  const deleteCategory = (id) => {
    if (expenses.some(e => e.categoryId === id)) {
      alert("Cannot delete category with active bill records. Please remove the bills first.");
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateCategoryLogic = (catId, logic) => {
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, logic } : c));
  };

  const totalLY = expenses.reduce((s,e) => s + e.lastYearAmount, 0);
  const totalTY = expenses.reduce((s,e) => s + e.thisYearAmount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-manrope font-black text-slate-900 tracking-tight">Expenses & Budget</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Define bill categories and capture year-over-year actuals</p>
        </div>
        <button 
          onClick={() => setIsAddingCat(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
        >
          <Plus size={20} />
          Define New Budget Type
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-slate-100">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600 mb-6 flex items-center gap-2">
          <Calculator size={16} />
          Quick Entry: Record Bill Actuals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Item Name</label>
            <input 
              type="text"
              placeholder="e.g. Annual Lift Maintenance"
              className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              value={newExpense.name}
              onChange={e => setNewExpense({...newExpense, name: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">LY Actual (₹)</label>
            <input 
              type="number"
              placeholder="0.00"
              className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm font-mono focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              value={newExpense.lastYearAmount}
              onChange={e => setNewExpense({...newExpense, lastYearAmount: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">TY Actual (₹)</label>
            <input 
              type="number"
              placeholder="0.00"
              className="w-full bg-teal-50 border-0 rounded-2xl px-5 py-4 text-sm font-mono font-black text-teal-900 focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              value={newExpense.thisYearAmount}
              onChange={e => setNewExpense({...newExpense, thisYearAmount: e.target.value})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Budget Category</label>
            <select 
              className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-teal-500"
              value={newExpense.categoryId}
              onChange={e => setNewExpense({...newExpense, categoryId: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button 
              onClick={addExpense}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
            >
              Save Bill
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3 space-y-12">
          {categories.map((cat) => (
            <div key={cat.id} className="group">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <LayoutGrid size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-manrope font-black text-slate-800 tracking-tight">{cat.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <LogicBadge logic={cat.logic} />
                        <button 
                            onClick={() => deleteCategory(cat.id)} 
                            className="text-slate-200 hover:text-rose-500 transition-all p-1 hover:bg-rose-50 rounded-lg group/del"
                            title="Delete Category"
                        >
                            <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" />
                        </button>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1 border border-slate-100">
                    {['Equal', 'Area-Based', 'Tap-Based', 'Construction-Based'].map(l => (
                        <button 
                            key={l}
                            onClick={() => updateCategoryLogic(cat.id, l)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${cat.logic === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {l.split('-')[0]}
                        </button>
                    ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {cat.logic === 'Construction-Based' ? (
                  <div className="bg-purple-50 p-6 rounded-[2rem] border border-purple-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm shrink-0">
                        <Layers size={24} />
                    </div>
                    <div>
                      <p className="font-black text-purple-900 uppercase tracking-widest text-xs mb-1">Statutory Formula Active</p>
                      <p className="text-sm text-purple-800/70 leading-relaxed font-medium">
                        Collections are calculated as <strong>{cat.rate}% of Construction Cost</strong> per annum. 
                        Individual bill records are for internal audit only and do not affect the maintenance split for this category.
                      </p>
                    </div>
                  </div>
                ) : (
                  expenses.filter(e => e.categoryId === cat.id).length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2rem]">
                      <div className="p-4 bg-white rounded-full text-slate-300 mb-4">
                         <Calculator size={32} />
                      </div>
                      <p className="text-sm font-bold text-slate-400 tracking-tight">No expenditures grouped under {cat.name} yet.</p>
                    </div>
                  ) : (
                    expenses.filter(e => e.categoryId === cat.id).map(expense => {
                      const variance = expense.lastYearAmount ? ((expense.thisYearAmount / expense.lastYearAmount) - 1) * 100 : 0;
                      return (
                        <div key={expense.id} className="flex justify-between items-center bg-white p-5 rounded-[1.5rem] border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5 transition-all group/item">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 transition-colors group-hover/item:bg-teal-600 group-hover/item:text-white">
                               <Tag size={18} />
                             </div>
                             <div>
                                <span className="font-bold text-slate-800 block text-lg tracking-tight">{expense.name}</span>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">LY Actual: ₹{expense.lastYearAmount.toLocaleString()}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-10">
                            <div className="text-right">
                               <span className="font-mono font-black block text-xl text-slate-900">₹{expense.thisYearAmount.toLocaleString()}</span>
                               <span className={`text-xs font-black flex items-center justify-end gap-1 ${variance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                 {variance > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                 {Math.abs(variance).toFixed(1)}%
                               </span>
                            </div>
                            <button 
                                onClick={() => deleteExpense(expense.id)} 
                                className="opacity-40 group-hover/item:opacity-100 p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                title="Remove Bill"
                            >
                                <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl shadow-slate-900/30">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 mb-8 flex items-center gap-2">
              <Calculator size={16} />
              Budget Control
            </h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Total LY Expenditure</span>
                <p className="text-3xl font-mono font-black opacity-30 italic">₹{totalLY.toLocaleString()}</p>
              </div>
              <div className="space-y-2 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-teal-400 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 block">Planned TY Budget</span>
                <p className="text-4xl font-mono font-black text-white">₹{totalTY.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-4">
                   <span className={`text-xs font-black px-3 py-1 rounded-full ${totalTY > totalLY ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {totalTY > totalLY ? '+' : ''}{totalLY ? (((totalTY/totalLY)-1)*100).toFixed(1) : 0}% Variance
                   </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Note: This summary only includes captured bill records. Statutory amounts (R&M/SF) are tracked separately in the global ledger.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isAddingCat && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-3xl animate-in fade-in zoom-in duration-300">
             <h2 className="text-3xl font-manrope font-black mb-8 text-slate-900 tracking-tight">Define Budget Category</h2>
             <div className="space-y-6 mb-10">
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category Name</label>
                  <input 
                    type="text"
                    className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold outline-none ring-teal-500 focus:ring-2 transition-all"
                    placeholder="e.g. Security & Surveillance"
                    value={newCat.name}
                    onChange={e => setNewCat({...newCat, name: e.target.value})}
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Allocation Strategy</label>
                  <select 
                    className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 text-sm font-bold outline-none ring-teal-500 focus:ring-2 appearance-none transition-all"
                    value={newCat.logic}
                    onChange={e => setNewCat({...newCat, logic: e.target.value})}
                  >
                    <option value="Equal">Divide Equally Per Unit</option>
                    <option value="Area-Based">Weight by Square Footage</option>
                    <option value="Tap-Based">Weight by Water Taps</option>
                    <option value="Construction-Based">Statutory % of Construction</option>
                  </select>
               </div>
             </div>
             <div className="flex gap-4">
               <button onClick={addCategory} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">Create Category</button>
               <button onClick={() => setIsAddingCat(false)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-sm">Cancel</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseMapper;
