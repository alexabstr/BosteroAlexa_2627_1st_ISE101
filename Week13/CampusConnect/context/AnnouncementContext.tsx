import React, { createContext, useContext, useState } from "react";

type AnnouncementContextValue = {
  submittedCount: number;
  recordSubmission: () => void;
};

const AnnouncementContext = createContext<AnnouncementContextValue | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [submittedCount, setSubmittedCount] = useState(0);

  const recordSubmission = () => setSubmittedCount(count => count + 1);

  return (
    <AnnouncementContext.Provider value={{ submittedCount, recordSubmission }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncementContext() {
  const context = useContext(AnnouncementContext);

  if (!context) throw new Error("useAnnouncementContext must be used inside AnnouncementProvider");

  return context;
}