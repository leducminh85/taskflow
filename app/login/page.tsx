"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-provider"
import { GoogleLogo } from "@/components/google-logo"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberAccount, setRememberAccount] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError("")

    try {
      await login(email, password)
      // The login function in useAuth will handle the redirection
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid credentials'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleGoogleSignIn = () => {
    router.push("/google-signin")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-8 py-12 bg-white rounded-lg shadow-md">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-center">WELCOME BACK</h1>
          <p className="text-gray-500 text-center">Please enter your email</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-base font-medium mb-2">
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
            <label htmlFor="password" className="block text-base font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberAccount}
                onCheckedChange={(checked) => setRememberAccount(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm">
                Remember account
              </label>
            </div>
            <Link href="/forgot-password" className="text-purple-600 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-50"
        >
          <GoogleLogo />
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}
