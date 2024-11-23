<template>
    <div ref="modelContainer" class="model-container"></div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
  
  export default {
    name: 'ThreeDModel',
    setup() {
      const modelContainer = ref(null); // 用来绑定渲染容器
  
      // 加载和渲染 3D 模型
      onMounted(() => {
        // 创建场景、相机和渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        modelContainer.value.appendChild(renderer.domElement);
  
        // 配置 DRACOLoader
        const dracoLoader = new DRACOLoader();
        // 配置解码器路径，这里假设你已经下载了 draco 包，并放置在 `public` 目录下
        dracoLoader.setDecoderPath('https://www.xiaofang.design/draco/draco_decoder.js');
        
        // 使用 GLTFLoader 加载模型
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader); // 将 Draco 解码器设置到 GLTFLoader 上
  
        loader.load(
          'https://www.xiaofang.design/models/511110.glb',
          (gltf) => {
            scene.add(gltf.scene); // 将加载的模型添加到场景中
            gltf.scene.scale.set(0.5, 0.5, 0.5); // 调整模型大小
          },
          undefined,
          (error) => {
            console.error(error);
          }
        );
  
        // 设置相机位置
        camera.position.z = 5;
  
        // 添加环境光源
        const light = new THREE.AmbientLight(0xffffff, 1);
        scene.add(light);
  
        // 动画渲染函数
        const animate = () => {
          requestAnimationFrame(animate);
  
          // 旋转模型
          scene.rotation.y += 0.01;
  
          // 渲染场景
          renderer.render(scene, camera);
        };
  
        animate();
  
        // 处理窗口大小变化
        window.addEventListener('resize', () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        });
      });
  
      return {
        modelContainer,
      };
    },
  };
  </script>
  
  <style scoped>
  .model-container {
    width: 100%;
    height: 100vh;
  }
  </style>
  