const { createApp } = Vue

createApp({
    data() {
        return {
            digimons: [],
            loading: true,
            searchText: ''
        }
    },
    computed: {
        filteredDigimons() {
            return this.digimons.filter(digimon => digimon.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    },
    methods: {
        async fetchDigimons() {
            try {
                const response = await fetch('https://digimon-api.vercel.app/api/digimon')
                const data = await response.json()
                this.digimons = data
                this.loading = false
            } catch (err) {
                console.error('Erro ao buscar Digimons:', err)
            }
        },
        getTypeClass(level) {
            const levelClassMap = {
                "In Training": "in-training",
                "Rookie": "rookie",
                "Champion": "champion",
                "Ultimate": "ultimate",
                "Mega": "mega"
            }

            return levelClassMap[level] || ""
        }
    },
    mounted() {
        this.fetchDigimons()
    }
}).mount("#app")
