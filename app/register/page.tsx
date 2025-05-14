"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SnowAnimation } from "@/components/snow-animation"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset form state
    setIsSubmitting(true)

    try {
      // Client-side validation
      if (!email || !password || !name) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords don't match",
          variant: "destructive",
        })
        return
      }

      if (password.length < 8) {
        toast({
          title: "Error",
          description: "Password must be at least 8 characters long",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error cases
        if (data.error === "Email already registered") {
          toast({
            title: "Registration Failed",
            description: "This email is already registered. Please use a different email or try logging in.",
            variant: "destructive",
          })
        } else {
          throw new Error(data.error || "Registration failed")
        }
        return
      }

      toast({
        title: "Success",
        description: "Account created successfully! Redirecting to login...",
      })

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center">
        <div className="max-w-md w-full px-12 ml-12">
          <h1 className="text-5xl font-bold mb-2">CREATE ACCOUNT</h1>
          <p className="text-gray-500 mb-8">Join our platform today</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md mb-6"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-purple-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-purple-900 relative overflow-hidden">
        {/* Enhanced moon with brighter glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
          <div className="w-64 h-64 rounded-full bg-white opacity-95 blur-sm"></div>
          <div className="w-72 h-72 rounded-full bg-white opacity-30 blur-xl absolute -top-4 -left-4"></div>
          <div className="w-80 h-80 rounded-full bg-white opacity-20 blur-2xl absolute -top-8 -left-8"></div>
        </div>
        <SnowAnimation />
      </div>
    </div>
  )
}
