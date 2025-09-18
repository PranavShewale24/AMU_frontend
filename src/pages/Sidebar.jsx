import React from "react";
import { 
  Home, 
  Stethoscope, 
  FileText, 
  Plus, 
  MessageCircle, 
  Download, 
  BarChart3 
} from "lucide-react";
import { useApp } from "./AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { currentUser, t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items by role
  const farmerMenuItems = [
    { path: "/dashboard", icon: Home, label: t.dashboard },
    { path: "/animals", icon: Stethoscope, label: t.animals },
    { path: "/chat", icon: MessageCircle, label: t.chat },
  ];

  const vetMenuItems = [
    { path: "/treatments", icon: FileText, label: t.treatments },
    { path: "/clients", icon: Stethoscope, label: t.clients },
    { path: "/add-treatment", icon: Plus, label: t.addTreatment },
    { path: "/chat", icon: MessageCircle, label: t.chat },
    { path: "/analytics", icon: BarChart3, label: t.analytics },
    // { path: "/reports", icon: Download, label: t.reports },
  ];

  const governmentMenuItems = [
    { path: "/government-dashboard", icon: Home, label: t.dashboard },
  ];

  // Select menu items
  let menuItems = [];
  if (currentUser?.role === "farmer") {
    menuItems = farmerMenuItems;
  } else if (currentUser?.role === "vet" || currentUser?.role === "veterinarian") {
    menuItems = vetMenuItems;
  } else if (currentUser?.role === "government") {
    menuItems = governmentMenuItems;
  } else {
    menuItems = []; // or farmerMenuItems as default
  }

  return (
    <aside className="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-green-100 text-green-800 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })
          ) : (
            <li className="text-gray-400 px-4 py-3">No menu available</li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
