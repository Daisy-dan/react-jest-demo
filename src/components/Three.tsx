import { useEffect, useRef } from "react";
import * as THREE from "three";
// import "./GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TopEnvironment } from "../common/threejs-env/TopEnvironment";
// import { SwsEnvironment } from "../common/threejs-env//SwsEnvironment";

function Three() {
  const box = useRef<HTMLDivElement>(null);

  const scene = useRef<THREE.Scene>(new THREE.Scene());
  const camera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
  );
  const renderer = useRef<THREE.WebGLRenderer>(
    new THREE.WebGLRenderer({ antialias: true })
  );
  const gltfLoader = new GLTFLoader();
  const urlsws = "src/assets/sws/V3.gltf";
  const urltop = "src/assets/top/TOPmodel_V6.gltf";

  useEffect(() => {
    if (box.current) {
      box.current.style.backgroundColor = "#ccc";
      let file;
      const domW = box.current.clientWidth;
      const domH = box.current.clientHeight;
      //   renderer.current.physicallyCorrectLights = true;
      renderer.current.setClearColor(0xccccd6);
      renderer.current.setSize(domW, domH);
      renderer.current.setPixelRatio(window.devicePixelRatio);
      renderer.current.shadowMap.enabled = true;
      box.current.appendChild(renderer.current.domElement);

      camera.current = new THREE.PerspectiveCamera(45, domW / domH, 1, 1000);
      camera.current.lookAt(scene.current.position);
      const fullWidth = domW * 3;
      const fullHeight = domH * 2;

      // top
      camera.current.position.set(-9.5, 12.8, -5.5);
      camera.current.setViewOffset(
        fullWidth,
        fullHeight,
        domW * 1.1,
        domH * 0.2,
        domW,
        domH
      );
      file = urltop;
      scene.current.background = new THREE.Color(0xe5e5e5);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.current.add(ambientLight);
      const pmr = new THREE.PMREMGenerator(renderer.current);
      pmr.compileEquirectangularShader();
      const neutralEnvironment = pmr.fromScene(new TopEnvironment()).texture;

      // sws
      // camera.current.position.set(10.6, 25, -24.2);
      // camera.current.setViewOffset(
      //   fullWidth,
      //   fullHeight,
      //   domW * 1,
      //   domH * 0.4,
      //   domW,
      //   domH
      // );
      // file = urlsws;

      // const pmr = new THREE.PMREMGenerator(renderer.current);
      // pmr.compileEquirectangularShader();
      // const neutralEnvironment = pmr.fromScene(new SwsEnvironment()).texture;

      //------
      scene.current.environment = neutralEnvironment;
      pmr.dispose();

      gltfLoader.load(
        file,
        (model: any) => {
          scene.current.add(model.scene);
          renderer.current.render(scene.current, camera.current);
        },
        undefined,
        (error: any) => {
          console.error(error);
        }
      );

      const controls = new OrbitControls(
        camera.current,
        renderer.current.domElement
      );

      const onWindowResize = () => {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        renderer.current.render(scene.current, camera.current);
      };

      controls.addEventListener("change", () => {
        renderer.current.render(scene.current, camera.current);
      });

      window.addEventListener("resize", () => {
        onWindowResize();
      });

      window.onpointerdown = (event) => {
        console.log(event);
        event.preventDefault();

        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / domW) * 2 - 1;
        mouse.y = -(event.clientX / domH) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.current);
        const intersected = raycaster.intersectObjects(
          scene.current.children,
          true
        );
        console.log("intersected", intersected);
      };

      renderer.current.render(scene.current, camera.current);
    }
  }, [box]);

  return (
    <div ref={box} style={{ width: 500, height: 800 }}>
      Three
    </div>
  );
}

export default Three;
