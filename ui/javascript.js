function updateButtons(options) {
  var btnContainer = document.getElementById("button-container");
  btnContainer.innerHTML = '';

  if (!options || options.length === 0) {
    return;
  }

  for (var i = 0; i < options.length; i++) {
    var btnIndex = i + 1;
    var btn = document.createElement("div");
    btn.className = "action-btn";
    btn.id = "buttontext" + btnIndex;

    var labelLower = options[i].label.toLowerCase();
    var iconClass = "fa-caret-right";

    if (labelLower.includes("gun") || labelLower.includes("weapon") || labelLower.includes("oruzje") || labelLower.includes("oružje") || labelLower.includes("pistol")) {
      iconClass = "fa-gun";
    } else if (labelLower.includes("ammo") || labelLower.includes("bullet") || labelLower.includes("metk") || labelLower.includes("metak")) {
      iconClass = "fa-boxes-stacked";
    } else if (labelLower.includes("mod") || labelLower.includes("settings") || labelLower.includes("podesava")) {
      iconClass = "fa-gear";
    } else if (labelLower.includes("buy") || labelLower.includes("kupi") || labelLower.includes("shop")) {
      iconClass = "fa-cart-shopping";
    } else if (labelLower.includes("sell") || labelLower.includes("prodaj")) {
      iconClass = "fa-hand-holding-dollar";
    } else if (labelLower.includes("heal") || labelLower.includes("leci") || labelLower.includes("bolnica")) {
      iconClass = "fa-kit-medical";
    } else if (labelLower.includes("car") || labelLower.includes("vozilo") || labelLower.includes("auto")) {
      iconClass = "fa-car";
    } else if (labelLower.includes("leave") || labelLower.includes("exit") || labelLower.includes("odustani") || labelLower.includes("zatvori") || labelLower.includes("izlaz")) {
      iconClass = "fa-person-walking-arrow-right";
    }

    btn.innerHTML = `
        <div class="btn-key"><i class="fa-solid ${iconClass}"></i></div>
        <span class="btn-label">${options[i].label}</span>
        <div class="btn-hint">[${btnIndex}]</div>
    `;

    btn.onclick = (function (option) {
      return function () {
        $.post(`https://${GetParentResourceName()}/jokan_npcdialog:islem`, JSON.stringify({
          event: option.event,
          args: option.args,
          type: option.type
        }));
        var accept = new Audio('accept.mp3');
        accept.volume = 0.4;
        accept.play();

        var body = $('body');
        body.fadeOut(300, function () {
          $.post(`https://${GetParentResourceName()}/jokan_npcdialog:hideMenu`);
        });
      };
    })(options[i]);

    btnContainer.appendChild(btn);
  }
}

window.addEventListener('message', function (event) {
  if (event.data.type === 'dialog') {
    updateButtons(event.data.options);

    let yazilcak = event.data.name;
    if (yazilcak) {
      let nameParts = yazilcak.split(' ');
      let firstName = nameParts[0];
      let restOfName = nameParts.slice(1).join(' ');

      var isim = document.getElementById("npcismiaq");
      if (restOfName) {
        isim.innerHTML = `<b>${firstName}</b> ${restOfName}`;
      } else {
        isim.innerHTML = `<b>${firstName}</b>`;
      }
    }

    var yazi = document.getElementById("npcbiseydiyo");
    if (yazi) {
      yazi.innerHTML = event.data.text;
    }

    var meslek = document.getElementById("npcmeslekamk");
    var jobContainer = document.querySelector(".npc-job-container");

    if (meslek && jobContainer) {
      if (event.data.job && event.data.job.trim() !== "") {
        meslek.innerText = event.data.job;
        jobContainer.style.display = 'flex';
      } else {
        jobContainer.style.display = 'none';
      }
    }

    var dialogBox = document.getElementById("background");
    if (dialogBox) {
      dialogBox.style.animation = 'none';
      dialogBox.offsetHeight;
      dialogBox.style.animation = null;
    }

    $('body').fadeIn(300);
    var popup = new Audio('popup.mp3');
    popup.volume = 0.4;
    popup.play();
  } else if (event.data.type === 'hide') {
    $('body').fadeOut(300);
  }
});

document.addEventListener('keydown', function (event) {
  var keyPressed = event.key;
  switch (keyPressed) {
    case '1':
      clickButton(1);
      break;
    case '2':
      clickButton(2);
      break;
    case '3':
      clickButton(3);
      break;
    case '4':
      clickButton(4);
      break;
    case 'Escape':
    case 'Backspace':
      var body = $('body');
      body.fadeOut(300, function () {
        var popupreverse = new Audio('popupreverse.mp3');
        popupreverse.volume = 0.4;
        popupreverse.play();
        $.post(`https://${GetParentResourceName()}/jokan_npcdialog:hideMenu`);
      });
      break;
  }
});

function clickButton(buttonIndex) {
  var button = document.getElementById("buttontext" + buttonIndex);
  if (button) {
    button.click();
  }
}
