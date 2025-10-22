"use client";

import { useState, useEffect } from "react";
import { useAppEnvironment } from "@/hooks/use-env";
import { getOnboardingStatus, setOnboardingStatus } from "@/lib/idb/onboarding-storage";
import { OnboardingScreen } from "./onboarding-screen";
import { LoadingScreen } from "./loading-screen";

interface OnboardingWrapperProps {
  children: React.ReactNode;
}

export function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  const env = useAppEnvironment();
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    async function checkEnvironmentAndOnboarding() {
      if (env === "unknown") return;

      if (env === "twa") {
        const hasSeenOnboarding = await getOnboardingStatus();
        setShowOnboarding(!hasSeenOnboarding);
      } else {
        setShowOnboarding(false);
      }

      setIsChecking(false);
    }

    checkEnvironmentAndOnboarding();
  }, [env]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleOnboardingComplete = async () => {
    if (env === "twa") {
      await setOnboardingStatus(true);
    }
    setShowOnboarding(false);
  };

  if (showLoading || isChecking || env === "unknown") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (showOnboarding && env === "twa") {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <>{children}</>;
}
