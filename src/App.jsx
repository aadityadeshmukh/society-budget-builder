import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MaintenanceProvider } from './context/MaintenanceContext'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Configurator from './pages/admin/Configurator'
import ExpenseMapper from './pages/admin/ExpenseMapper'
import ResidentExplorer from './pages/viewer/ResidentExplorer'
import Ledger from './pages/admin/Ledger'

function App() {
  return (
    <MaintenanceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/configurator" element={<AdminLayout><Configurator /></AdminLayout>} />
          <Route path="/admin/expense-mapper" element={<AdminLayout><ExpenseMapper /></AdminLayout>} />
          <Route path="/admin/ledger" element={<AdminLayout><Ledger /></AdminLayout>} />
          <Route path="/viewer" element={<ResidentExplorer />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </MaintenanceProvider>
  )
}

export default App
