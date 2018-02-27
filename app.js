var dataURL = 'http://2018.test/data.json';

var App = new Vue({
    el: '#speakers',
    data: {
        speakers: []
    },
    mounted() {
        var self = this;

        $.getJSON(dataURL, function (data) {
            self.speakers = data;
        });
    },
    methods: {
        randomList: function (rand) {
            return rand.sort(function () {
                return 0.5 - Math.random()
            });
        }
    }
});
