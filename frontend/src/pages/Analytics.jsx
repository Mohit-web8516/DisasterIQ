import {
  TrendingUp,
  AlertTriangle,
  Users,
  Activity,
} from "lucide-react";

import {
  PageHeader,
  Panel,
  PanelHeader,
} from "../components/common/UI";

function Analytics() {
  return (
    <div>
      <PageHeader
        eyebrow="Intelligence"
        title="Disaster Analytics"
        description="Understand incident trends, risk distribution and response performance."
        action={
          <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 outline-none">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={Activity}
          label="Total incidents"
          value="47"
          change="+12%"
        />

        <Metric
          icon={AlertTriangle}
          label="Critical incidents"
          value="12"
          change="+8%"
        />

        <Metric
          icon={Users}
          label="People affected"
          value="1,284"
          change="+18%"
        />

        <Metric
          icon={TrendingUp}
          label="Response rate"
          value="87%"
          change="+5%"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel>
          <PanelHeader
            title="Incident Trend"
            description="Incidents reported over the selected period"
          />

          <div className="p-5">
            <div className="flex h-[280px] items-end gap-3 border-b border-l border-slate-800 px-4 pb-0">
              {[35, 48, 42, 65, 54, 78, 92, 70, 84, 63, 75, 88].map(
                (height, index) => (
                  <div
                    key={index}
                    className="group flex h-full flex-1 items-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-blue-500/70 transition group-hover:bg-blue-400"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-600">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>Now</span>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Risk Distribution"
            description="Current incidents grouped by severity"
          />

          <div className="space-y-6 p-5">
            <RiskRow
              label="Critical"
              count="12"
              percentage={26}
              color="bg-red-500"
            />

            <RiskRow
              label="High"
              count="18"
              percentage={38}
              color="bg-orange-500"
            />

            <RiskRow
              label="Moderate"
              count="12"
              percentage={26}
              color="bg-yellow-500"
            />

            <RiskRow
              label="Low"
              count="5"
              percentage={10}
              color="bg-emerald-500"
            />
          </div>
        </Panel>
      </div>

      <Panel className="mt-6">
        <PanelHeader
          title="Response Performance"
          description="Operational metrics for the current response period"
        />

        <div className="grid grid-cols-1 divide-y divide-slate-800/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Performance
            title="Average response time"
            value="14 min"
          />

          <Performance
            title="Incidents resolved"
            value="32"
          />

          <Performance
            title="Resources deployed"
            value="31"
          />
        </div>
      </Panel>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  change,
}) {
  return (
    <Panel className="p-5">
      <Icon size={19} className="text-blue-400" />

      <p className="mt-5 text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-2 text-xs font-semibold text-emerald-400">
        {change} from previous period
      </p>
    </Panel>
  );
}

function RiskRow({
  label,
  count,
  percentage,
  color,
}) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">
          {label}
        </span>

        <span className="text-slate-500">
          {count} incidents
        </span>
      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function Performance({
  title,
  value,
}) {
  return (
    <div className="p-6">
      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-2xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

export default Analytics;