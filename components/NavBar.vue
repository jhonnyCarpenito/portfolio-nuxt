<template>
    <header class="header relative z-20">
        
        <div class="header-container flex justify-between items-center p-6 bg-opacity-50">
            <!-- <div class="text-white text-3xl font-bold">LOGO</div> -->
            <div>
               <img class="logo w-[100px] md:w-[130px]" src="../assets/carpenito_code_logo.png" alt="logo" width="130" height="130"/>
            </div>

            <!-- Mobile Toggle Button-->
            <div class="md:hidden z-30">
                <button type="button" 
                        class="block focus:outline-none"
                        @click="isMenuOpen = !isMenuOpen">
                    <span v-if="isMenuOpen" class="text-5xl">
                        <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50" height="50"/>
                    </span>
                    <span v-else class="text-5xl">
                        <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50"/>
                    </span>
                </button>
            </div>

            <!-- Navbar Link -->
            <nav
                :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-trasparent md:flex md:justify-between md:flex-row',
                isMenuOpen ? 'block' : 'hidden']">
                <ul class="links-container flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                    <li class="link" v-for="item in Menu" :key="item.name">
                        <a :href="item.href" 
                            class="nav-link block text-white transition hover:text-primary ease-linear text-2xl md:text-lg"
                            @click="scrollToSection(item.href)">
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

    </header>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { defineProps } from "vue";
import Headroom from "headroom.js";


const props = defineProps({
    language: {
        type: String,
        default: 'es'
    }
});

const menuItems = {
    es: [
        { name: "Servicios", href: "#services" },
        { name: "Sobre Mí", href: "#about" },
        { name: "Habilidades", href: "#skills" },
        { name: "Proyectos", href: "#projects" },
        //{ name: "Testimonios", href: "#testimonials" },
        { name: "Contacto", href: "#contact" },
    ],
    en: [
        { name: "Services", href: "#services" },
        { name: "About Me", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        //{ name: "Testimonials", href: "#testimonials" },
        { name: "Contact", href: "#contact" },
    ]
};

const Menu = computed(() => menuItems[props.language]);

const isMenuOpen = ref(false);
const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
};

onMounted(() => {
    if (window.innerWidth >= 768) {
        let myElement = document.querySelector(".header");
        let headroom = new Headroom(myElement);
        headroom.init();
    }
});
</script>
<style lang="scss" scoped >
    .nav-link{
        position: relative;
        &:after {
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 0;
            height: 1px;
            background-color: #f59e0b;
            content: '';
            transition: all .3s ease;
        }
        &:hover, &.active {
            &:after {
                width: 100%;
            }
        }
    }

    .logo{
        scale: 1;
        transition: all 0.3s ease;
    }

    .links-container{
        transition: all 0.3s ease;
    }

    .link{
        scale: 1;
        transition: all 0.4s ease;
    }

    .headroom {
        transition: transform 0.3s linear, background-color 0.3s ease;
    }
    
    .headroom--pinned {
        transform: translateY(-20%);
    }

    .headroom--unpinned {
        transform: translateY(-100%);
    }

    .headroom--not-top{
        position: fixed;
        width: 100%;
        background: black;
        opacity: 0.9;
        z-index: 30;

        height: 105px;

        .logo{
            scale: 0.8;
        }

        .links-container{
            background-color: black;

            .link{
                scale: 0.9;
            }
        }
    }

    .headroom--top{
        position: relative;
        background: transparent;
        transform: translateY(0);
        opacity: 1;

        .logo{
            scale: 1;
        }

        .links-container{
            background-color: transparent;

            .link{
                scale: 1;
            }
        }
    }
    


</style>