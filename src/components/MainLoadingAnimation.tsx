import { Center } from "./Center";
import { FullScreen } from "./FullScreen";
import { LoadingAnimation } from "./LoadingAnimation";

export const MainLoadingAnimation = () => (
  <FullScreen>
    <Center>
      <LoadingAnimation />
    </Center>
  </FullScreen>
);
