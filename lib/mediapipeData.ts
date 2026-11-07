export interface MediaPipeDocItem {
  title: string;
  category: "Official Guides" | "API References" | "Playgrounds & Tools" | "Repositories";
  description: string;
  url: string;
  badge: string;
}

export interface MediaPipeTutorial {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  duration: string;
  summary: string;
  keyConcepts: string[];
  codeSnippet?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface MediaPipeProjectIdea {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "AgriTech & Food" | "Assistive Tech" | "Creative & Audio" | "Gaming & HCI" | "Health & Fitness";
  description: string;
  inputs: string[];
  expectedOutput: string;
  hackNightTip: string;
  starterGuide?: string;
}

export interface MediaPipeTaskCapability {
  domain: "Vision" | "Audio" | "Text";
  name: string;
  description: string;
  keyMetric: string;
  sampleUse: string;
}

export const mediapipeQuickstartCode = `# 1. Install dependencies
# pip install mediapipe opencv-python numpy

import cv2
import mediapipe as mp

# Initialize MediaPipe Hands & Drawing utilities
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Open default webcam (0)
cap = cv2.VideoCapture(0)

with mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
) as hands:
    print("Camera started! Press 'q' to exit window.")
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            continue

        # Flip horizontally for selfie-view & convert BGR to RGB
        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process frame to detect hand landmarks
        results = hands.process(rgb_frame)

        # Draw hand skeleton overlay
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    mp_hands.HAND_CONNECTIONS
                )

        cv2.imshow('Saturday Hack Night - MediaPipe Quickstart', frame)
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()`;

export const distanceCalculationCode = `import numpy as np

def calculate_distance(landmark_a, landmark_b, image_width, image_height):
    """
    Computes Euclidean distance in pixel space between two MediaPipe landmarks.
    Each landmark has normalized coordinates (x: [0.0, 1.0], y: [0.0, 1.0]).
    """
    pt_a = np.array([landmark_a.x * image_width, landmark_a.y * image_height])
    pt_b = np.array([landmark_b.x * image_width, landmark_b.y * image_height])
    
    distance = np.linalg.norm(pt_a - pt_b)
    return distance

# Example trigger: Detect pinch when thumb tip (id 4) touches index tip (id 8)
# if calculate_distance(hand_landmarks.landmark[4], hand_landmarks.landmark[8], w, h) < 35:
#     print("Pinch detected! Triggering click or paint action.")`;

export const colabSnippet = `# In Google Colab, you can install and run MediaPipe directly:
!pip install -q mediapipe opencv-python-headless

# For interactive webcam streaming directly inside Colab cells,
# use the JavaScript WebRTC video stream helper:
from IPython.display import display, Javascript
from google.colab.output import eval_js
# Complete Colab starter notebook link provided in Documentation section below!`;

export const realWorldApps = [
  {
    title: "Touchless Human-Computer Interfaces",
    desc: "Controlling hospital operating room monitors, sterile recipe guides, and audio workstations without touching a screen or keyboard.",
    tag: "HCI & Control",
    color: "bg-[#fff6bf]",
  },
  {
    title: "Fitness & Ergonomic Tracking",
    desc: "Counting squat, pushup, and bicep curl repetitions automatically, assessing physical therapy rehabilitation, and posture monitoring.",
    tag: "HealthTech",
    color: "bg-[#d4f5e0]",
  },
  {
    title: "Assistive Tech & Sign Language",
    desc: "Translating American Sign Language (ASL) fingerspelling and gestures into real-time speech synthesis for accessible communication.",
    tag: "Accessibility",
    color: "bg-[#fae4f2]",
  },
  {
    title: "Virtual Try-On & Face AR Filters",
    desc: "Fitting eyewear, virtual cosmetics, masks, and accessories onto faces with real-time 3D geometry anchors and blendshapes.",
    tag: "Augmented Reality",
    color: "bg-[#e0f4fb]",
  },
];

export const mediapipeCapabilities: MediaPipeTaskCapability[] = [
  {
    domain: "Vision",
    name: "Hand Landmarker",
    description: "Detects 21 3D landmarks per hand with high fidelity. Identifies fingertips, knuckles, palm center, and handedness (left/right).",
    keyMetric: "21 3D points / hand",
    sampleUse: "Gesture control, sign language, touchless air mouse",
  },
  {
    domain: "Vision",
    name: "Face Landmarker & Mesh",
    description: "Estimates 478 3D facial landmarks and 52 real-time facial blendshapes (eye blinks, smile, jaw movements, eyebrow raises).",
    keyMetric: "478 3D points + 52 blendshapes",
    sampleUse: "AR filters, blink fatigue monitor, avatar VTuber tracking",
  },
  {
    domain: "Vision",
    name: "Pose Landmarker",
    description: "Full-body landmark tracking across 33 body landmarks, mapping shoulders, elbows, hips, knees, ankles, and heels with depth.",
    keyMetric: "33 full-body 3D landmarks",
    sampleUse: "Fitness rep counters, posture coach, motion gaming",
  },
  {
    domain: "Vision",
    name: "Gesture Recognizer",
    description: "Combines hand landmarking with built-in gesture recognition (Thumbs Up, Victory, Open Palm, Closed Fist, Pointing, Love).",
    keyMetric: "Pretrained + custom heuristics",
    sampleUse: "Slideshow remote, hands-free video player controls",
  },
  {
    domain: "Vision",
    name: "Object Detector & Image Segmenter",
    description: "Identifies presence, locations, and pixel-precise masks for people, everyday objects, and background replacement in real time.",
    keyMetric: "Zero-latency edge segmentation",
    sampleUse: "Virtual green screen, background blur, object tracking",
  },
  {
    domain: "Audio",
    name: "Audio Classifier",
    description: "Detects and categorizes hundreds of live audio events from microphone stream (speech, applause, musical instruments, alarms).",
    keyMetric: "521 audio event categories",
    sampleUse: "Acoustic gesture trigger, clap-to-activate hack projects",
  },
  {
    domain: "Text",
    name: "Text Classifier & Embedder",
    description: "Lightweight edge-based sentiment analysis, topic labeling, and vector embeddings for semantic search without cloud APIs.",
    keyMetric: "Runs on-device CPU",
    sampleUse: "On-device command comprehension, privacy-first NLP",
  },
];

export const MEDIAPIPE_STARTER_REPO_URL =
  "https://github.com/TINKERHUB-SATURDAY-HACKNIGHT/SHN-MEDIAPIPE";
export const MEDIAPIPE_STARTER_FORK_URL =
  "https://github.com/TINKERHUB-SATURDAY-HACKNIGHT/SHN-MEDIAPIPE/fork";
export const MEDIAPIPE_STARTER_GIT_CLONE_URL =
  "https://github.com/TINKERHUB-SATURDAY-HACKNIGHT/SHN-MEDIAPIPE.git";

export const documentationResources: MediaPipeDocItem[] = [
  {
    title: "Official SHN MediaPipe Starter Template",
    category: "Repositories",
    description: "Official Saturday Hack Night starter repository. Fork this template to your GitHub account before you start coding!",
    url: MEDIAPIPE_STARTER_REPO_URL,
    badge: "Fork Template",
  },
  {
    title: "Google AI Edge: MediaPipe Solutions Guide",
    category: "Official Guides",
    description: "The primary entry point for MediaPipe Tasks architecture, models, cross-platform deployment, and quickstart guides.",
    url: "https://ai.google.dev/edge/mediapipe/solutions/guide",
    badge: "Official Hub",
  },
  {
    title: "MediaPipe Python Solutions API Reference",
    category: "API References",
    description: "Comprehensive Python API documentation covering Hand Landmarker, Pose, Face Mesh, and interactive image/video processing options.",
    url: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/python",
    badge: "Python Docs",
  },
  {
    title: "MediaPipe GitHub Repository",
    category: "Repositories",
    description: "Open-source source code, C++ backend pipelines, Android/iOS bindings, Python wheels, issue tracker, and community discussions.",
    url: "https://github.com/google-ai-edge/mediapipe",
    badge: "Source Code",
  },
  {
    title: "MediaPipe Model Maker Guide",
    category: "Official Guides",
    description: "Fine-tune and customize existing vision models with transfer learning on your own specialized custom datasets with minimal compute.",
    url: "https://ai.google.dev/edge/mediapipe/solutions/model_maker",
    badge: "Model Training",
  },
  {
    title: "OpenCV Python Official Tutorials",
    category: "Official Guides",
    description: "Learn how OpenCV handles frame reading, video encoding, color transforms (BGR to RGB), drawing overlays, and bounding boxes.",
    url: "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html",
    badge: "Essential Prereq",
  },
];

export const tutorialsList: MediaPipeTutorial[] = [
  {
    id: "tut-01",
    level: "Beginner",
    title: "01. First Steps: Hand Landmarks & Skeleton Tracking",
    duration: "15 mins",
    summary:
      "Hook into your local webcam with OpenCV, pass frames into MediaPipe Hands, and render 21 3D landmark points and bone connections onto the video canvas.",
    keyConcepts: [
      "OpenCV VideoCapture stream",
      "BGR to RGB color conversion",
      "Drawing landmark coordinates",
      "Normalized coordinate translation",
    ],
    linkText: "Hand Landmarker Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/python",
  },
  {
    id: "tut-02",
    level: "Beginner",
    title: "02. 468-Point Face Mesh & Blink Detection",
    duration: "25 mins",
    summary:
      "Map dense 3D facial geometry in real time. Learn how to track eyelids and calculate the Eye Aspect Ratio (EAR) to detect winks and sleepiness.",
    keyConcepts: [
      "468 Face mesh triangulation",
      "Eyelid landmark indices",
      "Eye Aspect Ratio (EAR) formula",
      "Threshold-based trigger events",
    ],
    linkText: "Face Landmarker Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/python",
  },
  {
    id: "tut-03",
    level: "Beginner",
    title: "03. Pose Landmark Tracking & Squat Rep Counter",
    duration: "30 mins",
    summary:
      "Use MediaPipe Pose to track 33 body keypoints. Calculate joint angles between hip, knee, and ankle using vector dot products to build an automated workout rep counter.",
    keyConcepts: [
      "33 Full body landmark indices",
      "Trigonometry angle math: np.arctan2()",
      "State machine: 'UP' vs 'DOWN' states",
      "HUD counter on OpenCV canvas",
    ],
    linkText: "Pose Landmarker Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker/python",
  },
  {
    id: "tut-04",
    level: "Intermediate",
    title: "04. Custom Rule-Based Gesture Recognizer",
    duration: "35 mins",
    summary:
      "Build a robust gesture classifier without training a neural net by comparing relative fingertip heights against knuckle landmarks (Fist, Peace, Thumbs Up, Pinch).",
    keyConcepts: [
      "Fingertip vs PIP knuckle comparisons",
      "Thumb angle orientation check",
      "Debouncing false positives",
      "Dispatching custom events",
    ],
    linkText: "Gesture Recognizer Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/python",
  },
  {
    id: "tut-05",
    level: "Intermediate",
    title: "05. Air Canvas: Paint in the Air with Fingertip Tracking",
    duration: "40 mins",
    summary:
      "Create a digital whiteboard where your index finger acts as a paintbrush. Use pinch or two fingers together as the 'brush down' state and a swipe to clear canvas.",
    keyConcepts: [
      "Drawing layer canvas buffer",
      "cv2.line & cv2.circle primitives",
      "Color palette selector UI",
      "cv2.addWeighted() blending",
    ],
    linkText: "Vision Solutions Docs",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker",
  },
  {
    id: "tut-06",
    level: "Intermediate",
    title: "06. Touchless Virtual Mouse with PyAutoGUI",
    duration: "45 mins",
    summary:
      "Control your operating system cursor using air gestures. Move the mouse with your index fingertip and trigger left-click when thumb and index finger tap together.",
    keyConcepts: [
      "Camera to screen coordinate mapping",
      "Exponential moving average smoothing",
      "PyAutoGUI click dispatching",
      "Failsafe abort mechanisms",
    ],
    linkText: "Python Tasks Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/python",
  },
  {
    id: "tut-07",
    level: "Advanced",
    title: "07. 3D World Landmarks & Metric Spatial Depth",
    duration: "50 mins",
    summary:
      "Move beyond 2D screen coordinates. MediaPipe outputs metric 3D world landmarks with the origin at the hand/hip center, measured in real-world meters.",
    keyConcepts: [
      "World coordinate landmarks",
      "Metric scale estimation (x, y, z in meters)",
      "3D Euclidean distances & spatial planes",
      "3D engine integration",
    ],
    linkText: "3D Landmark Reference",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker#models",
  },
  {
    id: "tut-08",
    level: "Advanced",
    title: "08. Holistic Multi-Modal Pipeline at 30+ FPS",
    duration: "60 mins",
    summary:
      "Combine Hand, Pose, and Face mesh simultaneously. Optimize throughput using multi-threading and asynchronous queues to prevent video capture bottlenecking.",
    keyConcepts: [
      "MediaPipe Holistic solution",
      "Multiprocessing for frame capture",
      "Decoupled inference vs rendering",
      "GPU delegate acceleration",
    ],
    linkText: "Holistic Model Guide",
    linkUrl: "https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/holistic.md",
  },
  {
    id: "tut-09",
    level: "Advanced",
    title: "09. Web-First MediaPipe with @mediapipe/tasks-vision",
    duration: "45 mins",
    summary:
      "Run vision models 100% client-side in the browser using WebAssembly and WebGL. Build a zero-backend Next.js app with zero server latency.",
    keyConcepts: [
      "Wasm & WebGL initialization",
      "HTMLVideoElement streaming",
      "requestAnimationFrame render loop",
      "Client-side Next.js integration",
    ],
    linkText: "Web JS Tasks Guide",
    linkUrl: "https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js",
  },
];

export const projectIdeas: MediaPipeProjectIdea[] = [
  {
    id: "proj-agri-01",
    title: "AgriVision: Produce Ripeness & Defect Grader",
    difficulty: "Beginner",
    category: "AgriTech & Food",
    description:
      "A real-time camera tool for farmers and food distributors that analyzes fruits and vegetables (e.g., tomatoes, apples) to estimate ripeness, size, and surface defects.",
    inputs: ["Webcam live feed", "Color space masks (HSV)", "Bounding contour extraction"],
    expectedOutput: "Real-time quality grade badge (Grade A / B / Reject) and diameter calculation",
    hackNightTip:
      "Use OpenCV HSV color range masking to detect green vs red ripeness and cv2.contourArea() to estimate produce size in millimeters.",
  },
  {
    id: "proj-agri-02",
    title: "Touchless Farm Machinery & Kitchen Hygiene Controller",
    difficulty: "Intermediate",
    category: "AgriTech & Food",
    description:
      "Designed for dirty farm sheds, greenhouses, and commercial kitchens where wet or muddy hands make touching screens or physical switches hazardous or unhygienic.",
    inputs: ["Hand Gestures (Open Palm, Closed Fist, Swipe)", "Wrist velocity"],
    expectedOutput: "Digital tare/zero weight command, recipe step advance, or emergency stop trigger",
    hackNightTip:
      "Map a prominent two-hand 'Hands Up' or 'Closed Fist' gesture as a fail-safe pause command for machinery or timed food preparation cycles.",
  },
  {
    id: "proj-01",
    title: "Air Volume & Media Knob",
    difficulty: "Beginner",
    category: "Gaming & HCI",
    description:
      "A touchless desk assistant that controls your PC's audio volume and track playback. Pinch thumb and index to adjust volume, or swipe left/right to skip tracks.",
    inputs: ["Thumb Tip (ID 4)", "Index Tip (ID 8)"],
    expectedOutput: "System volume level slider and play/pause toggle",
    hackNightTip:
      "Use pycaw on Windows or osascript on macOS to directly modify system audio levels based on the pixel distance between fingers.",
  },
  {
    id: "proj-02",
    title: "Touchless Slideshow Presenter",
    difficulty: "Beginner",
    category: "Gaming & HCI",
    description:
      "Present slide decks without a clicker or laser pointer. Wave hand right for next slide, wave left for previous slide, and hold a closed fist to black out screen.",
    inputs: ["Hand bounding box center X trajectory over 5 frames"],
    expectedOutput: "Left/Right arrow keystrokes via pyautogui",
    hackNightTip:
      "Track the velocity (dx/dt) of the wrist landmark to avoid accidental slide advances when resting your arm.",
  },
  {
    id: "proj-03",
    title: "Virtual Air Canvas & Graffiti Board",
    difficulty: "Beginner",
    category: "Creative & Audio",
    description:
      "Draw and sketch in mid-air using your webcam. Select neon colors from an on-screen menu by touching virtual buttons with your index finger.",
    inputs: ["Index Fingertip (ID 8)", "Thumb + Middle finger pinch for eraser"],
    expectedOutput: "Real-time blended painting overlay on webcam feed",
    hackNightTip:
      "Create an empty black canvas (np.zeros) matching webcam dimensions, draw lines onto it, and invert/blend it over the webcam stream with cv2.addWeighted().",
  },
  {
    id: "proj-04",
    title: "Ergonomic Posture & Slouch Guardian",
    difficulty: "Beginner",
    category: "Health & Fitness",
    description:
      "A desktop companion running in the background that tracks shoulder height and ear-to-shoulder vertical distance. Alerts you with a subtle nudge if you slouch.",
    inputs: ["Nose (ID 0)", "Left/Right Shoulder (ID 11, 12)", "Left/Right Ear (ID 7, 8)"],
    expectedOutput: "System tray alert or audible chime when posture angle deviates > 15%",
    hackNightTip:
      "Add a 10-second calibration button on startup where the user sits straight to record their baseline posture vector.",
  },
  {
    id: "proj-05",
    title: "Air Drums & Virtual Beatmaker",
    difficulty: "Intermediate",
    category: "Creative & Audio",
    description:
      "Hit virtual snare, hi-hat, and bass drums floating in 3D air! Track both hands and trigger synthesizer drum samples when fingertips enter bounding zones.",
    inputs: ["Left & Right Index/Middle Fingertips (IDs 8, 12)"],
    expectedOutput: "Instant low-latency audio playback via pygame.mixer",
    hackNightTip:
      "Preload WAV audio files using pygame.mixer.Sound for zero-latency audio playback instead of spawning shell audio processes.",
  },
  {
    id: "proj-06",
    title: "Sign Language Fingerspelling Tutor",
    difficulty: "Intermediate",
    category: "Assistive Tech",
    description:
      "Interactive educational tool that teaches the ASL fingerspelling alphabet. Compares the user's hand skeleton against standard letter poses and validates in real-time.",
    inputs: ["All 21 Hand Landmarks relative to Wrist (ID 0)"],
    expectedOutput: "Recognized letter banner, accuracy percentage score, next letter prompt",
    hackNightTip:
      "Normalize coordinates by subtracting the wrist coordinates (pt - wrist) and dividing by palm width to make recognition distance-independent.",
  },
  {
    id: "proj-07",
    title: "Invisible Gamepad for Classic Games",
    difficulty: "Intermediate",
    category: "Gaming & HCI",
    description:
      "Play web games like Subway Surfers, Flappy Bird, or Pong using full-body motion. Jump to jump, duck to roll, or steer with virtual steering wheel hands.",
    inputs: ["Pose landmarks (head height, shoulder tilt) or two-hand angle"],
    expectedOutput: "Simulated keyboard directional keys (Space, Up, Down, Left, Right)",
    hackNightTip:
      "Keep game keystroke presses brief (0.05s) to avoid sticky key repeats in browser games.",
  },
  {
    id: "proj-08",
    title: "Touchless Sterile Recipe & PDF Book Reader",
    difficulty: "Intermediate",
    category: "Assistive Tech",
    description:
      "Designed for messy kitchen cooking or laboratory workbench setups. Turn PDF cookbook pages or scroll recipes with hand swipes without dirtying the laptop.",
    inputs: ["Palm swipe gesture (horizontal displacement threshold)"],
    expectedOutput: "PageDown / PageUp or PDF scroll commands",
    hackNightTip:
      "Add visual feedback on screen (e.g. A circular progress indicator filling up) so the user knows a gesture is recognized before triggering page turn.",
  },
];

export const mentorInfo = {
  name: "Joseph Shibu",
  phone: "8590048254",
};

export const coordinatorsList = [
  {
    name: "Lakshmi Sankar M P",
    phone: "85990329593",
  },
  {
    name: "SHAD CT",
    phone: "8714985959",
  },
];
