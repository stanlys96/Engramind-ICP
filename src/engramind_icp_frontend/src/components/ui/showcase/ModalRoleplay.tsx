import { Scenario } from "../../../interface/scenario";
import React from "react";

export default function ModalRoleplay({
  selectedScenario,
  selectedMode,
  setSelectedMode,
}: // timerEnabled,
// setTimerEnabled,
{
  selectedScenario?: Scenario;
  setSelectedScenario?: (scenario: Scenario) => void;
  setShowRoleplayModal: (show: boolean) => void;
  selectedMode: "speech" | "text" | null;
  setSelectedMode: (mode: "speech" | "text" | null) => void;
  // timerEnabled: boolean;
  // setTimerEnabled: (enabled: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-8 w-[640px] max-w-full text-white shadow-xl">
        <h2 className="text-2xl font-semibold mb-2">Roleplay Mode</h2>
        <p className="text-zinc-400 mb-6">
          Choose between{" "}
          <span className="text-purple-400">Speech-to-Speech Mode</span> or{" "}
          <span className="text-purple-400">Text Mode</span> for your
          role-playing sessions!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`relative rounded-lg p-6 cursor-pointer transition-all ${
              selectedMode === "speech"
                ? "border-2 border-purple-500 bg-zinc-800"
                : "border border-zinc-700 bg-zinc-800"
            }`}
            onClick={() => setSelectedMode("speech")}
          >
            <span className="absolute -top-3 right-3 bg-purple-600 text-xs text-white px-2 py-0.5 rounded-full">
              Popular🔥
            </span>
            <h3 className="text-lg font-bold mb-2">Speech to speech</h3>
            <p className="text-sm text-zinc-300">
              Speech to Speech Mode feature allows users to communicate with
              video calls.
            </p>
          </div>

          <div
            className={`rounded-lg p-6 cursor-pointer transition-all ${
              selectedMode === "text"
                ? "border-2 border-purple-500 bg-zinc-800"
                : "border border-zinc-700 bg-zinc-800"
            }`}
            onClick={() => setSelectedMode("text")}
          >
            <h3 className="text-lg font-bold mb-2">Text Mode</h3>
            <p className="text-sm text-zinc-300">
              Text Mode allows users to communicate through written messages.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-md font-medium mb-1">Set Timer</h4>
          <p className="text-sm text-zinc-400 mb-2">
            Don’t set a time if you want to talk without limits
          </p>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              // checked={timerEnabled}
              // onChange={() => setTimerEnabled(!timerEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 transition-all duration-200"></div>
            <span className="ml-3 text-sm font-medium">Set Timer</span>
          </label>
        </div>

        <a
          href={`/showcase/roleplay/${selectedScenario?.id}`}
          className={`bg-purple-600 hover:bg-purple-700 text-sm right-0 text-white font-semibold py-2 px-4 rounded transition-all ${
            selectedMode ? "" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Start Conversation
        </a>
      </div>
    </div>
  );
}
