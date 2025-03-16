
import React from "react";
import { X, File, Image, FileText, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachmentPreviewProps {
  file: File;
  onRemove: () => void;
}

const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");
  const isPdf = file.type === "application/pdf";
  
  const fileURL = URL.createObjectURL(file);
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };
  
  const getFileIcon = () => {
    if (isImage) return <Image className="text-primary" size={24} />;
    if (isVideo) return <Video className="text-primary" size={24} />;
    if (isAudio) return <Music className="text-primary" size={24} />;
    if (isPdf) return <FileText className="text-primary" size={24} />;
    return <File className="text-primary" size={24} />;
  };

  return (
    <div className="relative group animate-scale-in">
      <div className="absolute -top-2 -right-2 z-10">
        <button
          onClick={onRemove}
          className="bg-card shadow-sm rounded-full p-1 hover:bg-muted transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="rounded-lg overflow-hidden border bg-card p-3 w-full max-w-[240px]">
        {isImage ? (
          <div className="w-full h-32 overflow-hidden rounded border bg-muted">
            <img
              src={fileURL}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-muted/50">
              {getFileIcon()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttachmentPreview;
