import React, { useState } from "react";

interface AddTenantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTenant: (tenant: any) => void;
}

const Addtenant: React.FC<AddTenantProps> = ({
  isOpen,
  onClose,
  onAddTenant,
}) => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("Active");
  const [plan, setPlan] = useState("Starter");
  const [products, setProducts] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant = {
      name,
      domain,
      status,
      tags: [plan],
      products: Number(products),
    };
    onAddTenant(newTenant);
    onClose();
    setName("");
    setDomain("");
    setStatus("Active");
    setPlan("Starter");
    setProducts(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Tenant</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tenant Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Subscription Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Products</label>
            <input
              type="number"
              min="0"
              value={products}
              onChange={(e) => setProducts(Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addtenant;
