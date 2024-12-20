<template>
	<div class="bg-[#111827] min-h-screen">
    <template v-show="isAppLoaded">
      <div>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ExperienceAndSkills />
        <LatestProjectsSection />
        <ContactSection />
        <!-- <TestimonialsSection /> -->
        <Footer />
        <BackToTop />
      </div>
    </template>

    <template v-if="!isAppLoaded">
      <div class="flex items-center justify-center h-screen">
        <loadingSpinner />
      </div>
    </template>

	</div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted  } from "vue";

//Import Components Asynchronously
const Navbar = defineAsyncComponent(() => import("@/components/NavBar.vue"));

const isAppLoaded = ref(false);

onMounted(() => {
  isAppLoaded.value = true;
});

</script>
<style>
*{
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
