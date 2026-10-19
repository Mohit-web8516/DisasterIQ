import {
  Bell,
  Shield,
  User,
  Database,
} from "lucide-react";

import {
  PageHeader,
  Panel,
  PanelHeader,
  Button,
} from "../components/common/UI";

function Settings() {
  return (
    <div>
      <PageHeader
        eyebrow="System"
        title="Settings"
        description="Manage command center preferences and system configuration."
      />

      <div className="max-w-4xl space-y-5">
        <Panel>
          <PanelHeader
            title="Profile"
            description="Your command center account"
          />

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <Field
              label="Name"
              value="Response Team"
            />

            <Field
              label="Role"
              value="Administrator"
            />

            <Field
              label="Email"
              value="admin@disasteriq.local"
            />

            <Field
              label="Organization"
              value="Emergency Operations"
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Notifications"
            description="Configure emergency notifications"
          />

          <div className="divide-y divide-slate-800/70">
            <Toggle
              icon={Bell}
              title="Critical incident alerts"
              description="Receive notifications for critical incidents."
              enabled
            />

            <Toggle
              icon={AlertIcon}
              title="Resource alerts"
              description="Notify when emergency resources reach low availability."
              enabled
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="System"
            description="Platform configuration"
          />

          <div className="divide-y divide-slate-800/70">
            <SettingRow
              icon={Shield}
              title="Security"
              description="Authentication and access controls"
            />

            <SettingRow
              icon={Database}
              title="Data services"
              description="Backend and database connection status"
            />
          </div>
        </Panel>

        <div className="flex justify-end">
          <Button>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-500">
        {label}
      </label>

      <input
        value={value}
        readOnly
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none"
      />
    </div>
  );
}

function Toggle({
  icon: Icon,
  title,
  description,
  enabled,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <Icon size={17} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <div
        className={`h-6 w-11 rounded-full p-1 ${
          enabled
            ? "bg-blue-600"
            : "bg-slate-700"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white transition ${
            enabled ? "ml-5" : ""
          }`}
        />
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <Bell size={17} />
  );
}

export default Settings;