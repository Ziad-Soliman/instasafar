
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Define the notification types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (message: string, link?: string) => void;
  clearNotifications: () => void;
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const loadNotifications = () => {
      if (!user) {
        setNotifications([]);
        setIsLoading(false);
        return;
      }
      
      try {
        const saved = localStorage.getItem(`notifications-${user.id}`);
        if (saved) {
          const parsedNotifications = JSON.parse(saved);
          // Convert string dates back to Date objects
          const notificationsWithDates = parsedNotifications.map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt)
          }));
          setNotifications(notificationsWithDates);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotifications();
  }, [user]);
  
  // Save notifications whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications-${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);
  
  // Add a new notification
  const addNotification = (message: string, link?: string) => {
    if (!user) return;
    
    const newNotification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      message,
      link,
      isRead: false,
      createdAt: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title: "New Notification",
      description: message,
      duration: 5000,
    });
  };
  
  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };
  
  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`notifications-${user.id}`);
    }
  };
  
  // Add demo notifications for testing
  useEffect(() => {
    if (user && notifications.length === 0 && !isLoading) {
      // Add some demo notifications
      const demoNotifications: Notification[] = [
        {
          id: `notif-${Date.now()}-1`,
          userId: user.id,
          message: "Welcome to InstaSafar! Start exploring Hajj and Umrah packages.",
          link: "/packages",
          isRead: false,
          createdAt: new Date()
        },
        {
          id: `notif-${Date.now()}-2`,
          userId: user.id,
          message: "Complete your profile to get personalized recommendations.",
          link: "/account/profile",
          isRead: false,
          createdAt: new Date(Date.now() - 86400000) // 1 day ago
        }
      ];
      
      setNotifications(demoNotifications);
    }
  }, [user, isLoading, notifications.length]);
  
  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    addNotification,
    clearNotifications
  };
  
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for using the notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
