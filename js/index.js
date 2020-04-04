const vm = new Vue({
    el: "#app",
    data: {
        show: false,
        isLeft: false,
        isRight: true,
        timer: null,
        pickTime: null,
        totalTime: null,
        resolution: null,
        resetButton: false,
        isPast: false,
        timerTitle: '予定開始時刻まであと...',
        timerTitleClass: 'timerTitle',
        sound1: new Howl({
            src: ['sound/1.mp3'],
            html5: true,
            onplayerror: function() {
                sound.once('unlock', function() {
                    this.sound1.play();
                });
            },
            autoplay: false,
            loop: false,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        }),
        isPlaySound1: false,
        sound2: new Howl({
            src: ['sound/2.wav'],
            html5: true,
            onplayerror: function() {
                sound.once('unlock', function() {
                    this.sound2.play();
                });
            },
            autoplay: false,
            loop: false,
            volume: 0.5,
            onend: function() {
                console.log('Finished!');
            }
        }),
        isPlaySound2: false,
        sound3: new Howl({
            src: ['sound/3.wav'],
            html5: true,
            onplayerror: function() {
                sound.once('unlock', function() {
                    this.sound3.play();
                });
            },
            autoplay: false,
            loop: true,
            volume: 1,
            onend: function() {
                console.log('Finished!');
            }
        }),
        isPlaySound3: false
    },
    methods: {
        rotate_left: function() {
            this.isLeft = true;
            this.isRight = false;
        },
        rotate_right: function() {
            this.isLeft = false;
            this.isRight = true;
        },
        threeMin: function() {
            this.pickTime = 3000;
            this.totalTime = this.pickTime;
            this.resolution = 100;
        },
        fiveMin: function() {
            this.pickTime = 5 * 60 * 1000;
            this.totalTime = this.pickTime;
            this.resolution = 100;
        },
        startTimer: function() {
            this.timer = setInterval(() => this.countdown(), this.resolution);
            this.resetButton = true;
            console.log("てすと")
            console.log(this.isPlaySound1)
            if (this.isPlaySound1 === false) {
                this.sound1.play();
                this.isPlaySound1 = true
            }
        },
        stopTimer: function() {
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = true;
        },
        pushBackButton: function() {
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = true;
            this.totalTime = this.pickTime;
            this.isPast = false;
            this.timerTitle = "予定開始時刻まであと...";
            this.isPlaySound1 = false;
            this.isPlaySound2 = false;
            this.isPlaySound3 = false;
            this.sound3.stop();
        },
        resetTimer: function() {
            // this.totalTime = this.pickTime;
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = false;
        },
        padTime: function(time) {
            return (time < 10 ? "0" : "") + time;
        },
        countdown: function() {
            // 指定時間内に始められた時 
            if (this.totalTime > 1 && this.timer != null && this.isPast == false) {
                this.totalTime = this.totalTime - this.resolution;
            } else if (this.totalTime > -5000 && this.totalTime <= 1) {
                this.isPast = true;
                // 指定時間内を1分以上過ぎた時
                this.totalTime = this.totalTime - this.resolution;
                this.timerTitle = "予定時間が過ぎています...."

            } else if (this.totalTime > -10000 && this.totalTime <= -5000) {
                this.isPast = true;
                // 指定時間内を1分以上過ぎた時
                this.totalTime = this.totalTime - this.resolution;
                this.timerTitle = "おーい..おーい..."
                if (this.isPlaySound2 === false) {
                    this.sound2.play();
                    this.isPlaySound2 = true
                }
            } else {
                // this.totalTime = 0;
                this.resetTimer();
                swal("発狂中!!", "", "warning", {
                    className: "red-bg",
                });
                if (this.isPlaySound3 === false) {
                    this.sound3.play();
                    this.isPlaySound3 = true
                }
            }
        }
    },
    computed: {
        minutes: function() {
            const minutes = this.totalTime / 60 / 1000;
            if (this.seconds === "00") {
                if (minutes > 0) {
                    return Math.ceil(minutes);
                } else {
                    return Math.abs(Math.ceil(minutes));
                }

            } else {
                if (minutes > 0) {
                    return Math.floor(minutes);
                } else {
                    return Math.abs(Math.ceil(minutes));
                }
            }
        },
        seconds: function() {
            const seconds = Math.abs(Math.ceil(this.totalTime / 1000)) % 60;
            return this.padTime(seconds);
        }
    }
});