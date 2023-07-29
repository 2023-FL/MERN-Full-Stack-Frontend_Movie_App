<template>
  <div class="background-slideshow">
    <img :src="currentImage" alt="Slideshow Image" class="slideshow-image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('@/assets/movie_poster1.jpg'),
        require('@/assets/movie_poster2.jpg'),
        require('@/assets/movie_poster3.jpg'),
        require('@/assets/movie_poster4.jpg'),
        require('@/assets/movie_poster5.jpg'),
        require('@/assets/movie_poster6.jpg'),
        require('@/assets/movie_poster7.jpg'),
        require('@/assets/movie_poster8.jpg'),
      ],
      currentImageIndex: 0,
      animationInterval: null
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeUnmount() {
    this.stopSlideshow();
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  methods: {
    startSlideshow() {
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);
    },
    stopSlideshow() {
      clearInterval(this.animationInterval);
    }
  }
};
</script>

<style>
.background-slideshow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slideshow-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slideAnimation 10s infinite;
}

@keyframes slideAnimation {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  /* Adjust the percentage and animation properties as needed */
}
</style>
