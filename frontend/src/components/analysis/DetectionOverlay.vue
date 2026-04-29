<template>
  <div class="detection-overlay" ref="container">
    <div class="image-wrapper">
      <img 
        ref="imageRef"
        :src="imageUrl" 
        @load="handleImageLoad"
        alt="Analysis Sample"
        class="base-image"
      />
      
      <!-- SVG Layer for Bounding Boxes -->
      <svg 
        v-if="imageLoaded"
        class="overlay-svg"
        :viewBox="`0 0 ${naturalWidth} ${naturalHeight}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <g v-for="(det, index) in detections" :key="index">
          <rect 
            v-if="det.bbox"
            :x="det.bbox[0]"
            :y="det.bbox[1]"
            :width="det.bbox[2] - det.bbox[0]"
            :height="det.bbox[3] - det.bbox[1]"
            class="bbox-rect"
            :class="'bbox-rect--' + (det.type || 'neutral')"
          />
          <text 
            v-if="det.bbox"
            :x="det.bbox[0]"
            :y="det.bbox[1] - 5"
            class="bbox-label"
            :class="'bbox-label--' + (det.type || 'neutral')"
          >
            {{ det.label }} {{ Math.round(det.confidence * 100) }}%
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  detections: {
    type: Array,
    default: () => []
  }
})

const imageRef = ref(null)
const imageLoaded = ref(false)
const naturalWidth = ref(0)
const naturalHeight = ref(0)

const handleImageLoad = () => {
  if (imageRef.value) {
    naturalWidth.value = imageRef.value.naturalWidth
    naturalHeight.value = imageRef.value.naturalHeight
    imageLoaded.value = true
  }
}
</script>

<style scoped>
.detection-overlay {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.image-wrapper {
  position: relative;
  width: 100%;
  display: flex;
}

.base-image {
  width: 100%;
  height: auto;
  display: block;
}

.overlay-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Bounding Box Base */
.bbox-rect {
  fill: transparent;
  stroke-width: 3;
}

/* Negative (Bad) - Red */
.bbox-rect--negative {
  fill: rgba(239, 68, 68, 0.1);
  stroke: #ef4444;
}
.bbox-label--negative {
  fill: #fff;
  stroke: #ef4444;
}

/* Positive (Good) - Green */
.bbox-rect--positive {
  fill: rgba(34, 197, 94, 0.1);
  stroke: #22c55e;
}
.bbox-label--positive {
  fill: #fff;
  stroke: #22c55e;
}

/* Neutral - Gray/Blue */
.bbox-rect--neutral {
  fill: rgba(59, 130, 246, 0.1);
  stroke: #3b82f6;
}
.bbox-label--neutral {
  fill: #fff;
  stroke: #3b82f6;
}

.bbox-label {
  font-size: 14px;
  font-weight: bold;
  paint-order: stroke;
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
