
import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Phone, Video, Search, ArrowLeft } from "lucide-react";
import Avatar from "./Avatar";
import MessageBubble, { MessageProps } from "./MessageBubble";
import MessageInput from "./MessageInput";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock contact data
interface Contact {
  id: string;
  name: string;
  status: "online" | "offline" | "away";
  avatar?: string;
  lastSeen?: string;
}

// Mock data
const MOCK_CONTACTS: Record<string, Contact> = {
  "1": {
    id: "1",
    name: "Alice Johnson",
    status: "online",
    avatar: "",
  },
  "2": {
    id: "2",
    name: "Bob Smith",
    status: "offline",
    lastSeen: "Last seen today at 12:45 PM",
    avatar: "",
  },
  "3": {
    id: "3",
    name: "Charlie Brown",
    status: "away",
    lastSeen: "Last seen yesterday",
    avatar: "",
  },
  "4": {
    id: "4",
    name: "Diana Prince",
    status: "online",
    avatar: "",
  },
};

// Mock messages
const MOCK_MESSAGES: Record<string, MessageProps[]> = {
  "1": [
    {
      id: "1",
      content: "Hey, how are you doing?",
      sender: "other",
      timestamp: "10:30 AM",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "I'm good, thanks for asking! How about you?",
      sender: "me",
      timestamp: "10:31 AM",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      content: "I'm doing well. Do you want to grab lunch today?",
      sender: "other",
      timestamp: "10:32 AM",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      content: "Sure, that sounds great!",
      sender: "me",
      timestamp: "10:33 AM",
      status: "read",
      type: "text",
    },
    {
      id: "5",
      content: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      sender: "other",
      timestamp: "10:35 AM",
      status: "read",
      type: "image",
    },
    {
      id: "6",
      content: "This looks delicious!",
      sender: "me",
      timestamp: "10:36 AM",
      status: "delivered",
      type: "text",
    },
    {
      id: "7",
      content: "",
      sender: "other",
      timestamp: "10:37 AM",
      status: "delivered",
      type: "voice",
      duration: "0:15",
    },
    {
      id: "8",
      content: "",
      sender: "me",
      timestamp: "10:39 AM",
      status: "sent",
      type: "file",
      fileName: "Meeting_Notes.pdf",
      fileSize: "2.3 MB",
    },
  ],
  "2": [
    {
      id: "1",
      content: "Hi there!",
      sender: "other",
      timestamp: "Yesterday",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "Hello! How can I help you?",
      sender: "me",
      timestamp: "Yesterday",
      status: "read",
      type: "text",
    },
  ],
  "3": [
    {
      id: "1",
      content: "Are we still meeting tomorrow?",
      sender: "other",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "Yes, 2pm at the coffee shop.",
      sender: "me",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      content: "Sounds good!",
      sender: "other",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
  ],
  "4": [
    {
      id: "1",
      content: "Have you seen the latest project requirements?",
      sender: "other",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "Yes, I'm working on them now.",
      sender: "me",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
    {
      id: "3",
      content: "Great, let me know if you have any questions.",
      sender: "other",
      timestamp: "Monday",
      status: "read",
      type: "text",
    },
    {
      id: "4",
      content: "",
      sender: "me",
      timestamp: "Monday",
      status: "delivered",
      type: "file",
      fileName: "Project_Report.docx",
      fileSize: "1.8 MB",
    },
  ],
};

interface ChatWindowProps {
  contactId: string;
  onBack?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contactId, onBack }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Load messages for the selected contact
    if (contactId && MOCK_MESSAGES[contactId]) {
      setMessages(MOCK_MESSAGES[contactId]);
    } else {
      setMessages([]);
    }
  }, [contactId]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const contact = MOCK_CONTACTS[contactId];
  
  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Select a contact to start chatting</p>
      </div>
    );
  }
  
  const handleSendMessage = (content: string) => {
    const newMessage: MessageProps = {
      id: `msg-${Date.now()}`,
      content,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending",
      type: "text",
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message sending
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
      
      // Simulate message being delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
        
        // Simulate message being read
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: "read" } : msg
            )
          );
        }, 1000);
      }, 1000);
    }, 500);
  };
  
  const handleSendAttachment = (file: File) => {
    const isImage = file.type.startsWith("image/");
    
    const newMessage: MessageProps = {
      id: `msg-${Date.now()}`,
      content: isImage ? URL.createObjectURL(file) : "",
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending",
      type: isImage ? "image" : "file",
      fileName: file.name,
      fileSize: file.size < 1024 * 1024 
        ? `${(file.size / 1024).toFixed(1)} KB` 
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message sending process
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);
    }, 500);
  };
  
  const handleSendVoice = (blob: Blob) => {
    const newMessage: MessageProps = {
      id: `msg-${Date.now()}`,
      content: "",
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sending",
      type: "voice",
      duration: "0:07", // In real app, calculate actual duration
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message sending process
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
          )
        );
      }, 1000);
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center shadow-sm glass sticky top-0 z-10">
        {isMobile && (
          <button 
            onClick={onBack}
            className="mr-2 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      
        <Avatar
          name={contact.name}
          src={contact.avatar}
          status={contact.status}
          size="md"
        />
        
        <div className="ml-3 flex-1">
          <h2 className="font-medium">{contact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {contact.status === "online" 
              ? "Online" 
              : contact.lastSeen || "Offline"}
          </p>
        </div>
        
        <div className="flex gap-1">
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background/95 hide-scrollbar">
        {messages.map((message) => (
          <MessageBubble key={message.id} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onSendAttachment={handleSendAttachment}
        onSendVoice={handleSendVoice}
      />
    </div>
  );
};

export default ChatWindow;
