import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, AlertTriangle, BarChart2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardStats {
  totalUsers: number;
  activeListings: number;
  reportedItems: number;
  totalViews: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeListings: 0,
    reportedItems: 0,
    totalViews: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: usersCount },
          { count: activeListingsCount },
          { count: reportedItemsCount }
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('ads').select('*', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending')
        ]);

        setStats({
          totalUsers: usersCount || 0,
          activeListings: activeListingsCount || 0,
          reportedItems: reportedItemsCount || 0,
          totalViews: 0 // This would need to be implemented with a views tracking system
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading dashboard stats</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { name: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, change: '+12%' },
    { name: 'Active Listings', value: stats.activeListings.toLocaleString(), icon: ShoppingBag, change: '+23%' },
    { name: 'Reported Items', value: stats.reportedItems.toLocaleString(), icon: AlertTriangle, change: '-8%' },
    { name: 'Total Views', value: stats.totalViews.toLocaleString(), icon: BarChart2, change: '+18%' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');

          return (
            <div key={stat.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-primary-600" />
                <span className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.name}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Activity feed would go here */}
          <p className="text-gray-600">Activity feed coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;