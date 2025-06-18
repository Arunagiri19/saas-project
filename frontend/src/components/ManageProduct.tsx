import { useState } from "react";
interface EditTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const featureGroups = [
  {
    group: "Analytics",
    enabled: true,
    features: [
      {
        name: "Custom Dashboards",
        description: "Create personalized analytics dashboards",
        enabled: true,
      },
      {
        name: "Scheduled Reports",
        description: "Set up automated report delivery",
        enabled: true,
      },
      {
        name: "Data Export",
        description: "Export data in various formats",
        enabled: true,
      },
      {
        name: "API Access",
        description: "Access analytics data via API",
        enabled: true,
      },
      {
        name: "Predictive Analytics",
        description: "AI-powered business predictions",
        enabled: false,
      },
    ],
  },
  {
    group: "Marketing",
    enabled: false,
    features: [
      {
        name: "Marketing Automation",
        description: "Marketing Automation and Campaigns",
        enabled: false,
      },
    ],
  },
  {
    group: "Support",
    enabled: true,
    features: [
      {
        name: "Customer Support",
        description: "Customer Support and Ticketing",
        enabled: true,
      },
    ],
  },
];

const FeatureTogglePanel: React.FC<EditTenantModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
  const [groups, setGroups] = useState(featureGroups);

  const toggleFeature = (groupIdx: number, featureIdx: number) => {
    const updated = [...groups];
    updated[groupIdx].features[featureIdx].enabled =
      !updated[groupIdx].features[featureIdx].enabled;
    setGroups(updated);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {groups.map((group, groupIdx) => (
        <div key={group.group} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-indigo-600">
              {group.group}
            </h2>
            <input
              type="checkbox"
              checked={group.enabled}
              onChange={() => {
                const updated = [...groups];
                updated[groupIdx].enabled = !updated[groupIdx].enabled;
                setGroups(updated);
              }}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded"
            />
          </div>

          <div className="space-y-4 pl-4">
            {group.features.map((feature, featureIdx) => (
              <div
                key={feature.name}
                className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg border"
              >
                <div>
                  <div className="text-gray-800 font-medium">
                    {feature.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {feature.description}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={feature.enabled}
                  onChange={() => toggleFeature(groupIdx, featureIdx)}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                />
                <button
                  onClick={onClose}
                  type="button"
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureTogglePanel;
