import React, { createContext } from "react";
import useSound from "use-sound";
import cardFlip from "../sounds/cardflip.wav";
import levelUp from "../sounds/levelup.mp3";
import buy from "../sounds/buy.mp3";
import woosh from "../sounds/woosh.mp3";
import slap from "../sounds/slap.mp3";
import box from "../sounds/box.mp3";
import punch from "../sounds/punch.mp3";

export const SoundContext = createContext();

export const SoundState = (props) => {
  const [playCardFlip] = useSound(cardFlip, { volume: 0.2 });
  const [playLevelUp] = useSound(levelUp, { volume: 0.2 });
  const [playBuy] = useSound(buy, { volume: 0.2 });
  const [playWoosh] = useSound(woosh, { volume: 0.2 });
  const [playSlap] = useSound(slap, { volume: 0.2 });
  const [playPunch] = useSound(box, { volume: 0.8 });
  const [playBox] = useSound(punch, { volume: 0.3 });

  return (
    <SoundContext.Provider
      value={{
        playCardFlip: playCardFlip,
        playLevelUp: playLevelUp,
        playBuy: playBuy,
        playWoosh: playWoosh,
        playSlap: playSlap,
        playBox: playBox,
        playPunch: playPunch
      }}
    >
      {props.children}
    </SoundContext.Provider>
  );
};
