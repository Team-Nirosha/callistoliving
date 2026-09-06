# Callisto Living Experience

Build a production-quality luxury interior design website for:

CALLISTO LIVING
Premium Interior Design Studio

IMPORTANT:
Use the attached reference image as the visual/design direction.

I do NOT want a normal 2D website with fake 3D effects.

I want a REAL interactive 3D WebGL experience using:

- Vue.js 3
- Vite
- JavaScript
- Three.js
- @tresjs/core or native Three.js
- GSAP
- GSAP ScrollTrigger
- Tailwind CSS
- Vue Router

The website must feel like a premium Awwwards-level
3D architecture/interior-design website.

==================================================
1. HERO — FULLSCREEN 3D INTERIOR
==================================================

The first screen should be a REAL 3D luxury living room.

Load a GLB/GLTF interior model.

Scene contains:

- luxury sofa
- coffee table
- marble floor
- walls
- ceiling
- pendant lights
- plants
- decorative objects
- windows
- curtains
- artwork
- architectural elements

Camera starts slowly moving through the room.

Animation:

0 sec:
Black screen

0.5 sec:
Callisto Living logo appears

1 sec:
3D environment starts loading

2 sec:
Camera slowly moves toward the living room

2.5 sec:
Lights turn on progressively

3 sec:
Text appears:

SPACES
THAT
DEFINE YOU

Then:

"We create timeless interiors where architecture,
functionality and emotion come together."

Buttons:

EXPLORE OUR WORK
ENTER 3D EXPERIENCE

==================================================
2. REAL 3D CAMERA MOVEMENT
==================================================

The camera must continuously have subtle cinematic movement.

Mouse movement:

Mouse left:
camera subtly moves left

Mouse right:
camera subtly moves right

Mouse up:
camera tilts upward

Mouse down:
camera tilts downward

Use smooth interpolation / lerp.

Do NOT make the movement aggressive.

The scene should feel like a cinematic architectural walkthrough.

==================================================
3. SCROLL = 3D CAMERA JOURNEY
==================================================

This is extremely important.

Scrolling should control the 3D camera.

Scroll down:

Living Room
      ↓
Dining Room
      ↓
Kitchen
      ↓
Bedroom
      ↓
Balcony
      ↓
Exterior

Use GSAP ScrollTrigger.

Example:

Scroll 0%:
camera = living room

Scroll 20%:
camera moves toward dining room

Scroll 40%:
camera moves into kitchen

Scroll 60%:
camera moves toward bedroom

Scroll 80%:
camera moves toward balcony

Scroll 100%:
camera exits toward exterior.

The camera movement must be smooth and cinematic.

==================================================
4. 3D HOUSE / FLOOR PLAN
==================================================

Create an interactive 3D apartment/house.

Display the complete floor plan in 3D.

User can:

ROTATE
ZOOM
PAN

Rooms:

Living Room
Bedroom
Kitchen
Dining Room
Bathroom
Balcony

When the user clicks a room:

Camera smoothly flies to that room.

Example:

CLICK LIVING ROOM

Camera:
flyTo(livingRoomPosition)

Then show:

LIVING ROOM

Material:
Italian Marble

Style:
Contemporary Luxury

Area:
620 sq.ft.

==================================================
5. INTERACTIVE 3D HOTSPOTS
==================================================

Place floating 3D hotspots around the interior.

Examples:

Sofa
Light
Marble
Table
Artwork
Plant
Flooring

When user hovers:

hotspot grows

glowing ring appears

small information panel appears

Example:

ITALIAN MARBLE

Natural stone
Premium finish

The hotspot should exist in 3D space,
not just as normal HTML cards.

==================================================
6. 3D FURNITURE MOVEMENT
==================================================

Furniture should have subtle animations.

Sofa:
slight floating/parallax movement

Pendant light:
gentle swing

Plants:
subtle wind animation

Curtains:
soft movement

Decorative objects:
slow rotation

Lights:
smooth intensity animation

Do not animate everything continuously.
Animations should feel realistic and luxurious.

==================================================
7. 3D MATERIAL EXPERIENCE
==================================================

Create a section:

EXPLORE MATERIALS

Materials:

MARBLE
WOOD
STONE
METAL
GLASS
FABRIC

When user selects MARBLE:

3D floor changes to marble texture.

When user selects WOOD:

floor transitions to wood.

Use smooth texture/material transition.

==================================================
8. DAY / NIGHT MODE
==================================================

Add:

DAY
NIGHT

DAY:

bright sunlight
soft shadows
warm interior

NIGHT:

dark environment
city lights
interior lights ON
cinematic shadows

Transition between day and night smoothly.

Animate:

directional light
ambient light
point lights
environment intensity
sky/background

==================================================
9. 3D LIGHTING
==================================================

Use realistic Three.js lighting.

Include:

AmbientLight
DirectionalLight
PointLight
SpotLight

Create realistic interior shadows.

Pendant lights should emit light.

Add subtle bloom/glow where appropriate.

Do not overuse bloom.

==================================================
10. 3D PARTICLES
==================================================

Add subtle floating particles/dust.

Particles react slightly to mouse movement.

Keep particle count optimized.

Particles should enhance atmosphere,
not distract from the interior.

==================================================
11. PROJECTS — 3D TRANSITION
==================================================

Projects section should not simply be a grid.

Create large architectural project cards.

Projects:

THE BLACK HOUSE
MODERN MINIMAL RESIDENCE
CONTEMPORARY VILLA
LUXURY APARTMENT
BOUTIQUE OFFICE

On hover:

image zooms

3D tilt

lighting changes

title moves

cursor changes to:

VIEW PROJECT

On click:

transition into the project.

Use a cinematic page transition.

==================================================
12. PROJECT DETAIL — 3D WALKTHROUGH
==================================================

Project detail page:

THE BLACK HOUSE

Create a full-screen 3D walkthrough.

Controls:

W
A
S
D

Mouse:
Look around

Mobile:
Touch joystick / drag camera

Buttons:

FULLSCREEN
SOUND
DAY/NIGHT
ROOMS

User can walk through:

Entrance
Living Room
Dining
Kitchen
Bedroom
Garden

==================================================
13. 3D OBJECT INTERACTION
==================================================

Allow users to click objects.

Example:

Click sofa:

SOFA
Italian leather
Custom design

Click lamp:

PENDANT LIGHT
Brass finish
Handcrafted

Click table:

COFFEE TABLE
Natural stone

Use raycasting.

Objects should highlight when hovered.

==================================================
14. CUSTOM CURSOR
==================================================

Create custom cursor.

Normal:
small circle

Hover 3D object:
EXPLORE

Hover project:
VIEW

Clickable:
OPEN

3D interaction:
DRAG

Cursor should smoothly follow mouse.

==================================================
15. GSAP ANIMATION SYSTEM
==================================================

Use GSAP for:

text reveal
image reveal
camera animation
page transitions
scroll animation
3D object movement
menu animation
hover effects
project transitions
section transitions

Use timelines.

Animations should be smooth and premium.

==================================================
16. NAVIGATION
==================================================

Minimal transparent navbar.

CALLISTO
LIVING

HOME
ABOUT
SERVICES
PROJECTS
EXPERIENCE
CONTACT

Navbar changes appearance depending on background.

On scroll:

transparent → dark glass effect

==================================================
17. LOADING EXPERIENCE
==================================================

Because this website contains heavy 3D assets,
create a premium loading screen.

Display:

CALLISTO LIVING

LOADING EXPERIENCE

0%
20%
40%
60%
80%
100%

Animate percentage.

Show progress based on actual
3D asset loading.

After loading:

fade into 3D environment.

==================================================
18. MOBILE
==================================================

Do NOT remove the 3D experience on mobile.

Optimize it.

Desktop:
high-quality GLB

Tablet:
medium quality

Mobile:
optimized GLB

Reduce:

polygon count
textures
shadows
particle count

Use device detection.

Touch:

drag = camera rotation

pinch = zoom

tap = hotspot

swipe = navigation

==================================================
19. PERFORMANCE
==================================================

This is critical.

Use:

lazy loading
dynamic imports
GLB compression
Draco compression
KTX2 textures
WebP/AVIF
LOD
frustum culling
instanced meshes
requestAnimationFrame optimization

Do not load every 3D model at startup.

Load sections/models when required.

Target:

60 FPS desktop
smooth experience mobile

==================================================
20. ARCHITECTURE
==================================================

Create:

src/

components/

3d/
  InteriorScene.vue
  HouseModel.vue
  RoomModel.vue
  Furniture.vue
  CameraController.vue
  LightingSystem.vue
  Hotspots.vue
  ParticleSystem.vue

components/

  Navbar.vue
  Hero.vue
  LoadingScreen.vue
  ProjectSection.vue
  Services.vue
  MaterialExplorer.vue
  About.vue
  Testimonials.vue
  Contact.vue
  CustomCursor.vue

composables/

  useThreeScene.js
  useCamera.js
  useGSAP.js
  useScrollAnimation.js
  useDevicePerformance.js

views/

  Home.vue
  Projects.vue
  ProjectDetails.vue
  Experience.vue
  Contact.vue

assets/

  models/
  textures/
  images/
  hdri/

==================================================
VISUAL STYLE
==================================================

Follow the reference image.

Luxury:

BLACK
WARM WHITE
BEIGE
CHAMPAGNE GOLD

Typography:

Elegant serif headings
Minimal modern sans-serif body

Large typography.

Cinematic photography.

Premium spacing.

Subtle borders.

Glass effects only where appropriate.

Do not create a generic SaaS dashboard.

This is an interior architecture experience.

==================================================
FINAL EXPERIENCE
==================================================

The user should feel:

"I am entering a luxury interior."

The website should behave more like:

3D architectural presentation
+
interactive game-like exploration
+
cinematic portfolio
+
luxury interior design website

NOT:

normal website
+
some CSS animations.

Every major section should have a relationship
with the 3D environment.

Make the final result production-ready.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d8c4431d-9279-4998-a438-8a716e5bf0ce).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
