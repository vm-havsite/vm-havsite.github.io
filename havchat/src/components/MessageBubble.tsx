
import React, { useState } from "react";
import { Check, Clock, Music, File, Image, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type MessageStatus = "sending" | "sent" | "delivered" | "read";
export type MessageType = "text" | "image" | "voice" | "file";

export interface MessageProps {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
  status: MessageStatus;
  type: MessageType;
  fileName?: string;
  fileSize?: string;
  duration?: string;
}

const MessageBubble: React.FC<MessageProps> = ({
  content,
  sender,
  timestamp,
  status,
  type,
  fileName,
  fileSize,
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const isMe = sender === "me";

  const handlePlayVoice = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would play/pause the audio
  };

  const renderStatus = () => {
    switch (status) {
      case "sending":
        return <Clock size={14} className="text-muted-foreground" />;
      case "sent":
        return <Check size={14} className="text-muted-foreground" />;
      case "delivered":
        return (
          <div className="flex">
            <Check size={14} className="text-muted-foreground -mr-1" />
            <Check size={14} className="text-muted-foreground" />
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <Check size={14} className="text-primary -mr-1" />
            <Check size={14} className="text-primary" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "text":
        return <p className="text-sm">{content}</p>;
      
      case "image":
        return (
          <div className="rounded-lg overflow-hidden max-w-xs">
            <img 
              src={content} 
              alt="Attachment" 
              className="w-full h-auto max-h-60 object-cover" 
              loading="lazy" 
            />
          </div>
        );
      
      case "voice":
        return (
          <div className="flex items-center gap-3 min-w-[160px]">
            <button 
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
              onClick={handlePlayVoice}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            
            <div className="flex-1">
              {isPlaying ? (
                <div className="voice-wave">
                  <span className="animate-wave-1"></span>
                  <span className="animate-wave-2"></span>
                  <span className="animate-wave-3"></span>
                  <span className="animate-wave-2"></span>
                  <span className="animate-wave-1"></span>
                </div>
              ) : (
                <div className="h-2 bg-muted rounded-full w-full"></div>
              )}
              <span className="text-xs text-muted-foreground mt-1 block">
                {duration}
              </span>
            </div>
            
            <Music size={16} className="text-muted-foreground" />
          </div>
        );
      
      case "file":
        return (
          <div className="flex items-center gap-3 max-w-xs">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <File size={20} className="text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <span className="text-xs text-muted-foreground">{fileSize}</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "max-w-[70%] group animate-scale-in",
        isMe ? "self-end" : "self-start"
      )}
    >
      <div
        className={cn(
          "rounded-2xl p-3 flex flex-col",
          isMe
            ? "bg-chat-sent text-chat-sent-text rounded-tr-none"
            : "bg-chat-received text-chat-received-text rounded-tl-none",
          type === "image" && "p-1"
        )}
      >
        {renderContent()}
      </div>
      
      <div
        className={cn(
          "flex items-center text-xs mt-1 text-muted-foreground",
          isMe ? "justify-end" : "justify-start"
        )}
      >
        <span>{timestamp}</span>
        {isMe && <span className="ml-1">{renderStatus()}</span>}
      </div>
    </div>
  );
};

export default MessageBubble;
