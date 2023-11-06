"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { positionView } from "three/examples/jsm/nodes/Nodes.js";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { toggleState } from "@/pages/_app";
import { useEffect, useState } from "react";
function MeshComponent() {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);
  const [isToggle, setIsToggle] = useRecoilState(toggleState);
  const [isclicked, setIsClicked] = useState<boolean>();
  useEffect(() => {
    if (isToggle) {
      alert("강아지를 잡았군요! 이제 게시글을 쓸 수 있어요.");
    }
  }, [isToggle]);
  useFrame(() => {
    mesh.current.rotation.y += 0.03;
    mesh.current.rotation.x += 0.02;
    mesh.current.rotation.z += 0.11;
  });

  return (
    <>
      <mesh
        ref={mesh}
        onClick={() => setIsToggle(true)}
        scale={1.1}
        position={[0.1, -0.1, 1]}
      >
        <primitive object={gltf.scene} />
      </mesh>
      ;{/* })} */}
      <mesh
        ref={mesh}
        onClick={() => {
          setIsToggle(true);
          setIsClicked(true);
          isclicked && alert("강아지를 잡았군요! 이제 게시글을 쓸 수 있어요.");
        }}
        scale={isToggle ? 2 : 1}
        position={[0.5, -0.3, 0.1]}
      >
        <primitive object={gltf.scene} />
      </mesh>
    </>
  );
}
export function Shiba() {
  return (
    <div className="flex justify-center items-center h-96  ">
      <Canvas className="h-3xl w-3xl">
        <OrbitControls />
        <ambientLight />
        {/* <PerspectiveCamera position={[10, 10, 1]} /> */}
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}
