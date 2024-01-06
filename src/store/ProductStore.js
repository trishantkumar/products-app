import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore('product', {
  state: () => {
    return {
        allProducts: [],
    }
  },
  actions: {
    async fetchProducts(skip, limit) {
        try {
            const data = await axios.get('https://dummyjson.com/products?skip=' + skip + '&limit=' + limit)
            this.allProducts = data.data;
        } catch(e) {
            alert(e)
        }
    },
    updateDetails(id, title) {
        axios.put('https://dummyjson.com/products/' + id,
            {
                title: title
            },
            {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
  }  
})