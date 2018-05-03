var dataURL = 'data.json';

var App = new Vue({
    el: '#app',
    data: {
        days: [
            {
                dayNumber: 1,
                date: '20/05/2018',
                isSelected: true,
                tracks: [
                    { trackNumber: 1, isSelected: true },
                    { trackNumber: 2, isSelected: false },
                ],
            },
            {
                dayNumber: 2,
                date: '21/05/2018',
                isSelected: false,
                tracks: [
                    { trackNumber: 1, isSelected: true },
                    { trackNumber: 2, isSelected: false },
                ],
            },
        ],
        speakers: [],
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
        getSchedule: function (day, track) {
            const schedules = [];

            const speakersWithSessions = this.speakers.filter(x => x.sessions.find(y => y.day === day && y.track === track) !== undefined);

            for (const speakerWithSessions of speakersWithSessions) {
                for (const session of speakerWithSessions.sessions) {
                    if (session.day !== day || session.track !== track) {
                        continue;
                    }

                    const schedule = {
                        sessionNumber: session.session,
                        time: session.time,
                        language: session.language,
                        title: session.title,
                        description: session.description,
                        speaker: speakerWithSessions.name,
                    };

                    schedules.push(schedule);
                }
            }

            schedules.sort((a, b) => a.sessionNumber - b.sessionNumber);

            return schedules;
        },
        getRandomSpeakers: function() {
            return _.sampleSize(this.speakers, 6);
        }
    }
});
