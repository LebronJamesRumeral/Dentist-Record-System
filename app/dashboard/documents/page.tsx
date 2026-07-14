"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FileText, UploadCloud, Download } from "lucide-react";
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/PageHeader'

export default function DocumentsPage() {
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
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="documents" onNavigate={(page) => {
        if (page === 'appointments') window.location.href = '/dashboard/appointment';
        else if (page === 'patients') window.location.href = '/dashboard';
        else if (page === 'reports') window.location.href = '/dashboard/reports';
        else if (page === 'documents') window.location.href = '/dashboard/documents';
        else if (page === 'settings') window.location.href = '/dashboard/settings';
      }} userEmail={userEmail} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 md:pl-12 pb-24 md:pb-8">
          <PageHeader
            title="Documents"
            subtitle="Manage and download medical documents"
            actions={<Button className="flex gap-2 px-4 py-2"><UploadCloud className="w-5 h-5" /> Upload Document</Button>}
          />

          {/* Documents List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Available Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mock document cards */}
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">Medical History - Sarah Johnson</span>
                </div>
                <span className="text-sm text-muted-foreground mb-2">Uploaded: 2026-04-10</span>
                <Button className="flex gap-2 px-4 py-2 w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">X-Ray Results - Michael Chen</span>
                </div>
                <span className="text-sm text-muted-foreground mb-2">Uploaded: 2026-03-22</span>
                <Button className="flex gap-2 px-4 py-2 w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">Consent Form - Emily Rodriguez</span>
                </div>
                <span className="text-sm text-muted-foreground mb-2">Uploaded: 2026-02-15</span>
                <Button className="flex gap-2 px-4 py-2 w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
