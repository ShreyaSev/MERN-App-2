import { useState, useEffect } from "react";

let speech;

if (window.webkitSpeechRecognition) {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speech = new SpeechRecognition();
    speech.continuous = true;
    speech.interimResults = true;
} else {
    speech = null;
}

const useVoice = () => {
    const [text, setText] = useState(''); 
    const [isListening, setIsListening] = useState(false);

    const listen = () =>{
        const newIsListening = !isListening;
        setIsListening(newIsListening);
        // console.log("islistening:", newIsListening);
        if (newIsListening) {
            console.log("listening...")
            speech.start();
            speech.onsoundstart = ()=>{
                console.log("some sound is being received.");
            }
            return;
        } else{
            console.log("stopped listening.")
            // console.log("final recorded speech is:", text);
            speech.stop();
        }
    };

    useEffect(() => {
        if (!speech){
            console.log("Your browser does not support speech recognition");
            return;
        }

        speech.onresult = (event) => { 
            var final = "";
            var interim = "";
            for (var i = 0; i < event.results.length; ++i) {
                if (event.results[i].final) {
                    final += event.results[i][0].transcript;
                    setText(final);
                    } else {
                    interim += event.results[i][0].transcript;
                    setText(interim);
                    }
                }
        };
    }, []);

    return {
        text, isListening, listen, voiceSupported: speech!==null
    };
};

export default useVoice;
