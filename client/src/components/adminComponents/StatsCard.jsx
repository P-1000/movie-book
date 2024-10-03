import React from "react";

export default function StatisticsCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="rounded-lg shadow-sm p-6 border border-white/15 transition-transform hover:scale-105">
      <div className="flex items-center space-x-4">
        <div className={`${stat.color} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <p className="text-sm text-white">{stat.title}</p>
          <p className="text-2xl font-semibold text-gray-900/50">{stat.value}</p>
        </div>
      </div>
    </div>
  );
}
