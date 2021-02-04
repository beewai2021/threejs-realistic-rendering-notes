// ================================================================================
// Lights
// --------------------------------------------------------------------------------

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.height = 512 * 2
directionalLight.shadow.mapSize.width = 512 * 2

// solving shadow acne
// 0.00 <---> 0.05 should be a good enough range
directionalLight.shadow.bias = 0.05 // flat surfaces
directionalLight.shadow.normalBias = 0.05 // rounded surfaces
// shrinking impacted mesh smaller so that it doesn't cast shadows on itself

// ================================================================================


// ================================================================================
// Encoding
// --------------------------------------------------------------------------------

// environment map
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/px.jpg",
  "/textures/environmentMaps/nx.jpg",
  "/textures/environmentMaps/py.jpg",
  "/textures/environmentMaps/ny.jpg",
  "/textures/environmentMaps/pz.jpg",
  "/textures/environmentMaps/nz.jpg",
])

environmentMapTexture.encoding = THREE.sRGBEncoding

// gltf
const gltfLoader = new GLTFLoader()
gltfLoader.load("/model.glb", (gltf) => {
  const model = gltf.scene

  model.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.castShadow = true
      child.receiveShadow = true

      child.material.envMap = environmentMapTexture
      child.material.envMapIntensity = 3

      // child.material.needsUpdate = true // enable with dat.gui
    }
  })
})

// renderer
renderer.outputEncoding = THREE.sRGBEncoding

// ================================================================================


// ================================================================================
// Tonemapping
// --------------------------------------------------------------------------------

// tonemapping options
// THREE.NoToneMapping
// THREE.LinearToneMapping
// THREE.ReinhardToneMapping
// THREE.CineonToneMapping
// THREE.ACESFilmicToneMapping

// converting HDR values to LDR values using algorithims to between 0 <---> 1
renderer.toneMapping = THREE.ReinhardToneMapping
// how much light renderer will let in
renderer.toneMappingExposure = 3

// ================================================================================


// ================================================================================
// Rendering
// --------------------------------------------------------------------------------

renderer.physicallyCorrectLights = true // synchronise light values between 3D software and three.js

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// ================================================================================
