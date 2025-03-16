
import React, { useState, useEffect, useRef } from "react";
import { MicIcon, StopCircleIcon, TrashIcon, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onVoiceMessageReady: (blob: Blob) => void;
  onCancel: () => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onVoiceMessageReady,
  onCancel,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // In a real implementation, we'd use the MediaRecorder API
  // For now, we'll simulate recording with a timer
  
  const startRecording = () => {
    setIsRecording(true);
    setDuration(0);
    setRecordingBlob(null);
    
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    
    // In a real app, we'd start MediaRecorder here
  };
  
  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    
    // In a real app, we'd stop MediaRecorder and get the blob
    // For now, let's simulate creating a blob
    const simulatedBlob = new Blob(["fake audio data"], { type: "audio/mp3" });
    setRecordingBlob(simulatedBlob);
  };
  
  const sendVoiceMessage = () => {
    if (recordingBlob) {
      onVoiceMessageReady(recordingBlob);
    }
  };
  
  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setRecordingBlob(null);
    setDuration(0);
    onCancel();
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-full">
      {isRecording ? (
        <>
          <div className="voice-wave ml-2">
            <span className="animate-wave-1"></span>
            <span className="animate-wave-2"></span>
            <span className="animate-wave-3"></span>
          </div>
          
          <div className="text-sm font-medium ml-1">
            {formatDuration(duration)}
          </div>
          
          <button
            onClick={stopRecording}
            className="p-2 text-destructive hover:bg-muted rounded-full transition-colors"
          >
            <StopCircleIcon size={20} />
          </button>
          
          <button
            onClick={handleCancel}
            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          >
            <TrashIcon size={18} />
          </button>
        </>
      ) : recordingBlob ? (
        <>
          <div className="text-sm font-medium ml-3">
            {formatDuration(duration)}
          </div>
          
          <button
            onClick={sendVoiceMessage}
            className="p-2 text-primary hover:bg-muted rounded-full transition-colors ml-auto"
          >
            <SendIcon size={18} />
          </button>
          
          <button
            onClick={handleCancel}
            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
          >
            <TrashIcon size={18} />
          </button>
        </>
      ) : (
        <button
          onClick={startRecording}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <MicIcon size={18} />
        </button>
      )}
    </div>
  );
};

export default VoiceRecorder;
