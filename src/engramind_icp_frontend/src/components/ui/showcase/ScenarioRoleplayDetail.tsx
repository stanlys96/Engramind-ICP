import { RoleplayResponse } from "../../../interface";
import { AnimatedCollapse } from "../AnimatedCollapse";

interface Props {
  item: RoleplayResponse | null;
}

export const ScenarioRoleplayDetail = ({ item }: Props) => {
  return (
    <div>
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={
            item?.description?.charactersGender === "Male"
              ? "/assets/male_persona.avif"
              : "/assets/female_persona.webp"
          }
          className="w-32 h-32 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-[30px] font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[10px]">
            Hello
          </h2>
          <h2 className="text-[22px] font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
            My name is{" "}
            <span className="text-[#697282]">
              {item?.description?.charactersName}
              <span className="text-gray-900 dark:text-white">,</span>
            </span>
            I am{" "}
            <span className="text-[#697282]">
              {item?.description?.charactersAge}
            </span>
            years old.
          </h2>
          <p className="text-[16px]">
            {item?.description?.charactersBackground}
          </p>
        </div>
      </div>
      <AnimatedCollapse title="Character Detail">
        <div>
          <p className="mb-2">
            <span className="font-bold">Gender:</span>{" "}
            {item?.description?.charactersGender}
          </p>
          <p>
            <span className="font-bold">Occupation:</span>{" "}
            {item?.description?.charactersOccupation}
          </p>
        </div>
      </AnimatedCollapse>
      <AnimatedCollapse title="Scenario Detail">
        <div>
          <p className="mb-2">
            <span className="font-bold">Scenario Snippet:</span>{" "}
            {item?.description?.charactersScenarioSnippet}
          </p>
          <p>
            <span className="font-bold">Relevance To Scenario:</span>{" "}
            {item?.description?.charactersRelevanceToScenario}
          </p>
        </div>
      </AnimatedCollapse>
    </div>
  );
};
