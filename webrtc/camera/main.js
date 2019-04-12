
  'use strict';

  var stream;
  var camera = document.getElementById('camera');
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var message = document.getElementById('message');
  var SelectVisible = true;

  canvas.width = 480;
  canvas.height = 360;

  function selectSource() {

    if (stream) {

      stream
      .getTracks()
      .forEach(function(track) {

        track.stop();
      });
    }

    var videoSource = cameraselect.value;

    navigator
    .mediaDevices
    .getUserMedia({
      audio: false,
      video: {deviceId: videoSource ? { exact: videoSource } : undefined}
    })
    .then(function (stream) {

      window.stream = stream;
      video.srcObject = stream;

      cameraselect.className = 'hidden';
    })
    .catch(function (error) {

      console.log('navigator.getUserMedia error: ', error);
      showMessage('navigator.getUserMedia error', 'error');
    });

    cameraselect.className = 'hidden';
    SelectVisible = false;
  }

  function start() {

    showMessage('Scanning devices...');  

    navigator
    .mediaDevices
    .enumerateDevices()
    .then(gotDevices);
  }

  function gotDevices(deviceInfos) {

    var DevicesCount = 0;

    while (cameraselect.firstChild) {

      cameraselect.removeChild(cameraselect.firstChild);
    }

    for (var i = 0; i !== deviceInfos.length; ++i) {
      
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');

      option.value = deviceInfo.deviceId;

      if (deviceInfo.kind === 'videoinput') {

        DevicesCount++;

        option.text = deviceInfo.label || 'camera ' + (cameraselect.length + 1);
        cameraselect.appendChild(option);
      }
    }

    showMessage('Found ' + DevicesCount, 'info', true);
    selectSource();
  }

  function showMessage(text, type, autohide) {

    message.innerHTML = text;
    message.className = type || 'info';

    if(autohide) {

      setTimeout(function() {

        message.className = '';

      }, 2000);
    }

    if(type == 'hide') {

      message.className = 'hidden';
    }
  }

  var buttontake = document.querySelector('button.take');
  buttontake.onclick = function() {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
    .getContext('2d')
    .drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height);

    canvas.className = '';
    buttonnocanvas.className = 'nocanvas';
    buttontake.className = 'take hidden';
    buttonsend.className = 'send';
  };

  var buttonfull = document.querySelector('button.full');
  buttonfull.onclick = function() {    

    buttonfull.className = 'full hidden';
    buttonnofull.className = 'nofull';
    camera.webkitRequestFullscreen();
  }  

  var buttonnofull = document.querySelector('button.nofull');
  buttonnofull.onclick = function() {    

    buttonfull.className = 'full';
    buttonnofull.className = 'nofull hidden'; 
    document.webkitExitFullscreen();
  }    

  var buttonselect = document.querySelector('button.select');
  buttonselect.onclick = function() {    

    cameraselect.className = SelectVisible ? 'hidden' : '';
    SelectVisible = !SelectVisible;
  }    

  var buttonnocanvas = document.querySelector('button.nocanvas');
  buttonnocanvas.onclick = function() {    

    buttontake.className = 'take';
    buttonnocanvas.className = 'nocanvas hidden'; 
    canvas.className = 'hidden';
    buttonsend.className = 'send hidden';
  }      

  var buttonsend = document.querySelector('button.send');
  buttonsend.onclick = function() {    

    showMessage('Sending image...', 'info', true);

    setTimeout(function() {

      showMessage('', 'hide');    

      buttontake.className = 'take';
      buttonnocanvas.className = 'nocanvas hidden'; 
      canvas.className = 'hidden';
      buttonsend.className = 'send hidden';
      
    }, 2000) 
  }  

  var cameraselect = document.querySelector('select');
  cameraselect.onchange = selectSource;

  start();
