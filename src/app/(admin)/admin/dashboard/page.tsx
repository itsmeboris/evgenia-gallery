import { requireAdmin } from '@/lib/auth'
import { AuthStatus } from '@/components/auth/AuthStatus'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function AdminDashboard() {
  const { user, profile } = await requireAdmin()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-display text-gray-900">
                Gallery Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {profile.full_name || user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="secondary">
                  ← Back to Gallery
                </Button>
              </Link>
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Artworks
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  40
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Inquiries
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  0
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Sales
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  $0 (Setup Pending)
                </dd>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500">
                Add New Artwork
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500">
                View Inquiries
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500">
                Manage Exhibitions
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-500">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}