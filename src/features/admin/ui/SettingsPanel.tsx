// src/features/admin/ui/SettingsPanel.tsx
import { useState } from "react"
import { Save, RotateCcw, Bell, Globe, Shield, Palette } from "lucide-react"

interface SettingsPanelProps {
  onSave: () => void
  onReset: () => void
}

export function SettingsPanel({ onSave, onReset }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: 'auto',
    language: 'uz',
    timezone: 'Asia/Tashkent',
    autoSave: true
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Notification settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Bildirishnomalar</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Bildirishnomalar', key: 'notifications' },
              { label: 'Email yangiliklari', key: 'emailUpdates' },
              { label: 'Avtomatik saqlash', key: 'autoSave' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span>{item.label}</span>
                <button
                  onClick={() => setSettings(prev => ({ 
                    ...prev, 
                    [item.key]: !prev[item.key as keyof typeof settings] 
                  }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings[item.key as keyof typeof settings] 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                    settings[item.key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold">Ko'rinish sozlamalari</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mavzu</label>
              <select 
                value={settings.darkMode}
                onChange={(e) => setSettings(prev => ({ ...prev, darkMode: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              >
                <option value="auto">Avtomatik</option>
                <option value="light">Yorug'</option>
                <option value="dark">Qorong'u</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Til</label>
              <select 
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              >
                <option value="uz">O'zbek</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Amallar</h3>
          <div className="space-y-3">
            <button
              onClick={onSave}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-shadow"
            >
              <Save className="w-4 h-4" />
              Sozlamalarni saqlash
            </button>
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Standart sozlamalar
            </button>
          </div>
        </div>

        {/* Account info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold">Hisob ma'lumotlari</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Rol:</span>
              <span className="font-medium">Admin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Oxirgi faollik:</span>
              <span className="font-medium">5 daqiqa oldin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">IP manzil:</span>
              <span className="font-medium">192.168.1.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}