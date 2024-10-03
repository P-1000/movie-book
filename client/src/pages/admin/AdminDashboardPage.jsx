import React, { useState } from "react";
import { Plus, Menu, X } from "lucide-react";
import Sidebar from "../../components/adminComponents/Sidebar";
import Header from "../../components/adminComponents/Header";
import StatisticsCard from "../../components/adminComponents/StatsCard";
import QuickActionButton from "../../components/adminComponents/QuickActionButton";
import RecentActivity from "../../components/adminComponents/RecentAct";
import { useAuthContext } from '../../context/userContext'; 

const statistics = [
  { title: "Total Movies", value: "24", icon: "Film", color: "bg-blue-500" },
  { title: "Total Showtimes", value: "148", icon: "Calendar", color: "bg-green-500" },
  { title: "Total Theaters", value: "12", icon: "Building2", color: "bg-purple-500" },
  { title: "Total Reservations", value: "1,284", icon: "Ticket", color: "bg-orange-500" }
];

const quickActions = [
  { title: "Add New Movie", url: "/a/add-movie" },
  { title: "Add New Showtime", url: "/a/theaters" },
  { title: "Manage Theaters", url: "/a/theaters" },
  { title: "Modify Reservations", url: "/a/modify-reservations" }
];

const recentActivities = [
  { id: 1, action: "New Movie Added", description: "Inception 2 has been added", time: "2 minutes ago" },
  { id: 2, action: "Showtime Modified", description: "Avatar 3 showtime updated", time: "15 minutes ago" },
  { id: 3, action: "Reservation Updated", description: "Booking #12345 modified", time: "1 hour ago" },
  { id: 4, action: "Theater Added", description: "New IMAX theater added", time: "2 hours ago" }
];

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { authUser } = useAuthContext();
  if (!authUser) {
    return <h1>Unauthorized</h1>;
  }
  return (
    <div className="flex">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex-1">
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statistics.map((stat, index) => (
              <StatisticsCard key={index} stat={stat} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} action={action} />
            ))}
          </div>
          <RecentActivity activities={recentActivities} />
        </main>
      </div>
    </div>
  );
}
