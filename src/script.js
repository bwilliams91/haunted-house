import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/mud_forest_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/mud_forest_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/mud_forest_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/mud_forest_disp_1k.jpg')

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

const wallARMTexture = textureLoader.load('./walls/wall_bricks_plaster_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./walls/wall_bricks_plaster_nor_gl_1k.jpg')
const wallColorTexture = textureLoader.load('./walls/wall_bricks_plaster_diff_1k.jpg')


// wallNormalTexture.repeat.set(3, 3)


wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof Textures

const roofARMTexture = textureLoader.load('./roof/clay_roof_tiles_03_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_03_nor_gl_1k.jpg')
const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_03_diff_1k.jpg')

roofNormalTexture.repeat.set(4, 4)
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.repeat.set(4, 4)
roofColorTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

roofARMTexture.repeat.set(4, 4)
roofARMTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.colorSpace = THREE.SRGBColorSpace

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
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshStandardMaterial({color: 0xf55f, roughness: 0.5})
)
door.position.y += 1
door.position.x += 2 + 0.01
door.rotation.y = Math.PI * 0.5
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(.8, .2, 2.2)


const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(-.8, 0.2, 2.2)


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.25, 0.25, 0.25)
bush3.position.set(0, 0.1, 2.2)


const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.5, 0.5, 0.5)
bush4.position.set(.8, 0.2, -2.4)


const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
bush5.scale.set(0.5, 0.5, 0.5)
bush5.position.set(-2.25, 0.2, -1.2)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
bush6.scale.set(0.5, 0.5, 0.5)
bush6.position.set(-2.25, 0.2, 1.2)


const bush7 = new THREE.Mesh(bushGeometry, bushMaterial)
bush7.scale.set(0.25, 0.25, 0.25)
bush7.position.set(0, 0.1, -2.2)

house.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7)

// GRAVES
const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravesMaterial = new THREE.MeshStandardMaterial()

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


// GUI for bushes
// gui.add(bush5.position, 'x', -3, 3, 0.01)
// gui.add(bush5.position, 'y', -1, 1, 0.01)
// gui.add(bush5.position, 'z', -4, 5, 0.01)

 
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

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

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()