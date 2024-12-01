import { createContext, useState, ReactNode } from "react";

// Define the structure of an individual activity
export interface ActivityElement {
  num: number;
  link: string;
  completed: boolean;
  guessing: boolean;
  question: string;
  answers: (number | string | any[])[];
  difficulty: number;
}

// Define the context type
interface ActivitiesContextProps {
  activityList: ActivityElement[];
  setActivityList: React.Dispatch<React.SetStateAction<ActivityElement[]>>;
}

// Initialize default values for the context
const defaultActivityList: ActivityElement[] = Array.from(
  { length: 9 },
  (_, i) => ({
    num: i + 1,
    link: "",
    completed: false,
    guessing: false,
    question: "",
    answers: [],
    difficulty: 0,
  })
);

export const ActivitiesContext = createContext<ActivitiesContextProps>({
  activityList: defaultActivityList,
  setActivityList: () => {
    throw new Error(
      "setActivityList function must be used within ActivitiesProvider"
    );
  },
});

// Provider component for ActivitiesContext
export default function ActivitiesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activityList, setActivityList] =
    useState<ActivityElement[]>(defaultActivityList);

  return (
    <ActivitiesContext.Provider value={{ activityList, setActivityList }}>
      {children}
    </ActivitiesContext.Provider>
  );
}
