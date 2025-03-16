
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(undefined);
  const [showChat, setShowChat] = useState(!isMobile);
  
  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId);
    if (isMobile) {
      setShowChat(true);
    }
  };
  
  const handleBackToContacts = () => {
    setShowChat(false);
  };
  
  useEffect(() => {
    // Reset view on mobile/desktop switch
    setShowChat(!isMobile);
  }, [isMobile]);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {(!isMobile || !showChat) && (
        <Sidebar 
          onContactSelect={handleContactSelect} 
          selectedContactId={selectedContactId}
        />
      )}
      
      {(!isMobile || showChat) && (
        selectedContactId ? (
          <ChatWindow 
            contactId={selectedContactId} 
            onBack={isMobile ? handleBackToContacts : undefined}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
            <div className="text-center p-6 max-w-lg">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
              <p className="text-muted-foreground">
                Select a contact from the sidebar to start chatting
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Index;
