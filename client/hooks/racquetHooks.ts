import { useEffect, useRef } from "react";
import Socket from "@/config/socket";
import { racquetSize, planeSize } from "@/tools/globalVariable";
import { GameType } from "types/types";

interface PropsType {
  playerIndex: number;
  game: GameType;
}

export const useRaquets = (props: PropsType) => {
  const { playerIndex, game } = props;
  const playerX = useRef<THREE.Mesh>(null!);
  const playerY = useRef<THREE.Mesh>(null!);
  const racquetMaxStep = planeSize[0] / 2 - racquetSize[0] / 2;

  useEffect(() => {
    Socket.on("raquetMove", (data) => {
      if (!data.playerIndex) {
        playerX.current.position.x = data.racquet;
      } else playerY.current.position.x = data.racquet;
    });
    return () => {
      Socket.off("raquetMove");
    };
  }, []);

  const movePlayerX = (step: number) => {
    if (Math.abs(playerX.current.position.x + step) <= racquetMaxStep) {
      Socket.emit("raquetMove", { racquet: playerX.current.position.x + step, gameId: game.id, playerIndex });
    } else {
      step = racquetMaxStep - Math.abs(playerX.current.position.x);
      Socket.emit("raquetMove", { racquet: playerX.current.position.x + step, gameId: game.id, playerIndex });
    }
  };

  const movePlayerY = (step: number) => {
    if (Math.abs(playerY.current.position.x + step) <= racquetMaxStep) {
      Socket.emit("raquetMove", { racquet: playerY.current.position.x + step, gameId: game.id, playerIndex });
    } else {
      step = racquetMaxStep - Math.abs(playerY.current.position.x);
      Socket.emit("raquetMove", { racquet: playerY.current.position.x + step, gameId: game.id, playerIndex });
    }
  };

  function moveRaquet(action: "LEFT" | "RIGHT" | "") {
    let step = 0.8;
    if (action === "LEFT") {
      if (!playerIndex) {
        movePlayerX(step);
      } else {
        movePlayerY(step * -1);
      }
    } else if (action === "RIGHT") {
      if (!playerIndex) {
        movePlayerX(step * -1);
      } else {
        movePlayerY(step);
      }
    }
  }

  return [playerX, playerY, moveRaquet] as const;
};
