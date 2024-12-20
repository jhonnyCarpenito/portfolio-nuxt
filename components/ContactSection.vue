<template>
    <section class="text-white mt-20" id="contact">
        <h2 class="text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16">{{ texts.title }}</h2>
        <div class="grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8" data-aos="zoom-in-up">
            <div>
                <p class="text-[#adb7be]">
                    {{ texts.connectText }}
                </p>
                <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
                    <div class="flex mb-10 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 50px;height: 46px; display: flex;justify-content: center; border-radius: 50%;
                        overflow: hidden;border: 1px solid#111a3e;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
                            <img src="https://img.icons8.com/metro/50/ffffff/new-post.png" alt="new-post" class="w-6">
                        </div>
                        <div class="ml-5 text-white">
                            <h4>{{ texts.email }}</h4>
                            <p>{{ contactMethods.email }}</p>
                        </div>
                    </div>
                    <div class="flex mb-10 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 46px;height: 44px; display: flex;justify-content: center; border-radius: 50%;
                        overflow: hidden;border: 1px solid#111a3e;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp.png" alt="phone" class="w-6">
                        </div>
                        <div class="ml-5 text-white">
                            <h4>{{ texts.phone }}</h4>
                            <p>{{ contactMethods.phone }}</p>
                        </div>
                    </div>
                    <div class="flex mb-10 items-center">
                        <div class="p-2"
                            style="background: #111a3e; width: 50px;height: 46px; display: flex;justify-content: center; border-radius: 50%;
                        overflow: hidden;border: 1px solid#111a3e;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="linkedin"
                                class="w-6">
                        </div>
                        <div class="ml-5 text-white">
                            <h4>{{ texts.linkedin }}</h4>
                            <p>{{ contactMethods.linkedin }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
            style="background: #111a3e; width: 100%;height: 100%; border-radius: 20px;
            overflow: hidden;border: 1px solid #111a3e;backdrop-filter: blur(9px);-webkit-backdrop-filter: blur(9px);">
            <form class="flex flex-col p-2" data-aos="zoom-in-up" @submit="sendEmail">
                <div class="mb-6">
                    <label for="email" class="text-white block mb-2 text-sm font-medium">{{ texts.email }}</label>
                    <input
                        type="email"
                        id="email" 
                        class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                        placeholder="email@gmail.com" 
                        name="email"
                        v-model="form.email">
                </div>
                <div class="mb-6">
                    <label for="subject" class="text-white block mb-2 text-sm font-medium">{{ texts.subject }}</label>
                    <input 
                        type="subject" 
                        id="subject" 
                        class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                        placeholder="subject" 
                        name="subject"
                        v-model="form.subject">
                </div>
                <div class="mb-6">
                    <label for="message" class="text-white block mb-2 text-sm font-medium">{{ texts.message }}</label>
                    <textarea 
                        id="Message" 
                        class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Let's talk about ... " 
                        name="Message"
                        v-model="form.message">
                    </textarea>
                </div>
                <button type="submit" class="z-1 w-[100%!important] px-6 md:px-7 py-3 rounded-full sm:w-max flex justify-center text-white bg-primary border-2 border-transparent">
                    {{ texts.sendMessage }}
                </button>
            </form>
        </div>
        <div class="bg-gradient-to-tr opacity-25 from-[#570cac] to-primary blur-2xl h-20 w-80 z-0 absolute -top-1/2 -left-4 transform -translate-x-2/3 
        -translate-1/2
        "></div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const props = defineProps({
    language: {
        type: String,
        default: 'es'
    }
});

const texts = computed(() => ({
    es: {
        title: "Conectemos",
        connectText: "Si tienes un proyecto en mente, alguna consulta o simplemente deseas ponerte en contacto, estaré encantado de escucharte. Puedes usar cualquiera de los métodos de contacto disponibles o completar el formulario, y me pondré en contacto contigo a la brevedad.",
        email: "Correo Electrónico",
        phone: "Teléfono",
        linkedin: "LinkedIn",
        subject: "Asunto",
        message: "Mensaje",
        sendMessage: "Enviar Mensaje"
    },
    en: {
        title: "Let's Connect",
        connectText: "If you have a project in mind, a question, or simply want to get in touch, I’d be happy to hear from you. You can use any of the available contact methods or fill out the form, and I will get back to you as soon as possible.",
        email: "Email",
        phone: "Phone",
        linkedin: "LinkedIn",
        subject: "Subject",
        message: "Message",
        sendMessage: "Send Message"
    }
}[props.language]));

const contactMethods = {
    email: "jhonnycarpenito@gmail.com",
    phone: "+58 412 878 43 92",
    linkedin: "https://www.linkedin.com/in/jhonny-carpenito/"
};

const form = ref({
    email: '',
    subject: '',
    message: ''
});

const SERVICE_ID = import.meta.env.VITE_APP_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY;

const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: '¡Tu mensaje se ha enviado exitosamente!'
            });
        }, (error) => {
            console.log(error.text);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Fallo al enviar el mensaje, por favor intenta de nuevo.'
            });
        });
};
</script>