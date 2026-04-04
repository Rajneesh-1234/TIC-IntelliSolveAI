"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function FarmerChatPage() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])

  const sendMessage = () => {

    if (!message.trim()) return

    const farmerMessage = {
      id: Date.now(),
      sender: "farmer",
      text: message,
      time: new Date().toLocaleTimeString()
    }

    setMessages((prev) => [...prev, farmerMessage])
    setMessage("")

    // Fake seller reply
    setTimeout(() => {

      const sellerReply = {
        id: Date.now() + 1,
        sender: "seller",
        text: "Thank you for contacting. We will check your crop listing.",
        time: new Date().toLocaleTimeString()
      }

      setMessages((prev) => [...prev, sellerReply])

    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Farmer Chat</h1>
        <p className="text-muted-foreground">
          Chat with sellers or government officers.
        </p>
      </div>

      <Card>

        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Chat Window */}
          <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4 mb-4">

            {messages.length === 0 && (
              <p className="text-center text-muted-foreground">
                Start a conversation
              </p>
            )}

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "farmer" ? "justify-end" : "justify-start"
                }`}
              >

                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.sender === "farmer"
                      ? "bg-green-500 text-white"
                      : "bg-muted"
                  }`}
                >

                  <p>{msg.text}</p>

                  <span className="text-xs opacity-70">
                    {msg.time}
                  </span>

                </div>

              </div>

            ))}

          </div>

          {/* Input */}
          <div className="flex gap-2">

            <Input
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button onClick={sendMessage}>
              Send
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}