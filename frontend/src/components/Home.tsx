import React, { useState } from "react";
import {
  Plus,
  Users,
  Activity,
  PackageCheck,
  Settings2,
  Pencil,
  Trash2,
} from "lucide-react";
import Edit from "../components/Edit";
import Addtenant from "./Addtenant";
import ManageProduct from "./ManageProduct";

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) => (
  <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md flex items-center gap-3 border border-gray-200">
    {icon}
    <div>
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

const Home = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any | null>(null);
  const [tenants, setTenants] = useState([
    {
      _id: "1",
      name: "Digival",
      domain: "digival.com",
      email: "admin@digival.com",
      status: "Active",
      products: 5,
      plan: "Enterprise",
      tags: ["Professional"],
    },
    {
      _id: "2",
      name: "TechCorp",
      domain: "techcorp.io",
      email: "admin@techcorp.io",
      status: "Inactive",
      products: 3,
      plan: "Enterprise",
      tags: ["Enterprise"],
    },
  ]);
  const handleEditTenant = (updatedTenant: any) => {
    setTenants((prev) =>
      prev.map((t) => (t.name === selectedTenant?.name ? updatedTenant : t))
    );
    setIsEditOpen(false);
  };
  const handleAddTenant = (newTenant: any) => {
    setTenants((prev) => [...prev, newTenant]);
    setIsAddModalOpen(false);
  };
  const handleDeleteTenant = (name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );
    if (confirmed) {
      setTenants((prev) => prev.filter((tenant) => tenant.name !== name));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#65bad4] to-[#39253b] p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="grid grid-cols-2 gap-1 w-4 h-4">
            <span className="w-2 h-2 bg-red-500 rounded-sm"></span>
            <span className="w-2 h-2 bg-orange-500 rounded-sm"></span>
            <span className="w-2 h-2 bg-yellow-500 rounded-sm"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-sm"></span>
          </div>
          <h1 className="text-4xl font-bold text-yellow-400">
            SaaS Tenant Manager
          </h1>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-400 hover:opacity-90 text-black font-semibold px-5 py-2 rounded-md shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-7">
        <input
          type="text"
          placeholder="Search tenants..."
          className="flex-1 min-w-[200px] border border-blue-500 rounded-lg px-4 py-2 text-sm"
        />
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400">
          <option>All Statuses</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400">
          <option>All Products</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-4">
        <StatCard
          icon={<Users className="text-indigo-600 w-5 h-5" />}
          title="Total Tenants"
          value={tenants.length}
        />
        <StatCard
          icon={<Activity className="text-green-500 w-5 h-5" />}
          title="Active Tenants"
          value={tenants.filter((t) => t.status === "Active").length}
        />
        <StatCard
          icon={<PackageCheck className="text-yellow-500 w-5 h-5" />}
          title="Avg Products"
          value={(
            tenants.reduce((acc, t) => acc + t.products, 0) / tenants.length
          ).toFixed(1)}
        />
        <StatCard
          icon={<Settings2 className="text-rose-500 w-5 h-5" />}
          title="Features Enabled"
          value="12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {tenants.map((tenant, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-5 border border-indigo-100"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-indigo-100 text-orange-700 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-inner">
                {tenant.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-md">
                  {tenant.name}
                </div>
                <div className="text-xs text-gray-500">{tenant.domain}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs mb-3">
              <span
                className={`px-2 py-1 font-medium ${
                  tenant.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {tenant.status}
              </span>
              {tenant.tags?.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs text-pink-600 mb-4">
              {tenant.products} Products
            </div>
            <div className="flex justify-between items-center text-sm">
              <a
                href="#"
                onClick={() => setIsManageOpen(true)}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Manage Products
              </a>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedTenant(tenant);
                    setIsEditOpen(true);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteTenant(tenant.name)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-grey-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Edit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        tenant={selectedTenant}
        onSave={handleEditTenant}
      />
      <Addtenant
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTenant={handleAddTenant}
      />
      <ManageProduct
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
      />
    </div>
  );
};

export default Home;
