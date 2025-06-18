<template>
    <section class="text-white mt-20" id="services">
        <div class="px-4 xl:pl-16">
            <h2 class="text-4xl font-bold text-white mb-4">{{ sectionTitle }}</h2>
        </div>
        <div
            class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
            <div v-for="service in services" :key="service.id" data-aos="fade-up"
                class="px-8 py-12 rounded-xl bg-[#111a3e] shadow-lg border border-[#1f1641]">
                <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div>
                        <img :src="service.icon" alt="service icon">
                    </div>
                </div>
                <div class="text-center">
                    <h3
                        class="pt-8 text-lg font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary lg:text-xl">
                        {{ service.name }}
                    </h3>
                    <p class="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                        {{ service.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
    language: {
        type: String,
        default: 'es'
    }
});

const serviceItems = {
    es: [
        {
            id: 1,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/google-code.png',
            name: 'Desarrollo Backend',
            description: 'Creación de sistemas robustos, escalables y seguros para la gestión eficiente de datos y funcionalidades en el servidor, utilizando tecnologías como Laravel.'
        },
        {
            id: 2,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/windows10-personalization.png',
            name: 'Desarrollo Frontend',
            description: 'Construcción de interfaces de usuario dinámicas y atractivas que maximizan la experiencia de los usuarios.'
        },
        {
            id: 3,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/phonelink-setup.png',
            name: 'Desarrollo Responsive',
            description: 'Diseño y desarrollo de interfaces adaptativas que ofrecen una experiencia óptima en cualquier dispositivo.'
        },
        {
            id: 4,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/email-open.png',
            name: 'Implementacion de colas de trabajo',
            description: 'Automatización de tareas en segundo plano mediante colas de trabajo para mejorar la eficiencia y el rendimiento.'
        },
        {
            id: 5,
            icon: 'https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/fffeee/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png',
            name: 'Administracion de servidores',
            description: 'Configuración, optimización y gestión de servidores para garantizar el rendimiento y la seguridad de tus aplicaciones.'
        },
        {
            id: 6,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/web-design.png',
            name: 'Planificacion de proyectos',
            description: 'Organización estratégica y estructurada de tus proyectos para asegurar su éxito y cumplimiento de objetivos.'
        },
    ],
    en: [
        {
            id: 1,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/google-code.png',
            name: 'Backend Development',
            description: 'Creation of robust, scalable, and secure systems to efficiently manage data and server-side functionalities using technologies like Laravel.'
        },
        {
            id: 2,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/windows10-personalization.png',
            name: 'Frontend Development',
            description: 'Building dynamic and engaging user interfaces to maximize user experience.'
        },
        {
            id: 3,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/phonelink-setup.png',
            name: 'Responsive Development',
            description: 'Design and development of adaptive interfaces that provide an optimal experience on any device.'
        },
        {
            id: 4,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/email-open.png',
            name: 'Job Queue Implementation',
            description: 'Automation of background tasks using job queues to improve efficiency and performance.'
        },
        {
            id: 5,
            icon: 'https://img.icons8.com/external-vectorslab-glyph-vectorslab/100/fffeee/external-Technical-Writing-mobile-app-development-vectorslab-glyph-vectorslab.png',
            name: 'Server Administration',
            description: 'Configuration, optimization, and management of servers to ensure the performance and security of your applications.'
        },
        {
            id: 6,
            icon: 'https://img.icons8.com/ios-filled/100/ffffff/web-design.png',
            name: 'Project Planning',
            description: 'Strategic and structured organization of your projects to ensure their success and achievement of goals.'
        },
    ],
};

const sectionTitles = {
    es: "Mis Servicios",
    en: "My Services"
};

const services = computed(() => serviceItems[props.language]);
const sectionTitle = computed(() => sectionTitles[props.language]);
</script>