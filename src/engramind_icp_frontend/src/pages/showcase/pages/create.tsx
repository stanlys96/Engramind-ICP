"use client";

import ModalDone from "../../../components/ui/showcase/ModalDone";
import ModalProgress from "../../../components/ui/showcase/ModalProgress";
import RenderIf from "../../../utils/RenderIf";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShowcaseLayout from "../ShowcaseLayout";

export default function ShowcaseCreatePage() {
  const [loading, setLoading] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, seterror] = useState(false);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [myRole, setMyRole] = useState("");
  const [aiRole, setAiRole] = useState("");
  const [scenarioDescription, setScenarioDescription] = useState("");

  const navigate = useNavigate();

  const handleCreateScenario = async () => {
    setLoading(true);
    setShowLoadingModal(true);

    try {
      const res = await fetch("/api/ai/scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario_title: scenarioTitle,
          ai_role: aiRole,
          my_role: myRole,
          scenario_description: scenarioDescription,
          organization_id: "engramind",
        }),
      });

      const data = await res.json();
      setShowLoadingModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/showcase");
      }, 500);
      return data;
    } catch (err) {
      console.error(err, "<<< error");
      // alert('Failed to create persona. Please try again.');
      seterror(true);
      setShowLoadingModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShowcaseLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-900 dark:text-white">
        {/* Form Section  */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            ⚡ Quick Create Persona
          </h2>

          <div>
            <label className="block mb-1 text-sm text-gray-700 dark:text-white">
              Persona Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={scenarioTitle}
              onChange={(e) => setScenarioTitle(e.target.value)}
              placeholder="Enter persona title"
              className={`w-full border dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                loading
                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                  : "dark:bg-zinc-800 bg-zinc-50"
              }`}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">
                My Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={myRole}
                onChange={(e) => setMyRole(e.target.value)}
                placeholder="Enter your role (e.g., 'Sales')"
                className={`w-full border dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                  loading
                    ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                    : "dark:bg-zinc-800 bg-zinc-50"
                }`}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700 dark:text-white">
                AI Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                placeholder="Enter AI's role (e.g., 'Customer')"
                className={`w-full border dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                  loading
                    ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                    : "dark:bg-zinc-800 bg-zinc-50"
                }`}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
              Persona Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
              placeholder="Make a personalized description of the persona"
              className={`w-full border dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
                loading
                  ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                  : "dark:bg-zinc-800 bg-zinc-50"
              }`}
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="">
            <button
              onClick={handleCreateScenario}
              disabled={
                !scenarioTitle ||
                !myRole ||
                !aiRole ||
                !scenarioDescription ||
                loading
              }
              className={`bg-purple-600 text-white px-4 py-2 rounded cursor-pointer ${
                !scenarioTitle ||
                !myRole ||
                !aiRole ||
                !scenarioDescription ||
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {loading ? "Creating..." : "Create Persona"}
            </button>
          </div>
        </div>
        {/* End Form Section */}

        {/* Modal Loading Section */}
        <RenderIf condition={showLoadingModal}>
          <ModalProgress setShowLoadingModal={setShowLoadingModal} />
        </RenderIf>

        {/* Modal Success */}
        <RenderIf condition={showSuccessModal}>
          <ModalDone setShowSuccessModal={setShowSuccessModal} />
        </RenderIf>

        {/* Modal Error  */}
        <RenderIf condition={error}>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                Error
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Failed to create persona. Please try again.
              </p>
              <button
                onClick={() => seterror(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </RenderIf>
      </div>
    </ShowcaseLayout>
  );
}
