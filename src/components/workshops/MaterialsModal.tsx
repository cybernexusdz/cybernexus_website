import React, { useState, useEffect } from "react";
import { X, FileType, Download, Loader2, Database, AlertCircle, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface MaterialsModalProps {
  workshopTitle: string;
  onClose: () => void;
  onUploadClick?: () => void;
}

interface SupabaseFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: { size: number; mimetype: string };
}

const MaterialsModal: React.FC<MaterialsModalProps> = ({ workshopTitle, onClose, onUploadClick }) => {
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = localStorage.getItem("cybernexus_admin") === "true";

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    fetchFiles();
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fetchFiles = async () => {
    try {
      const folderName = workshopTitle.replace(/\s+/g, "_");
      
      const { data, error: fetchError } = await supabase
        .storage
        .from('workshop_materials')
        .list(folderName, {
          limit: 100,
          sortBy: { column: 'name', order: 'asc' },
        });

      if (fetchError) throw fetchError;
      
      // Filter out technical placeholder files or folders (like .emptyFolderPlaceholder)
      const validFiles = data?.filter(f => f.name !== '.emptyFolderPlaceholder') || [];
      setFiles(validFiles as SupabaseFile[]);
    } catch (err: any) {
      console.error("Failed to load materials:", err);
      setError("Unable to load workshop materials. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = (fileName: string) => {
    const folderName = workshopTitle.replace(/\s+/g, "_");
    const { data } = supabase.storage.from('workshop_materials').getPublicUrl(`${folderName}/${fileName}`);
    return data.publicUrl;
  };

  const handleDeleteFile = async (fileName: string) => {
    try {
      const folderName = workshopTitle.replace(/\s+/g, "_");
      const { error: removeError } = await supabase
        .storage
        .from('workshop_materials')
        .remove([`${folderName}/${fileName}`]);

      if (removeError) throw removeError;
      
      setFiles(prev => prev.filter(f => f.name !== fileName));
    } catch (err: any) {
      console.error("Failed to delete file:", err);
      setError("Failed to delete file. Make sure your RLS delete policy is set.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-base-200 shadow-2xl border border-primary/20 rounded-2xl w-full max-w-md relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="p-6 relative z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-base-content/50 hover:text-primary transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold font-mono text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Workshop Materials
              </h3>
              <p className="text-sm font-mono text-foreground/60 mt-1">
                Resources for <span className="text-primary font-bold">{workshopTitle}</span>
              </p>
            </div>
            {isAdmin && onUploadClick && (
              <button
                onClick={onUploadClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-primary font-mono font-bold text-xs hover:bg-primary/20 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 rotate-180" />
                Upload Context
              </button>
            )}
          </div>

          <div className="min-h-[200px] flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-primary space-y-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="font-mono text-sm">Fetching files...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 flex flex-col items-center text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p className="text-sm font-mono text-red-500/90">{error}</p>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                <FileType className="w-10 h-10 text-foreground/40" />
                <div className="space-y-1">
                  <p className="font-bold font-mono text-foreground">No Materials Yet</p>
                  <p className="text-xs font-mono text-foreground/60">The instructor hasn't uploaded files for this session.</p>
                </div>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {files.map((file) => (
                  <li key={file.id || file.name} className="group flex items-center justify-between p-3 rounded-xl border border-primary/20 bg-base-100 hover:bg-primary/5 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <FileType className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0 pr-4">
                        <p className="text-sm font-bold font-mono text-foreground truncate" title={file.name}>
                          {file.name}
                        </p>
                        {file.metadata?.size && (
                          <p className="text-xs font-mono text-foreground/50">
                            {(file.metadata.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={getPublicUrl(file.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all"
                        title="Download File"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteFile(file.name)}
                          className="p-2 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all"
                          title="Delete File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsModal;
