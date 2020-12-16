import React, { createContext } from "react";
import useSound from "use-sound";
import cardFlip from "../sounds/cardflip.wav";
import levelUp from "../sounds/levelup.mp3";
import buy from "../sounds/buy.mp3";
import woosh from "../sounds/woosh.mp3";

export const SoundContext = createContext();

export const SoundState = (props) => {
  const [playCardFlip] = useSound(cardFlip, { volume: 0.2 });
  const [playLevelUp] = useSound(levelUp, { volume: 0.2 });
  const [playBuy] = useSound(buy, { volume: 0.2 });
  const [playWoosh] = useSound(woosh, { volume: 0.2 });

  return (
    <SoundContext.Provider
      value={{
        playCardFlip: playCardFlip,
        playLevelUp: playLevelUp,
        playBuy: playBuy,
        playWoosh: playWoosh,
      }}
    >
      {props.children}
    </SoundContext.Provider>
  );
};
