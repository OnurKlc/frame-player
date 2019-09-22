class FramePlayer {
    constructor(id) {
        var parent = this;
        this.id = id;

        this.playStatus = {
            isPlaying: false,
            getIsPlaying: function() {
                return this.isPlaying;
            },
            setIsPlaying: function(val) {
                this.isPlaying = val;
                if (val === true) {
                    parent.on("playTrigger");
                }
                if (val === false && parseInt(parent.data.activeFrame.getValue()) < 173) {
                    parent.on("pauseTrigger");
                }
            }
        }

        this.data = {
            horizontalFrame: 0,
            verticalFrame: 0,
            bgImageNumber: 0,
            activeFrame: {
                value: 1,
                getValue: function(){
                    return this.value
                },
                setValue: function(val) {
                    this.value = val;
                    if (this.value === 174) {
                        parent.on("endTrigger");
                    }
                }
            }
        }


        // create child nodes
        this.framePlayer = document.createElement("div");
        this.framePlayer.setAttribute("id", "frame-player");
        this.framePlayer.onclick =  function playPauseFromScreen(e) {
            if (e.target.id === "frame-player") {
                if (parent.playStatus.getIsPlaying() === true) {
                    parent.pause();
                }
                else if (parent.playStatus.getIsPlaying() !== true) {
                    parent.play();
                }
            }
        };

        document.getElementById(this.id).appendChild(this.framePlayer);
        this.playerChildNode = '<input type="range" min="1" max="175" value="0" class="slider" id="myRange"><div id="button-container"><button id="playButton"><span>Play</span></button><button id="pauseButton"><span>Pause</span></button></div>';
        this.framePlayer.appendChild(document.createRange().createContextualFragment(this.playerChildNode));


        // play and pause methods
        this.play = function play() {
            if (this.playStatus.getIsPlaying() === false) {
                this.t = setInterval(function(){parent.bgHandler(parent.data.activeFrame.getValue(), parent.data.bgImageNumber)}, 100);
                this.playStatus.setIsPlaying(true);
            }
        };

        this.pause = function pause() {
            this.playStatus.setIsPlaying(false);
            clearInterval(this.t);
        }

        document.getElementById("playButton").onclick = function(){parent.play()};
        document.getElementById("pauseButton").onclick = function(){parent.pause()};


        this.playerHandler = function playerHandler(activeFrame, bgImageNumber, sliderJump) {
            if (sliderJump) {
                this.framePlayer.style.backgroundImage = `url("http://storage.googleapis.com/alyo/assignments/images/${this.data.bgImageNumber}.jpg")`;
                if (activeFrame % 25 <= 5) {
                    this.data.verticalFrame = 0;
                }
                else if (activeFrame % 25 <= 10 && activeFrame % 25 > 5) {
                    this.data.verticalFrame = 25;
                }
                else if (activeFrame % 25 <= 15 && activeFrame % 25 > 10) {
                    this.data.verticalFrame = 50;
                }
                else if (activeFrame % 25 <= 20 && activeFrame % 25 > 15) {
                    this.data.verticalFrame = 75;
                }
                else if (activeFrame % 25 <= 25 && activeFrame % 25 > 20) {
                    this.data.verticalFrame = 100;
                }        
            }

            this.data.horizontalFrame += 25;
            if (this.data.horizontalFrame > 100) {
                this.data.horizontalFrame = 0;
                this.data.verticalFrame += 25;
            }
            if (this.data.verticalFrame > 100) {
                this.data.bgImageNumber = bgImageNumber + 1;
                if (this.data.bgImageNumber >= 7) {
                    clearInterval(this.t);
                    this.playStatus.setIsPlaying(false);
                    this.data.horizontalFrame = 100;
                    this.data.verticalFrame = 100;
                }else {
                    this.framePlayer.style.backgroundImage = `url("http://storage.googleapis.com/alyo/assignments/images/${this.data.bgImageNumber}.jpg")`;
                    this.data.horizontalFrame = 0;
                    this.data.verticalFrame = 0;        
                }
            }
            this.data.activeFrame.setValue(document.getElementById("myRange").value++);
            this.framePlayer.style.backgroundPosition = this.data.horizontalFrame + "% " + this.data.verticalFrame + "%";
        }

        document.getElementById("myRange").onchange = function setFrame() {
            parent.pause();
            parent.data.activeFrame.setValue(this.value);
            parent.bgHandlerSetter(parent.data.activeFrame.getValue());
        }

        this.bgHandler = function bgHandler() {
            this.playerHandler(this.data.activeFrame.getValue(), this.data.bgImageNumber);
        }

        this.bgHandlerSetter = function bgHandlerSetter(activeFrame, bgImageNumber) {
            if (activeFrame < 25) {
                this.data.bgImageNumber = 0;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 50 && activeFrame >= 25) {
                this.data.bgImageNumber = 1;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 75 && activeFrame >= 50) {
                this.data.bgImageNumber = 2;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 100 && activeFrame >= 75) {
                this.data.bgImageNumber = 3;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 125 && activeFrame >= 100) {
                this.data.bgImageNumber = 4;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 150 && activeFrame >= 125) {
                this.data.bgImageNumber = 5;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
            else if (activeFrame < 175 && activeFrame >= 150) {
                this.data.bgImageNumber = 6;
                this.playerHandler(activeFrame, this.data.bgImageNumber, true);
            }
        };

        var playCallback,
            pauseCallback,
            endCallback,
            downloadCallback;

        // get images
        var count = 0;
        var start = new Date().getTime();
        for (let i = 0; i < 7; i++) {
            fetch(`http://storage.googleapis.com/alyo/assignments/images/${i}.jpg`)
            .then(function(response) {
                count++;
                if (count === 7) {
                    var end = new Date().getTime();
                    if(downloadCallback){downloadCallback()};
                    console.log("download completed in", end - start, "ms");
                }
            });
        }


        //events
        this.on = function(eventName, callback) {

            if (eventName === "downloadcomplete") {
                downloadCallback = callback;
            }

            if (eventName === "play") {
                playCallback = callback;
                return playCallback;
            }

            if (eventName === "playTrigger") {
                if (playCallback) {playCallback()}
            }

            if (eventName === "pause") {
                pauseCallback = callback;
                return pauseCallback;
            }

            if (eventName === "pauseTrigger") {
                if(pauseCallback){pauseCallback()};
            }

            if (eventName === "end") {
                endCallback = callback;
                return endCallback;
            }

            if (eventName === "endTrigger") {
                if(endCallback){endCallback()};
            }
        }
    }
}


var newPlayer = new FramePlayer("player");
newPlayer.on("play", function(){console.log("playing")});
newPlayer.on("pause", function(){console.log("paused")});
newPlayer.on("end", function(){console.log("ended")});
newPlayer.on("downloadcomplete", function(){console.log("download completed")});

