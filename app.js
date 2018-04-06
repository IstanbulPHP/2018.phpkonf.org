var dataURL = 'data.json';

var App = new Vue({
    el: '#app',
    data: {
        speakers: [],
        schedule: []
    },
    mounted() {
        axios.get(
           dataURL
        ).then(
            response => {
                this.speakers = response.data;
            }
        );
    },
    methods: {
        sessions: function() {
            for (i = 0; i < this.speakers; i++) {
                for (j = 0; j < this.speakers[i].schedule; j++) {
                    this.schedule.push(this.speakers[i].schedule[j]);
                }
            }

            return this.schedule;
        },
    },
    computed: {
        randomList: function (rand) {
            return rand.sort(function () {
                return 0.5 - Math.random()
            });
        }
    }
});
