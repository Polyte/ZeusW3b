import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, X, Send, Headphones, Minimize2 } from "lucide-react";
import { ChatService } from "../utils/database/services";
import {
  buildZeusLabsChatMessages,
  fetchDeepseekReply,
} from "../utils/deepseekChat";

interface Message {
  id: string;
  message: string;
  sender: "customer" | "support";
  senderName: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  customerName: string;
  customerEmail: string;
  status: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: ""
  });
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<number | null>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Polling for new messages
  useEffect(() => {
    if (chatId && isOpen) {
      const pollMessages = async () => {
        try {
          const dbMessages = await ChatService.getMessages(parseInt(chatId));
          
          // Transform database messages to component format
          const transformedMessages: Message[] = dbMessages.map(msg => ({
            id: msg.id?.toString() || '',
            message: msg.message,
            sender: msg.sender as "customer" | "support",
            senderName: msg.sender === 'customer' ? customerInfo.name : 'ZeusLabs AI',
            timestamp: msg.created_at || new Date().toISOString()
          }));
          
          // Check for new messages
          if (transformedMessages.length > messages.length) {
            setMessages(transformedMessages);
            if (!isOpen) {
              setHasNewMessage(true);
            }
          }
        } catch (error) {
          console.error("Error polling messages:", error);
        }
      };

      // Poll every 3 seconds
      pollingRef.current = window.setInterval(pollMessages, 3000);
      
      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      };
    }
  }, [chatId, isOpen, messages.length, customerInfo.name]);

  const startChat = async () => {
    if (!customerInfo.name || !customerInfo.email) return;

    setIsStartingChat(true);
    try {
      // Create new chat session
      const sessionId = await ChatService.createSession(customerInfo.name, customerInfo.email);
      setChatId(sessionId.toString());
      
      // Add welcome message
      const welcome = `Hi ${customerInfo.name}! 👋 I'm the ZeusLabs website assistant. Ask me about our services, projects, or how to get in touch — I answer from what's on this site.`;
      await ChatService.addMessage(sessionId, "support", welcome);
      
      setMessages([{
        id: "welcome",
        message: welcome,
        sender: "support",
        senderName: "ZeusLabs AI",
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setIsStartingChat(false);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || !chatId || isSending) return;

    setIsSending(true);
    const messageToSend = currentMessage.trim();
    setCurrentMessage("");

    try {
      // Add customer message
      const messageId = await ChatService.addMessage(parseInt(chatId), "customer", messageToSend);
      
      const newMessage: Message = {
        id: messageId.toString(),
        message: messageToSend,
        sender: "customer",
        senderName: customerInfo.name,
        timestamp: new Date().toISOString()
      };
      
      const conversation = [...messages, newMessage];
      setMessages(conversation);

      const apiMessages = buildZeusLabsChatMessages(conversation);
      const reply = await fetchDeepseekReply(apiMessages);
      const supportMessageId = await ChatService.addMessage(
        parseInt(chatId),
        "support",
        reply,
      );

      setMessages((prev) => [
        ...prev,
        {
          id: supportMessageId.toString(),
          message: reply,
          sender: "support",
          senderName: "ZeusLabs AI",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      const fallback =
        "Sorry — I couldn't reach the assistant just now. Please try again in a moment, or use the Contact page on the site and we'll follow up.";
      try {
        const supportMessageId = await ChatService.addMessage(
          parseInt(chatId),
          "support",
          fallback,
        );
        setMessages((prev) => [
          ...prev,
          {
            id: supportMessageId.toString(),
            message: fallback,
            sender: "support",
            senderName: "ZeusLabs AI",
            timestamp: new Date().toISOString(),
          },
        ]);
      } catch {
        // ignore secondary storage errors
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (chatId) {
        sendMessage();
      } else {
        startChat();
      }
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-8 left-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-2xl flex items-center justify-center group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* New Message Indicator */}
          {hasNewMessage && !isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            />
          )}

          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-teal-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
        >
          Chat with us!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed left-8 z-50 ${isMinimized ? 'bottom-24' : 'bottom-24'}`}
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              height: isMinimized ? "auto" : 480
            }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <Card className="w-80 shadow-2xl border-2 border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle 
                        className="text-sm text-foreground"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        ZeusLabs AI
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span 
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          Online now
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      <Minimize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={toggleChat}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col">
                  {/* Chat Messages */}
                  <div className="h-64 overflow-y-auto p-4 space-y-3 bg-muted/20">
                    {!chatId ? (
                      // Start Chat Form
                      <div className="space-y-4">
                        <div className="text-center text-sm text-muted-foreground mb-4">
                          <p style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                            👋 Welcome to ZeusLabs! <br />
                            Let's start a conversation.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <Input
                            placeholder="Your name"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                            onKeyPress={handleKeyPress}
                            className="text-sm"
                            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                          />
                          <Input
                            type="email"
                            placeholder="Your email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                            onKeyPress={handleKeyPress}
                            className="text-sm"
                            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                          />
                          <Button
                            onClick={startChat}
                            disabled={!customerInfo.name || !customerInfo.email || isStartingChat}
                            className="w-full btn-gradient-green text-sm"
                            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                          >
                            {isStartingChat ? "Starting..." : "Start Chat"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Messages
                      <>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                              message.sender === 'customer' 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                                : 'bg-card border border-border/50 text-foreground'
                            }`}>
                              <div 
                                className="font-medium text-xs opacity-70 mb-1"
                                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                              >
                                {message.sender === 'customer' ? 'You' : message.senderName}
                              </div>
                              <p 
                                className="break-words"
                                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                              >
                                {message.message}
                              </p>
                              <div 
                                className="text-xs opacity-60 mt-1"
                                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                              >
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  {chatId && (
                    <div className="p-4 border-t border-border/50">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isSending}
                          className="flex-1 text-sm"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        />
                        <Button
                          onClick={sendMessage}
                          disabled={!currentMessage.trim() || isSending}
                          size="icon"
                          className="btn-gradient-green"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}