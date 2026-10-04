import { useState } from 'react';
import {
  Bell,
  FileCheck,
  Check,
  Moon,
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Settings = () => {
  const [sensitivity, setSensitivity] = useState(65);
  const [alertCritical, setAlertCritical] = useState(true);
  const [alertWeekly, setAlertWeekly] = useState(false);
  const [defaultFormat, setDefaultFormat] = useState('PDF');
  const [strictMode, setStrictMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">
          Workspace Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure Legal-BERT model sensitivity, audit report templates, and notification triggers
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Workspace preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: AI Model Classification Threshold */}
        <Card
          title="Legal-BERT Classification Sensitivity"
          subtitle="Tune the probability threshold used to trigger High and Critical risk warnings"
          className="border-slate-800 bg-slate-900/60 p-6 space-y-4"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">
                Decision Boundary Threshold:
              </span>
              <span className="font-mono text-blue-400 font-bold text-sm">
                {sensitivity}%
              </span>
            </div>

            <input
              type="range"
              min="40"
              max="90"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500 border border-slate-800"
            />

            <div className="flex justify-between text-[11px] text-slate-400 pt-1">
              <span>More Sensitive (40% - More Flags)</span>
              <span>Balanced (65%)</span>
              <span>Strict Precision (90% - High Confidence Only)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={strictMode}
                onChange={(e) => setStrictMode(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/40"
              />
              <div>
                <span className="text-xs font-semibold text-slate-200">
                  Enable Strict Statutory Consumer Protections Flagging
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Flags any unilateral contract freeze or withdrawal hold regardless of governance voting thresholds.
                </p>
              </div>
            </label>
          </div>
        </Card>

        {/* Section 2: Notifications */}
        <Card
          title="Audit Notifications"
          subtitle="Configure real-time notifications for automated contract scans"
          className="border-slate-800 bg-slate-900/60 p-6 space-y-4"
        >
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-xs font-medium text-slate-200">
                    Immediate Email Alert for Critical Risks
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Trigger alert when unilateral selfdestruct or unlimited fee alterations are detected.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertCritical}
                onChange={(e) => setAlertCritical(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/40"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer">
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="text-xs font-medium text-slate-200">
                    Weekly Audit Digest
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Summary of all Solidity contracts analyzed in the previous 7 days.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={alertWeekly}
                onChange={(e) => setAlertWeekly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/40"
              />
            </label>
          </div>
        </Card>

        {/* Section 3: Interface & Export Preferences */}
        <Card
          title="Report & Display Defaults"
          subtitle="Set default export format and visual theme preferences"
          className="border-slate-800 bg-slate-900/60 p-6 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Default Export Format
              </label>
              <select
                value={defaultFormat}
                onChange={(e) => setDefaultFormat(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="PDF">PDF (Structured Executive Audit)</option>
                <option value="DOCX">DOCX (Editable Legal Draft)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Active Theme
              </label>
              <div className="flex items-center gap-2 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                <Moon className="w-4 h-4 text-blue-400" />
                <span>Enterprise Dark Slate (Locked)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Save Actions */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="md">
            Save Workspace Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
