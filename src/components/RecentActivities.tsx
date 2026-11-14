'use client'

import { CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react'

const activities = [
  {
    id: 1,
    user: 'Azim',
    action: 'has joined',
    description: 'Azim has joined in group using your invitation link',
    date: 'Jan 31',
    type: 'success',
  },
  {
    id: 2,
    user: 'Message',
    action: 'reported',
    description: 'Someone has reported "Please buy this product"',
    date: 'Jan 31',
    type: 'error',
  },
  {
    id: 3,
    user: 'Azim',
    action: 'has joined',
    description: 'Azim has joined in group using your invitation link',
    date: 'Jan 31',
    type: 'success',
  },
  {
    id: 4,
    user: 'Azim',
    action: 'has joined',
    description: 'Azim has joined in group using your invitation link',
    date: 'Jan 31',
    type: 'success',
  },
]

export default function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 ">
      <h2 className="text-lg font-semibold text-gray-900  mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-gray-200  last:border-0">
            <div className="flex-shrink-0">
              {activity.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 ">
                {activity.user} <span className="font-normal text-gray-600 ">{activity.action}</span>
              </p>
              <p className="text-sm text-gray-600  mt-1">{activity.description}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-xs text-gray-600  mb-2">{activity.date}</p>
              <button className="text-cyan-600 hover:text-cyan-700 transition-colors ">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="text-cyan-600 text-sm font-medium mt-4 hover:text-cyan-700 transition-colors ">
        View all →
      </button>
    </div>
  )
}
