<template>
    <section class="text-white mt-20" id="projects">
        <div class="px-4 xl:pl-16">
            <div class="mb-4 md:flex md:justify-between xl:pr-16">
                <h2 class="text-4xl font-bold text-white"> My Latest Projects</h2>
                <div class="flex space-x-4 mb-4 mt-5 md:mt-0">
                    <button class="hover:text-primary" v-for="category in ['all', 'Backend', 'Frontend']"
                        :key="category" @click="() => selectedCategory = category">
                        {{ category }}
                    </button>
                </div>
            </div>
            <ul class="px-4 sm:py-16 xl:pr-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
                data-aos="fade-right">
                <div v-for="project in filteredProjects" :key="project.id">
                    <div class="h-52 md:h-[24rem] rounded-t-xl relative group overflow-hidden bg-[#111a3e]">
                        <div
                            v-if="!isLoaded(project.id)"
                            class="absolute inset-0 z-10 flex items-center justify-center bg-black/30"
                            aria-label="Cargando miniatura"
                        >
                            <div class="h-10 w-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                        </div>
                        <img
                            :src="project.image || placeholderSvg"
                            :alt="'Preview: ' + project.title"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            @load="markLoaded(project.id)"
                            @error="(e) => onImgError(project.id, e)"
                        />
                        <div class="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0
                                    hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
                            <a class="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                :href="project.gitURL" target="_blank" aria-label="Ver repositorio en GitLab">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"
                                    class="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5">
                                    </path>
                                </svg>
                            </a>
                            <a class="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
                                :href="project.webURL" target="_blank" aria-label="Ver sitio en vivo">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                                    data-slot="icon"
                                    class="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer group-hover/link:text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z">
                                    </path>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="text-white rounded-b-xl mt-3 bg-[#111a3e] shadow-lg border border-[#1f1641] py-6 px-4">
                        <h3 class="text-lg font-semibold uppercase lg:text-xl"> {{ project.title }}</h3>
                        <p class="text-[#ADB7BE]">{{ project.description }}</p>
                        <div class="flex flex-wrap p-2.5">
                            <div v-for="technology in project.technologies" :key="technology"
                                class="text-center ml-1 mt-1 rounded-3xl bg-[#111827]"
                                style="box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); border: 1px solid #111827;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
                                <p class="px-1 py-2">{{ technology }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </section>
</template>
<script setup>
import { ref, computed, watch } from 'vue';

import apiRestLaravel from '@/assets/api-rest-laravel.png'

/** SVG con gradiente + título: fallback cuando no hay imagen o falla la carga */
function projectCoverSvg(title) {
    const colors = ['#1e3a5f', '#2d1b4e', '#1a3d2e', '#3d2a1a', '#2e1a3d', '#1a2e3d']
    const idx = Math.abs([...title].reduce((a, _, i) => a + (title.codePointAt(i) ?? 0), 0)) % colors.length
    const fill = colors[idx]
    const safeTitle = title.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${fill}"/><stop offset="100%" style="stop-color:#0f172a"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="50%" y="50%" fill="rgba(255,255,255,0.9)" font-size="28" font-weight="600" text-anchor="middle" dy=".35em" font-family="system-ui,sans-serif">${safeTitle}</text></svg>`
    return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

const placeholderSvg = projectCoverSvg('Preview')

function screenshotPreviewUrl(webUrl) {
    return `/api/screenshot?url=${encodeURIComponent(webUrl)}`
}

const loadedById = ref({})
const lastImageById = ref({})

function markLoaded(id) {
    loadedById.value[id] = true
}

function isLoaded(id) {
    return loadedById.value[id] === true
}

function onImgError(id, e) {
    // fallback + evitar spinner infinito
    e.target.src = placeholderSvg
    markLoaded(id)
}

const Projects = ref([
    {
        id: 1,
        category: 'Backend',
        image: apiRestLaravel || projectCoverSvg('CRUD API REST'),
        title: 'CRUD API REST',
        description: 'Este proyecto es una API desarrollada con Laravel 11, diseñada como un CRUD (Create, Read, Update, Delete) que permite realizar operaciones básicas sobre recursos.',
        technologies: ['Laravel', 'Sail', 'Scribe'],
        gitURL: 'https://gitlab.com/Carpenito/laravel-11-crud-api',
        webURL: 'https://laravel-11-crud-api.apps.jhonnycarpenito.com'
    },
    {
        id: 2,
        category: 'Frontend',
        image: screenshotPreviewUrl('https://delivery-app-blue-one.vercel.app/'),
        title: 'App Delivery',
        description: 'Landing estática para una app de delivery de comida. Diseño responsive con búsqueda de restaurantes, pasos de uso, testimoniales y enlaces a App Store y Google Play.',
        technologies: ['HTML5', 'SASS/SCSS', 'Gulp', 'PostCSS', 'Vercel'],
        gitURL: 'https://gitlab.com/Carpenito/delivery-app',
        webURL: 'https://delivery-app-blue-one.vercel.app/'
    },
    {
        id: 3,
        category: 'Frontend',
        image: screenshotPreviewUrl('https://podcast-app-tan.vercel.app/'),
        title: 'Podcast App',
        description: 'Landing para una plataforma de podcasts. Incluye hero, beneficios, estadísticas, planes de precios y testimoniales. Desplegado en Vercel.',
        technologies: ['HTML5', 'SASS/SCSS', 'Gulp', 'PostCSS', 'CSS Grid', 'Vercel'],
        gitURL: 'https://gitlab.com/Carpenito/podcast-app',
        webURL: 'https://podcast-app-tan.vercel.app/'
    },
    {
        id: 4,
        category: 'Frontend',
        image: screenshotPreviewUrl('https://cafeteria-sepia-eight.vercel.app/'),
        title: 'Cafetería',
        description: 'Sitio web estático de cafetería. Maquetación con SASS, Gulp y optimización de imágenes (WebP, AVIF). Desplegado en Vercel.',
        technologies: ['HTML5', 'SASS/SCSS', 'Gulp', 'PostCSS', 'Vercel'],
        gitURL: 'https://gitlab.com/Carpenito/cafeteria',
        webURL: 'https://cafeteria-sepia-eight.vercel.app/'
    },
    {
        id: 5,
        category: 'Frontend',
        image: screenshotPreviewUrl('https://nucleus-app-eight.vercel.app/'),
        title: 'Nucleus App',
        description: 'Landing estática. Estructura HTML/CSS desplegada en Vercel.',
        technologies: ['HTML5', 'CSS3', 'Vercel'],
        gitURL: 'https://gitlab.com/Carpenito/nucleus-app',
        webURL: 'https://nucleus-app-eight.vercel.app/'
    },
    {
        id: 6,
        category: 'Frontend',
        image: screenshotPreviewUrl('https://audifonos-landing.vercel.app/'),
        title: 'Audífonos Landing',
        description: 'Landing de producto (audífonos). Maquetación con HTML, CSS y JavaScript. Desplegado en Vercel.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
        gitURL: 'https://gitlab.com/Carpenito/audifonos-landing',
        webURL: 'https://audifonos-landing.vercel.app/'
    }
]);

const selectedCategory = ref('all');
const filteredProjects = computed(() => {
    if (selectedCategory.value === 'all') {
        return Projects.value;
    }
    return Projects.value.filter(project => project.category.toLocaleLowerCase() === selectedCategory.value.toLocaleLowerCase());
})

watch(
    () => filteredProjects.value.map((p) => ({ id: p.id, image: p.image })),
    (list) => {
        // Resetear loading solo si cambia el src (o si es un id nuevo).
        for (const item of list) {
            const prev = lastImageById.value[item.id]
            if (prev === undefined || prev !== item.image) {
                loadedById.value[item.id] = false
                lastImageById.value[item.id] = item.image
            }
        }
    },
    { immediate: true }
)

</script>