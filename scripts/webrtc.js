let localStream;
let peerConnection;
const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

async function startCall(type) {
    localStream = await navigator.mediaDevices.getUserMedia({
        video: type === "video",
        audio: true
    });

    document.body.innerHTML += `
        <div class="video-call">
            <video id="localVideo" autoplay muted></video>
            <video id="remoteVideo" autoplay></video>
            <button onclick="endCall()">End Call</button>
        </div>
    `;

    document.getElementById("localVideo").srcObject = localStream;
    peerConnection = new RTCPeerConnection(servers);

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = event => {
        document.getElementById("remoteVideo").srcObject = event.streams[0];
    };

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    fetch("http://localhost:8080/api/call/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer: offer.sdp })
    })
    .then(response => response.json())
    .then(data => peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer)))
    .catch(error => console.error("Error starting call:", error));
}

function endCall() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    document.querySelector(".video-call").remove();
}
