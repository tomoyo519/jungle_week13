"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { positionView } from "three/examples/jsm/nodes/Nodes.js";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function MeshComponent() {
  const fileUrl = "/shiba/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  useFrame(() => {
    mesh.current.rotation.y += 0.03;
    mesh.current.rotation.x += 0.02;
    mesh.current.rotation.z += 0.11;

    // const camera = new THREE.PerspectiveCamera(
    //   63,
    //   window.innerWidth / window.innerHeight,
    //   1,
    //   1000
    // );
    // camera.position.z = 5;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function Shiba() {
  return (
    <div className="flex justify-center items-center h-80 ">
      <Canvas className="h-2xl w-2xl">
        <OrbitControls />
        <ambientLight />
        {/* <PerspectiveCamera position={[0, 0, 1]} /> */}
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
}
