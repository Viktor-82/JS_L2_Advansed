Vue.component('search-el', {
    props: ['filter'],
    template: `<form action="#" class="search-form">
                <input type="text" class="search-field" v-model="filter">
                <button class="btn-search" type="submit" @click="$root.filterEl(filter)">
                    <i class="fas fa-search"></i>
                </button>
                </form>`
});