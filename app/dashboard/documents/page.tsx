"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FileText, UploadCloud, Download } from "lucide-react";

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
        <div className="p-8 pl-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground text-lg">Manage and download medical documents</p>
            </div>
            <button className="flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition">
              <UploadCloud className="w-5 h-5" />
              Upload Document
            </button>
          </div>

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
                <button className="flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">X-Ray Results - Michael Chen</span>
                </div>
                <span className="text-sm text-muted-foreground mb-2">Uploaded: 2026-03-22</span>
                <button className="flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">Consent Form - Emily Rodriguez</span>
                </div>
                <span className="text-sm text-muted-foreground mb-2">Uploaded: 2026-02-15</span>
                <button className="flex gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition w-fit">
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
