"use client";

import {
  Scenario,
  ScenarioListResponse,
  DetailDescription,
} from "../../../interface/scenario";
import RenderIf from "../../../utils/RenderIf";
import { useEffect, useState } from "react";
import ModalDetailRelic from "./ModalDetailRelic";
import ModalRoleplay from "./ModalRoleplay";

export const Relic = () => {
  const [scenarioList, setScenarioList] = useState<ScenarioListResponse | null>(
    null
  );

  const [detailDescription, setdetailDescription] =
    useState<DetailDescription | null>(null);
  const [fetchingScenarios, setFetchingScenarios] = useState(false);
  const [showModalDescription, setshowModalDescription] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null
  );
  const [showRoleplayModal, setShowRoleplayModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState<"speech" | "text" | null>(
    "speech"
  );
  // const [timerEnabled, setTimerEnabled] = useState(false);

  // useEffect(() => {
  //   const fetchScenarios = async () => {
  //     setFetchingScenarios(true);
  //     const res = await fetch("/api/ai/scenario?soft_delete=false");
  //     const data = await res.json();
  //     setScenarioList(data);
  //     if (data?.data?.length) {
  //       setdetailDescription(JSON.parse(data.data[0].description));
  //     }
  //     setFetchingScenarios(false);
  //   };

  //   fetchScenarios();
  // }, []);

  const handleSelectedScenario = (item: Scenario) => {
    setSelectedScenario(item);
    setdetailDescription(JSON.parse(item.description));
    setshowModalDescription(true);
  };

  return (
    <div className="relative flex gap-2">
      {fetchingScenarios ? (
        <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden animate-pulse w-full"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-zinc-700" />

              {/* Text Placeholder */}
              <div className="p-4 bg-zinc-800 space-y-2">
                {/* Title */}
                <div className="h-5 bg-zinc-600 rounded w-3/4" />
                {/* Name + Gender */}
                <div className="h-4 bg-zinc-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        scenarioList?.data && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {scenarioList.data.map((item: Scenario) => (
              <div
                key={item.id}
                onClick={() => handleSelectedScenario(item)}
                className="dark:bg-zinc-800 bg-zinc-200 w-full h-full rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:opacity-60"
              >
                <img
                  src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="character"
                  className="w-full h-64 object-cover rounded-t-xl"
                  width={400}
                  height={300}
                />
                <div className="p-4  ">
                  <>
                    <h3 className="text-base font-semibold dark:text-white text-zinc-800">
                      {item.name}
                    </h3>
                    <p className="text-sm dark:text-zinc-200 text-zinc-700 font-medium">
                      {JSON.parse(item.description)?.charactersName}
                      <span
                        className={[
                          JSON.parse(item.description)?.charactersGender ===
                          "Female"
                            ? "text-pink-500"
                            : "text-blue-500",
                          "ml-1 text-lg font-semibold",
                        ].join(" ")}
                      >
                        {JSON.parse(item.description)?.charactersGender ===
                        "Female"
                          ? "♀️"
                          : "♂️"}
                      </span>
                    </p>
                  </>

                  {/* Category */}
                  {
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.category
                        .flatMap((category: string) =>
                          category.split(",").map((cat) => cat.trim())
                        )
                        .map((category: string, index: number) => {
                          return (
                            <span
                              key={index}
                              className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          );
                        })}
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <RenderIf condition={showModalDescription}>
        <ModalDetailRelic
          selectedScenario={selectedScenario}
          setshowModalDescription={setshowModalDescription}
          detailDescription={detailDescription}
          setShowRoleplayModal={setShowRoleplayModal}
        />
      </RenderIf>

      <RenderIf condition={showRoleplayModal}>
        <ModalRoleplay
          selectedScenario={selectedScenario ?? undefined}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          setShowRoleplayModal={setShowRoleplayModal}
        />
      </RenderIf>
    </div>
  );
};
