"use client"

import React, { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import Image from "next/image"

export default function ChatBot() {
  const { messages, input, handleInputChange } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  )

  // Update the date every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(
        new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    console.log("📤 Sending message:", input)

    if (typeof input !== "string" || input.trim() === "") {
      alert("Please enter a valid query.")
      setIsTyping(false)
      return
    }

    const payload = { query: input.trim() }

    try {
      console.log("Payload being sent:", payload)
      const response = await fetch("https://combinedbotbackend.onrender.com/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Error response from backend: ${errorText}`)
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log("✅ Response received:", data)

      if (data.success) {
        messages.push({ role: "bot", content: data.response })
      } else {
        console.error("❌ Backend response indicates failure:", data)
        alert("There was an error with the response from the server.")
      }
    } catch (error) {
      console.error("❌ Error sending message:", error.message || error)
      alert("There was an error sending your message. Please try again.")
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top navigation bar */}
      <div className="bg-[#F47216] text-white px-7 py-2 flex justify-between items-center text-sm">
        <div className="flex space-x-6">
          <a href="https://ahmedabadcity.gov.in/Home/" className="hover:underline">
            HOME
          </a>
          <a href="https://ahmedabadcity.gov.in/Home/AboutTheCorporation" className="hover:underline">
            ABOUT US
          </a>
          <a href="https://ahmedabadcity.gov.in/Feedback/Index" className="hover:underline">
            FEEDBACK
          </a>
          <a href="https://ahmedabadcity.gov.in/Home/sitemap" className="hover:underline">
            SITEMAP
          </a>
          <a href="http://heritage.ahmedabadcity.gov.in/" className="hover:underline">
            HERITAGE WEBSITE <span className="bg-green-500 text-xs px-1 rounded">NEW</span>
          </a>
          <a href="https://gujfiresafetycop.in/" className="hover:underline">
            GUJARAT FIRE SAFETY COMPLIANCE PORTAL <span className="bg-green-500 text-xs px-1 rounded">NEW</span>
          </a>
          <a
            href="https://ahmedabadcity.gov.in/StaticPage/AMCOfficersTelephoneNumber_Dynamic "
            className="hover:underline"
          >
            CONTACT US
          </a>
          <a href="https://email.gov.in/" className="hover:underline">
            E-MAIL
          </a>
        </div>
        <div className="flex items-center">
          <span>{currentDate}</span>
        </div>
      </div>

{/* Logo and title */}
<div className="bg-white px-4 flex justify-between items-center border-b">
  <div className="flex items-center">
    <div className="bg-white rounded-full mr-7">
      <Image
        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Amdavad_Municipal_Corporation_logo.png/170px-Amdavad_Municipal_Corporation_logo.png"
        alt="AMC Logo"
        width={270}
        height={270}
        className="rounded-full"
      />
    </div>
    <div>
      <h1 className="text-xl font-bold">AMDAVAD MUNICIPAL CORPORATION</h1>
      <p className="text-gray-600">અમદાવાદ મ્યુનિસિપલ કોર્પોરેશન</p>
    </div>
  </div>
  <div className="flex-grow flex justify-end"> {/* This will push the image to the right */}
   <Image
  src="https://i.imghippo.com/files/nW7156QS.png"
  alt="Additional Image"
  width={200}  // Set a width for the aspect ratio
  height={100}  // Set a height for the aspect ratio
  className="w-1/2 h-auto" // This makes the width 50% of its parent, while keeping the height auto to preserve aspect ratio
/>
  </div>
</div>
      {/* Secondary navigation */}
      <div className="bg-[#F47216] text-white px-4 py-3 flex justify-center items-center text-lg text-center">
        <h2 className="text-center">AMC Sarthi</h2>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Left panel */}
        <Card className="w-1/3 bg-white shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-[#F47216] text-2xl font-bold mb-4">About AMC</h2>
            <p className="text-gray-700 mb-6" style={{ fontSize: '12px' }}>
              Cities appear and disappear only to reappear in the tableaux of Indian civilization. The historic city of
              Ahmedabad was founded in the surge of Islamic conquests that had swept through India. It was established
              in 1411 AD by a noble, Ahmed Shah, who had rebelled against his overlords in Delhi. The new rulers of
              Gujarat, keen on establishing their superiority in the material realm, had undertaken a frenzied program of
              building activities in their new capital of Ahmedabad.
            </p>
            <div className="flex gap-4">
              <div className="text-center flex-1">
                <Image
                  src="https://i.imghippo.com/files/cfy1575oow.png"
                  alt="Mayor"
                  width={150}  // Set a fixed width
                  height={150} // Set a fixed height
                  className="rounded-lg mx-auto mb-2 object-cover" // Added object-cover for better fit
                />
                <h3 className="font-bold">Mayor</h3>
                <p>Shrimati Pratibhaben</p>
                <p>Rakeshkumar Jain</p>
              </div>
              <div className="text-center flex-1">
                <Image
                  src="https://i.imghippo.com/files/dubi9794NnA.png"
                  alt="Municipal Commissioner"
                  width={150}  // Set a fixed width
                  height={150} // Set a fixed height
                  className="rounded-lg mx-auto mb-2 object-cover" // Added object-cover for better fit
                />
                <h3 className="font-bold">Municipal Commissioner</h3>
                <p>Shri Banchhanidhi Pani</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right panel - Chat window */}
        <Card className="w-2/3 bg-white shadow-lg flex flex-col">
          <CardContent className="flex-grow p-4 overflow-auto">
            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start space-x-2 mb-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      m.role === "user" ? "bg-[#1B3975] text-white" : "bg-gray-100 text-black"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-2 mb-4">
                  <div className="p-3 rounded-lg bg-gray-100 text-black">Typing...</div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={onSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-grow border-gray-300"
              />
              <Button type="submit" disabled={isTyping} className="bg-[#F47216] hover:bg-[#2B4985]">
                <Send size={18} />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

