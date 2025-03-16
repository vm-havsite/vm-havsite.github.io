
import React, { useState } from "react";
import { Search, Plus, Settings, MoreVertical } from "lucide-react";
import Avatar from "./Avatar";
import { cn } from "@/lib/utils";

// Mock data for initial UI
const MOCK_CONTACTS = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey, how are you doing?",
    time: "10:30 AM",
    unread: 3,
    status: "online",
    avatar: "",
  },
  {
    id: "2",
    name: "Bob Smith",
    lastMessage: "I'll send you the files later",
    time: "Yesterday",
    unread: 0,
    status: "offline",
    avatar: "",
  },
  {
    id: "3",
    name: "Charlie Brown",
    lastMessage: "Sounds good!",
    time: "Yesterday",
    unread: 0,
    status: "away",
    avatar: "",
  },
  {
    id: "4",
    name: "Diana Prince",
    lastMessage: "Let's meet tomorrow",
    time: "Monday",
    unread: 1,
    status: "online",
    avatar: "",
  },
];

interface SidebarProps {
  onContactSelect: (contactId: string) => void;
  selectedContactId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onContactSelect, selectedContactId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = MOCK_CONTACTS.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-border h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <Avatar name="Me" size="md" />
          <h2 className="ml-3 font-semibold">Chats</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Settings size={18} className="text-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted transition-colors">
            <Plus size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-muted text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredContacts.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No chats found
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "p-3 flex items-center hover:bg-muted/50 cursor-pointer transition-colors",
                  selectedContactId === contact.id && "bg-muted"
                )}
                onClick={() => onContactSelect(contact.id)}
              >
                <Avatar
                  name={contact.name}
                  src={contact.avatar}
                  status={contact.status as any}
                  size="md"
                />
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate pr-2">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="rounded-full bg-primary text-primary-foreground text-xs px-[6px] py-[2px] min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
