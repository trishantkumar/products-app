<template>
    <div class="container text-center m-auto mt-10">
        <h1 class="font-bold text-4xl">Products</h1>
        <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 mt-8">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        S.No.
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Product Name
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Category
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Price
                    </th>
                    <th scope="col" class="p-4">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" v-for="(item, index) in allProducts.products" :key="index">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ index + 1 }}</td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.title }}</td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{{ item.category }}</td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.price }}$</td>
                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'ProductView',
    data() {
        return {
            allProducts: []
        }
    },
    async mounted() {
        await this.getProducts();
    },
    methods: {
        getProducts() {
            axios.get('https://dummyjson.com/products')
            .then(res => {
                this.allProducts = res.data;
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>