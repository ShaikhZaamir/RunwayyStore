'use client'

import Header from '@/components/Header'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Package, ShoppingCart, Users, TrendingUp, LogOut } from 'lucide-react'
import Link from 'next/link'

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
]

const categoryData = [
  { name: 'Tops', value: 35 },
  { name: 'Bottoms', value: 25 },
  { name: 'Dresses', value: 20 },
  { name: 'Outerwear', value: 20 },
]

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <button className="flex items-center gap-2 text-destructive hover:text-destructive/80 font-semibold transition">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-foreground">1,234</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-primary/20" />
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Revenue</p>
                <p className="text-3xl font-bold text-foreground">₹45,231</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary/20" />
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <Package className="w-12 h-12 text-primary/20" />
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-foreground">567</p>
              </div>
              <Users className="w-12 h-12 text-primary/20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-background rounded-lg p-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-background rounded-lg p-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 bg-background rounded-lg p-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Order ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Customer</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#1001', customer: 'John Doe', amount: '$245.99', status: 'Delivered', date: '2024-04-23' },
                  { id: '#1002', customer: 'Jane Smith', amount: '$189.50', status: 'Shipped', date: '2024-04-22' },
                  { id: '#1003', customer: 'Mike Johnson', amount: '$312.75', status: 'Processing', date: '2024-04-21' },
                  { id: '#1004', customer: 'Sarah Williams', amount: '$156.20', status: 'Delivered', date: '2024-04-20' },
                ].map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-secondary transition">
                    <td className="py-3 px-4 font-semibold text-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-foreground">{order.customer}</td>
                    <td className="py-3 px-4 text-primary font-semibold">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Delivered'
                            ? 'bg-primary/10 text-primary'
                            : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/products" className="bg-primary text-primary-foreground p-4 rounded-lg font-semibold hover:bg-primary/90 transition text-center">
            View Products
          </Link>
          <button className="bg-secondary border border-border p-4 rounded-lg font-semibold hover:bg-border/50 transition">
            Manage Inventory
          </button>
          <button className="bg-secondary border border-border p-4 rounded-lg font-semibold hover:bg-border/50 transition">
            View Reports
          </button>
        </div>
      </div>
    </div>
  )
}
