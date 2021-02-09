import React, { createContext } from "react";
import useSound from "use-sound";
import cardFlip from "../sounds/cardflip.wav";
import levelUp from "../sounds/levelup.mp3";
import buy from "../sounds/buy.mp3";
import woosh from "../sounds/woosh.mp3";
import slap from "../sounds/slap.mp3";
import box from "../sounds/box.mp3";
import punch from "../sounds/punch.mp3";
import miss from "../sounds/miss.mp3";
import tada from "../sounds/tada.mp3";
import round1 from "../sounds/round1.mp3";
import crowd from "../sounds/crowd.mp3";
import kapow from "../sounds/kapow.mp3";
import marvel from "../sounds/marvel.mp3";

export const SoundContext = createContext();

export const SoundState = (props) => {
  const [playCardFlip] = useSound(cardFlip, { volume: 0.2 });
  const [playLevelUp] = useSound(levelUp, { volume: 0.2 });
  const [playBuy] = useSound(buy, { volume: 0.2 });
  const [playWoosh] = useSound(woosh, { volume: 0.2 });
  const [playSlap] = useSound(slap, { volume: 0.1 });
  const [playPunch] = useSound(punch, { volume: 1.0 });
  const [playBox] = useSound(box, { volume: 0.2 });
  const [playMiss] = useSound(miss, { volume: 0.3 });
  const [playTada] = useSound(tada, { volume: 0.1 });
  const [playStartFight] = useSound(round1, { volume: 0.5 });
  const [playWin] = useSound(crowd, { volume: 0.1 });
  const [playKapow] = useSound(kapow, { volume: 0.1 });
  const [playMarvel] = useSound(marvel, { volume: 0.1, loop: true });
  
  return (
    <SoundContext.Provider
      value={{
        playCardFlip: playCardFlip,
        playLevelUp: playLevelUp,
        playBuy: playBuy,
        playWoosh: playWoosh,
        playSlap: playSlap,
        playBox: playBox,
        playPunch: playPunch,
        playMiss: playMiss,
        playTada: playTada,
        playStartFight: playStartFight,
        playWin: playWin,
        playKapow: playKapow,
        playMarvel: playMarvel
      }}
    >
      {props.children}
    </SoundContext.Provider>
  );
};
