import React from "react";
import { Clock } from "lucide-react";

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white/10 text-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50/10 rounded-lg">
            <Clock size={24} className="text-blue-500" />
            <div>
              <p className="font-semibold">{activity.action}</p>
              <p className="text-sm text-gray-300">{activity.description}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
