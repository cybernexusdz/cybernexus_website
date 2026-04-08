import React, { useState } from "react";
import { X, UploadCloud, FileType, CheckCircle2, Loader2, Database, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UploadModalProps {
  workshopTitle: string;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ workshopTitle, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const folderName = workshopTitle.replace(/\s+/g, "_");
      const filePath = `${folderName}/${file.name}`;
      
      const { error: uploadError } = await supabase
        .storage
        .from('workshop_materials')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true 
        });

      if (uploadError) throw uploadError;

      setUploaded(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error("Upload failed", err);
      setError(err.message || "Upload failed. Verify 'workshop_materials' bucket exists in your Supabase.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
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

          <div className="mb-6">
            <h3 className="text-xl font-bold font-mono text-foreground flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Upload Materials
            </h3>
            <p className="text-sm font-mono text-foreground/60 mt-1">
              Add resources for <span className="text-primary font-bold">{workshopTitle}</span>
            </p>
          </div>

          {uploaded ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div className="space-y-1">
                <p className="text-green-400 font-bold font-mono text-lg">Upload Successful!</p>
                <p className="text-foreground/60 font-mono text-sm">Secured in Supabase Storage</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2 animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs font-mono text-red-500/90">{error}</p>
                </div>
              )}
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 hover:border-primary/60 hover:bg-primary/5 transition-all outline-none cursor-pointer group relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="p-3 bg-base-100 rounded-lg group-hover:scale-110 transition-transform">
                    {file ? <FileType className="w-6 h-6 text-primary" /> : <UploadCloud className="w-6 h-6 text-foreground/50 group-hover:text-primary" />}
                  </div>
                  {file ? (
                    <div className="space-y-1">
                      <p className="font-bold font-mono text-sm text-foreground">{file.name}</p>
                      <p className="text-xs font-mono text-foreground/50">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold font-mono text-sm text-foreground">Click to browse or drag and drop</p>
                      <p className="text-xs font-mono text-foreground/50 mt-1">PDF, ZIP, IPYNB, or DOCX up to 50MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-base-100/50 border border-base-content/10 flex items-center gap-3">
                  <Database className="w-4 h-4 text-foreground/50" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-bold text-foreground">Sync Target</p>
                    <p className="text-[10px] font-mono text-foreground/50 truncate">Supabase / workshop_materials / {workshopTitle?.replace(/\s+/g, "_")}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!file || isUploading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-mono font-bold flex items-center justify-center gap-2 hover:brightness-110 focus:ring-2 ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      UPLOADING...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      START UPLOAD
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
