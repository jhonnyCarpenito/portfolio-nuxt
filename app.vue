<template>
	<div class="bg-[#111827] min-h-screen">
		<!-- Wrap components in Suspense to handle loading -->
		<Suspense>
			<template #default>
				<!-- Wrap all Components inside a single root element -->
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
			<template #fallback>
				<div class="flex justify-center items-center min-h-screen">
					<loadingSpinner />
				</div>
			</template>
		</Suspense>
	</div>
</template>

<style>
*{
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>
