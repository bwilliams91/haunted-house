import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Textures
const textureLoader = new THREE.TextureLoader()

// Floor Textures
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColorTexture = textureLoader.load('./floor/mud_forest_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/mud_forest_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/mud_forest_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/mud_forest_disp_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall Textures

const wallARMTexture = textureLoader.load('./walls/wall_bricks_plaster_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./walls/wall_bricks_plaster_nor_gl_1k.webp')
const wallColorTexture = textureLoader.load('./walls/wall_bricks_plaster_diff_1k.webp')


// wallNormalTexture.repeat.set(3, 3)


wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof Textures

const roofARMTexture = textureLoader.load('./roof/clay_roof_tiles_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_nor_gl_1k.webp')
const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_diff_1k.webp')

roofNormalTexture.repeat.set(1, 1)
roofColorTexture.repeat.set(1, 1)
roofARMTexture.repeat.set(1, 1)

roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofNormalTexture.rotation = Math.PI * 1.5
roofColorTexture.rotation = Math.PI * 1.5
roofARMTexture.rotation = Math.PI * 1.5

// gui.add(roofNormalTexture, 'rotation', 0, 2 * Math.PI)
// gui.add(roofColorTexture, 'colorSpace', ['Linear', 'SRGB'])
// gui.add(roofARMTexture, 'rotation', 0, 2 * Math.PI)

// Bush Textures
const bushAOTexture = textureLoader.load('./bush/Hedge_001_AmbientOcclusion.webp')
const bushRoughTexture = textureLoader.load('./bush/Hedge_001_Roughness.webp')
const bushColorTexture = textureLoader.load('./bush/Hedge_001_BaseColor.webp')
const bushNormalTexture = textureLoader.load('./bush/Hedge_001_Normal.webp')
const bushDisplacementTexture = textureLoader.load('./bush/Hedge_001_Height.webp')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushAOTexture.repeat.set(2, 1)
bushRoughTexture.repeat.set(2, 1)
bushColorTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushAOTexture.wrapS = THREE.RepeatWrapping
bushRoughTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Door Textures
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorAOTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorRoughTexture = textureLoader.load('./door/roughness.webp')
const doorMetalTexture = textureLoader.load('./door/metalness.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorDisplacementTexture = textureLoader.load('./door/height.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Grave Textures
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_arm_1k.webp')
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_diff_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_norm_1k.webp')

graveARMTexture.repeat.set(0.3, 0.4)
graveColorTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)


graveColorTexture.colorSpace = THREE.SRGBColorSpace

// Floor

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(25, 25, 100, 100),
    new THREE.MeshStandardMaterial({ 
        alphaMap : floorAlphaTexture, 
        transparent: true,
        opacity: 1,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2,
        // roughness: 0.8,
        // metalness: 0.2,
    })
)
// floor.position.y = -0.5
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)


/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        map: wallColorTexture,
        color: '#b69b96'
    })
)
walls.position.y += 2.5 / 2
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture,
        map: roofColorTexture,
    })
)
roof.position.y += 3.5
roof.rotation.y = Math.PI * 1.25

house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        aoMap: doorAOTexture,
        roughnessMap: doorRoughTexture,
        metalnessMap: doorMetalTexture,
        normalMap: doorNormalTexture,
        alphaMap: doorAlphaTexture,
        displacementMap: doorDisplacementTexture,
        transparent: true,
        displacementScale: 0.15,
        displacementBias: - 0.04,
    })
)
door.position.y += .9
door.position.x += 2 + 0.01
door.rotation.y = Math.PI * 0.5
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
        map: bushColorTexture,
        aoMap: bushAOTexture,
        roughnessMap: bushRoughTexture,
        normalMap: bushNormalTexture,
        displacementMap: bushDisplacementTexture,
        displacementScale: 0.4,
        displacementBias: - 0.1,
        // color: '#5AAF1A'
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(.8, .2, 2.2)
bush1.rotation.x = - 0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(-.8, 0.2, 2.2)
bush2.rotation.x = - 0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.25, 0.25, 0.25)
bush3.position.set(0, 0.1, 2.2)
bush3.rotation.x = - 0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.5, 0.5, 0.5)
bush4.position.set(.8, 0.2, -2.4)
bush4.rotation.x = 0.33
bush4.rotation.y = -2

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(0.6, 0.6, 0.6)
bush5.position.set(-2.25, 0.2, -1.2)
bush5.rotation.x =  -2
bush5.rotation.y = -0.75
bush5.rotation.z = 1.41

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
bush6.scale.set(0.5, 0.5, 0.5)
bush6.position.set(-2.25, 0.2, 1.2)
bush6.rotation.x = - 2
bush6.rotation.y = -0.75
bush6.rotation.z = 1.41

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial)
bush7.scale.set(0.25, 0.25, 0.25)
bush7.position.set(0, 0.1, -2.2)
bush7.rotation.x = 0.43
bush7.rotation.z = -0.61

const bush8 = new THREE.Mesh(bushGeometry, bushMaterial)
bush8.scale.set(0.22, 0.22, 0.22)
bush8.position.set(2.19, 0.11, 1.7)
bush8.rotation.x = - 0.75

const bush9 = new THREE.Mesh(bushGeometry, bushMaterial)
bush9.scale.set(0.48, 0.48, 0.48)
bush9.position.set(2.41, 0.1, 1.02)
bush9.rotation.x = 1.46 
bush9.rotation.y = -0.75
bush9.rotation.z = 1.51


const bush10 = new THREE.Mesh(bushGeometry, bushMaterial)
bush10.scale.set(0.55, 0.55, 0.55)
bush10.position.set(2.34, 0.1, - 1.08)
bush10.rotation.x = 1.46 
bush10.rotation.y = -0.46
bush10.rotation.z = 1.51

house.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7, bush8, bush9, bush10)

// GUI for bushes
// gui.add(bush7.position, 'x', -3, 3, 0.01)
// gui.add(bush7.position, 'y', -1, 1, 0.01)
// gui.add(bush7.position, 'z', -4, 5, 0.01)
// gui.add(bush4.rotation, 'x', -2, 2, 0.01)
// gui.add(bush4.rotation, 'y', -2, 2, 0.01)
// gui.add(bush4.rotation, 'z', -2, 2, 0.01)


// GRAVES
const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravesMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++) 
    {
        const angle = Math.random() * Math.PI * 2
        const radius = 4 + Math.random() * 4
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        // Mesh
        const grave = new THREE.Mesh(gravesGeometry, gravesMaterial)
        grave.rotation.y = Math.random() * Math.PI * 2
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        grave.rotation.x = (Math.random() - 0.5) * 0.4
        grave.position.y = Math.random() * 0.4
        grave.position.x = x
        grave.position.z = z

        // Add graves to group
        graves.add(grave)
    }


 
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.25)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Point light
 const pointLight = new THREE.PointLight('#ff7d46', 4)
pointLight.position.set(2.34, 2.2, -0.02)
scene.add(pointLight)

// gui.add(pointLight.position, 'x', -3, 3, 0.01)
// gui.add(pointLight.position, 'y', -3, 3, 0.01)
// gui.add(pointLight.position, 'z', -3, 3, 0.01)

// Ghosts
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#882344', 6)
const ghost3 = new THREE.PointLight('#880', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 9.18
camera.position.y = 2.3
camera.position.z = - 5.08
scene.add(camera)

// Orbital camera GUI

// gui.add(camera.position, 'x', -20, 20, 0.01)
// gui.add(camera.position, 'y', -20, 20, 0.01)
// gui.add(camera.position, 'z', -20, 20, 0.01)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Shadows
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and Receiving light
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

floor.receiveShadow = true

walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true

for(const grave of graves.children) {
    grave.castShadow = true
    graves.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.mapSize.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.mapSize.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.mapSize.far = 10

// Sky
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// Fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost Animation
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle * 2.8) * Math.sin(ghost1Angle * 1.78)

    const ghost2Angle = - elapsedTime * 0.4
    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 1.78)

    const ghost3Angle = elapsedTime * 0.3
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 5
    ghost3.position.y = Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 2.37)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()