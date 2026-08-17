/* Mobile menu */
(function () {
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mmenu');
  if (!burger || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  burger.addEventListener('click', function () {
    setOpen(!menu.classList.contains('open'));
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      burger.focus();
    }
  });

  // The menu is display:none above 820px, so leaving it "open" would make it
  // reappear on the way back down to mobile.
  window.matchMedia('(min-width:821px)').addEventListener('change', function (ev) {
    if (ev.matches) setOpen(false);
  });
})();

/* Donation amount + frequency pickers */
(function () {
  var amounts = document.querySelector('.amt');
  var freq = document.querySelector('.toggle2');
  var cta = document.getElementById('give-cta');
  if (!amounts || !freq || !cta) return;

  function selected(group) {
    return group.querySelector('.on');
  }

  function updateCta() {
    var amount = selected(amounts);
    var period = selected(freq);
    if (!amount || !period) return;
    var label = amount.dataset.amount
      ? 'Give $' + amount.dataset.amount
      : 'Choose an amount';
    cta.textContent = period.dataset.frequency === 'monthly' && amount.dataset.amount
      ? label + ' / month'
      : label;
  }

  function pick(group, button) {
    group.querySelectorAll('[aria-pressed]').forEach(function (b) {
      var on = b === button;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    updateCta();
  }

  [amounts, freq].forEach(function (group) {
    group.addEventListener('click', function (ev) {
      var button = ev.target.closest('[aria-pressed]');
      if (button) pick(group, button);
    });
  });
})();

/* Forms have no back end yet. Say so plainly rather than swallowing a submission
   — remove the data-unwired attribute once a handler is connected. */
(function () {
  document.querySelectorAll('form[data-unwired]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var note = form.querySelector('.formnote');
      if (!note) return;
      note.textContent = form.dataset.unwired ||
        'This form is not connected yet, so your message was not sent. ' +
        'Please call (780) 458-7371 and we will help you right away.';
      note.focus();
    });
  });
})();
