import Name from '@/components/Name.vue';

export default {
    components: {

    },
    proxyTable: {
        '/api': {
            target: 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http',//此处可以换成自己需要的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    },
};