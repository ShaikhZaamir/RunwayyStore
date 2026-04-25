'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import { Edit2, LogOut, Package } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')

  // Redirect if not logged in
  if (!user) {
    router.push('/login')
    return null
  }

  const handleSaveName = async () => {
    await updateProfile(name)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md border border-border p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md border border-border p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false)
                        setName(user.name)
                      }}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="text-lg text-foreground font-semibold">{user.name}</p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg shadow-md border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Order History</h2>

              {user.orders && user.orders.length > 0 ? (
                <div className="space-y-4">
                  {user.orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4 hover:bg-secondary transition">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
                        <div>
                          <p className="font-semibold text-foreground">Order {order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2">{order.items.length} item(s)</p>
                        <ul className="list-disc list-inside space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx}>
                              {item.name} × {item.quantity} - ${item.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No orders yet</p>
                  <Link href="/shop" className="text-primary font-semibold hover:underline">
                    Start shopping
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-primary/5 rounded-lg border border-border p-6 sticky top-20">
              <h3 className="font-bold text-foreground mb-4">Account Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/shop" className="text-primary hover:underline text-sm">
                    Browse Shop
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-primary hover:underline text-sm">
                    My Cart
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline text-sm">
                    My Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:underline text-sm">
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
