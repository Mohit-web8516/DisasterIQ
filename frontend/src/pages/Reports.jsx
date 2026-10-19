import { useState } from "react";
import {
  AlertTriangle,
  MapPin,
  Users,
  FileText,
  Send,
  CheckCircle2,
  LocateFixed,
} from "lucide-react";

const initialForm = {
  title: "",
  type: "Flood",
  severity: "High",
  location: "",
  affectedPeople: "",
  description: "",
  reporterName: "",
  contact: "",
};

const disasterTypes = [
  "Flood",
  "Waterlogging",
  "Road Blockage",
  "Building Damage",
  "Fire",
  "Medical Emergency",
  "Landslide",
  "Other",
];

function Reports() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = `RPT-${Date.now().toString().slice(-6)}`;

    setReportId(id);
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setSubmitted(false);
    setReportId("");
  };

  if (submitted) {
    return (
      <div className="min-w-0">
        <div className="mx-auto max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2
              size={30}
              className="text-green-400"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Emergency Report Submitted
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Your report has been received by the DisasterIQ
            command center. The incident will be reviewed and
            prioritized by the response team.
          </p>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Report Reference
              </span>

              <span className="font-mono text-sm font-semibold text-blue-400">
                {reportId}
              </span>
            </div>

            <div className="mt-3 border-t border-slate-800 pt-3">
              <p className="text-sm font-medium text-slate-200">
                {form.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {form.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-blue-400">
          Emergency Operations
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Emergency Reporting
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Report a disaster, hazard or emergency situation to
          the response command center.
        </p>
      </section>

      {/* Emergency notice */}
      <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={19}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <div>
            <p className="text-sm font-semibold text-red-300">
              Emergency Situation?
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Provide accurate information so response teams can
              assess the situation and coordinate assistance. For
              immediate life-threatening emergencies, contact
              local emergency services.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-800 bg-slate-900"
      >
        {/* Form header */}
        <div className="border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
              <FileText
                size={18}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Incident Report
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Fields marked with * are required.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5">
          {/* Incident information */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Incident Information
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Incident Title *
                </label>

                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Flooded residential area"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Incident Type *
                </label>

                <select
                  required
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  {disasterTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Initial Severity *
                </label>

                <select
                  required
                  name="severity"
                  value={form.severity}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-200">
              Location & Impact
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Location *
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    required
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  People Affected *
                </label>

                <div className="relative">
                  <Users
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    required
                    min="0"
                    type="number"
                    name="affectedPeople"
                    value={form.affectedPeople}
                    onChange={handleChange}
                    placeholder="Estimated number"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-blue-500 hover:text-blue-400"
                >
                  <LocateFixed size={14} />
                  Use Current Location
                </button>

                <p className="mt-2 text-[11px] text-slate-600">
                  Location detection will be connected to the
                  geolocation service during backend integration.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-800 pt-6">
            <label className="text-sm font-semibold text-slate-200">
              Situation Description *
            </label>

            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe what is happening, visible hazards, access conditions, injuries or other relevant information..."
              className="mt-4 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          {/* Reporter */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-200">
              Reporter Information
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Name
                </label>

                <input
                  name="reporterName"
                  value={form.reporterName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Contact
                </label>

                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Phone or email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-end gap-3 border-t border-slate-800 px-5 py-4 sm:flex-row">
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            Clear
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            <Send size={15} />
            Submit Emergency Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reports;