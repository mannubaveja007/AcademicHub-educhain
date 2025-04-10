"use client"

import { useState, useEffect, useRef } from "react"
import Peer from "peerjs"

export default function PeerChat() {
  const [peerId, setPeerId] = useState("")
  const [remotePeerId, setRemotePeerId] = useState("")
  const [message, setMessage] = useState("")
  const [receivedMessages, setReceivedMessages] = useState<string[]>([])
  const peerInstance = useRef<Peer | null>(null)

  useEffect(() => {
    const peer = new Peer()

    peer.on("open", (id) => {
      setPeerId(id)
    })

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        setReceivedMessages((prev) => [...prev, data as string])
      })
    })

    peerInstance.current = peer

    return () => {
      peer.destroy()
    }
  }, [])

  const connectToPeer = () => {
    if (!peerInstance.current) return
    const conn = peerInstance.current.connect(remotePeerId)
    conn.on("open", () => {
      conn.send("Hi!")
    })
  }

  const sendMessage = () => {
    if (!peerInstance.current) return
    const conn = peerInstance.current.connect(remotePeerId)
    conn.on("open", () => {
      conn.send(message)
      setMessage("")
    })
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Peer-to-Peer Chat</h2>
      <p>Your Peer ID: {peerId}</p>
      <input
        type="text"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
        placeholder="Enter remote peer ID"
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={connectToPeer} className="bg-blue-500 text-white p-2 rounded mb-2">
        Connect to Peer
      </button>
      <div className="mb-4">
        <h3 className="font-bold">Received Messages:</h3>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={sendMessage} className="bg-green-500 text-white p-2 rounded">
        Send Message
      </button>
    </div>
  )
}
