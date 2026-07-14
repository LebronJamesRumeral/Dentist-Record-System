"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'

export default function SettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    if (!auth) {
      window.location.href = "/";
    } else {
      setIsAuthenticated(true);
      setUserEmail(email || "");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          <PageHeader title="Clinic Settings" subtitle="Manage your clinic information and preferences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Clinic Info Card */}
            <form className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-bold text-foreground mb-2">Clinic Information</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Clinic Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="DentalVault Clinic" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Address</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="123 Main St, City, Country" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="flex gap-2 px-6 py-3">
                  <Save className="w-5 h-5" />
                  Save Info
                </Button>
              </div>
            </form>

            {/* Contact Card */}
            <form className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-bold text-foreground mb-2">Contact Details</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Contact Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="info@dentalvault.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="(555) 123-4567" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="flex gap-2 px-6 py-3">
                  <Save className="w-5 h-5" />
                  Save Contact
                </Button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
