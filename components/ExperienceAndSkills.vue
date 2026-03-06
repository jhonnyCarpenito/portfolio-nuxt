<template>
    <section class="text-white mt-18" id="skills">
        <div class="absolute right-0 top-[110rem] h-full w-full justify-end">
            <span class="flex opacity-20">
                <span class="w-16 h-32 rounded-l-full flex bg-primary blur-2xl"></span>
                <span class="w-16 h-32 rounded-r-full flex bg-[#f88fc2] blur-2xl mt-14"></span>
            </span>
        </div>
        <div class="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 xl:px-16">
            <div class="mt-4 md:mt-0 text-left flex flex-col z-10 h-full w-[80%]">
                <h2 class="text-4xl font-bold text-white text-left mb-4">{{ content.mySkills }}</h2>
                <div class="mt-8" v-for="skill in Skills" :key="skill.id">
                    <div class="flex items-end justify-between" data-aos="fade-right">
                        <h4 class="font-semibold uppercase text-white">
                            {{ skill.name }}
                        </h4>
                        <h3 class="text-2xl font-bold text-white">{{ skill.width }}</h3>
                    </div>
                    <div class="mt-2 h-1 w-full bg-[#131d30] rounded-full">
                        <div class="h-1 rounded-full bg-primary" :style="`width :${skill.width}`"></div>
                    </div>
                </div>
            </div>
            <div data-aos="flip-left">
                <h2 class="text-4xl font-bold text-white text-left mb-8 md:text-center md:mt-0 mt-8">{{ content.myExperiences }}</h2>
                <div class="space-y-8 py-8" data-aos="fade-left">
                    <div v-for="element in content.Experinces" :key="element.id"
                    class="flex  items-center rounded-xl p-4 bg-[#111a3e] shadow-lg border border-[#1f1641]"
                    >
                    <div class="w-1/4">
                        <img src="https://img.icons8.com/ios-filled/100/ffffff/lawyer.png" alt="lawyer">
                    </div>
                    <div class="w-3/4 pl-4">
                        <h3 class="text-2xl font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {{ element.role }}
                        </h3>
                        <p class="text-white">{{ element.company }}</p>
                        <p class="text-white">{{ element.date }}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue';

import { defineProps } from 'vue';

const props = defineProps({
    language: {
        type: String,
        default: 'es'
    }
});

const contentItems = {
    es: {
        mySkills: 'Mis Habilidades',
        myExperiences: 'Mis Experiencias',
        Experinces: [
            {
                id: 1,
                role: 'Desarrollador Full Stack',
                company: 'Lunave - Mexico',
                date: 'Enero 2025 - Enero 2026'
            },
            {
                id: 1,
                role: 'Desarrollador Full Stack',
                company: 'Ubbitt - Mexico',
                date: 'Julio 2024 - Septiembre 2024'
            },
            {
                id: 2,
                role: 'Desarrollador Frontend',
                company: 'Meat Group -  Chile',
                date: 'Agosto 2023 - Julio 2024'
            },
            {
                id: 3,
                role: 'Desarrollador Full Stack',
                company: 'Grupo Hostienda - España',
                date: 'Julio 2022 - Agosto 2023'
            },
            {
                id: 4,
                role: 'Coordinador de sistemas',
                company: 'Guayana Customs Brokers - Venezuela',
                date: 'Julio 2016 - Julio 2022'
            }
        ]
    },
    en: {
        mySkills: 'My Skills',
        myExperiences: 'My Experiences',
        Experinces: [
            {
                id: 1,
                role: 'Full Stack Developer',
                company: 'Lunave - Mexico',
                date: 'January 2025 - Present'
            },
            {
                id: 2,
                role: 'Full Stack Developer',
                company: 'Ubbitt - Mexico',
                date: 'July 2024 - September 2024'
            },
            {
                id: 3,
                role: 'Frontend Developer',
                company: 'Meat Group - Chile',
                date: 'August 2023 - July 2024'
            },
            {
                id: 4,
                role: 'Full Stack Developer',
                company: 'Grupo Hostienda - Spain',
                date: 'July 2022 - August 2023'
            },
            {
                id: 5,
                role: 'Systems Coordinator',
                company: 'Guayana Customs Brokers - Venezuela',
                date: 'July 2016 - July 2022'
            }
        ]
    }
};

const content = ref(contentItems[props.language]);

const Skills = ref([
    {
        id:1,
        name:'HTmL & CSS',
        width:'90%'
    },
    {
        id:2,
        name:'Sass',
        width:'90%'
    },
    {
        id:3,
        name:'JavaScript',
        width:'90%'
    },
    {
        id:4,
        name:'Vue.js',
        width:'96%'
    },
    {
        id:5,
        name:'Laravel',
        width:'98%'
    },
    {
        id:7,
        name:'Docker',
        width:'97%'
    },
    {
        id:8,
        name:'TDD',
        width:'91%'
    },
    {
        id:9,
        name:'S.O.L.I.D',
        width:'91%'
    },
    
]);
</script>