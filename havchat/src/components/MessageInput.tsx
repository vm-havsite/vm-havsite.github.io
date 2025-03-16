
import React, { useState, useRef } from "react";
import { Send, Smile, Paperclip, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";
import VoiceRecorder from "./VoiceRecorder";
import AttachmentPreview from "./AttachmentPreview";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendAttachment: (file: File) => void;
  onSendVoice: (blob: Blob) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onSendAttachment,
  onSendVoice,
}) => {
  const [message, setMessage] = useState("");
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      // Auto-send attachments one by one
      newFiles.forEach(file => {
        onSendAttachment(file);
      });
      
      // Clear the input value so the same file can be selected again
      e.target.value = "";
    }
  };
  
  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleVoiceMessageReady = (blob: Blob) => {
    onSendVoice(blob);
    setShowVoiceRecorder(false);
  };

  return (
    <div className="p-3 border-t">
      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar pb-2">
          {attachments.map((file, index) => (
            <AttachmentPreview
              key={index}
              file={file}
              onRemove={() => handleRemoveAttachment(index)}
            />
          ))}
        </div>
      )}
      
      {/* Voice recorder */}
      {showVoiceRecorder ? (
        <VoiceRecorder
          onVoiceMessageReady={handleVoiceMessageReady}
          onCancel={() => setShowVoiceRecorder(false)}
        />
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={handleAttachmentClick}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <Paperclip size={20} />
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            hidden
          />
          
          <div className="flex-1 relative">
            <textarea
              rows={1}
              placeholder="Type a message"
              className="w-full resize-none py-3 px-4 rounded-full focus:outline-none focus:ring-1 focus:ring-primary bg-muted text-foreground placeholder:text-muted-foreground pr-10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Smile size={20} />
            </button>
          </div>
          
          {message.trim() ? (
            <button
              onClick={handleSendMessage}
              className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <Send size={18} />
            </button>
          ) : (
            <button
              onClick={() => setShowVoiceRecorder(true)}
              className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
