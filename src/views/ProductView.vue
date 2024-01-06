<template>
    <div class="container text-center m-auto mt-10" v-if="allProducts && allProducts.total">
        <h1 class="font-bold text-4xl">Products</h1>
        <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 mt-8">
            <thead class="bg-gray-100 dark:bg-gray-700">
                <tr>
                    <th scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        S.No.
                    </th>
                    <th scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Product Name
                    </th>
                    <th scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Category
                    </th>
                    <th scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Price
                    </th>
                    <th scope="col" class="p-4">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" v-for="(item, index) in allProducts.products"
                    :key="index">
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.id }}
                    </td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.title
                    }}</td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{{
                        item.category }}</td>
                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.price
                    }}$</td>
                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline"
                            @click="openEditModal(item)">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination v-model="page" :records="allProducts.total" :per-page="limit" @paginate="myCallback" />
        <!-- Modal -->
        <div class="fixed z-50 inset-0 overflow-y-auto" v-if="isEditModal">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity cursor-pointer">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="max-width: 630px; width: 100%">
                    <div class="modal_container">
                        <div class="modal_inner_section">
                            <h3 class="text-4xl text-center leading-6 font-bold text-gray-900" id="modal-headline">
                                Edit Modal
                            </h3>
                            <div class="mt-5">
                                <input type="text" class="w-full input_field" v-model="editModalData.title"
                                    placeholder="Title" />
                                <input type="text" class="w-full input_field" v-model="editModalData.price"
                                    placeholder="Price" />
                                <input type="text" class="w-full input_field" v-model="editModalData.category"
                                    placeholder="Category" />
                            </div>
                            <div class="edit_modal_button">
                                <button
                                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded mr-4"
                                    @click="closeModal()">
                                    Cancel
                                </button>
                                <button
                                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                                    @click="updateDetails()">
                                    Update
                                </button>
                            </div>
                        </div>
                        <div class="cross_Icon cursor-pointer" @click="closeModal()">
                            <img src="./../assets/close-icon.svg" alt="cross_Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Pagination from 'v-pagination-3';
import { useProductStore } from "../store/ProductStore"
export default {
    name: 'ProductView',
    data() {
        return {
            allProducts: [],
            page: 1,
            limit: 10,
            skip: 0,
            isEditModal: false,
            editModalData: []
        }
    },
    components: {
        Pagination
    },
    async mounted() {
        await useProductStore().fetchProducts(this.skip, this.limit);
        this.allProducts = useProductStore().allProducts;
    },
    methods: {
        closeModal() {
            this.isEditModal = false;
            this.editModalData = [];
        },
        openEditModal(data) {
            this.isEditModal = true;
            this.editModalData = {...data};
        },
        myCallback() {
            this.skip = (this.page * this.limit) - this.limit;
            this.getProducts();
        },
        updateDetails() {
            useProductStore().updateDetails(this.editModalData.id, this.editModalData.title);
        }
    }
}
</script>
<style>
.VuePagination {
    margin-top: 2rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.VuePagination li {
    margin: 0 5px;
    display: inline-block;
}

.VuePagination a {
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    background-color: #fff;
    transition: background-color 0.3s, color 0.3s;
}

.VuePagination a:hover {
    background-color: #007bff;
    color: #fff;
}

.VuePagination .active a {
    background-color: #007bff;
    color: #fff;
    cursor: default;
}

.VuePagination .disabled a {
    pointer-events: none;
    opacity: 0.6;
    cursor: not-allowed;
}

.modal_container {
    padding: 45px 0 45px 40px;
    position: relative;
}

.modal_container .modal_inner_section {
    background: #fff;
    padding-right: 30px;
}

.cross_Icon {
    position: absolute;
    top: 15px;
    right: 25px;
}

.cross_Icon img {
    width: 15px;
    height: 15px;
    object-fit: contain;
    margin: 0 !important;
    cursor: pointer;
}

.input_field {
    border: 1px solid gray;
    padding: 8px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.edit_modal_button {
    display: flex;
    justify-content: flex-end;
}</style>