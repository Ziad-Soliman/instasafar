
"use client"

import { useState, FormEvent } from "react"
import { Send, MessageCircle, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

export function TravelAssistantChat() {
  const { t, isRTL } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 1,
      content: isRTL 
        ? "مرحباً! أنا مساعدك للسفر. كيف يمكنني مساعدتك اليوم؟" 
        : "Hello! I'm your travel assistant. How can I help you today?",
      sender: "ai",
    },
    {
      id: 2,
      content: isRTL 
        ? "يمكنني مساعدتك في العثور على الفنادق والحزم السياحية والرحلات الجوية ووسائل النقل في المملكة العربية السعودية." 
        : "I can help you find hotels, travel packages, flights, and transport in Saudi Arabia.",
      sender: "ai",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = isRTL ? [
        "شكراً لسؤالك! دعني أساعدك في العثور على أفضل الخيارات.",
        "هذا سؤال رائع! يمكنني تقديم توصيات مخصصة لك.",
        "سأكون سعيداً لمساعدتك. هل تحتاج إلى مزيد من التفاصيل؟",
        "ممتاز! يمكنني مساعدتك في التخطيط لرحلتك.",
      ] : [
        "Thank you for your question! Let me help you find the best options.",
        "That's a great question! I can provide personalized recommendations for you.",
        "I'd be happy to help you with that. Do you need more details?",
        "Excellent! I can help you plan your perfect trip.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: randomResponse,
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleAttachFile = () => {
    // File attachment functionality
  }

  const handleMicrophoneClick = () => {
    // Voice input functionality
  }

  return (
    <ExpandableChat
      size="lg"
      position={isRTL ? "bottom-left" : "bottom-right"}
      icon={<MessageCircle className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center bg-saudi-green text-white">
        <h1 className="text-xl font-semibold">
          {isRTL ? "مساعد السفر 🧳" : "Travel Assistant 🧳"}
        </h1>
        <p className="text-sm text-saudi-green-200">
          {isRTL 
            ? "اسألني عن الفنادق والحزم والرحلات" 
            : "Ask me about hotels, packages & flights"
          }
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? undefined
                    : undefined
                }
                fallback={message.sender === "user" ? (isRTL ? "أ" : "U") : (isRTL ? "م" : "TA")}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                fallback={isRTL ? "م" : "TA"}
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-saudi-green p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            dir={isRTL ? "rtl" : "ltr"}
          />
          <div className={`flex items-center p-3 pt-0 justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button 
              type="submit" 
              size="sm" 
              className={`gap-1.5 bg-saudi-green hover:bg-saudi-green-700 ${isRTL ? 'mr-auto' : 'ml-auto'}`}
              disabled={!input.trim() || isLoading}
            >
              {isRTL ? "إرسال" : "Send"}
              <Send className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
