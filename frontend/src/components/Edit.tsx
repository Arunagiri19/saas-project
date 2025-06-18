import React, { useState, useEffect } from "react";
import { Tenant } from "../type";

interface EditTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant;
  onSave: (updatedTenant: Tenant) => void;
}

const Edit: React.FC<EditTenantModalProps> = ({
  isOpen,
  onClose,
  tenant,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    email: "",
    plan: "Professional" as "Enterprise" | "Starter" | "Professional",
    status: "Active" as "Active" | "Inactive",
    createdDate: "",
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        domain: tenant.domain,
        email: tenant.email || "digival@gmail.com",
        plan: tenant.plan || "Professional",
        status: tenant.status || "Active",
        createdDate: tenant.createdDate || "2025-06-18",
      });
    }
  }, [tenant]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...tenant,
      ...formData,
      status: formData.status as "Active" | "Inactive",
      plan: formData.plan as "Enterprise" | "Starter" | "Professional",
    });
    onClose();
  };

  if (!isOpen || !tenant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-red-400 rounded-lg shadow-lg p-10 w-[700px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">Edit Tenant</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            &times;
          </button>
        </div>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold">Tenant Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full mt-1 border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Domain</label>
            <input
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              type="text"
              className="w-full mt-1 border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Admin Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full mt-1 border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold">Subscription Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2"
            >
              <option value="Enterprise">Enterprise</option>
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold">Created Date</label>
            <input
              name="createdDate"
              type="date"
              value={formData.createdDate}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2"
            />
          </div>
          <div className="col-span-2 flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
