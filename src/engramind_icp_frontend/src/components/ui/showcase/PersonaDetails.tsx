import { SquarePen } from "lucide-react";
import { PersonaData } from "../../../interface";
import {
  formatBackgroundInput,
  personalDetailsData,
  personalityProfileData,
} from "../../../utils/helper";
import { ProgressBar } from "./ProgressBar";

interface Props {
  persona: PersonaData | null;
  onEditPress: () => void;
}

export const PersonaDetails = ({ persona, onEditPress }: Props) => {
  return (
    <div>
      <p className="font-bold text-[22px]">Selected Persona Details</p>
      <div className="rounded-[8px] bg-[#FAFAFA] dark:bg-[#18181B] p-[20px] mt-[10px] relative">
        <button
          type="button"
          onClick={onEditPress}
          className="cursor-pointer focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-[#88888850] bg-[#FAFAFA] dark:bg-[#18181B] hover:bg-accent hover:text-accent-foreground border shadow-sm h-9 w-9 absolute top-4 right-4"
        >
          <SquarePen size={15} />
        </button>
        <div>
          <p className="text-center dark:text-white text-black text-[26px] font-bold">
            {persona?.persona_details?.name}
          </p>
          <div className="flex gap-x-2 items-center justify-center text-[#A1A1AA] mt-2">
            <p>{persona?.persona_details?.occupation}</p>
            <span>•</span>
            <p>{persona?.persona_details?.age} years old</p>
            <span>•</span>
            <p>{persona?.persona_details?.nationality}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 mt-[20px]">
            <div className="w-full bg-white dark:bg-[#27272A] rounded-[8px] p-[20px]">
              <p className="font-bold text-[18px]">Personal Details</p>
              {personalDetailsData(persona).map((personalDetail) => (
                <div key={personalDetail.id} className="my-3">
                  <p className="text-[#A1A1AA] text-sm">
                    {personalDetail?.title}
                  </p>
                  <p className="text-md">{personalDetail?.value}</p>
                </div>
              ))}
            </div>
            <div className="w-full bg-white dark:bg-[#27272A] rounded-[8px] p-[20px] w-full">
              <p className="font-bold text-[18px]">Personality Profile</p>
              <div className="mt-2 space-y-4">
                {personalityProfileData(persona).map((personalityProfile) => (
                  <div
                    key={personalityProfile.id}
                    className="grid grid-cols-[120px,1fr,40px] items-center gap-4"
                  >
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                      {personalityProfile?.title}
                    </p>
                    <ProgressBar
                      className="col-span-1 w-full"
                      value={parseFloat(personalityProfile?.value)}
                    />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                      {personalityProfile?.value}%
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-x-4 mt-4">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                  MBTI: {persona?.persona_details?.personalityTraits?.mbtiType}
                </p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                  Enneagram:{" "}
                  {persona?.persona_details?.personalityTraits?.enneagramType}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white dark:bg-[#27272A] rounded-[8px] p-[20px]">
            <p className="font-bold text-[18px]">Background</p>
            <div className="my-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: formatBackgroundInput(
                    persona?.persona_details?.background ?? ""
                  ),
                }}
                className="text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full bg-white dark:bg-[#27272A] rounded-[8px] p-[20px]">
              <p className="font-bold text-[18px]">Skills & Abilities</p>
              <div className="my-3">
                <p className="text-sm">
                  {persona?.persona_details?.skillsAndAbilities}
                </p>
              </div>
            </div>
            <div className="w-full bg-white dark:bg-[#27272A] rounded-[8px] p-[20px]">
              <p className="font-bold text-[18px]">Motivations & Goals</p>
              <div className="my-3">
                <p className="text-sm">
                  {persona?.persona_details?.motivationsAndGoals}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
