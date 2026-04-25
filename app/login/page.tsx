'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { AlertCircle } from 'lucide-react'
import { signIn, useSession } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // 👈 added

  // ✅ ALWAYS run hooks first
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/profile')
    }
  }, [status, router])

  // ✅ AFTER hooks → safe return
  if (status === "loading") {
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const res = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Invalid email or password")
      setIsLoading(false)
      return
    }

    // ✅ successful login
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* 👇 ONLY UPDATED BLOCK */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>

                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-muted-foreground mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-2">Demo credentials:</p>
            <p className="text-sm font-mono text-foreground">Email: demo@example.com</p>
            <p className="text-sm font-mono text-foreground">Password: any password</p>
          </div>
        </div>
      </div>
    </div>
  )
}