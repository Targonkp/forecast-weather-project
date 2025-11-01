<template>
  <h1>Карта {{ layerTitle }}</h1>
  <div
    class="map-wrap"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="onMouseLeave"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="onTouchCancel"
  >
    <canvas ref="canvas"></canvas>
  </div>
  <div class="map-caption">
    <span>Источник карты мира: OpenStreetMap.org</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { throttle } from "@/utils/throttle";

export default defineComponent({
  name: "Map",
  data() {
    return {
      apiKey: process.env.VUE_APP_OPENWEATHER_API_KEY as string,
      layer: "precipitation_new" as string,
      z: 3 as number, //уровень зума, оптимальный для всей Земли
      tileSize: 256 as number,
      cacheTTL: (1000 * 60 * 30) as number, //30 минут кэш
      isDragging: false as boolean,
      offsetX: 0 as number,
      offsetY: 0 as number,
      lastX: 0 as number,
      lastY: 0 as number,
      updateTimer: null as number | null,
    };
  },
  methods: {
    async renderMap(): Promise<void> {
      const { z, layer, apiKey, tileSize } = this;
      const tilesPerAxis = Math.pow(2, z); //при z=2, будет 16 тайлов, при z=3 - 64 тайла
      const canvas = this.$refs.canvas as HTMLCanvasElement | undefined;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      //Размер итогового canvas
      canvas.width = tileSize * tilesPerAxis;
      canvas.height = tileSize * tilesPerAxis;

      console.log(`Рисуем карту: z=${z}, тайлов=${tilesPerAxis ** 2}`);

      //подготовка OSM подложки
      for (let x = 0; x < tilesPerAxis; x++) {
        for (let y = 0; y < tilesPerAxis; y++) {
          const osmUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
          await this.drawTile(ctx, osmUrl, x, y);
        }
      }

      //Загрузка тайлов для слоя погоды - поверх подложки
      for (let x = 0; x < tilesPerAxis; x++) {
        for (let y = 0; y < tilesPerAxis; y++) {
          const url = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${apiKey}`;
          await this.drawTile(ctx, url, x, y);
        }
      }

      console.log("Карта готова");
    },
    async drawTile(ctx: CanvasRenderingContext2D, url: string, x: number, y: number): Promise<void> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.globalAlpha = 1;
          ctx.drawImage(img, x * this.tileSize, y * this.tileSize);
          ctx.globalAlpha = 1;
          resolve();
        };
        img.onerror = reject;
        img.src = url;
      });
    },
    startDrag(event: MouseEvent | TouchEvent) {
      this.isDragging = true;

      //проверка - тач или мышь
      const point = event instanceof TouchEvent ? event.touches[0] : event;

      this.lastX = point.clientX;
      this.lastY = point.clientY;
    },
    onDrag(event: MouseEvent | TouchEvent) {
      if (!this.isDragging) return;

      const point = event instanceof TouchEvent ? event.touches[0] : event;

      const dx = point.clientX - this.lastX;
      const dy = point.clientY - this.lastY;
      this.lastX = point.clientX;
      this.lastY = point.clientY;
      this.offsetX += dx;
      this.offsetY += dy;

      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const wrapper = canvas.parentElement as HTMLElement;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      const wrapWidth = wrapper.clientWidth;
      const wrapHeight = wrapper.clientHeight;

      //ограничение по горизонтали
      const maxOffsetX = 0;
      const minOffsetX = wrapWidth - canvasWidth;

      //ограничение по вертикали
      const maxOffsetY = 0;
      const minOffsetY = wrapHeight - canvasHeight;

      if (this.offsetX < minOffsetX) {
        this.offsetX = minOffsetX;
      } else if (this.offsetX > maxOffsetX) {
        this.offsetX = maxOffsetX;
      }

      if (this.offsetY < minOffsetY) {
        this.offsetY = minOffsetY;
      } else if (this.offsetY > maxOffsetY) {
        this.offsetY = maxOffsetY;
      }

      canvas.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    },
    endDrag() {
      this.isDragging = false;
    },
    onResize() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const wrapper = canvas.parentElement as HTMLElement;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;

      const maxOffsetX = 0;
      const minOffsetX = wrapperWidth - canvasWidth;

      const maxOffsetY = 0;
      const minOffsetY = wrapperHeight - canvasHeight;

      if (this.offsetX < minOffsetX) {
        this.offsetX = minOffsetX;
      }
      if (this.offsetX > maxOffsetX) {
        this.offsetX = maxOffsetX;
      }
      if (this.offsetY < minOffsetY) {
        this.offsetY = minOffsetY;
      }
      if (this.offsetY > maxOffsetY) {
        this.offsetY = maxOffsetY;
      }
      canvas.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    },
    onMouseLeave() {
      if (this.isDragging) {
        this.endDrag();
      }
    },
    onTouchCancel() {
      this.onMouseLeave();
    },
    startAutoUpdate() {
      if (!this.updateTimer) {
        this.updateTimer = window.setInterval(() => {
          console.log("Автоматическое обновление карты");
          this.renderMap();
        }, this.cacheTTL);
      }
    },
    stopAutoUpdate() {
      if (this.updateTimer) {
        clearInterval(this.updateTimer);
        this.updateTimer = null;
      }
    },
  },
  mounted() {
    this.renderMap();
    this.onDrag = throttle(this.onDrag, 50);
    this.startAutoUpdate();
    this.onResize = throttle(this.onResize, 50);
    window.addEventListener("resize", this.onResize);
  },
  activated() {
    window.removeEventListener("resize", this.onResize);
    this.startAutoUpdate();
  },
  deactivated() {
    window.addEventListener("resize", this.onResize);
    this.stopAutoUpdate();
  },
  computed: {
    layerTitle(): string {
      switch (this.layer) {
        case "precipitation_new":
          return "осадков";
        case "clouds_new":
          return "облаков";
        case "pressure_new":
          return "давления на уровне моря";
        case "wind_new":
          return "скорости ветра";
        case "temp_new":
          return "температуры";
        default:
          return "";
      }
    },
  },
});
</script>

<style scoped lang="scss">
.map-wrap {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 1/0.65;
  border: 2px solid #333;
  overflow: hidden;
  position: relative;
  background: #818b90;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0s;
  image-rendering: pixelated;
}

.map-caption {
  margin: 30px 0 20px 0;
  font-size: 22px;
  line-height: 110%;
}
</style>
