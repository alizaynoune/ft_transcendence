import style from "./canvas.module.css";
import React, { Suspense, useRef, KeyboardEvent, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { useInterval } from "@/hooks/useInterval";
import { GameType } from "@/types/types";
import Socket from "@/config/socket";
import { Button, Space, Popover, Slider } from "antd";
import { useRaquets } from "@/hooks/racquetHooks";
import { HexColorPicker } from "react-colorful";
import { useWindowSize } from "@/hooks/useWindowSize";

interface PropsType {
  game: GameType;
  IamPlayer: boolean;
  intraId: number;
}

interface RefType {
  parentMoveRaquet: (action: "RIGHT" | "LEFT") => void;
}

const MyCanvas = forwardRef<RefType, PropsType>((props, ref) => {
  const { game, IamPlayer, intraId } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [count, setCount] = useState<number>(-1);
  const [timer, setTimer] = useState(0);
  const [playerIndex, setPlayerIndex] = useState<number>(-1);
  const [playerX, playerY, moveRaquet] = useRaquets({ playerIndex, game });
  const [raquetXColor, setRaquetXColor] = useState<string>("#50cd89");
  const [raquetYColor, setRaquetYColor] = useState<string>("#3699ff");
  const [skyColor, setSkyColor] = useState<string>("#464E5F");
  const [ballColor, setBallColor] = useState<string>("#d52424");
  const [planColor, setPlanColor] = useState<string>("#464E5F");
  const [wallColor, setWallColor] = useState<string>("#ffffff");
  const width = useWindowSize();
  // const [zoom, setZoom] = useState<number>(0)

  // 1440 768 375
  useEffect(() => {
    console.log(width, "whdth changed");
  }, [width]);

  const gameSpeed: { [k: string]: number } = {
    EASY: 0.252,
    NORMAL: 0.52,
    DIFFICULT: 12,
  };

  useInterval(() => setCount((count) => count - 1), timer);
  useEffect(() => {
    console.log(count, game);
    if (IamPlayer && count < 0 && game.status === "PLAYING" && !game.started) {
      Socket.emit("startGame", { gameId: game.id });
    }
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (!IamPlayer || game.status !== "PLAYING") return;
    const { code } = e;
    let action: "RIGHT" | "LEFT" | "" = "";
    switch (code) {
      case "ArrowRight":
      case "ArrowUp":
      case "KeyL":
        action = "RIGHT";
        break;
      case "ArrowLeft":
      case "ArrowDown":
      case "KeyJ":
        action = "LEFT";
        break;
      default:
        action = "";
    }
    moveRaquet(action);
  };

  useImperativeHandle(ref, () => ({
    parentMoveRaquet(action: "RIGHT" | "LEFT") {
      if (!IamPlayer || game.status !== "PLAYING") return;
      moveRaquet(action);
    },
  }));

  useEffect(() => {
    if (!IamPlayer || game.status === "END") return;
    let player = game.players[0].users.intra_id === intraId ? 0 : 1;
    setPlayerIndex(player);
    Socket.emit("playerReady", { gameId: game.id });
    if (game.status !== "PLAYING") return;
    setCount(5);
    setTimer(1000);
  }, [game.status]);

  useEffect(() => {
    if (!IamPlayer || !game.started || game.status !== "PLAYING") return;
    setTimer(0);
    canvasRef.current.focus();
    document.getElementById("canvas")?.focus();
  }, [game.started]);

  const popoverColors = [
    { lable: "ball", value: ballColor, action: setBallColor },
    { lable: "sky", value: skyColor, action: setSkyColor },
    { lable: "raquet1", value: raquetXColor, action: setRaquetXColor },
    { lable: "raquet2", value: raquetYColor, action: setRaquetYColor },
    { lable: "plan", value: planColor, action: setPlanColor },
    { lable: "wall", value: wallColor, action: setWallColor },
  ];

  // 390 0.5,

  return game.status === "PLAYING" ? (
    <div className={style.container}>
      <span className={style.text}>{game.status}</span>
    </div>
  ) : (
    <>
      {count >= 0 && IamPlayer && !game.started && <span className={style.text}>{count ? count : "GO"}</span>}
      {/* {game.status === "PLAYING" && ( */}
      <Canvas
        className={style.container}
        // frameloop="demand"
        ref={IamPlayer ? canvasRef : undefined}
        onKeyDown={IamPlayer ? handleKeyboardEvent : undefined}
        id="canvas"
        tabIndex={0}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, playerIndex ? 20 : -20], zoom: width <= 700 ? 0.5 : 1 }}
        gl={{ toneMapping: NoToneMapping }}
        onCreated={({ gl }) => {
          gl.setClearColor(skyColor);
        }}
      >
        <color attach="background" args={[skyColor]} />
        <OrbitControls />
        <ambientLight color={"#ffffff"} intensity={0.5} />
        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={9000} factor={4} saturation={0} fade speed={1} />
          <Scene
            refs={{ playerX, playerY }}
            gameId={game.id}
            gameSpeed={gameSpeed[game.level]}
            playerIndex={playerIndex}
            start={game.started}
            colors={{ raquetXColor, raquetYColor, ballColor, planColor, wallColor }}
          />
        </Suspense>
      </Canvas>
      {/* )} */}
      <Popover
        trigger={["click"]}
        placement="topRight"
        style={{ background: "none" }}
        content={
          <Space direction="vertical" style={{ background: "none", alignItems: "flex-end" }}>
            {popoverColors.map((i, key) => {
              return (
                <Popover
                  style={{ background: "none" }}
                  key={key}
                  placement="left"
                  trigger={["click"]}
                  color={i.value}
                  content={
                    <HexColorPicker
                      onChange={(e) => {
                        i.action(e);
                      }}
                    />
                  }
                >
                  <Button style={{ backgroundColor: i.value }}>{i.lable}</Button>
                </Popover>
              );
            })}
          </Space>
        }
      >
        <Button type="primary" ghost>
          {"customize colors"}
        </Button>
      </Popover>
      {/* <Slider value={zoom} min={0} max={100} onChange={(v) => setZoom(v)} /> */}
    </>
  );
});

export default MyCanvas;
