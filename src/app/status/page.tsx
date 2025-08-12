'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StatusData {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
  userCount: number;
  testCredentials?: {
    email: string;
    password: string;
  };
}

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [databaseStatus, setDatabaseStatus] = useState<any>(null);

  useEffect(() => {
    // Fetch general status
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        setStatusData(data);
      })
      .catch(error => {
        console.error('Failed to fetch status:', error);
      });

    // Fetch database status
    fetch('/api/database/status')
      .then(res => res.json())
      .then(data => {
        setDatabaseStatus(data);
      })
      .catch(error => {
        console.error('Failed to fetch database status:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">System Status</h1>

            {statusData ? (
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${statusData.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-lg font-medium">
                    {statusData.status === 'success' ? 'All Systems Operational' : 'System Error'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Environment</h3>
                    <p className="text-gray-600">{statusData.environment}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Users Registered</h3>
                    <p className="text-gray-600">{statusData.userCount}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
                    <p className="text-gray-600">{new Date(statusData.timestamp).toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Message</h3>
                    <p className="text-gray-600">{statusData.message}</p>
                  </div>
                </div>

                {/* Database Status */}
                {databaseStatus && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Database Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Connection</h4>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${databaseStatus.database.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-gray-600">{databaseStatus.database.status}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Storage Type</h4>
                        <p className="text-gray-600">{databaseStatus.storage.primary}</p>
                        {databaseStatus.storage.fallback && (
                          <p className="text-xs text-gray-500">Fallback: {databaseStatus.storage.fallback}</p>
                        )}
                      </div>
                    </div>
                    {databaseStatus.database.error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">Error: {databaseStatus.database.error}</p>
                      </div>
                    )}
                  </div>
                )}

                {statusData.testCredentials && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Test Credentials</h3>
                    <p className="text-blue-700 text-sm mb-1">
                      <strong>Email:</strong> {statusData.testCredentials.email}
                    </p>
                    <p className="text-blue-700 text-sm">
                      <strong>Password:</strong> {statusData.testCredentials.password}
                    </p>
                    <p className="text-blue-600 text-xs mt-2">
                      Use these credentials to test the authentication system
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Test Sign In
                  </Link>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Refresh Status
                  </button>
                  <Link
                    href="/dashboard"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600">Failed to load system status</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}