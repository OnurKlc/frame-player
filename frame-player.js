const framePlayer = class {

    let playStatus = "paused";
    var data = {
        horizontalFrame: 0,
        verticalFrame: 0,
        bgImageNumber: 0,
        activeFrame: 0
    }

    const play = () => {
        playStatus = "playing";
        t = setInterval(function(){bgHandler(data.activeFrame, data.bgImageNumber)}, 100);
    };

    const pause = () => {
        playStatus = "paused";
        clearInterval(t);
    }

    const playPauseFromScreen = (e) => {
        if (e.target.id === "player") {
            if (playStatus === "playing") {
                pause();
            }
            else if (playStatus === "paused") {
                play();
            }

        }
    }



    const playerHandler = (activeFrame, bgImageNumber, sliderJump) => {
        if (sliderJump) {
            document.getElementById("player").style.backgroundImage = `url("http://storage.googleapis.com/alyo/assignments/images/${data.bgImageNumber}.jpg")`;
            if (activeFrame % 25 <= 5) {
                data.verticalFrame = 0;
            }
            else if (activeFrame % 25 <= 10 && activeFrame % 25 > 5) {
                data.verticalFrame = 25;
            }
            else if (activeFrame % 25 <= 15 && activeFrame % 25 > 10) {
                data.verticalFrame = 50;
            }
            else if (activeFrame % 25 <= 20 && activeFrame % 25 > 15) {
                data.verticalFrame = 75;
            }
            else if (activeFrame % 25 <= 25 && activeFrame % 25 > 20) {
                data.verticalFrame = 100;
            }        
        }

        console.log("activeFrame", activeFrame);
        console.log("bgImageNumber", bgImageNumber);

        data.horizontalFrame += 25;
        if (data.horizontalFrame > 100) {
            data.horizontalFrame = 0;
            data.verticalFrame += 25;
        }
        if (data.verticalFrame > 100) {
            data.bgImageNumber = bgImageNumber + 1;
            if (data.bgImageNumber >= 7) {
                clearInterval(t);
                playStatus = "paused";
                data.horizontalFrame = 100;
                data.verticalFrame = 100;
            }else {
                document.getElementById("player").style.backgroundImage = `url("http://storage.googleapis.com/alyo/assignments/images/${data.bgImageNumber}.jpg")`;
                data.horizontalFrame = 0;
                data.verticalFrame = 0;        
            }
        }
        data.activeFrame = document.getElementById("myRange").value++;
        document.getElementById("player").style.backgroundPosition = data.horizontalFrame + "% " + data.verticalFrame + "%";
    }

    const show = () => {
        data.activeFrame = document.getElementById("myRange").value;
        bgHandlerSetter(data.activeFrame);
    }

    const bgHandler = () => {
        playerHandler(data.activeFrame, data.bgImageNumber);
    }

    const bgHandlerSetter = (activeFrame, bgImageNumber) => {
        if (activeFrame < 26) {
            data.bgImageNumber = 0;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 51 && activeFrame >= 26) {
            data.bgImageNumber = 1;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 76 && activeFrame >= 51) {
            data.bgImageNumber = 2;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 101 && activeFrame >= 76) {
            data.bgImageNumber = 3;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 126 && activeFrame >= 101) {
            data.bgImageNumber = 4;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 151 && activeFrame >= 126) {
            data.bgImageNumber = 5;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
        else if (activeFrame < 176 && activeFrame >= 151) {
            data.bgImageNumber = 6;
            playerHandler(activeFrame, data.bgImageNumber, true);
        }
    };


// get images


// for (let i = 0; i < 7; i++) {
//     var request = new XMLHttpRequest();
//     request.open('GET', `http://storage.googleapis.com/alyo/assignments/images/${i}.jpg`);
//     request.send();
//     request.onload = function(response) {
//         if (request.status !== 200) {
//             alert(`Error ${request.status}: ${request.statusText}`);
//         }
//         else {
//             console.log(response);
//         }
//     }

//     request.onprogress = function(event) {
//       alert(`Received ${event.loaded} of ${event.total} bytes`);
//     } else {
//       alert(`Received ${event.loaded} bytes`); // no Content-Length
//     }
// };
// }

// request.onerror = function() {
//     alert("Request failed");
// };
}

const constructorFromClass = new framePlayer();
console.log(constructorFromClass);