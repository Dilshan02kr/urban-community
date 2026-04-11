import { Spinner } from "@/components/common/Spinner";
import { Input } from "@/components/ui";
import { useOrganization } from "@/contexts/OrganizationProvider";
import { Building2, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const buildFormFromOrg = (data = {}) => ({
  name: data.name || "",
  email: data.email || "",
  phone: data.phone || "",
  address: data.address || "",
  description: data.description || "",
});

export default function OrgProfile() {
  const { organization, getProfile, updateProfile } = useOrganization();
  const [form, setForm] = useState(buildFormFromOrg());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        await getProfile();
      } catch (fetchError) {
        console.error("Failed to fetch organization profile:", fetchError);
        setError(fetchError || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!organization) return;
    setForm(buildFormFromOrg(organization));
  }, [organization]);

  const hasChanges = useMemo(() => {
    if (!organization) return false;
    return (
      JSON.stringify(form) !== JSON.stringify(buildFormFromOrg(organization))
    );
  }, [organization, form]);

  const onFieldChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onReset = () => {
    if (!organization) return;
    setForm(buildFormFromOrg(organization));
    setError("");
    setSuccess("Changes discarded.");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Organization name is required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      description: form.description.trim(),
    };

    try {
      setSaving(true);
      await updateProfile(payload);
      setSuccess("Organization profile saved successfully.");
    } catch (saveError) {
      console.error("Failed to update organization profile:", saveError);
      setError(saveError || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl">
        <Spinner label="Loading organization profile" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Organization Profile
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Keep your profile updated so citizens can trust and reach your team.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-700 ring-1 ring-emerald-100 sm:self-auto">
          <CircleCheck className="h-4 w-4" />
          Organization Account
        </span>
      </header>

      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-lg shadow-slate-200/40"
      >
        <div className="border-b border-slate-200/80 px-6 py-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Basic Details
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Input
              id="name"
              type="text"
              label="Organization Name"
              icon={Building2}
              value={form.name}
              onChange={(val) => onFieldChange("name", val)}
              placeholder="Enter organization name"
              className="rounded-xl border-slate-300"
            />
            <Input
              id="email"
              type="email"
              label="Email Address"
              icon={Mail}
              value={form.email}
              disabled
              className="rounded-xl border-slate-200"
            />
          </div>
        </div>

        <div className="grid gap-4 px-6 py-7 sm:px-8 sm:grid-cols-2">
          <Input
            id="phone"
            type="text"
            label="Phone Number"
            icon={Phone}
            value={form.phone}
            onChange={(val) => onFieldChange("phone", val)}
            placeholder="e.g. +94 11 234 5678"
            className="rounded-xl border-slate-300"
          />
          <Input
            id="address"
            type="text"
            label="Address"
            icon={MapPin}
            value={form.address}
            onChange={(val) => onFieldChange("address", val)}
            placeholder="Enter organization address"
            className="rounded-xl border-slate-300"
          />
          <div className="sm:col-span-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Description
              </span>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => onFieldChange("description", e.target.value)}
                placeholder="Tell people what your organization does"
                rows="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium placeholder-slate-400 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>
          </div>
        </div>

        {(error || success) && (
          <div className="border-t border-slate-200/80 px-6 py-4 sm:px-8">
            {error ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                {success}
              </p>
            ) : null}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200/80 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onReset}
            disabled={saving || !hasChanges}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving || !hasChanges}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
